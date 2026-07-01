"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  searchTextFull,
  HL_OPEN,
  HL_CLOSE,
  type TextSearchHit,
  type CategoryCount,
} from "@/lib/sources/sefaria";
import { searchCategoryLabel, sortCategoryCounts } from "@/lib/sources/searchCategories";

type NodeHit = { id: string; label: string; labelFa?: string; labelEn?: string };

interface SearchResultsProps {
  initialQuery: string;
}

// Página de resultados completa (equivalente a sefaria.org/search), a
// diferencia del desplegable del buscador de /estudio: aquí se pueden marcar
// VARIAS categorías a la vez (checkboxes, no un chip único) y se ve el
// conteo real de resultados por categoría, como "Kabbalah (702)".
export default function SearchResults({ initialQuery }: SearchResultsProps) {
  const locale = useLocale();
  const t = useTranslations("search");
  const ts = useTranslations("study");

  const [query, setQuery] = useState(initialQuery);
  const [input, setInput] = useState(initialQuery);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [exactPhrase, setExactPhrase] = useState(false);

  const [hits, setHits] = useState<TextSearchHit[]>([]);
  const [categoryCounts, setCategoryCounts] = useState<CategoryCount[]>([]);
  const [total, setTotal] = useState(0);
  const [totalIsCapped, setTotalIsCapped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [conceptNode, setConceptNode] = useState<NodeHit | null>(null);

  const brainNodesRef = useRef<NodeHit[] | null>(null);

  async function ensureBrainNodes(): Promise<NodeHit[]> {
    if (brainNodesRef.current) return brainNodesRef.current;
    try {
      const res = await fetch("/api/brain", { cache: "force-cache" });
      const data = await res.json();
      const nodes: NodeHit[] = Array.isArray(data?.nodes)
        ? data.nodes.map((n: Record<string, unknown>) => ({
            id: String(n.id),
            label: String(n.label),
            labelFa: n.labelFa ? String(n.labelFa) : undefined,
            labelEn: n.labelEn ? String(n.labelEn) : undefined,
          }))
        : [];
      brainNodesRef.current = nodes;
      return nodes;
    } catch {
      return [];
    }
  }

  function nodeLabelLocal(n: NodeHit): string {
    if (locale === "fa") return n.labelFa || n.label;
    if (locale === "en") return n.labelEn || n.label;
    return n.label;
  }

  // Al cambiar query, categorías marcadas o frase exacta: relanzar la búsqueda.
  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setHits([]);
      setCategoryCounts([]);
      setTotal(0);
      setConceptNode(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    // Actualiza la URL para que la búsqueda sea compartible/recargable.
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("q", q);
      window.history.replaceState(null, "", url.toString());
    }
    searchTextFull(q, 20, selectedCategories, exactPhrase)
      .then((res) => {
        if (cancelled) return;
        setHits(res.hits);
        setCategoryCounts(res.categoryCounts);
        setTotal(res.total);
        setTotalIsCapped(res.totalIsCapped);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    // Tarjeta de concepto: ¿el término coincide con un nodo de la Mente Cósmica?
    ensureBrainNodes().then((nodes) => {
      if (cancelled) return;
      const needle = q.toLowerCase();
      const match = nodes.find(
        (n) =>
          n.label.toLowerCase() === needle ||
          (n.labelFa ?? "").toLowerCase() === needle ||
          (n.labelEn ?? "").toLowerCase() === needle
      );
      setConceptNode(match ?? null);
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, selectedCategories, exactPhrase]);

  function toggleCategory(id: string) {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setQuery(input.trim());
  }

  function renderSnippet(snippet: string) {
    const parts = snippet.split(new RegExp(`${HL_OPEN}|${HL_CLOSE}`));
    let inside = false;
    return parts.map((part, i) => {
      const node = inside ? (
        <mark key={i} className="bg-transparent font-semibold text-gold">
          {part}
        </mark>
      ) : (
        <span key={i}>{part}</span>
      );
      inside = !inside;
      return node;
    });
  }

  const sortedCounts = sortCategoryCounts(categoryCounts);

  return (
    <div>
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          type="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={ts("searchPlaceholder")}
          autoComplete="off"
          className="w-full rounded-md border border-gold/25 bg-white/[0.03] px-3 py-2 text-sm text-parchment placeholder:text-muted/70 focus:border-gold/60 focus:outline-none"
        />
        <button
          type="submit"
          className="shrink-0 rounded-md border border-gold/50 px-4 py-2 text-sm text-gold transition-all hover:bg-gold/10"
        >
          {ts("searchButton")}
        </button>
      </form>

      {query && (
        <p className="mt-4 text-sm text-muted">
          {loading
            ? t("searching")
            : t("resultsFor", { q: query, n: totalIsCapped ? `${total}+` : String(total) })}
        </p>
      )}

      {conceptNode && (
        <div className="mt-5 rounded-lg border border-gold/25 bg-gold/[0.05] p-4">
          <p className="font-cinzel text-xs uppercase tracking-widest text-gold/70">
            {t("conceptCard")}
          </p>
          <p className="mt-1 text-lg text-parchment">{nodeLabelLocal(conceptNode)}</p>
          <Link
            href={`/estudio?concept=${encodeURIComponent(nodeLabelLocal(conceptNode))}`}
            className="mt-2 inline-block text-sm text-gold underline decoration-gold/40 hover:decoration-gold"
          >
            {ts("studyThisConcept", { q: nodeLabelLocal(conceptNode) })}
          </Link>
        </div>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">
        {/* Resultados */}
        <div>
          {!loading && query && hits.length === 0 && (
            <p className="text-sm text-muted">{t("noResults")}</p>
          )}
          <ul className="space-y-5">
            {hits.map((h, i) => (
              <li key={`${h.ref}-${i}`} className="border-b border-gold/10 pb-4">
                <Link
                  href={`/estudio?ref=${encodeURIComponent(h.ref)}`}
                  className="font-cinzel text-sm text-gold hover:underline"
                >
                  {h.heRef ? (
                    <span className="hebrew" dir="rtl">
                      {h.heRef}
                    </span>
                  ) : (
                    h.ref
                  )}
                </Link>
                {h.snippet && (
                  <p dir="rtl" className="hebrew mt-1 text-sm leading-relaxed text-parchment/85">
                    {renderSnippet(h.snippet)}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Panel de categorías (checkboxes con conteo) + frase exacta */}
        <aside className="lg:border-s lg:border-gold/15 lg:ps-6">
          <p className="mb-3 font-cinzel text-xs uppercase tracking-widest text-gold/70">
            {t("categoriesPanel")}
          </p>
          <ul className="space-y-1.5">
            {sortedCounts.map((c) => {
              const checked = selectedCategories.includes(c.category);
              return (
                <li key={c.category}>
                  <label className="flex cursor-pointer items-center justify-between gap-2 text-sm text-parchment/85 hover:text-gold">
                    <span className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleCategory(c.category)}
                        className="h-3.5 w-3.5 accent-[#c9a43e]"
                      />
                      {searchCategoryLabel(c.category, locale)}
                    </span>
                    <span className="text-xs text-muted/70">({c.count})</span>
                  </label>
                </li>
              );
            })}
          </ul>

          <label className="mt-4 flex cursor-pointer items-center gap-2 border-t border-gold/10 pt-3 text-sm text-parchment/85 hover:text-gold">
            <input
              type="checkbox"
              checked={exactPhrase}
              onChange={() => setExactPhrase((v) => !v)}
              className="h-3.5 w-3.5 accent-[#c9a43e]"
            />
            {ts("exactPhrase")}
          </label>
        </aside>
      </div>
    </div>
  );
}
