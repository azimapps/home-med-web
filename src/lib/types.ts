export type Lang = "uz" | "ru" | "en";

export interface Advantage {
  id: number;
  title_uz: string;
  title_ru: string;
  title_en: string;
  description_uz: string;
  description_ru: string;
  description_en: string;
  image: string;
}

export interface Category {
  id: number;
  title_uz: string;
  title_ru: string;
  title_en: string;
  avatar?: string;
}

export interface Clinic {
  id: number;
  title_uz: string;
  title_ru: string;
  title_en: string;
  address_uz: string;
  address_ru: string;
  address_en: string;
  lat: number;
  lon: number;
}

export interface Contacts {
  phone_numbers: string[];
  telegram_support_url: string;
}

export interface DoctorSchedule {
  day_of_week: number;
  slots: string[];
}

export interface Doctor {
  id: number;
  fullname_uz: string;
  fullname_ru: string;
  fullname_en: string;
  price: number;
  experience: number;
  category_id: number;
  category: Category;
  clinic_id: number;
  clinic: Clinic;
  rating: number;
  avatar: string;
  schedules: DoctorSchedule[];
}

export interface FAQ {
  id: number;
  question_uz: string;
  question_ru: string;
  question_en: string;
  answer_uz: string;
  answer_ru: string;
  answer_en: string;
}

export interface Founder {
  id: number;
  name_uz: string;
  name_ru: string;
  name_en: string;
  position_uz: string;
  position_ru: string;
  position_en: string;
  description_uz: string;
  description_ru: string;
  description_en: string;
  linked_url: string;
  avatar: string;
}

export interface Service {
  id: number;
  title_uz: string;
  title_ru: string;
  title_en: string;
  description_uz: string;
  description_ru: string;
  description_en: string;
  price: number;
  image: string;
}

export interface Tip {
  id: number;
  title_uz: string;
  title_ru: string;
  title_en: string;
  description_uz: string;
  description_ru: string;
  description_en: string;
  image: string;
  order: number;
  is_active: boolean;
}

export interface Notification {
  id: number;
  title_uz: string;
  title_ru: string;
  title_en: string;
  body_uz: string;
  body_ru: string;
  body_en: string;
  is_read: boolean;
  created_at: string;
}

// Helper to get localized field
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function t(obj: any, field: string, lang: Lang): string {
  return obj[`${field}_${lang}`] || obj[`${field}_uz`] || "";
}
