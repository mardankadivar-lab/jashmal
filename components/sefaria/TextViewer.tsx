"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import type { SefariaTextResult } from "@/lib/sources/sefaria";
import type { WordAnchor, WordMenuAnchorEvt } from "./ClickableHebrew";
import VerseText, { type SelectionInfo } from "@/components/study/VerseText";
import VerseNoteEditor from "@/components/study/VerseNoteEditor";
import HighlightMenu, { type HighlightMenuAnchor } from "@/components/study/HighlightMenu";
import {
  highlightsFor,
  noteFor,
  addHighlight,
  clearHighlightsInRange,
  summaryForRef,
  type HighlightColor,
  type Highlight,
  type VerseSide,
} from "@/lib/study/cuaderno";

type StudyDepth = "quick" | "deep";

interface TextViewerProps {
  result: SefariaTextResult | null;
  loading: boolean;
  error: boolean;
  /** Solo en farsi: traducción persa alineada con segments (null = usar inglés). */
  faTranslations?: string[] | null;
  /** Solo en farsi: la traducción persa se está generando. */
  faTranslating?: boolean;
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
  faTranslations = null,
  faTranslating = false,
  studyingIndex,
  onStudyVerse,
  onStudyPassage,
  onWord,
  onWordMenu,
}: TextViewerProps) {
  const t = useTranslations("study");
  const tc = useTranslations("cuaderno");

  const faMode = faTranslations !== null || faTranslating;
  const refBase = result?.ref ?? "";

  // ── Estado del cuaderno (notas + resaltados) ────────────────────────────
  // tick: se incrementa tras cualquier cambio para re-leer localStorage.
  const [tick, setTick] = useState(0);
  const bump = useCallback(() => setTick((n) => n + 1), []);
  // Versículo con su editor de nota abierto (null = ninguno).
  const [openNote, setOpenNote] = useState<number | null>(null);
  // Selección activa → mini-menú de resaltado.
  const [hlAnchor, setHlAnchor] = useState<HighlightMenuAnchor | null>(null);
  const [pendingSel, setPendingSel] = useState<SelectionInfo | null>(null);

  // Cerrar el editor de nota al cambiar de texto fuente.
  useEffect(() => {
    setOpenNote(null);
    setHlAnchor(null);
    setPendingSel(null);
  }, [refBase]);

  // Re-leer si el cuaderno cambia desde otro componente (ej. contador).
  useEffect(() => {
    const onChange = () => bump();
    window.addEventListener("jashmal:cuaderno", onChange);
    return () => window.removeEventListener("jashmal:cuaderno", onChange);
  }, [bump]);

  const handleSelect = useCallback((info: SelectionInfo) => {
    setPendingSel(info);
    setHlAnchor({ x: info.x, y: info.y, hasExisting: info.hasExisting });
  }, []);

  function applyColor(color: HighlightColor) {
    if (!pendingSel || !refBase) return;
    addHighlight({
      ref: refBase,
      verse: pendingSel.verse,
      side: pendingSel.side,
      start: pendingSel.start,
      end: pendingSel.end,
      color,
    });
    try { window.getSelection()?.removeAllRanges(); } catch { /* noop */ }
    setPendingSel(null);
    bump();
  }
  function removeHighlight() {
    if (!pendingSel || !refBase) return;
    clearHighlightsInRange(refBase, pendingSel.verse, pendingSel.side, pendingSel.start, pendingSel.end);
    try { window.getSelection()?.removeAllRanges(); } catch { /* noop */ }
    setPendingSel(null);
    bump();
  }

  if (loading) {
    return <p className="mt-6 animate-pulse text-sm text-muted">{t("loadingText")}</p>;
  }
  if (error) {
    return <p className="mt-6 text-sm text-red-400/80">{t("errorText")}</p>;
  }
  if (!result) return null;

  // Resumen del cuaderno para ESTE texto (contador "Mis apuntes").
  // `tick` fuerza el recálculo tras cada cambio.
  void tick;
  const summary = summaryForRef(refBase);
  const hasNotebook = summary.notes > 0 || summary.highlights > 0;

  // helper: resaltados de una cara de un versículo.
  const hl = (verse: number, side: VerseSide): Highlight[] => highlightsFor(refBase, verse, side);

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-cinzel text-sm uppercase tracking-widest text-gold/80">
          {t("sourceText")}
        </h3>
        <span className="hebrew text-sm text-muted">{result.heRef}</span>
      </div>

      {/* Contador "Mis apuntes" de ESTE estudio — discreto, solo si hay algo. */}
      {hasNotebook && (
        <div className="mt-2 flex items-center gap-3 text-[11px] text-muted/80">
          <span className="font-cinzel uppercase tracking-widest text-gold/55">
            {tc("myNotes")}
          </span>
          {summary.notes > 0 && <span>{tc("notesCount", { n: summary.notes })}</span>}
          {summary.highlights > 0 && <span>{tc("highlightsCount", { n: summary.highlights })}</span>}
        </div>
      )}

      <ol className="mt-3 space-y-2">
        {result.segments.map((seg, i) => {
          const note = noteFor(refBase, i);
          const isNoteOpen = openNote === i;
          return (
            <li
              key={i}
              className="group rounded-md border border-transparent p-2 transition-colors hover:border-gold/15 hover:bg-white/[0.02]"
            >
              <div className="flex items-start gap-3 lg:gap-2">
                <span className="mt-1 select-none text-xs text-gold/50">{i + 1}</span>

                {/* Afordancia de nota: pluma sutil. Visible si hay nota; si no,
                    aparece al pasar el mouse (o siempre tocable en móvil). */}
                <button
                  onClick={() => setOpenNote(isNoteOpen ? null : i)}
                  aria-label={note ? tc("editNoteAria", { n: i + 1 }) : tc("addNoteAria", { n: i + 1 })}
                  aria-expanded={isNoteOpen}
                  className={`mt-0.5 shrink-0 rounded p-0.5 text-sm transition-all ${
                    note
                      ? "text-gold opacity-100"
                      : "text-gold/60 opacity-0 focus:opacity-100 group-hover:opacity-100 lg:opacity-0"
                  }`}
                  title={note ? tc("hasNote") : tc("addNote")}
                >
                  {note ? "✒" : "✎"}
                </button>

                <div className="min-w-0 flex-1">
                  {onWord ? (
                    <VerseText
                      text={seg}
                      verse={i}
                      side="he"
                      highlights={hl(i, "he")}
                      clickableWords
                      dir="rtl"
                      className="hebrew text-xl leading-relaxed text-parchment"
                      onWord={onWord}
                      onWordMenu={onWordMenu}
                      onSelect={handleSelect}
                    />
                  ) : (
                    <VerseText
                      text={seg}
                      verse={i}
                      side="he"
                      highlights={hl(i, "he")}
                      dir="rtl"
                      className="hebrew text-xl leading-relaxed text-parchment"
                      onSelect={handleSelect}
                    />
                  )}

                  {/* Traducción — española/inglesa de Sefaria o persa de Claude. */}
                  {faMode ? (
                    faTranslations && faTranslations[i] ? (
                      <VerseText
                        text={faTranslations[i]}
                        verse={i}
                        side="tr"
                        highlights={hl(i, "tr")}
                        dir="rtl"
                        className="font-vazir mt-1 text-base leading-relaxed text-muted/90"
                        onSelect={handleSelect}
                      />
                    ) : faTranslating ? (
                      <p dir="rtl" className="font-vazir mt-1 animate-pulse text-sm text-muted/60">
                        {t("translating")}
                      </p>
                    ) : (
                      result.translations[i] && (
                        <VerseText
                          text={result.translations[i]}
                          verse={i}
                          side="tr"
                          highlights={hl(i, "tr")}
                          className="mt-1 text-sm italic leading-relaxed text-muted/80"
                          onSelect={handleSelect}
                        />
                      )
                    )
                  ) : (
                    result.translations[i] && (
                      <VerseText
                        text={result.translations[i]}
                        verse={i}
                        side="tr"
                        highlights={hl(i, "tr")}
                        className="mt-1 text-sm italic leading-relaxed text-muted/80"
                        onSelect={handleSelect}
                      />
                    )
                  )}

                  {/* MÓVIL: la nota se expande aquí, bajo el versículo. */}
                  {isNoteOpen && (
                    <div className="mt-2 lg:hidden">
                      <VerseNoteEditor
                        refBase={refBase}
                        verse={i}
                        onChanged={bump}
                        onClose={() => setOpenNote(null)}
                      />
                    </div>
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
              </div>

              {/* ESCRITORIO: la nota vive en el margen, bajo el versículo,
                  alineada con el texto (sangría del número + pluma). */}
              {isNoteOpen && (
                <div className="ms-[2.6rem] mt-2 hidden lg:block">
                  <VerseNoteEditor
                    refBase={refBase}
                    verse={i}
                    onChanged={bump}
                    onClose={() => setOpenNote(null)}
                  />
                </div>
              )}
            </li>
          );
        })}
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
      <p className="mt-1 text-xs text-muted/60">{tc("hint")}</p>

      {/* Mini-menú flotante de resaltado (al seleccionar texto). */}
      <HighlightMenu
        anchor={hlAnchor}
        onPick={applyColor}
        onRemove={removeHighlight}
        onClose={() => { setHlAnchor(null); setPendingSel(null); }}
      />
    </div>
  );
}
