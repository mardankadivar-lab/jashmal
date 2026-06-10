"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { searchLocal, cidFor, type LocalStudy } from "@/lib/myStudies";
import CategoryNav from "@/components/sefaria/CategoryNav";
import BookBrowser from "@/components/sefaria/BookBrowser";
import TextViewer from "@/components/sefaria/TextViewer";
import StudyResult from "./StudyResult";
import BeitMidrash from "./BeitMidrash";
import LexiconPanel from "./LexiconPanel";
import ConceptPanel, { type ConceptTarget } from "./ConceptPanel";
import StudyChat from "./StudyChat";
import AudioPlayer from "./AudioPlayer";
import WordMenu, { type WordMenuAnchor } from "./WordMenu";
import RefPanel from "./RefPanel";
import type { WordAnchor } from "@/components/sefaria/ClickableHebrew";
import { bookRef, type CatBook, type CategoryId } from "@/lib/categories";
import { getText, searchSuggestions, type SefariaTextResult, type NameSuggestion } from "@/lib/sefaria";
import { requestStudy, StudyError } from "@/lib/studyClient";
import { requestTranslation } from "@/lib/translateClient";
import { getParashaHashavua, type ParashaInfo } from "@/lib/calendar";

// Nodo de la Mente Cósmica para la búsqueda por concepto (subconjunto liviano).
type NodeHit = { id: string; label: string; labelFa?: string; labelEn?: string; url?: string };

export default function StudyEngine() {
  const locale = useLocale();
  const t = useTranslations("study");
  const router = useRouter();

  const [category, setCategory] = useState<CategoryId | null>(null);
  const [book, setBook] = useState<CatBook | null>(null);

  const [sourceResult, setSourceResult] = useState<SefariaTextResult | null>(null);
  const [sourceLoading, setSourceLoading] = useState(false);
  const [sourceError, setSourceError] = useState(false);

  // Solo en farsi: traducción persa del texto fuente (en vez del inglés de Sefaria).
  // null = aún no disponible (se usa el inglés como respaldo). Alineado con segments.
  const [faTranslations, setFaTranslations] = useState<string[] | null>(null);
  const [faTranslating, setFaTranslating] = useState(false);

  const [search, setSearch] = useState("");
  // Autocompletado: sugerencias de Sefaria (refs, libros, temas, personas, lugares).
  const [suggestions, setSuggestions] = useState<NameSuggestion[]>([]);
  const [showSug, setShowSug] = useState(false);
  // Búsqueda por concepto: historial del usuario + nodos de la Mente Cósmica.
  const [historyHits, setHistoryHits] = useState<LocalStudy[]>([]);
  const [nodeHits, setNodeHits] = useState<NodeHit[]>([]);
  // Caché de los nodos de la Mente Cósmica (se baja una sola vez, al teclear).
  const brainNodesRef = useRef<NodeHit[] | null>(null);
  const brainLoadingRef = useRef(false);

  const [study, setStudy] = useState<string | null>(null);
  const [studyLoading, setStudyLoading] = useState(false);
  const [studyError, setStudyError] = useState<string | null>(null);
  // índice del versículo en curso, o -1 para pasaje completo, o null si inactivo.
  const [studyingIndex, setStudyingIndex] = useState<number | null>(null);
  // identificador del estudio mostrado, para asociar las reflexiones del Beit Midrash.
  const [studyRef, setStudyRef] = useState<string | null>(null);
  // palabra hebrea + posición para el léxico popup (null = cerrado).
  const [lexiconAnchor, setLexiconAnchor] = useState<WordAnchor | null>(null);
  // concepto/letra abierto en el panel lateral (sin perder el estudio).
  const [conceptTarget, setConceptTarget] = useState<ConceptTarget | null>(null);
  // historial de paneles de concepto para poder volver al anterior con ←.
  const [conceptHistory, setConceptHistory] = useState<ConceptTarget[]>([]);
  // menú contextual (clic derecho) sobre palabras hebreas.
  const [wordMenu, setWordMenu] = useState<WordMenuAnchor | null>(null);
  // referencias cruzadas abiertas en el panel lateral (encadenables).
  const [openRefs, setOpenRefs] = useState<string[]>([]);
  // historial de refs visitados para el botón ←.
  const [refHistory, setRefHistory] = useState<string[]>([]);
  // ref del chat para enviar mensajes programáticamente (menú contextual).
  const [chatPrefill, setChatPrefill] = useState<string | null>(null);
  // unidad (capítulo/daf) actual del libro elegido, para "siguiente capítulo".
  const [currentUnit, setCurrentUnit] = useState<number | null>(null);
  const [currentAmud, setCurrentAmud] = useState<"a" | "b" | undefined>(undefined);
  // parashá de la semana (Sefaria), para el acceso directo.
  const [parasha, setParasha] = useState<ParashaInfo | null>(null);
  // ref a la columna de análisis, para hacer scroll automático al generar estudio.
  const analysisRef = useRef<HTMLElement | null>(null);
  // ref al panel de referencias, para llevar la vista cuando se abre una ref.
  const refPanelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    getParashaHashavua().then((p) => p && setParasha(p));
  }, []);

  // El RefPanel ahora es flotante (position: fixed) — aparece sobre el contenido
  // sin mover el scroll, así el estudiante no pierde su lugar al cerrarlo.

  // Al cambiar de idioma, limpiar el estudio actual (fue generado en el idioma anterior).
  // El texto fuente y la navegación se mantienen para que el usuario pueda regenerar.
  const prevLocale = useRef(locale);
  useEffect(() => {
    if (prevLocale.current !== locale) {
      prevLocale.current = locale;
      setStudy(null);
      setStudyRef(null);
      setStudyError(null);
      setOpenRefs([]);
    }
  }, [locale]);

  // Solo en farsi: al cargar/cambiar el texto fuente, pedir su traducción persa
  // para mostrar hebreo + persa (en vez de hebreo + inglés). Si falla, se queda
  // el inglés de Sefaria como respaldo (no rompe la página).
  useEffect(() => {
    if (locale !== "fa") { setFaTranslations(null); setFaTranslating(false); return; }
    if (!sourceResult || sourceResult.segments.length === 0) {
      setFaTranslations(null);
      setFaTranslating(false);
      return;
    }
    let cancelled = false;
    setFaTranslations(null);
    setFaTranslating(true);
    requestTranslation({
      ref: sourceResult.ref,
      segments: sourceResult.segments,
      english: sourceResult.translations,
    })
      .then((tr) => { if (!cancelled) setFaTranslations(tr); })
      .finally(() => { if (!cancelled) setFaTranslating(false); });
    return () => { cancelled = true; };
  }, [sourceResult, locale]);

  // Contexto de estudio (normal o cabalístico desde el Árbol)
  const [studyContext, setStudyContext] = useState<{ type: string; sefiraId?: string } | null>(null);

  // Carga inicial desde ?ref= + detectar contexto cabalístico
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    const context = params.get("context");
    const sefiraId = params.get("sefira");
    if (ref) loadRef(ref);
    if (context === "kabbalah" && sefiraId) {
      setStudyContext({ type: "kabbalah", sefiraId });
    }
    // ?concept= → abre un estudio de concepto (desde la galería de Gematría, etc.)
    const concept = params.get("concept");
    if (concept) {
      setTimeout(() => openConcept(concept), 50);
    }
    // ?connFrom=&connTo=(&connPath=a|b|c) → estudio CONTEXTUAL de una conexión
    // de la Mente Cósmica ("Jesed en relación con Abraham"), no del nodo general.
    const connFrom = params.get("connFrom");
    const connTo = params.get("connTo");
    if (connFrom && connTo) {
      const connPath = (params.get("connPath") ?? "").split("|").filter(Boolean);
      setTimeout(() => void openConnection(connFrom, connTo, connPath.length >= 2 ? connPath : undefined), 50);
    }
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

  async function loadRef(ref: string, addToHistory = false) {
    // Si hay un texto fuente actual, lo guardamos en el historial antes de navegar.
    if (addToHistory && sourceResult?.ref) {
      setRefHistory((h) => [...h, sourceResult.ref]);
    }
    setSourceLoading(true);
    setSourceError(false);
    setSourceResult(null);
    setStudy(null);
    setStudyRef(null);
    setStudyError(null);
    setOpenRefs([]);
    // Guardar el ref en la URL para que el refresco no pierda el lugar.
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("ref", ref);
      window.history.replaceState(null, "", url.toString());
    }
    try {
      const result = await getText(ref);
      setSourceResult(result);
    } catch {
      setSourceError(true);
    } finally {
      setSourceLoading(false);
    }
  }

  // Volver al ref anterior (botón ←).
  function goBack() {
    if (refHistory.length === 0) return;
    const prev = refHistory[refHistory.length - 1];
    setRefHistory((h) => h.slice(0, -1));
    loadRef(prev);
  }

  function selectUnit(unit: number, amud?: "a" | "b") {
    if (!book) return;
    setCurrentUnit(unit);
    setCurrentAmud(amud);
    loadRef(bookRef(book, unit, amud), true);
  }

  // Siguiente capítulo/daf/anaf. Prioriza el campo `next` de Sefaria porque
  // respeta la jerarquía real del texto (p.ej. Gate → Anaf en Etz Chaim).
  // Cae al cálculo local solo cuando navegamos por el BookBrowser y el libro
  // tiene estructura de Talmud (amudim).
  function nextUnit() {
    if (sourceResult?.next) {
      loadRef(sourceResult.next, true);
      return;
    }
    if (!book || currentUnit === null) return;
    if (book.type === "talmud") {
      if (currentAmud === "a") return selectUnit(currentUnit, "b");
      return selectUnit(currentUnit + 1, "a");
    }
    const last = book.units;
    if (currentUnit >= last) return;
    selectUnit(currentUnit + 1);
  }

  function hasNext(): boolean {
    // Si Sefaria nos indica que hay siguiente sección, siempre mostramos el botón.
    if (sourceResult?.next) return true;
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
    if (!q) return;
    // Si hay sugerencias, usar la primera; si no, intentar como ref directa.
    if (suggestions.length > 0) {
      pickSuggestion(suggestions[0]);
    } else {
      loadRef(q, true);
    }
    setShowSug(false);
  }

  // Etiqueta de un nodo de la Mente Cósmica en el idioma activo (sin importar
  // brainData.ts, que es pesado: la lógica es trivial y va inline aquí).
  function nodeLabelLocal(n: NodeHit): string {
    if (locale === "fa") return n.labelFa || n.label;
    if (locale === "en") return n.labelEn || n.label;
    return n.label;
  }

  // Baja los nodos de la Mente Cósmica una sola vez y los cachea. Si la BD no
  // está, cae a la semilla estática que devuelve /api/brain — nunca vacía.
  async function ensureBrainNodes(): Promise<NodeHit[]> {
    if (brainNodesRef.current) return brainNodesRef.current;
    if (brainLoadingRef.current) return [];
    brainLoadingRef.current = true;
    try {
      const res = await fetch("/api/brain", { cache: "force-cache" });
      const data = await res.json();
      const nodes: NodeHit[] = Array.isArray(data?.nodes)
        ? data.nodes.map((n: Record<string, unknown>) => ({
            id: String(n.id),
            label: String(n.label),
            labelFa: n.labelFa ? String(n.labelFa) : undefined,
            labelEn: n.labelEn ? String(n.labelEn) : undefined,
            url: n.url ? String(n.url) : undefined,
          }))
        : [];
      brainNodesRef.current = nodes;
      return nodes;
    } catch {
      brainNodesRef.current = [];
      return [];
    } finally {
      brainLoadingRef.current = false;
    }
  }

  // Buscar sugerencias mientras el usuario escribe (con debounce).
  // Combina: (1) historial del usuario, (2) nodos de la Mente Cósmica,
  // (3) textos/temas de Sefaria. El "estudiar este concepto" se añade al render.
  useEffect(() => {
    const q = search.trim();
    if (q.length < 2) {
      setSuggestions([]);
      setHistoryHits([]);
      setNodeHits([]);
      return;
    }
    // Historial: instantáneo (localStorage), sin esperar a la red.
    setHistoryHits(searchLocal(q, 4));
    setShowSug(true);

    let cancelled = false;
    const timer = setTimeout(async () => {
      // Sefaria (textos y temas)
      try {
        const sug = await searchSuggestions(q);
        if (!cancelled) { setSuggestions(sug); setShowSug(true); }
      } catch { /* noop */ }
      // Nodos de la Mente Cósmica
      try {
        const nodes = await ensureBrainNodes();
        if (!cancelled) {
          const needle = q.toLowerCase();
          const hits = nodes
            .filter((n) =>
              n.label.toLowerCase().includes(needle) ||
              (n.labelFa ?? "").toLowerCase().includes(needle) ||
              (n.labelEn ?? "").toLowerCase().includes(needle))
            .slice(0, 5);
          setNodeHits(hits);
        }
      } catch { /* noop */ }
    }, 220);
    return () => { cancelled = true; clearTimeout(timer); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // ¿Hay algún resultado de cualquier fuente? (para mostrar el dropdown)
  const hasAnyHit =
    suggestions.length > 0 || historyHits.length > 0 || nodeHits.length > 0 || search.trim().length >= 2;

  // Abrir un estudio guardado del historial: va a Mis Estudios sin regenerar.
  function openHistory(s: LocalStudy) {
    setSearch(""); setSuggestions([]); setHistoryHits([]); setNodeHits([]); setShowSug(false);
    router.push(`/mis-estudios?open=${encodeURIComponent(s.cid)}`);
  }

  // Al elegir una sugerencia: texto → carga la ref; tema/persona/lugar → estudio de concepto.
  function pickSuggestion(s: NameSuggestion) {
    setSearch("");
    setSuggestions([]);
    setShowSug(false);
    if (s.kind === "ref") {
      loadRef(s.title, true);
    } else {
      // Tema / persona / lugar: abrir un estudio de concepto en el panel lateral.
      openConcept(s.title);
    }
  }

  async function runStudy(index: number, depth: "quick" | "deep" = "quick") {
    if (!sourceResult) return;
    setStudyingIndex(index);
    setStudyLoading(true);
    setStudyError(null);
    setStudy(null);
    setStudyRef(null);

    // Llevar la vista a donde se está generando el estudio (clave en móvil:
    // el análisis está debajo; en escritorio, arriba a la derecha si bajaste).
    requestAnimationFrame(() => {
      analysisRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    const isPassage = index < 0;
    const hebrewText = isPassage
      ? sourceResult.segments.join("\n")
      : sourceResult.segments[index];
    const ref = isPassage
      ? sourceResult.ref
      : `${sourceResult.ref}:${index + 1}`;

    try {
      // onChunk: el texto aparece progresivamente mientras Claude genera
      // → evita timeout en Farsi y textos largos, y da feedback visual.
      const { study: text } = await requestStudy(
        {
          mode: "text", locale, depth, ref, hebrewText,
          ...(studyContext?.type === "kabbalah" && { context: "kabbalah", sefiraId: studyContext.sefiraId }),
        },
        (accumulated) => {
          setStudy(accumulated);
          setStudyRef(ref);
          setStudyLoading(false); // quitar la animación de espera en cuanto llega el 1er chunk
        }
      );
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

  // Abre conceptos/letras en panel lateral. Si ya hay un panel abierto,
  // lo guarda en el historial para poder volver con ← (stack de paneles).
  function openConcept(term: string) {
    setConceptHistory((h) => conceptTarget ? [...h, conceptTarget] : h);
    setConceptTarget({ kind: "concept", value: term, label: term });
  }
  function openLetter(letterKey: string, label: string) {
    setConceptHistory((h) => conceptTarget ? [...h, conceptTarget] : h);
    setConceptTarget({ kind: "letter", value: letterKey, label });
  }
  // Estudio CONTEXTUAL de una conexión de la Mente Cósmica (relacional V3).
  // Recibe IDS de nodos; resuelve sus labels localizados con el caché del cerebro
  // (si un id no aparece, usa el id mismo como label — nunca se queda vacío).
  async function openConnection(fromId: string, toId: string, pathIds?: string[]) {
    const nodes = await ensureBrainNodes();
    const clean = (s: string) => s.replace(/\s*\([^)]*\)\s*/g, " ").replace(/\s+/g, " ").trim();
    const lbl = (id: string) => {
      const n = nodes.find((x) => x.id === id);
      return clean(n ? nodeLabelLocal(n) : id) || id;
    };
    const fromLabel = lbl(fromId);
    const toLabel = lbl(toId);
    const label =
      locale === "fa"
        ? `${toLabel} در پیوند با ${fromLabel}`
        : locale === "en"
          ? `${toLabel} in relation to ${fromLabel}`
          : `${toLabel} en relación con ${fromLabel}`;
    const pathLabels = pathIds && pathIds.length >= 2 ? pathIds.map(lbl) : [fromLabel, toLabel];
    setConceptHistory((h) => (conceptTarget ? [...h, conceptTarget] : h));
    setConceptTarget({
      kind: "connection",
      value: `${fromId}→${toId}`,
      label,
      connection: { fromId, toId, fromLabel, toLabel, pathLabels },
    });
  }
  function closeConceptPanel() {
    // Si hay historial, volver al panel anterior; si no, cerrar.
    if (conceptHistory.length > 0) {
      const prev = conceptHistory[conceptHistory.length - 1];
      setConceptHistory((h) => h.slice(0, -1));
      setConceptTarget(prev);
    } else {
      setConceptTarget(null);
      setConceptHistory([]);
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      {/* Columna izquierda: navegación + fuente */}
      <section>
        {/* Botón ← volver al texto anterior */}
        {refHistory.length > 0 && (
          <button
            onClick={goBack}
            className="mb-3 flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-gold"
          >
            ← <span className="font-cinzel text-xs uppercase tracking-wide">{t("back")}</span>
            <span className="truncate max-w-[200px] text-xs opacity-70">
              {refHistory[refHistory.length - 1]}
            </span>
          </button>
        )}

        <form id="tour-search" onSubmit={onSearch} className="relative flex gap-2">
          <div className="relative flex-1">
            <input
              type="search"
              name="q"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => hasAnyHit && setShowSug(true)}
              onBlur={() => setTimeout(() => setShowSug(false), 150)}
              placeholder={t("searchPlaceholder")}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              className="w-full rounded-md border border-gold/25 bg-white/[0.03] px-3 py-2 text-sm text-parchment placeholder:text-muted/70 focus:border-gold/60 focus:outline-none"
            />
            {/* Dropdown de sugerencias — combina historial, Mente Cósmica,
                textos de Sefaria y "estudiar este concepto" (nunca queda vacío). */}
            {showSug && hasAnyHit && (
              <div className="absolute left-0 right-0 top-full z-30 mt-1 max-h-[60vh] overflow-y-auto rounded-md border border-gold/25 bg-ink/98 shadow-xl backdrop-blur-md">
                {/* Grupo 1 · Mis estudios (historial del usuario) */}
                {historyHits.length > 0 && (
                  <ul>
                    <li className="px-3 pb-1 pt-2 font-cinzel text-[9px] uppercase tracking-widest text-gold/40">
                      {t("groupHistory")}
                    </li>
                    {historyHits.map((s) => (
                      <li key={`h-${s.cid}`}>
                        <button
                          type="button"
                          onMouseDown={(e) => { e.preventDefault(); openHistory(s); }}
                          className="flex w-full items-center justify-between gap-2 px-3 py-2 text-start text-sm text-parchment/90 transition-colors hover:bg-gold/10"
                        >
                          <span className="truncate">{s.title}</span>
                          <span className="shrink-0 font-cinzel text-[9px] uppercase tracking-wider text-gold/55">
                            {t("sugHistory")}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Grupo 2 · Mente Cósmica (nodos-concepto) */}
                {nodeHits.length > 0 && (
                  <ul className="border-t border-gold/10">
                    <li className="px-3 pb-1 pt-2 font-cinzel text-[9px] uppercase tracking-widest text-gold/40">
                      {t("groupBrain")}
                    </li>
                    {nodeHits.map((n) => (
                      <li key={`n-${n.id}`}>
                        <button
                          type="button"
                          onMouseDown={(e) => { e.preventDefault(); setSearch(""); setShowSug(false); openConcept(nodeLabelLocal(n)); }}
                          className="flex w-full items-center justify-between gap-2 px-3 py-2 text-start text-sm text-parchment/90 transition-colors hover:bg-gold/10"
                        >
                          <span className="truncate">{nodeLabelLocal(n)}</span>
                          <span className="shrink-0 font-cinzel text-[9px] uppercase tracking-wider text-gold/45">
                            {t("sugNode")}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Grupo 3 · Textos y temas (Sefaria) */}
                {suggestions.length > 0 && (
                  <ul className="border-t border-gold/10">
                    <li className="px-3 pb-1 pt-2 font-cinzel text-[9px] uppercase tracking-widest text-gold/40">
                      {t("groupTexts")}
                    </li>
                    {suggestions.map((s, i) => (
                      <li key={`s-${i}`}>
                        <button
                          type="button"
                          onMouseDown={(e) => { e.preventDefault(); pickSuggestion(s); }}
                          className="flex w-full items-center justify-between gap-2 px-3 py-2 text-start text-sm text-parchment/90 transition-colors hover:bg-gold/10"
                        >
                          <span className="truncate">{s.title}</span>
                          <span className="shrink-0 font-cinzel text-[9px] uppercase tracking-wider text-gold/45">
                            {s.kind === "ref" ? t("sugText") : t("sugTopic")}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Grupo 4 · Estudiar este concepto (siempre, para no quedar vacío) */}
                {search.trim().length >= 2 && (
                  <div className="border-t border-gold/15">
                    <button
                      type="button"
                      onMouseDown={(e) => { e.preventDefault(); const q = search.trim(); setSearch(""); setShowSug(false); openConcept(q); }}
                      className="flex w-full items-center gap-2 px-3 py-2.5 text-start text-sm text-gold transition-colors hover:bg-gold/10"
                    >
                      <span className="text-gold/60">✦</span>
                      <span className="truncate">{t("studyThisConcept", { q: search.trim() })}</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
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
              onClick={() => loadRef(parasha.ref, true)}
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

        <div id="tour-categories" className="mt-6">
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
          faTranslations={locale === "fa" ? faTranslations : null}
          faTranslating={locale === "fa" && faTranslating}
          studyingIndex={studyingIndex}
          onStudyVerse={(i, depth) => runStudy(i, depth)}
          onStudyPassage={(depth) => runStudy(-1, depth)}
          onWord={(a) => setLexiconAnchor(a)}
          onWordMenu={(a) => setWordMenu(a)}
        />
      </section>

      {/* Columna derecha: análisis */}
      <section ref={analysisRef} id="tour-analysis" className="scroll-mt-20 lg:border-s lg:border-gold/15 lg:ps-10">
        <div className="flex items-center gap-3">
          <h2 className="font-cinzel text-sm uppercase tracking-widest text-gold/80">
            {t("analysis")}
          </h2>
          {/* Indicador de modo cabalístico */}
          {studyContext?.type === "kabbalah" && studyContext.sefiraId && (
            <span className="flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/[0.06] px-2.5 py-0.5 font-cinzel text-[10px] uppercase tracking-widest text-gold/70">
              <span className="hebrew text-sm" style={{ lineHeight: 1 }}>
                {/* Nombre hebreo de la sefirá */}
                {{keter:"כֶּתֶר",chochmah:"חָכְמָה",binah:"בִּינָה",chesed:"חֶסֶד",gevurah:"גְּבוּרָה",tiferet:"תִּפְאֶרֶת",netzach:"נֶצַח",hod:"הוֹד",yesod:"יְסוֹד",malchut:"מַלְכוּת"}[studyContext.sefiraId] ?? ""}
              </span>
              · {t("kabbalahMode")}
            </span>
          )}
        </div>

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
            <StudyResult
              text={study}
              onConcept={openConcept}
              onLetter={openLetter}
              onRef={(ref) => {
                // Las refs del análisis se abren en el RefPanel (no reemplazan el estudio).
                setOpenRefs((prev) => prev.includes(ref) ? prev : [...prev, ref]);
              }}
            />
            {/* Panel de referencias cruzadas — aparece justo debajo del estudio
                (antes estaba fuera de esta columna y se veía lejos del clic).
                El scroll automático (useEffect sobre openRefs) lo trae a la vista. */}
            {openRefs.length > 0 && (
              <div ref={refPanelRef} className="scroll-mt-20">
                <RefPanel
                  refs={openRefs}
                  onClose={(ref) => setOpenRefs((prev) => prev.filter((r) => r !== ref))}
                  onOpenRef={(ref) => setOpenRefs((prev) => prev.includes(ref) ? prev : [...prev, ref])}
                  onNavigate={(ref) => loadRef(ref, true)}
                />
              </div>
            )}
            {/* AudioPlayer desactivado temporalmente — pendiente de grabar voz en persa.
            <AudioPlayer study={study} /> */}
            {hasNext() && (
              <div className="mt-8 flex justify-end border-t border-gold/15 pt-4">
                <button
                  onClick={nextUnit}
                  className="rounded-full border border-gold/50 px-5 py-2 font-cinzel text-xs uppercase tracking-widest text-gold transition-all hover:bg-gold/10"
                >
                  {sourceResult?.next
                    ? `${sourceResult.next} →`
                    : `${t("nextChapter")} →`}
                </button>
              </div>
            )}
            {studyRef && <BeitMidrash studyRef={studyRef} />}
          </div>
        )}
      </section>

      <StudyChat studyRef={studyRef} prefill={chatPrefill} onPrefillConsumed={() => setChatPrefill(null)} />
      <WordMenu
        anchor={wordMenu}
        onClose={() => setWordMenu(null)}
        onLexicon={(word) => {
          // Simular un WordAnchor para el LexiconPanel desde la posición del menú.
          if (wordMenu) setLexiconAnchor({ word, x: wordMenu.x, y: wordMenu.y, top: wordMenu.y - 20 });
        }}
        onChat={(word) => {
          setChatPrefill(`¿Qué significa la palabra hebrea "${word}"?`);
        }}
      />
      <LexiconPanel anchor={lexiconAnchor} onClose={() => setLexiconAnchor(null)} />
      <ConceptPanel
        target={conceptTarget}
        onClose={() => { setConceptTarget(null); setConceptHistory([]); }}
        onBack={conceptHistory.length > 0 ? closeConceptPanel : undefined}
        historyDepth={conceptHistory.length}
        onConcept={openConcept}
        onLetter={openLetter}
      />
    </div>
  );
}
