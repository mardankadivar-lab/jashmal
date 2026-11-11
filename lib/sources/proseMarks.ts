// Marcas que el servidor inserta EN LA PROSA cuando una afirmación no pasó
// la verificación. Son texto, no HTML: si el frontend no las interpreta, el
// lector igual las lee ("⟪la suma real es 86⟫") y la prosa sigue entera.
//
// Por qué marcar y no borrar: la salida de este botón es prosa, no una lista.
// Podar una frase destroza el argumento del que forma parte; corregir el número
// en silencio cambia el razonamiento sin avisar. Marcar deja el texto intacto
// y le quita la autoridad al dato que falló, que es exactamente lo que hace
// falta: que una cifra o un folio falsos no luzcan como los verdaderos.

export const MARK_OPEN = "⟪";
export const MARK_CLOSE = "⟫";

/** Una marca a insertar DESPUÉS del tramo que empieza en `end`. */
export interface Mark {
  /** posición en el texto original donde termina la afirmación marcada. */
  end: number;
  /** texto de la marca, sin los delimitadores. */
  note: string;
}

/**
 * Inserta las marcas en el texto. Se aplican de atrás hacia adelante para que
 * los índices de las anteriores sigan siendo válidos. Marcas duplicadas en la
 * misma posición se colapsan en una.
 */
export function annotate(text: string, marks: Mark[]): string {
  const byEnd = new Map<number, string>();
  for (const m of marks) {
    if (m.end < 0 || m.end > text.length) continue;
    if (!byEnd.has(m.end)) byEnd.set(m.end, m.note);
  }
  const ends = [...byEnd.keys()].sort((a, b) => b - a);
  let out = text;
  for (const end of ends) {
    out = `${out.slice(0, end)} ${MARK_OPEN}${byEnd.get(end)}${MARK_CLOSE}${out.slice(end)}`;
  }
  return out;
}

/**
 * Parte una línea en tramos, señalando cuáles son marcas. Lo usa la interfaz
 * para pintar la marca distinta del resto (nunca con el mismo peso visual).
 */
export function splitMarks(line: string): { text: string; mark: boolean }[] {
  const out: { text: string; mark: boolean }[] = [];
  let i = 0;
  while (i < line.length) {
    const open = line.indexOf(MARK_OPEN, i);
    if (open === -1) {
      out.push({ text: line.slice(i), mark: false });
      break;
    }
    const close = line.indexOf(MARK_CLOSE, open + 1);
    if (close === -1) {
      out.push({ text: line.slice(i), mark: false });
      break;
    }
    if (open > i) out.push({ text: line.slice(i, open), mark: false });
    out.push({ text: line.slice(open + 1, close), mark: true });
    i = close + 1;
  }
  return out.filter((p) => p.text.length > 0);
}
