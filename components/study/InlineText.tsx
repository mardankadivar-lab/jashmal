"use client";

// Renderiza texto del análisis con referencias cruzadas detectadas automáticamente.
// Extiende InteractiveText añadiendo detección de refs bíblicas/talmúdicas.

import React from "react";
import { parseHyperlinks } from "@/lib/relations/hyperlinks";
import { segmentText } from "@/lib/relations/refDetector";

const HEBREW = /[֐-׿]/;

function withHebrew(text: string, key: string): React.ReactNode {
  if (HEBREW.test(text)) {
    return <bdi key={key} className="hebrew-inline">{text}</bdi>;
  }
  return <React.Fragment key={key}>{text}</React.Fragment>;
}

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

export interface InlineTextProps {
  text: string;
  onConcept?: (term: string) => void;
  onLetter?: (key: string, label: string) => void;
  onRef?: (ref: string) => void;  // abre una referencia en el panel lateral
  keyPrefix?: string;
}

export default function InlineText({
  text,
  onConcept,
  onLetter,
  onRef,
  keyPrefix = "it",
}: InlineTextProps) {
  // Primero parseamos hyperlinks {{letter:..}} y {{study:..}}
  const tokens = parseHyperlinks(text);

  return (
    <>
      {tokens.map((tok, i) => {
        const key = `${keyPrefix}-${i}`;

        if (tok.type === "letter") {
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

        if (tok.type === "study") {
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
        }

        // Texto plano: buscamos referencias cruzadas dentro de él.
        const segs = segmentText(tok.value);
        return (
          <React.Fragment key={key}>
            {segs.map((seg, j) => {
              const sk = `${key}-s${j}`;
              if (seg.type === "ref") {
                return (
                  <button
                    key={sk}
                    type="button"
                    className="ref-link"
                    onClick={() => onRef?.(seg.ref)}
                    title={`Abrir ${seg.ref}`}
                  >
                    {seg.value}
                  </button>
                );
              }
              return (
                <React.Fragment key={sk}>
                  {renderBold(seg.value, sk)}
                </React.Fragment>
              );
            })}
          </React.Fragment>
        );
      })}
    </>
  );
}
