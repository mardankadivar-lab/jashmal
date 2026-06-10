"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import StudyResult from "./StudyResult";
import { requestStudy, StudyError } from "@/lib/study/studyClient";

export interface ConceptTarget {
  kind: "concept" | "letter" | "connection";
  value: string;
  label: string;
  // Solo para kind "connection" (Mente Cósmica relacional V3): la relación
  // entre dos nodos + el camino recorrido (breadcrumb visible en modo estudio).
  connection?: {
    fromId: string;
    toId: string;
    fromLabel: string;
    toLabel: string;
    pathLabels?: string[];
  };
}

interface ConceptPanelProps {
  target: ConceptTarget | null;
  onClose: () => void;
  onBack?: () => void;       // volver al panel anterior (existe si hay historial)
  historyDepth?: number;     // cuántos paneles hay debajo (para el indicador)
  onConcept: (term: string) => void;
  onLetter?: (key: string, label: string) => void;
}

// Panel lateral que estudia un concepto o una letra SIN abandonar el estudio
// principal. Soporta stack: clic en un concepto dentro del panel apila uno nuevo
// y el botón ← vuelve al anterior, igual que la navegación de Sefaria.
export default function ConceptPanel({
  target,
  onClose,
  onBack,
  historyDepth = 0,
  onConcept,
  onLetter,
}: ConceptPanelProps) {
  const locale = useLocale();
  const t = useTranslations("study");
  const tl = useTranslations("lexicon");

  const [study, setStudy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!target) return;
    let cancelled = false;
    setStudy(null);
    setError(null);
    const body =
      target.kind === "letter"
        ? { mode: "letter" as const, locale, letter: target.value, saveTitle: target.label }
        : target.kind === "connection" && target.connection
          ? {
              // Estudio CONTEXTUAL de una conexión: el servidor busca la
              // curaduría del edge y estudia LA RELACIÓN, no el nodo general.
              mode: "concept" as const,
              locale,
              term: target.label,
              context: "connection",
              connection: target.connection,
              saveTitle: target.label,
            }
          : { mode: "concept" as const, locale, term: target.value, saveTitle: target.label };
    requestStudy(body)
      .then((res) => !cancelled && setStudy(res.study))
      .catch((err) => {
        if (cancelled) return;
        const code = err instanceof StudyError ? err.code : "study_failed";
        setError(code === "rate_limited" ? t("rateLimited") : t("errorStudy"));
      });
    return () => { cancelled = true; };
  }, [target, locale, t]);

  // Escape: si hay historial, ir atrás; si no, cerrar.
  useEffect(() => {
    if (!target) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onBack ? onBack() : onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [target, onBack, onClose]);

  if (!target) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
      {/* Fondo: si hay historial, clic en fondo = volver (no cerrar todo) */}
      <button
        className="absolute inset-0 bg-black/60"
        onClick={onBack ?? onClose}
        aria-label={onBack ? "Volver" : tl("close")}
      />

      <div className="relative z-10 h-full w-full max-w-lg overflow-y-auto border-s border-gold/25 bg-ink p-6 shadow-2xl">
        {/* Cabecera con navegación de stack */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            {/* Botón ← volver cuando hay paneles anteriores */}
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-gold"
              >
                ← <span className="font-cinzel uppercase tracking-wide">Volver</span>
                {historyDepth > 1 && (
                  <span className="rounded-full bg-gold/15 px-1.5 py-0.5 text-gold/70">
                    {historyDepth}
                  </span>
                )}
              </button>
            )}
            <h2 className="font-cinzel text-xl text-gold">{target.label}</h2>
            {/* Breadcrumb contextual en modo estudio: el camino que trajo aquí */}
            {target.kind === "connection" &&
              target.connection &&
              (target.connection.pathLabels?.length ?? 0) >= 2 && (
                <p className="text-[11px] tracking-wide text-gold/55">
                  {target.connection.pathLabels!.join(" → ")}
                </p>
              )}
          </div>
          {/* Cerrar todo */}
          <button
            onClick={onClose}
            className="shrink-0 rounded-full border border-gold/30 px-3 py-1 text-sm text-muted transition-colors hover:text-gold"
            title="Cerrar todo"
          >
            {tl("close")}
          </button>
        </div>

        {!study && !error && (
          <p className="mt-8 animate-pulse text-sm text-muted">{t("generating")}</p>
        )}
        {error && <p className="mt-8 text-sm text-red-400/80">{error}</p>}
        {study && (
          <div className="mt-6">
            <StudyResult
              text={study}
              onConcept={onConcept}
              onLetter={onLetter}
            />
          </div>
        )}
      </div>
    </div>
  );
}
