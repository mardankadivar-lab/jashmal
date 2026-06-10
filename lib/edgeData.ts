// ─────────────────────────────────────────────────────────────────────────
// edgeData.ts — Curaduría de CONEXIONES (sinapsis) de la Mente Cósmica.
//
// "Mente Cósmica relacional V3": el estudio no es solo node-based, es
// edge-based. Cada conexión curada tiene metadata propia: tipo de relación,
// rótulos direccionales, explicación, fuentes EXACTAS y un study_prompt que
// ancla el estudio contextual ("Jesed en relación con Abraham").
//
// REGLA DE HONESTIDAD (de la espec, innegociable):
//   · Un edge SIN entrada aquí = conexión NO curada. La UI muestra
//     "Esta conexión todavía necesita desarrollo." — NUNCA se inventan
//     fuentes ni se abre el estudio general fingiendo que es contextual.
//   · `needs_review: true` = curaduría PRELIMINAR (placeholder/en revisión):
//     se muestra y se usa, pero rotulada como preliminar.
//
// El Sofer (editor-erudito) está curando el lote real de edges de Abraham;
// su JSON se integrará aquí (mismo esquema). Las claves son estables:
// `edgeDataKey(fromId, toId)` normaliza los ids de la tupla del grafo
// ("Avraham","Jésed" → "avraham→jesed"), así que la curaduría sobrevive a
// acentos/mayúsculas y funciona en ambas direcciones (reverse_label).
// ─────────────────────────────────────────────────────────────────────────

export type EdgeSourceRef = {
  text: string;   // nombre de la obra ("Bereshit", "Zohar", "Miqueas")
  ref: string;    // referencia exacta estilo Sefaria ("Genesis 18") — puede ir vacía si es atribución general
  reason: string; // por qué esta fuente conecta los dos nodos
};

export type EdgeData = {
  relationship_type: string;   // ej. "sefirotic_attribute", "textual_source", "family"
  directional_label: string;   // "Abraham encarna Jesed" (en la dirección de la clave)
  reverse_label: string;       // "Jesed se revela en Abraham" (dirección contraria)
  context_title: string;       // "Abraham y la sefirá de Jesed"
  short_explanation: string;   // explicación breve de la conexión (para el panel)
  study_prompt: string;        // enfoque que ancla el estudio contextual
  source_refs: EdgeSourceRef[];
  keywords: string[];
  // Campos opcionales del esquema V3 (el Sofer puede llenarlos en su lote):
  pardes?: { pshat?: string; remez?: string; drash?: string; sod?: string };
  chasidut?: string;
  personal_application?: string;
  // true = curaduría preliminar / pendiente de verificación final del Sofer.
  needs_review?: boolean;
};

// ── Clave estable de un edge ───────────────────────────────────────────────
// Normaliza un id de nodo del grafo: minúsculas, sin acentos, separadores → "-".
// "Avraham" → "avraham" · "Jésed" → "jesed" · "Birá Doleket" → "bira-doleket".
export function normNodeId(id: string): string {
  return id
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quita diacríticos (é → e)
    .replace(/[^a-z0-9\u0590-\u05FF]+/g, "-") // separadores → "-" (conserva hebreo)
    .replace(/^-+|-+$/g, "");
}

export function edgeDataKey(fromId: string, toId: string): string {
  return `${normNodeId(fromId)}→${normNodeId(toId)}`;
}

// ── Registro de curaduría ──────────────────────────────────────────────────
// SOLO entradas reales y verificables. Las dos de abajo son PLACEHOLDERS de
// estructura (needs_review) basadas en las fuentes que el Sofer ya verificó
// para esas aristas en brainData.ts; el lote completo de Abraham llega aparte.
export const EDGE_DATA: Record<string, EdgeData> = {
  "avraham→jesed": {
    relationship_type: "sefirotic_attribute",
    directional_label: "Abraham encarna Jésed",
    reverse_label: "Jésed se revela en Abraham",
    context_title: "Abraham y la sefirá de Jésed",
    short_explanation:
      "Abraham representa la expansión de bondad, hospitalidad y apertura — cualidades de Jésed, la columna derecha que da sin retener.",
    study_prompt:
      "Estudiar Jésed específicamente como atributo espiritual revelado en Abraham: su hospitalidad (Génesis 18), el 'jésed le-Avraham' de Miqueas, y la asociación clásica patriarca↔sefirá.",
    source_refs: [
      {
        text: "Bereshit",
        ref: "Genesis 18",
        reason: "Hospitalidad de Abraham con los tres visitantes (Hajnasat Orjim).",
      },
      {
        text: "Miqueas",
        ref: "Micah 7:20",
        reason: "«…jésed le-Avraham» — el versículo que ata el atributo al patriarca.",
      },
      {
        text: "Tikunei Zohar (Pataj Eliyahu)",
        ref: "Tikkunei Zohar 17a",
        reason: "Asociación clásica de las sefirot con los justos; Jésed = brazo derecho.",
      },
    ],
    keywords: ["Abraham", "Jésed", "hospitalidad", "bondad", "expansión", "derecha"],
    needs_review: true, // placeholder de estructura — el Sofer entrega el lote final
  },
  "avraham→merkava": {
    relationship_type: "mystical_identity",
    directional_label: "Abraham es parte de la Merkavá",
    reverse_label: "La Merkavá se forma con Abraham",
    context_title: "Abraham y la Carroza divina (Merkavá)",
    short_explanation:
      "El midrash enseña que los patriarcas mismos son la Merkavá: Abraham es una de las 'ruedas' vivientes sobre las que cabalga la Presencia.",
    study_prompt:
      "Estudiar la enseñanza «los patriarcas son la Merkavá» (Bereshit Rabá 47:6 / 82:6) aplicada a Abraham: qué significa que una persona sea vehículo de la Shejiná.",
    source_refs: [
      {
        text: "Bereshit Rabá",
        ref: "Bereshit Rabbah 82:6",
        reason: "«Los patriarcas son la Merkavá» — la fuente directa de la conexión.",
      },
    ],
    keywords: ["Abraham", "Merkavá", "patriarcas", "Shejiná", "vehículo"],
    needs_review: true, // placeholder de estructura — el Sofer entrega el lote final
  },
};

// ── Lookup orientado ───────────────────────────────────────────────────────
// La curaduría se escribe en UNA dirección canónica; el grafo es no-dirigido.
// `getEdgeData(from, to)` encuentra la entrada en cualquiera de las dos
// direcciones y dice si quedó invertida (para elegir reverse_label).
export type OrientedEdgeData = {
  data: EdgeData;
  reversed: boolean; // true = la entrada está escrita en la dirección contraria
  key: string;       // clave canónica bajo la que vive la entrada
};

export function getEdgeData(fromId: string, toId: string): OrientedEdgeData | null {
  const k1 = edgeDataKey(fromId, toId);
  const d1 = EDGE_DATA[k1];
  if (d1) return { data: d1, reversed: false, key: k1 };
  const k2 = edgeDataKey(toId, fromId);
  const d2 = EDGE_DATA[k2];
  if (d2) return { data: d2, reversed: true, key: k2 };
  return null;
}

export function isEdgeCurated(aId: string, bId: string): boolean {
  return getEdgeData(aId, bId) !== null;
}

// Rótulo direccional correcto para el viaje from→to (cae al otro si falta).
export function directionalLabelFor(o: OrientedEdgeData): string {
  return o.reversed
    ? o.data.reverse_label || o.data.directional_label
    : o.data.directional_label || o.data.reverse_label;
}
