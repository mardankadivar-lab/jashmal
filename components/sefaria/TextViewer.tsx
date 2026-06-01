"use client";

import { useTranslations } from "next-intl";
import type { SefariaTextResult } from "@/lib/sefaria";
import ClickableHebrew, { type WordAnchor, type WordMenuAnchorEvt } from "./ClickableHebrew";

type StudyDepth = "quick" | "deep";

interface TextViewerProps {
  result: SefariaTextResult | null;
  loading: boolean;
  error: boolean;
  studyingIndex: number | null;
  onStudyVerse: (index: number, depth: StudyDepth) => void;
  onStudyPassage: (depth: StudyDepth) => void;
  onWord?: (anchor: WordAnchor) => void;
  onWordMenu?: (anchor: WordMenuAnchorEvt) => void;
}

export default function TextViewer({
  result,
  loading,
  error,
  studyingIndex,
  onStudyVerse,
  onStudyPassage,
  onWord,
  onWordMenu,
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
            <div className="flex-1">
              {onWord ? (
                <ClickableHebrew
                  text={seg}
                  onWord={onWord}
                  onWordMenu={onWordMenu}
                  className="hebrew text-xl leading-relaxed text-parchment"
                />
              ) : (
                <p className="hebrew text-xl leading-relaxed text-parchment">{seg}</p>
              )}
              {/* Traducción en inglés — esencial para audiencia que no lee hebreo */}
              {result.translations[i] && (
                <p className="mt-1 text-sm leading-relaxed text-muted/80 italic">
                  {result.translations[i]}
                </p>
              )}
            </div>
            <div className="mt-1 flex shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                onClick={() => onStudyVerse(i, "quick")}
                className="rounded-full border border-gold/30 px-3 py-1 text-xs text-gold transition-all hover:bg-gold/10 disabled:opacity-40"
                disabled={studyingIndex !== null}
                title={t("quickHint")}
              >
                {t("studyVerse")}
              </button>
              <button
                onClick={() => onStudyVerse(i, "deep")}
                className="rounded-full border border-gold/50 bg-gold/5 px-3 py-1 text-xs text-gold-soft transition-all hover:bg-gold/15 disabled:opacity-40"
                disabled={studyingIndex !== null}
                title={t("deepHint")}
              >
                {t("studyVerseDeep")}
              </button>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <button
          onClick={() => onStudyPassage("quick")}
          disabled={studyingIndex !== null}
          className="rounded-full border border-gold/40 px-5 py-2 font-cinzel text-xs uppercase tracking-widest text-gold transition-all hover:bg-gold/10 disabled:opacity-40"
          title={t("quickHint")}
        >
          {t("studyPassage")}
        </button>
        <button
          onClick={() => onStudyPassage("deep")}
          disabled={studyingIndex !== null}
          className="rounded-full border border-gold bg-gold/10 px-5 py-2 font-cinzel text-xs uppercase tracking-widest text-gold-soft transition-all hover:bg-gold/20 disabled:opacity-40"
          title={t("deepHint")}
        >
          {t("studyPassageDeep")}
        </button>
      </div>
      <p className="mt-2 text-xs text-muted/70">{t("depthNote")}</p>
      {onWord && <p className="mt-1 text-xs text-muted/60">{t("wordHint")}</p>}
    </div>
  );
}
