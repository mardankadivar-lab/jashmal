"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { LESSONS, MODULO1 } from "@/lib/academia/modulo1";
import { readProgress, nextOpenSlug, allComplete, M1_EVENT, type M1Progress } from "@/lib/academia/progress";
// seen (llegó al sello, pendiente de entregar tarea) → borde dorado outline
// completed (tarea entregada) → relleno dorado

// El mapa del Módulo 1: la escalera de las 6 lecciones. El alumno SIEMPRE ve cuál
// completó, cuál sigue (la próxima piedra, encendida) y su grado actual (Talmid).
export default function Modulo1Map() {
  // Evitamos parpadeo SSR: el progreso se lee tras montar.
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

  const completed = prog?.completed ?? [];
  const seen = prog?.seen ?? [];
  const doneCount = LESSONS.filter((l) => completed.includes(l.slug)).length;
  const current = prog ? nextOpenSlug(prog) : null; // próxima piedra (null = todo hecho)
  const finished = prog ? allComplete(prog) : false;
  const pct = (doneCount / MODULO1.total) * 100;

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
          <Link href="/academia" className="font-cinzel text-[11px] uppercase tracking-[0.2em] transition hover:text-gold">
            El Umbral
          </Link>
        </div>

        {/* grado actual + módulo */}
        <div className="mt-8 text-center">
          <p className="hebrew text-5xl text-gold" dir="rtl" style={{ filter: "drop-shadow(0 0 14px #c9a43e55)" }}>
            {MODULO1.etapaHe}
          </p>
          <p className="mt-2 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/70">
            {MODULO1.etapa} · {MODULO1.etapaGloss}
          </p>
          <p className="mt-1 text-xs text-muted">
            Grado {MODULO1.etapaNum} de {MODULO1.etapasTotal} — estás donde empiezan los grandes.
          </p>

          <div className="mt-7">
            <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-gold/45">
              Módulo 1 · <span className="hebrew text-gold/70">{MODULO1.he}</span>
            </p>
            <h1 className="mt-1 font-cinzel text-2xl text-parchment sm:text-3xl">{MODULO1.titulo}</h1>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
              Seis lecciones guiadas. Una piedra a la vez — siempre sabrás cuál es la próxima.
            </p>
          </div>
        </div>

        {/* progreso */}
        <div className="mt-8">
          <div className="flex items-center justify-between font-cinzel text-[10px] uppercase tracking-[0.2em] text-gold/55">
            <span>{doneCount} de {MODULO1.total} lecciones</span>
            <span className="hebrew text-gold/50" dir="rtl">{MODULO1.auroraHe}</span>
          </div>
          <div className="mt-2 h-[3px] w-full rounded-full bg-gold/10">
            <div className="h-full rounded-full bg-gold transition-all duration-700 ease-out" style={{ width: `${pct}%`, boxShadow: "0 0 8px #c9a43e" }} />
          </div>
        </div>

        {/* banner de finalización */}
        {finished && (
          <div className="mt-8 rounded-2xl border border-gold/30 bg-gold/[0.07] px-6 py-6 text-center">
            <p className="text-lg text-gold">Completaste el Módulo 1 🕯️</p>
            <p className="mt-2 text-sm leading-relaxed text-parchment/80">
              Sabes qué es la Torá y el Tanaj, lees una cita, reconoces el alefato, entiendes PaRDeS y
              leíste un versículo en los cuatro niveles. La aurora ya empezó a crecer.
            </p>
            <p className="mt-3 text-xs text-muted">
              Módulo 2 · <span className="hebrew text-gold/70">אוֹתִיּוֹת</span> Las letras vivas — llega pronto.
            </p>
          </div>
        )}

        {/* la escalera de las 6 lecciones */}
        <ol className="mt-8 flex flex-col gap-3">
          {LESSONS.map((l) => {
            const isDone = completed.includes(l.slug);
            const isSeen = !isDone && seen.includes(l.slug);
            const isCurrent = !finished && current === l.slug;
            return (
              <li key={l.slug}>
                <Link
                  href={`/academia/modulo-1/${l.slug}`}
                  className={`group flex items-center gap-4 rounded-2xl border px-4 py-4 transition-all ${
                    isCurrent
                      ? "border-gold/55 bg-gold/[0.08] shadow-[0_0_22px_rgba(201,164,62,0.18)]"
                      : isDone
                      ? "border-gold/20 bg-gold/[0.03] hover:border-gold/40"
                      : isSeen
                      ? "border-gold/35 bg-gold/[0.04] hover:border-gold/50"
                      : "border-gold/12 bg-ink/30 hover:border-gold/30"
                  }`}
                >
                  {/* número / estado:
                      completed → círculo relleno dorado con ✓
                      seen      → círculo con borde dorado y número (sin relleno)
                      current   → círculo relleno dorado con número
                      rest      → círculo tenue */}
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-cinzel text-sm ${
                      isCurrent
                        ? "bg-gold text-ink"
                        : isDone
                        ? "bg-gold/20 text-gold"
                        : isSeen
                        ? "border-2 border-gold/70 bg-transparent text-gold"
                        : "bg-gold/10 text-gold/60"
                    }`}
                  >
                    {isDone ? "✓" : l.n}
                  </span>

                  {/* título + fuente */}
                  <span className="min-w-0 flex-1">
                    <span className={`block text-base leading-snug ${isCurrent || isDone || isSeen ? "text-parchment" : "text-parchment/70"}`}>
                      {l.title}
                    </span>
                    <span className="mt-0.5 block truncate text-[11px] text-muted/70">{l.fuentes[0]}</span>
                  </span>

                  {/* etiqueta de acción */}
                  <span className="shrink-0 font-cinzel text-[10px] uppercase tracking-widest">
                    {isCurrent ? (
                      <span className="rounded-full bg-gold/15 px-3 py-1 text-gold">
                        {doneCount === 0 ? "Empieza aquí →" : "Continuar →"}
                      </span>
                    ) : isDone ? (
                      <span className="text-gold/55">Repasar</span>
                    ) : isSeen ? (
                      <span className="rounded-full border border-gold/40 px-3 py-1 text-gold/70">
                        Tarea pendiente
                      </span>
                    ) : (
                      <span className="text-muted/50">más adelante</span>
                    )}
                  </span>
                </Link>
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
