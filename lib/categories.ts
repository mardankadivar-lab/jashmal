// Catálogo curado de fuentes para la navegación Categoría → Libro → Capítulo/Folio.
// Los títulos `id` son los que entiende la API de Sefaria.

export type CategoryId = "Torah" | "Talmud" | "Midrash" | "Kabbalah" | "Chasidut";

export interface BookDef {
  id: string; // título Sefaria (ej. "Genesis", "Shabbat", "Zohar")
  es: string;
  fa: string;
  he: string;
  /** "chapters": navega por capítulo. "talmud": navega por daf + amud (a/b). */
  type: "chapters" | "talmud";
  /** número de capítulos, o de dafim para el Talmud. */
  units: number;
  /** primer daf real del Talmud (suele empezar en 2). */
  firstDaf?: number;
}

export const CATEGORY_ORDER: CategoryId[] = [
  "Torah",
  "Talmud",
  "Midrash",
  "Kabbalah",
  "Chasidut",
];

export const CATEGORIES: Record<CategoryId, BookDef[]> = {
  Torah: [
    { id: "Genesis", es: "Bereshit (Génesis)", fa: "برشیت (پیدایش)", he: "בְּרֵאשִׁית", type: "chapters", units: 50 },
    { id: "Exodus", es: "Shemot (Éxodo)", fa: "شموت (خروج)", he: "שְׁמוֹת", type: "chapters", units: 40 },
    { id: "Leviticus", es: "Vayikrá (Levítico)", fa: "وییکرا (لاویان)", he: "וַיִּקְרָא", type: "chapters", units: 27 },
    { id: "Numbers", es: "Bamidbar (Números)", fa: "بمیدبار (اعداد)", he: "בְּמִדְבַּר", type: "chapters", units: 36 },
    { id: "Deuteronomy", es: "Devarim (Deuteronomio)", fa: "دواریم (تثنیه)", he: "דְּבָרִים", type: "chapters", units: 34 },
  ],
  Talmud: [
    { id: "Berakhot", es: "Berajot", fa: "براخوت", he: "בְּרָכוֹת", type: "talmud", units: 64, firstDaf: 2 },
    { id: "Shabbat", es: "Shabat", fa: "شبات", he: "שַׁבָּת", type: "talmud", units: 157, firstDaf: 2 },
    { id: "Sanhedrin", es: "Sanedrín", fa: "سنهدرین", he: "סַנְהֶדְרִין", type: "talmud", units: 113, firstDaf: 2 },
    { id: "Bava Metzia", es: "Bava Metzía", fa: "باوا متسیا", he: "בָּבָא מְצִיעָא", type: "talmud", units: 119, firstDaf: 2 },
  ],
  Midrash: [
    { id: "Genesis Rabbah", es: "Bereshit Rabá", fa: "برشیت ربا", he: "בְּרֵאשִׁית רַבָּה", type: "chapters", units: 100 },
    { id: "Exodus Rabbah", es: "Shemot Rabá", fa: "شموت ربا", he: "שְׁמוֹת רַבָּה", type: "chapters", units: 52 },
    { id: "Tanchuma", es: "Tanjumá", fa: "تنخوما", he: "תַּנְחוּמָא", type: "chapters", units: 12 },
  ],
  Kabbalah: [
    { id: "Zohar", es: "Zohar", fa: "زوهر", he: "זֹהַר", type: "chapters", units: 3 },
    { id: "Sefer Yetzirah", es: "Séfer Yetzirá", fa: "سفر یتسیرا", he: "סֵפֶר יְצִירָה", type: "chapters", units: 6 },
    { id: "Pardes Rimonim", es: "Pardés Rimonim", fa: "پردس ریمونیم", he: "פַּרְדֵּס רִמּוֹנִים", type: "chapters", units: 32 },
  ],
  Chasidut: [
    { id: "Tanya", es: "Tania", fa: "تانیا", he: "תַּנְיָא", type: "chapters", units: 53 },
    { id: "Likutei Moharan", es: "Likutéi Moharán", fa: "لیکوتی موهاران", he: "לִקּוּטֵי מוֹהֲרַ״ן", type: "chapters", units: 286 },
    { id: "Mei HaShiloach", es: "Mei HaShiloaj", fa: "می هَشیلوآخ", he: "מֵי הַשִּׁלּוֹחַ", type: "chapters", units: 5 },
  ],
};

export function bookLabel(book: BookDef, locale: string): string {
  return locale === "fa" ? book.fa : book.es;
}
