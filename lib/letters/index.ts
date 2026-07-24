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
import { kaf } from "./kaf";
import { lamed } from "./lamed";
import { mem } from "./mem";
import { nun } from "./nun";
import { samej } from "./samej";
import { ayin } from "./ayin";
import { pe } from "./pe";
import { tzadi } from "./tzadi";
import { kof } from "./kof";
import { resh } from "./resh";
import { shin } from "./shin";
import { tav } from "./tav";

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
  kaf, // verificada — 2026-07-23
  lamed, // verificada — 2026-07-23
  mem, // verificada — 2026-07-23
  nun, // verificada — 2026-07-23
  samej, // verificada — 2026-07-23
  ayin, // verificada — 2026-07-23
  pe, // verificada — 2026-07-23
  tzadi, // verificada — 2026-07-23
  kof, // verificada — 2026-07-23
  resh, // verificada — 2026-07-23
  shin, // verificada — 2026-07-23
  tav, // verificada — 2026-07-23
  // ¡22/22! El alef-bet completo, cada letra verificada por el editor-erudito.
};

export function getLetter(slug: string): LetterData | undefined {
  return LETTERS[slug];
}

export type { LetterData };
export { pickText } from "./types";
