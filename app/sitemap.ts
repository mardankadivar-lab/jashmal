import type { MetadataRoute } from "next";
import { MISTERIOS } from "@/lib/content/misterios";
import { ESTACIONES_DATA } from "@/lib/content/estaciones.generated";
import { LESSONS } from "@/lib/academia/modulo1";
import { LESSONS8 } from "@/lib/academia/modulo8";
import { LESSONS9 } from "@/lib/academia/modulo9";
import { LESSONS10 } from "@/lib/academia/modulo10";
import { LESSONS11 } from "@/lib/academia/modulo11";

// Re-exported from each modulo so the sitemap can stay DRY
// modulo2–7 lesson slugs (hardcoded to avoid importing full module files)
const M2_SLUGS = ["alef", "bet", "guimel-dalet", "he-vav", "yod", "palabras-ancla"];
const M3_SLUGS = ["los-siete-dias", "el-jardin-adam-java", "noaj-y-el-arco", "lej-leja-avraham"];
const M4_SLUGS = ["quien-fue-rashi", "el-metodo-de-rashi", "rashi-bereshit", "rashi-pshat-drash", "lectura-dos-voces"];
const M5_SLUGS = ["tres-pilares", "cadena-zugot", "hilel-regla-de-oro", "cuatro-pardes", "ben-zoma", "kinyan-torah"];
const M6_SLUGS = ["tora-oral", "la-mishna", "pagina-talmud", "primera-mishna", "horno-ajnai"];
const M7_SLUGS = ["que-es-un-profeta", "amos-profeta-social"];

const BASE = "https://jashmal.org";
const LOCALES = ["es", "fa", "en"] as const;

// Rutas localizadas (pathname distinto por idioma)
const LOCALIZED = {
  "/mente-cosmica": { es: "/mente-cosmica", en: "/cosmic-mind", fa: "/cosmic-mind" },
  "/creacion":      { es: "/creacion",      en: "/creation",    fa: "/creation"    },
} as const;

function url(path: string, locale: string): string {
  return `${BASE}/${locale}${path}`;
}

function localizedUrl(key: keyof typeof LOCALIZED, locale: "es" | "fa" | "en"): string {
  return `${BASE}/${locale}${LOCALIZED[key][locale]}`;
}

function entry(
  path: string,
  opts: { priority?: number; changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"] } = {},
): MetadataRoute.Sitemap {
  const { priority = 0.7, changeFrequency = "monthly" } = opts;
  return LOCALES.map((locale) => ({
    url: url(path, locale),
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: Object.fromEntries(LOCALES.map((l) => [l, url(path, l)])),
    },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const items: MetadataRoute.Sitemap = [];

  // ── Páginas principales ─────────────────────────────────────────────────
  items.push(...entry("/", { priority: 1.0, changeFrequency: "weekly" }));
  items.push(...entry("/academia", { priority: 0.9 }));
  items.push(...entry("/estudio", { priority: 0.9, changeFrequency: "weekly" }));
  items.push(...entry("/misterios", { priority: 0.9, changeFrequency: "weekly" }));
  items.push(...entry("/letras", { priority: 0.8 }));
  items.push(...entry("/gematrias", { priority: 0.8, changeFrequency: "weekly" }));
  items.push(...entry("/viaje", { priority: 0.8 }));
  items.push(...entry("/que-es-cabala", { priority: 0.8 }));
  items.push(...entry("/acerca", { priority: 0.6 }));
  items.push(...entry("/comunidad", { priority: 0.7 }));
  items.push(...entry("/arbol", { priority: 0.7 }));
  items.push(...entry("/mapa-del-alma", { priority: 0.7 }));
  items.push(...entry("/espejo-del-alma", { priority: 0.7 }));
  items.push(...entry("/alef", { priority: 0.7 }));

  // Rutas con pathnames localizados
  for (const locale of LOCALES) {
    items.push({
      url: localizedUrl("/mente-cosmica", locale),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
    items.push({
      url: localizedUrl("/creacion", locale),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // ── Academia — mapas de módulos ─────────────────────────────────────────
  const moduloMaps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  for (const n of moduloMaps) {
    items.push(...entry(`/academia/modulo-${n}`, { priority: 0.8 }));
  }
  items.push(...entry("/academia/javer-inicio", { priority: 0.8 }));
  items.push(...entry("/academia/javer-completo", { priority: 0.7 }));
  items.push(...entry("/academia/maguid-inicio", { priority: 0.7 }));
  items.push(...entry("/academia/shoel-inicio", { priority: 0.7 }));
  items.push(...entry("/academia/shoel-completo", { priority: 0.7 }));
  items.push(...entry("/academia/talmid-completo", { priority: 0.7 }));

  // ── Academia — lecciones individuales ──────────────────────────────────
  const lessonModulos: { modulo: number; slugs: string[] }[] = [
    { modulo: 1,  slugs: LESSONS.map((l) => l.slug) },
    { modulo: 2,  slugs: M2_SLUGS },
    { modulo: 3,  slugs: M3_SLUGS },
    { modulo: 4,  slugs: M4_SLUGS },
    { modulo: 5,  slugs: M5_SLUGS },
    { modulo: 6,  slugs: M6_SLUGS },
    { modulo: 7,  slugs: M7_SLUGS },
    { modulo: 8,  slugs: LESSONS8.map((l) => l.slug) },
    { modulo: 9,  slugs: LESSONS9.map((l) => l.slug) },
    { modulo: 10, slugs: LESSONS10.map((l) => l.slug) },
    { modulo: 11, slugs: LESSONS11.map((l) => l.slug) },
  ];

  for (const { modulo, slugs } of lessonModulos) {
    for (const slug of slugs) {
      items.push(...entry(`/academia/modulo-${modulo}/${slug}`, { priority: 0.75 }));
    }
  }

  // ── Misterios ───────────────────────────────────────────────────────────
  for (const m of MISTERIOS) {
    items.push(...entry(`/misterio/${m.slug}`, { priority: 0.8, changeFrequency: "yearly" }));
  }

  // ── Letras ──────────────────────────────────────────────────────────────
  items.push(...entry("/letra/alef", { priority: 0.75 }));

  // ── El Viaje de la Creación — estaciones ───────────────────────────────
  for (const e of ESTACIONES_DATA) {
    items.push(...entry(`/viaje/${e.slug}`, { priority: 0.7, changeFrequency: "yearly" }));
  }

  return items;
}
