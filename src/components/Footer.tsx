"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function Footer() {
  const { t } = useI18n();

  const pages = [
    { href: "/doctors", label: t("nav.doctors") },
    { href: "/clinics", label: t("nav.clinics") },
    { href: "/reviews", label: t("nav.reviews") },
    { href: "/founder", label: t("nav.founder") },
    { href: "/tips", label: t("nav.tips") },
    { href: "/contact", label: t("nav.contact") },
  ];

  const info = [
    { href: "/terms", label: t("footer.terms") },
    { href: "/privacy", label: t("footer.privacy") },
    { href: "/about", label: t("footer.about") },
  ];

  return (
    <footer className="bg-white border-t border-gray-border">
      <div className="container-main py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                H
              </div>
              <span className="text-xl font-bold text-dark">HomeMed</span>
            </Link>
            <p className="text-sm text-gray-text leading-relaxed mb-4">
              {t("footer.desc")}
            </p>
            <a
              href="https://homemed.uz/app"
              className="inline-block btn-gradient text-sm !py-2.5 !px-5"
            >
              {t("footer.downloadApp")}
            </a>
          </div>

          {/* Pages */}
          <div>
            <h3 className="font-semibold text-dark mb-4">{t("footer.pages")}</h3>
            <ul className="space-y-2.5">
              {pages.map((page) => (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    className="text-sm text-gray-text hover:text-primary transition-colors"
                  >
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-semibold text-dark mb-4">{t("footer.info")}</h3>
            <ul className="space-y-2.5">
              {info.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-text hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-dark mb-4">{t("footer.contactUs")}</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+998712345678"
                  className="flex items-center gap-2 text-sm text-gray-text hover:text-primary transition-colors"
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +998712345678
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/klinika_support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-text hover:text-primary transition-colors"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                  </svg>
                  {t("nav.telegram")}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-border">
        <div className="container-main py-4">
          <p className="text-sm text-gray-text text-center">{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
