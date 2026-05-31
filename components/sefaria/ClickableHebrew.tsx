"use client";

import React from "react";

export interface WordAnchor {
  word: string;
  x: number; // centro horizontal de la palabra (viewport)
  y: number; // borde inferior de la palabra (viewport)
  top: number; // borde superior de la palabra (viewport)
}

interface ClickableHebrewProps {
  text: string;
  onWord: (anchor: WordAnchor) => void;
  className?: string;
}

// Parte un segmento hebreo en palabras pulsables. Cada palabra abre el léxico
// como popup anclado junto a ella (pasamos su posición en pantalla).
export default function ClickableHebrew({ text, onWord, className }: ClickableHebrewProps) {
  const tokens = text.split(/(\s+|־)/);

  function handle(e: React.MouseEvent<HTMLButtonElement>, tok: string) {
    const r = e.currentTarget.getBoundingClientRect();
    onWord({ word: tok, x: r.left + r.width / 2, y: r.bottom, top: r.top });
  }

  return (
    <p className={className}>
      {tokens.map((tok, i) => {
        if (!tok || /^\s+$/.test(tok) || tok === "־") {
          return <React.Fragment key={i}>{tok}</React.Fragment>;
        }
        if (!/[א-ת]/.test(tok)) {
          return <React.Fragment key={i}>{tok}</React.Fragment>;
        }
        return (
          <button
            key={i}
            type="button"
            onClick={(e) => handle(e, tok)}
            className="cursor-pointer rounded transition-colors hover:bg-gold/15 hover:text-gold-soft"
            title={tok}
          >
            {tok}
          </button>
        );
      })}
    </p>
  );
}
