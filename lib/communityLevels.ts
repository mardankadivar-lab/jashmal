// ─────────────────────────────────────────────────────────────────────────
// communityLevels.ts — la escalera de ascenso del estudiante en la Comunidad.
// El nivel se calcula por "estrellas" (jidushim aceptados y encendidos por
// Mardan). מְקֻבָּל (Mekubal) NO se gana por cantidad: se otorga a mano.
// ─────────────────────────────────────────────────────────────────────────

export type Level = {
  key: string;
  he: string;
  es: string;
  min: number;       // estrellas mínimas para alcanzarlo
  granted?: boolean; // true = solo se otorga a mano (no por conteo)
};

// La escalera, de menor a mayor. Los 'min' son las estrellas necesarias.
export const LEVELS: Level[] = [
  { key: "talmid", he: "תַּלְמִיד", es: "Talmid", min: 0 },   // estudiante
  { key: "shoel", he: "שׁוֹאֵל", es: "Shoel", min: 1 },       // el que pregunta
  { key: "javer", he: "חָבֵר", es: "Javer", min: 3 },         // compañero de estudio
  { key: "maguid", he: "מַגִּיד", es: "Maguid", min: 6 },     // el que enseña
  { key: "jajam", he: "חָכָם", es: "Jajam", min: 10 },        // sabio
  { key: "mekubal", he: "מְקֻבָּל", es: "Mekubal", min: Infinity, granted: true }, // a mano
];

export type Progress = { current: Level; next: Level | null; toNext: number };

// Devuelve el nivel actual (por estrellas), el siguiente y cuántas faltan.
// Si el nivel guardado es 'mekubal' (otorgado a mano), tiene prioridad.
export function levelForStars(stars: number, storedLevel?: string): Progress {
  if (storedLevel === "mekubal") {
    return { current: LEVELS[LEVELS.length - 1], next: null, toNext: 0 };
  }
  const ladder = LEVELS.filter((l) => !l.granted);
  let current = ladder[0];
  for (const l of ladder) if (stars >= l.min) current = l;
  const idx = ladder.indexOf(current);
  const next = ladder[idx + 1] ?? null;
  const toNext = next ? Math.max(0, next.min - stars) : 0;
  return { current, next, toNext };
}
