// ─────────────────────────────────────────────────────────────────────────
// atlasHarvest.ts — "cosecha" del Atlas vivo.
// Igual que brainHarvest convierte un estudio en sinapsis, este convierte un
// estudio en LOCALIDADES encendidas. Detecta qué lugares del gazetteer aparecen
// en el estudio (tema + análisis) y los agrega al Atlas de forma idempotente.
// La materia prima son nombres de lugar pre-verificados (coordenadas + hebreo
// exacto): NUNCA se inventa una localidad, solo se enciende una ya curada.
// ─────────────────────────────────────────────────────────────────────────

import { detectPlaceIds, gazetteerById } from "@/lib/atlas/atlasGazetteer";
import { addPlace, recordPlaceHit } from "@/lib/atlas/atlasStore";

export type AtlasHarvestInput = {
  subject: string; // tema del estudio (ref de Sefaria, término o letra)
  text: string;    // el análisis generado
};

export type AtlasHarvestResult = {
  added: string[]; // localidades recién encendidas (el Atlas creció)
  lit: string[];   // localidades ya presentes cuyo brillo subió
};

// Máximo de localidades NUEVAS encendidas por un solo estudio (evita inundar el
// Atlas si un texto menciona muchos lugares de pasada).
const MAX_NEW_PER_STUDY = 6;

export async function harvestPlacesFromStudy(
  input: AtlasHarvestInput,
): Promise<AtlasHarvestResult> {
  const ids = detectPlaceIds(input.subject, input.text);
  const added: string[] = [];
  const lit: string[] = [];

  for (const id of ids) {
    const place = gazetteerById(id);
    if (!place) continue;

    // las de gazetteer ya están verificadas → se encienden aprobadas al instante
    let isNew = false;
    if (added.length < MAX_NEW_PER_STUDY) {
      isNew = await addPlace(place, "approved", place.source === "seed" ? "seed" : "harvest");
    }
    // brillo + "conexión a lo estudiado" (vale para nuevas y ya existentes)
    await recordPlaceHit(id, input.subject);

    if (isNew) added.push(id);
    else lit.push(id);
  }

  return { added, lit };
}
