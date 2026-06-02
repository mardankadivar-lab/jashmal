"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useRouter } from "@/i18n/navigation";

// ── Datos de gematría ─────────────────────────────────────────────────────────
const EJAD = [
  { letter: "א", name: "Álef",  nameHe: "אָלֶף", value: 1  },
  { letter: "ח", name: "Jet",   nameHe: "חֵית",  value: 8  },
  { letter: "ד", name: "Dálet", nameHe: "דָּלֶת", value: 4  },
];

const AHAVA = [
  { letter: "א", name: "Álef",  nameHe: "אָלֶף", value: 1  },
  { letter: "ה", name: "He",    nameHe: "הֵא",   value: 5  },
  { letter: "ב", name: "Bet",   nameHe: "בֵּית",  value: 2  },
  { letter: "ה", name: "He",    nameHe: "הֵא",   value: 5  },
];

const YHVH = [
  { letter: "י", name: "Yud",  nameHe: "יוֹד",  value: 10 },
  { letter: "ה", name: "He",   nameHe: "הֵא",   value: 5  },
  { letter: "ו", name: "Vav",  nameHe: "וָו",   value: 6  },
  { letter: "ה", name: "He",   nameHe: "הֵא",   value: 5  },
];

// ── Componente de gematría ────────────────────────────────────────────────────
function GematriaRow({
  letters, word, translation, total, color, delay = 0, rtl = true,
}: {
  letters: typeof EJAD; word: string; translation: string;
  total: number; color: string; delay?: number; rtl?: boolean;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Las letras hebreas se muestran de derecha a izquierda
  const displayLetters = rtl ? [...letters].reverse() : letters;

  return (
    <div ref={ref} className="mb-10">
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

      <div className="flex flex-wrap items-end gap-2 mb-4 sm:gap-3" dir="rtl">
        {displayLetters.map((l, i) => (
          <div
            key={i}
            className="flex flex-col items-center rounded-xl border px-3 py-2.5 transition-all duration-700 sm:px-4 sm:py-3"
            style={{
              borderColor: visible ? `${color}66` : "transparent",
              background: visible ? `${color}12` : "transparent",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: `${delay + i * 120}ms`,
            }}
          >
            <span
              className="hebrew text-6xl font-bold leading-none sm:text-5xl"
              style={{ color: "#fdf4dd", textShadow: `0 0 18px ${color}, 0 0 5px ${color}` }}
            >
              {l.letter}
            </span>
            <span className="mt-1.5 font-cinzel text-[10px] uppercase tracking-widest text-parchment/60">{l.name}</span>
            <span className="mt-1 font-cinzel text-xl font-bold" style={{ color, textShadow: `0 0 8px ${color}88` }}>+{l.value}</span>
          </div>
        ))}
        <div className="flex flex-col items-center px-2">
          <span className="text-3xl font-bold text-gold/40">=</span>
        </div>
        <div
          className="flex flex-col items-center rounded-xl border-2 px-6 py-3 transition-all duration-700"
          style={{
            borderColor: color,
            background: `${color}12`,
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(0.8)",
            transitionDelay: `${delay + letters.length * 120 + 200}ms`,
            boxShadow: `0 0 20px ${color}44`,
          }}
        >
          <span className="font-cinzel text-4xl font-black" style={{ color, filter: `drop-shadow(0 0 8px ${color})` }}>
            {total}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Cita ──────────────────────────────────────────────────────────────────────
function PullQuote({ he, es, fa: faText, source, locale }: { he: string; es: string; fa: string; source: string; locale: string }) {
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
      <p className="mb-1 text-sm italic leading-relaxed text-parchment/70" dir={locale === "fa" ? "rtl" : "ltr"}>
        {locale === "fa" ? `"${faText}"` : `"${es}"`}
      </p>
      <p className="font-cinzel text-[10px] uppercase tracking-widest text-gold/40">— {source}</p>
    </div>
  );
}

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
export default function Misterio26Page() {
  const locale = useLocale();
  const router = useRouter();
  const fa = locale === "fa";

  return (
    <div className="always-dark min-h-screen bg-ink" dir={fa ? "rtl" : "ltr"}>

      {/* Nav mínima */}
      <nav className="sticky top-0 z-40 border-b border-gold/10 bg-ink/90 px-5 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link href="/" className="font-cinzel text-sm text-gold/70 hover:text-gold">
            חַשְׁמַל · Jashmal
          </Link>
          <button
            onClick={() => router.push("/estudio")}
            className="rounded-full border border-gold/30 px-4 py-1.5 font-cinzel text-xs uppercase tracking-widest text-gold transition-all hover:border-gold hover:bg-gold/10"
          >
            {fa ? "شروع مطالعه" : "Comenzar estudio →"}
          </button>
        </div>
      </nav>

      <main className="mx-auto max-w-2xl px-5 pb-24 pt-16">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <div className="mb-16 text-center">
          <p className="mb-4 font-cinzel text-xs uppercase tracking-[0.4em] text-gold/50">
            {fa ? "رازی که تورات در زبان اصلی‌اش پنهان کرده" : "El secreto que la Torá escondió en su idioma original"}
          </p>

          {/* Ecuación hero */}
          <div className="relative mb-8 flex items-center justify-center gap-4">
            <div className="text-center">
              <span
                className="font-cinzel font-black"
                style={{
                  fontSize: "clamp(64px, 18vw, 110px)",
                  background: "linear-gradient(180deg, #fff8d0 0%, #f0d060 35%, #c9a43e 70%, #a07828 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 20px rgba(201,164,62,0.5))",
                  lineHeight: 1,
                }}
              >13</span>
              <p className="mt-1 font-cinzel text-xs uppercase tracking-widest text-gold/40">
                {fa ? "اِچاد · یک" : "Ejad · Uno"}
              </p>
            </div>
            <span className="font-cinzel text-3xl text-gold/30 pb-6">+</span>
            <div className="text-center">
              <span
                className="font-cinzel font-black"
                style={{
                  fontSize: "clamp(64px, 18vw, 110px)",
                  background: "linear-gradient(180deg, #fff8d0 0%, #f0d060 35%, #c9a43e 70%, #a07828 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 20px rgba(201,164,62,0.5))",
                  lineHeight: 1,
                }}
              >13</span>
              <p className="mt-1 font-cinzel text-xs uppercase tracking-widest text-gold/40">
                {fa ? "اَهاوا · عشق" : "Ahavá · Amor"}
              </p>
            </div>
            <span className="font-cinzel text-3xl text-gold/30 pb-6">=</span>
            <div className="text-center">
              <span
                className="font-cinzel font-black"
                style={{
                  fontSize: "clamp(64px, 18vw, 110px)",
                  background: "linear-gradient(180deg, #fff8d0 0%, #f0d060 35%, #c9a43e 70%, #a07828 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 30px rgba(201,164,62,0.7))",
                  lineHeight: 1,
                }}
              >26</span>
              <p className="mt-1 font-cinzel text-xs uppercase tracking-widest text-gold/40">
                {fa ? "یهوه" : "YHVH"}
              </p>
            </div>
          </div>

          {/* יהוה */}
          <div className="mb-6">
            <p className="hebrew text-6xl font-bold text-gold"
               style={{ filter: "drop-shadow(0 0 16px rgba(201,164,62,0.6))", letterSpacing: "0.15em" }}>
              יהוה
            </p>
            <p className="mt-2 font-cinzel text-xs uppercase tracking-widest text-gold/40">
              {fa ? "نام خداوند · ۲۶" : "El Nombre de Dios · 26"}
            </p>
          </div>

          <h1 className="font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
            {fa
              ? "خداوند یک است. خداوند عشق است. و مجموع آن‌ها نامش است."
              : "Dios es Uno. Dios es Amor. Y la suma de ambos es Su nombre."}
          </h1>
          <p className="mt-3 text-sm text-muted/70">
            {fa
              ? "این تصادف نیست. این معادله‌ای است که در زبان عبری رمزگذاری شده."
              : "Esto no es coincidencia. Es una ecuación codificada en el hebreo original."}
          </p>
        </div>

        {/* ── GEMATRÍA ─────────────────────────────────────────────────────── */}
        <Section>
          <h2 className="mb-6 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "گیماتریا — ارزش عددی حروف" : "Gematría — el código numérico del hebreo"}
          </h2>
          <p className="mb-8 text-sm leading-relaxed text-parchment/75">
            {fa
              ? "در زبان عبری، هر حرف یک ارزش عددی دارد. این سیستم را گیماتریا می‌نامند. وقتی دو واژه یک عدد مشترک دارند، کابالا می‌گوید که از یک ریشه‌ی معنوی می‌آیند."
              : "En hebreo cada letra tiene un valor numérico fijo. Cuando dos palabras comparten el mismo número, la Cabalá enseña que comparten una raíz espiritual — no es poesía, es aritmética sagrada."}
          </p>
        </Section>

        <GematriaRow
          letters={EJAD} word="Ejad" translation={fa ? "یک" : "Uno"}
          total={13} color="#c9a43e" delay={0}
        />

        <GematriaRow
          letters={AHAVA} word="Ahavá" translation={fa ? "عشق" : "Amor"}
          total={13} color="#c9a43e" delay={200}
        />

        {/* El reveal */}
        <Section delay={100}>
          <div className="my-10 rounded-2xl border border-gold/30 bg-gold/[0.06] p-6 text-center">
            <p className="font-cinzel text-2xl font-bold text-gold mb-2">13 + 13 = 26</p>
            <p className="hebrew text-4xl text-gold mb-3"
               style={{ filter: "drop-shadow(0 0 10px rgba(201,164,62,0.5))" }}>יהוה</p>
            <p className="text-sm text-parchment/70">
              {fa
                ? "ارزش عددی نام خداوند، یهوه، دقیقاً ۲۶ است."
                : "El valor numérico del nombre de Dios, YHVH, es exactamente 26."}
            </p>
          </div>
        </Section>

        {/* YHVH desglosado */}
        <Section>
          <h2 className="mb-4 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "یهوه — نام اِلهی" : "YHVH — El nombre divino"}
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-parchment/75">
            {fa
              ? "یهوه (יהוה) نامی است که در تورات ۶۸۲۳ بار آمده. به‌دلیل قداستش، هیچ‌گاه تلفظ نمی‌شود. اما عدد آن روشن است: ۱۰ + ۵ + ۶ + ۵ = ۲۶."
              : "YHVH (יהוה) aparece 6.823 veces en la Torá. Es tan sagrado que nunca se pronuncia — su sonido exacto se perdió hace 2.000 años. Pero su número es claro: 10 + 5 + 6 + 5 = 26."}
          </p>
        </Section>

        <GematriaRow
          letters={YHVH} word="YHVH" translation={fa ? "نام خداوند" : "El Nombre de Dios"}
          total={26} color="#e8d070" delay={0}
        />

        {/* ── CITA ─────────────────────────────────────────────────────────── */}
        <PullQuote
          he="אַחַד הוּא — וּשְׁמוֹ אֶחָד — שֶׁהָאַהֲבָה וְהָאַחְדוּת אֶחָד הֵם"
          es="Él es Uno — y Su nombre es Uno — porque el Amor y la Unidad son lo mismo"
          fa="او یکی است — و نامش یکی است — زیرا عشق و یگانگی یکی هستند"
          source="Tanya, Iggeret HaKodesh · Rav Shneur Zalman de Liadi"
          locale={locale}
        />

        {/* ── EXPLICACIÓN PROFUNDA ──────────────────────────────────────────── */}
        <Section>
          <h2 className="mb-6 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "معنای عمیق‌تر" : "El significado profundo"}
          </h2>
          <div className="space-y-5 text-sm leading-relaxed text-parchment/80">
            <p>
              {fa
                ? "در کابالا، هر عدد یک پیام دارد. اما وقتی سه واژه‌ی کلیدی — اِچاد (یک)، اَهاوا (عشق) و یهوه (نام خداوند) — به شکل این مثلث ریاضی به هم می‌رسند، پیام فریاد می‌زند: یگانگی و عشق یک چیز هستند، و هر دو نام خداوند است."
                : "En Cabalá, cada número porta un mensaje. Pero cuando tres palabras clave — Ejad (Uno), Ahavá (Amor) y YHVH (el Nombre divino) — convergen en este triángulo matemático, el mensaje grita: Unidad y Amor son lo mismo, y ambos son el Nombre de Dios."}
            </p>
            <p>
              {fa
                ? "شِما اسرائیل — اساسی‌ترین اعتقاد یهودی — با کلمه اِچاد (یک) تمام می‌شود: «خداوند خدای ما، خداوند یکی است.» عدد ۱۳ اِچاد است. عدد ۱۳ اَهاوا هم هست. تورات می‌گوید که خداوند یک است؛ این نیز یعنی خداوند عشق است — نه به‌عنوان استعاره، بلکه به‌عنوان معادله‌ای ریاضی."
                : "La Shemá — la declaración central del judaísmo — termina con Ejad: «El Señor nuestro Dios, el Señor es Uno.» El 13 es Ejad. El 13 también es Ahavá. La Torá dice que Dios es Uno; eso es matemáticamente idéntico a decir que Dios es Amor — no como metáfora, sino como ecuación."}
            </p>
            <p>
              {fa
                ? "بعل شم طوو (ربی ایزرائل بن الیعزر) می‌آموخت: عشق به خداوند و عشق به دیگران دو روی یک سکه‌اند. چون اگر خداوند یک است و عشق ۱۳ = یک ۱۳ است، پس دوست داشتن هر کسی دوست داشتن یک است — دوست داشتن خداوند."
                : "El Baal Shem Tov (Rav Israel ben Eliezer) enseñaba: el amor a Dios y el amor al prójimo son dos caras de la misma moneda. Porque si Dios es Uno y Amor = 13 = Uno, entonces amar a cualquier ser es amar la Unidad — es amar a Dios."}
            </p>
            <p>
              {fa
                ? "و یهوه ۲۶ = ۱۳ + ۱۳ یعنی: ذات خداوند هم یگانگی است و هم عشق، در یک نام جمع شده‌اند. این نام تلفظ نمی‌شود — اما عدد آن همه‌چیز را می‌گوید."
                : "Y YHVH = 26 = 13 + 13 significa: la esencia de Dios ES la síntesis de Unidad y Amor, reunidas en un solo Nombre. Ese Nombre no se pronuncia — pero su número lo dice todo."}
            </p>
          </div>
        </Section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <Section delay={100}>
          <div className="mt-16 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.06] to-transparent p-8 text-center">
            <p className="hebrew mb-3 text-3xl text-gold" style={{ filter: "drop-shadow(0 0 10px rgba(201,164,62,0.5))" }}>
              שְׁמַע יִשְׂרָאֵל
            </p>
            <h3 className="mb-3 font-cinzel text-base font-bold text-parchment/90">
              {fa ? "این ابتدای راه است" : "Esto es solo el inicio"}
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-muted/70">
              {fa
                ? "جاشمال یک ابزار مطالعهٔ تعاملی است. هر متن مقدس را انتخاب کنید و Claude با روش پردِس آن را برای شما تحلیل می‌کند."
                : "Jashmal es un motor de estudio interactivo. Elige cualquier texto sagrado y Claude — con el método PaRDeS — lo analiza en profundidad, con Zohar, Tanya y comentaristas clásicos."}
            </p>

            <div className="mb-8 flex flex-wrap justify-center gap-2">
              {[
                { label: fa ? "شِما" : "La Shemá", ref: "Deuteronomy 6:4" },
                { label: fa ? "اِچاد" : "Ejad · Unidad", ref: "Tanya, Part I; Likkutei Amarim 2" },
                { label: fa ? "اَهاوا" : "Ahavá · Amor", ref: "Tanya, Part I; Likkutei Amarim 32" },
                { label: fa ? "یهوه" : "YHVH · El Nombre", ref: "Zohar, Vaetchanan 1" },
                { label: fa ? "گیماتریا" : "Gematría", ref: "Sefer Etz Chaim, Gate 1" },
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

            <button
              onClick={() => router.push("/estudio?ref=Deuteronomy%206%3A4")}
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
