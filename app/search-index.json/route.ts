import { buildSearchIndex } from "@/lib/search/catalog";

// ─────────────────────────────────────────────────────────────────────────
//  /search-index.json — el índice del buscador global, generado en el BUILD
// ─────────────────────────────────────────────────────────────────────────
//  `force-static` hace que Next prerenderice este handler UNA vez al construir
//  y lo sirva como archivo estático desde el CDN de Vercel: sin función
//  serverless, sin arranque en frío, sin viaje a base de datos.
//
//  El navegador solo lo pide cuando el usuario ABRE la lupa (ver
//  components/BuscadorGlobal.tsx). Por eso los registros pesados —144 KB de
//  markdown de las estaciones, las 22 letras completas, los 11 módulos de
//  academia— se quedan del lado del servidor y NUNCA entran al bundle inicial
//  de las ~120 páginas del sitio.
//
//  El middleware de idioma no lo toca: su matcher excluye cualquier ruta con
//  punto (`.*\..*`), y esta lo lleva en el nombre.
// ─────────────────────────────────────────────────────────────────────────

export const dynamic = "force-static";

export function GET() {
  return Response.json(buildSearchIndex(), {
    headers: {
      // Inmutable entre despliegues: cada build produce su propio archivo.
      "Cache-Control": "public, max-age=0, s-maxage=31536000, must-revalidate",
    },
  });
}
