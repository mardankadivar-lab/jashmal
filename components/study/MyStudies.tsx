"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import StudyResult from "./StudyResult";
import { listLocal, deleteLocal, cidFor, type LocalStudy } from "@/lib/myStudies";

type Item = {
  cid: string;
  mode: string;
  ref: string;
  title: string;
  content: string;
  lang: string;
  createdAt: string;
};

// Fusiona el historial del servidor (cuenta) con el local (dispositivo).
// Deduplica por cid (mode::ref::lang) y conserva la versión más reciente.
function merge(server: Item[], local: LocalStudy[]): Item[] {
  const byCid = new Map<string, Item>();
  const add = (it: Item) => {
    const prev = byCid.get(it.cid);
    if (!prev || new Date(it.createdAt) > new Date(prev.createdAt)) byCid.set(it.cid, it);
  };
  for (const s of server) add({ ...s, cid: cidFor(s.mode, s.ref, s.lang) });
  for (const l of local) add({ ...l });
  return [...byCid.values()].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export default function MyStudies() {
  const t = useTranslations("myStudies");
  const locale = useLocale();
  const router = useRouter();

  const [items, setItems] = useState<Item[] | null>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<Item | null>(null);

  // Cargar: servidor (si hay sesión) + local, fusionados.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      let server: Item[] = [];
      try {
        const res = await fetch("/api/my-studies", { cache: "no-store" });
        const data = await res.json();
        if (Array.isArray(data?.studies)) {
          server = data.studies.map((s: Record<string, unknown>) => ({
            cid: cidFor(String(s.mode), String(s.ref), String(s.lang)),
            mode: String(s.mode),
            ref: String(s.ref),
            title: String(s.title),
            content: String(s.content),
            lang: String(s.lang),
            createdAt: String(s.createdAt),
          }));
        }
      } catch { /* sin sesión / sin red: solo local */ }
      if (cancelled) return;
      const merged = merge(server, listLocal());
      setItems(merged);

      // ?open=<cid> → abrir directamente ese estudio (desde la lupa del motor).
      try {
        const sp = new URLSearchParams(window.location.search);
        const want = sp.get("open");
        if (want) {
          const found = merged.find((m) => m.cid === want);
          if (found) setOpen(found);
        }
      } catch { /* noop */ }
    })();
    return () => { cancelled = true; };
  }, []);

  const filtered = useMemo(() => {
    if (!items) return [];
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (it) =>
        it.title.toLowerCase().includes(q) ||
        it.ref.toLowerCase().includes(q) ||
        it.content.toLowerCase().includes(q),
    );
  }, [items, query]);

  function fmtDate(iso: string): string {
    try {
      return new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(new Date(iso));
    } catch {
      return iso.slice(0, 10);
    }
  }

  function modeLabel(mode: string): string {
    if (mode === "concept") return t("modeConcept");
    if (mode === "letter") return t("modeLetter");
    return t("modeText");
  }

  async function remove(it: Item) {
    deleteLocal(it.cid);
    try {
      await fetch(`/api/my-studies?key=${encodeURIComponent(it.cid)}`, { method: "DELETE" });
    } catch { /* el servidor usa otra clave; lo intenta igualmente */ }
    setItems((prev) => (prev ? prev.filter((x) => x.cid !== it.cid) : prev));
    if (open?.cid === it.cid) setOpen(null);
  }

  // ── Lector: muestra el contenido GUARDADO (sin regenerar) ──────────────────
  if (open) {
    return (
      <div>
        <button
          onClick={() => setOpen(null)}
          className="mb-5 flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-gold"
        >
          ← <span className="font-cinzel text-xs uppercase tracking-wide">{t("back")}</span>
        </button>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-gold/25 bg-gold/[0.05] px-2.5 py-0.5 font-cinzel text-[10px] uppercase tracking-widest text-gold/70">
            {modeLabel(open.mode)}
          </span>
          <span className="text-xs text-muted/70">{fmtDate(open.createdAt)}</span>
          <span className="text-xs uppercase text-muted/50">{open.lang}</span>
        </div>
        <h2 className="font-cinzel text-2xl text-parchment">{open.title}</h2>
        <p className="mt-1 text-xs text-muted/60">{t("savedNote")}</p>
        <div className="mt-6">
          <StudyResult
            text={open.content}
            onConcept={(term) => router.push(`/estudio?concept=${encodeURIComponent(term)}`)}
            onLetter={(_key, label) => router.push(`/estudio?concept=${encodeURIComponent(label)}`)}
            onRef={(ref) => router.push(`/estudio?ref=${encodeURIComponent(ref)}`)}
          />
        </div>
      </div>
    );
  }

  // ── Listado ────────────────────────────────────────────────────────────────
  return (
    <div>
      <div className="relative">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("searchPlaceholder")}
          autoComplete="off"
          spellCheck={false}
          className="w-full rounded-md border border-gold/25 bg-white/[0.03] px-3 py-2.5 text-sm text-parchment placeholder:text-muted/70 focus:border-gold/60 focus:outline-none"
        />
      </div>

      {items === null && (
        <p className="mt-8 animate-pulse text-sm text-muted">{t("loading")}</p>
      )}

      {items !== null && items.length === 0 && (
        <div className="mt-12 flex flex-col items-center text-center">
          <p className="hebrew text-2xl text-gold/80">זֵכֶר</p>
          <p className="mt-3 max-w-sm text-sm text-muted">{t("empty")}</p>
        </div>
      )}

      {items !== null && items.length > 0 && filtered.length === 0 && (
        <p className="mt-8 text-sm text-muted">{t("noMatch")}</p>
      )}

      {filtered.length > 0 && (
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {filtered.map((it) => (
            <li
              key={it.cid}
              className="group relative overflow-hidden rounded-xl border border-gold/15 bg-white/[0.02] p-4 transition-colors hover:border-gold/40 hover:bg-gold/[0.03]"
            >
              <button onClick={() => setOpen(it)} className="block w-full text-start">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full border border-gold/25 bg-gold/[0.05] px-2 py-0.5 font-cinzel text-[9px] uppercase tracking-widest text-gold/70">
                    {modeLabel(it.mode)}
                  </span>
                  <span className="text-[11px] text-muted/60">{fmtDate(it.createdAt)}</span>
                </div>
                <h3 className="font-cinzel text-base text-parchment group-hover:text-gold">
                  {it.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted/80">
                  {it.content.replace(/[#*_`{}|>]/g, "").slice(0, 160)}…
                </p>
              </button>
              <button
                onClick={() => remove(it)}
                aria-label={t("delete")}
                title={t("delete")}
                className="absolute end-2 top-2 rounded-md px-2 py-1 text-xs text-muted/40 opacity-0 transition-all hover:text-red-400/80 group-hover:opacity-100"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
