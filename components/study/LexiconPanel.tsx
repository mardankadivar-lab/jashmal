"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Inline from "./InteractiveText";
import { requestLexicon, type LexiconResponse } from "@/lib/lexiconClient";

interface LexiconPanelProps {
  word: string | null; // palabra hebrea seleccionada (con niqud), o null = cerrado
  onClose: () => void;
}

export default function LexiconPanel({ word, onClose }: LexiconPanelProps) {
  const locale = useLocale();
  const t = useTranslations("lexicon");

  const [data, setData] = useState<LexiconResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!word) return;
    let cancelled = false;
    setData(null);
    setError(false);
    setLoading(true);
    requestLexicon(word, locale)
      .then((res) => {
        if (!cancelled) setData(res);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [word, locale]);

  if (!word) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
    >
      {/* fondo */}
      <button
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-label={t("close")}
      />
      {/* panel */}
      <div className="relative z-10 h-full w-full max-w-md overflow-y-auto border-s border-gold/25 bg-ink p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="hebrew text-4xl text-gold">{word}</p>
            <p className="mt-1 font-cinzel text-xs uppercase tracking-widest text-muted">
              {t("title")}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-gold/30 px-3 py-1 text-sm text-muted transition-colors hover:text-gold"
          >
            {t("close")}
          </button>
        </div>

        {loading && (
          <p className="mt-8 animate-pulse text-sm text-muted">{t("loading")}</p>
        )}
        {error && <p className="mt-8 text-sm text-red-400/80">{t("error")}</p>}

        {data && (
          <div className="mt-6 space-y-6">
            {/* Gematría */}
            <section>
              <h3 className="font-cinzel text-sm uppercase tracking-widest text-gold/80">
                {t("gematria")}
              </h3>
              <p className="mt-2 text-3xl text-gold-soft">{data.classic.gematria}</p>
              {data.classic.breakdown.length > 0 && (
                <p className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-sm text-muted">
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

            {/* Capa clásica: diccionarios reales */}
            {data.classic.entries.length > 0 && (
              <section>
                <h3 className="font-cinzel text-sm uppercase tracking-widest text-gold/80">
                  {t("classic")}
                </h3>
                <ul className="mt-2 space-y-3">
                  {data.classic.entries.map((e, i) => (
                    <li key={i} className="border-s-2 border-gold/20 ps-3">
                      <p className="text-xs uppercase tracking-wide text-gold/60">
                        {e.lexicon}
                        {e.strongNumber ? ` · Strong ${e.strongNumber}` : ""}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-parchment/90">
                        {e.definition}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Capa paleo-hebrea: pictogramas primarios + síntesis en frase */}
            {data.paleo && (
              <section>
                <h3 className="font-cinzel text-sm uppercase tracking-widest text-gold/80">
                  {t("paleo")}
                </h3>
                <div className="study-prose mt-2 text-sm">
                  {data.paleo.split(/\n+/).map((line, i) => {
                    const trimmed = line.trim();
                    if (!trimmed) return null;
                    const h = trimmed.match(/^(#{1,4}|\d+\.)\s*(.*)$/);
                    if (h) {
                      return (
                        <h4 key={i} className="mt-3 font-cinzel text-gold">
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

            {/* Capa mística: generada por Claude, con enlaces a las letras */}
            {data.mystic && (
              <section>
                <h3 className="font-cinzel text-sm uppercase tracking-widest text-gold/80">
                  {t("mystic")}
                </h3>
                <div className="study-prose mt-2 text-sm">
                  {data.mystic.split(/\n+/).map((line, i) => {
                    const trimmed = line.trim();
                    if (!trimmed) return null;
                    const h = trimmed.match(/^(#{1,4}|\d+\.)\s*(.*)$/);
                    if (h) {
                      return (
                        <h4
                          key={i}
                          className="mt-3 font-cinzel text-gold"
                        >
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

            <p className="pt-2 text-xs text-muted/60">{t("disclaimer")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
