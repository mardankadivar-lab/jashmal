"use client";

import React from "react";
import { parseHyperlinks } from "@/lib/relations/hyperlinks";
import { renderRich } from "@/components/study/inlineRender";

// El render de hebreo en línea (withHebrew) y de **negrita**/*cursiva*
// (renderRich) vive en inlineRender.tsx, compartido con InlineText/RichText.

export interface InlineProps {
  text: string;
  onConcept?: (term: string) => void;
  onLetter?: (key: string, label: string) => void;
  keyPrefix?: string;
}

/** Renderiza una línea: convierte {{letter:..}} y {{study:..}} en enlaces dorados. */
export default function Inline({ text, onConcept, onLetter, keyPrefix = "i" }: InlineProps) {
  const tokens = parseHyperlinks(text);

  return (
    <>
      {tokens.map((tok, i) => {
        const key = `${keyPrefix}-${i}`;
        if (tok.type === "text") {
          return <React.Fragment key={key}>{renderRich(tok.value, key)}</React.Fragment>;
        }
        if (tok.type === "letter") {
          // Abre la letra en panel lateral (no navega, no pierde el estudio).
          return (
            <button
              key={key}
              type="button"
              className="gold-link"
              onClick={() => onLetter?.(tok.key, tok.label)}
            >
              {tok.label}
            </button>
          );
        }
        // concepto
        return (
          <button
            key={key}
            type="button"
            className="gold-link"
            onClick={() => onConcept?.(tok.term)}
          >
            {tok.label}
          </button>
        );
      })}
    </>
  );
}
