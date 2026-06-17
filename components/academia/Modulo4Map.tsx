"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { LESSONS4, MODULO4 } from "@/lib/academia/modulo4";
import { LESSONS3 } from "@/lib/academia/modulo3";
import { readProgress, isModuleComplete, M1_EVENT, type M1Progress } from "@/lib/academia/progress";

// M4 se desbloquea cuando los 4 slugs de M3 están completados.
const M3_SLUGS = [
  "los-siete-dias",
  "el-jardin-adam-java",
  "noaj-y-el-arco",
  "lej-leja-avraham",
];

// Mapa del Módulo 4 — las 5 lecciones de Rashi / S1 (semanas 17–21).
export default function Modulo4Map() {
  const [prog, setProg] = useState<M1Progress | null>(null);

  useEffect(() => {
    const refresh = () => setProg(readProgress());
    refresh();
    window.addEventListener(M1_EVENT, refresh);
    window.addEventListener("focus", refresh);
    return () => {
      window.removeEventListener(M1_EVENT, refresh);
      window.removeEventListener("focus", refresh);
    };
  }, []);

  const m3Complete = prog ? isModuleComplete(M3_SLUGS) : false;

  const completed = prog?.completed ?? [];
  const seen = prog?.seen ?? [];
  const doneCount = m3Complete
    ? LESSONS4.filter((l) => completed.includes(l.slug)).length
    : 0;
  const pct = (doneCount / MODULO4.total) * 100;

  const current = m3Complete
    ? LESSONS4.find((l) => !completed.includes(l.slug))?.slug ?? null
    : null;
  const m4AllDone = m3Complete && LESSONS4.every((l) => completed.includes(l.slug));

  return (
    <div className="relative min-h-screen overflow-hidden" dir="ltr">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% 18%, rgba(201,164,62,0.08) 0%, rgba(5,5,10,0) 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-2xl px-6 py-12">
        {/* cabecera */}
        <div className="flex items-center justify-between text-gold/70">
          <Link href="/" className="hebrew text-xl transition hover:text-gold" style={{ filter: "drop-shadow(0 0 8px #c9a43e33)" }}>
            חַשְׁמַל
          </Link>
          <Link href="/academia/modulo-3" className="font-cinzel text-[11px] uppercase tracking-[0.2em] transition hover:text-gold">
            ← Módulo 3
          </Link>
        </div>

        {/* indicador de cambio de nivel — primer módulo de SHOEL */}
        <div className="mt-6 text-center">
          <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-gold/50">
            Nivel:{" "}
            <span className="hebrew text-gold/80">שׁוֹאֵל</span>{" "}
            <span className="text-gold/70">Shoel</span> — El que pregunta
          </p>
        </div>

        {/* grado actual + módulo */}
        <div className="mt-4 text-center">
          <p className="hebrew text-5xl text-gold" dir="rtl" style={{ filter: "drop-shadow(0 0 14px #c9a43e55)" }}>
            {MODULO4.etapaHe}
          </p>
          <p className="mt-2 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/70">
            {MODULO4.etapa} · {MODULO4.etapaGloss}
          </p>
          <p className="mt-1 text-xs text-muted">
            Grado {MODULO4.etapaNum} de {MODULO4.etapasTotal} — el primer módulo del segundo año.
          </p>

          <div className="mt-7">
            <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-gold/45">
              Módulo 4 · <span className="hebrew text-gold/70">{MODULO4.he}</span>
            </p>
            <h1 className="mt-1 font-cinzel text-2xl text-parchment sm:text-3xl">{MODULO4.titulo}</h1>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
              Cinco lecciones con Rashi: quién fue, su método, el comentario más famoso, Pshat vs. Drash, y la primera lectura en dos voces.
            </p>
          </div>
        </div>

        {/* aviso de bloqueo si M3 no está completo */}
        {!m3Complete && (
          <div className="mt-8 rounded-2xl border border-gold/20 bg-gold/[0.04] px-6 py-6 text-center">
            <p className="text-base text-parchment/80">
              Completa el Módulo 3 para desbloquear a Rashi.
            </p>
            <p className="mt-2 text-sm text-muted">
              Entrega las tareas de las 4 lecciones del Módulo 3 — cada una abre la siguiente puerta.
            </p>
            <div className="mt-5">
              <Link
                href="/academia/modulo-3"
                className="inline-block rounded-full border border-gold/50 bg-gold/[0.06] px-7 py-3 font-cinzel text-xs uppercase tracking-widest text-gold transition-all hover:border-gold hover:bg-gold/15"
              >
                Ir al Módulo 3 →
              </Link>
            </div>
          </div>
        )}

        {/* progreso (solo visible si M3 está completo) */}
        {m3Complete && (
          <div className="mt-8">
            <div className="flex items-center justify-between font-cinzel text-[10px] uppercase tracking-[0.2em] text-gold/55">
              <span>{doneCount} de {MODULO4.total} lecciones</span>
              <span className="hebrew text-gold/50" dir="rtl">{MODULO4.auroraHe}</span>
            </div>
            <div className="mt-2 h-[3px] w-full rounded-full bg-gold/10">
              <div className="h-full rounded-full bg-gold transition-all duration-700 ease-out" style={{ width: `${pct}%`, boxShadow: "0 0 8px #c9a43e" }} />
            </div>
          </div>
        )}

        {/* banner de finalización de S1 */}
        {m4AllDone && (
          <div className="mt-8 rounded-2xl border border-gold/40 bg-gold/[0.07] px-6 py-7 text-center">
            <p className="hebrew text-3xl text-gold" dir="rtl" style={{ filter: "drop-shadow(0 0 14px #c9a43e55)" }}>
              שׁוֹאֵל
            </p>
            <p className="mt-3 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/80">
              Completaste el primer módulo de SHOEL
            </p>
            <p className="mt-3 text-sm leading-relaxed text-parchment/80">
              Cinco semanas con Rashi. Ya sabes interrogar el texto.
              El módulo S2 — Pirké Avot — te espera con la ética que sostiene ese estudio.
            </p>
          </div>
        )}

        {/* la escalera de las 5 lecciones */}
        <ol className="mt-8 flex flex-col gap-3">
          {LESSONS4.map((l) => {
            const isDone = m3Complete && completed.includes(l.slug);
            const isSeenLesson = m3Complete && !isDone && seen.includes(l.slug);
            const isCurrent = m3Complete && !m4AllDone && current === l.slug;
            const isLocked = !m3Complete;

            return (
              <li key={l.slug}>
                {isLocked ? (
                  <div
                    className="flex cursor-not-allowed items-center gap-4 rounded-2xl border border-gold/10 bg-ink/20 px-4 py-4 opacity-50"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/8 font-cinzel text-sm text-gold/40">
                      {l.n}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-base leading-snug text-parchment/40">
                        {l.title}
                      </span>
                    </span>
                    <span className="shrink-0 font-cinzel text-[10px] uppercase tracking-widest text-muted/40">
                      bloqueado
                    </span>
                  </div>
                ) : (
                  <Link
                    href={`/academia/modulo-4/${l.slug}`}
                    className={`group flex items-center gap-4 rounded-2xl border px-4 py-4 transition-all ${
                      isCurrent
                        ? "border-gold/55 bg-gold/[0.08] shadow-[0_0_22px_rgba(201,164,62,0.18)]"
                        : isDone
                        ? "border-gold/20 bg-gold/[0.03] hover:border-gold/40"
                        : isSeenLesson
                        ? "border-gold/35 bg-gold/[0.04] hover:border-gold/50"
                        : "border-gold/12 bg-ink/30 hover:border-gold/30"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-cinzel text-sm ${
                        isCurrent
                          ? "bg-gold text-ink"
                          : isDone
                          ? "bg-gold/20 text-gold"
                          : isSeenLesson
                          ? "border-2 border-gold/70 bg-transparent text-gold"
                          : "bg-gold/10 text-gold/60"
                      }`}
                    >
                      {isDone ? "✓" : l.n}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className={`block text-base leading-snug ${isCurrent || isDone || isSeenLesson ? "text-parchment" : "text-parchment/70"}`}>
                        {l.title}
                      </span>
                      <span className="mt-0.5 block truncate text-[11px] text-muted/70">{l.fuentes[0]}</span>
                    </span>

                    <span className="shrink-0 font-cinzel text-[10px] uppercase tracking-widest">
                      {isCurrent ? (
                        <span className="rounded-full bg-gold/15 px-3 py-1 text-gold">
                          {doneCount === 0 ? "Empieza aquí →" : "Continuar →"}
                        </span>
                      ) : isDone ? (
                        <span className="text-gold/55">Repasar</span>
                      ) : isSeenLesson ? (
                        <span className="rounded-full border border-gold/40 px-3 py-1 text-gold/70">
                          Tarea pendiente
                        </span>
                      ) : (
                        <span className="text-muted/50">más adelante</span>
                      )}
                    </span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>

        {/* puente sereno de vuelta */}
        <div className="mt-10 text-center">
          <Link
            href="/estudio"
            className="font-cinzel text-[11px] uppercase tracking-widest text-parchment/45 underline-offset-4 transition hover:text-gold hover:underline"
          >
            ¿Prefieres explorar por tu cuenta? Entra a la sala de estudio libre →
          </Link>
        </div>
      </div>
    </div>
  );
}
