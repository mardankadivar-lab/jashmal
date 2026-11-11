// ─────────────────────────────────────────────────────────────────────────────
//  ATAJOS CORTOS DE LOS MISTERIOS  —  jashmal.org/{slug}
// ─────────────────────────────────────────────────────────────────────────────
//  El catálogo (lib/content/misterios.ts) promete en su propia interfaz:
//      slug: string;  // ruta: /misterio/{slug} y atajo /{slug}
//
//  Antes esa promesa se cumplía a mano: había DOS listas escritas a dedo (una
//  en next.config.ts y otra en middleware.ts) y cada misterio nuevo nacía sin
//  atajo. Este módulo es ahora la ÚNICA fuente: los atajos se derivan de
//  MISTERIOS, así que todo misterio nuevo recibe el suyo por el solo hecho de
//  existir en el catálogo. No hay nada que recordar añadir.
//
//  Cómo funciona el atajo (y por qué hacen falta dos piezas):
//    1. middleware.ts  — deja pasar /{slug} SIN que next-intl le ponga /es
//                        delante (si no, /137 se volvería /es/137 → 404).
//    2. next.config.ts — reescribe (rewrite interno, NO redirect) /{slug}
//                        hacia /es/misterio/{slug}. La URL que ve el visitante
//                        se queda corta y limpia: jashmal.org/137
//
//  Los atajos apuntan siempre al español, igual que antes: son enlaces para
//  video y redes en español. El resto del sitio sigue trilingüe por next-intl,
//  intacto; esto no toca el manejo de idiomas.
// ─────────────────────────────────────────────────────────────────────────────

import { MISTERIOS } from "./misterios";

/**
 * RUTAS RESERVADAS DE PRIMER NIVEL — el guardia de las colisiones.
 *
 * Un atajo vive en la RAÍZ del sitio, así que un slug que se llame igual que
 * una ruta real la TAPARÍA. Que no funcione un atajo es molesto; que se caiga
 * una página en vivo es grave. Por eso cualquier slug que choque con uno de
 * estos nombres revienta el build (ver la comprobación de más abajo) en vez de
 * romper el sitio en silencio.
 *
 * Esta lista es estática a propósito: el middleware corre en el Edge y no
 * puede leer el disco. `npm run misterios:check` hace la verificación VIVA
 * contra las carpetas reales de app/ y public/, y además avisa si alguien crea
 * una ruta nueva que choque con un atajo que ya existe.
 */
export const RUTAS_RESERVADAS: ReadonlySet<string> = new Set([
  // Prefijos de idioma (next-intl)
  "es",
  "fa",
  "en",

  // Rutas reales de app/[locale]
  "academia",
  "acerca",
  "admin",
  "arbol",
  "atlas",
  "buscar",
  "comunidad",
  "creacion",
  "espejo-del-alma",
  "estudio",
  "gematrias",
  "letra",
  "letras",
  "mapa-del-alma",
  "mente-cosmica",
  "mis-estudios",
  "misterio",
  "misterios",
  "podcast",
  "preguntar",
  "que-es-cabala",
  "viaje",

  // Slugs localizados (i18n/routing.ts → pathnames)
  "cosmic-mind",
  "creation",

  // Infraestructura de Next / Vercel y metadatos
  "api",
  "_next",
  "_vercel",
  "static",
  "sitemap",
  "robots",
  "manifest",
  "favicon",
  "icon",
  "apple-icon",
  "search-index",
  "sw",
  ".well-known",
  "well-known",

  // Carpetas servidas desde public/
  "audio",
  "geo",
  "icons",
  "images",

  // Atajos y redirecciones que ya existen en next.config.ts
  "cosmic",
  "universo",
  "grafo",
  "cerebro",
  "alef",
]);

/**
 * Atajos que NO vienen del catálogo de misterios.
 *
 * "cerebro" es un nombre viejo de la Mente Cósmica: next.config.ts lo redirige
 * de forma permanente. Los redirects corren ANTES del middleware, así que en
 * la práctica nunca llega hasta aquí — lo dejamos en la lista de "no tocar"
 * para conservar exactamente el comportamiento anterior.
 */
const ATAJOS_EXTRA: readonly string[] = ["cerebro"];

/**
 * Los slugs de todos los misterios del catálogo, ya validados.
 *
 * Si un slug choca con una ruta reservada, o si hay dos misterios con el mismo
 * slug, esto LANZA y el build se cae con el nombre exacto del problema. Es
 * deliberado: preferimos un build rojo a un sitio con una página tapada.
 */
export const MISTERIO_ATAJOS: readonly string[] = (() => {
  const slugs = MISTERIOS.map((m) => m.slug);

  const colisiones = slugs.filter((s) => RUTAS_RESERVADAS.has(s));
  if (colisiones.length > 0) {
    throw new Error(
      `[atajos de misterios] ${colisiones.length} slug(s) chocan con rutas que ya existen ` +
        `en el sitio: ${colisiones.join(", ")}. Un atajo en la raíz TAPARÍA esa página. ` +
        `Cambia el slug en lib/content/misterios.ts (la página seguirá viva en ` +
        `/misterio/{slug}; lo único que se pierde es el atajo corto).`
    );
  }

  const vistos = new Set<string>();
  const repetidos = slugs.filter((s) => (vistos.has(s) ? true : (vistos.add(s), false)));
  if (repetidos.length > 0) {
    throw new Error(
      `[atajos de misterios] slug(s) repetidos en lib/content/misterios.ts: ` +
        `${[...new Set(repetidos)].join(", ")}.`
    );
  }

  return slugs;
})();

/** Búsqueda O(1) para el middleware: atajos del catálogo + los extra. */
const ATAJOS: ReadonlySet<string> = new Set([...MISTERIO_ATAJOS, ...ATAJOS_EXTRA]);

/**
 * ¿Es este pathname un atajo corto de misterio?
 *
 * Lo usa el middleware para NO dejar que next-intl le añada el prefijo de
 * idioma. Sólo acepta un único segmento en la raíz (/137), nunca /es/137 ni
 * /137/algo — igual que la regex que había antes.
 */
export function esAtajoDeMisterio(pathname: string): boolean {
  if (!pathname.startsWith("/")) return false;
  const slug = pathname.slice(1);
  if (slug === "" || slug.includes("/")) return false;
  return ATAJOS.has(slug);
}

/**
 * Los rewrites para next.config.ts — uno por misterio, generados del catálogo.
 * Rewrite interno (no redirect): la URL en el navegador se queda en /{slug}.
 */
export function atajosDeMisterioRewrites(): { source: string; destination: string }[] {
  return MISTERIO_ATAJOS.map((slug) => ({
    source: `/${slug}`,
    destination: `/es/misterio/${slug}`,
  }));
}
