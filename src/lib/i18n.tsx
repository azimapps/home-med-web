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
  "nav.tips": { uz: "Tavsiyalar", ru: "Советы", en: "Tips" },
  "nav.contact": { uz: "Kontakt", ru: "Контакт", en: "Contact" },
  "nav.telegram": { uz: "Telegram'da yozish", ru: "Написать в Telegram", en: "Write on Telegram" },
  "nav.openApp": { uz: "Ilovada ochish", ru: "Открыть в приложении", en: "Open in app" },

  // Hero
  "hero.pill": {
    uz: "Onlayn va uyga tashrif",
    ru: "Онлайн и на дом",
    en: "Online & home visits",
  },
  "hero.title1": { uz: "Shifokor yoningizda.", ru: "Врач рядом с вами.", en: "A doctor by your side." },
  "hero.title2": { uz: "Har doim.", ru: "Всегда.", en: "Always." },
  "hero.subtitle": {
    uz: "Onlayn konsultatsiya, klinikada uchrashuv yoki uyga tashrif — siz uchun qulay usulni tanlang.",
    ru: "Онлайн консультация, встреча в клинике или визит на дом — выберите удобный способ.",
    en: "Online consultation, a clinic appointment, or a home visit — choose the way that works for you.",
  },
  "hero.applyApp": { uz: "Ilovada ariza yuborish", ru: "Подать заявку в приложении", en: "Send a request in the app" },
  "actionbar.send": { uz: "Ariza yuborish", ru: "Отправить", en: "Send a request" },
  "hero.writeTelegram": { uz: "Telegram'da yozish", ru: "Написать в Telegram", en: "Message on Telegram" },
  "hero.call": { uz: "Qo'ng'iroq qilish", ru: "Позвонить", en: "Call us" },
  "hero.verifiedDoctors": { uz: "Tekshirilgan shifokorlar", ru: "Проверенные врачи", en: "Verified doctors" },
  "hero.safePrivate": { uz: "Xavfsiz va maxfiy", ru: "Безопасно и конфиденциально", en: "Safe & confidential" },
  "hero.cardOnline": { uz: "Onlayn qabul", ru: "Онлайн приём", en: "Online visit" },
  "hero.cardOnlineSub": { uz: "5 daqiqada ulanish", ru: "Подключение за 5 мин", en: "Connect in 5 min" },
  "hero.cardDoctors": { uz: "faol shifokorlar", ru: "активных врачей", en: "active doctors" },

  // Stats
  "stats.doctors": { uz: "Tekshirilgan shifokorlar", ru: "Проверенные врачи", en: "Verified doctors" },
  "stats.consults": { uz: "O'tkazilgan konsultatsiya", ru: "Проведённые консультации", en: "Consultations completed" },
  "stats.cities": { uz: "O'zbekiston shaharlari", ru: "Города Узбекистана", en: "Cities in Uzbekistan" },
  "stats.rating": { uz: "App Store reytingi", ru: "Рейтинг в App Store", en: "App Store rating" },

  // How it works
  "howItWorks.eyebrow": { uz: "Qanday ishlaydi", ru: "Как это работает", en: "How it works" },
  "howItWorks.title": {
    uz: "Uch qadamda shifokor yoningizda",
    ru: "Врач рядом за три шага",
    en: "A doctor by your side in three steps",
  },
  "howItWorks.subtitle": {
    uz: "Ariza qoldiring, mutaxassisni tanlang va sizga qulay formatda yordam oling.",
    ru: "Оставьте заявку, выберите специалиста и получите помощь в удобном формате.",
    en: "Leave a request, pick a specialist and get care in the format that suits you.",
  },
  "howItWorks.step1.title": { uz: "Ariza qoldiring", ru: "Оставьте заявку", en: "Leave a request" },
  "howItWorks.step1.desc": {
    uz: "Ilova, Telegram yoki qo'ng'iroq orqali — bir daqiqada murojaat qiling.",
    ru: "Через приложение, Telegram или звонок — обращайтесь за минуту.",
    en: "Via the app, Telegram or a phone call — reach out in under a minute.",
  },
  "howItWorks.step2.title": { uz: "Mutaxassisni tanlang", ru: "Выберите специалиста", en: "Choose a specialist" },
  "howItWorks.step2.desc": {
    uz: "Shifokor yo'nalishi va sizga qulay vaqtni tanlang — biz mosini topamiz.",
    ru: "Выберите специальность и удобное время — мы подберём подходящего врача.",
    en: "Pick a specialty and a time that suits you — we match the right doctor.",
  },
  "howItWorks.step3.title": { uz: "Maslahat oling", ru: "Получите помощь", en: "Get care" },
  "howItWorks.step3.desc": {
    uz: "Onlayn, klinikada yoki uyingizda — sizga ma'qul formatda qabulga chiqing.",
    ru: "Онлайн, в клинике или дома — в удобном для вас формате.",
    en: "Online, at the clinic or at home — meet in the format you prefer.",
  },
  "howItWorks.step4.title": { uz: "Kuzatuvda qoling", ru: "Оставайтесь на связи", en: "Stay in follow-up" },
  "howItWorks.step4.desc": {
    uz: "Tavsiyalar, retseptlar va keyingi qadamlar — barchasi ilovangizda saqlanadi.",
    ru: "Рекомендации, рецепты и следующие шаги — всё в вашем приложении.",
    en: "Recommendations, prescriptions and next steps — all saved in your app.",
  },

  // Services
  "services.eyebrow": { uz: "Xizmatlar", ru: "Услуги", en: "Services" },
  "services.title": {
    uz: "Sizga qulay tibbiy yordam formati",
    ru: "Медицинская помощь в удобном для вас формате",
    en: "Care in the format that suits you",
  },
  "services.subtitle": {
    uz: "Bir ilovada uchta yo'nalish — har biri tekshirilgan shifokorlar bilan.",
    ru: "Три формата в одном приложении — каждый с проверенными врачами.",
    en: "Three formats in one app — each with verified doctors.",
  },
  "services.applyBtn": { uz: "Ilovada ariza qoldirish", ru: "Оставить заявку", en: "Submit request" },
  "services.learnMore": { uz: "Batafsil", ru: "Подробнее", en: "Learn more" },
  "services.online": { uz: "Onlayn konsultatsiya", ru: "Онлайн консультация", en: "Online consultation" },
  "services.onlineDesc": {
    uz: "Uydan chiqmasdan video yoki chat orqali shifokor bilan bog'laning. O'rtacha kutish — 5 daqiqa.",
    ru: "Свяжитесь с врачом по видео или чату, не выходя из дома. Среднее ожидание — 5 минут.",
    en: "Connect with a doctor by video or chat without leaving home. Average wait — 5 minutes.",
  },
  "services.clinic": { uz: "Klinikada qabul", ru: "Приём в клинике", en: "Clinic appointment" },
  "services.clinicDesc": {
    uz: "Hamkor klinikalardan birida qulay vaqtga yoziling — navbatsiz va shaffof narxlarda.",
    ru: "Запишитесь в одну из партнёрских клиник на удобное время — без очередей и прозрачные цены.",
    en: "Book a convenient time at a partner clinic — no queues, transparent pricing.",
  },
  "services.home": { uz: "Uyga shifokor", ru: "Врач на дом", en: "Doctor at home" },
  "services.homeDesc": {
    uz: "Shifokor yoki hamshira uyingizga keladi — tahlillar, ukol va kuzatuv ham bir joyda.",
    ru: "Врач или медсестра приедут к вам домой — анализы, уколы и наблюдение в одном месте.",
    en: "A doctor or nurse comes to you — tests, injections and follow-up in one place.",
  },

  // Specialists
  "specialists.eyebrow": { uz: "Mutaxassislar", ru: "Специалисты", en: "Specialists" },
  "specialists.title": {
    uz: "Tekshirilgan shifokorlar jamoasi",
    ru: "Команда проверенных врачей",
    en: "A team of verified doctors",
  },
  "specialists.subtitle": {
    uz: "Har bir mutaxassis diplom va tajriba bo'yicha tekshiruvdan o'tadi.",
    ru: "Каждый специалист проходит проверку дипломов и опыта.",
    en: "Every specialist is vetted for credentials and experience.",
  },
  "specialists.therapist": { uz: "Terapevt", ru: "Терапевт", en: "Therapist" },
  "specialists.pediatrician": { uz: "Pediatr", ru: "Педиатр", en: "Pediatrician" },
  "specialists.cardiologist": { uz: "Kardiolog", ru: "Кардиолог", en: "Cardiologist" },
  "specialists.neurologist": { uz: "Nevrolog", ru: "Невролог", en: "Neurologist" },
  "specialists.yearsExp": { uz: "yil tajriba", ru: "лет опыта", en: "yrs exp." },

  // Clinics section (homepage)
  "clinicsHome.eyebrow": { uz: "Klinikalar", ru: "Клиники", en: "Clinics" },
  "clinicsHome.title": {
    uz: "Ishonchli hamkor klinikalar",
    ru: "Надёжные партнёрские клиники",
    en: "Trusted partner clinics",
  },
  "clinicsHome.subtitle": {
    uz: "O'zbekiston bo'ylab tekshirilgan klinikalar tarmog'i bilan ishlaymiz.",
    ru: "Мы работаем с проверенной сетью клиник по всему Узбекистану.",
    en: "We work with a vetted network of clinics across Uzbekistan.",
  },
  "cities.tashkent": { uz: "Toshkent", ru: "Ташкент", en: "Tashkent" },
  "cities.samarkand": { uz: "Samarqand", ru: "Самарканд", en: "Samarkand" },
  "cities.bukhara": { uz: "Buxoro", ru: "Бухара", en: "Bukhara" },
  "cities.andijan": { uz: "Andijon", ru: "Андижан", en: "Andijan" },

  // Reviews
  "reviewsHome.eyebrow": { uz: "Izohlar", ru: "Отзывы", en: "Reviews" },
  "reviewsHome.title": { uz: "Bemorlar nima deydi", ru: "Что говорят пациенты", en: "What patients say" },
  "reviewsHome.subtitle": {
    uz: "Minglab oilalar HomeMed orqali shifokor bilan bog'lanmoqda.",
    ru: "Тысячи семей связываются с врачами через HomeMed.",
    en: "Thousands of families connect with a doctor through HomeMed.",
  },
  "reviewsHome.r1": {
    uz: "“Tunda bolamning harorati ko'tarildi. 10 daqiqada pediatr bilan video qabulga chiqdik va aniq tavsiya oldik. Juda qulay!”",
    ru: "«Ночью у ребёнка поднялась температура. За 10 минут вышли на видеоприём с педиатром и получили чёткие рекомендации. Очень удобно!»",
    en: "“My child had a fever at night. Within 10 minutes we were on a video visit with a pediatrician and got clear advice. So convenient!”",
  },
  "reviewsHome.r2": {
    uz: "“Buvimga uyga shifokor chaqirdik. Hamshira tahlillarni uydan oldi, natijalar ilovaga keldi. Oilaviy do'ktor kabi.”",
    ru: "«Вызвали врача на дом бабушке. Медсестра взяла анализы дома, результаты пришли в приложение. Как семейный врач.»",
    en: "“We called a doctor home for my grandmother. The nurse took tests at home and results arrived in the app. Like a family doctor.”",
  },
  "reviewsHome.r3": {
    uz: "“Klinikaga navbatsiz yozildim, hamma narsa ilovada. Vrach tavsiyalari va retsept ham shu yerda saqlanadi.”",
    ru: "«Записалась в клинику без очереди, всё в приложении. Рекомендации врача и рецепт тоже сохраняются здесь.»",
    en: "“Booked a clinic with no queue, everything in the app. The doctor's notes and prescription are saved right there too.”",
  },

  // Founder (homepage)
  "founderHome.eyebrow": { uz: "Asoschi", ru: "Основатель", en: "Founder" },
  "founderHome.quote": {
    uz: "“Biz tibbiyotni har bir oila uchun yaqin, tushunarli va inson tomonida bo'lishini xohlaymiz — texnologiya buni faqat osonlashtiradi.”",
    ru: "«Мы хотим, чтобы медицина была близкой, понятной и на стороне человека для каждой семьи — технологии лишь упрощают это.»",
    en: "“We want medicine to feel close, understandable and on the human's side for every family — technology only makes that easier.”",
  },
  "founderHome.name": { uz: "Doniyor Safarov", ru: "Дониёр Сафаров", en: "Doniyor Safarov" },
  "founderHome.position": {
    uz: "Asoschi va bosh direktor, HomeMed",
    ru: "Основатель и генеральный директор, HomeMed",
    en: "Founder & CEO, HomeMed",
  },

  // Daily tips
  "tipsHome.eyebrow": { uz: "Kunlik tavsiyalar", ru: "Ежедневные советы", en: "Daily tips" },
  "tipsHome.title": { uz: "Sog'lik haqida sodda tilda", ru: "О здоровье простым языком", en: "Health, in plain language" },
  "tipsHome.subtitle": {
    uz: "Shifokorlarimizdan har kuni qisqa va foydali maslahatlar.",
    ru: "Короткие и полезные советы от наших врачей каждый день.",
    en: "Short, useful advice from our doctors every day.",
  },
  "tipsHome.cat1": { uz: "Immunitet", ru: "Иммунитет", en: "Immunity" },
  "tipsHome.t1": {
    uz: "Mavsumiy shamollashning oldini olishning 5 yo'li",
    ru: "5 способов профилактики сезонной простуды",
    en: "5 ways to prevent seasonal colds",
  },
  "tipsHome.cat2": { uz: "Bolalar salomatligi", ru: "Здоровье детей", en: "Child health" },
  "tipsHome.t2": {
    uz: "Bolada harorat: qachon shifokorga murojaat qilish kerak",
    ru: "Температура у ребёнка: когда обращаться к врачу",
    en: "Fever in children: when to call a doctor",
  },
  "tipsHome.cat3": { uz: "Yurak salomatligi", ru: "Здоровье сердца", en: "Heart health" },
  "tipsHome.t3": {
    uz: "Qon bosimini uyda to'g'ri o'lchashning oddiy qoidalari",
    ru: "Простые правила измерения давления дома",
    en: "Simple rules for measuring blood pressure at home",
  },
  "tipsHome.read5": { uz: "5 daqiqa o'qish", ru: "5 минут чтения", en: "5 min read" },
  "tipsHome.read4": { uz: "4 daqiqa o'qish", ru: "4 минуты чтения", en: "4 min read" },
  "tipsHome.read6": { uz: "6 daqiqa o'qish", ru: "6 минут чтения", en: "6 min read" },

  // CTA
  "cta.title": { uz: "Shifokor — bir tugma uzoqlikda", ru: "Врач — в одно касание", en: "A doctor is one tap away" },
  "cta.subtitle": {
    uz: "HomeMed ilovasini yuklab oling yoki Telegram orqali yozing. Birinchi konsultatsiya — bir necha daqiqada.",
    ru: "Скачайте приложение HomeMed или напишите в Telegram. Первая консультация — за несколько минут.",
    en: "Download the HomeMed app or message us on Telegram. Your first consultation — in just a few minutes.",
  },
  "cta.download": { uz: "Yuklab oling", ru: "Скачать", en: "Download on the" },
  "cta.getOn": { uz: "Mavjud", ru: "Доступно в", en: "Get it on" },
  "cta.message": { uz: "Yozing", ru: "Написать в", en: "Message on" },

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
  "footer.rights": {
    uz: "Barcha huquqlar himoyalangan.",
    ru: "Все права защищены.",
    en: "All rights reserved.",
  },
  "footer.company": { uz: "Kompaniya", ru: "Компания", en: "Company" },
  "footer.partnerClinics": { uz: "Hamkor klinikalar", ru: "Партнёрские клиники", en: "Partner clinics" },
  "footer.cityCountry": { uz: "Toshkent, O'zbekiston", ru: "Ташкент, Узбекистан", en: "Tashkent, Uzbekistan" },

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
