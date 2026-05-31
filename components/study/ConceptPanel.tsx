"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import StudyResult from "./StudyResult";
import { requestStudy, StudyError } from "@/lib/studyClient";

export interface ConceptTarget {
  kind: "concept" | "letter";
  value: string; // término o nombre de letra
  label: string; // texto a mostrar
}

interface ConceptPanelProps {
  target: ConceptTarget | null;
  onClose: () => void;
  onConcept: (term: string) => void;
}

// Panel lateral (slide-over) que estudia un concepto o una letra SIN abandonar
// el estudio principal — como el panel paralelo de Sefaria.
export default function ConceptPanel({ target, onClose, onConcept }: ConceptPanelProps) {
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
        ? { mode: "letter" as const, locale, letter: target.value }
        : { mode: "concept" as const, locale, term: target.value };
    requestStudy(body)
      .then((res) => !cancelled && setStudy(res.study))
      .catch((err) => {
        if (cancelled) return;
        const code = err instanceof StudyError ? err.code : "study_failed";
        setError(code === "rate_limited" ? t("rateLimited") : t("errorStudy"));
      });
    return () => {
      cancelled = true;
    };
  }, [target, locale, t]);

  useEffect(() => {
    if (!target) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [target, onClose]);

  if (!target) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
      <button className="absolute inset-0 bg-black/60" onClick={onClose} aria-label={tl("close")} />
      <div className="relative z-10 h-full w-full max-w-lg overflow-y-auto border-s border-gold/25 bg-ink p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <h2 className="font-cinzel text-xl text-gold">{target.label}</h2>
          <button
            onClick={onClose}
            className="shrink-0 rounded-full border border-gold/30 px-3 py-1 text-sm text-muted transition-colors hover:text-gold"
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
            <StudyResult text={study} onConcept={onConcept} />
          </div>
        )}
      </div>
    </div>
  );
}
