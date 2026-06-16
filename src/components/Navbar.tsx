"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import type { Lang } from "@/lib/types";

export default function Navbar() {
  const { lang, setLang, t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", mobileOpen);
    return () => document.body.classList.remove("menu-open");
  }, [mobileOpen]);

  const navItems = [
    { href: "/#qanday", label: t("nav.howItWorks") },
    { href: "/#xizmatlar", label: t("nav.services") },
    { href: "/#mutaxassislar", label: t("nav.doctors") },
    { href: "/#klinikalar", label: t("nav.clinics") },
    { href: "/#izohlar", label: t("nav.reviews") },
    { href: "/#asoschi", label: t("nav.founder") },
    { href: "/#tavsiyalar", label: t("nav.tips") },
    { href: "/#kontakt", label: t("nav.contact") },
  ];

  const langs: { code: Lang; label: string }[] = [
    { code: "uz", label: "UZ" },
    { code: "en", label: "EN" },
  ];

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <div className="wrap nav">
        <Link className="brand brand-logo" href="/" aria-label="HomeMed">
          <img src="/logo.png" alt="HomeMed" />
        </Link>

        <nav className="nav-links" aria-label="Asosiy">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="nav-right">
          <div className="lang" role="group" aria-label="Til / Language">
            {langs.map(({ code, label }) => (
              <button
                key={code}
                className={lang === code ? "active" : ""}
                onClick={() => setLang(code)}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
          <a href="/#kontakt" className="btn btn-primary btn-sm">
            {t("nav.openApp")}
          </a>
          <button
            className="nav-toggle"
            aria-label="Menyu"
            type="button"
            onClick={() => setMobileOpen((s) => !s)}
          >
            <span></span>
          </button>
        </div>
      </div>

      <div
        className="nav-mobile"
        style={{
          position: "fixed",
          inset: "76px 0 auto 0",
          background: "var(--paper)",
          borderBottom: "1px solid var(--line)",
          padding: "12px var(--pad) 24px",
          display: mobileOpen ? "flex" : "none",
          flexDirection: "column",
          gap: 2,
          zIndex: 55,
          boxShadow: "var(--sh-md)",
        }}
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            style={{
              padding: "13px 8px",
              fontSize: 17,
              fontWeight: 500,
              borderBottom: "1px solid var(--line-2)",
            }}
          >
            {item.label}
          </Link>
        ))}
        <a
          href="/#kontakt"
          className="btn btn-primary"
          style={{ marginTop: 14 }}
          onClick={() => setMobileOpen(false)}
        >
          {t("nav.openApp")}
        </a>
      </div>
    </header>
  );
}
