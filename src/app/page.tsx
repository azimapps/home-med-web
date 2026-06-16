"use client";

import { useI18n } from "@/lib/i18n";

const StarSvg = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="m12 2 3 6.5 7 .8-5.2 4.7 1.4 6.9L12 18l-6.6 2.9 1.4-6.9L1.6 9.3l7-.8L12 2Z" />
  </svg>
);

const TelegramIcon = () => (
  <span className="tg-ico" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="#fff">
      <path d="M21.8 4.3 2.9 11.6c-.9.4-.9 1.6.1 1.9l4.6 1.4 1.8 5.5c.3.8 1.2 1 1.8.4l2.6-2.3 4.6 3.4c.7.5 1.6.1 1.8-.7l3.3-15.6c.2-1-.7-1.7-1.5-1.3Z" />
    </svg>
  </span>
);

const bg = (url: string): React.CSSProperties => ({
  backgroundImage: `url(${url})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
});

// Unsplash CDN — free, no auth, w/h crop hint for fast loads.
const u = (id: string, w = 800, h = 800) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

const DOCTOR_IMGS = [
  u("photo-1559839734-2b71ea197ec2", 480, 480), // female doctor
  u("photo-1612349317150-e413f6a5b16d", 480, 480), // male doctor
  u("photo-1594824476967-48c8b964273f", 480, 480), // female doctor
  u("photo-1537368910025-700350fe46c7", 480, 480), // male doctor
];

const SERVICE_IMGS = [
  u("photo-1576091160550-2173dba999ef", 720, 450), // online consult
  u("photo-1519494026892-80bbd2d6fd0d", 720, 450), // clinic
  u("photo-1631815588090-d4bfec5b1ccb", 720, 450), // home visit
];

const TIP_IMGS = [
  u("photo-1584036561566-baf8f5f1b144", 720, 405), // immunity / vitamins
  u("photo-1503454537195-1dcabb73ffb9", 720, 405), // child health
  u("photo-1559757148-5c350d0d3c56", 720, 405), // heart / bp
];

const FOUNDER_IMG = "/founder.png";

const APP_PHONE_IMG = u("photo-1512941937669-90a1b58e7e9c", 600, 1067);

export default function Home() {
  const { t } = useI18n();

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <span className="hero-pill reveal">
              <span className="dot" aria-hidden="true"></span>
              <span>{t("hero.pill")}</span>
              <span className="tag">24/7</span>
            </span>

            <h1 className="reveal" data-d="1">
              <span>{t("hero.title1")}</span>
              <span className="line2 grad-text">{t("hero.title2")}</span>
            </h1>

            <p className="hero-sub reveal" data-d="2">
              {t("hero.subtitle")}
            </p>

            <div className="hero-cta reveal" data-d="2">
              <a href="#kontakt" className="btn btn-primary">
                <span>{t("hero.applyApp")}</span>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M7 17 17 7M9 7h8v8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a href="#kontakt" className="btn btn-ghost">
                <TelegramIcon />
                <span>{t("hero.writeTelegram")}</span>
              </a>
              <a href="tel:+998781234567" className="btn btn-soft">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M6.6 10.8a13 13 0 0 0 5.6 5.6l1.9-1.9c.3-.3.6-.3.9-.2 1 .3 2 .5 3.1.5.5 0 .9.4.9.9V19c0 .5-.4.9-.9.9A15.9 15.9 0 0 1 2.2 4c0-.5.4-.9.9-.9h3.2c.5 0 .9.4.9.9 0 1.1.2 2.1.5 3.1.1.3 0 .6-.2.9l-1.8 1.8Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{t("hero.call")}</span>
              </a>
            </div>

            <div className="trust reveal" data-d="3">
              <span className="trust-item">
                <span className="chk" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="m5 12 4.5 4.5L19 7"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>{t("hero.verifiedDoctors")}</span>
              </span>
              <span className="trust-item">
                <span className="chk" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="m5 12 4.5 4.5L19 7"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>{t("hero.safePrivate")}</span>
              </span>
            </div>
          </div>

          <div className="hero-visual reveal" data-d="1">
            <span className="hero-blob b1" aria-hidden="true"></span>
            <span className="hero-blob b2" aria-hidden="true"></span>
            <div
              className="ph hero-photo"
              style={{
                backgroundImage: "url(/hero-doctor.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>

            <div className="hero-card c1" aria-hidden="false">
              <span className="ic green">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M4 6h16v10H4z" stroke="currentColor" strokeWidth="1.8" />
                  <path
                    d="M9 20h6M8 10l2 2 4-4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span>
                <b>{t("hero.cardOnline")}</b>
                <small>{t("hero.cardOnlineSub")}</small>
              </span>
            </div>

            <div className="hero-card c2">
              <span className="avatars" aria-hidden="true">
                <span className="av"></span>
                <span className="av"></span>
                <span className="av"></span>
                <span className="av"></span>
              </span>
              <span>
                <b>500+</b>
                <small>{t("hero.cardDoctors")}</small>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section
        className="band alt"
        style={{ paddingBlock: "clamp(40px,5vw,64px)" }}
      >
        <div className="wrap stats">
          <div className="stat reveal">
            <div className="num">
              <span data-count="500" data-suffix="+">
                500+
              </span>
            </div>
            <div className="lbl">{t("stats.doctors")}</div>
          </div>
          <div className="stat reveal" data-d="1">
            <div className="num">
              <span data-count="80000" data-suffix="+">
                80 000+
              </span>
            </div>
            <div className="lbl">{t("stats.consults")}</div>
          </div>
          <div className="stat reveal" data-d="2">
            <div className="num">
              <span data-count="14">14</span>
            </div>
            <div className="lbl">{t("stats.cities")}</div>
          </div>
          <div className="stat reveal" data-d="3">
            <div className="num">
              <span data-count="4.9">4.9</span>
            </div>
            <div className="lbl">{t("stats.rating")}</div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="band" id="qanday">
        <div className="wrap">
          <div className="sec-head center reveal">
            <span className="eyebrow">{t("howItWorks.eyebrow")}</span>
            <h2>{t("howItWorks.title")}</h2>
            <p>{t("howItWorks.subtitle")}</p>
          </div>

          <div className="steps">
            {[1, 2, 3, 4].map((n, idx) => (
              <div
                key={n}
                className="step reveal"
                {...(idx > 0 ? { "data-d": String(idx) } : {})}
              >
                <span className="n">{String(n).padStart(2, "0")}</span>
                <h3>{t(`howItWorks.step${n}.title`)}</h3>
                <p>{t(`howItWorks.step${n}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="band alt" id="xizmatlar">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">{t("services.eyebrow")}</span>
            <h2>{t("services.title")}</h2>
            <p>{t("services.subtitle")}</p>
          </div>

          <div className="services">
            <article className="svc reveal">
              <div className="ph svc-media" style={bg(SERVICE_IMGS[0])}></div>
              <div className="svc-body">
                <span className="ic">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M3 6h13v12H3z" stroke="currentColor" strokeWidth="1.8" />
                    <path
                      d="m16 10 5-3v10l-5-3"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <h3>{t("services.online")}</h3>
                <p>{t("services.onlineDesc")}</p>
                <a href="#kontakt" className="link">
                  <span>{t("services.learnMore")}</span>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12h14m-6-6 6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </article>

            <article className="svc reveal" data-d="1">
              <div className="ph svc-media" style={bg(SERVICE_IMGS[1])}></div>
              <div className="svc-body">
                <span className="ic">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 20V7l8-4 8 4v13"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 8v6m-3-3h6M3 20h18"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <h3>{t("services.clinic")}</h3>
                <p>{t("services.clinicDesc")}</p>
                <a href="#kontakt" className="link">
                  <span>{t("services.learnMore")}</span>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12h14m-6-6 6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </article>

            <article className="svc reveal" data-d="2">
              <div className="ph svc-media" style={bg(SERVICE_IMGS[2])}></div>
              <div className="svc-body">
                <span className="ic">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-8Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <h3>{t("services.home")}</h3>
                <p>{t("services.homeDesc")}</p>
                <a href="#kontakt" className="link">
                  <span>{t("services.learnMore")}</span>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12h14m-6-6 6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* SPECIALISTS */}
      <section className="band" id="mutaxassislar">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">{t("specialists.eyebrow")}</span>
            <h2>{t("specialists.title")}</h2>
            <p>{t("specialists.subtitle")}</p>
          </div>

          <div className="docs">
            {[
              { spec: t("specialists.therapist"), name: "Dilnoza Karimova", rate: "4.9", years: "12", img: DOCTOR_IMGS[0] },
              { spec: t("specialists.pediatrician"), name: "Sardor Aliyev", rate: "5.0", years: "9", img: DOCTOR_IMGS[1] },
              { spec: t("specialists.cardiologist"), name: "Nigora Yusupova", rate: "4.8", years: "15", img: DOCTOR_IMGS[2] },
              { spec: t("specialists.neurologist"), name: "Jasur Rahimov", rate: "4.9", years: "11", img: DOCTOR_IMGS[3] },
            ].map((d, idx) => (
              <article
                key={d.name}
                className="doc reveal"
                {...(idx > 0 ? { "data-d": String(idx) } : {})}
              >
                <div className="ph doc-photo" style={bg(d.img)}></div>
                <div className="doc-body">
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
        </div>
      </section>

      {/* CLINICS */}
      <section className="band alt" id="klinikalar">
        <div className="wrap">
          <div className="sec-head center reveal">
            <span className="eyebrow">{t("clinicsHome.eyebrow")}</span>
            <h2>{t("clinicsHome.title")}</h2>
            <p>{t("clinicsHome.subtitle")}</p>
          </div>

          <div className="clinics">
            {[
              { logo: "M+", name: "MediPlus", city: t("cities.tashkent"), d: 0 },
              { logo: "SH", name: "Shifo Med", city: t("cities.samarkand"), d: 1 },
              { logo: "AK", name: "Akademiya", city: t("cities.tashkent"), d: 2 },
              { logo: "SG", name: "Sog'lom", city: t("cities.bukhara"), d: 3 },
              { logo: "NU", name: "Nur Clinic", city: t("cities.andijan"), d: 3 },
            ].map((c) => (
              <div
                key={c.name}
                className="clinic reveal"
                {...(c.d > 0 ? { "data-d": String(c.d) } : {})}
              >
                <span className="logo">{c.logo}</span>
                <span className="nm">{c.name}</span>
                <span className="loc">{c.city}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="band" id="izohlar">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">{t("reviewsHome.eyebrow")}</span>
            <h2>{t("reviewsHome.title")}</h2>
            <p>{t("reviewsHome.subtitle")}</p>
          </div>

          <div className="reviews">
            {[
              { key: "r1", who: "Madina A.", city: t("cities.tashkent"), d: 0 },
              { key: "r2", who: "Bekzod T.", city: t("cities.samarkand"), d: 1 },
              { key: "r3", who: "Kamola R.", city: t("cities.andijan"), d: 2 },
            ].map((r) => (
              <article
                key={r.key}
                className="review reveal"
                {...(r.d > 0 ? { "data-d": String(r.d) } : {})}
              >
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
        </div>
      </section>

      {/* FOUNDER */}
      <section className="band alt" id="asoschi">
        <div className="wrap founder-grid">
          <div className="reveal">
            <div
              className="ph founder-photo"
              style={{
                backgroundImage: `url(${FOUNDER_IMG})`,
                backgroundSize: "cover",
                backgroundPosition: "right center",
              }}
            ></div>
          </div>
          <div className="reveal" data-d="1">
            <span className="eyebrow">{t("founderHome.eyebrow")}</span>
            <blockquote className="founder-quote">{t("founderHome.quote")}</blockquote>
            <div className="founder-who">
              <span
                className="hero-card"
                style={{
                  position: "static",
                  boxShadow: "none",
                  border: "none",
                  padding: 0,
                  gap: 14,
                }}
              >
                <span
                  className="ic teal"
                  style={{ width: 48, height: 48, borderRadius: "50%" }}
                >
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
                    <path
                      d="M4 20c0-4 3.6-6 8-6s8 2 8 6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <span>
                  <span className="sig">{t("founderHome.name")}</span>
                  <small>{t("founderHome.position")}</small>
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* DAILY TIPS */}
      <section className="band" id="tavsiyalar">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">{t("tipsHome.eyebrow")}</span>
            <h2>{t("tipsHome.title")}</h2>
            <p>{t("tipsHome.subtitle")}</p>
          </div>

          <div className="tips">
            {[
              { cat: "cat1", title: "t1", read: "read5", d: 0, img: TIP_IMGS[0] },
              { cat: "cat2", title: "t2", read: "read4", d: 1, img: TIP_IMGS[1] },
              { cat: "cat3", title: "t3", read: "read6", d: 2, img: TIP_IMGS[2] },
            ].map((tip) => (
              <article
                key={tip.title}
                className="tip reveal"
                {...(tip.d > 0 ? { "data-d": String(tip.d) } : {})}
              >
                <div className="ph tip-media" style={bg(tip.img)}></div>
                <div className="tip-body">
                  <span className="cat">{t(`tipsHome.${tip.cat}`)}</span>
                  <h3>{t(`tipsHome.${tip.title}`)}</h3>
                  <span className="date">{t(`tipsHome.${tip.read}`)}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* APP CTA */}
      <section className="cta-band" id="kontakt">
        <div className="wrap">
          <div className="cta-card reveal">
            <div className="inner">
              <h2>{t("cta.title")}</h2>
              <p>{t("cta.subtitle")}</p>
              <div className="store-row">
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
                    <path
                      d="M4 3.2v17.6c0 .5.5.8.9.5l9.6-8.8c.3-.3.3-.7 0-1L4.9 2.7c-.4-.3-.9 0-.9.5Z"
                      opacity=".95"
                    />
                    <path d="m14.5 12.5 2.6 2.4 3.4-2c.6-.4.6-1.3 0-1.7l-3.4-2-2.6 2.4c-.3.3-.3.6 0 .9Z" />
                  </svg>
                  <span>
                    <small>{t("cta.getOn")}</small>
                    <b>Google Play</b>
                  </span>
                </a>
                <a href="#" className="store">
                  <TelegramIcon />
                  <span>
                    <small>{t("cta.message")}</small>
                    <b>Telegram</b>
                  </span>
                </a>
              </div>
            </div>
            <div className="cta-phone">
              <div className="ph" style={bg(APP_PHONE_IMG)}></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
