"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { api } from "@/lib/api";
import type { Tip, Lang } from "@/lib/types";
import { t as tField } from "@/lib/types";

const subtitle: Record<Lang, string> = {
  uz: "Sog'lom turmush tarzi uchun kunlik maslahatlar",
  ru: "Ежедневные советы для здорового образа жизни",
  en: "Daily tips for healthy lifestyle",
};

const gradients = [
  "bg-gradient-to-br from-blue-400 to-blue-600",
  "bg-gradient-to-br from-green-400 to-green-600",
  "bg-gradient-to-br from-purple-400 to-purple-600",
];

export default function TipsPage() {
  const { t, lang } = useI18n();

  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getTips()
      .then((data) => setTips(data))
      .catch(() => setTips([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-white">
      <div className="container-main py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-dark">
            {t("nav.tips")}
          </h1>
          <p className="mt-2 text-gray-text text-lg">{subtitle[lang]}</p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-border overflow-hidden animate-pulse"
              >
                <div className="h-48 w-full bg-gray-200" />
                <div className="p-5">
                  <div className="h-5 w-3/4 bg-gray-200 rounded mb-3" />
                  <div className="h-4 w-full bg-gray-200 rounded mb-2" />
                  <div className="h-4 w-5/6 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : tips.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <p className="text-gray-text text-lg">
              {lang === "uz"
                ? "Hozircha tavsiyalar mavjud emas"
                : lang === "ru"
                  ? "Советы пока недоступны"
                  : "No tips available yet"}
            </p>
          </div>
        ) : (
          /* Tips Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tips.map((tip, idx) => (
              <div
                key={tip.id}
                className="bg-white rounded-2xl border border-gray-border overflow-hidden card-shadow card-shadow-hover transition-shadow"
              >
                {/* Image Area */}
                {tip.image ? (
                  <img
                    src={tip.image}
                    alt={tField(tip, "title", lang)}
                    className="h-48 w-full object-cover"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = "none";
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                ) : null}
                <div
                  className={`h-48 w-full ${gradients[idx % 3]} items-center justify-center`}
                  style={{ display: tip.image ? "none" : "flex" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-white opacity-60"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                    />
                  </svg>
                </div>

                {/* Text Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-dark mb-2">
                    {tField(tip, "title", lang)}
                  </h3>
                  <p className="text-gray-text leading-relaxed line-clamp-3">
                    {tField(tip, "description", lang)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
