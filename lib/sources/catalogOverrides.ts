// Overrides para obras de estructura COMPLEJA (isComplex en Sefaria), cuyo ref
// no es "Titulo N" sino una ruta anidada. Refs verificados contra la API (2026-05-31).

import type { CatBook } from "@/lib/sources/catalog.generated";

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

// Libros EXTRA a añadir a una CATEGORÍA (clave = id de categoría de Sefaria,
// ej. "Chasidut"). Se inyectan al final de la lista de la categoría desde
// categories.ts → expandSub. Útil para obras que NO vienen en el catálogo
// autogenerado pero sí existen en Sefaria.
//
// Ben Porat Yosef: comentario jasídico al Génesis de R' Yaakov Yosef de Polnoye,
// discípulo principal del Baal Shem Tov. Estructura COMPLEJA (21 secciones de
// nombre, no numéricas): como el Zohar/Etz Jaim, queda como UN solo chip; al
// abrirlo BookBrowser lo intercepta por id y muestra ParshaWorkNavigator (TOC
// agrupado, estructura BEN_PORAT_GROUPS). units aquí es irrelevante (la
// navegación la maneja el navegador).
export const EXTRA_BOOKS: Record<string, RichBook[]> = {
  Chasidut: [
    {
      id: "Ben Porat Yosef",
      label: "Ben Porat Yosef",
      he: "בֶּן פּוֹרָת יוֹסֵף",
      type: "chapters",
      units: 21,
    },
  ],
};

// Parche de etiqueta/ref para libros que YA están en el catálogo generado.
// Etz Chaim (Árbol de la Vida) del Arí: la exposición sistemática de la Cabalá
// luriana, primera en el orden de estudio.
//
// Etz Chaim NO se aplana como Tania (sería un muro de 51 chips: Shaar HaKlalim +
// 50 Portales, junto a Zohar, Tikkunei Zohar, etc. en la lista plana de Cabalá).
// Se navega como el Zohar: queda como UN solo chip "Etz Jaim" en la lista; al
// abrirlo, BookBrowser lo intercepta por id y muestra EtzChaimNavigator (TOC de
// 51 secciones → portal → capítulos), calcando la TOC de Sefaria. Por eso vive
// aquí en REF_OVERRIDES (chip único) y NO en COMPLEX_OVERRIDES (que lo aplanaría).
export const REF_OVERRIDES: Record<string, Partial<RichBook>> = {
  "Sefer Etz Chaim": {
    label: "Etz Jaim (Árbol de la Vida)",
    he: "עֵץ חַיִּים",
    // units/refTemplate aquí son irrelevantes para la navegación: el id se
    // intercepta en BookBrowser y se delega a EtzChaimNavigator, que arma los
    // refs de cada sección (igual que el Zohar nunca usa sus units del catálogo).
    units: 51,
  },
  // Me'or Einayim YA está en el catálogo generado (Chasidut). Es una obra
  // COMPLEJA por parashá (49 nodos depth 1, refs "Me'or Einayim, {Parashá}");
  // sus units numéricos del catálogo están ROTOS (no existe "Me'or Einayim 1").
  // Aquí solo damos al chip el he CON nikud para que se vea digno; la navegación
  // la intercepta BookBrowser por id y la delega a ParshaWorkNavigator
  // (estructura MEOR_EINAYIM_GROUPS), igual que Etz Jaim y Ben Porat Yosef.
  "Me'or Einayim": {
    he: "מְאוֹר עֵינַיִם",
  },
};

// ─── Estructura de Sefer Etz Chaim (para EtzChaimNavigator) ─────────────────
// 51 secciones EXACTAS de Sefaria, verificadas contra la API (2026-06-09):
//   · Shaar HaKlalim (Principios) — 13 capítulos.
//       ref: "Sefer Etz Chaim, Shaar HaKlalim {n}"  (n = 1..13)
//   · 50 Portales (Gates) — cada uno con su nº de capítulos.
//       ref: "Sefer Etz Chaim {gate}:{n}"   (ej. "Sefer Etz Chaim 13:5")
// El nombre propio de cada portal aparece en el texto al abrirlo (como en
// Sefaria, cuya TOC numera los Gates 1..50).
export interface EtzChaimSection {
  id: string;      // ref base Sefaria de la sección (se le añade ":{n}" o " {n}")
  refTemplate: string; // plantilla del ref de un capítulo concreto
  label: string;   // español
  labelFa: string; // farsi
  he: string;
  units: number;   // nº de capítulos de la sección
  special?: boolean;
}

// nº de capítulos por Portal (índice 1..50), verificado contra Sefaria.
const ETZ_CHAIM_GATE_CHAPTERS = [
  5, 3, 3, 5, 7, 8, 5, 6, 8, 5, 10, 5, 14, 10, 6, 7, 4, 6, 10, 12, 3, 3, 8, 7,
  8, 4, 4, 5, 9, 7, 5, 9, 5, 7, 5, 4, 5, 9, 15, 15, 3, 17, 4, 7, 4, 7, 6, 4, 9, 10,
];

export const ETZ_CHAIM_SECTIONS: EtzChaimSection[] = [
  {
    id: "Sefer Etz Chaim, Shaar HaKlalim",
    refTemplate: "Sefer Etz Chaim, Shaar HaKlalim {n}",
    label: "Shaar HaKlalim · Principios",
    labelFa: "شعار هکلالیم · کلیات",
    he: "שַׁעַר הַכְּלָלִים",
    units: 13,
    special: true,
  },
  ...ETZ_CHAIM_GATE_CHAPTERS.map((units, i) => ({
    id: `Sefer Etz Chaim ${i + 1}`,
    refTemplate: `Sefer Etz Chaim ${i + 1}:{n}`,
    label: `Portal ${i + 1}`,
    labelFa: `دروازه ${i + 1}`,
    he: `שַׁעַר ${i + 1}`,
    units,
  })),
];

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

// ─── Navegador GENÉRICO de obras por parashá (ParshaWorkNavigator) ──────────
// Modelo común para obras COMPLEJAS ordenadas por parashá (o por sección de
// nombre) cuyos nodos se cargan ENTEROS, no por capítulos: Ben Porat Yosef,
// Me'or Einayim, y los próximos. El ref de cada sección es "{bookId}, {refTitle}"
// (el navegador lo arma); por eso aquí solo guardamos el refTitle, no el ref
// completo. Agregar una obra nueva = declarar su estructura de grupos y cablear
// la intercepción por id en BookBrowser. Sin lógica nueva.
export interface ParshaWorkSection {
  refTitle: string; // título inglés del nodo en Sefaria (ej. "Bereshit", "Ki Tisa")
  label: string;    // español
  labelFa: string;  // farsi
  he: string;       // hebreo con nikud
  star?: boolean;   // ★ sección destacada (texto estrella)
}
export interface ParshaWorkGroup {
  id: string;
  label: string;   // español
  labelFa: string; // farsi
  he: string;
  sections: ParshaWorkSection[];
}

// Reutiliza el labelFa de una parashá tal como ya está en ZOHAR_GROUPS, para
// mantener coherencia de transliteración farsi entre libros. Busca por refTitle
// (la parte tras "Zohar, " del id). Si la parashá no existe en el Zohar (p.ej.
// Re'eh, Ki Tavo, Nitzavim), hay que dar el labelFa explícito en la estructura.
const ZOHAR_FA: Record<string, string> = Object.fromEntries(
  ZOHAR_GROUPS.flatMap((g) =>
    g.parashot.map((p) => [p.id.replace(/^Zohar, /, ""), p.labelFa] as const)
  )
);
function parshaFa(refTitle: string): string {
  const fa = ZOHAR_FA[refTitle];
  if (!fa) {
    throw new Error(`parshaFa: no hay labelFa de Zohar para "${refTitle}" — dalo explícito`);
  }
  return fa;
}

// ─── Estructura de Ben Porat Yosef (para ParshaWorkNavigator) ───────────────
// 21 secciones EXACTAS de Sefaria, verificadas contra la API (2026-06-15).
// 19 nodos son profundidad 1 (se cargan ENTEROS con getText). Los 2 de Sermones
// (Shabbat HaGadol / Shabbat Shuva) son profundidad 2 (Capítulo→Párrafo): para
// el MVP se abren también como nodo completo; getText devuelve el nodo y el
// flatten existente lo aplana. La Carta del Baal Shem Tov es el texto estrella (★).
export const BEN_PORAT_GROUPS: ParshaWorkGroup[] = [
  {
    id: "aperturas", label: "Aperturas", labelFa: "گشایش‌ها", he: "פְּתִיחוֹת",
    sections: [
      { refTitle: "Foreword",     label: "Apertura",      labelFa: "گشایش", he: "פְּתִיחָה" },
      { refTitle: "Introduction", label: "Introducción",  labelFa: "مقدمه", he: "הַקְדָּמָה" },
    ],
  },
  {
    id: "bereshit", label: "Bereshit · Génesis", labelFa: "برئشیت · پیدایش", he: "בְּרֵאשִׁית",
    sections: [
      { refTitle: "Bereshit",    label: "Bereshit",     labelFa: "برئشیت",  he: "בְּרֵאשִׁית" },
      { refTitle: "Noach",       label: "Noaj",         labelFa: "نوح",     he: "נֹחַ" },
      { refTitle: "Lech Lecha",  label: "Lej Lejá",     labelFa: "لخ لخا",  he: "לֶךְ לְךָ" },
      { refTitle: "Vayera",      label: "Vayerá",       labelFa: "وَیّرا",  he: "וַיֵּרָא" },
      { refTitle: "Chayei Sara", label: "Jayéi Sará",   labelFa: "حَیّی سارا", he: "חַיֵּי שָׂרָה" },
      { refTitle: "Toldot",      label: "Toledot",      labelFa: "تولدوت",  he: "תּוֹלְדוֹת" },
      { refTitle: "Vayetzei",    label: "Vayetzé",      labelFa: "وَیّتسی", he: "וַיֵּצֵא" },
      { refTitle: "Vayishlach",  label: "Vayishlaj",    labelFa: "وَیشلَح", he: "וַיִּשְׁלַח" },
      { refTitle: "Vayeshev",    label: "Vayeshev",     labelFa: "وَیّشِو", he: "וַיֵּשֶׁב" },
      { refTitle: "Miketz",      label: "Mikets",       labelFa: "مِقّتس",  he: "מִקֵּץ" },
      { refTitle: "Vayigash",    label: "Vayigash",     labelFa: "وَیگَش",  he: "וַיִּגַּשׁ" },
      { refTitle: "Vayechi",     label: "Vayejí",       labelFa: "وَیْحی",  he: "וַיְחִי" },
    ],
  },
  {
    id: "otras", label: "Otras secciones", labelFa: "بخش‌های دیگر", he: "שְׁאָר חֲלָקִים",
    sections: [
      { refTitle: "Likkutim",                label: "Recopilaciones (Likutim)",          labelFa: "گزیده‌ها",          he: "לִקּוּטִים" },
      { refTitle: "Discourse",               label: "Disertación (Jiluk)",               labelFa: "رساله",             he: "חִלּוּק" },
      { refTitle: "Responsa",                label: "Responsa (She'elot u-Teshuvot)",    labelFa: "پرسش و پاسخ",       he: "שׁוּ\"ת" },
      { refTitle: "Shabbat HaGadol Sermons", label: "Sermones de Shabat HaGadol",        labelFa: "خطبه‌های شبات هَگادول", he: "דְּרָשׁוֹת שַׁבָּת הַגָּדוֹל" },
      { refTitle: "Shabbat Shuva Sermons",   label: "Sermones de Shabat Teshuvá",        labelFa: "خطبه‌های شبات تشووا",  he: "דְּרָשׁוֹת שַׁבָּת תְּשׁוּבָה" },
      { refTitle: "Kuntres Acharon",         label: "Cuaderno Final (Kuntrés Ajarón)",   labelFa: "دفترچهٔ پایانی",    he: "קוּנְטְרֵס אַחֲרוֹן" },
      { refTitle: "Baal Shem Tov's Letter",  label: "La Carta del Baal Shem Tov",        labelFa: "نامهٔ بعل شم טوב",  he: "אִגֶּרֶת מֵהַבַּעַשְׁ\"ט", star: true },
    ],
  },
];

// ─── Estructura de Me'or Einayim (para ParshaWorkNavigator) ─────────────────
// מְאוֹר עֵינַיִם — comentario jasídico de R' Menajem Najum de Chernóbil, ordenado
// por parashá. 49 nodos EXACTOS de Sefaria, verificados contra la API (2026-06-15),
// todos profundidad 1 (se cargan ENTEROS con getText). El ref de cada nodo es
// "Me'or Einayim, {refTitle}". NO hay Vayechi. Los labelFa de las parashot se
// REUTILIZAN de ZOHAR_GROUPS (parshaFa) para coherencia; los nodos que no son
// parashá (Portada, Aprobaciones, Introducción, Likutim) llevan su farsi propio.
export const MEOR_EINAYIM_GROUPS: ParshaWorkGroup[] = [
  {
    id: "preliminares", label: "Preliminares", labelFa: "پیش‌گفتارها", he: "הַקְדָּמוֹת",
    sections: [
      { refTitle: "Title",        label: "Portada",       labelFa: "شناسنامه",  he: "שַׁעַר" },
      { refTitle: "Approbations", label: "Aprobaciones",  labelFa: "تأییدیه‌ها", he: "הַסְכָּמוֹת" },
      { refTitle: "Introduction", label: "Introducción",  labelFa: "مقدمه",     he: "הַקְדָּמָה", star: true },
    ],
  },
  {
    id: "bereshit", label: "Bereshit · Génesis", labelFa: "برشیت · پیدایش", he: "בְּרֵאשִׁית",
    sections: [
      { refTitle: "Bereshit",    label: "Bereshit",   labelFa: parshaFa("Bereshit"),    he: "בְּרֵאשִׁית", star: true },
      { refTitle: "Noach",       label: "Noaj",       labelFa: parshaFa("Noach"),       he: "נֹחַ" },
      { refTitle: "Lech Lecha",  label: "Lej Lejá",   labelFa: parshaFa("Lech Lecha"),  he: "לֶךְ לְךָ" },
      { refTitle: "Vayera",      label: "Vayerá",     labelFa: parshaFa("Vayera"),      he: "וַיֵּרָא" },
      { refTitle: "Chayei Sara", label: "Jayéi Sará", labelFa: parshaFa("Chayei Sara"), he: "חַיֵּי שָׂרָה" },
      { refTitle: "Toldot",      label: "Toledot",    labelFa: parshaFa("Toldot"),      he: "תּוֹלְדוֹת" },
      { refTitle: "Vayetzei",    label: "Vayetzé",    labelFa: parshaFa("Vayetzei"),    he: "וַיֵּצֵא" },
      { refTitle: "Vayishlach",  label: "Vayishlaj",  labelFa: parshaFa("Vayishlach"),  he: "וַיִּשְׁלַח" },
      { refTitle: "Vayeshev",    label: "Vayeshev",   labelFa: parshaFa("Vayeshev"),    he: "וַיֵּשֶׁב" },
      { refTitle: "Miketz",      label: "Mikets",     labelFa: parshaFa("Miketz"),      he: "מִקֵּץ" },
      { refTitle: "Vayigash",    label: "Vayigash",   labelFa: parshaFa("Vayigash"),    he: "וַיִּגַּשׁ" },
    ],
  },
  {
    id: "shemot", label: "Shemot · Éxodo", labelFa: "شموت · خروج", he: "שְׁמוֹת",
    sections: [
      { refTitle: "Shemot",    label: "Shemot",    labelFa: parshaFa("Shemot"),    he: "שְׁמוֹת", star: true },
      { refTitle: "Vaera",     label: "Vaerá",     labelFa: parshaFa("Vaera"),     he: "וָאֵרָא" },
      { refTitle: "Bo",        label: "Bó",        labelFa: parshaFa("Bo"),        he: "בֹּא" },
      { refTitle: "Beshalach", label: "Beshalaj",  labelFa: parshaFa("Beshalach"), he: "בְּשַׁלַּח" },
      { refTitle: "Yitro",     label: "Yitró",     labelFa: parshaFa("Yitro"),     he: "יִתְרוֹ" },
      { refTitle: "Mishpatim", label: "Mishpatim", labelFa: parshaFa("Mishpatim"), he: "מִשְׁפָּטִים" },
      { refTitle: "Terumah",   label: "Terumá",    labelFa: parshaFa("Terumah"),   he: "תְּרוּמָה" },
      { refTitle: "Tetzaveh",  label: "Tetzavé",   labelFa: parshaFa("Tetzaveh"),  he: "תְּצַוֶּה" },
      { refTitle: "Ki Tisa",   label: "Ki Tisá",   labelFa: parshaFa("Ki Tisa"),   he: "כִּי תִשָּׂא" },
      { refTitle: "Vayakhel",  label: "Vayakhél",  labelFa: parshaFa("Vayakhel"),  he: "וַיַּקְהֵל" },
      { refTitle: "Pekudei",   label: "Pekudéi",   labelFa: parshaFa("Pekudei"),   he: "פְקוּדֵי" },
    ],
  },
  {
    id: "vayikra", label: "Vayikrá · Levítico", labelFa: "وییقرا · لاویان", he: "וַיִּקְרָא",
    sections: [
      { refTitle: "Vayikra",    label: "Vayikrá",    labelFa: parshaFa("Vayikra"),    he: "וַיִּקְרָא" },
      { refTitle: "Tzav",       label: "Tzav",       labelFa: parshaFa("Tzav"),       he: "צַו" },
      { refTitle: "Shmini",     label: "Shminí",     labelFa: parshaFa("Shmini"),     he: "שְׁמִינִי" },
      { refTitle: "Metzora",    label: "Metzorá",    labelFa: parshaFa("Metzora"),    he: "מְצֹרָע" },
      { refTitle: "Achrei Mot", label: "Ajaréi Mot", labelFa: parshaFa("Achrei Mot"), he: "אַחֲרֵי מוֹת" },
      { refTitle: "Kedoshim",   label: "Kedoshim",   labelFa: parshaFa("Kedoshim"),   he: "קְדוֹשִׁים" },
      { refTitle: "Emor",       label: "Emor",       labelFa: parshaFa("Emor"),       he: "אֱמֹר" },
      { refTitle: "Bechukotai", label: "Bejukotái",  labelFa: parshaFa("Bechukotai"), he: "בְּחֻקֹּתַי" },
    ],
  },
  {
    id: "bamidbar", label: "Bamidbar · Números", labelFa: "بمیدبار · اعداد", he: "בְּמִדְבַּר",
    sections: [
      { refTitle: "Bamidbar",     label: "Bamidbar",    labelFa: parshaFa("Bamidbar"),      he: "בְּמִדְבַּר" },
      { refTitle: "Nasso",        label: "Nasó",        labelFa: parshaFa("Nasso"),         he: "נָשֹׂא" },
      { refTitle: "Beha'alotcha", label: "Behaalotjá",  labelFa: parshaFa("Beha'alotcha"),  he: "בְּהַעֲלֹתְךָ" },
      { refTitle: "Sh'lach",      label: "Shelaj",      labelFa: parshaFa("Sh'lach"),       he: "שְׁלַח" },
      { refTitle: "Chukat",       label: "Jukat",       labelFa: parshaFa("Chukat"),        he: "חֻקַּת" },
      { refTitle: "Pinchas",      label: "Pinjas",      labelFa: parshaFa("Pinchas"),       he: "פִּינְחָס" },
      { refTitle: "Matot",        label: "Matot",       labelFa: parshaFa("Matot"),         he: "מַטּוֹת" },
    ],
  },
  {
    id: "devarim", label: "Devarim · Deuteronomio", labelFa: "دواریم · تثنیه", he: "דְּבָרִים",
    sections: [
      { refTitle: "Devarim",    label: "Devarim",    labelFa: "دواریم",               he: "דְּבָרִים" },
      { refTitle: "Vaetchanan", label: "Vaetjanán",  labelFa: parshaFa("Vaetchanan"), he: "וָאֶתְחַנַּן" },
      { refTitle: "Re'eh",      label: "Reé",        labelFa: "رئه",                  he: "רְאֵה" },
      { refTitle: "Ki Teitzei", label: "Ki Tetzé",   labelFa: parshaFa("Ki Teitzei"), he: "כִּי תֵצֵא" },
      { refTitle: "Ki Tavo",    label: "Ki Tavó",    labelFa: "کی تاوو",              he: "כִּי תָבוֹא" },
      { refTitle: "Nitzavim",   label: "Nitzavim",   labelFa: "نیتصاویم",             he: "נִצָּבִים" },
      { refTitle: "Vayeilech",  label: "Vayelej",    labelFa: parshaFa("Vayeilech"),  he: "וַיֵּלֶךְ" },
      { refTitle: "Ha'Azinu",   label: "Haazinú",    labelFa: parshaFa("Ha'Azinu"),   he: "הַאֲזִינוּ" },
    ],
  },
  {
    id: "apendice", label: "Apéndice", labelFa: "گردآوری‌ها", he: "לִקּוּטִים",
    sections: [
      { refTitle: "Additions", label: "Likutim (Recopilaciones)", labelFa: "لیکوتیم", he: "לִקּוּטִים" },
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
