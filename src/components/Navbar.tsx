"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import type { Lang } from "@/lib/types";

function FlagUz({ className = "w-7 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="20" rx="3" fill="#fff" />
      <rect width="28" height="7" fill="#0099B5" />
      <rect y="13" width="28" height="7" fill="#1EB53A" />
      <rect y="6.5" width="28" height="1" fill="#CE1126" />
      <rect y="12.5" width="28" height="1" fill="#CE1126" />
      <circle cx="9" cy="3.5" r="2" fill="#fff" />
      <circle cx="10" cy="3.5" r="2" fill="#0099B5" />
      <circle cx="14" cy="2" r="0.6" fill="#fff" />
      <circle cx="15.5" cy="2" r="0.6" fill="#fff" />
      <circle cx="17" cy="2" r="0.6" fill="#fff" />
      <circle cx="14" cy="3.5" r="0.6" fill="#fff" />
      <circle cx="15.5" cy="3.5" r="0.6" fill="#fff" />
      <circle cx="17" cy="3.5" r="0.6" fill="#fff" />
      <circle cx="14" cy="5" r="0.6" fill="#fff" />
      <circle cx="15.5" cy="5" r="0.6" fill="#fff" />
      <circle cx="17" cy="5" r="0.6" fill="#fff" />
    </svg>
  );
}

function FlagRu({ className = "w-7 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="20" rx="3" fill="#fff" />
      <rect width="28" height="7" fill="#fff" />
      <rect y="7" width="28" height="6" fill="#0039A6" />
      <rect y="13" width="28" height="7" fill="#D52B1E" />
    </svg>
  );
}

function FlagEn({ className = "w-7 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="20" rx="3" fill="#012169" />
      <path d="M0 0L28 20M28 0L0 20" stroke="#fff" strokeWidth="3" />
      <path d="M0 0L28 20M28 0L0 20" stroke="#C8102E" strokeWidth="1.5" />
      <path d="M14 0V20M0 10H28" stroke="#fff" strokeWidth="5" />
      <path d="M14 0V20M0 10H28" stroke="#C8102E" strokeWidth="3" />
    </svg>
  );
}

const langConfig: Record<Lang, { label: string; Flag: typeof FlagUz }> = {
  uz: { label: "O'zbek", Flag: FlagUz },
  ru: { label: "Русский", Flag: FlagRu },
  en: { label: "English", Flag: FlagEn },
};

export default function Navbar() {
  const { lang, setLang, t } = useI18n();
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const navItems = [
    { href: "/#how-it-works", label: t("nav.howItWorks") },
    { href: "/#services", label: t("nav.services") },
    { href: "/doctors", label: t("nav.doctors") },
    { href: "/clinics", label: t("nav.clinics") },
    { href: "/reviews", label: t("nav.reviews") },
    { href: "/founder", label: t("nav.founder") },
    { href: "/tips", label: t("nav.tips") },
    { href: "/contact", label: t("nav.contact") },
  ];

  const CurrentFlag = langConfig[lang].Flag;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-border">
      <div className="container-main">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
              H
            </div>
            <span className="text-xl font-bold text-dark">HomeMed</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-dark hover:text-primary transition-colors whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Selector with Flags */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-light hover:bg-gray-200 transition-colors overflow-hidden border-2 border-transparent hover:border-gray-border"
                title={langConfig[lang].label}
              >
                <CurrentFlag className="w-7 h-5 rounded-sm" />
              </button>

              {langOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-border py-2 z-50 animate-in fade-in">
                  {(Object.keys(langConfig) as Lang[]).map((l) => {
                    const { label, Flag } = langConfig[l];
                    const isActive = lang === l;
                    return (
                      <button
                        key={l}
                        onClick={() => {
                          setLang(l);
                          setLangOpen(false);
                        }}
                        className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-colors ${
                          isActive
                            ? "bg-primary/5 text-primary font-semibold"
                            : "text-dark hover:bg-gray-light"
                        }`}
                      >
                        <span className="shrink-0 rounded-md overflow-hidden shadow-sm border border-black/10">
                          <Flag className="w-8 h-6" />
                        </span>
                        <span>{label}</span>
                        {isActive && (
                          <svg className="w-4 h-4 ml-auto text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Open in App */}
            <a
              href="https://homemed.uz/app"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient text-sm !py-2.5 !px-5 !rounded-xl"
            >
              {t("nav.openApp")}
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-dark"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-border pt-4">
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-dark hover:text-primary transition-colors py-1"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-border">
              {/* Mobile language selector with flags */}
              <div className="flex gap-2">
                {(Object.keys(langConfig) as Lang[]).map((l) => {
                  const { label, Flag } = langConfig[l];
                  return (
                    <button
                      key={l}
                      onClick={() => {
                        setLang(l);
                        setMobileOpen(false);
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm border transition-colors ${
                        lang === l
                          ? "border-primary text-primary bg-primary/5 font-medium"
                          : "border-gray-border text-dark hover:bg-gray-light"
                      }`}
                    >
                      <span className="rounded overflow-hidden shadow-sm border border-black/10">
                        <Flag className="w-6 h-4" />
                      </span>
                      {label}
                    </button>
                  );
                })}
              </div>
              <a
                href="https://homemed.uz/app"
                className="btn-gradient text-center text-sm !py-3"
              >
                {t("nav.openApp")}
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
