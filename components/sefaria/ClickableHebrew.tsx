"use client";

import React from "react";

export interface WordAnchor {
  word: string;
  x: number;
  y: number;
  top: number;
}

export interface WordMenuAnchorEvt {
  word: string;
  x: number;
  y: number;
}

interface ClickableHebrewProps {
  text: string;
  onWord: (anchor: WordAnchor) => void;
  onWordMenu?: (anchor: WordMenuAnchorEvt) => void; // clic derecho
  className?: string;
}

// Parte un segmento hebreo en palabras pulsables.
// Clic izquierdo → abre el léxico (WordAnchor con posición para popup).
// Clic derecho  → abre el menú contextual (léxico o tutor).
export default function ClickableHebrew({
  text,
  onWord,
  onWordMenu,
  className,
}: ClickableHebrewProps) {
  const tokens = text.split(/(\s+|־)/);

  function handleLeft(e: React.MouseEvent<HTMLButtonElement>, tok: string) {
    const r = e.currentTarget.getBoundingClientRect();
    onWord({ word: tok, x: r.left + r.width / 2, y: r.bottom, top: r.top });
  }

  function handleRight(e: React.MouseEvent<HTMLButtonElement>, tok: string) {
    e.preventDefault(); // evitar el menú nativo del sistema
    onWordMenu?.({ word: tok, x: e.clientX, y: e.clientY });
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
            onClick={(e) => handleLeft(e, tok)}
            onContextMenu={(e) => handleRight(e, tok)}
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
