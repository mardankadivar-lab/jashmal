"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useRouter } from "@/i18n/navigation";
import MisterioLangToggle from "@/components/MisterioLangToggle";

// ── Datos de gematría ─────────────────────────────────────────────────────────
// חנוך = חן(58) + ו(6) + ך(20) = 84. Para el desglose mostramos las tres
// "respiraciones" del nombre tal como las lee el jidush: la gracia (חן) que
// se canaliza (ו) y se vuelve palma / mano (ך).
const JANOJ = [
  { letter: "חן", name: "Jen",  nameHe: "חֵן",  value: 58 },
  { letter: "ו",  name: "Vav",  nameHe: "וָו",  value: 6  },
  { letter: "ך",  name: "Kaf",  nameHe: "כָף",  value: 20 },
];

// Milui (relleno) de cada letra de חנוך — la expansión celestial oculta (637).
const MILUI = [
  { letter: "חית", name: "Jet",  value: 418 },
  { letter: "נון", name: "Nun",  value: 106 },
  { letter: "ואו", name: "Vav",  value: 13  },
  { letter: "כף",  name: "Kaf",  value: 100 },
];

// ── Componente de gematría ────────────────────────────────────────────────────
function GematriaRow({
  letters, word, translation, total, color, delay = 0,
}: {
  letters: { letter: string; name: string; nameHe?: string; value: number }[];
  word: string; translation: string;
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
          dir="rtl": el hebreo se lee de derecha a izquierda, así la primera "respiración"
          (חן) queda a la derecha y el nombre se lee en su orden correcto. */}
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
                fontSize: "clamp(56px, 14vw, 84px)",
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

// ── Encabezado de sección hebreo ──────────────────────────────────────────────
function SectionHead({ he, es, fa, locale }: { he: string; es: string; fa: string; locale: string }) {
  return (
    <>
      <p className="hebrew mb-3 text-3xl text-gold" style={{ filter: "drop-shadow(0 0 10px rgba(201,164,62,0.5))" }}>
        {he}
      </p>
      <h2 className="mb-6 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
        {locale === "fa" ? fa : es}
      </h2>
    </>
  );
}

// ── Página principal ──────────────────────────────────────────────────────────
export default function MisterioPage() {
  const locale = useLocale();
  const router = useRouter();
  const fa = locale === "fa";

  // Forzamos SIEMPRE oscuro: las letras hebreas doradas solo se leen sobre #05050a.
  const [dark, setDark] = useState(true);
  useEffect(() => {
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

        {/* ── HERO: el nombre חנוך = 84 ─────────────────────────────────────── */}
        <div className="mb-16 text-center">
          <p className="mb-4 font-cinzel text-xs uppercase tracking-[0.4em] text-gold/50">
            {fa
              ? "مردی که با خدا راه رفت و کانال نور شد"
              : "El hombre que caminó con Dios y se volvió canal de luz"}
          </p>

          {/* El nombre */}
          <div className="relative mb-6 inline-block">
            <span
              className="hebrew font-bold"
              style={{
                fontSize: "clamp(80px, 22vw, 150px)",
                background: dark
                  ? "linear-gradient(180deg, #fff8d0 0%, #f0d060 35%, #c9a43e 70%, #a07828 100%)"
                  : "linear-gradient(180deg, #b58a2a 0%, #9a6f1c 50%, #6e4f12 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: dark ? "drop-shadow(0 0 30px rgba(201,164,62,0.5))" : "drop-shadow(0 0 6px rgba(138,109,31,0.25))",
                lineHeight: 1.1,
              }}
            >
              חֲנוֹךְ
            </span>
            <div className="pointer-events-none absolute inset-0 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(201,164,62,0.12) 0%, transparent 70%)", filter: "blur(20px)" }} />
          </div>

          {/* 84 ↔ 637 */}
          <div className="mb-6 flex items-center justify-center gap-6">
            <div className="text-center">
              <p className="font-cinzel text-5xl font-black text-gold" style={{ filter: "drop-shadow(0 0 10px rgba(201,164,62,0.6))" }}>84</p>
              <p className="mt-1 font-cinzel text-xs uppercase tracking-widest text-gold/50">{fa ? "نام بیرونی" : "El nombre"}</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="font-cinzel text-2xl text-gold/30">→</span>
              <span className="hebrew text-xs text-gold/30">{fa ? "میلوی" : "milui"}</span>
            </div>
            <div className="text-center">
              <p className="font-cinzel text-5xl font-black text-cyan-300" style={{ filter: "drop-shadow(0 0 10px rgba(120,220,230,0.5))" }}>637</p>
              <p className="mt-1 font-cinzel text-xs uppercase tracking-widest text-cyan-300/60">{fa ? "گسترهٔ پنهان" : "lo oculto"}</p>
            </div>
          </div>

          <h1 className="font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
            {fa
              ? "حَنوخ — فیضی که بالا می‌رود"
              : "Janóoj — la gracia que asciende"}
          </h1>
          <p className="mt-3 text-sm text-muted/70">
            {fa
              ? "فیض پایین می‌آید · کانال می‌شود · دست می‌گردد. روحِ تربیت‌شده، مرکبِ نور."
              : "La gracia desciende · se canaliza · se vuelve mano. El alma educada, vehículo de luz."}
          </p>
        </div>

        {/* ── Epígrafe ──────────────────────────────────────────────────────── */}
        <PullQuote
          he="וַיִּתְהַלֵּךְ חֲנוֹךְ אֶת הָאֱלֹהִים וְאֵינֶנּוּ כִּי לָקַח אֹתוֹ אֱלֹהִים"
          es="Y caminó Janóoj con Elohim; y desapareció, porque Elohim lo tomó. (Vivió 365 años — los días del año solar.)"
          fa="Y caminó Janóoj con Elohim; y desapareció, porque Elohim lo tomó. (Vivió 365 años — los días del año solar.)"
          source="Bereshit (Génesis) 5:24 · 5:23"
          locale={locale}
        />

        {/* ════════════════════════════════════════════════════════════════════
            ESTUDIO DEL SOFER — verificado / aprobado. 6 secciones.
            Idioma: español para ambos locales (trilingüe diferido; el hero/CTA
            ya cubren fa). Los PullQuote reciben el mismo texto es en `es` y `fa`.
           ════════════════════════════════════════════════════════════════════ */}

        {/* ── א · El nombre abierto ─────────────────────────────────────────── */}
        <Section>
          <SectionHead he="א · הַשֵּׁם הַנִּפְתָּח" es="El nombre abierto" fa="نامِ گشوده" locale={locale} />
        </Section>

        {/* Desglose חנוך = 84 */}
        <GematriaRow
          letters={JANOJ} word="Janóoj" translation={fa ? "حَنوخ" : "חֲנוֹךְ"}
          total={84} color="#c9a43e" delay={0}
        />

        <Section>
          <div className="space-y-5 text-sm leading-relaxed text-parchment/80">
            <p>
              <span className="hebrew text-gold/90">חֲנוֹךְ</span> = <span className="hebrew text-gold/90">חֵן</span>{" "}
              (gracia, 58) + <span className="hebrew text-gold/90">ו</span> (conexión, 6) +{" "}
              <span className="hebrew text-gold/90">ך</span> (palma, 20) = <span className="text-gold">84</span>.
            </p>
            <p>
              <span className="hebrew text-gold/90">חֵן</span>: la gracia oculta que eleva las chispas.{" "}
              <span className="hebrew text-gold/90">ו</span>: el kav, la línea que une arriba y abajo (la Torá, la línea
              media, las seis sefirot emocionales). <span className="hebrew text-gold/90">ך</span>: la palma de Maljut, el
              recipiente donde la luz se vuelve acción.
            </p>
            <p className="text-gold/80">
              La gracia desciende · se canaliza · se vuelve mano.
            </p>
          </div>
        </Section>

        {/* ── ב · חנוך / חינוך ──────────────────────────────────────────────── */}
        <Section>
          <SectionHead he="ב · חֲנוֹךְ / חִינּוּךְ" es="La misma raíz: nombre y camino" fa="یک ریشه: نام و راه" locale={locale} />
          <div className="space-y-5 text-sm leading-relaxed text-parchment/80">
            <p>
              <span className="hebrew text-gold/90">חֲנוֹךְ</span> y{" "}
              <span className="hebrew text-gold/90">חִינּוּךְ</span> comparten la misma raíz{" "}
              <span className="hebrew text-gold/90">ח־נ־ך</span>: Janóoj es también un principio —
              educación / iniciación / consagración del alma. La gracia transformada en camino, y el camino en servicio.
            </p>
          </div>
        </Section>

        {/* ── ג · El interior oculto (Sod) ──────────────────────────────────── */}
        <Section>
          <SectionHead he="ג · הַפְּנִים הַנִּסְתָּר" es="El interior oculto (Sod) — el milui" fa="درونِ پنهان (سود) — میلوی" locale={locale} />
        </Section>

        {/* Milui — la expansión celestial 637 */}
        <GematriaRow
          letters={MILUI} word="Milui" translation={fa ? "حَنوخ (پُرشده)" : "חֲנוֹךְ (relleno)"}
          total={637} color="#1fd8e0" delay={0}
        />

        <Section>
          <div className="space-y-5 text-sm leading-relaxed text-parchment/80">
            <p>
              El milui (relleno de cada letra):{" "}
              <span className="hebrew text-gold/90">חית</span> 418 · <span className="hebrew text-gold/90">נון</span> 106 ·{" "}
              <span className="hebrew text-gold/90">ואו</span> 13 · <span className="hebrew text-gold/90">כף</span> 100 ={" "}
              <span style={{ color: "#1fd8e0" }}>637</span>. El exterior humano (84) esconde una expansión celestial (637).
            </p>
            <p>
              <span className="text-gold/90">418</span> = la letra <span className="hebrew text-gold/90">ח</span>{" "}
              (&ldquo;vida&rdquo;) desplegada. <span className="text-gold/90">106</span> ={" "}
              <span className="hebrew text-gold/90">קו</span> (Kav, la línea tras el Tzimtzum).{" "}
              <span className="text-gold/90">13</span> = <span className="hebrew text-gold/90">אֶחָד</span> (unidad) ={" "}
              <span className="hebrew text-gold/90">אַהֲבָה</span> (amor). <span className="text-gold/90">100</span> =
              plenitud del recipiente.
            </p>
          </div>
        </Section>

        {/* ── ד · חנוך → מטטרון ─────────────────────────────────────────────── */}
        <Section>
          <SectionHead he="ד · חֲנוֹךְ → מֶטַטְרוֹן" es="Del iniciado al canal universal" fa="از مبتدی تا کانالِ جهانی" locale={locale} />
          <div className="space-y-5 text-sm leading-relaxed text-parchment/80">
            <p>
              El Targum Yonatan a Génesis 5:24 ya llama a Janóoj &ldquo;Metatrón, el Gran Escriba&rdquo; (
              <span className="hebrew text-gold/90">סָפְרָא רַבָּא</span>).{" "}
              <span className="hebrew text-gold/90">מֶטַטְרוֹן</span> = <span className="text-gold">314</span> ={" "}
              <span className="hebrew text-gold/90">שַׁדַּי</span> (Shaddai) — &ldquo;
              <span className="hebrew">כִּי שְׁמִי בְּקִרְבּוֹ</span>&rdquo; (&ldquo;porque Mi Nombre está en su
              interior&rdquo;, Shemot 23:21; Sanhedrín 38b). Janóoj es el iniciado; Metatrón, el canal universal.
            </p>
          </div>

          <PullQuote
            he="הִנֵּה אָנֹכִי שֹׁלֵחַ מַלְאָךְ ... כִּי שְׁמִי בְּקִרְבּוֹ"
            es="He aquí, Yo envío un ángel... porque Mi Nombre está en su interior."
            fa="He aquí, Yo envío un ángel... porque Mi Nombre está en su interior."
            source="Shemot (Éxodo) 23:21 · Sanhedrín 38b"
            locale={locale}
          />
        </Section>

        {/* ── ה · El sello (guardarraíl teológico) ──────────────────────────── */}
        <Section>
          <SectionHead he="ה · שְׁנֵי פִּיּוֹת" es="El sello: un ángel, jamás un segundo poder" fa="مُهر: فرشته، هرگز قدرتِ دوم" locale={locale} />

          {/* Guardarraíl, marcado visualmente distinto — protege la credibilidad. */}
          <div className="my-6 rounded-2xl border border-red-400/30 bg-red-500/[0.05] p-6">
            <p className="mb-3 font-cinzel text-xs uppercase tracking-widest text-red-300/70">
              {fa ? "حصارِ کلامی واجب" : "Guardarraíl teológico obligatorio"}
            </p>
            <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
              <p>
                Metatrón es <span className="text-gold/90">ángel y siervo</span>, JAMÁS un &ldquo;segundo poder&rdquo;.
                Jaguigá 15a: cuando Ajer lo vio sentado y sospechó &ldquo;dos poderes&rdquo; (
                <span className="hebrew text-gold/90">שְׁתֵּי רְשׁוּיוֹת</span>), a Metatrón lo azotaron con 60 latigazos de
                fuego — para sellar que su autoridad es prestada y subordinada al Único.
              </p>
              <p>
                La elevación de un alma humana <span className="text-gold/90">glorifica al Creador</span>; no introduce
                un segundo en Su unidad.
              </p>
            </div>
          </div>
        </Section>

        {/* ── ו · חתימה (el sello / síntesis de cierre) ─────────────────────── */}
        <Section>
          <SectionHead he="ו · חֲתִימָה" es="El sello" fa="مُهر (پایان)" locale={locale} />
          <div className="space-y-5 text-sm leading-relaxed text-parchment/80">
            <p>
              El verdadero misterio es el <span className="hebrew text-gold/90">חֵן</span> inicial. La gracia abre la
              puerta (<span className="hebrew text-gold/90">חן</span>) · la Torá construye el canal (
              <span className="hebrew text-gold/90">ו</span>) · la mano la vuelve acción (
              <span className="hebrew text-gold/90">ך</span>) · el alma educada (
              <span className="hebrew text-gold/90">חינוך</span>) se transfigura en vehículo de luz (
              <span className="hebrew text-gold/90">מטטרון</span>).
            </p>
            <p>
              Y el camino tiene música:
            </p>
          </div>

          {/* La música del camino: חן → קול → ניגון */}
          <div className="my-8 flex flex-wrap items-center justify-center gap-3 sm:gap-5" dir="rtl">
            {[
              { he: "חֵן", es: "Jen", n: 58 },
              { he: "קוֹל", es: "Kol", n: 136 },
              { he: "נִיגּוּן", es: "Nigún", n: 119 },
            ].map((s, i, arr) => (
              <div key={i} className="flex items-center gap-3 sm:gap-5">
                <div className="flex flex-col items-center rounded-2xl border-2 border-gold/40 px-5 py-4"
                     style={{ background: "rgba(14,12,22,0.96)", boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}>
                  <span className="hebrew text-3xl font-bold" style={{ color: "#fff6e0", textShadow: "0 0 14px #c9a43e" }}>{s.he}</span>
                  <span className="mt-1 font-cinzel text-[10px] uppercase tracking-widest text-parchment/70">{s.es}</span>
                  <span className="mt-1 font-cinzel text-xl font-black text-gold">{s.n}</span>
                </div>
                {i < arr.length - 1 && <span className="font-cinzel text-2xl text-gold/40">→</span>}
              </div>
            ))}
          </div>

          <Section>
            <div className="space-y-5 text-sm leading-relaxed text-parchment/80">
              <p>
                La gracia (58) se hace voz (136) y la voz se hace melodía (119): lo que comenzó callado en el caminar de
                Janóoj termina cantando. Nunca caminó solo; caminó <span className="hebrew text-gold/90">אֶת הָאֱלֹהִים</span>,
                con Dios.
              </p>
            </div>
          </Section>
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
                { label: fa ? "حَنوخ" : "Janóoj", ref: "Genesis 5:24" },
                { label: fa ? "مِطَطرون" : "Metatrón", ref: "Sanhedrin 38b" },
                { label: fa ? "تَرگوم یوناتان" : "Targum Yonatan", ref: "Targum Jonathan on Genesis 5:24" },
                { label: fa ? "شَدّای ۳۱۴" : "Shaddai · 314", ref: "Exodus 23:21" },
                { label: fa ? "حَگیگا ۱۵a" : "Jaguigá 15a", ref: "Chagigah 15a" },
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
              onClick={() => router.push("/estudio?ref=Genesis%205%3A24&context=kabbalah")}
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
