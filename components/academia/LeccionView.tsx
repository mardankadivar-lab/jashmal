"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import RichText from "./RichText";
import LessonVerse from "./LessonVerse";
import {
  type Lesson,
  type Block,
  type Hilo,
  MODULO1,
  nextLesson,
  resolveThread,
  threadHref,
} from "@/lib/academia/modulo1";
import { markComplete, setLast } from "@/lib/academia/progress";

// Los cinco momentos del ritmo de estudio (§6). Una cosa a la vez.
const BEATS = [
  { he: "פְּתִיחָה", label: "Apertura" },
  { he: "לִמּוּד", label: "Estudio guiado" },
  { he: "הִתְבּוֹנְנוּת", label: "Contempla" },
  { he: "מַעֲשֶׂה", label: "Tu acción de hoy" },
  { he: "חֲתִימָה", label: "El sello" },
] as const;

export default function LeccionView({ lesson }: { lesson: Lesson }) {
  const [beat, setBeat] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const next = nextLesson(lesson.slug);

  // Al abrir la lección, recuérdala como "última visitada" (para retomar).
  useEffect(() => {
    setLast(lesson.slug);
  }, [lesson.slug]);

  // Al llegar al sello (חֲתִימָה), la lección queda completada.
  useEffect(() => {
    if (beat === 4) markComplete(lesson.slug);
  }, [beat, lesson.slug]);

  function go(to: number) {
    setBeat(to);
    setAnimKey((k) => k + 1);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const progress = ((beat + 1) / BEATS.length) * 100;

  return (
    <div className="relative min-h-screen overflow-hidden" dir="ltr">
      {/* halo dorado de fondo, sereno */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 25%, rgba(201,164,62,0.07) 0%, rgba(5,5,10,0) 65%)",
        }}
      />

      {/* barra de progreso de la lección (5 momentos) */}
      <div className="fixed inset-x-0 top-0 z-20 h-[3px] bg-gold/10">
        <div
          className="h-full bg-gold transition-all duration-700 ease-out"
          style={{ width: `${progress}%`, boxShadow: "0 0 10px #c9a43e" }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-12">
        {/* cabecera: dónde estoy, y salida al mapa siempre visible */}
        <header className="mb-8">
          <div className="flex items-center justify-between text-gold/70">
            <Link href="/" className="hebrew text-xl transition hover:text-gold" style={{ filter: "drop-shadow(0 0 8px #c9a43e33)" }}>
              חַשְׁמַל
            </Link>
            <Link
              href="/academia/modulo-1"
              className="font-cinzel text-[11px] uppercase tracking-[0.2em] transition hover:text-gold"
            >
              ☰ Mapa
            </Link>
          </div>
          <div className="mt-5 text-center">
            <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-gold/45">
              Módulo 1 · Lección {lesson.n} de {MODULO1.total}
            </p>
            <h1 className="mt-2 font-cinzel text-2xl leading-snug text-parchment sm:text-3xl">
              {lesson.title}
            </h1>
            <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/[0.05] px-3 py-1">
              <span className="hebrew text-sm text-gold">{MODULO1.etapaHe}</span>
              <span className="font-cinzel text-[10px] uppercase tracking-widest text-gold/60">
                {MODULO1.etapa}
              </span>
            </span>
          </div>
        </header>

        <div key={animKey} className="animate-fade-up flex-1">
          {beat === 0 && <BeatApertura lesson={lesson} />}
          {beat === 1 && <BeatEstudio lesson={lesson} />}
          {beat === 2 && <BeatContempla lesson={lesson} />}
          {beat === 3 && <BeatAccion lesson={lesson} />}
          {beat === 4 && <BeatSello lesson={lesson} next={next} />}
        </div>

        {/* navegación entre momentos (en el sello, la navegación va en el propio bloque) */}
        {beat < 4 && (
          <div className="mt-12 flex flex-col items-center gap-5">
            <GoldButton onClick={() => go(beat + 1)}>Continuar →</GoldButton>
            {beat > 0 && (
              <button
                onClick={() => go(beat - 1)}
                className="font-cinzel text-[11px] uppercase tracking-widest text-parchment/50 underline-offset-4 transition hover:text-gold hover:underline"
              >
                ← atrás
              </button>
            )}
          </div>
        )}

        {/* puntos de los 5 momentos */}
        <div className="mt-10 flex items-center justify-center gap-2.5">
          {BEATS.map((_, n) => (
            <button
              key={n}
              onClick={() => go(n)}
              aria-label={`Momento ${n + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                n === beat ? "w-7 bg-gold" : n < beat ? "w-1.5 bg-gold/60" : "w-1.5 bg-gold/20"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── piezas compartidas ───────────────────────────────────────────────────────

function Rubric({ he, label }: { he: string; label: string }) {
  return (
    <div className="mb-8 text-center">
      <p className="hebrew text-2xl text-gold" dir="rtl" style={{ filter: "drop-shadow(0 0 8px #c9a43e44)" }}>
        {he}
      </p>
      <p className="mt-1.5 font-cinzel text-xs uppercase tracking-[0.28em] text-gold/55">{label}</p>
    </div>
  );
}

function GoldButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full border-2 border-gold bg-gold/10 px-10 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20 hover:shadow-[0_0_24px_rgba(201,164,62,0.25)]"
    >
      {children}
    </button>
  );
}

// ── 1 · פְּתִיחָה ─────────────────────────────────────────────────────────────
function BeatApertura({ lesson }: { lesson: Lesson }) {
  return (
    <div className="text-center">
      <Rubric he="פְּתִיחָה" label="Apertura" />
      <p className="mx-auto max-w-xl text-xl leading-relaxed text-parchment sm:text-2xl">
        <RichText text={lesson.apertura.question} keyPrefix="ap" />
      </p>
      <p className="mx-auto mt-8 max-w-md text-sm italic leading-relaxed text-muted">
        Tómalo con calma. Piénsalo un momento — y cuando quieras, seguimos juntos.
      </p>
    </div>
  );
}

// ── 2 · לִמּוּד (estudio guiado) ──────────────────────────────────────────────
function BlockView({ b, i }: { b: Block; i: number }) {
  if (b.t === "verse") {
    return <LessonVerse he={b.he} es={b.es} refLabel={b.ref} sefaria={b.sefaria} />;
  }
  // párrafo, según su tono
  const inner = <RichText text={b.text} keyPrefix={`b${i}`} />;
  if (b.tone === "gematria") {
    return (
      <div className="my-4 rounded-xl border border-gold/15 bg-gold/[0.04] px-4 py-3 text-[1.05rem] leading-relaxed text-parchment/90">
        {inner}
      </div>
    );
  }
  if (b.tone === "shield") {
    return (
      <div className="my-5 rounded-xl border border-gold/30 bg-gold/[0.07] px-5 py-4 text-[1.05rem] leading-relaxed text-parchment">
        {inner}
      </div>
    );
  }
  if (b.tone === "item") {
    return (
      <div className="my-2 border-s-2 border-gold/30 ps-3.5 text-[1.05rem] leading-relaxed text-parchment/90">
        {inner}
      </div>
    );
  }
  return <p className="mt-4 text-[1.05rem] leading-relaxed text-parchment/85 first:mt-0">{inner}</p>;
}

function BeatEstudio({ lesson }: { lesson: Lesson }) {
  return (
    <div>
      <Rubric he="לִמּוּד" label="Estudio guiado" />
      <div className="space-y-1">
        {lesson.estudio.map((b, i) => (
          <BlockView key={i} b={b} i={i} />
        ))}
      </div>
      {/* tira de integridad: las fuentes exactas de la lección */}
      <div className="mt-9 rounded-xl border border-gold/12 bg-ink/30 px-4 py-3">
        <p className="font-cinzel text-[10px] uppercase tracking-[0.25em] text-gold/45">Fuentes de esta lección</p>
        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted/80">
          {lesson.fuentes.map((f, i) => (
            <li key={i}>
              <RichText text={f} keyPrefix={`f${i}`} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ── 3 · הִתְבּוֹנְנוּת ────────────────────────────────────────────────────────
function BeatContempla({ lesson }: { lesson: Lesson }) {
  return (
    <div className="text-center">
      <Rubric he="הִתְבּוֹנְנוּת" label="Contempla" />
      <div className="mx-auto max-w-xl space-y-5">
        {lesson.contemplacion.map((p, i) => (
          <p key={i} className="text-xl leading-relaxed text-parchment/90">
            <RichText text={p} keyPrefix={`ct${i}`} />
          </p>
        ))}
      </div>
    </div>
  );
}

// ── 4 · מַעֲשֶׂה ──────────────────────────────────────────────────────────────
function BeatAccion({ lesson }: { lesson: Lesson }) {
  return (
    <div className="text-center">
      <Rubric he="מַעֲשֶׂה" label="Tu acción de hoy" />
      <div className="mx-auto max-w-xl space-y-5">
        {lesson.accion.text.map((p, i) => (
          <p key={i} className="text-xl leading-relaxed text-parchment/90">
            <RichText text={p} keyPrefix={`ac${i}`} />
          </p>
        ))}
      </div>
      {lesson.accion.cta && (
        <div className="mt-8">
          <Link
            href={`/estudio?ref=${encodeURIComponent(lesson.accion.cta.ref)}`}
            className="inline-block rounded-full border border-gold/50 bg-gold/[0.06] px-7 py-3 font-cinzel text-xs uppercase tracking-widest text-gold transition-all hover:border-gold hover:bg-gold/15"
          >
            {lesson.accion.cta.label}
          </Link>
        </div>
      )}
    </div>
  );
}

// ── 5 · חֲתִימָה (el sello) + Sigue el hilo + próxima piedra ──────────────────
function BeatSello({ lesson, next }: { lesson: Lesson; next: Lesson | null }) {
  // Chips "Sigue el hilo", deduplicando el que ya es la próxima lección (CTA principal).
  const hilos = lesson.hilos.filter((h) => {
    const t = resolveThread(h);
    return !(t.kind === "lesson" && next && t.slug === next.slug);
  });

  return (
    <div>
      <Rubric he="חֲתִימָה" label="El sello" />

      {/* el sello, memorizables */}
      <div className="mx-auto max-w-xl rounded-2xl border border-gold/25 bg-gold/[0.05] px-6 py-7 text-center">
        <p className="text-lg leading-relaxed text-parchment sm:text-xl">
          <RichText text={lesson.sello} keyPrefix="sl" />
        </p>
      </div>

      {/* cierre del Módulo 1 (solo L6) */}
      {lesson.closeModule && (
        <div className="mx-auto mt-7 max-w-xl rounded-2xl border border-gold/20 bg-ink/40 px-6 py-6 text-center">
          <p className="hebrew text-lg text-gold" dir="rtl" style={{ filter: "drop-shadow(0 0 8px #c9a43e44)" }}>
            {MODULO1.auroraHe}
          </p>
          <p className="mt-1 font-cinzel text-[10px] uppercase tracking-[0.25em] text-gold/45">
            Cierre del Módulo 1
          </p>
          <p className="mt-4 text-base leading-relaxed text-parchment/85">
            <RichText text={lesson.closeModule} keyPrefix="cm" />
          </p>
        </div>
      )}

      {/* la próxima piedra: SIEMPRE clara (esto resuelve el "lo soltamos sin rumbo") */}
      <div className="mt-10 text-center">
        {next ? (
          <>
            <Link
              href={`/academia/modulo-1/${next.slug}`}
              className="inline-block rounded-full border-2 border-gold bg-gold/10 px-9 py-4 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20 hover:shadow-[0_0_24px_rgba(201,164,62,0.25)]"
            >
              Siguiente · L{next.n}: {next.title} →
            </Link>
            <p className="mt-3 text-xs text-muted">Tu próximo escalón ya te espera.</p>
          </>
        ) : (
          <>
            <Link
              href="/academia/modulo-1"
              className="inline-block rounded-full border-2 border-gold bg-gold/10 px-9 py-4 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20 hover:shadow-[0_0_24px_rgba(201,164,62,0.25)]"
            >
              Completaste el Módulo 1 · Volver al mapa →
            </Link>
            <p className="mt-3 text-xs text-muted">
              Módulo 2 · <span className="hebrew text-gold/70">אוֹתִיּוֹת</span> Las letras vivas — llega pronto.
            </p>
          </>
        )}
      </div>

      {/* Sigue el hilo: puentes secundarios hacia otros estudios */}
      {hilos.length > 0 && (
        <div className="mt-10">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gold/25" />
            <span className="hebrew text-sm text-gold/70" dir="rtl">
              הֶמְשֵׁךְ
            </span>
            <span className="font-cinzel text-[10px] uppercase tracking-[0.25em] text-gold/45">Sigue el hilo</span>
            <span className="h-px w-10 bg-gold/25" />
          </div>
          <div className="flex flex-col gap-3">
            {hilos.map((h, i) => (
              <ThreadChip key={i} hilo={h} />
            ))}
          </div>
        </div>
      )}

      {/* salida serena al mapa */}
      <div className="mt-10 text-center">
        <Link
          href="/academia/modulo-1"
          className="font-cinzel text-[11px] uppercase tracking-widest text-parchment/55 underline-offset-4 transition hover:text-gold hover:underline"
        >
          ← Volver al mapa del Módulo 1
        </Link>
      </div>
    </div>
  );
}

function ThreadChip({ hilo }: { hilo: Hilo }) {
  const target = resolveThread(hilo);
  const href = threadHref(target);

  // Concepto de un módulo futuro: teaser, no enlace muerto.
  if (!href) {
    return (
      <div className="study-threshold__chip flex items-center justify-between gap-3 opacity-70">
        <span className="text-parchment/75">
          <RichText text={hilo.label} keyPrefix="hl" />
        </span>
        <span className="shrink-0 rounded-full border border-gold/25 px-2 py-0.5 font-cinzel text-[9px] uppercase tracking-widest text-gold/55">
          pronto
        </span>
      </div>
    );
  }

  return (
    <Link href={href} className="study-threshold__chip flex items-center justify-between gap-3">
      <span className="gold-link">
        <RichText text={hilo.label} keyPrefix="hl" />
      </span>
      <span aria-hidden="true" className="shrink-0 text-gold/60">→</span>
    </Link>
  );
}
