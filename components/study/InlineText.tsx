"use client";

// Renderiza texto del análisis con referencias cruzadas detectadas automáticamente.
// Extiende InteractiveText añadiendo detección de refs bíblicas/talmúdicas.

import React from "react";
import { parseHyperlinks } from "@/lib/relations/hyperlinks";
import { segmentText } from "@/lib/relations/refDetector";

// Tramo CONTINUO de hebreo (palabras + espacios/maqaf entre ellas). Aísla SOLO
// el hebreo, no el latín que lo rodea: si envolviéramos el fragmento entero en
// <bdi class="hebrew-inline">, el español heredaría la fuente hebrea y el tamaño
// 1.2em, desordenando el párrafo (bug bidi real).
const HE_RUN = /[֐-׿][֐-׿\s־]*[֐-׿]|[֐-׿]/g;

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
  // Si no había hebreo, devolvemos el texto tal cual (un solo fragmento).
  return out.length ? <React.Fragment key={key}>{out}</React.Fragment> : <React.Fragment key={key}>{text}</React.Fragment>;
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
