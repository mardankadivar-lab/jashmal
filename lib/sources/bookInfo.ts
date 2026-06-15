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

// Fichas verificadas por el editor-erudito (texto fijo ES/FA), para libros cuya
// descripción de Sefaria es pobre o solo en inglés. Tienen prioridad sobre el
// índice de Sefaria.
const VERIFIED_INFO: Record<string, { heTitle: string; es: string; fa: string }> = {
  "Ben Porat Yosef": {
    heTitle: "בֶּן פּוֹרָת יוֹסֵף",
    es: "Comentarios jasídicos sobre el Génesis por R' Yaakov Yosef de Polnoye, discípulo principal del Baal Shem Tov. Uno de los primeros libros jasídicos impresos (Koretz, 1781) y fuente primaria de las enseñanzas del Baal Shem Tov.",
    fa: "تفسیرهای حسیدی بر سفر پیدایش از ربی یعقوب یوسف از پولنوآ، شاگرد برجستهٔ بَعْل شِم טوב. از نخستین کتاب‌های چاپ‌شدهٔ حسیدی (کورتس، ۱۷۸۱) و سرچشمهٔ اصلی آموزه‌های بعل شم טوב.",
  },
};

export async function getBookInfo(
  id: string,
  locale: string
): Promise<BookInfo | null> {
  // Ficha verificada por el editor-erudito: tiene prioridad sobre Sefaria.
  const verified = VERIFIED_INFO[id];
  if (verified) {
    const desc = locale === "fa" ? verified.fa : verified.es;
    return {
      title: id,
      heTitle: verified.heTitle,
      shortDesc: desc,
      desc,
      categories: ["Chasidut"],
    };
  }

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
