"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useRouter } from "@/i18n/navigation";

// ── Componentes ───────────────────────────────────────────────────────────────
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

function PullQuote({ he, es, fa, source, locale }: { he: string; es: string; fa: string; source: string; locale: string }) {
  return (
    <Section>
      <div className="my-9 rounded-2xl border border-gold/25 bg-gold/[0.05] p-6">
        <p className="hebrew mb-3 text-right text-lg leading-relaxed text-gold/85" dir="rtl">{he}</p>
        <p className="mb-1 text-sm italic leading-relaxed text-parchment/80" dir={locale === "fa" ? "rtl" : "ltr"}>
          {locale === "fa" ? `«${fa}»` : `«${es}»`}
        </p>
        <p className="font-cinzel text-[10px] uppercase tracking-widest text-gold/50">— {source}</p>
      </div>
    </Section>
  );
}

// Tile oscuro con palabra hebrea (legible en cualquier tema).
function Tile({ he, sub, color, size = 64 }: { he: string; sub: string; color: string; size?: number }) {
  return (
    <div
      className="inline-flex flex-col items-center rounded-2xl border-2 px-6 py-4"
      style={{ borderColor: `${color}99`, background: "rgba(14,12,22,0.96)", boxShadow: `0 0 24px ${color}33` }}
    >
      <span className="hebrew font-bold leading-none"
        style={{ fontSize: `${size}px`, color: "#fff6e0", textShadow: `0 0 20px ${color}, 0 0 7px ${color}` }}>
        {he}
      </span>
      <span className="mt-2 font-cinzel text-xs uppercase tracking-widest" style={{ color }}>{sub}</span>
    </div>
  );
}

// Tarjeta de un "filo" (las dos lecturas opuestas).
function Filo({ titulo, color, children }: { titulo: string; color: string; children: React.ReactNode }) {
  return (
    <div className="flex-1 rounded-2xl border p-5" style={{ borderColor: `${color}55`, background: `${color}08` }}>
      <p className="mb-2 font-cinzel text-xs uppercase tracking-widest" style={{ color }}>{titulo}</p>
      <p className="text-sm leading-relaxed text-parchment/85">{children}</p>
    </div>
  );
}

// ── Página ────────────────────────────────────────────────────────────────────
export default function HabakukPage() {
  const locale = useLocale();
  const router = useRouter();
  const fa = locale === "fa";

  const [dark, setDark] = useState(true);
  useEffect(() => { setDark(document.documentElement.classList.contains("dark")); }, []);
  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try { localStorage.setItem("jashmal-theme", next ? "dark" : "light"); } catch { /* noop */ }
  }
  const bg = dark ? "#05050a" : "#f1ebdd";
  const navBg = dark ? "rgba(5,5,10,0.9)" : "rgba(241,235,221,0.9)";

  return (
    <div className={`${dark ? "always-dark" : ""} min-h-screen`} style={{ background: bg }} dir={fa ? "rtl" : "ltr"}>

      {/* Nav */}
      <nav className="sticky top-0 z-40 border-b border-gold/10 px-5 py-3 backdrop-blur-md" style={{ background: navBg }}>
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link href="/misterios" className="font-cinzel text-sm text-gold/70 hover:text-gold">← {fa ? "اسرار" : "Misterios"}</Link>
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} aria-label={dark ? "Modo claro" : "Modo oscuro"}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors hover:bg-gold/10">
              {dark ? "☀" : "☾"}
            </button>
            <button onClick={() => router.push("/estudio")}
              className="rounded-full border border-gold/30 px-4 py-1.5 font-cinzel text-xs uppercase tracking-widest text-gold transition-all hover:border-gold hover:bg-gold/10">
              {fa ? "شروع مطالعه" : "Comenzar estudio →"}
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-2xl px-5 pb-24 pt-16">

        {/* HERO */}
        <div className="mb-14 text-center">
          <p className="mb-4 font-cinzel text-xs uppercase tracking-[0.4em] text-gold/50">
            {fa ? "زوهر بِشَلَح" : "Zohar Beshalaj"}
          </p>
          <h1 className="hebrew mb-3 font-bold leading-none"
            style={{ fontSize: "clamp(52px, 13vw, 92px)", color: dark ? "#fdf4dd" : "#6e4f12",
              textShadow: dark ? "0 0 26px #c9a43e88" : "none" }}>
            חֲבַקּוּק
          </h1>
          <h2 className="font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
            {fa ? "حَبَقّوق — پیامبرِ دو آغوش" : "Habakuk — el profeta del doble abrazo"}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted" dir={fa ? "rtl" : "ltr"}>
            {fa
              ? "نامش دو بار «آغوش» را در خود دارد. دعایش «بر شیگیونوت» است — خطاها، یا سازها؟ یک واژه، دو لبه."
              : "Su nombre repite dos veces «abrazo». Su oración es «sobre shigyonot» — ¿errores, o instrumentos? Una palabra, dos filos."}
          </p>
        </div>

        {/* ── EL VERSÍCULO FUENTE — de aquí parte todo ── */}
        <Section>
          <div className="mb-16 rounded-2xl border border-gold/30 bg-gold/[0.04] p-6 text-center">
            <p className="mb-4 font-cinzel text-[10px] uppercase tracking-[0.35em] text-gold/50">
              {fa ? "متنِ پایه" : "El texto fuente"}
            </p>
            <p className="hebrew mb-4 leading-relaxed text-gold" dir="rtl"
              style={{ fontSize: "clamp(22px, 5.5vw, 30px)", textShadow: dark ? "0 0 14px #c9a43e55" : "none" }}>
              תְּפִלָּה לַחֲבַקּוּק הַנָּבִיא עַל שִׁגְיֹנוֹת
            </p>
            <p className="text-sm italic leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "«دعای حَبَقّوقِ نبی، بر شیگیونوت.»"
                : "«Oración del profeta Habakuk, sobre shigyonot.»"}
            </p>
            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Habakkuk 3:1")}`)}
              className="mt-3 font-cinzel text-[11px] uppercase tracking-widest text-gold/60 transition-colors hover:text-gold"
            >
              חֲבַקּוּק 3:1 · {fa ? "مطالعه ↗" : "estudiar ↗"}
            </button>
            <p className="mx-auto mt-4 max-w-md text-xs leading-relaxed text-muted/70" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "از همین یک آیه، دو راز می‌شکفد: راز یک واژه (شیگیونوت)، و راز یک نام (حَبَقّوق)."
                : "De este único versículo brotan dos misterios: el de una palabra (shigyonot) y el de un nombre (Habakuk)."}
            </p>
          </div>
        </Section>

        {/* ── PARADOJA 1: SHIGYONOT ── */}
        <Section>
          <div className="mb-4 text-center">
            <Tile he="שִׁגְיֹנוֹת" sub={fa ? "شیگیونوت" : "Shigyonot"} color="#c9a43e" size={48} />
          </div>
          <h3 className="mb-2 mt-8 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "لبهٔ نخست — یک واژه، دو معنا" : "Primer filo — una palabra, dos sentidos"}
          </h3>
          <p className="mb-6 text-sm leading-relaxed text-muted">
            {fa
              ? "حَبَقّوق ۳:۱: «دعای حَبَقّوقِ نبی، بر شیگیونوت». همین واژه دو خوانش کاملاً متضاد دارد:"
              : "Habakuk 3:1: «Oración del profeta Habakuk, sobre shigyonot». La misma palabra tiene dos lecturas opuestas:"}
          </p>
        </Section>

        <Section>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Filo titulo={fa ? "شِگیوت — خطاها" : "Shegiot — errores"} color="#cc5555">
              {fa
                ? "زوهر می‌گوید حَبَقّوق در روزِ راش هاشانا متولد شد — روزی که خطاهای بشر داوری می‌شوند. پس دعایش «بر خطاها» است: از جایگاهِ دین (داوری) برمی‌خیزد."
                : "El Zohar dice que Habakuk nació en Rosh Hashaná — el día en que se juzgan los errores del hombre. Por eso su oración es «sobre los errores»: brota desde el lugar del Din (el juicio)."}
            </Filo>
            <Filo titulo={fa ? "شیگیونوت — سازها" : "Shigyonot — instrumentos"} color="#5a9a6a">
              {fa
                ? "اما زوهر می‌افزاید: نمی‌گوید «شِگیوت» بلکه «شیگیونوت» — یعنی سازهای موسیقی، چون «شیگایونِ داود» (مزمور ۷:۱). همان سازهایی که پیامبران برای ورود به وجد نبوّت به کار می‌بردند."
                : "Pero el Zohar añade: no dice «shegiot» sino «shigyonot» — es decir, instrumentos musicales, como el «shigayon de David» (Salmo 7:1). Los mismos que los profetas usaban para entrar en éxtasis profético."}
            </Filo>
          </div>
        </Section>

        <PullQuote
          he="לֹא נֶאֱמַר שְׁגִיאוֹת אֶלָּא שִׁגְיוֹנוֹת — אֵלּוּ כְּלֵי הַנְּגִינָה"
          es="No dice 'errores' (shegiot) sino 'shigyonot' — estos son los instrumentos musicales, como el 'shigayon de David', que usaban todos los profetas (excepto Moshé) para entrar en éxtasis antes de recibir el espíritu de profecía."
          fa="نمی‌گوید «خطاها» بلکه «شیگیونوت» — اینها سازهای موسیقی‌اند، چون «شیگایونِ داود»، که همهٔ پیامبران (جز موسی) برای ورود به وجد پیش از دریافتِ روحِ نبوّت به کار می‌بردند."
          source="Zohar Beshalaj 1:24 · Habakuk 3:1 · Tehilim 7:1 · cf. I Shmuel 10:5; II Melajim 3:15"
          locale={locale}
        />

        <Section>
          <p className="text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            {fa
              ? "این همان «دو لبه» است: همان واژه که سقوط است (خطا)، وسیلهٔ صعود است (موسیقیِ نبوّت). موسی به ساز نیاز نداشت — او «آینهٔ روشن» بود؛ اما حَبَقّوق، که از جایگاهِ خطاها برخاست، بیش از همه به موسیقی نیاز داشت تا داوری را آرام کند و به نبوّت برسد."
              : "Es el «doble filo»: la misma palabra que es caída (el error) es vehículo de ascenso (la música de la profecía). Moshé no necesitaba instrumento — él era «el espejo claro»; pero Habakuk, que vino del lugar de los errores, necesitaba la música más que nadie, para calmar el Din y entrar en la profecía."}
          </p>
        </Section>

        {/* ── PARADOJA 2: EL DOBLE ABRAZO ── */}
        <Section>
          <h3 className="mb-6 mt-16 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "لبهٔ دوم — یک آغوش، یا دو؟" : "Segundo filo — ¿un abrazo, o dos?"}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Tile he="חָבוּק" sub={fa ? "یک آغوش" : "Un abrazo"} color="#cc5555" size={48} />
            <span className="font-cinzel text-2xl text-gold/40">→</span>
            <Tile he="חֲבַקּוּק" sub={fa ? "دو آغوش" : "Dos abrazos"} color="#c9a43e" size={48} />
          </div>
        </Section>

        <Section>
          <div className="mt-8 space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "نامِ او «حَبوک» (در آغوش‌گرفته) نیست، بلکه «حَبَقّوق» است — حرفِ قوف دوبار، یعنی دو آغوش. زوهر می‌گوید او زندگی‌اش را مدیونِ دو آغوش است."
                : "Su nombre no es «Javuk» (abrazado) sino «Habakuk» — la letra Kuf repetida: dos abrazos. El Zohar dice que él debe su vida a dos abrazamientos."}
            </p>
            <p>
              {fa
                ? "او همان پسرِ زنِ شونَمی است (دوم پادشاهان ۴): الیشَع به او وعده داد «در این هنگام پسری در آغوش خواهی گرفت» (חֹבֶקֶת בֵּן). آغوشِ نخست از مادر بود — جایگاهِ پایین. اما کودک مُرد، و الیشَع او را زنده کرد: آغوشِ دوم، از «درجهٔ والای علیا»."
                : "Él es el hijo de la mujer Shunamita (II Reyes 4): Eliseo le prometió «en este tiempo abrazarás un hijo» (חֹבֶקֶת בֵּן). El primer abrazo fue de la madre — la esfera inferior. Pero el niño murió, y Eliseo lo revivió: el segundo abrazo, desde «el grado supremo superior»."}
            </p>
          </div>
        </Section>

        <PullQuote
          he="חֲבַקּוּק וְלֹא חָבוּק — שְׁנֵי חִבּוּקִים: אֶחָד שֶׁל אִמּוֹ, וְאֶחָד שֶׁל אֱלִישָׁע"
          es="'Habakuk' y no 'Javuk' — dos abrazos: uno de su madre, y uno de Eliseo; uno viene de la esfera a la que estaba unido al principio, y el otro del grado supernal más alto."
          fa="«حَبَقّوق» و نه «حَبوک» — دو آغوش: یکی از مادرش، و یکی از الیشَع؛ یکی از همان جایگاهِ نخستین، و دیگری از والاترین درجهٔ علیا."
          source="Zohar Beshalaj 1:20 · II Melajim 4:16"
          locale={locale}
        />

        {/* ── LA GEMATRÍA: 216 ── */}
        <Section>
          <h3 className="mb-6 mt-16 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "گوهرِ عددی — ۲۱۶" : "La joya numérica — 216"}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Tile he="חֲבַקּוּק" sub="216" color="#c9a43e" size={44} />
            <span className="font-cinzel text-2xl text-gold/40">=</span>
            <Tile he="גְּבוּרָה" sub={fa ? "گِوورا · ۲۱۶" : "Gevurá · 216"} color="#cc5555" size={44} />
          </div>
          <div className="mt-8 space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "حَבَקّوק (ח۸ ב۲ ק۱۰۰ ו۶ ق۱۰۰) = ۲۱۶ = گِوورا (نیروی داوری، دین). همان جایگاهِ «یک آغوش»، عالمِ اِلوهیم که حَبَقّوق از آن زاده شد. نامش، خودِ آن نیرویی است که باید متعادل شود."
                : "Habakuk (ח8 ב2 ק100 ו6 ק100) = 216 = Gevurá (la fuerza del juicio, el Din). El mismo lugar del «un abrazo», el mundo de Elohim del que nació. Su nombre ES la fuerza que debe equilibrarse."}
            </p>
            <p className="font-cinzel text-base text-gold/90">
              {fa
                ? "و ۲۱۶ = حروفِ شِم هَمِفوراش — ۷۲ نامِ خدا."
                : "Y 216 = las letras del Shem HaMeforash — los 72 Nombres de Dios."}
            </p>
            <p>
              {fa
                ? "آن ۷۲ نام از سه آیهٔ خروج ۱۴:۱۹–۲۱ برمی‌آیند (۳ × ۷۲ = ۲۱۶ حرف) — در همان پاراشای بِشَلَح، شکافتنِ دریا. پس گماتریای حَبَقّوق دقیقاً برابر است با ۲۱۶ حرفِ الهی که از پاراشای خودِ او زاده می‌شوند."
                : "Esos 72 Nombres surgen de los tres versículos de Éxodo 14:19-21 (3 × 72 = 216 letras) — en la misma parashá Beshalaj, la partición del mar. La guematría de Habakuk equivale exactamente a las 216 letras divinas que nacen de su propia parashá."}
            </p>
          </div>
        </Section>

        {/* ── EL PATRÓN CÓSMICO ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "الگوی کیهانی" : "El patrón cósmico"}
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "این داستانِ خودِ آفرینش است. در پیدایش ۱، جهان تنها با «اِلوهیم» (دین) آفریده می‌شود — یک آغوش. تنها در پیدایش ۲، نامِ «یهوه اِلوهیم» یکپارچه می‌شود (رحمت در دین) — آغوشِ دوم."
                : "Es la historia de la creación misma. En Génesis 1, el mundo se crea solo con «Elohim» (el Din) — un abrazo. Solo en Génesis 2 se integra el nombre «YHVH Elohim» (la misericordia dentro del juicio) — el segundo abrazo."}
            </p>
            <p>
              {fa
                ? "حَبَقّوق همان حرکت است در یک جان: از مادر تنها (اِلوهیم، دین، یک آغوش) زاده شد؛ و چون کارِ پدر یکپارچه شد (الیشَع که او را زنده کرد، درجهٔ علیا، یهوه)، دو آغوش کامل شد. مانندِ زنِ شونَمی که شوهرش هرگز به‌راستی پدید نمی‌آید."
                : "Habakuk es ese mismo movimiento en un alma: nació solo de la madre (Elohim, Din, un abrazo); y cuando se integró la función del padre (Eliseo que lo revivió, el grado supernal, YHVH), se completaron los dos abrazos. Como en la Shunamita, donde el esposo nunca aparece del todo."}
            </p>
          </div>
        </Section>

        {/* ── SÍNTESIS ── */}
        <Section>
          <div className="mt-16 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.06] to-transparent p-8 text-center">
            <p className="hebrew mb-3 text-3xl text-gold" style={{ textShadow: dark ? "0 0 12px #c9a43e88" : "none" }}>
              שְׁנֵי פִּיּוֹת
            </p>
            <h3 className="mb-3 font-cinzel text-base font-bold text-parchment/90">
              {fa ? "همان واژه، دو لبه" : "La misma palabra, dos filos"}
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "شیگیونوت هم خطاست هم موسیقی. حَبَقّوق هم گِوورا (داوری) است هم پیامبرِ دو آغوش. خطاها، چون چون موسیقی نواخته شوند، به نبوّت بدل می‌شوند. این همان ۳۵۸ است: همان چیز، بسته به زاویه، مَشیاح است یا نَحاش."
                : "Shigyonot es a la vez error y música. Habakuk es a la vez Gevurá (juicio) y profeta del doble abrazo. Los errores, tocados como música, se vuelven profecía. Esto es el 358: lo mismo, según el ángulo, es Mashíaj o Najash."}
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { label: fa ? "زوهر بِشَلَح" : "Zohar Beshalaj", ref: "Zohar, Beshalach 1" },
                { label: fa ? "حَبَقّوق ۳" : "Habakuk 3", ref: "Habakkuk 3" },
                { label: fa ? "زنِ شونَمی · دوم پادشاهان ۴" : "Shunamita · II Reyes 4", ref: "II Kings 4" },
                { label: fa ? "شکافتنِ دریا" : "Partición del mar", ref: "Exodus 14:19" },
              ].map((t, i) => (
                <button key={i} onClick={() => router.push(`/estudio?ref=${encodeURIComponent(t.ref)}`)}
                  className="rounded-full border border-gold/25 px-4 py-1.5 font-cinzel text-xs text-gold/70 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold">
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Zohar, Beshalach 1")}&context=kabbalah`)}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
            >
              {fa ? "مطالعهٔ عمیق در جاشمال ←" : "Estudiar este misterio en Jashmal →"}
            </button>

            <div className="mt-6 flex justify-center gap-4 font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
              <Link href="/358" className="hover:text-gold">358 ↗</Link>
              <Link href="/linaje" className="hover:text-gold">{fa ? "تبار" : "Linaje"} ↗</Link>
            </div>
          </div>
        </Section>

        <div className="mt-16 border-t border-gold/10 pt-8 text-center">
          <p className="hebrew text-2xl text-gold/60">חַשְׁמַל</p>
          <p className="mt-1 font-cinzel text-xs uppercase tracking-widest text-muted/50">
            {fa ? "کابالا و فلسفهٔ یهودی" : "Cabalá & Filosofía Judía"}
          </p>
        </div>
      </main>
    </div>
  );
}
