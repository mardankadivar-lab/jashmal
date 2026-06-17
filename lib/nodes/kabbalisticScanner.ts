// ─────────────────────────────────────────────────────────────────────────
// kabbalisticScanner.ts — Fase 3
// Escanea un texto y devuelve las entidades cabalísticas que menciona,
// usando el registro canónico de kabbalistic-entities.ts.
//
// Propósito: reconocimiento automático, NO curado. Los resultados alimentan:
//   a) el panel visual TejidoCabalistico (Fase 4, cliente)
//   b) la cosecha de aristas cabalísticas en /api/brain/harvest (Fase 3b, servidor)
//
// Seguridad: no escribe en BD, no hace fetch, no tiene efectos secundarios.
// ─────────────────────────────────────────────────────────────────────────

import { KAB_ENTITIES, normalizeEntityTerm, type EntityDimension } from "@/lib/nodes/kabbalistic-entities";

export type { EntityDimension };

export type KabMatch = {
  entityId: string;        // id de KabEntity (ej. "sefira:chesed")
  dimension: EntityDimension;
  graphNodeId?: string;    // si la entidad tiene nodo en el grafo
  canonicalEs: string;     // nombre canónico en español
  count: number;           // cuántas veces aparece en el texto
  snippet: string;         // ±30 chars alrededor de la primera aparición
};

// ── Aliases demasiado genéricos que causarían falsos positivos ────────────
// También se excluyen todos los aliases de ≤3 chars (ver bucle abajo).
const GENERIC_ALIASES = new Set([
  "or", "luz", "la luz", "aba", "ima", "la madre", "el padre", "za",
  "ban", "mah", "sag",      // expansiones de YHVH de un solo sílabo
  "el", "la", "los", "las", // partículas comunes
]);

// ── Helper: extrae ±30 chars alrededor del índice `pos` en el texto ───────
function snippet(text: string, pos: number, aliasLen: number): string {
  const start = Math.max(0, pos - 30);
  const end = Math.min(text.length, pos + aliasLen + 30);
  return text.slice(start, end).replace(/\s+/g, " ").trim();
}

// ── Normaliza texto para comparación (minúsculas + NFD sin acentos latinos) ─
// Igual que normalizeEntityTerm pero para cadenas largas; conserva hebreo/persa.
function normalizeText(t: string): string {
  return t
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")  // quita SOLO diacríticos latinos (é→e, ó→o…)
    .replace(/\s+/g, " ");
}

export function scanKabbalah(text: string): KabMatch[] {
  if (!text || text.length < 10) return [];

  const normText = normalizeText(text);
  const results = new Map<string, KabMatch>();

  for (const entity of KAB_ENTITIES) {
    for (const alias of entity.aliases) {
      // Excluir aliases muy cortos (≤3 chars) que causarían falsos positivos
      if (alias.length <= 3) continue;
      // Excluir aliases genéricos
      const normAlias = normalizeEntityTerm(alias);
      if (!normAlias || GENERIC_ALIASES.has(normAlias)) continue;
      // Escapar caracteres especiales para usarlo en RegExp
      const escaped = normAlias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      // Word-boundary: \b funciona con ASCII; para hebreo/persa usamos (?<!\w) / (?!\w)
      // pero el texto normalizado ya separó los scripts con espacios, así que \b es seguro
      // para los aliases en español/inglés. Para hebreo/persa, hacemos match más simple.
      let regex: RegExp;
      try {
        regex = new RegExp(`\\b${escaped}\\b`, "gi");
      } catch {
        continue; // alias con chars raros → se ignora de forma segura
      }

      let match: RegExpExecArray | null;
      let count = 0;
      let firstPos = -1;

      // Resetear lastIndex antes de iterar
      regex.lastIndex = 0;
      while ((match = regex.exec(normText)) !== null) {
        count++;
        if (firstPos === -1) firstPos = match.index;
        // Protección contra loops infinitos en matches de longitud cero
        if (match[0].length === 0) { regex.lastIndex++; }
      }

      if (count > 0 && firstPos !== -1) {
        const existing = results.get(entity.id);
        if (!existing) {
          results.set(entity.id, {
            entityId: entity.id,
            dimension: entity.dimension,
            graphNodeId: entity.graphNodeId,
            canonicalEs: entity.es,
            count,
            snippet: snippet(text, firstPos, alias.length),
          });
        } else if (count > existing.count) {
          // Actualizar si este alias encontró más ocurrencias
          existing.count = count;
          existing.snippet = snippet(text, firstPos, alias.length);
        }
      }
    }
  }

  // Ordenar por count descendente
  return Array.from(results.values()).sort((a, b) => b.count - a.count);
}
