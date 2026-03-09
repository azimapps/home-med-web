"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import type { Lang } from "@/lib/types";

interface Review {
  id: number;
  name: string;
  date: string;
  rating: number;
  text_uz: string;
  text_ru: string;
  text_en: string;
  ref_uz: string;
  ref_ru: string;
  ref_en: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Sardor A.",
    date: "2026 M02 14",
    rating: 5,
    text_uz: "Klinika juda toza va zamonaviy. Xodimlar mehmondo'st.",
    text_ru: "Клиника очень чистая и современная. Персонал гостеприимный.",
    text_en: "The clinic is very clean and modern. Staff is hospitable.",
    ref_uz: "Klinika: Medion Klinikasi",
    ref_ru: "Клиника: Medion Klinikasi",
    ref_en: "Clinic: Medion Klinikasi",
  },
  {
    id: 2,
    name: "Zarina M.",
    date: "2026 M02 12",
    rating: 5,
    text_uz: "Farzandim uchun eng yaxshi pediatr. Juda mehrbon va tajribali.",
    text_ru: "Лучший педиатр для моего ребенка. Очень добрый и опытный.",
    text_en: "The best pediatrician for my child. Very kind and experienced.",
    ref_uz: "Shifokor: Dr. Malika Nurmatova",
    ref_ru: "Врач: Dr. Malika Nurmatova",
    ref_en: "Doctor: Dr. Malika Nurmatova",
  },
  {
    id: 3,
    name: "Dilshod R.",
    date: "2026 M02 10",
    rating: 5,
    text_uz: "Dr. Aziza juda professional. Yurak muammolarim bilan yordam berdi. Tavsiya qilaman!",
    text_ru: "Доктор Азиза очень профессиональна. Помогла с проблемами сердца. Рекомендую!",
    text_en: "Dr. Aziza is very professional. Helped with my heart problems. Highly recommend!",
    ref_uz: "Shifokor: Dr. Aziza Karimova",
    ref_ru: "Врач: Dr. Aziza Karimova",
    ref_en: "Doctor: Dr. Aziza Karimova",
  },
  {
    id: 4,
    name: "Nodira S.",
    date: "2026 M02 08",
    rating: 5,
    text_uz: "Onlayn konsultatsiya juda qulay. Uydan chiqmasdan shifokor bilan gaplashdim.",
    text_ru: "Онлайн консультация очень удобная. Поговорил с врачом не выходя из дома.",
    text_en: "Online consultation is very convenient. Talked to a doctor without leaving home.",
    ref_uz: "Shifokor: Dr. Jahongir Rahimov",
    ref_ru: "Врач: Dr. Jahongir Rahimov",
    ref_en: "Doctor: Dr. Jahongir Rahimov",
  },
  {
    id: 5,
    name: "Bekzod T.",
    date: "2026 M02 05",
    rating: 5,
    text_uz: "Uyga tashrif xizmati ajoyib. Shifokor o'z vaqtida keldi va professional edi.",
    text_ru: "Услуга визита на дом отличная. Врач пришел вовремя и был профессионален.",
    text_en: "Home visit service is great. Doctor arrived on time and was professional.",
    ref_uz: "Shifokor: Dr. Farrux Tursunov",
    ref_ru: "Врач: Dr. Farrux Tursunov",
    ref_en: "Doctor: Dr. Farrux Tursunov",
  },
  {
    id: 6,
    name: "Gulnora K.",
    date: "2026 M02 02",
    rating: 5,
    text_uz: "Sifat Med Markaz juda yaxshi. Diagnostika xizmati a'lo darajada.",
    text_ru: "Сифат Мед Марказ очень хорош. Диагностические услуги на высшем уровне.",
    text_en: "Sifat Med Markaz is excellent. Diagnostic services are top-notch.",
    ref_uz: "Klinika: Sifat Med Markaz",
    ref_ru: "Клиника: Sifat Med Markaz",
    ref_en: "Clinic: Sifat Med Markaz",
  },
];

type SortType = "new" | "high" | "low";

const labels: Record<string, Record<Lang, string>> = {
  title: { uz: "Izohlar", ru: "Отзывы", en: "Reviews" },
  subtitle: {
    uz: "Bemorlarning fikrlari va tajribalari",
    ru: "Мнения и опыт пациентов",
    en: "Patient opinions and experiences",
  },
  overallRating: { uz: "Umumiy reyting", ru: "Общий рейтинг", en: "Overall rating" },
  reviewCount: { uz: "ta izoh", ru: "отзывов", en: "reviews" },
  sort: { uz: "Saralash:", ru: "Сортировка:", en: "Sort:" },
  sortNew: { uz: "Yangi", ru: "Новые", en: "New" },
  sortHigh: { uz: "Yuqori reyting", ru: "Высокий рейтинг", en: "High rating" },
  sortLow: { uz: "Past reyting", ru: "Низкий рейтинг", en: "Low rating" },
  syncNote: {
    uz: "Izohlar HomeMed ilovasi bilan sinxronlashgan",
    ru: "Отзывы синхронизированы с приложением HomeMed",
    en: "Reviews synced with HomeMed app",
  },
};

function Stars({ count, size = "w-5 h-5" }: { count: number; size?: string }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`${size} ${i <= count ? "text-yellow-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const { lang } = useI18n();
  const [sort, setSort] = useState<SortType>("new");

  const sorted = [...reviews].sort((a, b) => {
    if (sort === "high") return b.rating - a.rating;
    if (sort === "low") return a.rating - b.rating;
    return 0; // already newest first
  });

  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  // Rating distribution
  const dist = [0, 0, 0, 0, 0];
  reviews.forEach((r) => {
    if (r.rating >= 1 && r.rating <= 5) dist[r.rating - 1]++;
  });
  const maxDist = Math.max(...dist, 1);

  return (
    <div className="bg-white min-h-screen">
      <div className="container-main py-8 lg:py-12">
        {/* Header */}
        <h1 className="text-3xl lg:text-4xl font-bold text-dark">
          {labels.title[lang]}
        </h1>
        <p className="mt-2 text-gray-text text-lg">
          {labels.subtitle[lang]}
        </p>

        {/* Main layout */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Overall Rating */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-border p-6 card-shadow sticky top-24">
              <h2 className="text-lg font-bold text-dark mb-4">
                {labels.overallRating[lang]}
              </h2>

              {/* Big rating */}
              <div className="text-center mb-4">
                <p className="text-5xl font-bold text-dark">{avgRating}</p>
                <div className="flex justify-center mt-2">
                  <Stars count={Math.round(Number(avgRating))} size="w-6 h-6" />
                </div>
                <p className="text-sm text-gray-text mt-2">
                  {reviews.length} {labels.reviewCount[lang]}
                </p>
              </div>

              {/* Distribution bars */}
              <div className="space-y-2 mt-6">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-sm text-dark w-3 text-right">{star}</span>
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${(dist[star - 1] / maxDist) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-text w-4 text-right">
                      {dist[star - 1]}
                    </span>
                  </div>
                ))}
              </div>

              {/* Sync note */}
              <div className="mt-6 pt-4 border-t border-gray-border">
                <p className="text-xs text-gray-text flex items-center gap-1.5">
                  <span className="text-base">📱</span>
                  {labels.syncNote[lang]}
                </p>
              </div>
            </div>
          </div>

          {/* Right - Review list */}
          <div className="lg:col-span-2">
            {/* Sort tabs */}
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span className="text-sm text-gray-text font-medium">
                {labels.sort[lang]}
              </span>
              {(["new", "high", "low"] as SortType[]).map((s) => {
                const key = `sort${s.charAt(0).toUpperCase() + s.slice(1)}` as keyof typeof labels;
                return (
                  <button
                    key={s}
                    onClick={() => setSort(s)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      sort === s
                        ? "bg-primary text-white"
                        : "bg-gray-light text-dark hover:bg-gray-200 border border-gray-border"
                    }`}
                  >
                    {labels[key][lang]}
                  </button>
                );
              })}
            </div>

            {/* Reviews */}
            <div className="space-y-4">
              {sorted.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-2xl border border-gray-border p-6 card-shadow"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-dark">{review.name}</h3>
                      <p className="text-sm text-gray-text">{review.date}</p>
                    </div>
                    <Stars count={review.rating} />
                  </div>

                  {/* Text */}
                  <p className="text-dark leading-relaxed">
                    {review[`text_${lang}` as keyof Review] as string}
                  </p>

                  {/* Reference */}
                  <p className="mt-3 text-sm text-gray-text">
                    · {review[`ref_${lang}` as keyof Review] as string}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
