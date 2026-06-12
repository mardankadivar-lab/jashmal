"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useRouter } from "@/i18n/navigation";
import MisterioLangToggle from "@/components/MisterioLangToggle";

// ── Página de misterio: TAMAR ─────────────────────────────────────────────────
// El ZOOM a Tamar (la panorámica de las cuatro madres vive en /linaje).
// Idioma principal: español (el video de TikTok es en español).
// El farsi (TamarFarsi) fue traducido y VERIFICADO por el Sofer (editor-erudito):
//   · Génesis 38:18 — חוֹתָם / פְּתִיל / מַטֶּה (sello, cordón, bastón). Verificado en Sefaria.
//   · Génesis 38:26 — צָדְקָה מִמֶּנִּי. Verificado.
//   · Sotá 10b — Samael esconde / Gabriel devuelve las prendas; "mejor arrojarse al
//     horno que avergonzar en público"; la bat kol "מִמֶּנִּי יָצְאוּ כְּבוּשִׁים"
//     («de Mí salieron las cosas ocultas»). Verificado.
//   · Berajot 43b — la misma enseñanza del horno de fuego. Verificado.
//   · Bereshit Rabbá 85:1 — "וְהַקָּדוֹשׁ בָּרוּךְ הוּא הָיָה עוֹסֵק בּוֹרֵא אוֹרוֹ
//     שֶׁל מֶלֶךְ הַמָּשִׁיחַ" (R. Shmuel bar Najman). Verificado.
//   · Rut 4:18-22 — Péretz → … → David. Verificado.
//   · Gematrías calculadas por el Sofer: נחש=358=משיח ✓ ; תהו=411 (400+5+6) ✓.
// GUARDARRAÍL: la lectura "Tohu" (ת־ה־ו de las tres prendas) es un jidush simbólico
//   de derash/sod, NO la inicial literal de cada palabra (חוֹתָם/פְּתִיל/מַטֶּה) ni
//   cita explícita del Zóhar/Arí. Se mantiene etiquetada como tal también en farsi.

// ── Las prendas en prenda (Génesis 38:18) ─────────────────────────────────────
interface Prenda {
  he: string;
  name: string;
  sentido: string;
  color: string;
}

const PRENDAS: Prenda[] = [
  {
    he: "חוֹתָם",
    name: "El sello",
    sentido: "Su identidad, su firma personal. Lo que lo nombra ante el mundo.",
    color: "#c9a43e",
  },
  {
    he: "פְּתִיל",
    name: "El cordón",
    sentido: "El hilo del que pendía el sello. Lo que ata el nombre al cuerpo.",
    color: "#e0a850",
  },
  {
    he: "מַטֶּה",
    name: "El bastón",
    sentido: "Su autoridad, su cetro. La vara del jefe de Yehudá — y de la realeza que vendría.",
    color: "#f0d060",
  },
];

// ── Componentes (idénticos en estilo a /linaje) ───────────────────────────────
function Section({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="transition-all duration-1000"
      style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(24px)", transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function PullQuote({ he, es, source }: { he: string; es: string; source: string }) {
  return (
    <Section>
      <div className="my-10 rounded-2xl border border-gold/25 bg-gold/[0.05] p-6">
        <p className="hebrew mb-3 text-right text-lg leading-relaxed text-gold/85" dir="rtl">{he}</p>
        <p className="mb-1 text-sm italic leading-relaxed text-parchment/80">«{es}»</p>
        <p className="font-cinzel text-[10px] uppercase tracking-widest text-gold/50">— {source}</p>
      </div>
    </Section>
  );
}

// Tile oscuro con letra hebrea grande (legible en cualquier tema).
function HebrewTile({ he, sub, color }: { he: string; sub: string; color: string }) {
  return (
    <div
      className="inline-flex flex-col items-center rounded-2xl border-2 px-6 py-4"
      style={{ borderColor: `${color}99`, background: "rgba(14,12,22,0.96)", boxShadow: `0 0 24px ${color}33` }}
    >
      <span
        className="hebrew font-bold leading-none"
        style={{ fontSize: "clamp(56px, 14vw, 78px)", color: "#fff6e0", textShadow: `0 0 22px ${color}, 0 0 8px ${color}` }}
      >
        {he}
      </span>
      <span className="mt-2 font-cinzel text-xs uppercase tracking-widest" style={{ color }}>{sub}</span>
    </div>
  );
}

// ── Página en FARSI (رندر شده وقتی locale === "fa") ──────────────────────────
// Traducción fiel y verificada por el Sofer. Las citas hebreas permanecen en
// hebreo; las gematrías van en dígitos persas (۰۱۲۳…); "خَشمَل" donde el español
// dice "Jashmal". Mismo estilo visual exacto que RopasDeLuzFarsi.
function TamarFarsi() {
  const bg = "#05050a";
  const navBg = "rgba(5,5,10,0.9)";
  const router = useRouter();

  // Las tres prendas (پیدایش ۳۸:۱۸) en farsi.
  const PRENDAS_FA = [
    {
      he: "חוֹתָם",
      name: "مُهر",
      sentido: "هویت او، امضای شخصی‌اش. آنچه او را در برابر جهان نام می‌نهد.",
      color: "#c9a43e",
    },
    {
      he: "פְּתִיל",
      name: "بند",
      sentido: "ریسمانی که مُهر از آن آویخته بود. آنچه نام را به تن گره می‌زند.",
      color: "#e0a850",
    },
    {
      he: "מַטֶּה",
      name: "عصا",
      sentido: "اقتدار او، عصای فرمانروایی‌اش. چوبدستی سرور یهودا — و سلطنتی که می‌آمد.",
      color: "#f0d060",
    },
  ];

  function Sec({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const [v, setV] = useState(false);
    useEffect(() => {
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.12 });
      if (ref.current) obs.observe(ref.current);
      return () => obs.disconnect();
    }, []);
    return (
      <div ref={ref} className="transition-all duration-1000"
        style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(24px)", transitionDelay: `${delay}ms` }}>
        {children}
      </div>
    );
  }

  function PQ({ he, fa, source }: { he: string; fa: string; source: string }) {
    return (
      <Sec>
        <div className="my-10 rounded-2xl border border-gold/25 bg-gold/[0.05] p-6">
          <p className="hebrew mb-3 text-right text-lg leading-relaxed text-gold/85" dir="rtl">{he}</p>
          <p className="mb-1 text-sm italic leading-relaxed text-parchment/80" dir="rtl">«{fa}»</p>
          <p className="font-cinzel text-[10px] uppercase tracking-widest text-gold/50">— {source}</p>
        </div>
      </Sec>
    );
  }

  // Tile oscuro con letra hebrea grande (subtítulo en farsi).
  function Tile({ he, sub, color }: { he: string; sub: string; color: string }) {
    return (
      <div className="inline-flex flex-col items-center rounded-2xl border-2 px-6 py-4"
        style={{ borderColor: `${color}99`, background: "rgba(14,12,22,0.96)", boxShadow: `0 0 24px ${color}33` }}>
        <span className="hebrew font-bold leading-none"
          style={{ fontSize: "clamp(56px, 14vw, 78px)", color: "#fff6e0", textShadow: `0 0 22px ${color}, 0 0 8px ${color}` }}>
          {he}
        </span>
        <span className="mt-2 text-xs uppercase tracking-widest" style={{ color }}>{sub}</span>
      </div>
    );
  }

  return (
    <div className="always-dark min-h-screen" style={{ background: bg, fontFamily: "Vazirmatn, sans-serif" }} dir="rtl">

      {/* Nav */}
      <nav className="sticky top-0 z-40 border-b border-gold/10 px-5 py-3 backdrop-blur-md" style={{ background: navBg }}>
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link href="/" className="font-cinzel text-sm text-gold/70 hover:text-gold">חַשְׁמַל · خَشمَل</Link>
          <div className="flex items-center gap-3">
            <MisterioLangToggle />
            <button onClick={() => router.push("/estudio")}
              className="rounded-full border border-gold/30 px-4 py-1.5 text-xs text-gold transition-all hover:border-gold hover:bg-gold/10">
              شروع مطالعه ←
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-2xl px-5 pb-24 pt-16">

        {/* ── هیرو / Hero ── */}
        <div className="mb-16 text-center">
          <p className="mb-4 font-cinzel text-xs uppercase tracking-[0.4em] text-gold/50">
            پیدایش ۳۸ · تلمود · میدراش
          </p>
          <h1 className="hebrew mb-3 font-bold leading-none"
            style={{ fontSize: "clamp(56px, 16vw, 110px)", color: "#fdf4dd",
              textShadow: "0 0 24px #c9a43e88" }}>
            תָּמָר
          </h1>
          <h2 className="text-xl font-bold text-parchment/90 sm:text-2xl">
            پرده‌ای که مسیح را پنهان می‌کرد
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted" dir="rtl">
            بزرگ‌ترین رسوایی تورا، درست در قلب خود، تولد دودمان مَشیَح را پنهان می‌کند.
            آنچه جهان می‌خواست بپوشاند، آسمان آن را تاج‌گذاری می‌کرد.
          </p>
        </div>

        {/* ── داستان ── */}
        <Sec>
          <h3 className="mb-2 text-sm uppercase tracking-[0.3em] text-gold/60">
            داستان
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir="rtl">
            <p>
              تامار دو بار بیوه می‌شود. با عِر، نخست‌زاده‌ی یهودا، ازدواج می‌کند و او می‌میرد.
              بنا بر قانون یِبوم (ازدواج با برادرِ شوهرِ درگذشته) به اونان، پسر دوم، می‌رسد —
              و او نیز می‌میرد. پسر سومی هست، شِلا، اما یهودا می‌ترسد و او را به تامار نمی‌دهد:
              او را بیوه و بی‌فرزند در خانه‌ی پدرش رها می‌کند.
            </p>
            <p>
              تامار درمی‌یابد که هرگز شِلا را به او نخواهند داد. آنگاه کاری می‌کند جسورانه تا مرز ممکن:
              جامه‌ی بیوگی را از تن درمی‌آورد، خود را با روبندی می‌پوشاند و بر سرِ دوراهیِ راه می‌نشیند،
              در جایی به نام <span className="text-gold/90">عِینایِم</span> (پیدایش ۳۸:۱۴).
              یهودا او را روسپی می‌پندارد و نزدیک می‌شود. چون بهای کار را همراه ندارد، تامار از او
              گرویی می‌خواهد: <span className="text-gold/90">مُهرش</span>،{" "}
              <span className="text-gold/90">بندش</span> و{" "}
              <span className="text-gold/90">عصایش</span> (پیدایش ۳۸:۱۸).
            </p>
            <p>
              از آن پیوند، تامار به دوقلوها آبستن می‌شود. ماه‌ها بعد، چون آشکار می‌شود که بیوه باردار است،
              یهودا فرمان می‌دهد او را بسوزانند. و اینجاست که تمام داستان می‌چرخد.
            </p>
          </div>
        </Sec>

        {/* ── سه گرویی ── */}
        <Sec>
          <h3 className="mb-6 mt-16 text-center text-sm uppercase tracking-[0.3em] text-gold/60">
            سه گرویی
          </h3>
          <p className="mx-auto mb-8 max-w-md text-center text-sm leading-relaxed text-muted" dir="rtl">
            او طلا نخواست. سه چیزی را خواست که ثابت می‌کرد پدر کیست.
            تمام هویت یهودا در دستان او ماند.
          </p>
        </Sec>

        <div className="space-y-4">
          {PRENDAS_FA.map((p, i) => (
            <Sec key={p.he} delay={i * 60}>
              <div className="flex items-center gap-4 rounded-2xl border border-gold/15 p-5"
                style={{ background: "rgba(255,255,255,0.02)" }}>
                <span className="hebrew shrink-0 font-bold leading-none"
                  style={{ fontSize: "clamp(40px, 11vw, 54px)", color: "#fff6e0",
                    textShadow: `0 0 16px ${p.color}` }}>
                  {p.he}
                </span>
                <div className="flex-1 text-right">
                  <p className="text-sm font-bold tracking-wide" style={{ color: p.color }}>
                    {p.name}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-parchment/85" dir="rtl">{p.sentido}</p>
                </div>
              </div>
            </Sec>
          ))}
        </div>

        {/* ── اعتراف یهودا ── */}
        <Sec>
          <h3 className="mb-4 mt-16 text-sm uppercase tracking-[0.3em] text-gold/60">
            اعتراف
          </h3>
        </Sec>

        <PQ
          he="צָדְקָה מִמֶּנִּי"
          fa="او از من پرهیزکارتر است."
          source="پیدایش ۳۸:۲۶"
        />

        <Sec>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir="rtl">
            <p>
              وقتی تامار گرویی‌های خود او را برایش می‌فرستد — بی‌آنکه متهمش کند، و تصمیم را به خودش وامی‌گذارد —
              یهودا همه چیز را در ملأ عام می‌پذیرد: צָדְקָה מִמֶּנִּי، «او از من پرهیزکارتر است».
              این یکی از والاترین اعترافات تورا است: رهبری که خطای خود را در برابر همگان می‌پذیرد.
            </p>
            <p>
              اما تلمود (سوطا ۱۰ب) واژه‌ی מִמֶּנִּי را با دو لبه می‌خواند. نه تنها به معنای
              «پرهیزکارتر <span className="text-gold/90">از من</span>»، بلکه «این <span className="text-gold/90">از سوی من</span> برآمد» —
              گویی صدایی آسمانی صحنه را امضا می‌کند: یک بَت‌قول برآمد و گفت
              «מִמֶּנִּי יָצְאוּ כְּבוּשִׁים» — «از من این رازهای نهان بیرون آمد». آن آبستنی رسواکننده،
              فرمان آسمان بود.
            </p>
          </div>
        </Sec>

        {/* ── نبرد در بالا ── */}
        <Sec>
          <h3 className="mb-4 mt-16 text-sm uppercase tracking-[0.3em] text-gold/60">
            نبرد در عالم بالا
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir="rtl">
            <p>
              تلمود (سوطا ۱۰ب) آنچه را در عالم نادیدنی می‌گذشت روایت می‌کند، آن‌گاه که تامار به سوی آتش می‌رفت.
              فرشته‌ی مدعی، <span className="text-gold/90">سَمائِل</span>، گرویی‌ها را پنهان کرد تا تامار نتواند
              چیزی ثابت کند، سوخته بمیرد — و چنین <span className="text-gold/90">داوود هرگز زاده نشود</span>.
            </p>
            <p>
              اما فرشته‌ی <span className="text-gold/90">گَبریئل</span> آن‌ها را به جای خود بازگرداند.
              مدرک دوباره پدیدار شد، یهودا اعتراف کرد، و دودمان نجات یافت.
              تولد مَشیَح، به‌راستی، میان دو فرشته رقم خورد.
            </p>
          </div>
        </Sec>

        {/* ── راز آسمان ── */}
        <Sec>
          <h3 className="mb-4 mt-16 text-sm uppercase tracking-[0.3em] text-gold/60">
            راز آسمان
          </h3>
        </Sec>

        <PQ
          he="וְהַקָּדוֹשׁ בָּרוּךְ הוּא הָיָה עוֹסֵק בּוֹרֵא אוֹרוֹ שֶׁל מֶלֶךְ הַמָּשִׁיחַ"
          fa="…و قدّوسِ متبارک سرگرمِ آفریدنِ نورِ پادشاهِ مَشیَح بود."
          source="برِشیت رَبّا ۸۵:۱ (ربی شموئل بَر نَحمان)"
        />

        <Sec>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir="rtl">
            <p>
              میدراش (برِشیت رَبّا ۸۵:۱)، به نام ربی شموئل بَر نَحمان، چیزی شگفت می‌گوید:
              در حالی که آدمیان در عِینایِم رسوایی می‌دیدند، در بالا
              «قدّوسِ متبارک سرگرمِ آفریدنِ نورِ پادشاهِ مَشیَح بود».
            </p>
            <p>
              دو ساحت هم‌زمان جاری‌اند. در پایین: شرم، بدگمانی، زنی در راهِ هیزم‌سوزی.
              در بالا: خدا نورِ رهاننده را برمی‌افروزد. همان صحنه، دو قرائتِ متضاد —
              و حقیقی، آنِ بالاست.
            </p>
          </div>
        </Sec>

        {/* ── جسارت مقدس ── */}
        <Sec>
          <h3 className="mb-4 mt-16 text-sm uppercase tracking-[0.3em] text-gold/60">
            جسارتِ مقدس
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir="rtl">
            <p>
              حکیمان از تامار قانونی از قوانینِ جان را می‌آموزند (سوطا ۱۰ب · برَخوت ۴۳ب):
              او ترجیح می‌داد <span className="text-gold/90">خود را در آتش بیفکند</span> تا اینکه
              یهودا را در ملأ عام شرمنده کند. می‌توانست فریاد بزند «پدر تویی!» و در دم نجات یابد.
              نکرد.
            </p>
            <p>
              تنها گرویی‌ها را، در نهان، برایش فرستاد تا خودش تصمیم بگیرد که آیا اعتراف کند.
              کرامتِ پذیرفتنِ خطا را برای او نگه داشت. همین لطافت، در همان لبه‌ی مرگ،
              بخشی از آن است که چرا سلطنت از او برمی‌آید.
            </p>
          </div>
        </Sec>

        {/* ── دوقلوها: پِرِص ── */}
        <Sec>
          <h3 className="mb-6 mt-16 text-center text-sm uppercase tracking-[0.3em] text-gold/60">
            رخنه و سپیده‌دم
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Tile he="פֶּרֶץ" sub="پِرِص · «رخنه»" color="#c9a43e" />
            <span className="font-cinzel text-2xl text-gold/40">·</span>
            <Tile he="זֶרַח" sub="زِرَح · «سپیده‌دم»" color="#e0a850" />
          </div>

          <div className="mt-8 space-y-4 text-sm leading-relaxed text-parchment/85" dir="rtl">
            <p>
              دوقلوها زاده می‌شوند (پیدایش ۳۸:۲۹-۳۰). نخستین را که راه می‌گشاید{" "}
              <span className="text-gold/90">پِرِص</span> (פֶּרֶץ) می‌نامند — «آن‌که رخنه می‌گشاید»،
              آن‌که مرزها را می‌شکند. دیگری را <span className="text-gold/90">زِرَح</span>،
              «سپیده‌دم».
            </p>
            <p>
              و از پِرِص، شمارشی آغاز می‌شود که تورا آن را تا پایانِ کتابِ روت نگه می‌دارد (روت ۴:۱۸-۲۲):
              پِرِص ← … ← عوبید ← یِشای ← <span className="text-gold/90">داوود</span>.
              از داوود، مَشیَح. دودمانِ سلطنت، به‌عمد، از رخنه زاده می‌شود.
            </p>
            <p className="font-cinzel text-base text-gold/90" dir="rtl">
              پِرِص (رخنه) ← … ← داوود ← مَشیَح.
            </p>
          </div>
        </Sec>

        {/* ── سود ── */}
        <Sec>
          <h3 className="mb-4 mt-16 text-sm uppercase tracking-[0.3em] text-gold/60">
            סוֹד · راز
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir="rtl">
            <p>
              کابالا اینجا قانونی از قوانینِ جهان را می‌خواند: والاترین نور به پست‌ترین جای فرومی‌افتد
              و چشم‌به‌راهِ رهایی می‌ماند. این‌ها <span className="text-gold/90">نیتسوتسوت</span>اند،
              جرقه‌های مقدس که درون آنچه ناپاک می‌نماید پنهان‌اند. دودمانِ مَشیَح، به‌عمد،
              با همان رشته‌هایی بافته می‌شود که جهان می‌خواهد پنهانشان کند.
            </p>
            <p>
              از همین رو این مجموعه مُهری دارد که بارها بازمی‌گردد: گِماتریای{" "}
              <span className="hebrew text-gold/90" dir="rtl">נָחָשׁ</span> (مار){" "}
              <span className="text-gold/90">۳۵۸</span> است — همان عددِ{" "}
              <span className="hebrew text-gold/90" dir="rtl">מָשִׁיחַ</span> (مَشیَح). نیرویی که فرومی‌افکنَد،
              چون برکشیده شود، همان است که رهایی می‌بخشد.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Tile he="נָחָשׁ" sub="مار · ۳۵۸" color="#b06a3c" />
            <span className="font-cinzel text-2xl text-gold/40">=</span>
            <Tile he="מָשִׁיחַ" sub="مَشیَح · ۳۵۸" color="#c9a43e" />
          </div>
        </Sec>

        {/* ── تُهو → تیکون ── */}
        <Sec>
          <h3 className="mb-4 mt-16 text-sm uppercase tracking-[0.3em] text-gold/60">
            תֹהוּ · تُهو ← تیکون
          </h3>

          {/* Sello de honestidad — lectura de derash/sod, NO fuente explícita */}
          <div className="mb-8 rounded-xl border border-gold/20 bg-gold/[0.04] px-5 py-4">
            <p className="text-[10px] uppercase tracking-widest text-gold/55">
              یادداشت صادقانه
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-parchment/75" dir="rtl">
              قرائتی <span className="text-gold/85">دِراش/سود</span> — یک خیدوش (نوآوریِ) نمادین،
              نه منبعِ صریحِ زُهر یا آریزال، و نه حرفِ نخستِ تحت‌اللفظیِ این سه واژه
              (חוֹתָם / פְּתִיל / מַטֶּה). همچون تأمل بر متن پیشنهاد می‌شود، نه نقل‌قول از استادان.
            </p>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir="rtl">
            <p>
              بار دیگر به سه گرویی که تامار در دست می‌گیرد بنگر. هر یک به حرفی گشوده می‌شود،
              و این سه با هم یک واژه را هجی می‌کنند:
            </p>
          </div>

          {/* Tabla: objeto → letra → función */}
          <div className="my-8 overflow-hidden rounded-2xl border border-gold/20">
            {[
              { he: "חוֹתָם · مُهر", letra: "ת", letraName: "تاو", fn: "مُهر زدن بر واقعیت" },
              { he: "פְּתִיל · بند", letra: "ה", letraName: "هِی", fn: "شکل دادن و سامان بخشیدن" },
              { he: "מַטֶּה · عصا", letra: "ו", letraName: "واو", fn: "پیوند دادن و راهبری کردن" },
            ].map((r, i) => (
              <div key={r.letra}
                className="flex items-center gap-4 px-5 py-4"
                style={{
                  background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
                  borderTop: i === 0 ? "none" : "1px solid rgba(201,164,62,0.12)",
                }}>
                <span className="hebrew shrink-0 font-bold leading-none"
                  style={{ fontSize: "clamp(34px, 9vw, 44px)", color: "#fff6e0", textShadow: "0 0 14px #c9a43e" }}>
                  {r.letra}
                </span>
                <div className="flex-1 text-right">
                  <p className="hebrew text-base text-gold/90" dir="rtl">{r.he}</p>
                  <p className="mt-1 text-sm text-parchment/80" dir="rtl">
                    <span className="text-xs uppercase tracking-wider text-gold/60">{r.letraName}</span>
                    {" — "}{r.fn}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* El remate: las tres letras forman Tohu */}
          <div className="my-8 rounded-2xl border-2 border-gold/30 bg-gold/[0.05] p-6 text-center">
            <p className="hebrew font-bold leading-none"
              style={{ fontSize: "clamp(40px, 12vw, 64px)", color: "#fff6e0", textShadow: "0 0 22px #c9a43e" }}>
              ת־ה־ו = תֹהוּ
            </p>
            <p className="mt-3 text-sm font-bold uppercase tracking-widest text-gold/80">
              تُهو — آشوبِ آغازین
            </p>
            <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-muted" dir="rtl">
              همان תֹהוּ از پیدایش ۱:۲ است، «و زمین <span className="text-gold/80">تُهو</span>
              {" "}وَ-بُهو بود» — بی‌سامانیِ پیش از نور.
            </p>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir="rtl">
            <p>
              و اینجا قوس بسته می‌شود. <span className="text-gold/90">تامار تُهو را در دستان خود می‌گیرد</span>:
              او، به‌راستی، گرویی‌هایی را نگه می‌دارد که آشوب را هجی می‌کنند.
              از آن نمی‌گریزد — آن را پاس می‌دارد. این‌ها <span className="text-gold/90">جرقه‌های فروافتاده‌</span>اند
              (نیتسوتسوتِ شکستِ ظرف‌ها، <span className="hebrew" dir="rtl">שְׁבִירַת הַכֵּלִים</span>)،
              نورِ مقدس که در آنچه جهان رسوایی می‌نامد به دام افتاده است.
            </p>
            <p>
              اعترافِ یهودا —<span className="hebrew text-gold/90" dir="rtl">צָדְקָה מִמֶּנִּי</span>،
              «او از من پرهیزکارتر است» (پیدایش ۳۸:۲۶)— لحظه‌ی{" "}
              <span className="text-gold/90">تیکون</span> است: دمی که آشوب ترمیم می‌شود،
              که حقیقت نامیده می‌شود و نور از بی‌سامانی رها می‌گردد.
            </p>
            <p>
              و از تیکون <span className="text-gold/90">پِرِص</span> (رخنه) می‌جوشد —
              شکافی که نور، که پیش‌تر اسیرِ تُهو بود، سرانجام از آن به جهان درمی‌تابد.
              از آشوبِ نگه‌داشته، سلطنت زاده می‌شود.
            </p>
            <p className="font-cinzel text-base text-gold/90" dir="rtl">
              تُهو (آشوب) ← تیکون (ترمیم) ← پِرِص (رخنه‌ای که نور از آن درمی‌آید).
            </p>
          </div>

          {/* Dato fino de gematría */}
          <div className="mt-8 rounded-xl border border-gold/15 bg-gold/[0.03] px-5 py-4 text-center">
            <p className="text-[10px] uppercase tracking-widest text-gold/50">نکته‌ی باریک</p>
            <p className="mt-1.5 text-sm text-parchment/80" dir="rtl">
              <span className="hebrew text-gold/90" dir="rtl">תֹהוּ</span> = <span className="text-gold/90">۴۱۱</span>
              {" = "}ת(۴۰۰) + ה(۵) + ו(۶).
            </p>
          </div>
        </Sec>

        {/* ── جمع‌بندی ── */}
        <Sec>
          <div className="mt-16 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.06] to-transparent p-8 text-center">
            <p className="hebrew mb-3 text-3xl text-gold" style={{ textShadow: "0 0 12px #c9a43e88" }}>
              אוֹרוֹ שֶׁל מָשִׁיחַ
            </p>
            <h3 className="mb-3 font-cinzel text-base font-bold text-parchment/90">
              آنچه جهان پنهان می‌کند، خدا تاج‌گذاری می‌کند
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted" dir="rtl">
              در حالی که آدمیان رسوایی می‌دیدند، آسمان نورِ مَشیَح را برمی‌افروخت.
              روبندِ تامار گناهی را پنهان نمی‌کرد: رهاننده را پنهان می‌کرد. آنچه جهان می‌پوشانَد،
              خدا آن را برمی‌کشد و بر تخت می‌نشانَد.
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { label: "تامار · پیدایش ۳۸", ref: "Genesis 38" },
                { label: "«از من پرهیزکارتر است» · پیدایش ۳۸:۲۶", ref: "Genesis 38:26" },
                { label: "سوطا ۱۰ب", ref: "Sotah 10b" },
                { label: "پِرِص ← داوود · روت ۴:۱۸", ref: "Ruth 4:18" },
              ].map((t, i) => (
                <button key={i} onClick={() => router.push(`/estudio?ref=${encodeURIComponent(t.ref)}`)}
                  className="rounded-full border border-gold/25 px-4 py-1.5 text-xs text-gold/70 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold">
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Genesis 38")}&context=kabbalah`)}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}>
              ← مطالعه‌ی این راز در خَشمَل
            </button>

            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
              <Link href="/misterio/linaje" className="hover:text-gold">← چهار مادرِ مَشیَح</Link>
              <Link href="/misterios" className="hover:text-gold">← رازهای بیشتر</Link>
            </div>
          </div>
        </Sec>

        {/* Footer */}
        <div className="mt-16 border-t border-gold/10 pt-8 text-center">
          <p className="hebrew text-2xl text-gold/60">חַשְׁמַל</p>
          <p className="mt-1 font-cinzel text-xs uppercase tracking-widest text-muted/50">
            کابالا و فلسفه‌ی یهودی
          </p>
        </div>

      </main>
    </div>
  );
}

// ── Página ────────────────────────────────────────────────────────────────────
export default function TamarPage() {
  const locale = useLocale();
  const router = useRouter();

  const [dark, setDark] = useState(true);
  // Las páginas de misterio van SIEMPRE en oscuro: las letras hebreas doradas y
  // el texto pergamino solo se leen bien sobre fondo #05050a.
  useEffect(() => { document.documentElement.classList.add("dark"); setDark(true); }, []);

  // El farsi de esta página ya está traducido y verificado por el Sofer.
  if (locale === "fa") return <TamarFarsi />;

  const bg = dark ? "#05050a" : "#f1ebdd";
  const navBg = dark ? "rgba(5,5,10,0.9)" : "rgba(241,235,221,0.9)";

  return (
    <div className={`${dark ? "always-dark" : ""} min-h-screen`} style={{ background: bg }} dir="ltr">

      {/* Nav */}
      <nav className="sticky top-0 z-40 border-b border-gold/10 px-5 py-3 backdrop-blur-md" style={{ background: navBg }}>
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link href="/" className="font-cinzel text-sm text-gold/70 hover:text-gold">חַשְׁמַל · Jashmal</Link>
          <div className="flex items-center gap-3">
            <MisterioLangToggle />
            <button onClick={() => router.push("/estudio")}
              className="rounded-full border border-gold/30 px-4 py-1.5 font-cinzel text-xs uppercase tracking-widest text-gold transition-all hover:border-gold hover:bg-gold/10">
              Comenzar estudio →
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-2xl px-5 pb-24 pt-16">

        {/* ── HERO ── */}
        <div className="mb-16 text-center">
          <p className="mb-4 font-cinzel text-xs uppercase tracking-[0.4em] text-gold/50">
            Génesis 38 · Talmud · Midrash
          </p>
          <h1 className="hebrew mb-3 font-bold leading-none"
            style={{ fontSize: "clamp(56px, 16vw, 110px)", color: dark ? "#fdf4dd" : "#6e4f12",
              textShadow: dark ? "0 0 24px #c9a43e88" : "none" }}>
            תָּמָר
          </h1>
          <h2 className="font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
            El velo que escondía al Mesías
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
            El mayor escándalo de la Torá esconde, en su mismo centro, el nacimiento
            de la línea del Mashíaj. Lo que el mundo quería tapar, el Cielo lo coronaba.
          </p>
        </div>

        {/* ── La historia ── */}
        <Section>
          <h3 className="mb-2 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            La historia
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              Tamar enviuda dos veces. Se casa con Er, el primogénito de Yehudá, y muere.
              Por la ley del levirato pasa a Onán, el segundo hijo — y también muere.
              Queda un tercer hijo, Shelá, pero Yehudá tiene miedo y no se lo entrega:
              la abandona, viuda y sin descendencia, en casa de su padre.
            </p>
            <p>
              Tamar entiende que jamás le darán a Shelá. Entonces hace algo audaz hasta el
              límite: se quita las ropas de viuda, se cubre con un velo y se sienta en el
              cruce del camino, en un lugar llamado <span className="text-gold/90">Enaim</span>.
              Yehudá la toma por prostituta y se acerca. Como no lleva el pago consigo, ella
              le pide una prenda: su <span className="text-gold/90">sello</span>, su{" "}
              <span className="text-gold/90">cordón</span> y su{" "}
              <span className="text-gold/90">bastón</span> (Génesis 38:18).
            </p>
            <p>
              De esa unión queda embarazada de mellizos. Meses después, cuando se sabe
              que la viuda está encinta, Yehudá ordena que la quemen. Y aquí gira toda
              la historia.
            </p>
          </div>
        </Section>

        {/* ── Las tres prendas ── */}
        <Section>
          <h3 className="mb-6 mt-16 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            Las tres prendas
          </h3>
          <p className="mx-auto mb-8 max-w-md text-center text-sm leading-relaxed text-muted">
            No pidió oro. Pidió las tres cosas que probarían quién era el padre.
            La identidad entera de Yehudá quedó en sus manos.
          </p>
        </Section>

        <div className="space-y-4">
          {PRENDAS.map((p, i) => (
            <Section key={p.he} delay={i * 60}>
              <div className="flex items-center gap-4 rounded-2xl border border-gold/15 p-5"
                style={{ background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}>
                <span className="hebrew shrink-0 font-bold leading-none"
                  style={{ fontSize: "clamp(40px, 11vw, 54px)", color: dark ? "#fff6e0" : "#3a2a08",
                    textShadow: dark ? `0 0 16px ${p.color}` : "none" }}>
                  {p.he}
                </span>
                <div className="flex-1">
                  <p className="font-cinzel text-sm font-bold tracking-wide" style={{ color: p.color }}>
                    {p.name}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-parchment/85">{p.sentido}</p>
                </div>
              </div>
            </Section>
          ))}
        </div>

        {/* ── La confesión de Yehudá ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            La confesión
          </h3>
        </Section>

        <PullQuote
          he="צָדְקָה מִמֶּנִּי"
          es="Ella es más justa que yo."
          source="Génesis 38:26"
        />

        <Section>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              Cuando Tamar le envía sus propias prendas — sin acusarlo, dejándolo decidir —
              Yehudá reconoce todo en público: צָדְקָה מִמֶּנִּי, «ella es más justa que yo».
              Es uno de los actos de confesión más altos de la Torá: un líder admitiendo
              su falta ante todos.
            </p>
            <p>
              Pero el Talmud (Sotá 10b) lee מִמֶּנִּי con un doble filo. No solo significa
              «más justa <span className="text-gold/90">que yo</span>», sino también
              «esto vino <span className="text-gold/90">de Mí</span>» — como si una Voz
              Divina firmara la escena: el embarazo escandaloso fue decreto del Cielo.
            </p>
          </div>
        </Section>

        {/* ── La batalla cósmica ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            La batalla en lo alto
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              El Talmud (Sotá 10b) cuenta lo que pasaba en el mundo invisible mientras
              Tamar iba al fuego. El ángel acusador, <span className="text-gold/90">Samael</span>,
              escondió las prendas para que ella no pudiera probar nada, muriera quemada —
              y así <span className="text-gold/90">David jamás naciera</span>.
            </p>
            <p>
              Pero el ángel <span className="text-gold/90">Gabriel</span> las devolvió a su
              lugar. La prueba reapareció, Yehudá confesó, y la línea quedó a salvo.
              El nacimiento del Mashíaj se decidió, literalmente, entre dos ángeles.
            </p>
          </div>
        </Section>

        {/* ── El secreto del Cielo ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            El secreto del Cielo
          </h3>
        </Section>

        <PullQuote
          he="וְהַקָּדוֹשׁ בָּרוּךְ הוּא הָיָה עוֹסֵק בּוֹרֵא אוֹרוֹ שֶׁל מֶלֶךְ הַמָּשִׁיחַ"
          es="…y el Santo, bendito sea, estaba ocupado creando la luz del Rey Mashíaj."
          source="Bereshit Rabá 85:1 (R. Shmuel bar Najman)"
        />

        <Section>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              El Midrash (Bereshit Rabá 85:1), en nombre de Rabí Shmuel bar Najman, dice
              algo desconcertante: mientras los hombres veían en Enaim un escándalo, arriba
              «el Santo, bendito sea, estaba ocupado creando la luz del Rey Mashíaj».
            </p>
            <p>
              Los dos planos corren a la vez. Abajo: vergüenza, sospecha, una mujer camino
              de la hoguera. Arriba: Dios encendiendo la luz del Redentor. La misma escena,
              dos lecturas opuestas — y la verdadera es la de arriba.
            </p>
          </div>
        </Section>

        {/* ── La audacia santa ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            La audacia santa
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              De Tamar aprenden los Sabios una ley del alma (Sotá 10b · Berajot 43b):
              prefería <span className="text-gold/90">arrojarse al fuego</span> antes que
              avergonzar a Yehudá en público. Pudo haber gritado «¡el padre eres tú!» y
              salvarse al instante. No lo hizo.
            </p>
            <p>
              Solo le mandó las prendas, en privado, para que él decidiera por sí mismo si
              confesaba. Le dejó la dignidad de reconocer su falta. Esa delicadeza, en el
              borde mismo de la muerte, es parte de por qué de ella sale la realeza.
            </p>
          </div>
        </Section>

        {/* ── Los mellizos: Péretz ── */}
        <Section>
          <h3 className="mb-6 mt-16 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            La brecha y el amanecer
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <HebrewTile he="פֶּרֶץ" sub="Péretz · «Brecha»" color="#c9a43e" />
            <span className="font-cinzel text-2xl text-gold/40">·</span>
            <HebrewTile he="זֶרַח" sub="Zéraj · «Amanecer»" color="#e0a850" />
          </div>

          <div className="mt-8 space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              Nacen mellizos (Génesis 38:29-30). Al primero que rompe paso lo llaman{" "}
              <span className="text-gold/90">Péretz</span> (פֶּרֶץ) — «el que abre la
              brecha», el que rompe las barreras. Al otro, <span className="text-gold/90">Zéraj</span>,
              «amanecer».
            </p>
            <p>
              Y de Péretz arranca la cuenta que la Torá guarda hasta el final del libro de
              Rut (4:18-22): Péretz → … → Obed → Yishai → <span className="text-gold/90">David</span>.
              De David, el Mashíaj. La línea de la realeza nace, a propósito, de la brecha.
            </p>
            <p className="font-cinzel text-base text-gold/90">
              Péretz (la brecha) → … → David → el Mashíaj.
            </p>
          </div>
        </Section>

        {/* ── El Sod ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            סוֹד · El secreto
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              La Cabalá lee aquí una ley del mundo: la luz más alta cae al lugar más bajo
              y espera ser rescatada. Son las <span className="text-gold/90">nitzotzot</span>,
              las chispas santas escondidas dentro de lo que parece impuro. El linaje del
              Mesías se teje, a propósito, con los hilos que el mundo querría esconder.
            </p>
            <p>
              Por eso esta serie lleva un sello que vuelve una y otra vez: la gematría de{" "}
              <span className="hebrew text-gold/90" dir="rtl">נָחָשׁ</span> (serpiente) es{" "}
              <span className="text-gold/90">358</span> — el mismo número de{" "}
              <span className="hebrew text-gold/90" dir="rtl">מָשִׁיחַ</span> (Mashíaj). La
              fuerza que hace caer, elevada, es la misma que redime.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <HebrewTile he="נָחָשׁ" sub="Serpiente · 358" color="#b06a3c" />
            <span className="font-cinzel text-2xl text-gold/40">=</span>
            <HebrewTile he="מָשִׁיחַ" sub="Mashíaj · 358" color="#c9a43e" />
          </div>
        </Section>

        {/* ── Tohu → Tikún ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            תֹהוּ · Tohu → Tikún
          </h3>

          {/* Sello de honestidad — lectura de derash/sod, NO fuente explícita */}
          <div className="mb-8 rounded-xl border border-gold/20 bg-gold/[0.04] px-5 py-4">
            <p className="font-cinzel text-[10px] uppercase tracking-widest text-gold/55">
              Nota de honestidad
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-parchment/75">
              Lectura de <span className="text-gold/85">derash/sod</span> — un jidush
              (innovación) simbólico, no fuente explícita del Zóhar ni del Arí. Se ofrece
              como meditación sobre el texto, no como cita de los maestros.
            </p>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              Mira de nuevo las tres prendas que Tamar pide en su mano. Cada una se abre
              a una letra, y las tres juntas deletrean una sola palabra:
            </p>
          </div>

          {/* Tabla: objeto → letra → función */}
          <div className="my-8 overflow-hidden rounded-2xl border border-gold/20">
            {[
              { he: "חוֹתָם · Sello", letra: "ת", letraName: "Tav", fn: "sellar la realidad" },
              { he: "פְּתִיל · Cordón", letra: "ה", letraName: "Hei", fn: "formar y organizar" },
              { he: "מַטֶּה · Bastón", letra: "ו", letraName: "Vav", fn: "conectar y conducir" },
            ].map((r, i) => (
              <div
                key={r.letra}
                className="flex items-center gap-4 px-5 py-4"
                style={{
                  background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
                  borderTop: i === 0 ? "none" : "1px solid rgba(201,164,62,0.12)",
                }}
              >
                <span className="hebrew shrink-0 font-bold leading-none"
                  style={{ fontSize: "clamp(34px, 9vw, 44px)", color: "#fff6e0", textShadow: "0 0 14px #c9a43e" }}>
                  {r.letra}
                </span>
                <div className="flex-1">
                  <p className="hebrew text-base text-gold/90" dir="rtl">{r.he}</p>
                  <p className="mt-1 text-sm text-parchment/80">
                    <span className="font-cinzel text-xs uppercase tracking-wider text-gold/60">{r.letraName}</span>
                    {" — "}{r.fn}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* El remate: las tres letras forman Tohu */}
          <div className="my-8 rounded-2xl border-2 border-gold/30 bg-gold/[0.05] p-6 text-center">
            <p className="hebrew font-bold leading-none"
              style={{ fontSize: "clamp(40px, 12vw, 64px)", color: "#fff6e0", textShadow: "0 0 22px #c9a43e" }}>
              ת־ה־ו = תֹהוּ
            </p>
            <p className="mt-3 font-cinzel text-sm font-bold uppercase tracking-widest text-gold/80">
              Tohu — el caos primordial
            </p>
            <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-muted">
              Es el mismo תֹהוּ de Génesis 1:2, «la tierra estaba <span className="text-gold/80">tohu</span>
              {" "}va-vohu» — el desorden de antes de la luz.
            </p>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              Y aquí se cierra el arco. <span className="text-gold/90">Tamar toma el Tohu
              en sus manos</span>: sostiene, literalmente, las prendas que deletrean el caos.
              No huye de él — lo custodia. Son las <span className="text-gold/90">chispas
              caídas</span> (las nitzotzot del quiebre, <span className="hebrew" dir="rtl">שְׁבִירַת הַכֵּלִים</span>),
              la luz santa atrapada en lo que el mundo llama escándalo.
            </p>
            <p>
              El reconocimiento de Yehudá —<span className="hebrew text-gold/90" dir="rtl">צָדְקָה מִמֶּנִּי</span>,
              «ella es más justa que yo» (Génesis 38:26)— es el momento del{" "}
              <span className="text-gold/90">Tikún</span>: el instante en que el caos se
              repara, en que la verdad se nombra y la luz se libera del desorden.
            </p>
            <p>
              Y del Tikún brota <span className="text-gold/90">Péretz</span> (Fares),
              «la brecha» — la grieta por donde la luz, antes prisionera del Tohu, por fin
              irrumpe en el mundo. Del caos sostenido nace la realeza.
            </p>
            <p className="font-cinzel text-base text-gold/90">
              Tohu (el caos) → Tikún (la reparación) → Péretz (la brecha por donde entra la luz).
            </p>
          </div>

          {/* Dato fino de gematría */}
          <div className="mt-8 rounded-xl border border-gold/15 bg-gold/[0.03] px-5 py-4 text-center">
            <p className="font-cinzel text-[10px] uppercase tracking-widest text-gold/50">Dato fino</p>
            <p className="mt-1.5 text-sm text-parchment/80">
              <span className="hebrew text-gold/90" dir="rtl">תֹהוּ</span> = <span className="text-gold/90">411</span>
              {" = "}ת(400) + ה(5) + ו(6).
            </p>
          </div>
        </Section>

        {/* ── Síntesis ── */}
        <Section>
          <div className="mt-16 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.06] to-transparent p-8 text-center">
            <p className="hebrew mb-3 text-3xl text-gold" style={{ textShadow: dark ? "0 0 12px #c9a43e88" : "none" }}>
              אוֹרוֹ שֶׁל מָשִׁיחַ
            </p>
            <h3 className="mb-3 font-cinzel text-base font-bold text-parchment/90">
              Lo que el mundo esconde, Dios lo corona
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted">
              Mientras los hombres veían un escándalo, el Cielo encendía la luz del Mashíaj.
              El velo de Tamar no escondía un pecado: escondía al Redentor. Lo que el mundo
              tapa, Dios lo levanta y lo pone en el trono.
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { label: "Tamar · Génesis 38", ref: "Genesis 38" },
                { label: "«Más justa que yo» · Gn 38:26", ref: "Genesis 38:26" },
                { label: "Sotá 10b", ref: "Sotah 10b" },
                { label: "Péretz → David · Rut 4:18", ref: "Ruth 4:18" },
              ].map((t, i) => (
                <button key={i} onClick={() => router.push(`/estudio?ref=${encodeURIComponent(t.ref)}`)}
                  className="rounded-full border border-gold/25 px-4 py-1.5 font-cinzel text-xs text-gold/70 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold">
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Genesis 38")}&context=kabbalah`)}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
            >
              Estudiar este misterio en Jashmal →
            </button>

            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
              <Link href="/misterio/linaje" className="hover:text-gold">Ver a las cuatro madres del Mashíaj →</Link>
              <Link href="/misterios" className="hover:text-gold">Más misterios →</Link>
            </div>
          </div>
        </Section>

        {/* Footer */}
        <div className="mt-16 border-t border-gold/10 pt-8 text-center">
          <p className="hebrew text-2xl text-gold/60">חַשְׁמַל</p>
          <p className="mt-1 font-cinzel text-xs uppercase tracking-widest text-muted/50">
            Cabalá &amp; Filosofía Judía
          </p>
        </div>

      </main>
    </div>
  );
}
