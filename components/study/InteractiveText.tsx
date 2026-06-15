"use client";

import React from "react";
import { parseHyperlinks } from "@/lib/relations/hyperlinks";

// Tramo CONTINUO de hebreo (palabras + espacios/maqaf entre ellas).
const HE_RUN = /[֐-׿][֐-׿\s־]*[֐-׿]|[֐-׿]/g;

// Aísla SOLO los tramos hebreos con <bdi> para que no desordenen el párrafo
// latino (RTL/LTR mezclados). bdi aísla la dirección sin voltear el texto
// circundante. Clave: envolver SOLO el hebreo — no el español que lo rodea —
// para que el latín no herede la fuente hebrea ni el tamaño 1.2em.
function withHebrew(text: string, key: string): React.ReactNode {
  const out: React.ReactNode[] = [];
  let last = 0;
  let i = 0;
  let m: RegExpExecArray | null;
  HE_RUN.lastIndex = 0;
  while ((m = HE_RUN.exec(text)) !== null) {
    if (m.index > last) {
      out.push(<React.Fragment key={`${key}-t${i}`}>{text.slice(last, m.index)}</React.Fragment>);
    }
    out.push(
      <bdi key={`${key}-h${i}`} dir="rtl" className="hebrew-inline">
        {m[0]}
      </bdi>
    );
    last = m.index + m[0].length;
    i++;
  }
  if (last < text.length) {
    out.push(<React.Fragment key={`${key}-t${i}`}>{text.slice(last)}</React.Fragment>);
  }
  return out.length ? <React.Fragment key={key}>{out}</React.Fragment> : <React.Fragment key={key}>{text}</React.Fragment>;
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
