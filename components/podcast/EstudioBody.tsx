"use client";

import React from "react";

// ─────────────────────────────────────────────────────────────────────────
//  Render del estudio de un episodio del podcast.
// ─────────────────────────────────────────────────────────────────────────
//  El cuerpo es el guion del Sofer TAL CUAL: prosa de monólogo, párrafos
//  separados por línea en blanco, y líneas de `...` que en el guion marcan
//  una pausa de la voz. Aquí esa pausa se pinta como un respiro (un rombo
//  dorado), que es lo que de verdad significa: el texto no se edita para la
//  web, se presenta.
//
//  Deliberadamente sin dependencias y sin markdown completo: estos guiones no
//  traen encabezados, tablas ni listas. Solo **negrita**, *cursiva* y «comillas».
//  Si algún día un guion trae más estructura, se amplía aquí — no en el texto.
// ─────────────────────────────────────────────────────────────────────────

type Bloque =
  | { kind: "p"; text: string }
  | { kind: "respiro" }
  // Encabezado markdown (`#`, `##`, `###`): hoy no lo usa ningún guion de
  // monólogo, pero si llega uno no se pinta el `#` crudo.
  | { kind: "h"; text: string };

/** Una línea es "pausa de voz" si es solo puntos suspensivos o guiones. */
function esRespiro(linea: string): boolean {
  const t = linea.trim();
  return /^(\.{3,}|…|-{3,}|\*{3,})$/.test(t);
}

export function aBloques(markdown: string): Bloque[] {
  const bloques: Bloque[] = [];
  const lineas = markdown.replace(/\r\n/g, "\n").split("\n");
  let buf: string[] = [];

  const cerrar = () => {
    if (buf.length) {
      bloques.push({ kind: "p", text: buf.join(" ").trim() });
      buf = [];
    }
  };

  for (const linea of lineas) {
    if (esRespiro(linea)) {
      cerrar();
      // Dos respiros seguidos no se pintan dos veces.
      if (bloques.at(-1)?.kind !== "respiro") bloques.push({ kind: "respiro" });
      continue;
    }
    if (!linea.trim()) {
      cerrar();
      continue;
    }
    const h = linea.match(/^#{1,6}\s+(.*)$/);
    if (h) {
      cerrar();
      bloques.push({ kind: "h", text: h[1].trim() });
      continue;
    }
    buf.push(linea.trim());
  }
  cerrar();
  return bloques;
}

/** **negrita** y *cursiva*, sin tocar nada más del texto. */
function Rico({ text, k }: { text: string; k: string }) {
  const partes = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean);
  return (
    <>
      {partes.map((p, i) => {
        const key = `${k}-${i}`;
        if (p.startsWith("**") && p.endsWith("**")) {
          return (
            <strong key={key} className="font-semibold text-parchment">
              {p.slice(2, -2)}
            </strong>
          );
        }
        if (p.startsWith("*") && p.endsWith("*") && p.length > 2) {
          return (
            <em key={key} className="italic">
              {p.slice(1, -1)}
            </em>
          );
        }
        return <React.Fragment key={key}>{p}</React.Fragment>;
      })}
    </>
  );
}

export default function EstudioBody({ markdown }: { markdown: string }) {
  const bloques = aBloques(markdown);

  return (
    <div className="font-body">
      {bloques.map((b, i) => {
        const key = `b${i}`;
        if (b.kind === "respiro") {
          return (
            <div key={key} className="my-9 flex items-center justify-center gap-3" aria-hidden>
              <span className="h-px w-10 bg-gold/20" />
              <span className="text-[10px] text-gold/45">◆</span>
              <span className="h-px w-10 bg-gold/20" />
            </div>
          );
        }
        if (b.kind === "h") {
          return (
            <h2
              key={key}
              className="mb-4 mt-10 font-cinzel text-base font-bold tracking-wide text-gold/85 sm:text-lg"
            >
              <Rico text={b.text} k={key} />
            </h2>
          );
        }
        return (
          <p
            key={key}
            className="mb-5 text-[1.05rem] leading-[1.85] text-parchment/85"
          >
            <Rico text={b.text} k={key} />
          </p>
        );
      })}
    </div>
  );
}
