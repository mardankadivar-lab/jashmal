// Overrides para obras de estructura COMPLEJA (isComplex en Sefaria), cuyo ref
// no es "Titulo N" sino una ruta anidada. Refs verificados contra la API (2026-05-31).

import type { CatBook } from "./catalog.generated";

export interface RichBook extends CatBook {
  refTemplate?: string; // ej. "Tanya, Part I; Likkutei Amarim {n}"
}

// Reemplaza un libro complejo por sus partes reales.
export const COMPLEX_OVERRIDES: Record<string, RichBook[]> = {
  Tanya: [
    { id: "Tanya-LA", label: "Likutéi Amarim", he: "לִקּוּטֵי אֲמָרִים", type: "chapters", units: 53, refTemplate: "Tanya, Part I; Likkutei Amarim {n}" },
    { id: "Tanya-SY", label: "Sha'ar HaYijud VehaEmuná", he: "שַׁעַר הַיִּחוּד וְהָאֱמוּנָה", type: "chapters", units: 12, refTemplate: "Tanya, Part II; Shaar HaYichud VehaEmunah {n}" },
    { id: "Tanya-IT", label: "Igéret HaTeshuvá", he: "אִגֶּרֶת הַתְּשׁוּבָה", type: "chapters", units: 12, refTemplate: "Tanya, Part III; Iggeret HaTeshuvah {n}" },
    { id: "Tanya-IK", label: "Igéret HaKódesh", he: "אִגֶּרֶת הַקֹּדֶשׁ", type: "chapters", units: 32, refTemplate: "Tanya, Part IV; Iggeret HaKodesh {n}" },
    { id: "Tanya-QA", label: "Kuntrés Ajarón", he: "קוּנְטְרֵס אַחֲרוֹן", type: "chapters", units: 9, refTemplate: "Tanya, Part V; Kuntres Acharon {n}" },
  ],

};

// Libros EXTRA a añadir a una subcategoría (no usado por ahora).
export const EXTRA_BOOKS: Record<string, RichBook[]> = {};

// Parche de etiqueta/ref para libros que YA están en el catálogo generado.
// Etz Chaim (Árbol de la Vida) del Arí: la exposición sistemática de la Cabalá
// luriana, primera en el orden de estudio. Ref por portales (Gate).
export const REF_OVERRIDES: Record<string, Partial<RichBook>> = {
  "Sefer Etz Chaim": {
    label: "Etz Jaim (Árbol de la Vida)",
    he: "עֵץ חַיִּים",
    units: 50,
    // El nodo principal de Etz Chaim es el "default" en Sefaria: "Sefer Etz Chaim {n}"
    // resuelve a Gate {n}:1. NO usar "Sefer Etz Chaim, Gate {n}" — Sefaria ignora el
    // ", Gate" y cae SIEMPRE a Gate 1:1 (bug reportado por Mardan, 2026-06).
    refTemplate: "Sefer Etz Chaim {n}",
  },
};

// Libros a OCULTAR del menú (ref roto sin plantilla numérica viable; accesibles
// por el buscador). Pri Etz Chaim es complejo con secciones de nombre.
export const HIDDEN_BOOKS = new Set<string>(["Pri Etz Chaim"]);

// ─── Estructura jerárquica del Zohar (para el navegador especial) ───────────
// Cada grupo = libro del Jumash (o sección especial).
// Cada parashá tiene: id del ref Sefaria, label ES, label FA, he, units.
export interface ZoharParasha {
  id: string;      // ref Sefaria: "Zohar, Bereshit"
  label: string;   // español
  labelFa: string; // farsi
  he: string;
  units: number;
  special?: boolean; // ★ secciones clave
}
export interface ZoharGroup {
  id: string;
  label: string;   // español
  labelFa: string; // farsi
  he: string;
  parashot: ZoharParasha[];
}

export const ZOHAR_GROUPS: ZoharGroup[] = [
  {
    id: "hakdama", label: "Hakdamá", labelFa: "مقدمه", he: "הַקְדָּמָה",
    parashot: [
      { id: "Zohar, Introduction", label: "Hakdamá — Introducción", labelFa: "مقدمه — درآمد", he: "הַקְדָּמָה", units: 34, special: true },
    ],
  },
  {
    id: "bereshit", label: "Bereshit — Génesis", labelFa: "برشیت — پیدایش", he: "בְּרֵאשִׁית",
    parashot: [
      { id: "Zohar, Bereshit",    label: "Bereshit",   labelFa: "برشیت",      he: "בְּרֵאשִׁית",   units: 102 },
      { id: "Zohar, Noach",       label: "Noaj",       labelFa: "نوح",        he: "נֹחַ",           units: 44  },
      { id: "Zohar, Lech Lecha",  label: "Lej Lejá",   labelFa: "لخ لخا",     he: "לֶךְ לְךָ",      units: 35  },
      { id: "Zohar, Vayera",      label: "Vayerá",     labelFa: "وییرا",       he: "וַיֵּרָא",       units: 36  },
      { id: "Zohar, Chayei Sara", label: "Jayéi Sará", labelFa: "حیی سارا",   he: "חַיֵּי שָׂרָה",  units: 27  },
      { id: "Zohar, Toldot",      label: "Toledot",    labelFa: "تولدوت",     he: "תּוֹלְדֹת",      units: 19  },
      { id: "Zohar, Vayetzei",    label: "Vayetzé",    labelFa: "وییتصه",     he: "וַיֵּצֵא",       units: 43  },
      { id: "Zohar, Vayishlach",  label: "Vayishlaj",  labelFa: "وییشلح",     he: "וַיִּשְׁלַח",    units: 30  },
      { id: "Zohar, Vayeshev",    label: "Vayeshev",   labelFa: "وییشب",      he: "וַיֵּשֶׁב",      units: 25  },
      { id: "Zohar, Miketz",      label: "Mikets",     labelFa: "میقص",       he: "מִקֵּץ",         units: 15  },
      { id: "Zohar, Vayigash",    label: "Vayigash",   labelFa: "وییگش",      he: "וַיִּגַּשׁ",     units: 12  },
      { id: "Zohar, Vayechi",     label: "Vayejí",     labelFa: "وییحی",      he: "וַיְחִי",        units: 86  },
    ],
  },
  {
    id: "shemot", label: "Shemot — Éxodo", labelFa: "شموت — خروج", he: "שְׁמוֹת",
    parashot: [
      { id: "Zohar, Shemot",      label: "Shemot",     labelFa: "شموت",       he: "שְׁמוֹת",        units: 52  },
      { id: "Zohar, Vaera",       label: "Vaerá",      labelFa: "واارا",       he: "וָאֵרָא",        units: 22  },
      { id: "Zohar, Bo",          label: "Bó",         labelFa: "بوا",        he: "בֹּא",           units: 17  },
      { id: "Zohar, Beshalach",   label: "Beshalaj",   labelFa: "بشلح",       he: "בְּשַׁלַּח",     units: 34  },
      { id: "Zohar, Yitro",       label: "Yitró",      labelFa: "یترو",       he: "יִתְרוֹ",        units: 35  },
      { id: "Zohar, Mishpatim",   label: "Mishpatim",  labelFa: "میشپاتیم",   he: "מִשְׁפָּטִים",   units: 30  },
      { id: "Zohar, Terumah",     label: "Terumá",     labelFa: "ترومه",      he: "תְּרוּמָה",      units: 98  },
      { id: "Zohar, Sifra DiTzniuta", label: "Sifra diTzniutá ★", labelFa: "سیفرا دیتصنیعوتا ★", he: "סִפְרָא דְצְנִיעוּתָא", units: 6, special: true },
      { id: "Zohar, Tetzaveh",    label: "Tetzavé",    labelFa: "تتصوه",      he: "תְּצַוֶּה",      units: 18  },
      { id: "Zohar, Ki Tisa",     label: "Ki Tisá",    labelFa: "کی تیسا",    he: "כִּי תִשָּׂא",   units: 12  },
      { id: "Zohar, Vayakhel",    label: "Vayakhél",   labelFa: "وییقهل",     he: "וַיַּקְהֵל",     units: 43  },
      { id: "Zohar, Pekudei",     label: "Pekudéi",    labelFa: "پقودی",      he: "פְקוּדֵי",       units: 63  },
    ],
  },
  {
    id: "vayikra", label: "Vayikrá — Levítico", labelFa: "وییقرا — لاویان", he: "וַיִּקְרָא",
    parashot: [
      { id: "Zohar, Vayikra",     label: "Vayikrá",    labelFa: "وییقرا",     he: "וַיִּקְרָא",     units: 67  },
      { id: "Zohar, Tzav",        label: "Tzav",       labelFa: "تصاو",       he: "צַו",            units: 30  },
      { id: "Zohar, Shmini",      label: "Shminí",     labelFa: "شمینی",      he: "שְׁמִינִי",      units: 16  },
      { id: "Zohar, Tazria",      label: "Tazría",     labelFa: "تزریع",      he: "תַּזְרִיעַ",     units: 35  },
      { id: "Zohar, Metzora",     label: "Metzorá",    labelFa: "متصورا",     he: "מְצֹרָע",        units: 16  },
      { id: "Zohar, Achrei Mot",  label: "Ajaréi Mot", labelFa: "احاری موت",  he: "אַחֲרֵי מוֹת",   units: 75  },
      { id: "Zohar, Kedoshim",    label: "Kedoshim",   labelFa: "قدوشیم",     he: "קְדֹשִׁים",      units: 21  },
      { id: "Zohar, Emor",        label: "Emor",       labelFa: "امور",       he: "אֱמֹר",          units: 51  },
      { id: "Zohar, Behar",       label: "Behar",      labelFa: "بهار",       he: "בְּהַר",         units: 14  },
      { id: "Zohar, Bechukotai",  label: "Bejukotái",  labelFa: "بحوقوتای",   he: "בְּחֻקֹּתַי",    units: 16  },
    ],
  },
  {
    id: "bamidbar", label: "Bamidbar — Números", labelFa: "بمیدبار — اعداد", he: "בַּמִּדְבָּר",
    parashot: [
      { id: "Zohar, Bamidbar",      label: "Bamidbar",      labelFa: "بمیدبار",    he: "בַּמִּדְבָּר",   units: 8   },
      { id: "Zohar, Nasso",         label: "Nasó",          labelFa: "ناسو",       he: "נָשֹׂא",         units: 23  },
      { id: "Zohar, Idra Rabba",    label: "Idra Rabá ★",   labelFa: "ایدرا ربا ★", he: "אִדְרָא רַבָּא", units: 52, special: true },
      { id: "Zohar, Beha'alotcha",  label: "Behaalotkjá",   labelFa: "بهعلوتخا",   he: "בְּהַעֲלֹתְךָ",  units: 27  },
      { id: "Zohar, Sh'lach",       label: "Shelaj",        labelFa: "شلح",        he: "שְׁלַח",         units: 46  },
      { id: "Zohar, Korach",        label: "Koraj",         labelFa: "قورح",       he: "קֹרַח",          units: 14  },
      { id: "Zohar, Chukat",        label: "Jukat",         labelFa: "حوقت",       he: "חֻקַּת",         units: 12  },
      { id: "Zohar, Balak",         label: "Balak",         labelFa: "بلق",        he: "בָּלָק",         units: 47  },
      { id: "Zohar, Pinchas",       label: "Pinjas",        labelFa: "پینحاس",     he: "פִּינְחָס",      units: 129 },
      { id: "Zohar, Matot",         label: "Matot",         labelFa: "ماطوت",      he: "מַטּוֹת",        units: 1   },
    ],
  },
  {
    id: "devarim", label: "Devarim — Deuteronomio", labelFa: "دواریم — تثنیه", he: "דְּבָרִים",
    parashot: [
      { id: "Zohar, Vaetchanan",  label: "Vaetjanán",  labelFa: "واتحانان",   he: "וָאֶתְחַנַּן",   units: 32  },
      { id: "Zohar, Eikev",       label: "Ekev",       labelFa: "عیقب",       he: "עֵקֶב",          units: 6   },
      { id: "Zohar, Shoftim",     label: "Shoftim",    labelFa: "شوفطیم",     he: "שֹׁפְטִים",      units: 5   },
      { id: "Zohar, Ki Teitzei",  label: "Ki Tetzé",   labelFa: "کی تتصه",    he: "כִּי תֵצֵא",     units: 30  },
      { id: "Zohar, Vayeilech",   label: "Vayelej",    labelFa: "وییلخ",      he: "וַיֵּלֶךְ",      units: 9   },
      { id: "Zohar, Ha'Azinu",    label: "Haazinú",    labelFa: "هاازینو",    he: "הַאֲזִינוּ",     units: 17  },
    ],
  },
  {
    id: "special", label: "Secciones especiales", labelFa: "بخش‌های ویژه", he: "סְפָרִים מְיֻחָדִים",
    parashot: [
      { id: "Zohar, Idra Zuta",  label: "Idra Zutá — Pequeña Asamblea ★", labelFa: "ایدرا زوطا ★", he: "אִדְרָא זוּטָא", units: 43, special: true },
      { id: "Zohar, Addenda",    label: "Tosafot — Suplementos",           labelFa: "توسافوت",      he: "תּוֹסָפוֹת",    units: 81  },
    ],
  },
];

/** Construye el ref final de un libro, respetando refTemplate si existe. */
export function bookRef(book: RichBook, unit: number, amud?: "a" | "b"): string {
  if (book.refTemplate) {
    return book.refTemplate.replace("{n}", String(unit));
  }
  if (book.type === "talmud") {
    return `${book.id} ${unit}${amud ?? "a"}`;
  }
  return `${book.id} ${unit}`;
}
