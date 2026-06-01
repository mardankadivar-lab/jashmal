"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { getText, type SefariaTextResult } from "@/lib/sefaria";

interface RefPanelEntry {
  ref: string;
  result?: SefariaTextResult;
  loading?: boolean;
  error?: boolean;
}

interface RefPanelProps {
  refs: string[];            // refs abiertos en orden
  onClose: (ref: string) => void;
  onOpenRef: (ref: string) => void; // para encadenar desde dentro del panel
}

// Panel lateral de referencias cruzadas: muestra textos de Sefaria
// abiertos desde el análisis, encadenables (como Sefaria Reader).
export default function RefPanel({ refs, onClose, onOpenRef }: RefPanelProps) {
  const t = useTranslations("refPanel");
  const [entries, setEntries] = useState<Record<string, RefPanelEntry>>({});

  // Cargar cada ref nueva que llegue.
  useEffect(() => {
    for (const ref of refs) {
      if (entries[ref]) continue; // ya cargada o cargando
      setEntries((prev) => ({ ...prev, [ref]: { ref, loading: true } }));
      getText(ref)
        .then((result) =>
          setEntries((prev) => ({ ...prev, [ref]: { ref, result, loading: false } }))
        )
        .catch(() =>
          setEntries((prev) => ({ ...prev, [ref]: { ref, error: true, loading: false } }))
        );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refs]);

  if (refs.length === 0) return null;

  return (
    <div className="fixed inset-y-0 end-0 z-40 flex w-full max-w-sm flex-col border-s border-gold/20 bg-ink/95 shadow-2xl backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-gold/15 px-4 py-3">
        <span className="font-cinzel text-sm text-gold">{t("title")}</span>
        <button
          onClick={() => refs.forEach(onClose)}
          className="text-xs text-muted transition-colors hover:text-gold"
        >
          {t("closeAll")}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {refs.map((ref) => {
          const entry = entries[ref];
          return (
            <div key={ref} className="border-b border-gold/10">
              {/* Cabecera del panel con el ref */}
              <div className="flex items-center justify-between bg-gold/[0.04] px-3 py-2">
                <div>
                  <p className="font-cinzel text-xs text-gold">{ref}</p>
                  {entry?.result?.heRef && (
                    <p className="hebrew text-xs text-muted">{entry.result.heRef}</p>
                  )}
                </div>
                <button
                  onClick={() => onClose(ref)}
                  className="text-xs text-muted transition-colors hover:text-gold"
                >
                  ✕
                </button>
              </div>

              {/* Contenido */}
              <div className="p-3">
                {entry?.loading && (
                  <p className="animate-pulse text-sm text-muted">{t("loading")}</p>
                )}
                {entry?.error && (
                  <p className="text-sm text-red-400/80">{t("error")}</p>
                )}
                {entry?.result && (
                  <ul className="space-y-2">
                    {entry.result.segments.map((seg, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="select-none text-xs text-gold/50">{i + 1}</span>
                        <p className="hebrew text-base leading-relaxed text-parchment/90">
                          {seg}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
