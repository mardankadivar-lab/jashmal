// Parser de la sintaxis de hyperlinks internos del motor:
//   {{letter:bet|texto}}   → enlace a un estudio de la letra
//   {{study:término|texto}} → enlace a un estudio enfocado en el concepto

export type Token =
  | { type: "text"; value: string }
  | { type: "letter"; key: string; label: string }
  | { type: "study"; term: string; label: string };

const PATTERN = /\{\{(letter|study):([^|}]+)\|([^}]+)\}\}/g;

// Fragmento de enlace MALFORMADO o incompleto (sin cerrar, sin label, truncado
// por streaming o por el límite de tokens). Lo ocultamos para que nunca se vea
// el código crudo "{{study:..." en pantalla.
const STRAY = /\{\{(?:letter|study):[^}]*\}?\}?/g;

function cleanText(text: string): string {
  return text.replace(STRAY, "").replace(/\{\{[^}]*$/g, "");
}

export function parseHyperlinks(input: string): Token[] {
  const tokens: Token[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  PATTERN.lastIndex = 0;
  while ((match = PATTERN.exec(input)) !== null) {
    if (match.index > lastIndex) {
      const txt = cleanText(input.slice(lastIndex, match.index));
      if (txt) tokens.push({ type: "text", value: txt });
    }
    const [, kind, ref, label] = match;
    if (kind === "letter") {
      tokens.push({ type: "letter", key: ref.trim(), label: label.trim() });
    } else {
      tokens.push({ type: "study", term: ref.trim(), label: label.trim() });
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < input.length) {
    const txt = cleanText(input.slice(lastIndex));
    if (txt) tokens.push({ type: "text", value: txt });
  }

  return tokens;
}
