// ─────────────────────────────────────────────────────────────────────────
//  CONTENIDO MULTILINGÜE — política "honesto y crece" (sin fallback silencioso)
// ─────────────────────────────────────────────────────────────────────────
//  El contenido curado (misterios, gematrías, nodos…) se escribió primero en
//  español y farsi; el inglés lo va llenando el Sofer por fases. Mientras
//  tanto, cuando el idioma activo NO tiene su versión, NO mostramos el español
//  disfrazado de inglés: mostramos el español como último recurso PERO marcado
//  (`missing: true`) para que la UI ponga un aviso limpio ("disponible en …").
//
//  Uso típico con los campos planos que ya existen (titulo / tituloFa):
//    const t = tri(locale, m.titulo, m.tituloFa, m.tituloEn);
//    <h3>{t.value}</h3>
//    {t.missing && <TranslationBadge available={t.available} />}
// ─────────────────────────────────────────────────────────────────────────
import type { Locale } from "@/i18n/routing";

export interface Picked {
  /** El texto a mostrar (idioma activo si existe; si no, el español como respaldo). */
  value: string;
  /** true = el idioma activo NO tenía versión; la UI debe avisar (no fingir). */
  missing: boolean;
  /** Idiomas en los que SÍ existe este contenido (para el aviso "disponible en …"). */
  available: Locale[];
  /** El idioma del texto que realmente se está mostrando. */
  shownIn: Locale;
}

/**
 * Elige el texto para el idioma activo entre las tres variantes (es obligatorio,
 * fa/en opcionales). El español es el canónico y el respaldo, pero todo respaldo
 * queda marcado como `missing` para que nunca haya mezcla silenciosa.
 */
export function tri(
  locale: Locale,
  es: string,
  fa?: string | null,
  en?: string | null,
): Picked {
  const clean = (s?: string | null) => (typeof s === "string" && s.trim() ? s.trim() : undefined);
  const v = { es: clean(es), fa: clean(fa), en: clean(en) };
  const available = (["es", "fa", "en"] as Locale[]).filter((l) => v[l]);

  const direct = v[locale];
  if (direct) return { value: direct, missing: false, available, shownIn: locale };

  // No hay versión en el idioma activo → respaldo honesto al español, marcado.
  return { value: v.es ?? "", missing: true, available, shownIn: "es" };
}

export interface PickedList {
  value: string[];
  missing: boolean;
  available: Locale[];
  shownIn: Locale;
}

/**
 * Versión de `tri()` para listas (p. ej. viñetas de asociaciones). Misma política
 * honesta: respaldo al español marcado como `missing`, nunca mezcla silenciosa.
 */
export function triList(
  locale: Locale,
  es: string[],
  fa?: string[] | null,
  en?: string[] | null,
): PickedList {
  const clean = (a?: string[] | null) => (Array.isArray(a) && a.length ? a : undefined);
  const v = { es: clean(es), fa: clean(fa), en: clean(en) };
  const available = (["es", "fa", "en"] as Locale[]).filter((l) => v[l]);

  const direct = v[locale];
  if (direct) return { value: direct, missing: false, available, shownIn: locale };

  return { value: v.es ?? [], missing: true, available, shownIn: "es" };
}

/** Etiquetas cortas de idioma para los avisos ("ES · FA"). */
export const LANG_LABEL: Record<Locale, string> = { es: "ES", fa: "فا", en: "EN" };
