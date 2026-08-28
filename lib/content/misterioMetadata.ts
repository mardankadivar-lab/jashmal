// ─────────────────────────────────────────────────────────────────────────
//  METADATA DE LOS ESTUDIOS (/misterio/{slug}) — SEO y vista previa al compartir
// ─────────────────────────────────────────────────────────────────────────
//  Problema que resuelve: las páginas de misterio son componentes de cliente
//  ("use client"), así que NO pueden exportar `generateMetadata`. Sin ella, las
//  67 heredaban el título y la descripción genéricos del layout raíz: en Google
//  y en WhatsApp todas se llamaban igual.
//
//  Solución: cada carpeta de estudio lleva un `layout.tsx` (generado por
//  scripts/gen-misterio-metadata.mjs) que llama a `metadataDeMisterio(slug, locale)`.
//  El texto sale del catálogo (lib/content/misterios.ts) vía `tri()`, así que
//  respeta la política honesta de idiomas: si no hay versión en el idioma
//  activo, cae al español — nunca inventa traducciones.
// ─────────────────────────────────────────────────────────────────────────
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getMisterio } from "@/lib/content/misterios";
import { tri } from "@/lib/i18n/i18nContent";
import { locales, defaultLocale, type Locale } from "@/i18n/routing";

/** Normaliza el locale de la ruta (viene como string) a un Locale válido. */
export function comoLocale(raw: string): Locale {
  return (locales as readonly string[]).includes(raw) ? (raw as Locale) : defaultLocale;
}

/**
 * Recorta la descripción a un largo sano para buscadores (~180 caracteres),
 * cortando en el último espacio para no partir palabras.
 */
function recorta(texto: string, max = 180): string {
  const limpio = texto.replace(/\s+/g, " ").trim();
  if (limpio.length <= max) return limpio;
  const corte = limpio.slice(0, max);
  const ultimo = corte.lastIndexOf(" ");
  return `${(ultimo > max * 0.6 ? corte.slice(0, ultimo) : corte).replace(/[·,;:—-]$/, "").trim()}…`;
}

/** URL de la imagen de compartir (Open Graph), generada por código en /api/og. */
export function ogImagePath(opts: {
  titulo: string;
  he?: string;
  numero?: string;
  locale: Locale;
}): string {
  const p = new URLSearchParams();
  p.set("t", opts.titulo);
  if (opts.he) p.set("he", opts.he);
  if (opts.numero) p.set("n", opts.numero);
  p.set("l", opts.locale);
  return `/api/og?${p.toString()}`;
}

export interface EstudioMeta {
  /** Ruta SIN el prefijo de idioma. Ej: "/misterio/elul". */
  path: string;
  titulo: string;
  tituloFa?: string;
  tituloEn?: string;
  gancho: string;
  ganchoFa?: string;
  ganchoEn?: string;
  he?: string;
  numero?: string;
}

/**
 * Construye la Metadata de un estudio a partir de sus textos trilingües.
 * Base común de `metadataDeMisterio` y de las sub-rutas (p. ej. Korach).
 */
export async function metadataDeEstudio(
  e: EstudioMeta,
  localeRaw: string,
): Promise<Metadata> {
  const locale = comoLocale(localeRaw);
  // Nombre de marca en el idioma activo (es/en: "Jashmal" · fa: "خَشمَل").
  const t = await getTranslations({ locale });
  const SITE_NAME = t("site.name");
  const titulo = tri(locale, e.titulo, e.tituloFa, e.tituloEn).value;
  const descripcion = recorta(tri(locale, e.gancho, e.ganchoFa, e.ganchoEn).value);
  const url = `/${locale}${e.path}`;

  // hreflang: la misma página en los tres idiomas (el contenido cae al español
  // cuando falta la traducción, pero la URL por idioma existe siempre).
  const languages = Object.fromEntries(
    locales.map((l) => [l, `/${l}${e.path}`]),
  ) as Record<string, string>;

  const imagen = ogImagePath({ titulo, he: e.he, numero: e.numero, locale });
  const tituloOg = `${titulo} · ${SITE_NAME}`;

  return {
    // `absolute`: el título completo de ESTA página (no depende de plantillas
    // heredadas). `template`: se lo pasa a sus sub-rutas (p. ej. Korach).
    title: { absolute: tituloOg, template: `%s · ${SITE_NAME}` },
    description: descripcion,
    alternates: { canonical: url, languages },
    openGraph: {
      type: "article",
      siteName: SITE_NAME,
      locale,
      url,
      title: tituloOg,
      description: descripcion,
      images: [{ url: imagen, width: 1200, height: 630, alt: titulo }],
    },
    twitter: {
      card: "summary_large_image",
      title: tituloOg,
      description: descripcion,
      images: [imagen],
    },
  };
}

/**
 * Metadata de un estudio registrado en el catálogo de misterios.
 * Si el slug no existe en el catálogo, devuelve {} para que la página herede
 * la metadata del layout raíz (nunca rompe la ruta).
 */
export async function metadataDeMisterio(
  slug: string,
  localeRaw: string,
): Promise<Metadata> {
  const m = getMisterio(slug);
  if (!m) return {};
  return metadataDeEstudio(
    {
      path: `/misterio/${m.slug}`,
      titulo: m.titulo,
      tituloFa: m.tituloFa,
      tituloEn: m.tituloEn,
      gancho: m.gancho,
      ganchoFa: m.ganchoFa,
      ganchoEn: m.ganchoEn,
      he: m.he,
      numero: m.numero,
    },
    localeRaw,
  );
}
