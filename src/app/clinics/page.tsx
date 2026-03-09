"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { api } from "@/lib/api";
import type { Clinic, Lang } from "@/lib/types";
import { t as tField } from "@/lib/types";

export default function ClinicsPage() {
  const { t, lang } = useI18n();

  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "private" | "public">("all");

  useEffect(() => {
    api.getClinics().then(setClinics).catch(console.error);
  }, []);

  const filteredClinics = clinics.filter((clinic) => {
    const query = searchQuery.toLowerCase();
    if (!query) return true;
    return (
      clinic.title_uz.toLowerCase().includes(query) ||
      clinic.title_ru.toLowerCase().includes(query) ||
      clinic.title_en.toLowerCase().includes(query) ||
      clinic.address_uz.toLowerCase().includes(query) ||
      clinic.address_ru.toLowerCase().includes(query) ||
      clinic.address_en.toLowerCase().includes(query)
    );
  });

  const tabs: { key: "all" | "private" | "public"; label: string }[] = [
    { key: "all", label: t("clinics.all") },
    { key: "private", label: t("clinics.private") },
    { key: "public", label: t("clinics.public") },
  ];

  return (
    <div className="container-main py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark">{t("clinics.title")}</h1>
        <p className="mt-2 text-gray-text">{t("clinics.subtitle")}</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-text"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 5.1 5.1a7.5 7.5 0 0 0 11.55 11.55z"
            />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("clinics.search")}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors ${
                activeTab === tab.key
                  ? "bg-primary text-white"
                  : "border border-gray-border text-gray-text hover:border-primary hover:text-primary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Clinic Count */}
      <p className="text-sm text-gray-text mb-6">
        {filteredClinics.length} {t("clinics.found")}
      </p>

      {/* Clinic Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClinics.map((clinic) => (
          <div
            key={clinic.id}
            className="bg-white rounded-2xl border border-gray-border p-6 card-shadow card-shadow-hover transition-shadow"
          >
            {/* Icon Placeholder */}
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                />
              </svg>
            </div>

            {/* Clinic Name */}
            <h3 className="text-lg font-bold text-dark mb-2">
              {tField(clinic, "title", lang as Lang)}
            </h3>

            {/* Location */}
            <div className="flex items-start gap-2 text-sm text-gray-text mb-6">
              <svg
                className="w-4 h-4 mt-0.5 shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0z"
                />
              </svg>
              <span>{tField(clinic, "address", lang as Lang)}</span>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 py-2.5 text-sm font-medium border border-gray-border rounded-xl hover:border-primary hover:text-primary transition-colors">
                {t("clinics.view")}
              </button>
              <button className="flex-1 py-2.5 text-sm font-medium btn-gradient rounded-xl">
                {t("nav.openApp")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
