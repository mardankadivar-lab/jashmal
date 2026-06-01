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

  // ─── ZOHAR — 53 parashot/secciones reales (Sefaria API verificado 2026-06-01) ───
  // Refs: "Zohar, {Parasha} {n}" — estructura por Jumash + secciones especiales.
  Zohar: [
    // Hakdamá
    { id: "Zohar, Introduction", label: "★ Hakdamá — Introducción", he: "הַקְדָּמָה", type: "chapters", units: 34 },
    // Bereshit (Génesis)
    { id: "Zohar, Bereshit",    label: "Bereshit",    he: "בְּרֵאשִׁית",    type: "chapters", units: 102 },
    { id: "Zohar, Noach",       label: "Noaj",        he: "נֹחַ",           type: "chapters", units: 44  },
    { id: "Zohar, Lech Lecha",  label: "Lej Lejá",    he: "לֶךְ לְךָ",      type: "chapters", units: 35  },
    { id: "Zohar, Vayera",      label: "Vayerá",      he: "וַיֵּרָא",       type: "chapters", units: 36  },
    { id: "Zohar, Chayei Sara", label: "Jayéi Sará",  he: "חַיֵּי שָׂרָה",  type: "chapters", units: 27  },
    { id: "Zohar, Toldot",      label: "Toledot",     he: "תּוֹלְדֹת",      type: "chapters", units: 19  },
    { id: "Zohar, Vayetzei",    label: "Vayetzé",     he: "וַיֵּצֵא",       type: "chapters", units: 43  },
    { id: "Zohar, Vayishlach",  label: "Vayishlaj",   he: "וַיִּשְׁלַח",    type: "chapters", units: 30  },
    { id: "Zohar, Vayeshev",    label: "Vayeshev",    he: "וַיֵּשֶׁב",      type: "chapters", units: 25  },
    { id: "Zohar, Miketz",      label: "Mikets",      he: "מִקֵּץ",         type: "chapters", units: 15  },
    { id: "Zohar, Vayigash",    label: "Vayigash",    he: "וַיִּגַּשׁ",     type: "chapters", units: 12  },
    { id: "Zohar, Vayechi",     label: "Vayejí",      he: "וַיְחִי",        type: "chapters", units: 86  },
    // Shemot (Éxodo)
    { id: "Zohar, Shemot",      label: "Shemot",      he: "שְׁמוֹת",        type: "chapters", units: 52  },
    { id: "Zohar, Vaera",       label: "Vaerá",       he: "וָאֵרָא",        type: "chapters", units: 22  },
    { id: "Zohar, Bo",          label: "Bó",          he: "בֹּא",           type: "chapters", units: 17  },
    { id: "Zohar, Beshalach",   label: "Beshalaj",    he: "בְּשַׁלַּח",     type: "chapters", units: 34  },
    { id: "Zohar, Yitro",       label: "Yitró",       he: "יִתְרוֹ",        type: "chapters", units: 35  },
    { id: "Zohar, Mishpatim",   label: "Mishpatim",   he: "מִשְׁפָּטִים",   type: "chapters", units: 30  },
    { id: "Zohar, Terumah",     label: "Terumá",      he: "תְּרוּמָה",      type: "chapters", units: 98  },
    { id: "Zohar, Sifra DiTzniuta", label: "★ Sifra diTzniutá — Libro del Ocultamiento", he: "סִפְרָא דְצְנִיעוּתָא", type: "chapters", units: 6 },
    { id: "Zohar, Tetzaveh",    label: "Tetzavé",     he: "תְּצַוֶּה",      type: "chapters", units: 18  },
    { id: "Zohar, Ki Tisa",     label: "Ki Tisá",     he: "כִּי תִשָּׂא",   type: "chapters", units: 12  },
    { id: "Zohar, Vayakhel",    label: "Vayakhél",    he: "וַיַּקְהֵל",     type: "chapters", units: 43  },
    { id: "Zohar, Pekudei",     label: "Pekudéi",     he: "פְקוּדֵי",       type: "chapters", units: 63  },
    // Vayikra (Levítico)
    { id: "Zohar, Vayikra",     label: "Vayikrá",     he: "וַיִּקְרָא",     type: "chapters", units: 67  },
    { id: "Zohar, Tzav",        label: "Tzav",        he: "צַו",            type: "chapters", units: 30  },
    { id: "Zohar, Shmini",      label: "Shminí",      he: "שְׁמִינִי",      type: "chapters", units: 16  },
    { id: "Zohar, Tazria",      label: "Tazría",      he: "תַּזְרִיעַ",     type: "chapters", units: 35  },
    { id: "Zohar, Metzora",     label: "Metzorá",     he: "מְצֹרָע",        type: "chapters", units: 16  },
    { id: "Zohar, Achrei Mot",  label: "Ajaréi Mot",  he: "אַחֲרֵי מוֹת",   type: "chapters", units: 75  },
    { id: "Zohar, Kedoshim",    label: "Kedoshim",    he: "קְדֹשִׁים",      type: "chapters", units: 21  },
    { id: "Zohar, Emor",        label: "Emor",        he: "אֱמֹר",          type: "chapters", units: 51  },
    { id: "Zohar, Behar",       label: "Behar",       he: "בְּהַר",         type: "chapters", units: 14  },
    { id: "Zohar, Bechukotai",  label: "Bejukotái",   he: "בְּחֻקֹּתַי",    type: "chapters", units: 16  },
    // Bamidbar (Números)
    { id: "Zohar, Bamidbar",    label: "Bamidbar",    he: "בַּמִּדְבָּר",   type: "chapters", units: 8   },
    { id: "Zohar, Nasso",       label: "Nasó",        he: "נָשֹׂא",         type: "chapters", units: 23  },
    { id: "Zohar, Idra Rabba",  label: "★ Idra Rabá — Gran Asamblea", he: "אִדְרָא רַבָּא", type: "chapters", units: 52 },
    { id: "Zohar, Beha'alotcha",label: "Behaalotkjá", he: "בְּהַעֲלֹתְךָ",  type: "chapters", units: 27  },
    { id: "Zohar, Sh'lach",     label: "Shelaj",      he: "שְׁלַח",         type: "chapters", units: 46  },
    { id: "Zohar, Korach",      label: "Koraj",       he: "קֹרַח",          type: "chapters", units: 14  },
    { id: "Zohar, Chukat",      label: "Jukat",       he: "חֻקַּת",         type: "chapters", units: 12  },
    { id: "Zohar, Balak",       label: "Balak",       he: "בָּלָק",         type: "chapters", units: 47  },
    { id: "Zohar, Pinchas",     label: "Pinjas",      he: "פִּינְחָס",      type: "chapters", units: 129 },
    { id: "Zohar, Matot",       label: "Matot",       he: "מַטּוֹת",        type: "chapters", units: 1   },
    // Devarim (Deuteronomio)
    { id: "Zohar, Vaetchanan",  label: "Vaetjanán",   he: "וָאֶתְחַנַּן",   type: "chapters", units: 32  },
    { id: "Zohar, Eikev",       label: "Ekev",        he: "עֵקֶב",          type: "chapters", units: 6   },
    { id: "Zohar, Shoftim",     label: "Shoftim",     he: "שֹׁפְטִים",      type: "chapters", units: 5   },
    { id: "Zohar, Ki Teitzei",  label: "Ki Tetzé",    he: "כִּי תֵצֵא",     type: "chapters", units: 30  },
    { id: "Zohar, Vayeilech",   label: "Vayelej",     he: "וַיֵּלֶךְ",      type: "chapters", units: 9   },
    { id: "Zohar, Ha'Azinu",    label: "Haazinú",     he: "הַאֲזִינוּ",     type: "chapters", units: 17  },
    // Secciones especiales
    { id: "Zohar, Idra Zuta",   label: "★ Idra Zutá — Pequeña Asamblea", he: "אִדְרָא זוּטָא", type: "chapters", units: 43 },
    { id: "Zohar, Addenda",     label: "Tosafot — Suplementos", he: "תּוֹסָפוֹת", type: "chapters", units: 81 },
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
    refTemplate: "Sefer Etz Chaim, Gate {n}",
  },
};

// Libros a OCULTAR del menú (ref roto sin plantilla numérica viable; accesibles
// por el buscador). Pri Etz Chaim es complejo con secciones de nombre.
export const HIDDEN_BOOKS = new Set<string>(["Pri Etz Chaim"]);

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
