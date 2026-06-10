"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Inline from "./InteractiveText";
import { requestLexicon, type LexiconResponse } from "@/lib/sources/lexiconClient";
import type { WordAnchor } from "@/components/sefaria/ClickableHebrew";

interface LexiconPanelProps {
  anchor: WordAnchor | null; // palabra + posición, o null = cerrado
  onClose: () => void;
}

const POPUP_W = 360;

// Los diccionarios de Sefaria llegan con su nombre en inglés. La interfaz solo
// puede estar en español o farsi, así que traducimos la ETIQUETA a una clave de
// i18n. Las DEFINICIONES siguen en su idioma académico original (lo avisamos).
const DICT_KEY: Record<string, string> = {
  "BDB Augmented Strong": "dictBDBStrong",
  "Klein Dictionary": "dictKlein",
  "BDB Dictionary": "dictBDB",
  "Jastrow Dictionary": "dictJastrow",
  "BDB Aramaic Dictionary": "dictBDBAramaic",
};

export default function LexiconPanel({ anchor, onClose }: LexiconPanelProps) {
  const locale = useLocale();
  const t = useTranslations("lexicon");

  // Devuelve el nombre del diccionario traducido; si no lo conocemos, deja el
  // original (es un nombre propio académico, no texto de interfaz traducible).
  const dictLabel = (name: string) => {
    const key = DICT_KEY[name];
    return key ? t(key) : name;
  };

  const [data, setData] = useState<LexiconResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [connections, setConnections] = useState<string | null>(null);
  const [connectionsLoading, setConnectionsLoading] = useState(false);
  const [zohar, setZohar] = useState<string | null>(null);
  const [zoharLoading, setZoharLoading] = useState(false);

  const loadConnections = useCallback(async (w: string, g: number) => {
    setConnectionsLoading(true);
    setConnections(null);
    try {
      const res = await fetch("/api/gematria-connections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word: w, gematria: g, locale }),
      });
      const d = await res.json();
      setConnections(d.connections || "");
    } catch {
      setConnections("");
    } finally {
      setConnectionsLoading(false);
    }
  }, [locale]);

  const loadZoharMethods = useCallback(async (w: string) => {
    setZoharLoading(true);
    setZohar(null);
    try {
      const res = await fetch("/api/zohar-methods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word: w, locale }),
      });
      const d = await res.json();
      setZohar(d.analysis || "");
    } catch {
      setZohar("");
    } finally {
      setZoharLoading(false);
    }
  }, [locale]);

  const popupRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);

  const word = anchor?.word ?? null;

  useEffect(() => {
    if (!word) return;
    let cancelled = false;
    setData(null);
    setError(false);
    setLoading(true);
    setConnections(null);
    setConnectionsLoading(false);
    setZohar(null);
    setZoharLoading(false);
    requestLexicon(word, locale)
      .then((res) => !cancelled && setData(res))
      .catch(() => !cancelled && setError(true))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [word, locale]);

  // Posiciona el popup junto a la palabra, clamp dentro del viewport.
  useLayoutEffect(() => {
    if (!anchor) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const margin = 12;
    let left = anchor.x - POPUP_W / 2;
    left = Math.max(margin, Math.min(left, vw - POPUP_W - margin));
    // Preferimos abrir debajo de la palabra; si no cabe, arriba.
    const h = popupRef.current?.offsetHeight ?? 320;
    let top = anchor.y + 8;
    if (top + h > vh - margin) {
      top = Math.max(margin, anchor.top - h - 8);
    }
    setPos({ left, top });
  }, [anchor, data, loading]);

  // Cerrar con Escape.
  useEffect(() => {
    if (!anchor) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [anchor, onClose]);

  if (!anchor) return null;

  return (
    <>
      {/* capa para cerrar al tocar fuera (transparente) */}
      <button
        className="fixed inset-0 z-40 cursor-default"
        onClick={onClose}
        aria-label={t("close")}
      />
      <div
        ref={popupRef}
        role="dialog"
        className="fixed z-50 max-h-[70vh] w-[360px] max-w-[calc(100vw-24px)] overflow-y-auto rounded-xl border border-gold/30 bg-ink/95 p-4 shadow-2xl backdrop-blur-md"
        style={pos ? { left: pos.left, top: pos.top } : { left: -9999, top: 0 }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="hebrew text-3xl text-gold">{anchor.word}</p>
            {/* Transliteración (pronunciación en letras latinas) */}
            {data?.classic.transliteration && (
              <p className="mt-0.5 font-cinzel text-sm italic text-gold-soft">
                {data.classic.transliteration}
              </p>
            )}
            <p className="mt-0.5 font-cinzel text-[10px] uppercase tracking-widest text-muted">
              {t("title")}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-gold/30 px-2.5 py-0.5 text-xs text-muted transition-colors hover:text-gold"
          >
            {t("close")}
          </button>
        </div>

        {loading && <p className="mt-5 animate-pulse text-sm text-muted">{t("loading")}</p>}
        {error && <p className="mt-5 text-sm text-red-400/80">{t("error")}</p>}

        {data && (
          <div className="mt-4 space-y-5">
            {/* Gematría — los 4 sistemas de Ginsburgh */}
            <section>
              <h3 className="font-cinzel text-xs uppercase tracking-widest text-gold/80">
                {t("gematria")}
              </h3>
              {/* Valor absoluto principal */}
              <p className="mt-1 text-2xl text-gold-soft">{data.classic.gematria}</p>
              {/* Los 4 sistemas */}
              <div className="mt-2 grid grid-cols-2 gap-1">
                {[
                  { label: "Absoluto · Atzilut", val: data.classic.gematria },
                  { label: "Ordinal · Beriá", val: (() => { let s=0; for(const c of data.classic.consonants) { const ord: Record<string,number>={א:1,ב:2,ג:3,ד:4,ה:5,ו:6,ז:7,ח:8,ט:9,י:10,כ:11,ך:23,ל:12,מ:13,ם:24,נ:14,ן:25,ס:15,ע:16,פ:17,ף:26,צ:18,ץ:27,ק:19,ר:20,ש:21,ת:22}; s+=ord[c]??0; } return s; })() },
                  { label: "Reducido · Yetzirá", val: (() => { let n=data.classic.gematria; while(n>9){n=String(n).split("").reduce((s,d)=>s+Number(d),0);} return n; })() },
                  { label: "Integral · Asiá", val: (() => { let n=data.classic.gematria; while(n>9){n=String(n).split("").reduce((s,d)=>s+Number(d),0);} return n; })() },
                ].map((sys, i) => (
                  <div key={i} className="rounded border border-gold/10 bg-gold/[0.03] px-2 py-1">
                    <p className="text-[9px] uppercase tracking-wide text-gold/40 font-cinzel">{sys.label}</p>
                    <p className="text-base text-gold-soft font-semibold">{sys.val}</p>
                  </div>
                ))}
              </div>
              {data.classic.breakdown.length > 0 && (
                <p className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-xs text-muted">
                  {data.classic.breakdown.map((b, i) => (
                    <span key={i}>
                      <span className="hebrew text-parchment">{b.letter}</span>
                      <span className="text-gold/60">={b.value}</span>
                      {i < data.classic.breakdown.length - 1 && (
                        <span className="ms-2 text-muted/50">+</span>
                      )}
                    </span>
                  ))}
                </p>
              )}
            </section>

            {/* Diccionarios reales */}
            {data.classic.entries.length > 0 && (
              <section>
                <h3 className="font-cinzel text-xs uppercase tracking-widest text-gold/80">
                  {t("classic")}
                </h3>
                <ul className="mt-1.5 space-y-2.5">
                  {data.classic.entries.map((e, i) => (
                    <li key={i} className="border-s-2 border-gold/20 ps-2.5">
                      <p className="text-[10px] uppercase tracking-wide text-gold/60">
                        {dictLabel(e.lexicon)}
                        {e.strongNumber ? ` · Strong ${e.strongNumber}` : ""}
                      </p>
                      <p className="mt-0.5 text-sm leading-relaxed text-parchment/90">
                        {e.definition}
                      </p>
                    </li>
                  ))}
                </ul>
                {/* Aviso: las definiciones académicas vienen en su idioma original. */}
                <p className="mt-2 text-[10px] italic leading-relaxed text-muted/60">
                  {t("sourceNote")}
                </p>
              </section>
            )}

            {/* Paleo-hebreo */}
            {data.paleo && (
              <section>
                <h3 className="font-cinzel text-xs uppercase tracking-widest text-gold/80">
                  {t("paleo")}
                </h3>
                <div className="study-prose mt-1.5 text-sm">
                  {data.paleo.split(/\n+/).map((line, i) => {
                    const trimmed = line.trim();
                    if (!trimmed) return null;
                    const h = trimmed.match(/^(#{1,4}|\d+\.)\s*(.*)$/);
                    if (h) {
                      return (
                        <h4 key={i} className="mt-2 font-cinzel text-gold">
                          <Inline text={h[2].replace(/\*+/g, "")} keyPrefix={`pa${i}`} />
                        </h4>
                      );
                    }
                    return (
                      <p key={i} className="mt-1 leading-relaxed">
                        <Inline text={trimmed} keyPrefix={`pp${i}`} />
                      </p>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Sentido interior */}
            {data.mystic && (
              <section>
                <h3 className="font-cinzel text-xs uppercase tracking-widest text-gold/80">
                  {t("mystic")}
                </h3>
                <div className="study-prose mt-1.5 text-sm">
                  {data.mystic.split(/\n+/).map((line, i) => {
                    const trimmed = line.trim();
                    if (!trimmed) return null;
                    const h = trimmed.match(/^(#{1,4}|\d+\.)\s*(.*)$/);
                    if (h) {
                      return (
                        <h4 key={i} className="mt-2 font-cinzel text-gold">
                          <Inline text={h[2].replace(/\*+/g, "")} keyPrefix={`lx${i}`} />
                        </h4>
                      );
                    }
                    return (
                      <p key={i} className="mt-1 leading-relaxed">
                        <Inline text={trimmed} keyPrefix={`lp${i}`} />
                      </p>
                    );
                  })}
                </div>
              </section>
            )}

            {/* ─── Conexiones numéricas (método Ginsburgh) ─── */}
            <section>
              <div className="flex items-center justify-between">
                <h3 className="font-cinzel text-xs uppercase tracking-widest text-gold/80">
                  {t("connections")}
                </h3>
                {!connections && !connectionsLoading && (
                  <button
                    onClick={() => loadConnections(anchor!.word, data!.classic.gematria)}
                    className="rounded-full border border-gold/25 px-2 py-0.5 text-[10px] font-cinzel text-gold/60 transition-colors hover:border-gold/50 hover:text-gold"
                  >
                    {t("findConnections")}
                  </button>
                )}
              </div>
              {connectionsLoading && (
                <p className="mt-2 animate-pulse text-[10px] text-muted">{t("searchingConnections")}</p>
              )}
              {connections && !connectionsLoading && (
                <div className="mt-2 space-y-1 text-[10px] leading-relaxed">
                  {connections.split(/\n+/).map((line, i) => {
                    const bold = line.match(/^\*\*(.+?)\*\*\s*(.*)$/);
                    if (bold) {
                      return (
                        <div key={i} className="rounded border border-gold/10 bg-gold/[0.03] px-2 py-1.5">
                          <span className="hebrew text-sm text-gold">{bold[1]}</span>
                          {bold[2] && <span className="text-muted/80"> {bold[2]}</span>}
                        </div>
                      );
                    }
                    return line.trim() ? (
                      <p key={i} className="text-muted/70 leading-relaxed">{line.replace(/\*\*/g,"")}</p>
                    ) : null;
                  })}
                </div>
              )}
            </section>

            {/* ─── Métodos del Zohar (Notarikon, Tzeruf, palabras ocultas) ─── */}
            <section>
              <div className="flex items-center justify-between">
                <h3 className="font-cinzel text-xs uppercase tracking-widest text-gold/80">
                  {t("zoharMethods")}
                </h3>
                {!zohar && !zoharLoading && (
                  <button
                    onClick={() => loadZoharMethods(anchor!.word)}
                    className="rounded-full border border-gold/25 px-2 py-0.5 text-[10px] font-cinzel text-gold/60 transition-colors hover:border-gold/50 hover:text-gold"
                  >
                    {t("analyzeZohar")}
                  </button>
                )}
              </div>
              {zoharLoading && (
                <p className="mt-2 animate-pulse text-[10px] text-muted">{t("analyzingZohar")}</p>
              )}
              {zohar && !zoharLoading && (
                <div className="mt-2 space-y-2 text-[10px] leading-relaxed">
                  {zohar.split(/\n+/).map((line, i) => {
                    // Encabezado de sección: ## título
                    const heading = line.match(/^##\s+(.+)$/);
                    if (heading) {
                      return (
                        <h4 key={i} className="mt-3 font-cinzel text-[10px] uppercase tracking-widest text-gold/70 first:mt-0">
                          {heading[1]}
                        </h4>
                      );
                    }
                    // Palabra hebrea en negrita **xxx**
                    const bold = line.match(/^\*\*(.+?)\*\*\s*(.*)$/);
                    if (bold) {
                      return (
                        <div key={i} className="rounded border border-gold/10 bg-gold/[0.03] px-2 py-1.5">
                          <span className="hebrew text-sm text-gold">{bold[1]}</span>
                          {bold[2] && <span className="text-muted/80"> {bold[2]}</span>}
                        </div>
                      );
                    }
                    return line.trim() ? (
                      <p key={i} className="text-muted/70 leading-relaxed">{line.replace(/\*\*/g, "")}</p>
                    ) : null;
                  })}
                </div>
              )}
            </section>

            <p className="pt-1 text-[10px] leading-relaxed text-muted/60">
              {t("disclaimer")}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
