import type { MetadataRoute } from "next";
import { MISTERIOS } from "@/lib/content/misterios";
import { locales, defaultLocale } from "@/i18n/routing";

// ─────────────────────────────────────────────────────────────────────────
//  SITEMAP DINÁMICO — para que Google vea TODO el sitio
// ─────────────────────────────────────────────────────────────────────────
//  Antes faltaba: Google casi no indexaba Jashmal. Este archivo (convención de
//  Next 15: app/sitemap.ts) genera https://jashmal.org/sitemap.xml con todas
//  las rutas reales, en los TRES idiomas (es/fa/en), con sus alternates
//  hreflang para que el buscador entienda que son la misma página en idiomas
//  distintos y muestre la versión correcta a cada usuario.
//
//  Reglas de localización (alineadas con i18n/routing.ts):
//   · La mayoría de rutas solo llevan el prefijo de idioma:  /es/estudio …
//   · Tres rutas tienen el SEGMENTO localizado (URL pública distinta por idioma):
//       /mente-cosmica → es:/mente-cosmica · en|fa:/cosmic-mind
//       /creacion      → es:/creacion      · en|fa:/creation
//       /misterio/{s}  → es:/misterio/{s}  · en:/mystery/{s} · fa:/اسرار/{s}
// ─────────────────────────────────────────────────────────────────────────

const BASE_URL = "https://jashmal.org";

type LocalePaths = Record<(typeof locales)[number], string>;

// Devuelve la ruta SIN prefijo de idioma para cada locale (empieza con "/").
// Para rutas no localizadas, la misma en los tres. Para las localizadas, la suya.
function localized(es: string, en?: string, fa?: string): LocalePaths {
  return { es, en: en ?? es, fa: fa ?? es };
}

// URL absoluta con prefijo de idioma. El español también lleva /es para tener
// una URL canónica única y estable (el middleware redirige / → /es).
function url(locale: (typeof locales)[number], path: string): string {
  // path empieza con "/"; el segmento de idioma siempre va delante.
  return `${BASE_URL}/${locale}${path}`;
}

// Construye una entrada del sitemap con sus alternates hreflang (todas las
// variantes de idioma de la MISMA página) — esto es lo que Google usa para
// servir la versión correcta por idioma sin penalizar contenido "duplicado".
function entry(
  paths: LocalePaths,
  opts: { changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"]; priority?: number } = {},
): MetadataRoute.Sitemap[number] {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = url(l, paths[l]);
  // x-default apunta a la versión en el idioma por defecto (español).
  languages["x-default"] = url(defaultLocale, paths[defaultLocale]);

  return {
    url: url(defaultLocale, paths[defaultLocale]),
    lastModified: new Date(),
    changeFrequency: opts.changeFrequency ?? "weekly",
    priority: opts.priority ?? 0.6,
    alternates: { languages },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const items: MetadataRoute.Sitemap = [];

  // 1) Home
  items.push(entry(localized("/"), { changeFrequency: "weekly", priority: 1.0 }));

  // 2) Páginas principales con segmento localizado por idioma
  items.push(entry(localized("/mente-cosmica", "/cosmic-mind", "/cosmic-mind"), { priority: 0.8 }));
  items.push(entry(localized("/creacion", "/creation", "/creation"), { priority: 0.8 }));

  // 3) Páginas principales SIN localización de segmento (solo prefijo de idioma)
  const planas: { path: string; priority?: number }[] = [
    { path: "/misterios", priority: 0.9 },
    { path: "/ruta-de-la-fe", priority: 0.8 },
    { path: "/estudio", priority: 0.8 },
    { path: "/como-verificamos", priority: 0.7 },
    { path: "/letras", priority: 0.7 },
    { path: "/gematrias", priority: 0.7 },
    { path: "/arbol", priority: 0.6 },
    { path: "/atlas", priority: 0.6 },
    { path: "/academia", priority: 0.6 },
    { path: "/comunidad", priority: 0.6 },
    { path: "/acerca", priority: 0.5 },
  ];
  for (const p of planas) {
    items.push(entry(localized(p.path), { priority: p.priority }));
  }

  // 4) Cada misterio publicado (segmento localizado: misterio / mystery / اسرار)
  for (const m of MISTERIOS) {
    items.push(
      entry(
        localized(`/misterio/${m.slug}`, `/mystery/${m.slug}`, `/اسرار/${m.slug}`),
        { changeFrequency: "monthly", priority: 0.7 },
      ),
    );
  }

  return items;
}
