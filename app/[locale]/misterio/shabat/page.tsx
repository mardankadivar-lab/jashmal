"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { useRouter, Link } from "@/i18n/navigation";
import { MISTERIOS_ORDENADOS } from "@/lib/content/misterios";
import { tri } from "@/lib/i18n/i18nContent";
import type { Locale } from "@/i18n/routing";
import MisterioLangToggle from "@/components/MisterioLangToggle";
import TranslationBadge from "@/components/TranslationBadge";

// ── utilidades de animación ──────────────────────────────────────────────────
function Section({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setV(true); },
      { threshold: 0.10 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className="transition-all duration-1000"
      style={{
        opacity: v ? 1 : 0,
        transform: v ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ── Menorá SVG (7 brazos) ────────────────────────────────────────────────────
function Menora({ size = 60 }: { size?: number }) {
  const scale = size / 60;
  return (
    <svg
      width={60 * scale}
      height={80 * scale}
      viewBox="0 0 60 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* base */}
      <rect x="20" y="72" width="20" height="4" rx="2" fill="#e8945a" />
      {/* tronco central */}
      <rect x="28.5" y="40" width="3" height="32" fill="#e8945a" />
      {/* rama izquierda exterior */}
      <path d="M29 55 Q10 55 10 40" stroke="#e8945a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* rama izquierda interior */}
      <path d="M29 55 Q18 55 18 45" stroke="#e8945a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* rama derecha interior */}
      <path d="M31 55 Q42 55 42 45" stroke="#e8945a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* rama derecha exterior */}
      <path d="M31 55 Q50 55 50 40" stroke="#e8945a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* llamas — 7 */}
      <ellipse cx="10" cy="37" rx="2.5" ry="4" fill="#e8945a" opacity="0.9" />
      <ellipse cx="18" cy="42" rx="2.5" ry="4" fill="#e8945a" opacity="0.9" />
      <ellipse cx="30" cy="37" rx="2.5" ry="4" fill="#e8945a" opacity="0.9" />
      <ellipse cx="42" cy="42" rx="2.5" ry="4" fill="#e8945a" opacity="0.9" />
      <ellipse cx="50" cy="37" rx="2.5" ry="4" fill="#e8945a" opacity="0.9" />
      <ellipse cx="22" cy="39" rx="2" ry="3.5" fill="#e8945a" opacity="0.85" />
      <ellipse cx="38" cy="39" rx="2" ry="3.5" fill="#e8945a" opacity="0.85" />
    </svg>
  );
}

// ── PÁGINA ───────────────────────────────────────────────────────────────────
export default function ShabatHubPage() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const fa = locale === "fa";

  // Siempre modo oscuro — las letras doradas solo se leen sobre #05050a
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);

  const A = "#e8945a"; // ámbar breslov
  const estudios = MISTERIOS_ORDENADOS.filter((m) => m.serie === "shabat");

  return (
    <div className="always-dark min-h-screen" style={{ background: "#05050a" }} dir={fa ? "rtl" : "ltr"}>

      {/* ── NAV ── */}
      <nav
        className="sticky top-0 z-40 border-b border-gold/10 px-5 py-3 backdrop-blur-md"
        style={{ background: "rgba(5,5,10,0.90)" }}
      >
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link
            href="/misterios"
            className="font-cinzel text-sm text-gold/70 transition-colors hover:text-gold"
          >
            {fa ? "→ همهٔ اسرار" : "← Todos los misterios"}
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

      <main className="mx-auto max-w-2xl px-5 pb-28 pt-16">

        {/* ── HERO ── */}
        <div className="mb-14 text-center">
          {/* Badge de autoría */}
          <p className="mb-5 font-cinzel text-xs uppercase tracking-[0.35em] text-gold/50">
            {fa
              ? "لیکوتی موهاران · ربه نجمن از برسلاو"
              : "Likutei Moharan · Rebbe Najman de Breslov"}
          </p>

          {/* Menorá grande */}
          <div className="mb-6 flex justify-center">
            <div style={{ filter: `drop-shadow(0 0 18px ${A}66)` }}>
              <Menora size={80} />
            </div>
          </div>

          {/* Título hebreo */}
          <h1
            className="hebrew font-bold leading-none"
            style={{
              fontSize: "clamp(72px, 20vw, 96px)",
              color: A,
              textShadow: `0 0 40px ${A}88, 0 0 12px ${A}55`,
            }}
          >
            שַׁבָּת
          </h1>

          {/* Subtítulo */}
          <h2 className="mt-3 font-cinzel text-lg font-bold text-parchment/90 sm:text-xl">
            {fa
              ? "آموزش‌های لیکوتی موهاران برای شبات"
              : "Enseñanzas de Likutei Moharan para el Shabbat"}
          </h2>

          {/* Párrafo introductorio */}
          <p
            className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted/90"
            dir={fa ? "rtl" : "ltr"}
          >
            {fa
              ? "لیکوتی موهاران (לִקּוּטֵי מוֹהֲרַ»ן) شاهکارِ ربه نجمن از برسلاو (۱۷۷۲–۱۸۱۰) است. هر جمعه، جاشمال یکی از ۴۱۱ آموزشِ آن را تقطیر می‌کند — روحِ حسیدوتِ برسلاو — تا ورودِ شبات را همراهی کند."
              : "El Likutei Moharan (לִקּוּטֵי מוֹהֲרַ\"ן) es la obra maestra del Rebbe Najman de Breslov (1772–1810). Cada viernes, Jashmal destila una de sus 411 enseñanzas — el alma del jasidut breslov — para que acompañe la entrada del Shabbat."}
          </p>
        </div>

        {/* ── GRID DE ESTUDIOS ── */}
        <Section>
          {estudios.length === 0 ? (
            /* Estado vacío */
            <div className="rounded-2xl border border-amber-600/20 bg-amber-900/[0.06] px-8 py-14 text-center">
              <div className="mb-5 flex justify-center">
                <Menora size={48} />
              </div>
              <p className="font-cinzel text-sm text-parchment/70">
                {fa
                  ? "اولین مطالعهٔ شبات در راه است. این جمعه برگرد."
                  : "El primer estudio de Shabbat está en camino. Vuelve este viernes."}
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2">
              {estudios.map((m, idx) => {
                const titulo = tri(locale, m.titulo, m.tituloFa, m.tituloEn);
                const gancho = tri(locale, m.gancho, m.ganchoFa, m.ganchoEn);
                const numero = m.numero ?? String(idx + 1);
                return (
                  <button
                    key={m.slug}
                    onClick={() => router.push(`/misterio/${m.slug}`)}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-amber-600/20 bg-white/[0.02] p-6 text-start transition-all hover:border-amber-500/50 hover:bg-amber-900/[0.06]"
                    style={{ minHeight: 210 }}
                  >
                    {/* Glow en hover */}
                    <div
                      className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                      style={{ background: `radial-gradient(circle, ${m.color}33 0%, transparent 70%)` }}
                    />

                    {/* Número de Torá */}
                    <span
                      className="font-cinzel font-black leading-none"
                      style={{ fontSize: "40px", color: m.color, textShadow: `0 0 16px ${m.color}55` }}
                    >
                      {numero}
                    </span>

                    {/* Hebreo */}
                    <span
                      className="hebrew mt-2 text-xl font-bold leading-snug"
                      style={{ color: "#fdf4dd", textShadow: `0 0 12px ${m.color}88` }}
                    >
                      {m.he}
                    </span>

                    {/* Título */}
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <h3
                        className="font-cinzel text-base font-bold tracking-wide"
                        style={{ color: m.color }}
                      >
                        {titulo.value}
                      </h3>
                      {titulo.missing && (
                        <TranslationBadge available={titulo.available} />
                      )}
                    </div>

                    {/* Gancho */}
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted/90">
                      {gancho.value}
                    </p>

                    {/* Pie */}
                    <div className="mt-4 flex items-center justify-end">
                      <span className="font-cinzel text-xs text-gold/60 transition-colors group-hover:text-gold">
                        {fa ? "خواندن ←" : "leer →"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </Section>

        {/* ── CIERRE ── */}
        <Section delay={150}>
          <div className="mt-20 border-t border-amber-600/15 pt-14 text-center">
            <div
              className="mb-5 flex justify-center"
              style={{ filter: `drop-shadow(0 0 10px ${A}44)` }}
            >
              <Menora size={44} />
            </div>

            <p
              className="hebrew mb-2 font-bold leading-none"
              style={{
                fontSize: "clamp(40px, 10vw, 56px)",
                color: A,
                textShadow: `0 0 24px ${A}88`,
              }}
            >
              שַׁבָּת שָׁלוֹם
            </p>

            <p className="mt-3 font-cinzel text-xs uppercase tracking-[0.3em] text-muted/60">
              {fa
                ? "شبات شالوم — هر جمعه، آموزشی تازه"
                : "Shabbat Shalom — cada viernes, una nueva enseñanza"}
            </p>

            <div className="mt-8">
              <Link
                href="/misterios"
                className="font-cinzel text-sm text-gold/60 transition-colors hover:text-gold"
              >
                {fa ? "→ همهٔ اسرار" : "← Todos los misterios"}
              </Link>
            </div>
          </div>
        </Section>

      </main>
    </div>
  );
}
