"use client";

// ─────────────────────────────────────────────────────────────────────────
// TareaInput.tsx — componente de entrega de tarea semanal.
// Aparece al final de cada lección del Módulo 1.
//
// Estados:
//   idle      → formulario vacío (sin borrador)
//   draft     → el estudiante está escribiendo (borrador en localStorage)
//   submitted → entregada (solo lectura: respuesta + estado + notas del Sofer)
//
// Si no hay sesión de comunidad: invita a "guardar el camino" (/academia).
// ─────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { type TareaData } from "@/lib/academia/modulo1";
import { markSeen, markComplete } from "@/lib/academia/progress";

// Tipo local del registro de tarea devuelto por la API.
type TareaRecord = {
  id: string;
  semana: number;
  lesson_slug: string;
  texto: string;
  palabras: number;
  status: string;
  sofer_notas: string | null;
  created: string;
};

function draftKey(lessonSlug: string) {
  return `tarea_draft_${lessonSlug}`;
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function statusLabel(status: string): { text: string; color: string } {
  switch (status) {
    case "revisada":
      return { text: "Revisada por el Sofer", color: "text-amber-300/90" };
    case "aprobada":
      return { text: "Aprobada", color: "text-emerald-300/90" };
    default:
      return { text: "Entregada — en espera de revisión", color: "text-gold/70" };
  }
}

export default function TareaInput({
  tarea,
  lessonSlug,
  onEntregada,
}: {
  tarea: TareaData;
  lessonSlug: string;
  onEntregada?: () => void;
}) {
  const [sessionChecked, setSessionChecked] = useState(false);
  const [hasSession, setHasSession] = useState(false);

  const [texto, setTexto] = useState("");
  const [submitted, setSubmitted] = useState<TareaRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [flash, setFlash] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const palabras = countWords(texto);

  // ── Verificar sesión y cargar estado ──────────────────────────────────

  useEffect(() => {
    let cancelled = false;

    async function init() {
      // Consultar el endpoint de tarea para ver si hay sesión activa y si ya entregó.
      const res = await fetch(`/api/academia/tarea?semana=${tarea.semana}`).catch(() => null);

      if (cancelled) return;

      if (!res) {
        // Error de red — tratar como sin sesión (no bloquear UI).
        setSessionChecked(true);
        setLoading(false);
        return;
      }

      if (res.status === 401) {
        // Sin sesión.
        setHasSession(false);
        setSessionChecked(true);
        setLoading(false);
        return;
      }

      setHasSession(true);
      setSessionChecked(true);

      const data = await res.json().catch(() => ({ tarea: null }));
      if (data.tarea) {
        setSubmitted(data.tarea as TareaRecord);
      } else {
        // Recuperar borrador de localStorage.
        const draft =
          typeof window !== "undefined"
            ? window.localStorage.getItem(draftKey(lessonSlug))
            : null;
        if (draft) setTexto(draft);
      }

      setLoading(false);
    }

    init();
    return () => { cancelled = true; };
  }, [tarea.semana, lessonSlug]);

  // ── Guardar borrador automáticamente ──────────────────────────────────

  useEffect(() => {
    if (submitted || !sessionChecked) return;
    if (typeof window === "undefined") return;
    if (texto) {
      window.localStorage.setItem(draftKey(lessonSlug), texto);
    } else {
      window.localStorage.removeItem(draftKey(lessonSlug));
    }
  }, [texto, lessonSlug, submitted, sessionChecked]);

  // ── Marcar la lección como vista ──────────────────────────────────────
  // (La lección queda "vista" al llegar al sello; se marca "completa" al entregar.)

  // ── Entregar tarea ─────────────────────────────────────────────────────

  async function handleSubmit() {
    setError(null);
    if (palabras < 50) {
      setError("Escribe al menos 50 palabras antes de entregar.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/academia/tarea", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          semana: tarea.semana,
          lessonSlug,
          texto,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.error === "already_submitted") {
          setSubmitted(data.tarea as TareaRecord);
        } else {
          setError(
            data.error === "too_short"
              ? "El texto es muy corto. Escribe al menos 50 palabras."
              : "No se pudo entregar. Intenta de nuevo.",
          );
        }
        return;
      }
      // Limpiar borrador y marcar lección completa.
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(draftKey(lessonSlug));
      }
      markComplete(lessonSlug);
      setSubmitted(data.tarea as TareaRecord);
      setFlash("Tarea entregada. El Sofer la leerá pronto.");
      onEntregada?.();
    } catch {
      setError("Error de red. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  }

  // ── Estados de carga ───────────────────────────────────────────────────

  if (!sessionChecked || loading) {
    return (
      <TareaShell tarea={tarea}>
        <div className="h-24 animate-pulse rounded-xl bg-gold/[0.05]" />
      </TareaShell>
    );
  }

  // Sin sesión: invitar a entrar.
  if (!hasSession) {
    return (
      <TareaShell tarea={tarea}>
        <div className="rounded-xl border border-gold/20 bg-gold/[0.04] px-5 py-5 text-center">
          <p className="text-sm leading-relaxed text-parchment/80">
            Para entregar tareas y que el Sofer las revise, primero guarda tu camino en la
            Academia.
          </p>
          <Link
            href="/academia"
            className="mt-4 inline-block rounded-full border border-gold/50 px-6 py-2.5 font-cinzel text-xs uppercase tracking-widest text-gold transition-all hover:border-gold hover:bg-gold/10"
          >
            Guardar mi camino →
          </Link>
        </div>
      </TareaShell>
    );
  }

  // Ya entregada: modo lectura.
  if (submitted) {
    const { text: statusText, color: statusColor } = statusLabel(submitted.status);
    return (
      <TareaShell tarea={tarea}>
        {flash && (
          <p className="mb-4 rounded-lg border border-gold/20 bg-gold/[0.05] px-4 py-2.5 text-sm text-gold/90">
            {flash}
          </p>
        )}
        <div className="rounded-xl border border-gold/20 bg-gold/[0.04] px-5 py-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className={`font-cinzel text-[11px] uppercase tracking-widest ${statusColor}`}>
              {statusText}
            </span>
            <span className="text-[11px] text-muted/60">
              {submitted.palabras} palabras · {new Date(submitted.created).toLocaleDateString()}
            </span>
          </div>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-parchment/85">
            {submitted.texto}
          </p>
          {submitted.sofer_notas && (
            <div className="rounded-lg border border-gold/15 bg-ink/40 px-4 py-3">
              <p className="mb-1 font-cinzel text-[10px] uppercase tracking-widest text-gold/55">
                Notas del Sofer
              </p>
              <p className="text-sm leading-relaxed text-parchment/80">{submitted.sofer_notas}</p>
            </div>
          )}
        </div>
      </TareaShell>
    );
  }

  // Formulario de entrega.
  const withinRange = palabras >= tarea.palabrasMin && palabras <= tarea.palabrasMax;
  const overMax = palabras > tarea.palabrasMax;

  return (
    <TareaShell tarea={tarea}>
      <div className="space-y-4">
        <textarea
          ref={textareaRef}
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Escribe tu respuesta aquí…"
          rows={8}
          className="w-full resize-none rounded-xl border border-gold/25 bg-white/[0.03] px-4 py-3 text-sm leading-relaxed text-parchment placeholder:text-muted/40 focus:border-gold/50 focus:outline-none"
        />

        {/* contador de palabras */}
        <div className="flex items-center justify-between gap-3">
          <span
            className={`font-cinzel text-[11px] uppercase tracking-widest ${
              withinRange
                ? "text-emerald-300/80"
                : overMax
                  ? "text-amber-300/80"
                  : "text-muted/60"
            }`}
          >
            {palabras} / {tarea.palabrasMin}–{tarea.palabrasMax} palabras
          </span>
          {texto && !submitted && (
            <span className="text-[10px] text-muted/50 italic">borrador guardado</span>
          )}
        </div>

        {error && <p className="text-sm text-red-400/80">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={submitting || palabras < 50}
          className="rounded-full border border-gold/50 bg-gold/[0.06] px-8 py-3 font-cinzel text-xs font-bold uppercase tracking-widest text-gold transition-all hover:border-gold hover:bg-gold/15 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {submitting ? "Entregando…" : "Entregar tarea"}
        </button>
      </div>
    </TareaShell>
  );
}

// ── Shell compartida ──────────────────────────────────────────────────────

function TareaShell({
  tarea,
  children,
}: {
  tarea: TareaData;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-14 border-t border-gold/15 pt-10">
      {/* cabecera de la tarea */}
      <div className="mb-6 text-center">
        <div className="mb-2 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-gold/25" />
          <span className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-gold/50">
            Tarea de la semana {tarea.semana}
          </span>
          <span className="h-px w-8 bg-gold/25" />
        </div>
        <p className="text-xs text-muted/70">
          Herramienta: <span className="text-parchment/70">{tarea.herramienta}</span>
        </p>
      </div>

      {/* enunciado */}
      <div className="mb-6 rounded-xl border border-gold/15 bg-gold/[0.04] px-5 py-4">
        <p className="text-sm leading-relaxed text-parchment/85">{tarea.enunciado}</p>
        <p className="mt-2 text-[11px] text-muted/60">
          {tarea.palabrasMin}–{tarea.palabrasMax} palabras
        </p>
      </div>

      {children}
    </div>
  );
}
