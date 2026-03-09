"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Lang } from "./types";

const LANG_KEY = "homemed_lang";

const translations: Record<string, Record<Lang, string>> = {
  // Navbar
  "nav.services": { uz: "Xizmatlar", ru: "Услуги", en: "Services" },
  "nav.howItWorks": { uz: "Qanday ishlaydi", ru: "Как это работает", en: "How it works" },
  "nav.doctors": { uz: "Mutaxassislar", ru: "Специалисты", en: "Specialists" },
  "nav.clinics": { uz: "Klinikalar", ru: "Клиники", en: "Clinics" },
  "nav.reviews": { uz: "Izohlar", ru: "Отзывы", en: "Reviews" },
  "nav.founder": { uz: "Asoschi", ru: "Основатель", en: "Founder" },
  "nav.tips": { uz: "Kunlik tavsiyalar", ru: "Ежедневные советы", en: "Daily tips" },
  "nav.contact": { uz: "Kontakt", ru: "Контакт", en: "Contact" },
  "nav.telegram": { uz: "Telegram'da yozish", ru: "Написать в Telegram", en: "Write on Telegram" },
  "nav.openApp": { uz: "Ilovada ochish", ru: "Открыть в приложении", en: "Open in app" },

  // Hero
  "hero.title1": { uz: "Shifokor yoningizda.", ru: "Врач рядом с вами.", en: "Doctor by your side." },
  "hero.title2": { uz: "Har doim.", ru: "Всегда.", en: "Always." },
  "hero.subtitle": {
    uz: "Onlayn konsultatsiya, klinikada uchrashuv yoki uyga tashrif — siz uchun qulay usulni tanlang.",
    ru: "Онлайн консультация, встреча в клинике или визит на дом — выберите удобный способ.",
    en: "Online consultation, clinic visit or home visit — choose the convenient way for you.",
  },
  "hero.applyApp": { uz: "Ilovada ariza yuborish", ru: "Подать заявку в приложении", en: "Apply in app" },
  "hero.writeTelegram": { uz: "Telegram'da yozish", ru: "Написать в Telegram", en: "Write on Telegram" },
  "hero.call": { uz: "Qo'ng'iroq qilish", ru: "Позвонить", en: "Call" },
  "hero.verifiedDoctors": { uz: "Tekshirilgan shifokorlar", ru: "Проверенные врачи", en: "Verified doctors" },
  "hero.safePrivate": { uz: "Xavfsiz va maxfiy", ru: "Безопасно и конфиденциально", en: "Safe and private" },

  // How it works
  "howItWorks.title": { uz: "Qanday ishlaydi?", ru: "Как это работает?", en: "How does it work?" },
  "howItWorks.subtitle": {
    uz: "Uch oddiy qadamda tibbiy yordam oling",
    ru: "Получите медицинскую помощь в три простых шага",
    en: "Get medical help in three simple steps",
  },
  "howItWorks.step1.title": { uz: "Ariza yuborish", ru: "Подать заявку", en: "Submit request" },
  "howItWorks.step1.desc": {
    uz: "Ilovada arizangizni to'ldiring va shifokorni tanlang",
    ru: "Заполните заявку в приложении и выберите врача",
    en: "Fill out the application and choose a doctor",
  },
  "howItWorks.step2.title": { uz: "Xizmat turini tanlash", ru: "Выбрать тип услуги", en: "Choose service type" },
  "howItWorks.step2.desc": {
    uz: "Onlayn, klinikada yoki uyga tashrif — sizga qulayi",
    ru: "Онлайн, в клинике или на дом — как вам удобно",
    en: "Online, at clinic or home visit — your convenience",
  },
  "howItWorks.step3.title": { uz: "Tibbiy yordam", ru: "Медицинская помощь", en: "Medical care" },
  "howItWorks.step3.desc": {
    uz: "Professional shifokor bilan konsultatsiya va davolash",
    ru: "Консультация и лечение с профессиональным врачом",
    en: "Consultation and treatment with a professional doctor",
  },

  // Services
  "services.title": { uz: "Xizmatlar", ru: "Услуги", en: "Services" },
  "services.subtitle": {
    uz: "Sizga qulay usulda tibbiy yordam oling",
    ru: "Получите медицинскую помощь удобным способом",
    en: "Get medical help in a convenient way",
  },
  "services.applyBtn": { uz: "Ilovada ariza qoldirish", ru: "Оставить заявку", en: "Submit request" },

  // Trust
  "trust.title": { uz: "Xavfsizlik va ishonch", ru: "Безопасность и доверие", en: "Safety and trust" },
  "trust.subtitle": {
    uz: "HomeMed'da barcha shifokorlar tekshirilgan va litsenziyaga ega. Sizning shaxsiy ma'lumotlaringiz maxfiy saqlanadi va uchinchi shaxslarga berilmaydi.",
    ru: "Все врачи HomeMed проверены и лицензированы. Ваши персональные данные хранятся конфиденциально и не передаются третьим лицам.",
    en: "All HomeMed doctors are verified and licensed. Your personal data is stored confidentially and not shared with third parties.",
  },
  "trust.verified.title": { uz: "Tekshirilgan shifokorlar", ru: "Проверенные врачи", en: "Verified doctors" },
  "trust.verified.desc": {
    uz: "Barcha mutaxassislar litsenziyaga ega",
    ru: "Все специалисты лицензированы",
    en: "All specialists are licensed",
  },
  "trust.privacy.title": { uz: "Maxfiylik kafolati", ru: "Гарантия конфиденциальности", en: "Privacy guarantee" },
  "trust.privacy.desc": {
    uz: "Ma'lumotlaringiz shifrlangan holda saqlanadi",
    ru: "Ваши данные хранятся в зашифрованном виде",
    en: "Your data is stored encrypted",
  },
  "trust.support.title": { uz: "24/7 yordam", ru: "Поддержка 24/7", en: "24/7 support" },
  "trust.support.desc": {
    uz: "Har qanday vaqtda bog'lanishingiz mumkin",
    ru: "Вы можете связаться в любое время",
    en: "You can contact us at any time",
  },

  // Doctors page
  "doctors.title": { uz: "Mutaxassislar", ru: "Специалисты", en: "Specialists" },
  "doctors.subtitle": { uz: "Sizga mos shifokorni toping", ru: "Найдите подходящего врача", en: "Find the right doctor" },
  "doctors.search": {
    uz: "Shifokor yoki mutaxassislik qidirish...",
    ru: "Поиск врача или специальности...",
    en: "Search doctor or specialty...",
  },
  "doctors.sortByRating": { uz: "Reyting bo'yicha", ru: "По рейтингу", en: "By rating" },
  "doctors.filters": { uz: "Filtrlar", ru: "Фильтры", en: "Filters" },
  "doctors.found": { uz: "ta shifokor topildi", ru: "врачей найдено", en: "doctors found" },
  "doctors.specialty": { uz: "Mutaxassislik", ru: "Специальность", en: "Specialty" },
  "doctors.rating": { uz: "Reyting", ru: "Рейтинг", en: "Rating" },
  "doctors.experience": { uz: "Tajriba", ru: "Опыт", en: "Experience" },
  "doctors.serviceType": { uz: "Xizmat turi", ru: "Тип услуги", en: "Service type" },
  "doctors.viewProfile": { uz: "Profilni ko'rish", ru: "Посмотреть профиль", en: "View profile" },
  "doctors.years": { uz: "yil", ru: "лет", en: "years" },
  "doctors.online": { uz: "Onlayn", ru: "Онлайн", en: "Online" },
  "doctors.clinic": { uz: "Klinikada", ru: "В клинике", en: "At clinic" },
  "doctors.homeVisit": { uz: "Uyga tashrif", ru: "На дом", en: "Home visit" },

  // Clinics page
  "clinics.title": { uz: "Klinikalar", ru: "Клиники", en: "Clinics" },
  "clinics.subtitle": { uz: "Sizga yaqin klinikani toping", ru: "Найдите ближайшую клинику", en: "Find a nearby clinic" },
  "clinics.search": {
    uz: "Klinika nomi yoki manzil qidirish...",
    ru: "Поиск по названию или адресу...",
    en: "Search by name or address...",
  },
  "clinics.all": { uz: "Barchasi", ru: "Все", en: "All" },
  "clinics.private": { uz: "Xususiy", ru: "Частные", en: "Private" },
  "clinics.public": { uz: "Davlat", ru: "Государственные", en: "Public" },
  "clinics.found": { uz: "ta klinika topildi", ru: "клиник найдено", en: "clinics found" },
  "clinics.view": { uz: "Ko'rish", ru: "Посмотреть", en: "View" },

  // Founder page
  "founder.title": { uz: "Asoschi", ru: "Основатель", en: "Founder" },
  "founder.subtitle": { uz: "HomeMed loyihasining asoschisi", ru: "Основатель проекта HomeMed", en: "Founder of HomeMed project" },
  "founder.contactBtn": { uz: "Asoschi bilan bog'lanish", ru: "Связаться с основателем", en: "Contact the founder" },
  "founder.whyTitle": { uz: "Nega HomeMed?", ru: "Почему HomeMed?", en: "Why HomeMed?" },
  "founder.why1": {
    uz: "Professional shifokorlar bilan oson bog'lanish",
    ru: "Легкая связь с профессиональными врачами",
    en: "Easy connection with professional doctors",
  },
  "founder.why2": {
    uz: "Zamonaviy texnologiyalar orqali sog'liqni nazorat qilish",
    ru: "Контроль здоровья с помощью современных технологий",
    en: "Health monitoring through modern technologies",
  },
  "founder.why3": {
    uz: "Barcha uchun qulay va ishonchli tibbiy xizmatlar",
    ru: "Удобные и надежные медицинские услуги для всех",
    en: "Convenient and reliable medical services for everyone",
  },

  // Contact page
  "contact.title": { uz: "Biz bilan bog'lanish", ru: "Свяжитесь с нами", en: "Contact us" },
  "contact.subtitle": {
    uz: "Savollaringiz bormi? Biz har doim yordam berishga tayyormiz",
    ru: "Есть вопросы? Мы всегда готовы помочь",
    en: "Have questions? We are always ready to help",
  },
  "contact.phone": { uz: "Telefon", ru: "Телефон", en: "Phone" },
  "contact.phoneDesc": {
    uz: "Ishonch telefoni orqali biz bilan bog'laning",
    ru: "Свяжитесь с нами по телефону доверия",
    en: "Contact us via phone",
  },
  "contact.telegram": { uz: "Telegram", ru: "Telegram", en: "Telegram" },
  "contact.telegramDesc": {
    uz: "Telegram orqali tezkor javob oling",
    ru: "Получите быстрый ответ через Telegram",
    en: "Get a quick response via Telegram",
  },
  "contact.office": { uz: "Ofis manzili", ru: "Адрес офиса", en: "Office address" },
  "contact.officeAddr": {
    uz: "Amir Temur ko'chasi 108, Toshkent shahri, O'zbekiston",
    ru: "Улица Амира Темура 108, Ташкент, Узбекистан",
    en: "Amir Temur street 108, Tashkent, Uzbekistan",
  },
  "contact.workHours": { uz: "Ish vaqti", ru: "Рабочие часы", en: "Working hours" },
  "contact.weekdays": { uz: "Dushanba - Juma: 09:00 - 18:00", ru: "Понедельник - Пятница: 09:00 - 18:00", en: "Monday - Friday: 09:00 - 18:00" },
  "contact.saturday": { uz: "Shanba: 09:00 - 14:00", ru: "Суббота: 09:00 - 14:00", en: "Saturday: 09:00 - 14:00" },
  "contact.sunday": { uz: "Yakshanba: Dam olish kuni", ru: "Воскресенье: Выходной", en: "Sunday: Day off" },
  "contact.downloadTitle": {
    uz: "HomeMed ilovasini yuklab oling",
    ru: "Скачайте приложение HomeMed",
    en: "Download the HomeMed app",
  },
  "contact.downloadDesc": {
    uz: "Barcha xizmatlarimizdan to'liq foydalanish uchun mobil ilovamizni yuklab oling. Shifokorlar bilan bog'lanish, ariza yuborish va ko'p boshqa imkoniyatlar.",
    ru: "Скачайте наше мобильное приложение для полного доступа ко всем услугам. Связь с врачами, подача заявок и многое другое.",
    en: "Download our mobile app for full access to all services. Contact doctors, submit requests and much more.",
  },
  "contact.downloadBtn": { uz: "App Store'dan yuklab olish", ru: "Скачать из App Store", en: "Download from App Store" },
  "contact.onlineConsultation": { uz: "Onlayn konsultatsiya", ru: "Онлайн консультация", en: "Online consultation" },
  "contact.clinicBooking": { uz: "Klinikaga yozilish", ru: "Запись в клинику", en: "Clinic booking" },
  "contact.homeVisitOrder": { uz: "Uyga shifokor chaqirish", ru: "Вызов врача на дом", en: "Call doctor home" },
  "contact.medHistory": { uz: "Tibbiy tarixni saqlash", ru: "Сохранение медицинской истории", en: "Save medical history" },

  // Footer
  "footer.desc": {
    uz: "Shifokor yoningizda. Har doim. Onlayn, klinikada yoki uyga tashrif orqali sifatli tibbiy xizmat.",
    ru: "Врач рядом с вами. Всегда. Качественные медицинские услуги онлайн, в клинике или на дому.",
    en: "Doctor by your side. Always. Quality medical services online, at clinic or at home.",
  },
  "footer.downloadApp": { uz: "Ilovani yuklab olish", ru: "Скачать приложение", en: "Download app" },
  "footer.pages": { uz: "Sahifalar", ru: "Страницы", en: "Pages" },
  "footer.info": { uz: "Ma'lumot", ru: "Информация", en: "Information" },
  "footer.contactUs": { uz: "Bog'lanish", ru: "Связаться", en: "Contact" },
  "footer.terms": { uz: "Foydalanish shartlari", ru: "Условия использования", en: "Terms of use" },
  "footer.privacy": { uz: "Maxfiylik siyosati", ru: "Политика конфиденциальности", en: "Privacy policy" },
  "footer.about": { uz: "Biz haqimizda", ru: "О нас", en: "About us" },
  "footer.copyright": {
    uz: "© 2026 HomeMed.uz. Barcha huquqlar himoyalangan.",
    ru: "© 2026 HomeMed.uz. Все права защищены.",
    en: "© 2026 HomeMed.uz. All rights reserved.",
  },

  // Language names
  "lang.uz": { uz: "O'zbek", ru: "Узбекский", en: "Uzbek" },
  "lang.ru": { uz: "Русский", ru: "Русский", en: "Russian" },
  "lang.en": { uz: "English", ru: "Английский", en: "English" },
};

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  lang: "uz",
  setLang: () => {},
  t: (key: string) => key,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem(LANG_KEY) as Lang) || "uz";
    }
    return "uz";
  });

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem(LANG_KEY, newLang);
    }
  }, []);

  const translate = useCallback(
    (key: string) => {
      return translations[key]?.[lang] || translations[key]?.uz || key;
    },
    [lang]
  );

  return (
    <I18nContext.Provider value={{ lang, setLang, t: translate }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
