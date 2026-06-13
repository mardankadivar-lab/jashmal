import type { MetadataRoute } from "next";

// ─────────────────────────────────────────────────────────────────────────
//  ROBOTS — qué puede indexar Google y dónde está el mapa del sitio
// ─────────────────────────────────────────────────────────────────────────
//  Convención de Next 15 (app/robots.ts) → genera https://jashmal.org/robots.txt
//  Permite indexar TODO el sitio público y bloquea solo lo que no debe salir en
//  buscadores: el panel de administración (/admin, en cualquier idioma) y las
//  rutas de API (datos internos, no páginas). Apunta al sitemap para que el
//  buscador descubra todas las páginas de una vez.
// ─────────────────────────────────────────────────────────────────────────

const BASE_URL = "https://jashmal.org";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /admin se sirve bajo prefijo de idioma (/es/admin, /en/admin, /fa/admin);
        // /api es global. Bloqueamos ambas formas para todos los idiomas.
        disallow: ["/api/", "/admin", "/*/admin"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
