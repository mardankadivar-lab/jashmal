import React from "react";

// Renderiza el texto de las lecciones respetando el formato del Sofer:
//   **negrita**  ·  *cursiva*  ·  hebreo en línea (aislado con <bdi> para que
// no desordene el párrafo latino). NO procesa {{hooks}}: en el cuerpo de las 6
// lecciones no hay; los puentes "Sigue el hilo" se renderizan aparte.

// Rango hebreo (incluye niqud, maqaf, gershayim).
const HE_RUN = /[֐-׿][֐-׿\s־]*[֐-׿]|[֐-׿]/g;

// Envuelve SOLO los tramos hebreos de un texto mixto en <bdi class="hebrew-inline">.
function withHebrew(text: string, kp: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  let last = 0;
  let i = 0;
  let m: RegExpExecArray | null;
  HE_RUN.lastIndex = 0;
  while ((m = HE_RUN.exec(text)) !== null) {
    if (m.index > last) out.push(<React.Fragment key={`${kp}-t${i}`}>{text.slice(last, m.index)}</React.Fragment>);
    out.push(
      <bdi key={`${kp}-h${i}`} dir="rtl" className="hebrew-inline">
        {m[0]}
      </bdi>
    );
    last = m.index + m[0].length;
    i++;
  }
  if (last < text.length) out.push(<React.Fragment key={`${kp}-t${i}`}>{text.slice(last)}</React.Fragment>);
  return out;
}

function renderRich(text: string, kp: string): React.ReactNode[] {
  // Tokeniza por **negrita** y *cursiva* conservando los delimitadores.
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean);
  return parts.map((part, idx) => {
    const k = `${kp}-${idx}`;
    if (/^\*\*[^*]+\*\*$/.test(part)) {
      return <strong key={k}>{withHebrew(part.slice(2, -2), k)}</strong>;
    }
    if (/^\*[^*]+\*$/.test(part)) {
      return <em key={k}>{withHebrew(part.slice(1, -1), k)}</em>;
    }
    return <React.Fragment key={k}>{withHebrew(part, k)}</React.Fragment>;
  });
}

export default function RichText({ text, keyPrefix = "r" }: { text: string; keyPrefix?: string }) {
  return <>{renderRich(text, keyPrefix)}</>;
}
