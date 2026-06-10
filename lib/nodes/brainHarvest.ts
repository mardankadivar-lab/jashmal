// ─────────────────────────────────────────────────────────────────────────
// brainHarvest.ts — "alimentación" del cerebro.
// Convierte un estudio en sinapsis y conexiones NUEVAS (estado 'pending'),
// listas para que el Sofer las apruebe. La materia prima son los hyperlinks
// internos {{study:...}} / {{letter:...}} que el motor ya marca, más el sujeto
// del estudio. Reutiliza nodos existentes (match por nombre) para no duplicar.
// ─────────────────────────────────────────────────────────────────────────

import { parseHyperlinks } from "@/lib/relations/hyperlinks";
import { addNode, addEdge, existingNodeIds, hasPersianArabic } from "@/lib/nodes/brainStore";
import { resolveHebrewLetter } from "@/lib/nodes/hebrewLetters";
import type { BNode } from "@/lib/nodes/brainData";

function titleCase(s: string): string {
  const t = s.trim();
  return t ? t[0].toUpperCase() + t.slice(1) : t;
}

// Limpia el término de un hyperlink a un CONCEPTO corto y usable como sinapsis.
// Descarta los "teasers" (preguntas o frases largas) devolviendo "" para que NO
// se cosechen nodos feos tipo "¿Qué es exactamente el Trono de la Gloria…?".
function cleanConcept(s: string): string {
  let t = (s || "").split("|")[0].trim();
  t = t.replace(/^[¿¡"'«»\s]+/, "").replace(/["'«».,;:!?\s]+$/, "").trim();
  if (!t) return "";
  if (t.length > 42) return ""; // demasiado largo → es un teaser, no un concepto
  if (t.includes("?") || t.includes("¿")) return ""; // pregunta → teaser
  if (t.split(/\s+/).length > 6) return ""; // un concepto rara vez pasa de 6 palabras
  return titleCase(t);
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

  // mapa de etiquetas existentes (lowercase id/label/label_fa/label_en → id real):
  // resuelve un término en CUALQUIER idioma a su nodo español canónico, para no
  // duplicar (un estudio en farsi enlaza "تسیمتسوم" → reconoce el nodo "Tzimtzum").
  const existing = await existingNodeIds();
  const canonical = (label: string): string => existing.get(label.toLowerCase()) ?? label;

  // sujeto del estudio. El `label` canónico debe ser LATINO (español). Si el sujeto
  // viene en persa/árabe y NO resuelve a un nodo español existente, no cosechamos:
  // mejor no alimentar que contaminar el canónico (CLAUDE.md: exactitud ante todo).
  const subjId = canonical(input.subjectId);
  if (hasPersianArabic(subjId)) {
    return { created: 0, subject: subjId, concepts: [] };
  }
  const subjFa = hasPersianArabic(input.subjectLabel); // el sujeto del estudio venía en persa
  await addNode(
    {
      id: subjId,
      label: subjFa ? subjId : input.subjectLabel, // canónico latino
      labelFa: subjFa ? input.subjectLabel : undefined, // persa → label_fa (su columna)
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
      // usar el CONCEPTO (término), no el texto-teaser; descartar si es basura
      rawId = cleanConcept(t.term) || cleanConcept(t.label);
    }
    if (!rawId) continue;
    const id = canonical(rawId);
    // término no-latino que NO resolvió a un nodo español → no cosechar (no
    // contaminar `label`). Si SÍ resolvió, `id` ya es el canónico latino.
    if (hasPersianArabic(id)) continue;
    if (seen.has(id.toLowerCase())) continue;
    seen.add(id.toLowerCase());

    // crear el concepto solo si NO existe ya (si existe, addNode solo rellena las
    // traducciones que falten). `label` SIEMPRE latino; si el término venía en
    // persa (estudio en farsi), va a label_fa, su columna correcta.
    const termFa = hasPersianArabic(rawId);
    await addNode(
      { id, label: termFa ? id : rawId, labelFa: termFa ? rawId : undefined, cat: "kabbalah", level: 3 },
      "pending",
      "study",
    );
    await addEdge(subjId, id, "pending", "study");
    concepts.push(id);
    created += 2;
  }

  return { created, subject: subjId, concepts };
}
