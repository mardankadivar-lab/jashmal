"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import CategoryNav from "@/components/sefaria/CategoryNav";
import BookBrowser from "@/components/sefaria/BookBrowser";
import TextViewer from "@/components/sefaria/TextViewer";
import StudyResult from "./StudyResult";
import AliyatNitzotzot from "./AliyatNitzotzot";
import BeitMidrash from "./BeitMidrash";
import type { BookDef, CategoryId } from "@/lib/categories";
import { buildRef, getText, type SefariaTextResult } from "@/lib/sefaria";
import { requestStudy, StudyError } from "@/lib/studyClient";

export default function StudyEngine() {
  const locale = useLocale();
  const t = useTranslations("study");

  const [category, setCategory] = useState<CategoryId | null>(null);
  const [book, setBook] = useState<BookDef | null>(null);

  const [sourceResult, setSourceResult] = useState<SefariaTextResult | null>(null);
  const [sourceLoading, setSourceLoading] = useState(false);
  const [sourceError, setSourceError] = useState(false);

  const [search, setSearch] = useState("");

  const [study, setStudy] = useState<string | null>(null);
  const [studyLoading, setStudyLoading] = useState(false);
  const [studyError, setStudyError] = useState<string | null>(null);
  // índice del versículo en curso, o -1 para pasaje completo, o null si inactivo.
  const [studyingIndex, setStudyingIndex] = useState<number | null>(null);
  // identificador del estudio mostrado, para asociar las reflexiones del Beit Midrash.
  const [studyRef, setStudyRef] = useState<string | null>(null);

  function selectCategory(c: CategoryId) {
    setCategory(c);
    setBook(null);
    setSourceResult(null);
  }

  function selectBook(b: BookDef) {
    setBook(b);
    setSourceResult(null);
  }

  async function loadRef(ref: string) {
    setSourceLoading(true);
    setSourceError(false);
    setSourceResult(null);
    setStudy(null);
    setStudyRef(null);
    setStudyError(null);
    try {
      const result = await getText(ref);
      setSourceResult(result);
    } catch {
      setSourceError(true);
    } finally {
      setSourceLoading(false);
    }
  }

  function selectUnit(unit: number, amud?: "a" | "b") {
    if (!book) return;
    loadRef(buildRef(book.id, book.type, unit, amud));
  }

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = search.trim();
    if (q) loadRef(q);
  }

  async function runStudy(index: number) {
    if (!sourceResult) return;
    setStudyingIndex(index);
    setStudyLoading(true);
    setStudyError(null);
    setStudy(null);
    setStudyRef(null);

    const isPassage = index < 0;
    const hebrewText = isPassage
      ? sourceResult.segments.join("\n")
      : sourceResult.segments[index];
    const ref = isPassage
      ? sourceResult.ref
      : `${sourceResult.ref}:${index + 1}`;

    try {
      const text = await requestStudy({
        mode: "text",
        locale,
        ref,
        hebrewText,
      });
      setStudy(text);
      setStudyRef(ref);
    } catch (err) {
      const code = err instanceof StudyError ? err.code : "study_failed";
      setStudyError(code === "rate_limited" ? t("rateLimited") : t("errorStudy"));
    } finally {
      setStudyLoading(false);
      setStudyingIndex(null);
    }
  }

  async function studyConcept(term: string) {
    setStudyingIndex(-2);
    setStudyLoading(true);
    setStudyError(null);
    setStudy(null);
    setStudyRef(null);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
    try {
      const text = await requestStudy({ mode: "concept", locale, term });
      setStudy(text);
      setStudyRef(`concept:${term}`);
    } catch (err) {
      const code = err instanceof StudyError ? err.code : "study_failed";
      setStudyError(code === "rate_limited" ? t("rateLimited") : t("errorStudy"));
    } finally {
      setStudyLoading(false);
      setStudyingIndex(null);
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      {/* Columna izquierda: navegación + fuente */}
      <section>
        <form onSubmit={onSearch} className="flex gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="flex-1 rounded-md border border-gold/25 bg-white/[0.03] px-3 py-2 text-sm text-parchment placeholder:text-muted/70 focus:border-gold/60 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-md border border-gold/50 px-4 py-2 text-sm text-gold transition-all hover:bg-gold/10"
          >
            {t("searchButton")}
          </button>
        </form>

        <div className="mt-6">
          <p className="mb-2 text-sm text-muted">{t("chooseCategory")}</p>
          <CategoryNav selected={category} onSelect={selectCategory} />
        </div>

        {category && (
          <BookBrowser
            category={category}
            selectedBook={book}
            onSelectBook={selectBook}
            onSelectUnit={selectUnit}
          />
        )}

        <TextViewer
          result={sourceResult}
          loading={sourceLoading}
          error={sourceError}
          studyingIndex={studyingIndex}
          onStudyVerse={(i) => runStudy(i)}
          onStudyPassage={() => runStudy(-1)}
        />
      </section>

      {/* Columna derecha: análisis */}
      <section className="lg:border-s lg:border-gold/15 lg:ps-10">
        <h2 className="font-cinzel text-sm uppercase tracking-widest text-gold/80">
          {t("analysis")}
        </h2>

        {studyLoading && (
          <div className="mt-6">
            <AliyatNitzotzot />
            <p className="mt-4 animate-pulse text-center text-sm text-muted">
              {t("generating")}
            </p>
          </div>
        )}
        {studyError && <p className="mt-6 text-sm text-red-400/80">{studyError}</p>}
        {!studyLoading && !studyError && !study && (
          <p className="mt-6 text-sm text-muted">{t("emptyState")}</p>
        )}
        {study && !studyLoading && (
          <div className="mt-6">
            <StudyResult text={study} onConcept={studyConcept} />
            {studyRef && <BeitMidrash studyRef={studyRef} />}
          </div>
        )}
      </section>
    </div>
  );
}
