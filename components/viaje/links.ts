// Resolución de los enlaces internos {{study:…}} / {{letter:…}} de las
// estaciones hacia rutas REALES del sitio, para que ningún enlace quede roto.
//
//  - {{study:<slug>}}  → /viaje/<slug>      si <slug> es otra estación
//                      → /misterio/<slug>   si <slug> es un misterio publicado
//                      → null               (sin ruta segura → se pinta como
//                                            texto dorado, no como enlace 404)
//  - {{letter:<slug>}} → /letra/<slug>      si esa letra tiene página
//                      → null               (las letras sin página aún —bet,
//                                            guimel…— se pintan como texto, no 404)

import { isEstacionSlug } from "@/lib/content/estaciones";
import { MISTERIOS } from "@/lib/content/misterios";
import { LETTERS } from "@/lib/letters";

const MISTERIO_SLUGS = new Set(MISTERIOS.map((m) => m.slug));
const LETTER_SLUGS = new Set(Object.keys(LETTERS));

/** Ruta destino de un {{study:term}}, o null si no hay página segura. */
export function studyHref(term: string): string | null {
  const slug = term.trim();
  if (isEstacionSlug(slug)) return `/viaje/${slug}`;
  if (MISTERIO_SLUGS.has(slug)) return `/misterio/${slug}`;
  return null;
}

/** Ruta destino de un {{letter:slug}}, o null si esa letra aún no tiene página. */
export function letterHref(key: string): string | null {
  const slug = key.trim();
  if (LETTER_SLUGS.has(slug)) return `/letra/${slug}`;
  return null;
}
