"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Inline from "./InteractiveText";
import { requestLexicon, type LexiconResponse } from "@/lib/lexiconClient";
import type { WordAnchor } from "@/components/sefaria/ClickableHebrew";

interface LexiconPanelProps {
  anchor: WordAnchor | null; // palabra + posición, o null = cerrado
  onClose: () => void;
}

const POPUP_W = 360;

export default function LexiconPanel({ anchor, onClose }: LexiconPanelProps) {
  const locale = useLocale();
  const t = useTranslations("lexicon");

  const [data, setData] = useState<LexiconResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);

  const word = anchor?.word ?? null;

  useEffect(() => {
    if (!word) return;
    let cancelled = false;
    setData(null);
    setError(false);
    setLoading(true);
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
            {/* Gematría */}
            <section>
              <h3 className="font-cinzel text-xs uppercase tracking-widest text-gold/80">
                {t("gematria")}
              </h3>
              <p className="mt-1 text-2xl text-gold-soft">{data.classic.gematria}</p>
              {data.classic.breakdown.length > 0 && (
                <p className="mt-1 flex flex-wrap gap-x-2 gap-y-1 text-xs text-muted">
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
                        {e.lexicon}
                        {e.strongNumber ? ` · Strong ${e.strongNumber}` : ""}
                      </p>
                      <p className="mt-0.5 text-sm leading-relaxed text-parchment/90">
                        {e.definition}
                      </p>
                    </li>
                  ))}
                </ul>
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

            <p className="pt-1 text-[10px] leading-relaxed text-muted/60">
              {t("disclaimer")}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
