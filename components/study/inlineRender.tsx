import React from "react";
import { MARK_CLOSE, MARK_OPEN } from "@/lib/sources/proseMarks";

// Render compartido de texto del Sofer con hebreo en línea + formato Markdown
// ligero. Usado por InlineText, InteractiveText y RichText para evitar tres
// copias casi idénticas de la misma lógica.

// Tramo CONTINUO de hebreo (palabras + espacios/maqaf entre ellas, incluye
// niqud y gershayim). Aísla SOLO el hebreo, no el latín que lo rodea: si
// envolviéramos el fragmento entero en <bdi class="hebrew-inline">, el español
// heredaría la fuente hebrea (Frank Ruhl Libre) y el tamaño 1.2em, desordenando
// el párrafo (bug bidi real). bdi aísla la dirección sin voltear el texto
// circundante.
const HE_RUN = /[֐-׿][֐-׿\s־]*[֐-׿]|[֐-׿]/g;

/** Envuelve SOLO los tramos hebreos de un texto mixto en <bdi class="hebrew-inline">. */
export function withHebrew(text: string, key: string): React.ReactNode[] {
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
  return out;
}

/**
 * Resalta **negrita** y *cursiva* dentro de un fragmento de texto plano,
 * aislando además el hebreo en línea. Soporta ambos formatos: el texto que solo
 * usa **negrita** se renderiza igual que antes; *cursiva* añade <em>.
 */
// Marcas del verificador: ⟪referencia sin confirmar: …⟫. Las inserta el
// servidor cuando una cita o una suma NO pasan la comprobación en código.
const MARK_RE = new RegExp(`(${MARK_OPEN}[^${MARK_CLOSE}]*${MARK_CLOSE})`, "g");

export function renderRich(text: string, keyPrefix: string): React.ReactNode[] {
  // Primero las marcas del verificador. Una cita que no pasó la comprobación
  // NO puede lucir con el mismo peso que lo verificado: va pequeña y en gris,
  // nunca en dorado. (Mismo criterio que MarkedText en LexiconPanel.)
  if (text.includes(MARK_OPEN)) {
    const chunks = text.split(MARK_RE).filter(Boolean);
    if (chunks.length > 1) {
      const out: React.ReactNode[] = [];
      chunks.forEach((chunk, ci) => {
        if (chunk.startsWith(MARK_OPEN) && chunk.endsWith(MARK_CLOSE)) {
          out.push(
            <span
              key={`${keyPrefix}-mk${ci}`}
              className="mx-0.5 rounded border border-muted/30 bg-muted/10 px-1 py-px align-baseline text-[9px] text-muted/90"
            >
              {chunk.slice(MARK_OPEN.length, -MARK_CLOSE.length)}
            </span>
          );
        } else {
          out.push(...renderRich(chunk, `${keyPrefix}-m${ci}`));
        }
      });
      return out;
    }
  }
  // Tokeniza por **negrita** y *cursiva* conservando los delimitadores.
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean);
  return parts.map((part, idx) => {
    const k = `${keyPrefix}-${idx}`;
    if (/^\*\*[^*]+\*\*$/.test(part)) {
      return <strong key={k}>{withHebrew(part.slice(2, -2), k)}</strong>;
    }
    if (/^\*[^*]+\*$/.test(part)) {
      return <em key={k}>{withHebrew(part.slice(1, -1), k)}</em>;
    }
    return <React.Fragment key={k}>{withHebrew(part, k)}</React.Fragment>;
  });
}
