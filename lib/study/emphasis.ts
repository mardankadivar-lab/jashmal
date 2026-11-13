// Negrita y cursiva de la prosa del motor — el análisis, separado del dibujo.
//
// Por qué vive aquí y no dentro del componente: el motor NO escribe markdown
// perfecto. Escribe cosas como `**Shemot Rabá 1:1*` (abre con dos asteriscos y
// cierra con uno) o deja un asterisco huérfano al final de una frase. El
// renderizador original solo entendía pares exactos, así que el lector veía los
// asteriscos crudos pegados a la cita — justo encima de las fuentes, que es
// donde más daño hacen. Sacar el análisis a una función pura permite probarlo
// con un banco de casos reales (npm run formato:check) en vez de a ojo.
//
// REGLA: el lector NUNCA debe ver un asterisco. En esta prosa el asterisco solo
// sirve para marcar énfasis; no hay listas con `*` (el motor usa `-`) ni
// multiplicaciones con `*` (usa `×`). Así que el que sobra se descarta en vez
// de enseñarse.

export type EmphasisKind = "plain" | "bold" | "italic";

export interface EmphasisPart {
  text: string;
  kind: EmphasisKind;
}

// Un tramo de énfasis: uno o dos asteriscos, contenido sin asteriscos ni saltos
// de línea, y uno o dos asteriscos al cerrar. Los lados NO tienen que coincidir:
// `**X*` y `*X**` son errores del motor, no del lector.
//
// El contenido no empieza por espacio (como en markdown), para que una
// multiplicación suelta ("3 * 4 * 5") no se vuelva cursiva; y TAMPOCO por un
// signo de cierre o de pausa. Esa segunda condición resuelve un caso real: el
// detector de referencias saca la cita del texto para convertirla en enlace, y
// si la cita iba en negrita —"En **Sukká 14a**, Rabí Elazar…"— los asteriscos
// quedan huérfanos a los lados. Sin esta regla, el `**` que sobra se emparejaba
// con el siguiente asterisco de la frase y ponía en negrita media línea que no
// lo era. Una negrita no empieza nunca por coma.
const EMPHASIS = /(\*{1,2}[^*\s\n,.;:!?)\]}»…–—-][^*\n]*\*{1,2})/g;

/** Asteriscos que quedaron sin pareja. */
const ORPHAN = /\*{1,2}/g;

/**
 * Parte un texto en tramos marcando cuáles van en negrita o cursiva.
 * Nunca devuelve un asterisco: los que no forman pareja se descartan.
 */
export function splitEmphasis(text: string): EmphasisPart[] {
  const out: EmphasisPart[] = [];
  const push = (t: string, kind: EmphasisKind) => {
    if (!t) return;
    // Al quitar un huérfano pueden quedar dos tramos planos seguidos; se unen
    // para no romper una palabra en dos nodos.
    const last = out[out.length - 1];
    if (kind === "plain" && last && last.kind === "plain") last.text += t;
    else out.push({ text: t, kind });
  };

  for (const chunk of text.split(EMPHASIS)) {
    if (!chunk) continue;
    const m = /^(\*{1,2})([^*\n]*?)(\*{1,2})$/.exec(chunk);
    if (m) {
      // El marcador de APERTURA manda: así `**X*` sale en negrita, que es lo
      // que el motor quiso decir al abrir con dos.
      push(m[2], m[1].length === 2 ? "bold" : "italic");
      continue;
    }
    push(chunk.replace(ORPHAN, ""), "plain");
  }
  return out;
}
