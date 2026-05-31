"use client";

import React from "react";

interface ClickableHebrewProps {
  text: string;
  onWord: (word: string) => void;
  className?: string;
}

// Parte un segmento hebreo en palabras pulsables. Cada palabra abre el léxico.
// Divide por espacios y por maqaf (־), conservando el niqud de cada palabra.
export default function ClickableHebrew({ text, onWord, className }: ClickableHebrewProps) {
  // Mantén los separadores para reconstruir el texto visualmente.
  const tokens = text.split(/(\s+|־)/);

  return (
    <p className={className}>
      {tokens.map((tok, i) => {
        // separadores (espacios, maqaf) o vacíos → tal cual
        if (!tok || /^\s+$/.test(tok) || tok === "־") {
          return <React.Fragment key={i}>{tok}</React.Fragment>;
        }
        // ¿tiene al menos una consonante hebrea?
        if (!/[א-ת]/.test(tok)) {
          return <React.Fragment key={i}>{tok}</React.Fragment>;
        }
        return (
          <button
            key={i}
            type="button"
            onClick={() => onWord(tok)}
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
