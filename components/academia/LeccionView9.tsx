"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import RichText from "./RichText";
import LessonVerse from "./LessonVerse";
import {
  type Lesson,
  type Block,
  type Hilo,
  MODULO9,
  nextLesson9,
  resolveThreadHref9,
} from "@/lib/academia/modulo9";
import { markSeen, setLast } from "@/lib/academia/progress";
import TareaInput from "./TareaInput";

// Los cinco momentos del ritmo de estudio (§6). Una cosa a la vez.
const BEATS = [
  { he: "פְּתִיחָה", label: "Apertura" },
  { he: "לִמּוּד", label: "Estudio guiado" },
  { he: "הִתְבּוֹנְנוּת", label: "Contempla" },
  { he: "מַעֲשֶׂה", label: "Tu acción de hoy" },
  { he: "חֲתִימָה", label: "El sello" },
] as const;

export default function LeccionView9({ lesson }: { lesson: Lesson }) {
  const [beat, setBeat] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [j2Done, setJ2Done] = useState(false);
  const next = nextLesson9(lesson.slug);

  useEffect(() => {
    setLast(lesson.slug);
  }, [lesson.slug]);

  useEffect(() => {
    if (beat === 4) markSeen(lesson.slug);
  }, [beat, lesson.slug]);

  function go(to: number) {
    setBeat(to);
    setAnimKey((k) => k + 1);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Callback invocado por TareaInput cuando se entrega la tarea de L45.
  function handleTareaEntregada() {
    if (lesson.closeModule) {
      setJ2Done(true);
    }
  }

  const progress = ((beat + 1) / BEATS.length) * 100;

  return (
    <div className="relative min-h-screen overflow-hidden" dir="ltr">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 25%, rgba(201,164,62,0.07) 0%, rgba(5,5,10,0) 65%)",
        }}
      />

      <div className="fixed inset-x-0 top-0 z-20 h-[3px] bg-gold/10">
        <div
          className="h-full bg-gold transition-all duration-700 ease-out"
          style={{ width: `${progress}%`, boxShadow: "0 0 10px #c9a43e" }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-12">
        <header className="mb-8">
          <div className="flex items-center justify-between text-gold/70">
            <Link href="/" className="hebrew text-xl transition hover:text-gold" style={{ filter: "drop-shadow(0 0 8px #c9a43e33)" }}>
              חַשְׁמַל
            </Link>
            <Link
              href="/academia/modulo-9"
              className="font-cinzel text-[11px] uppercase tracking-[0.2em] transition hover:text-gold"
            >
              ☰ Mapa
            </Link>
          </div>
          <div className="mt-5 text-center">
            <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-gold/45">
              Módulo 9 · Lección {lesson.n} de {MODULO9.total}
            </p>
            <h1 className="mt-2 font-cinzel text-2xl leading-snug text-parchment sm:text-3xl">
              {lesson.title}
            </h1>
            <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/[0.05] px-3 py-1">
              <span className="hebrew text-sm text-gold">{MODULO9.etapaHe}</span>
              <span className="font-cinzel text-[10px] uppercase tracking-widest text-gold/60">
                {MODULO9.etapa}
              </span>
            </span>
          </div>
        </header>

        <div key={animKey} className="animate-fade-up flex-1">
          {beat === 0 && <BeatApertura lesson={lesson} />}
          {beat === 1 && <BeatEstudio lesson={lesson} />}
          {beat === 2 && <BeatContempla lesson={lesson} />}
          {beat === 3 && <BeatAccion lesson={lesson} />}
          {beat === 4 && (
            <>
              <BeatSello lesson={lesson} next={next} />
              <TareaInput
                tarea={lesson.tarea}
                lessonSlug={lesson.slug}
                onEntregada={lesson.closeModule ? handleTareaEntregada : undefined}
              />
              {/* Botón de cierre de J2 — aparece tras entregar la tarea de L45 */}
              {j2Done && (
                <div className="mt-10 flex flex-col items-center gap-4 text-center">
                  <div className="h-px w-24 bg-gold/30" />
                  <p className="hebrew text-2xl text-gold" dir="rtl" style={{ filter: "drop-shadow(0 0 12px #c9a43e55)" }}>
                    פְּשָׁט וּדְרָשׁ
                  </p>
                  <p className="font-cinzel text-sm uppercase tracking-widest text-gold/70">
                    Terminaste J2 · Leer en profundidad
                  </p>
                  <Link
                    href="/academia/modulo-10"
                    className="mt-2 inline-block rounded-full border-2 border-gold bg-gold/10 px-10 py-4 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20 hover:shadow-[0_0_24px_rgba(201,164,62,0.30)]"
                  >
                    Ir a J3 →
                  </Link>
                </div>
              )}
            </>
          )}
        </div>

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
  const hilos = lesson.hilos.filter((h) => {
    const href = resolveThreadHref9(h);
    if (!href) return true;
    // Si el hilo apunta a la siguiente lección, no lo mostramos en el chip.
    if (next && href === `/academia/modulo-9/${next.slug}`) return false;
    return true;
  });

  return (
    <div>
      <Rubric he="חֲתִימָה" label="El sello" />

      <div className="mx-auto max-w-xl rounded-2xl border border-gold/25 bg-gold/[0.05] px-6 py-7 text-center">
        <p className="text-lg leading-relaxed text-parchment sm:text-xl">
          <RichText text={lesson.sello} keyPrefix="sl" />
        </p>
      </div>

      {/* cierre de J2 (solo L45) */}
      {lesson.closeModule && (
        <div className="mx-auto mt-7 max-w-xl rounded-2xl border border-gold/20 bg-ink/40 px-6 py-6 text-center">
          <p className="hebrew text-lg text-gold" dir="rtl" style={{ filter: "drop-shadow(0 0 8px #c9a43e44)" }}>
            {MODULO9.auroraHe}
          </p>
          <p className="mt-1 font-cinzel text-[10px] uppercase tracking-[0.25em] text-gold/45">
            Cierre de J2 · Módulo 9 · Leer en profundidad
          </p>
          <p className="mt-4 text-base leading-relaxed text-parchment/85">
            <RichText text={lesson.closeModule} keyPrefix="cm" />
          </p>
        </div>
      )}

      <div className="mt-10 text-center">
        {next ? (
          <>
            <Link
              href={`/academia/modulo-9/${next.slug}`}
              className="inline-block rounded-full border-2 border-gold bg-gold/10 px-9 py-4 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20 hover:shadow-[0_0_24px_rgba(201,164,62,0.25)]"
            >
              Siguiente · L{next.n}: {next.title} →
            </Link>
            <p className="mt-3 text-xs text-muted">Tu próximo escalón ya te espera.</p>
          </>
        ) : (
          <>
            <Link
              href="/academia/modulo-9"
              className="inline-block rounded-full border-2 border-gold bg-gold/10 px-9 py-4 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20 hover:shadow-[0_0_24px_rgba(201,164,62,0.25)]"
            >
              Mapa del Módulo 9 →
            </Link>
            <p className="mt-3 text-xs text-muted">
              Entrega tu tarea — y el cierre de J2 te espera.
            </p>
          </>
        )}
      </div>

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

      <div className="mt-10 text-center">
        <Link
          href="/academia/modulo-9"
          className="font-cinzel text-[11px] uppercase tracking-widest text-parchment/55 underline-offset-4 transition hover:text-gold hover:underline"
        >
          ← Volver al mapa del Módulo 9
        </Link>
      </div>
    </div>
  );
}

function ThreadChip({ hilo }: { hilo: Hilo }) {
  const href = resolveThreadHref9(hilo);

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
