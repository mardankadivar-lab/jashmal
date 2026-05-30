"use client";

import { useTranslations } from "next-intl";
import type { SefariaTextResult } from "@/lib/sefaria";

interface TextViewerProps {
  result: SefariaTextResult | null;
  loading: boolean;
  error: boolean;
  studyingIndex: number | null;
  onStudyVerse: (index: number) => void;
  onStudyPassage: () => void;
}

export default function TextViewer({
  result,
  loading,
  error,
  studyingIndex,
  onStudyVerse,
  onStudyPassage,
}: TextViewerProps) {
  const t = useTranslations("study");

  if (loading) {
    return <p className="mt-6 animate-pulse text-sm text-muted">{t("loadingText")}</p>;
  }
  if (error) {
    return <p className="mt-6 text-sm text-red-400/80">{t("errorText")}</p>;
  }
  if (!result) return null;

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-cinzel text-sm uppercase tracking-widest text-gold/80">
          {t("sourceText")}
        </h3>
        <span className="hebrew text-sm text-muted">{result.heRef}</span>
      </div>

      <ol className="mt-3 space-y-2">
        {result.segments.map((seg, i) => (
          <li
            key={i}
            className="group flex items-start gap-3 rounded-md border border-transparent p-2 transition-colors hover:border-gold/15 hover:bg-white/[0.02]"
          >
            <span className="mt-1 select-none text-xs text-gold/50">{i + 1}</span>
            <p className="hebrew flex-1 text-xl leading-relaxed text-parchment">{seg}</p>
            <button
              onClick={() => onStudyVerse(i)}
              className="mt-1 shrink-0 rounded-full border border-gold/30 px-3 py-1 text-xs text-gold opacity-0 transition-opacity hover:bg-gold/10 group-hover:opacity-100"
              disabled={studyingIndex !== null}
            >
              {t("studyVerse")}
            </button>
          </li>
        ))}
      </ol>

      <button
        onClick={onStudyPassage}
        disabled={studyingIndex !== null}
        className="mt-5 rounded-full border border-gold/60 px-6 py-2 font-cinzel text-sm uppercase tracking-widest text-gold transition-all hover:bg-gold/10 disabled:opacity-40"
      >
        {t("studyPassage")}
      </button>
    </div>
  );
}
