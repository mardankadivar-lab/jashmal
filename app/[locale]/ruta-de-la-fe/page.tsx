"use client";

import { useLocale } from "next-intl";
import Link from "next/link";
import { useRouter } from "@/i18n/navigation";
import { MISTERIOS_ORDENADOS } from "@/lib/content/misterios";
import { tri } from "@/lib/i18n/i18nContent";
import type { Locale } from "@/i18n/routing";
import MisterioLangToggle from "@/components/MisterioLangToggle";
import SelloSofer from "@/components/SelloSofer";

// ─────────────────────────────────────────────────────────────────────────
//  /ruta-de-la-fe — "Ruta de la Fe"
// ─────────────────────────────────────────────────────────────────────────
//  Empaqueta la Serie de la Fe (4 misterios) como una RUTA DE ESTUDIO guiada:
//  un camino numerado 1→2→3→4 con título y gancho de cada paso (tomados del
//  catálogo lib/content/misterios.ts, serie "fe", ordenados por `orden`), y un
//  puente final a "qué sigue" (los personajes que vendrán).
//
//  Estilo de la casa: oscuro (#05050a), dorado (#c9a43e) y el azul tejélet
//  (#6f8fe8) que distingue a la serie de la Fe.
//
//  Trilingüe: título/gancho de cada paso salen de tri(locale, …) usando los
//  campos titulo/tituloFa y gancho/ganchoFa que ya existen; los textos de la
//  propia ruta (intro, rótulos) se seleccionan por locale.
// ─────────────────────────────────────────────────────────────────────────

const TEJELET = "#6f8fe8";

interface Copy {
  dir: "ltr" | "rtl";
  font: string;
  kicker: string;
  h1: string;
  he: string;
  lead: string;
  step: string; // "Paso" / "گام" / "Step"
  nextTitle: string;
  nextText: string;
  nextCta: string;
  startCta: string; // botón del primer paso
  startStudy: string;
}

const COPY: Record<Locale, Copy> = {
  es: {
    dir: "ltr",
    font: "var(--font-body), serif",
    kicker: "Empieza aquí · Serie de la Fe",
    h1: "Ruta de la Fe",
    he: "אֱמוּנָה",
    lead:
      "Un camino de cuatro pasos por la fe — de qué es, a en qué consiste, hasta el primer hombre que la encarnó. Síguelos en orden: cada paso prepara el siguiente.",
    step: "Paso",
    nextTitle: "¿Qué sigue?",
    nextText:
      "La fe no termina en Abraham: empieza en él. Después vendrán los que la heredaron y la pusieron a prueba — Itzjak, Yaakov, y la cadena que sostiene la promesa. Mientras tanto, todos los Misterios te esperan.",
    nextCta: "Ver todos los Misterios →",
    startCta: "Empezar por aquí",
    startStudy: "Comenzar estudio →",
  },
  fa: {
    dir: "rtl",
    font: "Vazirmatn, sans-serif",
    kicker: "از اینجا آغاز کن · سری ایمان",
    h1: "راهِ ایمان",
    he: "אֱמוּנָה",
    lead:
      "راهی چهارگامه در ایمان — از اینکه چیست، تا اینکه از چه ساخته شده، تا نخستین انسانی که آن را در تن کرد. به ترتیب دنبال کن: هر گام، گامِ بعد را آماده می‌کند.",
    step: "گام",
    nextTitle: "بعد چه؟",
    nextText:
      "ایمان با ابراهیم پایان نمی‌یابد: با او آغاز می‌شود. سپس آنان می‌آیند که آن را به ارث بردند و آزمودند — اسحاق، یعقوب، و زنجیره‌ای که وعده را نگاه می‌دارد. تا آن‌گاه، همهٔ اسرار در انتظارِ تواند.",
    nextCta: "دیدنِ همهٔ اسرار ←",
    startCta: "از اینجا آغاز کن",
    startStudy: "شروع مطالعه ←",
  },
  en: {
    dir: "ltr",
    font: "var(--font-body), serif",
    kicker: "Start here · The Faith Series",
    h1: "The Path of Faith",
    he: "אֱמוּנָה",
    lead:
      "A four-step path through faith — from what it is, to what it's made of, to the first man who embodied it. Follow them in order: each step prepares the next.",
    step: "Step",
    nextTitle: "What comes next?",
    nextText:
      "Faith doesn't end with Abraham: it begins in him. After him come those who inherited it and were tested by it — Isaac, Jacob, and the chain that carries the promise. In the meantime, all the Mysteries are waiting for you.",
    nextCta: "See all the Mysteries →",
    startCta: "Start here",
    startStudy: "Begin study →",
  },
};

export default function RutaDeLaFePage() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const c = COPY[locale] ?? COPY.es;
  const fa = locale === "fa";

  // Los 4 pasos: serie "fe", ya ordenados por `orden` en MISTERIOS_ORDENADOS.
  const pasos = MISTERIOS_ORDENADOS.filter((m) => m.serie === "fe");

  return (
    <div
      className="always-dark min-h-screen"
      style={{ background: "#05050a", fontFamily: c.font }}
      dir={c.dir}
    >
      {/* Nav */}
      <nav
        className="sticky top-0 z-40 border-b border-gold/10 px-5 py-3 backdrop-blur-md"
        style={{ background: "rgba(5,5,10,0.9)" }}
      >
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link href="/" className="font-cinzel text-sm text-gold/70 hover:text-gold">
            חַשְׁמַל · {fa ? "خَشمَل" : "Jashmal"}
          </Link>
          <div className="flex items-center gap-3">
            <MisterioLangToggle />
            <button
              onClick={() => router.push("/estudio")}
              className="rounded-full border border-gold/30 px-4 py-1.5 font-cinzel text-xs uppercase tracking-widest text-gold transition-all hover:border-gold hover:bg-gold/10"
            >
              {c.startStudy}
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-2xl px-5 pb-24 pt-16">
        {/* Hero */}
        <div className="mb-12 text-center">
          <p className="mb-4 font-cinzel text-xs uppercase tracking-[0.4em] text-gold/50">
            {c.kicker}
          </p>
          <p
            className="hebrew mb-3 font-bold leading-none"
            style={{
              fontSize: "clamp(40px, 11vw, 76px)",
              color: "#dbe7ff",
              textShadow: `0 0 26px ${TEJELET}88`,
            }}
          >
            {c.he}
          </p>
          <h1 className="font-cinzel text-2xl font-bold tracking-wide text-parchment sm:text-3xl">
            {c.h1}
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-muted" dir={c.dir}>
            {c.lead}
          </p>
          <div className="mt-5 flex justify-center">
            <SelloSofer variant="inline" />
          </div>
        </div>

        {/* Los 4 pasos, con flecha de progreso entre ellos */}
        <ol className="relative">
          {pasos.map((m, i) => {
            const titulo = tri(locale, m.titulo, m.tituloFa, m.tituloEn);
            const gancho = tri(locale, m.gancho, m.ganchoFa, m.ganchoEn);
            const last = i === pasos.length - 1;
            return (
              <li key={m.slug}>
                <button
                  onClick={() => router.push(`/misterio/${m.slug}`)}
                  className="group relative flex w-full items-start gap-4 overflow-hidden rounded-2xl border p-6 text-start transition-all"
                  style={{
                    borderColor: `${TEJELET}40`,
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  {/* Glow tejélet en hover */}
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: `radial-gradient(circle, ${TEJELET}33 0%, transparent 70%)` }}
                  />

                  {/* Número de paso, en círculo tejélet */}
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 font-cinzel text-lg font-black"
                    style={{
                      borderColor: `${TEJELET}99`,
                      color: "#eaf1ff",
                      background: "rgba(12,14,22,0.96)",
                      textShadow: `0 0 12px ${TEJELET}`,
                      boxShadow: `0 0 18px ${TEJELET}33`,
                    }}
                  >
                    {i + 1}
                  </span>

                  {/* Contenido del paso */}
                  <div className="flex-1" dir={c.dir}>
                    <p className="font-cinzel text-[10px] uppercase tracking-[0.25em] text-gold/45">
                      {c.step} {i + 1}
                    </p>
                    <div className="mt-1 flex flex-wrap items-baseline gap-2">
                      <span
                        className="hebrew text-lg font-bold"
                        style={{ color: "#fdf4dd", textShadow: `0 0 12px ${TEJELET}66` }}
                      >
                        {m.he}
                      </span>
                      <h2
                        className="font-cinzel text-base font-bold tracking-wide"
                        style={{ color: TEJELET }}
                      >
                        {titulo.value}
                      </h2>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted/90">{gancho.value}</p>
                    <span className="mt-3 inline-block font-cinzel text-xs text-gold/55 transition-colors group-hover:text-gold">
                      {i === 0 ? c.startCta : c.startStudy}
                    </span>
                  </div>
                </button>

                {/* Flecha de progreso al siguiente paso */}
                {!last && (
                  <div className="flex justify-center py-2" aria-hidden="true">
                    <span
                      className="text-2xl leading-none"
                      style={{ color: `${TEJELET}88`, textShadow: `0 0 10px ${TEJELET}55` }}
                    >
                      ↓
                    </span>
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        {/* Puente: ¿qué sigue? */}
        <div
          className="mt-12 rounded-2xl border p-7 text-center"
          style={{ borderColor: "rgba(201,164,62,0.25)", background: "rgba(201,164,62,0.04)" }}
          dir={c.dir}
        >
          <h2 className="font-cinzel text-sm uppercase tracking-[0.3em] text-gold/70">
            {c.nextTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">{c.nextText}</p>
          <button
            onClick={() => router.push("/misterios")}
            className="mt-5 rounded-full border-2 border-gold bg-gold/10 px-7 py-3 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
            style={{ boxShadow: "0 0 20px rgba(201,164,62,0.22)" }}
          >
            {c.nextCta}
          </button>
        </div>

        {/* Footer */}
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
