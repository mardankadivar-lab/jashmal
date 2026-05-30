// Parser de la sintaxis de hyperlinks internos del motor:
//   {{letter:bet|texto}}   → enlace a un estudio de la letra
//   {{study:término|texto}} → enlace a un estudio enfocado en el concepto

export type Token =
  | { type: "text"; value: string }
  | { type: "letter"; key: string; label: string }
  | { type: "study"; term: string; label: string };

const PATTERN = /\{\{(letter|study):([^|}]+)\|([^}]+)\}\}/g;

export function parseHyperlinks(input: string): Token[] {
  const tokens: Token[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  PATTERN.lastIndex = 0;
  while ((match = PATTERN.exec(input)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: "text", value: input.slice(lastIndex, match.index) });
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
    tokens.push({ type: "text", value: input.slice(lastIndex) });
  }

  return tokens;
}
