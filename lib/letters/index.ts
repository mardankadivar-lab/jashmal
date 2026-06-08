// Registro de letras. El motor lee este mapa por `slug`. Para sumar una letra
// nueva: crear lib/letters/<slug>.ts y registrarla aquí. Nada más.
import type { LetterData } from "./types";
import { alef } from "./alef";

export const LETTERS: Record<string, LetterData> = {
  alef,
  // bet, guimel, … (se agregan a medida que el Sofer verifica su contenido)
};

export function getLetter(slug: string): LetterData | undefined {
  return LETTERS[slug];
}

export type { LetterData };
export { pickText } from "./types";
