"use client";

import React from "react";
import { Link } from "@/i18n/navigation";
import { parseHyperlinks } from "@/lib/relations/hyperlinks";
import { renderRich } from "@/components/study/inlineRender";
import { studyHref, letterHref } from "./links";

// Renderiza una línea de la estación: convierte {{study:…}} / {{letter:…}} en
// enlaces dorados que NAVEGAN a la otra estación / misterio / letra (a
// diferencia del motor de estudio, que abre paneles laterales). Reutiliza el
// parser oficial (parseHyperlinks) y el render de hebreo+negrita (renderRich).
//
// Si el destino no tiene página segura, el término se pinta como texto dorado
// no-clicable (nunca un enlace 404).

export default function EstacionInline({
  text,
  keyPrefix = "i",
}: {
  text: string;
  keyPrefix?: string;
}) {
  const tokens = parseHyperlinks(text);

  return (
    <>
      {tokens.map((tok, i) => {
        const key = `${keyPrefix}-${i}`;
        if (tok.type === "text") {
          return <React.Fragment key={key}>{renderRich(tok.value, key)}</React.Fragment>;
        }
        const href = tok.type === "letter" ? letterHref(tok.key) : studyHref(tok.term);
        if (href) {
          return (
            <Link key={key} href={href} className="gold-link">
              {tok.label}
            </Link>
          );
        }
        // Sin ruta segura: dorado, pero no enlace (evita 404).
        return (
          <span key={key} className="text-gold/80">
            {tok.label}
          </span>
        );
      })}
    </>
  );
}
