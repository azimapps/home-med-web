"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { api } from "@/lib/api";
import type { Doctor, Lang } from "@/lib/types";
import { t as tField } from "@/lib/types";

const EXPERIENCE_OPTIONS = ["0-2", "3-5", "6-10", "10+"];

const AVATAR_GRADIENTS = [
  "from-blue-500 to-teal-400",
  "from-purple-500 to-pink-400",
  "from-teal-500 to-emerald-400",
  "from-orange-500 to-yellow-400",
  "from-indigo-500 to-blue-400",
  "from-rose-500 to-red-400",
];

function getInitials(doctor: Doctor, lang: Lang): string {
  const name = tField(doctor, "fullname", lang);
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return (name[0] || "D").toUpperCase();
}

function getGradient(id: number): string {
  return AVATAR_GRADIENTS[id % AVATAR_GRADIENTS.length];
}

function matchesExperience(experience: number, filter: string): boolean {
  switch (filter) {
    case "0-2":
      return experience <= 2;
    case "3-5":
      return experience >= 3 && experience <= 5;
    case "6-10":
      return experience >= 6 && experience <= 10;
    case "10+":
      return experience > 10;
    default:
      return true;
  }
}

export default function DoctorsPage() {
  const { t, lang } = useI18n();

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);
  const [ratingFilter, setRatingFilter] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    api
      .getDoctors()
      .then((data) => setDoctors(data))
      .catch((err) => console.error("Failed to fetch doctors:", err))
      .finally(() => setLoading(false));
  }, []);

  // Derive unique categories from doctors
  const categories = doctors.reduce<{ id: number; title_uz: string; title_ru: string; title_en: string }[]>(
    (acc, doc) => {
      if (doc.category && !acc.find((c) => c.id === doc.category.id)) {
        acc.push(doc.category);
      }
      return acc;
    },
    []
  );

  // Filter and sort
  const filteredDoctors = doctors
    .filter((doctor) => {
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName =
          doctor.fullname_uz.toLowerCase().includes(q) ||
          doctor.fullname_ru.toLowerCase().includes(q) ||
          doctor.fullname_en.toLowerCase().includes(q);
        const matchesCategory =
          doctor.category &&
          (doctor.category.title_uz.toLowerCase().includes(q) ||
            doctor.category.title_ru.toLowerCase().includes(q) ||
            doctor.category.title_en.toLowerCase().includes(q));
        if (!matchesName && !matchesCategory) return false;
      }

      // Category filter
      if (selectedCategory !== null && doctor.category_id !== selectedCategory) {
        return false;
      }

      // Experience filter
      if (selectedExperience !== null && !matchesExperience(doctor.experience, selectedExperience)) {
        return false;
      }

      // Rating filter
      if (ratingFilter && doctor.rating < 4.0) {
        return false;
      }

      return true;
    })
    .sort((a, b) => b.rating - a.rating);

  // Filter sidebar content (reused for mobile and desktop)
  const filterContent = (
    <div className="space-y-6">
      {/* Specialty */}
      <div>
        <h3 className="text-sm font-semibold text-gray-text mb-3 uppercase tracking-wide">
          {t("doctors.specialty")}
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
              selectedCategory === null
                ? "bg-primary text-white border-primary"
                : "bg-white text-dark border-gray-border hover:border-primary hover:text-primary"
            }`}
          >
            {lang === "uz" ? "Barchasi" : lang === "ru" ? "Все" : "All"}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
              className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                selectedCategory === cat.id
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-dark border-gray-border hover:border-primary hover:text-primary"
              }`}
            >
              {tField(cat, "title", lang)}
            </button>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="text-sm font-semibold text-gray-text mb-3 uppercase tracking-wide">
          {t("doctors.rating")}
        </h3>
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.checked)}
            className="w-4 h-4 rounded border-gray-border text-primary focus:ring-primary"
          />
          <span className="text-sm text-dark">4.0+ yulduz</span>
        </label>
      </div>

      {/* Experience */}
      <div>
        <h3 className="text-sm font-semibold text-gray-text mb-3 uppercase tracking-wide">
          {t("doctors.experience")}
        </h3>
        <div className="flex flex-wrap gap-2">
          {EXPERIENCE_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => setSelectedExperience(opt === selectedExperience ? null : opt)}
              className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                selectedExperience === opt
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-dark border-gray-border hover:border-primary hover:text-primary"
              }`}
            >
              {opt === "10+" ? "10+" : opt} yil
            </button>
          ))}
        </div>
      </div>

      {/* Service Type */}
      <div>
        <h3 className="text-sm font-semibold text-gray-text mb-3 uppercase tracking-wide">
          {t("doctors.serviceType")}
        </h3>
        <div className="flex flex-wrap gap-2">
          {[t("doctors.online"), t("doctors.clinic"), t("doctors.homeVisit")].map((label) => (
            <span
              key={label}
              className="px-3 py-1.5 text-sm rounded-full border border-gray-border bg-white text-dark"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container-main py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-dark">{t("doctors.title")}</h1>
        <p className="mt-2 text-gray-text text-lg">{t("doctors.subtitle")}</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-text"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("doctors.search")}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-border bg-white text-dark placeholder:text-gray-text focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
          />
        </div>

        {/* Sort by Rating */}
        <button className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-border bg-white text-dark hover:border-primary transition-colors">
          <svg className="w-4 h-4 text-gray-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
            />
          </svg>
          <span className="text-sm font-medium">{t("doctors.sortByRating")}</span>
        </button>

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          className="flex lg:hidden items-center gap-2 px-4 py-3 rounded-xl border border-gray-border bg-white text-dark hover:border-primary transition-colors"
        >
          <svg className="w-4 h-4 text-gray-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
          <span className="text-sm font-medium">{t("doctors.filters")}</span>
        </button>
      </div>

      {/* Mobile Filters Panel */}
      {mobileFiltersOpen && (
        <div className="lg:hidden mb-6 p-5 bg-white rounded-2xl border border-gray-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-dark">{t("doctors.filters")}</h2>
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="text-gray-text hover:text-dark"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {filterContent}
        </div>
      )}

      {/* Main Content */}
      <div className="flex gap-8">
        {/* Left Sidebar - Desktop Only */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-8">
            <h2 className="text-lg font-semibold text-dark mb-5">{t("doctors.filters")}</h2>
            {filterContent}
          </div>
        </aside>

        {/* Right Content Area */}
        <div className="flex-1 min-w-0">
          {/* Count */}
          <p className="text-sm text-gray-text mb-4">
            {filteredDoctors.length} {t("doctors.found")}
          </p>

          {/* Loading State */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-border p-5 animate-pulse"
                >
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0" />
                    <div className="flex-1 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                      <div className="h-3 bg-gray-200 rounded w-2/3" />
                      <div className="flex gap-2 mt-3">
                        <div className="h-8 bg-gray-200 rounded-lg w-24" />
                        <div className="h-8 bg-gray-200 rounded-lg w-24" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredDoctors.length === 0 ? (
            <div className="text-center py-16">
              <svg
                className="w-16 h-16 text-gray-border mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <p className="text-gray-text text-lg">
                {lang === "uz"
                  ? "Shifokor topilmadi"
                  : lang === "ru"
                  ? "Врачи не найдены"
                  : "No doctors found"}
              </p>
            </div>
          ) : (
            /* Doctor Cards Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="bg-white rounded-2xl border border-gray-border p-5 card-shadow-hover transition-shadow duration-200"
                >
                  <div className="flex gap-4">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      {doctor.avatar ? (
                        <img
                          src={doctor.avatar}
                          alt={tField(doctor, "fullname", lang)}
                          className="w-16 h-16 rounded-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <div
                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${getGradient(doctor.id)} items-center justify-center text-white font-bold text-lg`}
                        style={{ display: doctor.avatar ? "none" : "flex" }}
                      >
                        {getInitials(doctor, lang)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-dark text-base truncate">
                        {tField(doctor, "fullname", lang)}
                      </h3>
                      <p className="text-sm text-gray-text mt-0.5 truncate">
                        {doctor.category ? tField(doctor.category, "title", lang) : ""}
                      </p>

                      {/* Rating & Experience Row */}
                      <div className="flex items-center gap-3 mt-2 text-sm">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="font-semibold text-dark">{doctor.rating.toFixed(1)}</span>
                        </span>
                        <span className="text-gray-border">|</span>
                        <span className="flex items-center gap-1 text-gray-text">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {doctor.experience} {t("doctors.years")}
                        </span>
                      </div>

                      {/* Service Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        <span className="px-2.5 py-0.5 text-xs font-medium rounded-full border border-teal/30 text-teal bg-teal/5">
                          {t("doctors.online")}
                        </span>
                        <span className="px-2.5 py-0.5 text-xs font-medium rounded-full border border-teal/30 text-teal bg-teal/5">
                          {t("doctors.clinic")}
                        </span>
                        <span className="px-2.5 py-0.5 text-xs font-medium rounded-full border border-teal/30 text-teal bg-teal/5">
                          {t("doctors.homeVisit")}
                        </span>
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-2 mt-4">
                        <button className="px-4 py-2 text-sm font-medium text-dark bg-white border border-gray-border rounded-xl hover:border-primary hover:text-primary transition-colors">
                          {t("doctors.viewProfile")}
                        </button>
                        <button className="btn-gradient !px-4 !py-2 !text-sm !rounded-xl">
                          {t("nav.openApp")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
