"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { api } from "@/lib/api";
import { t as tField } from "@/lib/types";
import type { Service, Advantage } from "@/lib/types";

export default function Home() {
  const { t, lang } = useI18n();

  const [services, setServices] = useState<Service[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);

  const [advantages, setAdvantages] = useState<Advantage[]>([]);
  const [advantagesLoading, setAdvantagesLoading] = useState(true);

  useEffect(() => {
    api
      .getServices()
      .then((data) => setServices(data))
      .catch(() => setServices([]))
      .finally(() => setServicesLoading(false));

    api
      .getAdvantages()
      .then((data) => setAdvantages(data))
      .catch(() => setAdvantages([]))
      .finally(() => setAdvantagesLoading(false));
  }, []);

  const serviceAccentColors = ["text-primary", "text-teal", "text-purple"];
  const serviceBgColors = ["bg-primary", "bg-teal", "bg-purple"];
  const serviceBorderColors = [
    "border-primary",
    "border-teal",
    "border-purple",
  ];

  return (
    <>
      {/* ───────────────── Hero Section ───────────────── */}
      <section className="relative bg-white overflow-hidden">
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F0F7FF] to-transparent pointer-events-none" />

        <div className="relative container-main py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left side */}
            <div className="flex flex-col gap-5">
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.15] tracking-tight text-dark">
                {t("hero.title1")}
                <br />
                <span className="text-teal">{t("hero.title2")}</span>
              </h1>

              <p className="text-base lg:text-lg text-gray-text max-w-lg leading-relaxed">
                {t("hero.subtitle")}
              </p>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3 pt-1">
                {/* Primary gradient button */}
                <a
                  href="https://homemed.uz/app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-primary to-teal px-5 py-3.5 text-white font-semibold text-[15px] shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all"
                >
                  {t("hero.applyApp")}
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>

                {/* Telegram button */}
                <a
                  href="https://t.me/klinika_support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-2xl border-2 border-primary/20 bg-white px-5 py-3.5 text-primary font-semibold text-[15px] hover:border-primary/40 hover:bg-blue-50/50 transition-all"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23a.2.2 0 00-.056-.212c-.068-.05-.174-.041-.249-.024-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                  {t("hero.writeTelegram")}
                </a>

                {/* Call button */}
                <a
                  href="tel:+998712345678"
                  className="inline-flex items-center gap-2.5 rounded-2xl bg-gray-light px-5 py-3.5 text-dark font-semibold text-[15px] hover:bg-gray-100 transition-all"
                >
                  <svg className="w-5 h-5 text-gray-text" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {t("hero.call")}
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-5 pt-3">
                {[t("hero.verifiedDoctors"), t("hero.safePrivate")].map((label) => (
                  <div key={label} className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal/15">
                      <svg className="h-3.5 w-3.5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-sm text-gray-text font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side – Doctor image */}
            <div className="flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                <img
                  src="/hero-doctor.jpg"
                  alt="Doctor on call"
                  className="w-full h-auto rounded-3xl object-cover shadow-xl"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = "none";
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
                {/* Fallback if image not found */}
                <div
                  className="hidden w-full aspect-[4/5] rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 items-center justify-center flex-col gap-4 p-8"
                >
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                    </svg>
                  </div>
                  <p className="text-sm text-slate-400 text-center mt-2">
                    Place doctor-hero.jpg<br />in /public folder
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── How It Works Section ───────────────── */}
      <section id="how-it-works" className="bg-gray-light">
        <div className="container-main py-16 lg:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-dark">
              {t("howItWorks.title")}
            </h2>
            <p className="mt-4 text-gray-text text-lg max-w-2xl mx-auto">
              {t("howItWorks.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className="bg-white rounded-2xl border border-gray-border p-8 flex flex-col items-start gap-4 card-shadow"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white text-lg font-bold">
                  {step}
                </div>
                <h3 className="text-xl font-bold text-dark">
                  {t(`howItWorks.step${step}.title`)}
                </h3>
                <p className="text-gray-text leading-relaxed">
                  {t(`howItWorks.step${step}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── Services Section ───────────────── */}
      <section id="services" className="bg-white">
        <div className="container-main py-16 lg:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-dark">
              {t("services.title")}
            </h2>
            <p className="mt-4 text-gray-text text-lg max-w-2xl mx-auto">
              {t("services.subtitle")}
            </p>
          </div>

          {servicesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-border p-8 animate-pulse"
                >
                  <div className="h-12 w-12 rounded-xl bg-gray-200 mb-4" />
                  <div className="h-5 w-3/4 bg-gray-200 rounded mb-3" />
                  <div className="h-4 w-full bg-gray-200 rounded mb-2" />
                  <div className="h-4 w-5/6 bg-gray-200 rounded mb-6" />
                  <div className="h-10 w-full bg-gray-200 rounded-xl" />
                </div>
              ))}
            </div>
          ) : services.length === 0 ? (
            <p className="text-center text-gray-text">—</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.slice(0, 3).map((service, idx) => {
                const colorIdx = idx % 3;
                return (
                  <div
                    key={service.id}
                    className="bg-white rounded-2xl border border-gray-border p-8 flex flex-col gap-4 card-shadow card-shadow-hover transition-shadow"
                  >
                    {/* Icon placeholder */}
                    <div
                      className={`h-12 w-12 rounded-xl ${serviceBgColors[colorIdx]} flex items-center justify-center`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </div>

                    <h3 className="text-xl font-bold text-dark">
                      {tField(service, "title", lang)}
                    </h3>
                    <p className="text-gray-text leading-relaxed flex-1">
                      {tField(service, "description", lang)}
                    </p>

                    <button
                      className={`mt-2 w-full rounded-xl border-2 ${serviceBorderColors[colorIdx]} ${serviceAccentColors[colorIdx]} bg-white py-3 font-semibold transition-colors hover:opacity-80`}
                    >
                      {t("services.applyBtn")}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ───────────────── Trust Section ───────────────── */}
      <section id="trust" className="bg-gray-light">
        <div className="container-main py-16 lg:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-dark">
              {t("trust.title")}
            </h2>
            <p className="mt-4 text-gray-text text-lg max-w-3xl mx-auto">
              {t("trust.subtitle")}
            </p>
          </div>

          {advantagesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-border p-8 animate-pulse"
                >
                  <div className="h-10 w-10 rounded-full bg-gray-200 mx-auto mb-4" />
                  <div className="h-5 w-2/3 bg-gray-200 rounded mx-auto mb-3" />
                  <div className="h-4 w-full bg-gray-200 rounded mx-auto" />
                </div>
              ))}
            </div>
          ) : advantages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {advantages.slice(0, 3).map((adv) => (
                <div
                  key={adv.id}
                  className="bg-white rounded-2xl border border-gray-border p-8 text-center card-shadow"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal mx-auto mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-dark mb-2">
                    {tField(adv, "title", lang)}
                  </h3>
                  <p className="text-gray-text leading-relaxed">
                    {tField(adv, "description", lang)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            /* Hardcoded fallback trust cards */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(
                [
                  {
                    titleKey: "trust.verified.title",
                    descKey: "trust.verified.desc",
                  },
                  {
                    titleKey: "trust.privacy.title",
                    descKey: "trust.privacy.desc",
                  },
                  {
                    titleKey: "trust.support.title",
                    descKey: "trust.support.desc",
                  },
                ] as const
              ).map((card) => (
                <div
                  key={card.titleKey}
                  className="bg-white rounded-2xl border border-gray-border p-8 text-center card-shadow"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal mx-auto mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-dark mb-2">
                    {t(card.titleKey)}
                  </h3>
                  <p className="text-gray-text leading-relaxed">
                    {t(card.descKey)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
