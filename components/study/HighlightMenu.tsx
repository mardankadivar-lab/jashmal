"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import type { HighlightColor } from "@/lib/study/cuaderno";

export interface HighlightMenuAnchor {
  x: number;
  y: number;
  hasExisting: boolean;
}

interface HighlightMenuProps {
  anchor: HighlightMenuAnchor | null;
  onPick: (color: HighlightColor) => void;
  onRemove: () => void;
  onClose: () => void;
}

const SWATCHES: { color: HighlightColor; dot: string }[] = [
  { color: "gold", dot: "bg-gold/70" },
  { color: "sky", dot: "bg-sky-300/70" },
  { color: "sage", dot: "bg-emerald-300/60" },
];

// Mini-menú flotante que aparece al seleccionar texto: elige color de resaltado
// o quita el resaltado. Discreto, dorado, coherente con WordMenu.
export default function HighlightMenu({ anchor, onPick, onRemove, onClose }: HighlightMenuProps) {
  const t = useTranslations("cuaderno");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!anchor) return;
    // No cerramos en mousedown global porque el menú aparece justo tras soltar
    // la selección; usamos un cierre diferido por clic-fuera + Escape.
    const closeKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const closeOut = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("keydown", closeKey);
    document.addEventListener("mousedown", closeOut);
    return () => {
      document.removeEventListener("keydown", closeKey);
      document.removeEventListener("mousedown", closeOut);
    };
  }, [anchor, onClose]);

  if (!anchor) return null;

  const MENU_W = anchor.hasExisting ? 210 : 150;
  const vw = typeof window !== "undefined" ? window.innerWidth : 800;
  const left = Math.max(8, Math.min(anchor.x - MENU_W / 2, vw - MENU_W - 8));
  const top = Math.max(8, anchor.y - 52);

  return (
    <div
      ref={ref}
      className="fixed z-50 flex items-center gap-2 rounded-full border border-gold/30 bg-ink/95 px-3 py-2 shadow-2xl backdrop-blur-md"
      style={{ left, top }}
      role="menu"
      aria-label={t("highlightAria")}
    >
      {SWATCHES.map((s) => (
        <button
          key={s.color}
          role="menuitem"
          onClick={() => { onPick(s.color); onClose(); }}
          title={t(`color_${s.color}`)}
          aria-label={t(`color_${s.color}`)}
          className={`h-5 w-5 rounded-full border border-white/20 transition-transform hover:scale-110 ${s.dot}`}
        />
      ))}
      {anchor.hasExisting && (
        <>
          <span className="h-4 w-px bg-gold/20" />
          <button
            role="menuitem"
            onClick={() => { onRemove(); onClose(); }}
            className="font-cinzel text-[10px] uppercase tracking-widest text-muted transition-colors hover:text-gold"
          >
            {t("removeHighlight")}
          </button>
        </>
      )}
    </div>
  );
}
