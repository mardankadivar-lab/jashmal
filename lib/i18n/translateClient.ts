// Cliente de traducción del texto fuente al idioma de la interfaz (es/fa).
// Se usa en locale "es" o "fa": muestra hebreo original + traducción propia
// (en vez del inglés de Sefaria, que el usuario no necesariamente entiende).
// Si falla, el llamador cae con gracia al inglés.

export interface TranslateClientRequest {
  ref: string;
  segments: string[];
  english: string[];
  /** idioma destino: "es" o "fa". Default "fa" (compatibilidad histórica). */
  locale?: "es" | "fa";
}

/**
 * Pide la traducción persa de los segmentos. Devuelve un array alineado con
 * `segments` (mismo número), o null si la traducción no estuvo disponible.
 */
export async function requestTranslation(
  body: TranslateClientRequest
): Promise<string[] | null> {
  try {
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { translations?: string[] };
    if (!Array.isArray(data.translations)) return null;
    if (data.translations.length !== body.segments.length) return null;
    return data.translations;
  } catch {
    return null;
  }
}
