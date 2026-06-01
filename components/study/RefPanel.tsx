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
  refs: string[];
  onClose: (ref: string) => void;
  onOpenRef: (ref: string) => void;
  onNavigate?: (ref: string) => void; // navegar al texto como estudio principal
}

// Panel de referencias cruzadas: ventana flotante (no full-height) para no
// bloquear el estudio principal. Se apila encima del análisis, encadenable.
export default function RefPanel({ refs, onClose, onOpenRef, onNavigate }: RefPanelProps) {
  const t = useTranslations("refPanel");
  const [entries, setEntries] = useState<Record<string, RefPanelEntry>>({});
  // Tab activo cuando hay varias refs abiertas
  const [activeRef, setActiveRef] = useState<string>(refs[refs.length - 1] ?? "");

  // Actualizar tab activo cuando cambia la lista
  useEffect(() => {
    if (refs.length > 0) setActiveRef(refs[refs.length - 1]);
  }, [refs]);

  // Cargar cada ref nueva
  useEffect(() => {
    for (const ref of refs) {
      if (entries[ref]) continue;
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

  const entry = entries[activeRef];

  return (
    // Ventana flotante no-invasiva: anclada a la derecha del panel de análisis,
    // altura fija con scroll interno, no cubre la pantalla completa.
    <div className="mt-4 overflow-hidden rounded-xl border border-gold/30 bg-ink/95 shadow-xl">
      {/* Cabecera con tabs si hay varias refs */}
      <div className="flex items-center justify-between border-b border-gold/15 bg-gold/[0.06] px-3 py-2">
        <div className="flex flex-wrap gap-1.5">
          {refs.map((ref) => (
            <button
              key={ref}
              onClick={() => setActiveRef(ref)}
              className={
                "rounded px-2 py-0.5 text-xs transition-colors " +
                (ref === activeRef
                  ? "bg-gold/20 font-cinzel text-gold"
                  : "text-muted hover:text-parchment")
              }
            >
              {ref}
              <span
                onClick={(e) => { e.stopPropagation(); onClose(ref); }}
                className="ms-1.5 text-muted/60 hover:text-red-400"
                role="button"
              >
                ✕
              </span>
            </button>
          ))}
        </div>
        <button
          onClick={() => refs.forEach(onClose)}
          className="text-xs text-muted transition-colors hover:text-gold"
          title={t("closeAll")}
        >
          {t("closeAll")}
        </button>
      </div>

      {/* Contenido con scroll (max ~40vh) */}
      <div className="max-h-[40vh] overflow-y-auto p-3">
        {!entry && (
          <p className="animate-pulse text-sm text-muted">{t("loading")}</p>
        )}
        {entry?.loading && (
          <p className="animate-pulse text-sm text-muted">{t("loading")}</p>
        )}
        {entry?.error && (
          <p className="text-sm text-red-400/80">{t("error")}</p>
        )}
        {entry?.result && (
          <div>
            <div className="mb-3 flex items-center justify-between">
          <p className="hebrew text-xs text-muted">{entry.result.heRef}</p>
          {onNavigate && (
            <button
              onClick={() => { onNavigate(activeRef); refs.forEach(onClose); }}
              className="text-xs text-gold/70 transition-colors hover:text-gold"
              title={t("navigate")}
            >
              {t("navigate")} ↗
            </button>
          )}
        </div>
            <ol className="space-y-3">
              {entry.result.segments.map((seg, i) => (
                <li key={i} className="flex flex-col gap-1 border-s-2 border-gold/20 ps-3">
                  <span className="select-none text-[10px] text-gold/50">{i + 1}</span>
                  {/* Hebreo */}
                  <p className="hebrew text-base leading-relaxed text-parchment/90">
                    {seg}
                  </p>
                  {/* Traducción (inglés de Sefaria) si existe */}
                  {entry.result!.translations[i] && (
                    <p className="text-xs leading-relaxed text-muted/80 italic">
                      {entry.result!.translations[i]}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
