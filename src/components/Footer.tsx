"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

const HeartMark = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 21s-7-4.35-7-9.5A4.5 4.5 0 0 1 12 7.5 4.5 4.5 0 0 1 19 11.5C19 16.65 12 21 12 21Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M8.4 12h2l1-2 1.2 3 1-1h2"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Link className="brand" href="/">
              <span className="mark" aria-hidden="true">
                <HeartMark />
              </span>
              HomeMed
            </Link>
            <p className="about">{t("footer.desc")}</p>
            <div className="foot-social">
              <a href="#" aria-label="Telegram">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.8 4.3 2.9 11.6c-.9.4-.9 1.6.1 1.9l4.6 1.4 1.8 5.5c.3.8 1.2 1 1.8.4l2.6-2.3 4.6 3.4c.7.5 1.6.1 1.8-.7l3.3-15.6c.2-1-.7-1.7-1.5-1.3Z" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
                </svg>
              </a>
              <a href="#" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="2.5" y="5.5" width="19" height="13" rx="4" stroke="currentColor" strokeWidth="1.8" />
                  <path d="m10 9 5 3-5 3V9Z" fill="currentColor" />
                </svg>
              </a>
              <a href="#" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 9V7.5c0-.7.3-1 1-1h1.5V4H14c-2 0-3 1.2-3 3.2V9H9v2.5h2V20h3v-8.5h2L16.5 9H14Z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="foot-col">
            <h4>{t("nav.services")}</h4>
            <a href="/#xizmatlar">{t("services.online")}</a>
            <a href="/#xizmatlar">{t("services.clinic")}</a>
            <a href="/#xizmatlar">{t("services.home")}</a>
            <a href="/#tavsiyalar">{t("nav.tips")}</a>
          </div>

          <div className="foot-col">
            <h4>{t("footer.company")}</h4>
            <a href="/#asoschi">{t("footer.about")}</a>
            <a href="/#mutaxassislar">{t("nav.doctors")}</a>
            <a href="/#klinikalar">{t("footer.partnerClinics")}</a>
            <a href="/#izohlar">{t("nav.reviews")}</a>
          </div>

          <div className="foot-col">
            <h4>{t("nav.contact")}</h4>
            <a href="tel:+998781234567">+998 78 123 45 67</a>
            <a href="mailto:salom@home-med.uz">salom@home-med.uz</a>
            <a href="#">{t("nav.telegram")}</a>
            <a href="#">{t("footer.cityCountry")}</a>
          </div>
        </div>

        <div className="foot-bottom">
          <span>
            © 2026 HomeMed. <span>{t("footer.rights")}</span>
          </span>
          <span style={{ display: "flex", gap: 20 }}>
            <a href="#">{t("footer.privacy")}</a>
            <a href="#">{t("footer.terms")}</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
