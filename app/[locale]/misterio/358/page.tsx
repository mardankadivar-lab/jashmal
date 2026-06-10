"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useRouter } from "@/i18n/navigation";
import MisterioLangToggle from "@/components/MisterioLangToggle";

// ── Datos de gematría ─────────────────────────────────────────────────────────
const MASHIAJ = [
  { letter: "מ", name: "Mem",  nameHe: "מֵם",  value: 40 },
  { letter: "ש", name: "Shin", nameHe: "שִׁין", value: 300 },
  { letter: "י", name: "Yod",  nameHe: "יוֹד",  value: 10 },
  { letter: "ח", name: "Jet",  nameHe: "חֵית",  value: 8 },
];

const NAJASH = [
  { letter: "נ", name: "Nun",  nameHe: "נוּן",  value: 50 },
  { letter: "ח", name: "Jet",  nameHe: "חֵית",  value: 8 },
  { letter: "ש", name: "Shin", nameHe: "שִׁין", value: 300 },
];

// ── Componente de gematría ────────────────────────────────────────────────────
function GematriaRow({
  letters, word, translation, total, color, delay = 0
}: {
  letters: typeof MASHIAJ; word: string; translation: string;
  total: number; color: string; delay?: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="mb-10">
      {/* Nombre de la palabra */}
      <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span
          className="hebrew text-4xl font-bold"
          style={{ color: "#fdf4dd", textShadow: `0 0 16px ${color}, 0 0 4px ${color}` }}
        >
          {letters.map(l => l.letter).join("")}
        </span>
        <span className="font-cinzel text-lg tracking-widest" style={{ color }}>{word}</span>
        <span className="text-parchment/60 text-sm italic">{translation}</span>
      </div>

      {/* Letras con valores — tiles oscuros auto-contenidos (legibles en cualquier tema).
          dir="rtl": el hebreo se lee de derecha a izquierda, así la primera letra
          (מ / נ) queda a la derecha y la palabra se lee en su orden correcto. */}
      <div className="flex flex-wrap items-end gap-2.5 mb-4 sm:gap-3" dir="rtl">
        {letters.map((l, i) => (
          <div
            key={i}
            className="flex flex-col items-center rounded-2xl border-2 px-4 py-4 transition-all duration-700 sm:px-5 sm:py-5"
            style={{
              borderColor: visible ? `${color}99` : "transparent",
              background: visible ? "rgba(14,12,22,0.96)" : "transparent",
              boxShadow: visible ? `0 0 24px ${color}33` : "none",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: `${delay + i * 120}ms`,
            }}
          >
            <span
              className="hebrew font-bold leading-none"
              style={{
                fontSize: "clamp(72px, 17vw, 92px)",
                color: "#fff6e0",
                textShadow: `0 0 22px ${color}, 0 0 8px ${color}, 0 0 2px ${color}`,
              }}
            >
              {l.letter}
            </span>
            <span className="mt-2.5 font-cinzel text-xs uppercase tracking-widest text-parchment/70">{l.name}</span>
            <span className="mt-1 font-cinzel text-2xl font-black" style={{ color, textShadow: `0 0 10px ${color}` }}>+{l.value}</span>
          </div>
        ))}

        {/* Igual */}
        <div className="flex flex-col items-center self-center px-1">
          <span className="text-4xl font-bold" style={{ color: `${color}99` }}>=</span>
        </div>

        {/* Total */}
        <div
          className="flex flex-col items-center self-center rounded-2xl border-2 px-6 py-5 transition-all duration-700"
          style={{
            borderColor: color,
            background: "rgba(14,12,22,0.96)",
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(0.8)",
            transitionDelay: `${delay + letters.length * 120 + 200}ms`,
            boxShadow: `0 0 28px ${color}55`,
          }}
        >
          <span className="font-cinzel font-black" style={{ fontSize: "clamp(48px, 12vw, 64px)", color, filter: `drop-shadow(0 0 10px ${color})` }}>
            {total}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Componente de cita ────────────────────────────────────────────────────────
function PullQuote({ he, es, fa, source, locale }: { he: string; es: string; fa: string; source: string; locale: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="my-12 rounded-2xl border border-gold/20 bg-gold/[0.04] p-6 transition-all duration-1000"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)" }}
    >
      <p className="hebrew mb-4 text-right text-lg leading-relaxed text-gold/80">{he}</p>
      <p className="mb-1 text-sm italic leading-relaxed text-parchment/70"
         dir={locale === "fa" ? "rtl" : "ltr"}>
        {locale === "fa" ? `"${fa}"` : `"${es}"`}
      </p>
      <p className="font-cinzel text-[10px] uppercase tracking-widest text-gold/40">— {source}</p>
    </div>
  );
}

// ── Sección de texto ──────────────────────────────────────────────────────────
function Section({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.15 });
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

// ── Página principal ──────────────────────────────────────────────────────────
export default function MisterioPage() {
  const locale = useLocale();
  const router = useRouter();
  const fa = locale === "fa";

  // Tema claro/oscuro propio de la landing (sincronizado con el global).
  const [dark, setDark] = useState(true);
  useEffect(() => {
    // Forzamos SIEMPRE oscuro: las letras hebreas doradas solo se leen sobre #05050a.
    document.documentElement.classList.add("dark");
    setDark(true);
  }, []);

  const bg = dark ? "#05050a" : "#f1ebdd";
  const navBg = dark ? "rgba(5,5,10,0.9)" : "rgba(241,235,221,0.9)";

  return (
    <div
      className={`${dark ? "always-dark" : ""} min-h-screen`}
      style={{ background: bg }}
      dir={fa ? "rtl" : "ltr"}
    >

      {/* Nav mínima */}
      <nav className="sticky top-0 z-40 border-b border-gold/10 px-5 py-3 backdrop-blur-md" style={{ background: navBg }}>
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link href="/" className="font-cinzel text-sm text-gold/70 hover:text-gold">
            חַשְׁמַל · Jashmal
          </Link>
          <div className="flex items-center gap-3">
            <MisterioLangToggle />
            <button
              onClick={() => router.push("/estudio")}
              className="rounded-full border border-gold/30 px-4 py-1.5 font-cinzel text-xs uppercase tracking-widest text-gold transition-all hover:border-gold hover:bg-gold/10"
            >
              {fa ? "شروع مطالعه" : "Comenzar estudio →"}
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-2xl px-5 pb-24 pt-16">

        {/* ── HERO: el número 358 ───────────────────────────────────────────── */}
        <div className="mb-16 text-center">
          <p className="mb-4 font-cinzel text-xs uppercase tracking-[0.4em] text-gold/50">
            {fa ? "رازی که زوهر ۸۰۰ سال پیش فاش کرد" : "El secreto que el Zohar reveló hace 800 años"}
          </p>

          {/* El número */}
          <div className="relative mb-6 inline-block">
            <span
              className="font-cinzel font-black"
              style={{
                fontSize: "clamp(100px, 28vw, 180px)",
                background: dark
                  ? "linear-gradient(180deg, #fff8d0 0%, #f0d060 35%, #c9a43e 70%, #a07828 100%)"
                  : "linear-gradient(180deg, #b58a2a 0%, #9a6f1c 50%, #6e4f12 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: dark ? "drop-shadow(0 0 30px rgba(201,164,62,0.5))" : "drop-shadow(0 0 6px rgba(138,109,31,0.25))",
                lineHeight: 1,
              }}
            >
              358
            </span>
            <div className="pointer-events-none absolute inset-0 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(201,164,62,0.12) 0%, transparent 70%)", filter: "blur(20px)" }} />
          </div>

          {/* Las dos palabras */}
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="text-center">
              <p className="hebrew text-5xl font-bold text-gold" style={{ filter: "drop-shadow(0 0 10px rgba(201,164,62,0.6))" }}>מָשִׁיחַ</p>
              <p className="mt-1 font-cinzel text-xs uppercase tracking-widest text-gold/50">Mashíaj</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="font-cinzel text-2xl text-gold/30">=</span>
              <span className="font-cinzel text-xs text-gold/30">358</span>
            </div>
            <div className="text-center">
              <p className="hebrew text-5xl font-bold text-red-400" style={{ filter: "drop-shadow(0 0 10px rgba(220,80,80,0.5))" }}>נָחָשׁ</p>
              <p className="mt-1 font-cinzel text-xs uppercase tracking-widest text-red-400/60">Najash</p>
            </div>
          </div>

          <h1 className="font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
            {fa
              ? "مَشیاح و نَحاش — یک عدد، دو واقعیت"
              : "El Mesías y la Serpiente tienen el mismo número"}
          </h1>
          <p className="mt-3 text-sm text-muted/70">
            {fa
              ? "این تصادف نیست. کابالا ۸۰۰ سال است که این راز را می‌داند."
              : "Esto no es coincidencia. La Cabalá lo sabe desde hace 800 años."}
          </p>
        </div>

        {/* ── GEMATRÍA EXPLICADA ────────────────────────────────────────────── */}
        <Section>
          <h2 className="mb-6 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "گیماتریا — ارزش عددی حروف" : "Gematría — el código numérico del hebreo"}
          </h2>
          <p className="mb-8 text-sm leading-relaxed text-parchment/75">
            {fa
              ? "در زبان عبری، هر حرف یک ارزش عددی دارد. این سیستم را گیماتریا می‌نامند و کابالیست‌ها از آن برای کشف ارتباطات پنهان در متون مقدس استفاده می‌کنند."
              : "En hebreo, cada letra tiene un valor numérico. A este sistema se le llama Gematría, y los cabalistas lo usan para descubrir conexiones ocultas en los textos sagrados."}
          </p>
        </Section>

        {/* Cálculo Mashíaj */}
        <GematriaRow
          letters={MASHIAJ} word="Mashíaj" translation={fa ? "مسیح" : "El Mesías"}
          total={358} color="#c9a43e" delay={0}
        />

        {/* Cálculo Najash */}
        <GematriaRow
          letters={NAJASH} word="Najash" translation={fa ? "مار" : "La Serpiente"}
          total={358} color="#e05050" delay={200}
        />

        {/* El momento de shock */}
        <Section delay={100}>
          <div className="my-10 rounded-2xl border border-gold/30 bg-gold/[0.06] p-6 text-center">
            <p className="font-cinzel text-lg font-bold text-gold">
              {fa ? "۳۵۸ = ۳۵۸" : "358 = 358"}
            </p>
            <p className="mt-2 text-sm text-parchment/70">
              {fa
                ? "همان عدد. تصادف؟ کابالا می‌گوید نه."
                : "El mismo número. ¿Coincidencia? La Cabalá dice que no."}
            </p>
          </div>
        </Section>

        {/* ════════════════════════════════════════════════════════════════════
            ESTUDIO DEL SOFER — verificado en Sefaria. 5 secciones (PaRDeS).
            Idioma: español para ambos locales (trilingüe diferido; el hero/CTA
            ya cubren fa). Los PullQuote reciben el mismo texto es en `es` y `fa`.
           ════════════════════════════════════════════════════════════════════ */}

        {/* ── 1. תַּרְגּוּם — El versículo raíz ──────────────────────────────── */}
        <Section>
          <p className="hebrew mb-3 text-3xl text-gold" style={{ filter: "drop-shadow(0 0 10px rgba(201,164,62,0.5))" }}>
            תַּרְגּוּם
          </p>
          <h2 className="mb-6 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            El versículo raíz
          </h2>

          <div className="space-y-5 text-sm leading-relaxed text-parchment/80">
            <p>
              Todo nace del nombre del proyecto. Jashmal (<span className="hebrew text-gold/90">חַשְׁמַל</span>) aparece
              una sola vez, en el corazón de la visión de Yejezkel junto al río Kevar.
            </p>
          </div>

          <PullQuote
            he="וּמִתּוֹכָהּ כְּעֵין הַחַשְׁמַל מִתּוֹךְ הָאֵשׁ"
            es="Y de en medio de él, como el aspecto del jashmal, de en medio del fuego."
            fa="Y de en medio de él, como el aspecto del jashmal, de en medio del fuego."
            source="Yejezkel (Ezequiel) 1:4"
            locale={locale}
          />

          <div className="space-y-5 text-sm leading-relaxed text-parchment/80">
            <p>
              La palabra <span className="hebrew text-gold/90">חַשְׁמַל</span> no se traduce: se contempla. Los Sabios
              la descompusieron en dos respiros: <span className="hebrew text-gold/90">חַשׁ</span> (jash, silencio /
              callar) y <span className="hebrew text-gold/90">מַל</span> (mal, habla / discurso). El jashmal es la
              frontera donde lo que calla y lo que habla son una sola luz. Ese es el latido del proyecto: el silencio
              que comienza a hablar.
            </p>
          </div>
        </Section>

        {/* ── 2. מְפָרְשִׁים — Los comentaristas sobre el jashmal ────────────── */}
        <Section>
          <p className="hebrew mb-3 text-3xl text-gold" style={{ filter: "drop-shadow(0 0 10px rgba(201,164,62,0.5))" }}>
            מְפָרְשִׁים
          </p>
          <h2 className="mb-6 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            Los comentaristas sobre el jashmal
          </h2>

          <div className="space-y-5 text-sm leading-relaxed text-parchment/80">
            <p>
              El jashmal es uno de los pasos más vigilados de la Torá. El Talmud (Jaguigá 13b) prohíbe enseñar la Obra
              de la Carroza salvo al sabio que entiende solo, y narra al niño que comprendió el jashmal y &ldquo;salió
              fuego y lo consumió&rdquo;. Allí el Talmud da el notarikón:{" "}
              <span className="hebrew text-gold/90">חַיּוֹת אֵשׁ מְמַלְּלוֹת</span> (&ldquo;jayot de fuego que
              hablan&rdquo;), y enseña que a veces <span className="hebrew text-gold/90">חָשׁוֹת</span> (callan) y a
              veces <span className="hebrew text-gold/90">מְמַלְּלוֹת</span> (hablan), según el flujo de lo Alto.
            </p>
            <p className="text-xs italic text-parchment/55">
              Precisión: el notarikón son 3 palabras —jayot esh memallelot—; el par jashot / memallelot es la
              enseñanza sobre su ritmo. No se mezclan.
            </p>

            <p>
              <span className="font-cinzel text-gold/80">Rashi:</span> el jashmal son ángeles de fuego que hablan; su
              naturaleza es el ritmo entre callar y hablar.
            </p>
            <p>
              <span className="font-cinzel text-gold/80">Ramban</span> (cabalista): el jashmal es un velo de la luz
              superior; lo &ldquo;como el aspecto de&rdquo; (<span className="hebrew text-gold/90">כְּעֵין</span>) nunca
              es la cosa misma sino su semejanza tolerable — frontera, no destino.
            </p>
            <p>
              <span className="font-cinzel text-gold/80">Ibn Ezra:</span> protege el misterio con la gramática del
              asombro; el profeta dice &ldquo;como el aspecto del jashmal&rdquo;, confesando el límite del lenguaje.
            </p>
            <p>
              <span className="font-cinzel text-gold/80">Abarbanel:</span> la visión llega en el exilio, junto al río
              Kevar, &ldquo;del norte&rdquo; (la severidad); señal de que la Presencia acompaña a Israel incluso fuera
              de la Tierra, incluso en el silencio del destierro.
            </p>
            <p>
              <span className="font-cinzel text-gold/80">Malbim:</span> cada elemento (viento, nube, fuego, resplandor,
              jashmal) es un grado del ascenso profético; el jashmal es el último velo antes del Habla: el silencio ya
              cargado de discurso, jash a punto de volverse mal.
            </p>
          </div>
        </Section>

        {/* ── 3. פרד״ס — Las cuatro entradas ────────────────────────────────── */}
        <Section>
          <p className="hebrew mb-3 text-3xl text-gold" style={{ filter: "drop-shadow(0 0 10px rgba(201,164,62,0.5))" }}>
            פרד״ס
          </p>
          <h2 className="mb-6 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            Las cuatro entradas
          </h2>

          <div className="space-y-5 text-sm leading-relaxed text-parchment/80">
            <p>
              <span className="font-cinzel text-gold/80">Pshat:</span> el jashmal es el fulgor central de la visión de
              Yejezkel (ángeles que callan y hablan, Jaguigá 13b). La serpiente,{" "}
              <span className="hebrew text-gold/90">נָחָשׁ</span>, es la criatura del versículo:
            </p>
          </div>

          <PullQuote
            he="וְהַנָּחָשׁ הָיָה עָרוּם מִכֹּל חַיַּת הַשָּׂדֶה"
            es="Y la serpiente era la más astuta de todos los animales del campo."
            fa="Y la serpiente era la más astuta de todos los animales del campo."
            source="Bereshit (Génesis) 3:1"
            locale={locale}
          />

          <div className="space-y-5 text-sm leading-relaxed text-parchment/80">
            <p>la voz que introduce la duda y la separación.</p>

            <p>
              <span className="font-cinzel text-gold/80">Remez:</span> la guematría abre la puerta.{" "}
              <span className="hebrew text-gold/90">נָחָשׁ</span> = 50+8+300 = 358;{" "}
              <span className="hebrew text-gold/90">מָשִׁיחַ</span> = 40+300+10+8 = 358. La serpiente y el Mesías
              comparten 358. Pero el jidush mira el NÚCLEO: ambas esconden{" "}
              <span className="hebrew text-gold/90">חַשׁ</span> (=308).{" "}
              <span className="hebrew text-gold/90">נָחָשׁ</span> = <span className="hebrew text-gold/90">נ</span>(50)+
              <span className="hebrew text-gold/90">חשׁ</span>; <span className="hebrew text-gold/90">מָשִׁיחַ</span> ={" "}
              <span className="hebrew text-gold/90">חשׁ</span>+<span className="hebrew text-gold/90">מי</span>
              (40+10=50). Están construidas sobre el MISMO silencio (<span className="hebrew text-gold/90">חש</span>),
              y se diferencian por cómo nombran al 50: en Najash es{" "}
              <span className="hebrew text-gold/90">נ</span> (Nun, la nefilá / caída); en Mashíaj es{" "}
              <span className="hebrew text-gold/90">מי</span> (Mem-Yod=50 = &ldquo;¿Quién?&rdquo; = Biná).
            </p>
            <p className="text-xs italic text-parchment/55">
              Aviso: <span className="hebrew">מי</span>=50 ≠ <span className="hebrew">מל</span>=70. No se cruzan.
            </p>
          </div>

          {/* Drash — jidush de Mardan, marcado visualmente distinto */}
          <div className="my-8 space-y-3 border-s-2 border-gold/30 ps-4">
            <p className="text-xs italic text-gold/50">
              Jidush de Mardan — lectura propia, no cita clásica
            </p>
            <p className="text-sm leading-relaxed text-parchment/80">
              <span className="font-cinzel text-gold/80">Drash:</span> la serpiente y el Mesías son la misma estructura
              leída de dos maneras; ambos hechos del mismo silencio. La serpiente lee en el silencio una{" "}
              <span className="hebrew text-gold/90">נ</span>: caída, abandono (&ldquo;estás solo, Dios calló porque te
              dejó&rdquo; — el primer susurro del jardín). El Mesías lee el MISMO silencio como{" "}
              <span className="hebrew text-gold/90">מי</span>, la pregunta de Biná: el silencio no es ausencia, es una
              Presencia tan alta que aún no tiene palabras.
            </p>
          </div>

          <div className="space-y-5 text-sm leading-relaxed text-parchment/80">
            <p>
              <span className="font-cinzel text-gold/80">Sod</span> (con Baal HaSulam):{" "}
              <span className="hebrew text-gold/90">מי</span> = Biná en el Zohar. El Zohar, en su Hakdamá, lee:
            </p>
          </div>

          <PullQuote
            he="שְׂאוּ מָרוֹם עֵינֵיכֶם וּרְאוּ מִי בָרָא אֵלֶּה"
            es="Alzad a lo alto vuestros ojos y ved: ¿Quién (Mi) creó estos (Ele)?"
            fa="Alzad a lo alto vuestros ojos y ved: ¿Quién (Mi) creó estos (Ele)?"
            source="Yeshayahu (Isaías) 40:26"
            locale={locale}
          />

          <div className="space-y-5 text-sm leading-relaxed text-parchment/80">
            <p>
              <span className="hebrew text-gold/90">מי</span> (la pregunta oculta, Biná) +{" "}
              <span className="hebrew text-gold/90">אלה</span> (lo manifiesto) ={" "}
              <span className="hebrew text-gold/90">אלהים</span> (Elohim) — la Divinidad es la unión de la Pregunta
              oculta con la Respuesta revelada (Zohar, Hakdamá 3:7 y 5:21, comentario del Sulam de Baal HaSulam). Que
              el &ldquo;50&rdquo; del Mashíaj sea precisamente <span className="hebrew text-gold/90">מי</span> lo
              enlaza con la primera palabra esotérica del Zohar.
            </p>
            <p>
              Según Baal HaSulam (sobre el Etz Jaim del Arí): el primer acto fue el Tzimtzum, el retiro de la Luz que
              dejó el Jalal (espacio vacío) — el silencio original. La serpiente lee el Jalal como ausencia real (la{" "}
              <span className="hebrew text-gold/90">נ</span> de nefilá, caída dentro del Tzimtzum tomado como abandono).
              El Mashíaj introduce la conciencia de Biná (<span className="hebrew text-gold/90">מי</span>): el Tzimtzum
              no es desaparición sino ocultamiento; dentro del Jalal la Luz sigue, velada. Eso es la hamtaká
              (endulzamiento): el mismo silencio se revela como Presencia oculta.
            </p>
            <p className="text-xs italic text-parchment/55">
              Nota: la hamtaká es doctrina luriana-jasídica general, sin folio puntual; el Tzimtzum / Jalal sí son del
              Etz Jaim del Arí.
            </p>
          </div>
        </Section>

        {/* ── 4. חֲסִידוּת — El silencio como prueba de fe ──────────────────── */}
        <Section>
          <p className="hebrew mb-3 text-3xl text-gold" style={{ filter: "drop-shadow(0 0 10px rgba(201,164,62,0.5))" }}>
            חֲסִידוּת
          </p>
          <h2 className="mb-6 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            El silencio como prueba de fe (Baal Shem Tov)
          </h2>

          <div className="space-y-5 text-sm leading-relaxed text-parchment/80">
            <p>
              El Baal Shem Tov enseñó sobre la hester panim (el ocultamiento del Rostro): el escondite mismo es
              cercanía — solo se esconde quien está presente. El vacío no prueba ausencia; es la prueba más alta de la
              fe. El silencio de Dios es invitación al devekut en el vacío.
            </p>
            <p>
              El alma en sequía está parada en el Jalal y tiene las dos lecturas del 358: oír a la serpiente
              (&ldquo;estás solo&rdquo;), la nefilá; o hacer el trabajo del Mashíaj dentro de sí, la hamtakat hadinim,
              reconociendo que el silencio es <span className="hebrew text-gold/90">מי</span>, Presencia oculta — el
              alma que se creía sola y descubre que nunca lo estuvo.
            </p>
            <p>
              Ese es el Tikún del Silencio: no llenar el vacío de ruido, sino escucharlo de nuevo hasta que el callar
              revele que era habla contenida.
            </p>
          </div>
        </Section>

        {/* ── 5. הִתְבּוֹנְנוּת — Síntesis: nunca estuviste solo ─────────────── */}
        <Section>
          <p className="hebrew mb-3 text-3xl text-gold" style={{ filter: "drop-shadow(0 0 10px rgba(201,164,62,0.5))" }}>
            הִתְבּוֹנְנוּת
          </p>
          <h2 className="mb-6 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            Síntesis: nunca estuviste solo
          </h2>

          <div className="space-y-5 text-sm leading-relaxed text-parchment/80">
            <p>
              Hay un solo silencio. La diferencia entre la serpiente y el Mesías no está en el silencio, sino en cómo
              lo lees. <span className="hebrew text-gold/90">נָחָשׁ</span> y{" "}
              <span className="hebrew text-gold/90">מָשִׁיחַ</span> valen 358 y guardan el mismo corazón,{" "}
              <span className="hebrew text-gold/90">חַשׁ</span>. La serpiente le añade{" "}
              <span className="hebrew text-gold/90">נ</span> y lo lee como caída; el Mesías le añade{" "}
              <span className="hebrew text-gold/90">מי</span> (la pregunta de Biná) y lee el mismo silencio como
              Presencia oculta.
            </p>
            <p>
              De Najash a Mashíaj no se cambia de mundo: se reinterpreta el mismo silencio, se endulza (hamtaká) lo que
              parecía abandono hasta revelarse cercanía. Es lo que late en el nombre del proyecto:{" "}
              <span className="hebrew text-gold/90">חַשְׁמַל</span>, jash (silencio) que se vuelve mal (habla). El
              silencio no se borra; aprende a hablar. Y cuando aprende, dice la frase con que Israel cierra Yom Kipur
              en la Neilá:
            </p>
          </div>

          <PullQuote
            he="ה' הוּא הָאֱלֹהִים"
            es="El Eterno, Él es Elohim."
            fa="El Eterno, Él es Elohim."
            source="Melajim I (Reyes I) 18:39"
            locale={locale}
          />

          <div className="space-y-5 text-sm leading-relaxed text-parchment/80">
            <p>
              El YHVH que se revela y el Elohim que se oculta son una sola realidad, como proclama el Shemá:
            </p>
          </div>

          <PullQuote
            he="ה' אֱלֹהֵינוּ ה' אֶחָד"
            es="El Eterno nuestro Dios, el Eterno es Uno."
            fa="El Eterno nuestro Dios, el Eterno es Uno."
            source="Devarim (Deuteronomio) 6:4"
            locale={locale}
          />

          <div className="space-y-5 text-sm leading-relaxed text-parchment/80">
            <p>
              El mensaje, sencillo y estremecedor: el silencio que tomaste por abandono era Presencia que aún no tenía
              palabras. Nunca estuviste solo.
            </p>
          </div>
        </Section>

        {/* ── SECCIÓN DE PROFUNDIZACIÓN ────────────────────────────────────── */}
        <Section delay={100}>
          <div className="mt-16 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.06] to-transparent p-8 text-center">
            <p className="hebrew mb-3 text-3xl text-gold" style={{ filter: "drop-shadow(0 0 10px rgba(201,164,62,0.5))" }}>
              פַּרְדֵּ"ס
            </p>
            <h3 className="mb-3 font-cinzel text-base font-bold text-parchment/90">
              {fa ? "این ابتدای راه است" : "Esto es solo el inicio"}
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-muted/70">
              {fa
                ? "جاشمال یک ابزار مطالعهٔ تعاملی است. هر متن مقدس را انتخاب کنید و Claude — با روش پردِس (پِشِط، رِمِز، دِراش، سود) — آن را برای شما تحلیل می‌کند."
                : "Jashmal es un motor de estudio interactivo. Elige cualquier texto sagrado y Claude — usando el método PaRDeS (Pshat, Remez, Drash, Sod) — lo analiza en profundidad. Con comentaristas clásicos: Rashi, Ramban, Zohar, Baal HaSulam."}
            </p>

            {/* Temas relacionados */}
            <div className="mb-8 flex flex-wrap justify-center gap-2">
              {[
                { label: fa ? "گیماتریا" : "Gematría", ref: "Sefer Etz Chaim 1" },
                { label: fa ? "مَشیاح" : "Mashíaj", ref: "Zohar, Balak 1" },
                { label: fa ? "نَحاش" : "Najash", ref: "Zohar, Bereshit 1" },
                { label: fa ? "زوهر" : "Zohar · Bereshit", ref: "Zohar, Bereshit 1" },
                { label: fa ? "تیقون" : "Tikún", ref: "Sefer Etz Chaim 1" },
              ].map((t, i) => (
                <button
                  key={i}
                  onClick={() => router.push(`/estudio?ref=${encodeURIComponent(t.ref)}`)}
                  className="rounded-full border border-gold/25 px-4 py-1.5 font-cinzel text-xs text-gold/70 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold"
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* CTA principal */}
            <button
              onClick={() => router.push("/estudio?ref=Zohar%2C%20Balak%201&context=kabbalah")}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
            >
              {fa ? "مطالعهٔ عمیق در جاشمال ←" : "Estudiar este misterio en Jashmal →"}
            </button>

            <p className="mt-4 font-cinzel text-[10px] uppercase tracking-widest text-muted/40">
              jashmal.org · {fa ? "رایگان" : "Gratuito"}
            </p>
          </div>
        </Section>

        {/* ── FOOTER ───────────────────────────────────────────────────────── */}
        <div className="mt-16 border-t border-gold/10 pt-8 text-center">
          <p className="hebrew text-2xl text-gold/60">חַשְׁמַל</p>
          <p className="mt-1 font-cinzel text-xs uppercase tracking-widest text-muted/40">
            {fa ? "کابالا و فلسفهٔ یهودی" : "Cabalá & Filosofía Judía"}
          </p>
        </div>

      </main>
    </div>
  );
}
