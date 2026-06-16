#!/bin/bash
# HomeMed — deploy Next.js (standalone) to GCE Ubuntu VM via gcloud SSH.
# Mirrors the polimax tar+scp+ssh pattern, adapted for a Next.js Node runtime.
set -e

CONFIG_FILE="${CONFIG_FILE:-credentials/homemed-prod.txt}"

# Use the user's real gcloud config (~/.config/gcloud) by default.
# Override CLOUDSDK_CONFIG only when running in a sandboxed env.
if [[ -n "${CLOUDSDK_CONFIG:-}" ]]; then
  mkdir -p "$CLOUDSDK_CONFIG"
fi

PROJECT="project-2bfaf81a-ba6b-4eae-9a2"
VM="azamsoft-staging"
ZONE="europe-west1-b"
GCLOUD_ACCOUNT=""

REMOTE_DIR="${REMOTE_DIR:-/opt/homemed}"
APP_PORT="${APP_PORT:-3100}"
APP_NAME="homemed"
DOMAINS="${DOMAINS:-home-med.uz www.home-med.uz}"
CERT_EMAIL="${CERT_EMAIL:-only.udemy01@gmail.com}"

if [[ -f "$CONFIG_FILE" ]]; then
  VM="$(sed -n 's/.*\*\*VM Name\*\*:[[:space:]]*//p;s/.*\*\*VM\*\*:[[:space:]]*//p' "$CONFIG_FILE" | head -n1 || true)"
  ZONE="$(sed -n 's/.*\*\*Zone\*\*:[[:space:]]*//p' "$CONFIG_FILE" | head -n1 || true)"
  PROJECT="$(sed -n 's/.*\*\*Project\*\*:[[:space:]]*//p' "$CONFIG_FILE" | head -n1 || true)"
  GCLOUD_ACCOUNT="$(sed -n 's/.*\*\*Account\*\*:[[:space:]]*//p' "$CONFIG_FILE" | head -n1 || true)"
fi

if [[ -z "$VM" || -z "$ZONE" || -z "$PROJECT" ]]; then
  echo "Missing VM/Zone/Project. Check $CONFIG_FILE or set VM/ZONE/PROJECT env vars." >&2
  exit 1
fi

ACCOUNT_FLAGS=()
if [[ -n "$GCLOUD_ACCOUNT" ]]; then
  ACCOUNT_FLAGS+=(--account "$GCLOUD_ACCOUNT")
fi

GCFLAGS=(--zone "$ZONE" --project "$PROJECT" "${ACCOUNT_FLAGS[@]}")

echo "▶ Building (Next.js standalone)..."
if command -v yarn >/dev/null 2>&1 && [[ -f yarn.lock ]]; then
  yarn build
else
  npm run build
fi

# Next.js standalone output ships server.js + a minimal node_modules subset.
# Static assets and /public must be copied alongside it.
echo "▶ Packaging standalone bundle..."
rm -rf .next/standalone/.next/static .next/standalone/public
cp -R .next/static .next/standalone/.next/static
[[ -d public ]] && cp -R public .next/standalone/public

tar -czf /tmp/homemed-dist.tar.gz -C .next/standalone .

echo "▶ Uploading to $VM..."
gcloud compute scp /tmp/homemed-dist.tar.gz "$VM":~/homemed-dist.tar.gz "${GCFLAGS[@]}"

echo "▶ Provisioning + deploying to $REMOTE_DIR ..."
gcloud compute ssh "$VM" "${GCFLAGS[@]}" --command "bash -s" <<EOF
set -e

# --- Node 20, pm2, nginx (install only if missing) ---
if ! command -v node >/dev/null || [ "\$(node -v | cut -dv -f2 | cut -d. -f1)" -lt 20 ]; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi
command -v pm2   >/dev/null || sudo npm install -g pm2
command -v nginx >/dev/null || { sudo apt-get update -y && sudo apt-get install -y nginx; }

# --- Extract bundle ---
sudo mkdir -p $REMOTE_DIR
sudo rm -rf $REMOTE_DIR/*
sudo tar -xzf ~/homemed-dist.tar.gz -C $REMOTE_DIR/
sudo chown -R \$USER:\$USER $REMOTE_DIR

# --- pm2 ecosystem ---
cat > $REMOTE_DIR/ecosystem.config.js <<PM2
module.exports = {
  apps: [{
    name: '$APP_NAME',
    script: 'server.js',
    cwd: '$REMOTE_DIR',
    env: { NODE_ENV: 'production', PORT: '$APP_PORT', HOSTNAME: '127.0.0.1' },
    max_memory_restart: '700M',
  }],
};
PM2

pm2 startOrReload $REMOTE_DIR/ecosystem.config.js
pm2 save
sudo env PATH=\$PATH:/usr/bin pm2 startup systemd -u \$USER --hp /home/\$USER >/dev/null || true

# --- nginx vhost for $DOMAINS -> :$APP_PORT (idempotent, no default_server) ---
sudo tee /etc/nginx/sites-available/$APP_NAME >/dev/null <<NGINX
server {
  listen 80;
  listen [::]:80;
  server_name $DOMAINS;
  client_max_body_size 10m;

  location / {
    proxy_pass http://127.0.0.1:$APP_PORT;
    proxy_http_version 1.1;
    proxy_set_header Upgrade \\\$http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host \\\$host;
    proxy_set_header X-Real-IP \\\$remote_addr;
    proxy_set_header X-Forwarded-For \\\$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto \\\$scheme;
    proxy_cache_bypass \\\$http_upgrade;
  }
}
NGINX
sudo ln -sf /etc/nginx/sites-available/$APP_NAME /etc/nginx/sites-enabled/$APP_NAME
sudo nginx -t
sudo systemctl reload nginx

# --- TLS via Certbot (issue once, renews via cron) ---
if ! command -v certbot >/dev/null; then
  sudo apt-get install -y certbot python3-certbot-nginx
fi
DOMAIN_FLAGS=""
for d in $DOMAINS; do DOMAIN_FLAGS="\$DOMAIN_FLAGS -d \$d"; done
# --keep-until-expiring skips re-issuing a still-valid cert; safe to run every deploy.
sudo certbot --nginx --non-interactive --agree-tos --email "$CERT_EMAIL" \\
  --redirect --keep-until-expiring \$DOMAIN_FLAGS || true

rm ~/homemed-dist.tar.gz
EOF

# --- firewall :80/:443 (idempotent; VM presumed to already serve other vhosts) ---
gcloud compute firewall-rules describe allow-http-$APP_NAME --project "$PROJECT" "${ACCOUNT_FLAGS[@]}" >/dev/null 2>&1 || \
  gcloud compute firewall-rules create allow-http-$APP_NAME \
    --project "$PROJECT" "${ACCOUNT_FLAGS[@]}" \
    --network=default --action=ALLOW --rules=tcp:80,tcp:443 \
    --direction=INGRESS --source-ranges=0.0.0.0/0 \
    --target-tags=http-server >/dev/null
gcloud compute instances add-tags "$VM" "${GCFLAGS[@]}" --tags=http-server >/dev/null 2>&1 || true

rm -f /tmp/homemed-dist.tar.gz

EXT_IP=$(gcloud compute instances describe "$VM" "${GCFLAGS[@]}" \
  --format='get(networkInterfaces[0].accessConfigs[0].natIP)' 2>/dev/null || true)
echo "✓ Done — http://${EXT_IP:-<external-ip>}"
