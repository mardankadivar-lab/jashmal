// Cliente de traducción al persa del texto fuente.
// Solo se usa en locale "fa": muestra hebreo original + persa (en vez del inglés
// de Sefaria). Si falla, el llamador cae con gracia al inglés.

export interface TranslateClientRequest {
  ref: string;
  segments: string[];
  english: string[];
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
