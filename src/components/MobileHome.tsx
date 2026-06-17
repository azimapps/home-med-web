"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";

const StarSvg = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="m12 2 3 6.5 7 .8-5.2 4.7 1.4 6.9L12 18l-6.6 2.9 1.4-6.9L1.6 9.3l7-.8L12 2Z" />
  </svg>
);

const ChkSvg = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="m5 12 4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

type LangT = "uz" | "en" | "ru";

const SERVICES: Array<{
  key: string;
  icon: string;
  img: string;
}> = [
  {
    key: "online",
    icon: "/icon-chat.jpg",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=720&h=450&fit=crop&auto=format&q=80",
  },
  {
    key: "clinic",
    icon: "/icon-handshake.jpg",
    img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=720&h=450&fit=crop&auto=format&q=80",
  },
  {
    key: "home",
    icon: "/icon-location.jpg",
    img: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=720&h=450&fit=crop&auto=format&q=80",
  },
];

const DOCTOR_IMGS = [
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=480&h=480&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=480&h=480&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=480&h=480&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=480&h=480&fit=crop&auto=format&q=80",
];

const TIP_IMGS = [
  "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=300&h=300&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=300&h=300&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop&auto=format&q=80",
];

const HERO_IMG =
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=525&fit=crop&auto=format&q=80";

const bg = (url: string): React.CSSProperties => ({
  backgroundImage: `url(${url})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
});

function useReveal() {
  useEffect(() => {
    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".m-home [data-reveal]"));
    const stats = Array.from(document.querySelectorAll<HTMLElement>(".m-home [data-count]"));
    const done = new WeakSet<HTMLElement>();

    function fmt(v: number, target: number) {
      return target % 1 !== 0
        ? v.toFixed(1)
        : Math.round(v).toLocaleString("en-US").replace(/,/g, " ");
    }
    function countUp(el: HTMLElement) {
      if (done.has(el)) return;
      done.add(el);
      const target = parseFloat(el.getAttribute("data-count") || "0");
      const suffix = el.getAttribute("data-suffix") || "";
      if (reduce) {
        el.textContent = fmt(target, target) + suffix;
        return;
      }
      const dur = 1300;
      let start: number | null = null;
      function step(ts: number) {
        if (start === null) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(target * eased, target) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    let ticking = false;
    function check() {
      ticking = false;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      for (let i = reveals.length - 1; i >= 0; i--) {
        if (reveals[i].getBoundingClientRect().top < vh * 0.92) {
          reveals[i].classList.add("in");
          reveals.splice(i, 1);
        }
      }
      for (let j = stats.length - 1; j >= 0; j--) {
        if (stats[j].getBoundingClientRect().top < vh * 0.96) {
          countUp(stats[j]);
          stats.splice(j, 1);
        }
      }
    }
    function onTick() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(check);
      }
    }
    check();
    window.addEventListener("scroll", onTick, { passive: true });
    window.addEventListener("resize", onTick);
    return () => {
      window.removeEventListener("scroll", onTick);
      window.removeEventListener("resize", onTick);
    };
  }, []);
}

function useScrollProgress(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    let ticking = false;
    function paint() {
      ticking = false;
      const el = ref.current;
      if (!el) return;
      const y = window.scrollY || window.pageYOffset || 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(y / max, 1) : 0;
      el.style.transform = `scaleX(${ratio.toFixed(4)})`;
    }
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(paint);
      }
    }
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);
}

function ReviewRail({ items }: { items: { key: string; who: string; city: string }[] }) {
  const { t } = useI18n();
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        if (!rail) return;
        const mid = rail.scrollLeft + rail.clientWidth / 2;
        let best = 0;
        let bestD = Infinity;
        for (let i = 0; i < rail.children.length; i++) {
          const c = rail.children[i] as HTMLElement;
          const center = c.offsetLeft + c.offsetWidth / 2;
          const d = Math.abs(center - mid);
          if (d < bestD) {
            bestD = d;
            best = i;
          }
        }
        setActive(best);
      });
    }
    rail.addEventListener("scroll", onScroll, { passive: true });
    return () => rail.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="rail" ref={railRef}>
        {items.map((r) => (
          <article key={r.key} className="review">
            <span className="stars" aria-label="5/5">
              {[0, 1, 2, 3, 4].map((i) => (
                <StarSvg key={i} />
              ))}
            </span>
            <p>{t(`reviewsHome.${r.key}`)}</p>
            <div className="who">
              <span className="av"></span>
              <span>
                <b>{r.who}</b>
                <small>{r.city}</small>
              </span>
            </div>
          </article>
        ))}
      </div>
      <div className="dots">
        {items.map((_, i) => (
          <i key={i} className={i === active ? "on" : ""} />
        ))}
      </div>
    </>
  );
}

export default function MobileHome() {
  const { t, lang } = useI18n();
  const [activeSvc, setActiveSvc] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);

  useReveal();
  useScrollProgress(progressRef);

  const svc = SERVICES[activeSvc];
  const svcKey = svc.key;

  const features = (() => {
    if (svcKey === "online") {
      return lang === "en"
        ? ["Average wait — 5 minutes", "Video or text chat", "Prescription saved in the app"]
        : ["O'rtacha kutish — 5 daqiqa", "Video yoki matnli chat", "Retsept ilovada saqlanadi"];
    }
    if (svcKey === "clinic") {
      return lang === "en"
        ? ["No queue, transparent pricing", "Partner clinics in 14 cities", "Results in one app"]
        : ["Navbatsiz va shaffof narx", "14 shaharda hamkor klinika", "Natijalar bitta ilovada"];
    }
    return lang === "en"
      ? ["Tests collected at home", "Injections & IV service", "Same-day support"]
      : ["Tahlillarni uydan topshirish", "Ukol va kapelnitsa xizmati", "Kuni bo'yi qo'llab-quvvatlash"];
  })();

  const svcTitle =
    svcKey === "online"
      ? t("services.online")
      : svcKey === "clinic"
      ? t("services.clinic")
      : t("services.home");

  const svcDesc =
    svcKey === "online"
      ? t("services.onlineDesc")
      : svcKey === "clinic"
      ? t("services.clinicDesc")
      : t("services.homeDesc");

  const docs = [
    { spec: t("specialists.therapist"), name: "Dilnoza Karimova", rate: "4.9", years: "12", img: DOCTOR_IMGS[0] },
    { spec: t("specialists.pediatrician"), name: "Sardor Aliyev", rate: "5.0", years: "9", img: DOCTOR_IMGS[1] },
    { spec: t("specialists.cardiologist"), name: "Nigora Yusupova", rate: "4.8", years: "15", img: DOCTOR_IMGS[2] },
    { spec: t("specialists.neurologist"), name: "Jasur Rahimov", rate: "4.9", years: "11", img: DOCTOR_IMGS[3] },
  ];

  const reviews = [
    { key: "r1", who: "Madina A.", city: t("cities.tashkent") },
    { key: "r2", who: "Bekzod T.", city: t("cities.samarkand") },
    { key: "r3", who: "Kamola R.", city: t("cities.andijan") },
  ];

  const tips = [
    { cat: "cat1", title: "t1", read: "read5", img: TIP_IMGS[0] },
    { cat: "cat2", title: "t2", read: "read4", img: TIP_IMGS[1] },
    { cat: "cat3", title: "t3", read: "read6", img: TIP_IMGS[2] },
  ];

  return (
    <div className="m-home">
      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />

      {/* HERO */}
      <section className="hero" id="top">
        <span className="hero-pill" data-reveal>
          <span className="dot" aria-hidden="true" />
          <span>{t("hero.pill")}</span>
          <span className="tag">24/7</span>
        </span>
        <h1 data-reveal data-d="1">
          <span>{t("hero.title1")}</span>{" "}
          <span className="grad-text">{t("hero.title2")}</span>
        </h1>
        <p className="sub" data-reveal data-d="1">
          {t("hero.subtitle")}
        </p>

        <div className="hero-photo-wrap" data-reveal data-d="2">
          <div className="ph hero-photo" style={bg(HERO_IMG)} />
          <div className="hero-glass g1">
            <span className="ic" aria-hidden="true">
              <img src="/icon-chat.jpg" alt="" />
            </span>
            <span>
              <b>{t("hero.cardOnline")}</b>
              <small>{t("hero.cardOnlineSub")}</small>
            </span>
          </div>
          <div className="hero-glass g2">
            <span className="avatars" aria-hidden="true">
              <span className="av" />
              <span className="av" />
              <span className="av" />
            </span>
            <span>
              <b>500+</b>
              <small>{t("hero.cardDoctors")}</small>
            </span>
          </div>
        </div>

        <div className="hero-cta" data-reveal data-d="2">
          <a href="#kontakt" className="btn btn-primary">
            {t("hero.applyApp")}
          </a>
          <div className="row">
            <a href="#kontakt" className="btn btn-ghost">
              <img src="/icon-telegram.jpg" alt="" className="tg-ico-img" />
              <span>Telegram</span>
            </a>
            <a href="tel:+998781234567" className="btn btn-ghost">
              <img src="/icon-phone.jpg" alt="" className="tg-ico-img" />
              <span>{t("hero.call")}</span>
            </a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="m-stats">
        <div className="m-stat">
          <div className="num grad-text">
            <span data-count="500" data-suffix="+">
              500+
            </span>
          </div>
          <div className="lbl">{t("stats.doctors")}</div>
        </div>
        <div className="m-stat">
          <div className="num grad-text">
            <span data-count="80000" data-suffix="+">
              80 000+
            </span>
          </div>
          <div className="lbl">{t("stats.consults")}</div>
        </div>
        <div className="m-stat">
          <div className="num grad-text">
            <span data-count="14">14</span>
          </div>
          <div className="lbl">{t("stats.cities")}</div>
        </div>
        <div className="m-stat">
          <div className="num grad-text">
            <span data-count="4.9">4.9</span>
          </div>
          <div className="lbl">{t("stats.rating")}</div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="sec" id="xizmatlar">
        <div className="sec-head" data-reveal>
          <span className="eyebrow">{t("services.eyebrow")}</span>
          <h2>{t("services.title")}</h2>
          <p>{t("services.subtitle")}</p>
        </div>

        <div className="seg" role="tablist" data-reveal>
          <span
            className="ind"
            aria-hidden="true"
            style={{ transform: `translateX(${activeSvc * 100}%)` }}
          />
          {SERVICES.map((s, i) => (
            <button
              key={s.key}
              type="button"
              role="tab"
              aria-selected={activeSvc === i}
              className={activeSvc === i ? "active" : ""}
              onClick={() => setActiveSvc(i)}
            >
              {s.key === "online"
                ? lang === "en"
                  ? "Online"
                  : "Onlayn"
                : s.key === "clinic"
                ? lang === "en"
                  ? "Clinic"
                  : "Klinika"
                : lang === "en"
                ? "Home"
                : "Uyga"}
            </button>
          ))}
        </div>

        <div className="svc-panel" data-reveal>
          <article className="svc-card" key={svc.key}>
            <div className="ph media" style={bg(svc.img)} />
            <div className="body">
              <span className="ic" aria-hidden="true">
                <img src={svc.icon} alt="" />
              </span>
              <h3>{svcTitle}</h3>
              <p>{svcDesc}</p>
              <ul className="svc-feat">
                {features.map((f) => (
                  <li key={f}>
                    <span className="chk">
                      <ChkSvg />
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a href="#kontakt" className="btn btn-primary" style={{ width: "100%" }}>
                {lang === "en" ? "Choose" : "Tanlash"}
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="sec alt" id="qanday">
        <div className="sec-head" data-reveal>
          <span className="eyebrow">{t("howItWorks.eyebrow")}</span>
          <h2>{t("howItWorks.title")}</h2>
        </div>
        <div className="steps">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="step" data-reveal>
              <span className="n">{String(n).padStart(2, "0")}</span>
              <div>
                <h3>{t(`howItWorks.step${n}.title`)}</h3>
                <p>{t(`howItWorks.step${n}.desc`)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DOCTORS */}
      <section className="sec" id="mutaxassislar">
        <div className="sec-head" data-reveal>
          <span className="eyebrow">{t("specialists.eyebrow")}</span>
          <h2>{t("specialists.title")}</h2>
        </div>
        <div className="rail">
          {docs.map((d) => (
            <article key={d.name} className="doc" data-reveal>
              <div className="ph photo" style={bg(d.img)} />
              <div className="body">
                <span className="spec">{d.spec}</span>
                <h3>{d.name}</h3>
                <div className="meta">
                  <span className="rate">
                    <StarSvg />
                    {d.rate}
                  </span>
                  <span>
                    {d.years} {t("specialists.yearsExp")}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="sec alt" id="izohlar">
        <div className="sec-head" data-reveal>
          <span className="eyebrow">{t("reviewsHome.eyebrow")}</span>
          <h2>{t("reviewsHome.title")}</h2>
        </div>
        <ReviewRail items={reviews} />
      </section>

      {/* FOUNDER */}
      <section className="sec" id="asoschi">
        <div className="founder" data-reveal>
          <span className="eyebrow">{t("founderHome.eyebrow")}</span>
          <blockquote className="quote">{t("founderHome.quote")}</blockquote>
          <div className="who">
            <span
              className="ph"
              style={{
                backgroundImage: "url(/founder.png)",
                backgroundSize: "cover",
                backgroundPosition: "right center",
              }}
            />
            <span>
              <span className="sig">{t("founderHome.name")}</span>
              <small>{t("founderHome.position")}</small>
            </span>
          </div>
        </div>
      </section>

      {/* TIPS */}
      <section className="sec alt" id="tavsiyalar">
        <div className="sec-head" data-reveal>
          <span className="eyebrow">{t("tipsHome.eyebrow")}</span>
          <h2>{t("tipsHome.title")}</h2>
        </div>
        <div className="tips">
          {tips.map((tip) => (
            <article key={tip.title} className="tip" data-reveal>
              <div className="ph thumb" style={bg(tip.img)} />
              <div>
                <span className="cat">{t(`tipsHome.${tip.cat}`)}</span>
                <h3>{t(`tipsHome.${tip.title}`)}</h3>
                <span className="date">{t(`tipsHome.${tip.read}`)}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* APP CTA */}
      <section className="sec" id="kontakt">
        <div className="appcta" data-reveal>
          <h2>{t("cta.title")}</h2>
          <p>{t("cta.subtitle")}</p>
          <div className="stores">
            <a href="#" className="store">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.4 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.8-3.5.8-.7 0-1.8-.8-3-.8-1.5 0-2.9.9-3.7 2.3-1.6 2.7-.4 6.8 1.1 9 .7 1.1 1.6 2.3 2.8 2.3 1.1 0 1.5-.7 2.9-.7 1.3 0 1.7.7 2.9.7 1.2 0 2-1.1 2.7-2.2.8-1.2 1.2-2.4 1.2-2.5-.1 0-2.3-.9-2.3-3.6ZM14.1 5.5c.6-.8 1-1.8.9-2.9-.9 0-2 .6-2.6 1.3-.6.7-1.1 1.7-.9 2.7 1 .1 2-.5 2.6-1.1Z" />
              </svg>
              <span>
                <small>{t("cta.download")}</small>
                <b>App Store</b>
              </span>
            </a>
            <a href="#" className="store">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 3.2v17.6c0 .5.5.8.9.5l9.6-8.8c.3-.3.3-.7 0-1L4.9 2.7c-.4-.3-.9 0-.9.5Z" />
                <path d="m14.5 12.5 2.6 2.4 3.4-2c.6-.4.6-1.3 0-1.7l-3.4-2-2.6 2.4c-.3.3-.3.6 0 .9Z" />
              </svg>
              <span>
                <small>{t("cta.getOn")}</small>
                <b>Google Play</b>
              </span>
            </a>
            <a href="https://t.me/" className="store">
              <img src="/icon-telegram.jpg" alt="" className="tg-ico-img" />
              <span>
                <small>{t("cta.message")}</small>
                <b>Telegram</b>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* STICKY BOTTOM ACTION BAR */}
      <div className="actionbar">
        <a href="#kontakt" className="btn btn-primary">
          <img src="/icon-telegram.jpg" alt="" className="tg-ico-img" />
          <span>{t("actionbar.send")}</span>
        </a>
        <a href="tel:+998781234567" className="btn btn-call" aria-label={t("hero.call")}>
          <img src="/icon-phone.jpg" alt="" />
        </a>
      </div>
    </div>
  );
}
