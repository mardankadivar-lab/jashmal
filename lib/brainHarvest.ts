// ─────────────────────────────────────────────────────────────────────────
// brainHarvest.ts — "alimentación" del cerebro.
// Convierte un estudio en sinapsis y conexiones NUEVAS (estado 'pending'),
// listas para que el Sofer las apruebe. La materia prima son los hyperlinks
// internos {{study:...}} / {{letter:...}} que el motor ya marca, más el sujeto
// del estudio. Reutiliza nodos existentes (match por nombre) para no duplicar.
// ─────────────────────────────────────────────────────────────────────────

import { parseHyperlinks } from "./hyperlinks";
import { addNode, addEdge, existingNodeIds } from "./brainStore";
import { resolveHebrewLetter } from "./hebrewLetters";
import type { BNode } from "./brainData";

function titleCase(s: string): string {
  const t = s.trim();
  return t ? t[0].toUpperCase() + t.slice(1) : t;
}

export type HarvestInput = {
  subjectId: string;
  subjectLabel: string;
  subjectCat: string;
  subjectLevel: BNode["level"];
  url?: string;
  text: string; // el análisis generado (con hyperlinks {{...}})
};

// Mínimo de conceptos enlazados para considerar que un estudio "alimenta"
// (evita meter ruido de consultas triviales).
const MIN_LINKS = 2;

export async function harvestFromStudy(
  input: HarvestInput,
): Promise<{ created: number; subject: string; concepts: string[] }> {
  const tokens = parseHyperlinks(input.text).filter(
    (t) => t.type === "letter" || t.type === "study",
  );
  if (tokens.length < MIN_LINKS) {
    return { created: 0, subject: input.subjectId, concepts: [] };
  }

  // mapa de ids existentes (lowercase → id real) para reutilizar el canónico
  const existing = await existingNodeIds();
  const canonical = (label: string): string => existing.get(label.toLowerCase()) ?? label;

  // sujeto del estudio
  const subjId = canonical(input.subjectId);
  await addNode(
    {
      id: subjId,
      label: input.subjectLabel,
      labelFa: input.subjectLabel,
      cat: input.subjectCat,
      level: input.subjectLevel,
      url: input.url,
    },
    "pending",
    "study",
  );

  const concepts: string[] = [];
  const seen = new Set<string>([subjId.toLowerCase()]);
  let created = 1;

  for (const t of tokens) {
    let rawId: string;
    if (t.type === "letter") {
      // slug de letra → glifo/nombre hebreo si se puede resolver
      rawId = titleCase(resolveHebrewLetter(t.key) || t.key);
    } else {
      rawId = titleCase(t.label || t.term);
    }
    if (!rawId) continue;
    const id = canonical(rawId);
    if (seen.has(id.toLowerCase())) continue;
    seen.add(id.toLowerCase());

    // crear el concepto solo si NO existe ya (si existe, addNode no hace nada)
    await addNode(
      { id, label: rawId, labelFa: rawId, cat: "kabbalah", level: 3 },
      "pending",
      "study",
    );
    await addEdge(subjId, id, "pending", "study");
    concepts.push(id);
    created += 2;
  }

  return { created, subject: subjId, concepts };
}
