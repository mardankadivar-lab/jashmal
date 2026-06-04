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

        {/* ── LO QUE DICE EL ZOHAR ─────────────────────────────────────────── */}
        <Section>
          <h2 className="mb-4 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "زوهر چه می‌گوید؟" : "¿Qué dice el Zohar?"}
          </h2>
        </Section>

        <PullQuote
          he="נָחָשׁ בְּגִימַטְרִיָּא מָשִׁיחַ — וְכֵן צֵרֶף הַדָּבָר"
          es="Najash en Gematría equivale a Mashíaj — y así se conecta la cosa"
          fa="نَحاش در گیماتریا برابر مَشیاح است — و بدین‌گونه این امر به هم پیوند می‌خورد"
          source="Zohar Jadash, Balak"
          locale={locale}
        />

        {/* ── LA EXPLICACIÓN CABALÍSTICA ───────────────────────────────────── */}
        <Section>
          <h2 className="mb-6 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "معنای عمیق‌تر" : "El significado profundo"}
          </h2>

          <div className="space-y-5 text-sm leading-relaxed text-parchment/80">
            <p>
              {fa
                ? "در کابالا، تصادف وجود ندارد — به‌ویژه در زبان عبری که هر حرف آن مقدس است. برابری عددی دو واژه نشان‌دهندهٔ پیوند معنوی عمیق میان آن‌هاست."
                : "En Cabalá no existen las coincidencias — especialmente en hebreo, donde cada letra es sagrada. Dos palabras con el mismo valor numérico comparten una raíz espiritual."}
            </p>
            <p>
              {fa
                ? "مار، نیروی آشفتگی، تاریکی و نفس‌الاماره را نمایندگی می‌کند. مَشیاح، نیروی ترمیم، روشنایی و تعالی است. اما هر دو از همان منبع انرژی تغذیه می‌کنند — تفاوت در جهت است."
                : "La serpiente representa la fuerza del caos, la oscuridad, el instinto sin dirección. El Mesías representa la fuerza de la rectificación, la luz, la elevación. Pero ambos operan con la misma energía primordial — la diferencia está en la dirección."}
            </p>
            <p>
              {fa
                ? "زوهر می‌گوید: مَشیاح کسی نیست که تاریکی را نابود کند، بلکه کسی است که آن را دگرگون می‌سازد. مار باید به نیروی شفابخش تبدیل شود — همان‌طور که موسی مار برنجین را در بیابان برافراشت."
                : "El Zohar enseña: el Mesías no viene a destruir la oscuridad, sino a transformarla. La misma energía que produce el caos, dirigida hacia arriba, produce la redención. La serpiente debe ser elevada — como hizo Moisés con la serpiente de bronce en el desierto."}
            </p>
            <p>
              {fa
                ? "بالِ حاسولام (رب یهودا لایب آشلاگ) می‌گوید: در زمان تیقون (ترمیم)، نیروهای ظلمت به نور تبدیل خواهند شد. ۳۵۸ یعنی: آنچه باید تغییر کند و آنچه تغییر می‌دهد یک ریشه دارند."
                : "El Baal HaSulam (Rav Yehuda Ashlag) enseña: en el tiempo del Tikún, las fuerzas del caos se transformarán en luz. El 358 revela que el rectificador y lo que necesita rectificación comparten la misma raíz — son el mismo poder, aplicado en direcciones opuestas."}
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
                { label: fa ? "گیماتریا" : "Gematría", ref: "Sefer Etz Chaim, Gate 1" },
                { label: fa ? "مَشیاح" : "Mashíaj", ref: "Zohar, Balak 1" },
                { label: fa ? "نَحاش" : "Najash", ref: "Zohar, Bereshit 1" },
                { label: fa ? "زوهر" : "Zohar · Bereshit", ref: "Zohar, Bereshit 1" },
                { label: fa ? "تیقون" : "Tikún", ref: "Sefer Etz Chaim, Gate 1" },
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
