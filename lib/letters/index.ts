// Registro de letras. El motor lee este mapa por `slug`. Para sumar una letra
// nueva: crear lib/letters/<slug>.ts y registrarla aquí. Nada más.
import type { LetterData } from "./types";
import { alef } from "./alef";
import { vav } from "./vav";
import { zayin } from "./zayin";

export const LETTERS: Record<string, LetterData> = {
  alef,
  vav, // enseñanza verificada por el Sofer (Ginsburgh 3×3) — 2026-07-14
  zayin, // enseñanza verificada por el Sofer (Ginsburgh 3×3) — 2026-07-16
  // bet, guimel, … (se agregan a medida que el Sofer verifica su contenido)
};

export function getLetter(slug: string): LetterData | undefined {
  return LETTERS[slug];
}

export type { LetterData };
export { pickText } from "./types";
