"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import CategoryNav from "@/components/sefaria/CategoryNav";
import BookBrowser from "@/components/sefaria/BookBrowser";
import TextViewer from "@/components/sefaria/TextViewer";
import StudyResult from "./StudyResult";
import BeitMidrash from "./BeitMidrash";
import LexiconPanel from "./LexiconPanel";
import type { WordAnchor } from "@/components/sefaria/ClickableHebrew";
import { bookRef, type CatBook, type CategoryId } from "@/lib/categories";
import { getText, type SefariaTextResult } from "@/lib/sefaria";
import { requestStudy, StudyError } from "@/lib/studyClient";
import { getParashaHashavua, type ParashaInfo } from "@/lib/calendar";

export default function StudyEngine() {
  const locale = useLocale();
  const t = useTranslations("study");

  const [category, setCategory] = useState<CategoryId | null>(null);
  const [book, setBook] = useState<CatBook | null>(null);

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
  // palabra hebrea + posición para el léxico popup (null = cerrado).
  const [lexiconAnchor, setLexiconAnchor] = useState<WordAnchor | null>(null);
  // unidad (capítulo/daf) actual del libro elegido, para "siguiente capítulo".
  const [currentUnit, setCurrentUnit] = useState<number | null>(null);
  const [currentAmud, setCurrentAmud] = useState<"a" | "b" | undefined>(undefined);
  // parashá de la semana (Sefaria), para el acceso directo.
  const [parasha, setParasha] = useState<ParashaInfo | null>(null);

  useEffect(() => {
    getParashaHashavua().then((p) => p && setParasha(p));
  }, []);

  // Carga inicial desde ?ref= (enlaces como Kohelet 11:1 del Beit Midrash).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const ref = new URLSearchParams(window.location.search).get("ref");
    if (ref) loadRef(ref);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function selectCategory(c: CategoryId) {
    setCategory(c);
    setBook(null);
    setSourceResult(null);
  }

  function selectBook(b: CatBook) {
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
    setCurrentUnit(unit);
    setCurrentAmud(amud);
    loadRef(bookRef(book, unit, amud));
  }

  // Siguiente capítulo/daf del mismo libro (para no perder el hilo).
  function nextUnit() {
    if (!book || currentUnit === null) return;
    if (book.type === "talmud") {
      // daf con amud: a → b, luego siguiente daf a.
      if (currentAmud === "a") return selectUnit(currentUnit, "b");
      return selectUnit(currentUnit + 1, "a");
    }
    const first = 1;
    const last = book.units + (first - 1);
    if (currentUnit >= last) return; // último capítulo
    selectUnit(currentUnit + 1);
  }

  function hasNext(): boolean {
    if (!book || currentUnit === null) return false;
    if (book.type === "talmud") {
      const lastDaf = (book.firstDaf ?? 2) + book.units - 1;
      return currentUnit < lastDaf || currentAmud === "a";
    }
    return currentUnit < book.units;
  }

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = search.trim();
    if (q) loadRef(q);
  }

  async function runStudy(index: number, depth: "quick" | "deep" = "quick") {
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
      const { study: text } = await requestStudy({
        mode: "text",
        locale,
        depth,
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
      const { study: text } = await requestStudy({ mode: "concept", locale, term });
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

        {parasha && parasha.ref && (
          <div className="mt-3 rounded-md border border-gold/30 bg-gold/[0.04] p-2.5">
            <button
              onClick={() => loadRef(parasha.ref)}
              className="flex w-full items-center justify-between text-start text-sm"
            >
              <span className="text-gold/90">
                {t("parashaButton")}:{" "}
                <span className="text-parchment/90">{parasha.name}</span>
              </span>
              <span className="hebrew text-gold/70">{parasha.he}</span>
            </button>
            {parasha.aliyot.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5 border-t border-gold/10 pt-2">
                <span className="self-center text-xs text-muted/70">
                  {t("parashaDays")}:
                </span>
                {parasha.aliyot.map((a) => (
                  <button
                    key={a.day}
                    onClick={() => loadRef(a.ref)}
                    title={a.ref}
                    className="h-7 w-7 rounded-md border border-gold/20 text-xs text-parchment/80 transition-all hover:border-gold/60 hover:bg-gold/10"
                  >
                    {a.day}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

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
          onStudyVerse={(i, depth) => runStudy(i, depth)}
          onStudyPassage={(depth) => runStudy(-1, depth)}
          onWord={(a) => setLexiconAnchor(a)}
        />
      </section>

      {/* Columna derecha: análisis */}
      <section className="lg:border-s lg:border-gold/15 lg:ps-10">
        <h2 className="font-cinzel text-sm uppercase tracking-widest text-gold/80">
          {t("analysis")}
        </h2>

        {studyLoading && (
          <div className="mt-10 flex flex-col items-center py-8">
            {/* Indicador sobrio mientras Claude estudia (sin la gema). */}
            <span className="h-3 w-3 animate-ping rounded-full bg-gold/70" />
            <p className="mt-6 animate-pulse text-center text-sm text-muted">
              {t("generating")}
            </p>
          </div>
        )}
        {studyError && <p className="mt-6 text-sm text-red-400/80">{studyError}</p>}
        {!studyLoading && !studyError && !study && (
          <div className="mt-10 flex flex-col items-center py-6 text-center">
            <p className="hebrew text-2xl text-gold/80">{t("meditationHe")}</p>
            <p className="mt-3 max-w-xs font-cinzel text-sm italic leading-relaxed text-muted">
              {t("meditation")}
            </p>
            <p className="mt-6 text-xs text-muted/70">{t("emptyState")}</p>
          </div>
        )}
        {study && !studyLoading && (
          <div className="mt-6">
            <StudyResult text={study} onConcept={studyConcept} />
            {hasNext() && (
              <div className="mt-8 flex justify-end border-t border-gold/15 pt-4">
                <button
                  onClick={nextUnit}
                  className="rounded-full border border-gold/50 px-5 py-2 font-cinzel text-xs uppercase tracking-widest text-gold transition-all hover:bg-gold/10"
                >
                  {t("nextChapter")} →
                </button>
              </div>
            )}
            {studyRef && <BeitMidrash studyRef={studyRef} />}
          </div>
        )}
      </section>

      <LexiconPanel anchor={lexiconAnchor} onClose={() => setLexiconAnchor(null)} />
    </div>
  );
}
