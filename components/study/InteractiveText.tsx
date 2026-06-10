"use client";

import React from "react";
import { parseHyperlinks } from "@/lib/relations/hyperlinks";

const HEBREW = /[֐-׿]/;

// Aísla cada palabra hebrea con <bdi> para que no desordene el párrafo latino
// (RTL/LTR mezclados). bdi aísla la dirección sin voltear el texto circundante.
function withHebrew(text: string, key: string): React.ReactNode {
  if (HEBREW.test(text)) {
    return (
      <bdi key={key} className="hebrew-inline">
        {text}
      </bdi>
    );
  }
  return <React.Fragment key={key}>{text}</React.Fragment>;
}

// Resalta **negritas** dentro de un fragmento de texto plano.
function renderBold(text: string, keyPrefix: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return parts.map((part, i) => {
    const key = `${keyPrefix}-b${i}`;
    if (part.startsWith("**") && part.endsWith("**")) {
      const inner = part.slice(2, -2);
      return <strong key={key}>{withHebrew(inner, key)}</strong>;
    }
    return withHebrew(part, key);
  });
}

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
          return <React.Fragment key={key}>{renderBold(tok.value, key)}</React.Fragment>;
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
