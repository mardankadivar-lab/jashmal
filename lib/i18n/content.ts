// ─────────────────────────────────────────────────────────────────────────
//  MODELO DE CONTENIDO MULTILINGÜE — tipos (sin migrar datos todavía)
// ─────────────────────────────────────────────────────────────────────────
//  Arquitectura aprobada (Reorg V4): UNA sola fuente con campos por idioma
//  (titulo/tituloEn/tituloFa…), NO archivos separados por locale ni base de
//  datos. El español es canónico/obligatorio; inglés y farsi son opcionales y
//  se llenan por fases. La resolución por idioma usa la política honesta de
//  tri() (respaldo al español MARCADO, nunca mezcla silenciosa).
//
//  Este archivo es solo el TIPO + un resolver puro. No migra ningún contenido
//  existente (Misterio, Gematria… siguen con sus nombres de campo actuales);
//  sirve de molde para contenido nuevo y para adaptadores futuros.
// ─────────────────────────────────────────────────────────────────────────
import type { Locale } from "@/i18n/routing";
import { tri } from "@/lib/i18n/i18nContent";

/** Estado de traducción de una unidad de contenido (lo lee el guardián y la UI). */
export type ContentStatus = "draft" | "translated" | "needs_review" | "published";

/**
 * FUENTE única con campos por idioma. El español (campo base) es obligatorio;
 * los pares *En / *Fa son opcionales y se llenan por fases.
 */
export interface LocalizedSource {
  id: string;
  slug: string;
  title: string;            titleEn?: string;            titleFa?: string;
  excerpt?: string;         excerptEn?: string;          excerptFa?: string;
  body?: string;            bodyEn?: string;             bodyFa?: string;
  seoTitle?: string;        seoTitleEn?: string;         seoTitleFa?: string;
  seoDescription?: string;  seoDescriptionEn?: string;   seoDescriptionFa?: string;
  /** Estado declarado por idioma (opcional; si falta se infiere al resolver). */
  status?: Partial<Record<Locale, ContentStatus>>;
}

/**
 * VISTA resuelta para UN idioma — lo que la UI consume. Coincide con el esquema
 * pedido: id, locale, title, slug, excerpt, body, seoTitle, seoDescription, status.
 */
export interface ContentUnit {
  id: string;
  locale: Locale;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  seoTitle: string;
  seoDescription: string;
  status: ContentStatus;
  /** true = algún campo cayó al español por falta de traducción (mostrar badge). */
  missing: boolean;
  /** idiomas en los que SÍ existe el contenido (para el aviso "disponible en …"). */
  available: Locale[];
}

/**
 * Resuelve una fuente al idioma activo con respaldo honesto (tri). El SEO cae al
 * título/extracto si no hay campo SEO propio. El status se toma del declarado o
 * se infiere: "draft" si hubo respaldo, "published" si todo estaba en el idioma.
 */
export function resolveContentUnit(locale: Locale, src: LocalizedSource): ContentUnit {
  const title = tri(locale, src.title, src.titleFa, src.titleEn);
  const excerpt = tri(locale, src.excerpt ?? "", src.excerptFa, src.excerptEn);
  const body = tri(locale, src.body ?? "", src.bodyFa, src.bodyEn);
  const seoTitle = tri(locale, src.seoTitle ?? src.title, src.seoTitleFa, src.seoTitleEn);
  const seoDescription = tri(
    locale,
    src.seoDescription ?? src.excerpt ?? "",
    src.seoDescriptionFa,
    src.seoDescriptionEn,
  );
  const missing = title.missing || excerpt.missing || body.missing;

  return {
    id: src.id,
    locale,
    slug: src.slug,
    title: title.value,
    excerpt: excerpt.value,
    body: body.value,
    seoTitle: seoTitle.value,
    seoDescription: seoDescription.value,
    status: src.status?.[locale] ?? (missing ? "draft" : "published"),
    missing,
    available: title.available,
  };
}
