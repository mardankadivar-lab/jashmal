// ─────────────────────────────────────────────────────────────────────────
//  Serie "14 Estaciones del Viaje de la Creación"
// ─────────────────────────────────────────────────────────────────────────
//  Catálogo + cuerpo de los 14 estudios de la Cabalá luriana del Arizal
//  (Ein Sof → Participación Humana). El contenido lo escribió y verificó el
//  Sofer; está portado al repo por scripts/port-estaciones.mjs y vive embebido
//  en estaciones.generated.ts (para que las páginas sean self-contained).
//
//  El ORDEN del arreglo ES el viaje (descenso 1→14): no reordenar.
//
//  i18n: es es el idioma canónico. fa/en caen a español por ahora, consistente
//  con el resto del sitio. // TODO(fa): traducir cuerpo + metadata al farsi.
// ─────────────────────────────────────────────────────────────────────────

export interface Estacion {
  numero: number;        // 1..14 — posición en el viaje
  slug: string;          // ruta: /viaje/{slug}
  hebreo: string;        // nombre hebreo central
  transliteracion: string;
  traduccion: string;    // traducción / glosa breve (español)
  esencia: string;       // una línea de esencia para el hub (español)
  color: string;         // acento por estación
  markdown: string;      // cuerpo del estudio (7 secciones), sin frontmatter
}

import { ESTACIONES_DATA } from "./estaciones.generated";

export const ESTACIONES: Estacion[] = ESTACIONES_DATA;

const BY_SLUG = new Map(ESTACIONES.map((e) => [e.slug, e]));

export function getEstacion(slug: string): Estacion | undefined {
  return BY_SLUG.get(slug);
}

export function isEstacionSlug(slug: string): boolean {
  return BY_SLUG.has(slug);
}

/** Estación anterior/siguiente en el viaje (1→14), o undefined en los extremos. */
export function vecinos(slug: string): {
  prev?: Estacion;
  next?: Estacion;
} {
  const i = ESTACIONES.findIndex((e) => e.slug === slug);
  if (i === -1) return {};
  return {
    prev: i > 0 ? ESTACIONES[i - 1] : undefined,
    next: i < ESTACIONES.length - 1 ? ESTACIONES[i + 1] : undefined,
  };
}
