// Equivalencias numéricas VERIFICADAS — se calculan en código, no de memoria.
//
// Por qué existe este archivo: al motor se le pedía recordar "palabras con el
// mismo valor" y las inventaba (llegó a afirmar que פרץ valía 105, cuando
// 80+200+90 = 370). Un modelo no puede sumar de memoria lo que no ve. Así que
// la suma la hace el código y al modelo se le entrega una LISTA CERRADA.
//
// Fuente: el banco de gematrías del propio proyecto (lib/nodes/gematrias.ts),
// escrito y verificado por el Sofer. Aquí nada se da por bueno a ciegas:
// cada palabra se vuelve a sumar letra por letra y solo pasa si cuadra.

import { GEMATRIAS } from "@/lib/nodes/gematrias";
import { gematria, gematriaBreakdown, stripNiqud } from "@/lib/sources/lexicon";

export interface VerifiedMatch {
  hebrew: string;   // la palabra, sin niqud
  gloss: string;    // su nombre en español (título del banco)
  sum: string;      // la suma escrita: "פרץ = 80+200+90 = 370"
}

/** Solo letras hebreas y espacios: descarta siglas (מ״ב), fórmulas (13²), etc. */
const ONLY_HEBREW = /^[א-ת ]+$/;

/**
 * Palabras del banco cuyo valor absoluto es exactamente `value`, cada una
 * re-sumada aquí letra por letra. Se excluye la palabra consultada (no es
 * una "conexión" que una palabra coincida consigo misma).
 */
export function verifiedEquivalences(
  value: number,
  consultedWord: string,
  limit = 4
): VerifiedMatch[] {
  if (!value || value < 1) return [];
  const consulted = stripNiqud(consultedWord).replace(/[^א-ת]/g, "");
  const out: VerifiedMatch[] = [];
  const seen = new Set<string>();

  for (const entry of GEMATRIAS) {
    if (entry.num !== value) continue;
    for (const raw of entry.he.split("·")) {
      const word = stripNiqud(raw).trim();
      if (!ONLY_HEBREW.test(word)) continue;          // no es una palabra limpia
      if (gematria(word) !== value) continue;          // la suma NO cuadra: fuera
      const key = word.replace(/ /g, "");
      if (key === consulted || seen.has(key)) continue;
      seen.add(key);
      const parts = gematriaBreakdown(word).map((b) => b.value).join("+");
      out.push({
        hebrew: word,
        gloss: entry.titulo,
        sum: `${word} = ${parts} = ${value}`,
      });
      if (out.length >= limit) return out;
    }
  }
  return out;
}
