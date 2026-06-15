"use client";

// Renderiza texto del análisis con referencias cruzadas detectadas automáticamente.
// Extiende InteractiveText añadiendo detección de refs bíblicas/talmúdicas.

import React from "react";
import { parseHyperlinks } from "@/lib/relations/hyperlinks";
import { segmentText } from "@/lib/relations/refDetector";
import { renderRich } from "@/components/study/inlineRender";

// El render de hebreo en línea (withHebrew) y de **negrita**/*cursiva*
// (renderRich) vive en inlineRender.tsx, compartido con InteractiveText/RichText.
// Aquí se conserva lo propio de InlineText: detección de referencias cruzadas
// (segmentText) y de hyperlinks {{study:}}/{{letter:}}.

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
                  {renderRich(seg.value, sk)}
                </React.Fragment>
              );
            })}
          </React.Fragment>
        );
      })}
    </>
  );
}
