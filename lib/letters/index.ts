// Registro de letras. El motor lee este mapa por `slug`. Para sumar una letra
// nueva: crear lib/letters/<slug>.ts y registrarla aquí. Nada más.
import type { LetterData } from "./types";
import { alef } from "./alef";
import { bet } from "./bet";
import { guimel } from "./guimel";
import { dalet } from "./dalet";
import { he } from "./he";
import { vav } from "./vav";
import { zayin } from "./zayin";
import { jet } from "./jet";
import { tet } from "./tet";
import { yod } from "./yod";

// Orden alfabético hebreo. Cada letra entra SOLO con contenido verificado por
// el Sofer (editor-erudito); registrarla aquí la PUBLICA en /letra/<slug>.
export const LETTERS: Record<string, LetterData> = {
  alef,
  bet, // verificada — 2026-07-23
  guimel, // verificada — 2026-07-23
  dalet, // verificada — 2026-07-23
  he, // verificada — 2026-07-23
  vav, // verificada — 2026-07-14
  zayin, // verificada — 2026-07-16
  jet, // verificada — 2026-07-23
  tet, // verificada — 2026-07-23
  yod, // verificada — 2026-07-23
  // kaf, lamed, … (se agregan a medida que el Sofer verifica su contenido)
};

export function getLetter(slug: string): LetterData | undefined {
  return LETTERS[slug];
}

export type { LetterData };
export { pickText } from "./types";
