// Información/contexto de un libro desde el índice de Sefaria.
// enDesc/heDesc = descripción larga; enShortDesc/heShortDesc = una línea.

const BASE = "https://www.sefaria.org/api";

export interface BookInfo {
  title: string;
  heTitle: string;
  shortDesc: string; // breve, según el idioma pedido
  desc: string; // larga, según el idioma pedido
  categories: string[];
}

// El id puede ser un override (ej. "Tanya-LA"); para pedir el índice usamos el
// título base de Sefaria. Mapeo de overrides → título Sefaria del índice.
const OVERRIDE_INDEX: Record<string, string> = {
  "Tanya-LA": "Tanya",
  "Tanya-SY": "Tanya",
  "Tanya-IT": "Tanya",
  "Tanya-IK": "Tanya",
  "Tanya-QA": "Tanya",
};

export function indexTitleFor(id: string): string {
  return OVERRIDE_INDEX[id] ?? id;
}

export async function getBookInfo(
  id: string,
  locale: string
): Promise<BookInfo | null> {
  const title = indexTitleFor(id);
  try {
    const res = await fetch(`${BASE}/v2/index/${encodeURIComponent(title)}`, {
      next: { revalidate: 60 * 60 * 24 * 7 },
    });
    if (!res.ok) return null;
    const d = await res.json();
    const fa = locale === "fa";
    // Sefaria no tiene farsi; en FA usamos el inglés como base para que Claude traduzca.
    const shortDesc = (fa ? d.enShortDesc : d.enShortDesc) ?? "";
    const desc = (fa ? d.enDesc : d.enDesc) ?? "";
    const heShort = d.heShortDesc ?? "";
    return {
      title: d.title ?? title,
      heTitle: d.heTitle ?? "",
      // Para ES preferimos la descripción inglesa (Claude la traduce en la API).
      shortDesc: shortDesc || heShort,
      desc: desc || "",
      categories: Array.isArray(d.categories) ? d.categories : [],
    };
  } catch {
    return null;
  }
}
