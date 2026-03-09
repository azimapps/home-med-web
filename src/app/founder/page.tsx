"use client";

import { useI18n } from "@/lib/i18n";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Founder, Lang } from "@/lib/types";
import { t as tField } from "@/lib/types";

export default function FounderPage() {
  const { t, lang } = useI18n();
  const [founder, setFounder] = useState<Founder | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getFounders()
      .then((founders) => {
        if (founders.length > 0) {
          setFounder(founders[0]);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section className="bg-gradient-hero py-16 lg:py-24">
        <div className="container-main text-center">
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {t("founder.title")}
          </h1>
          <p className="mt-4 text-lg text-white/70">
            {t("founder.subtitle")}
          </p>
        </div>
      </section>

      {/* Founder Card */}
      <section className="relative z-10 -mt-12 px-4 pb-16">
        <div className="mx-auto max-w-3xl">
          {loading ? (
            <div className="flex items-center justify-center rounded-2xl bg-white p-12 shadow">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
            </div>
          ) : !founder ? (
            <div className="rounded-2xl bg-white p-12 text-center shadow">
              <p className="text-gray-500">No founder data available.</p>
            </div>
          ) : (
            <div className="rounded-2xl bg-white p-8 shadow">
              <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
                {/* Avatar */}
                {founder.avatar ? (
                  <img
                    src={founder.avatar}
                    alt={tField(founder, "name", lang as Lang)}
                    className="h-32 w-32 shrink-0 rounded-2xl object-cover"
                  />
                ) : (
                  <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-teal-500">
                    <span className="text-3xl font-bold text-white">
                      {tField(founder, "name", lang as Lang)
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </span>
                  </div>
                )}

                {/* Info */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {tField(founder, "name", lang as Lang)}
                  </h2>
                  <p className="mt-1 text-lg font-medium text-teal">
                    {tField(founder, "position", lang as Lang)}
                  </p>
                  <p className="mt-4 leading-relaxed text-gray-600">
                    {tField(founder, "description", lang as Lang)}
                  </p>

                  {/* Social Buttons */}
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                    <a
                      href="https://t.me/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    >
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                      </svg>
                      Telegram
                    </a>
                    {founder.linked_url && (
                      <a
                        href={founder.linked_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                      >
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        LinkedIn
                      </a>
                    )}
                  </div>

                  {/* CTA Button */}
                  <button className="btn-gradient mt-6 w-full md:w-auto">
                    {t("founder.contactBtn")}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Why HomeMed Section */}
      <section className="px-4 pb-20">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 md:text-3xl">
          {t("founder.whyTitle")}
        </h2>
        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          {[t("founder.why1"), t("founder.why2"), t("founder.why3")].map(
            (text, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
                  <svg
                    className="h-5 w-5 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-gray-700">{text}</p>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
}
