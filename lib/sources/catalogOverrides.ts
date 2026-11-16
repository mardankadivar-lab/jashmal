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

  // El Kuzari se APLANA como el Tania, y por una razón de tamaño, no de gusto:
  // sus cinco maamarim NO son pasajes. «Kuzari 1» son 74.401 caracteres de
  // hebreo —un libro entero— y abrirlo como una sola unidad reventaría el
  // estudio. La obra es un DIÁLOGO numerado por declaraciones (depth 2:
  // maamar → declaración), y la declaración es la unidad real de lectura:
  // «Kuzari 1:1» son 1.469 caracteres, el tamaño de un pasaje.
  //
  // El nº de declaraciones de cada maamar está medido contra /api/shape/Kuzari
  // (2026-11-16): [123, 81, 74, 44, 28]. No se copió de ninguna edición impresa.
  //
  // Los nombres de los cinco ensayos son NUESTROS: el Sofer entrega el Kuzari
  // como obra PLANA («ensayo + párrafo») y no nombra los maamarim, porque
  // Sefaria solo los numera. El farsi y el inglés de los cinco están en
  // BOOK_NAMES, que es donde el chip los busca.
  Kuzari: [
    { id: "Kuzari-1", label: "El Kuzari · Ensayo primero", he: "מַאֲמָר רִאשׁוֹן", type: "chapters", units: 123, refTemplate: "Kuzari 1:{n}" },
    { id: "Kuzari-2", label: "El Kuzari · Ensayo segundo", he: "מַאֲמָר שֵׁנִי", type: "chapters", units: 81, refTemplate: "Kuzari 2:{n}" },
    { id: "Kuzari-3", label: "El Kuzari · Ensayo tercero", he: "מַאֲמָר שְׁלִישִׁי", type: "chapters", units: 74, refTemplate: "Kuzari 3:{n}" },
    { id: "Kuzari-4", label: "El Kuzari · Ensayo cuarto", he: "מַאֲמָר רְבִיעִי", type: "chapters", units: 44, refTemplate: "Kuzari 4:{n}" },
    { id: "Kuzari-5", label: "El Kuzari · Ensayo quinto", he: "מַאֲמָר חֲמִישִׁי", type: "chapters", units: 28, refTemplate: "Kuzari 5:{n}" },
  ],
};;

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
  /** farsi. Opcional solo por compatibilidad: sin él se cae al español, como
   * `nodeLabel` del cerebro. En la estantería de filosofía judía TODAS lo
   * llevan (entrega del Sofer, 16-nov-2026). */
  labelFa?: string;
  /** inglés. Mismo criterio que labelFa. */
  labelEn?: string;
  he: string;       // hebreo con nikud
  star?: boolean;   // ★ sección destacada (texto estrella)
  /** Nº de capítulos de la sección, cuando el nodo tiene profundidad 2
   * (Sección → Capítulo → Párrafo). Sin este campo la sección es un nodo de
   * profundidad 1 y se estudia ENTERA (el caso de Ben Porat Yosef y Me'or
   * Einayim). Con él, al tocarla se abre la rejilla de capítulos normal y el
   * ref de cada uno es "{bookId}, {refTitle} {n}" — que es exactamente cómo
   * Sefaria numera los capítulos de un portal, un tratado o un netiv. */
  units?: number;
  /** Ref base, cuando los capítulos NO cuelgan de un nodo con nombre sino del
   * libro mismo. Solo Shemoná Perakim: sus ocho capítulos se piden
   * «Eight Chapters 3», no «Eight Chapters, algo 3». Con refBase el ref es
   * "{refBase} {n}" y el refTitle queda vacío. */
  refBase?: string;
  /** GLOSA EDITORIAL: el subtítulo temático de este rótulo es NUESTRO, no de
   * Sefaria, que aquí solo numera (p. ej. «מאמר א»). Marcado por el Sofer para
   * que se pueda quitar sin romper nada: ningún código depende de la glosa, es
   * texto dentro de `label`/`labelFa`/`labelEn`, del lado derecho de los dos
   * puntos. Borrar la glosa = recortar ese texto; la navegación no cambia. */
  glosa?: boolean;
}
export interface ParshaWorkGroup {
  id: string;
  label: string;    // español
  labelFa?: string; // farsi (opcional: cae al español)
  labelEn?: string; // inglés (opcional: cae al español)
  he: string;
  sections: ParshaWorkSection[];
}

/** Una obra COMPLEJA navegada con ParshaWorkNavigator. El registro vive aquí
 * (no en BookBrowser) para que añadir una obra sea declarar su estructura y
 * una línea en esta lista, sin tocar la interfaz. */
export interface ParshaWork {
  /** id del libro en Sefaria, tal como empieza cualquier ref de la obra. */
  bookId: string;
  /** hebreo del rótulo que se muestra encima del navegador. */
  he: string;
  groups: ParshaWorkGroup[];
  /** grupo abierto por defecto (acordeón). */
  defaultOpenGroup?: string;
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

// ─── Las obras de FILOSOFÍA JUDÍA (מַחְשֶׁבֶת יִשְׂרָאֵל) ─────────────────────
// Ocho obras complejas de la séptima estantería, todas navegadas con el mismo
// ParshaWorkNavigator: grupo → sección con nombre → (capítulo, si la sección
// tiene profundidad 2). No hay lógica nueva para ninguna.
//
// DOS MANOS, SEPARADAS A PROPÓSITO:
//   · La FORMA —qué refs existen y cuántos capítulos tiene cada uno— está
//     medida contra /api/shape y /api/texts de Sefaria. Es dato, no criterio.
//   · Los NOMBRES —español, farsi, inglés y el nikud del hebreo— son la
//     entrega del Departamento de Erudición (el Sofer), 16-nov-2026.
//     El NIKUD ES SUYO: Sefaria entrega los títulos sin vocalizar.
//
// El Sofer encontró un nodo que /api/shape no muestra: `Eight Chapters,
// Introduction` (1.503 caracteres de hebreo). shape solo reporta el nodo
// default de un libro, así que medir no bastaba; hacía falta leer el índice.

// ── Guía de los perplejos (Moré Nevujim) ──
export const MOREH_GROUPS: ParshaWorkGroup[] = [
  {
    id: "umbrales", label: "Umbrales", labelFa: "آستانه‌ها", labelEn: "Thresholds", he: "פְּתִיחוֹת",
    sections: [
      { refTitle: "Introduction of Ibn Tibon", label: "Prólogo de Ibn Tibón (el traductor)", labelFa: "دیباچهٔ ابن تیبون (مترجم)", labelEn: "Ibn Tibbon's Preface", he: "פְּתִיחַת אִבְּן תִּבּוֹן" },
      { refTitle: "Letter to R Joseph son of Judah", label: "Carta a Rabí Yosef, hijo de Yehudá", labelFa: "نامه به ربّی یوسف پسر یهودا", labelEn: "Letter to R. Joseph son of Judah", he: "אִגֶּרֶת אֶל ר׳ יוֹסֵף בר׳ יְהוּדָה" },
      { refTitle: "Prefatory Remarks", label: "Palabras preliminares del Rambam", labelFa: "دیباچهٔ ابن میمون", labelEn: "Maimonides' Prefatory Remarks", he: "פְּתִיחַת הָרַמְבַּ״ם" },
    ],
  },
  {
    id: "parte1", label: "Parte primera", labelFa: "بخش یکم", labelEn: "Part One", he: "חֵלֶק רִאשׁוֹן",
    sections: [
      { refTitle: "Part 1, Introduction", label: "Introducción", labelFa: "درآمد", labelEn: "Introduction", he: "הַקְדָּמָה" },
      { refTitle: "Part 1", label: "Parte primera", labelFa: "بخش یکم", labelEn: "Part One", he: "חֵלֶק רִאשׁוֹן", units: 76, star: true },
    ],
  },
  {
    id: "parte2", label: "Parte segunda", labelFa: "بخش دوم", labelEn: "Part Two", he: "חֵלֶק שֵׁנִי",
    sections: [
      { refTitle: "Part 2, Introduction", label: "Introducción", labelFa: "درآمد", labelEn: "Introduction", he: "הַקְדָּמָה" },
      { refTitle: "Part 2", label: "Parte segunda", labelFa: "بخش دوم", labelEn: "Part Two", he: "חֵלֶק שֵׁנִי", units: 48 },
    ],
  },
  {
    id: "parte3", label: "Parte tercera", labelFa: "بخش سوم", labelEn: "Part Three", he: "חֵלֶק שְׁלִישִׁי",
    sections: [
      { refTitle: "Part 3, Introduction", label: "Introducción", labelFa: "درآمد", labelEn: "Introduction", he: "הַקְדָּמָה" },
      { refTitle: "Part 3", label: "Parte tercera", labelFa: "بخش سوم", labelEn: "Part Three", he: "חֵלֶק שְׁלִישִׁי", units: 54 },
    ],
  },
];

// ── Los ocho capítulos (Shemoná Perakim) ──
export const SHEMONA_PERAKIM_GROUPS: ParshaWorkGroup[] = [
  {
    id: "apertura", label: "Apertura", labelFa: "درآمد", labelEn: "Opening", he: "פְּתִיחָה",
    sections: [
      { refTitle: "Introduction", label: "Introducción", labelFa: "درآمد", labelEn: "Introduction", he: "הַקְדָּמָה" },
    ],
  },
  {
    id: "capitulos8", label: "Los ocho capítulos", labelFa: "هشت فصل", labelEn: "The eight chapters", he: "שְׁמוֹנָה פְּרָקִים",
    sections: [
      { refTitle: "", refBase: "Eight Chapters", label: "Los ocho capítulos", labelFa: "هشت فصل", labelEn: "The eight chapters", he: "שְׁמוֹנָה פְּרָקִים", units: 8, star: true },
    ],
  },
];

// ── Los deberes del corazón (Jovot HaLevavot) ──
export const CHOVOT_GROUPS: ParshaWorkGroup[] = [
  {
    id: "apertura", label: "Apertura", labelFa: "درآمد", labelEn: "Opening", he: "פְּתִיחָה",
    sections: [
      { refTitle: "Introduction of the Author", label: "Introducción del autor", labelFa: "دیباچهٔ مؤلف", labelEn: "Introduction of the Author", he: "הַקְדָּמַת הַמְחַבֵּר" },
    ],
  },
  {
    id: "porton1", label: "Portón primero: la unidad de Dios (Sháar HaYijud)", labelFa: "دروازهٔ یکم: یگانگی خداوند", labelEn: "First Gate: The Unity of God", he: "שַׁעַר רִאשׁוֹן — שַׁעַר הַיִּחוּד",
    sections: [
      { refTitle: "First Treatise on Unity, Introduction", label: "Introducción", labelFa: "درآمد", labelEn: "Introduction", he: "הַקְדָּמָה" },
      { refTitle: "First Treatise on Unity", label: "Portón primero: la unidad de Dios (Sháar HaYijud)", labelFa: "دروازهٔ یکم: یگانگی خداوند", labelEn: "First Gate: The Unity of God", he: "שַׁעַר רִאשׁוֹן — שַׁעַר הַיִּחוּד", units: 10, star: true },
    ],
  },
  {
    id: "porton2", label: "Portón segundo: el examen de la creación (Sháar HaBejiná)", labelFa: "دروازهٔ دوم: تأمل در آفرینش", labelEn: "Second Gate: Examining the Creation", he: "שַׁעַר שֵׁנִי — שַׁעַר הַבְּחִינָה",
    sections: [
      { refTitle: "Second Treatise on Examination, Introduction", label: "Introducción", labelFa: "درآمد", labelEn: "Introduction", he: "הַקְדָּמָה" },
      { refTitle: "Second Treatise on Examination", label: "Portón segundo: el examen de la creación (Sháar HaBejiná)", labelFa: "دروازهٔ دوم: تأمل در آفرینش", labelEn: "Second Gate: Examining the Creation", he: "שַׁעַר שֵׁנִי — שַׁעַר הַבְּחִינָה", units: 6 },
    ],
  },
  {
    id: "porton3", label: "Portón tercero: el servicio a Dios (Sháar Avodat HaElohim)", labelFa: "دروازهٔ سوم: بندگی خداوند", labelEn: "Third Gate: The Service of God", he: "שַׁעַר שְׁלִישִׁי — שַׁעַר עֲבוֹדַת הָאֱלֹהִים",
    sections: [
      { refTitle: "Third Treatise on Service of God, Introduction", label: "Introducción", labelFa: "درآمد", labelEn: "Introduction", he: "הַקְדָּמָה" },
      { refTitle: "Third Treatise on Service of God", label: "Portón tercero: el servicio a Dios (Sháar Avodat HaElohim)", labelFa: "دروازهٔ سوم: بندگی خداوند", labelEn: "Third Gate: The Service of God", he: "שַׁעַר שְׁלִישִׁי — שַׁעַר עֲבוֹדַת הָאֱלֹהִים", units: 10 },
    ],
  },
  {
    id: "porton4", label: "Portón cuarto: la confianza en Dios (Sháar HaBitajón)", labelFa: "دروازهٔ چهارم: توکل", labelEn: "Fourth Gate: Trust in God", he: "שַׁעַר רְבִיעִי — שַׁעַר הַבִּטָּחוֹן",
    sections: [
      { refTitle: "Fourth Treatise on Trust, Introduction", label: "Introducción", labelFa: "درآمد", labelEn: "Introduction", he: "הַקְדָּמָה" },
      { refTitle: "Fourth Treatise on Trust", label: "Portón cuarto: la confianza en Dios (Sháar HaBitajón)", labelFa: "دروازهٔ چهارم: توکل", labelEn: "Fourth Gate: Trust in God", he: "שַׁעַר רְבִיעִי — שַׁעַר הַבִּטָּחוֹן", units: 7 },
    ],
  },
  {
    id: "porton5", label: "Portón quinto: la integridad de la acción (Sháar Yijud HaMaasé)", labelFa: "دروازهٔ پنجم: یکپارچگی عمل", labelEn: "Fifth Gate: Wholeheartedness in Action", he: "שַׁעַר חֲמִישִׁי — שַׁעַר יִחוּד הַמַּעֲשֶׂה",
    sections: [
      { refTitle: "Fifth Treatise on Devotion, Introduction", label: "Introducción", labelFa: "درآمد", labelEn: "Introduction", he: "הַקְדָּמָה" },
      { refTitle: "Fifth Treatise on Devotion", label: "Portón quinto: la integridad de la acción (Sháar Yijud HaMaasé)", labelFa: "دروازهٔ پنجم: یکپارچگی عمل", labelEn: "Fifth Gate: Wholeheartedness in Action", he: "שַׁעַר חֲמִישִׁי — שַׁעַר יִחוּד הַמַּעֲשֶׂה", units: 6 },
    ],
  },
  {
    id: "porton6", label: "Portón sexto: la humildad (Sháar HaKeniá)", labelFa: "دروازهٔ ششم: فروتنی", labelEn: "Sixth Gate: Humility", he: "שַׁעַר שִׁשִּׁי — שַׁעַר הַכְּנִיעָה",
    sections: [
      { refTitle: "Sixth Treatise on Submission, Introduction", label: "Introducción", labelFa: "درآمد", labelEn: "Introduction", he: "הַקְדָּמָה" },
      { refTitle: "Sixth Treatise on Submission", label: "Portón sexto: la humildad (Sháar HaKeniá)", labelFa: "دروازهٔ ششم: فروتنی", labelEn: "Sixth Gate: Humility", he: "שַׁעַר שִׁשִּׁי — שַׁעַר הַכְּנִיעָה", units: 10 },
    ],
  },
  {
    id: "porton7", label: "Portón séptimo: el retorno (Sháar HaTeshuvá)", labelFa: "دروازهٔ هفتم: بازگشت (توبه)", labelEn: "Seventh Gate: Return", he: "שַׁעַר שְׁבִיעִי — שַׁעַר הַתְּשׁוּבָה",
    sections: [
      { refTitle: "Seventh Treatise on Repentance, Introduction", label: "Introducción", labelFa: "درآمد", labelEn: "Introduction", he: "הַקְדָּמָה" },
      { refTitle: "Seventh Treatise on Repentance", label: "Portón séptimo: el retorno (Sháar HaTeshuvá)", labelFa: "دروازهٔ هفتم: بازگشت (توبه)", labelEn: "Seventh Gate: Return", he: "שַׁעַר שְׁבִיעִי — שַׁעַר הַתְּשׁוּבָה", units: 10 },
    ],
  },
  {
    id: "porton8", label: "Portón octavo: el ajuste de cuentas del alma (Sháar Jeshbón HaNéfesh)", labelFa: "دروازهٔ هشتم: حسابرسی نفس", labelEn: "Eighth Gate: The Reckoning of the Soul", he: "שַׁעַר שְׁמִינִי — שַׁעַר חֶשְׁבּוֹן הַנֶּפֶשׁ",
    sections: [
      { refTitle: "Eighth Treatise on Examining the Soul, Introduction", label: "Introducción", labelFa: "درآمد", labelEn: "Introduction", he: "הַקְדָּמָה" },
      { refTitle: "Eighth Treatise on Examining the Soul", label: "Portón octavo: el ajuste de cuentas del alma (Sháar Jeshbón HaNéfesh)", labelFa: "دروازهٔ هشتم: حسابرسی نفس", labelEn: "Eighth Gate: The Reckoning of the Soul", he: "שַׁעַר שְׁמִינִי — שַׁעַר חֶשְׁבּוֹן הַנֶּפֶשׁ", units: 6 },
    ],
  },
  {
    id: "porton9", label: "Portón noveno: el desapego (Sháar HaPrishut)", labelFa: "دروازهٔ نهم: پارسایی", labelEn: "Ninth Gate: Abstinence", he: "שַׁעַר תְּשִׁיעִי — שַׁעַר הַפְּרִישׁוּת",
    sections: [
      { refTitle: "Ninth Treatise on Abstinence, Introduction", label: "Introducción", labelFa: "درآمد", labelEn: "Introduction", he: "הַקְדָּמָה" },
      { refTitle: "Ninth Treatise on Abstinence", label: "Portón noveno: el desapego (Sháar HaPrishut)", labelFa: "دروازهٔ نهم: پارسایی", labelEn: "Ninth Gate: Abstinence", he: "שַׁעַר תְּשִׁיעִי — שַׁעַר הַפְּרִישׁוּת", units: 7 },
    ],
  },
  {
    id: "porton10", label: "Portón décimo: el amor a Dios (Sháar Ahavat Hashem)", labelFa: "دروازهٔ دهم: عشق به خداوند", labelEn: "Tenth Gate: The Love of God", he: "שַׁעַר עֲשִׂירִי — שַׁעַר אַהֲבַת ה׳",
    sections: [
      { refTitle: "Tenth Treatise on Devotion to God, Introduction", label: "Introducción", labelFa: "درآمد", labelEn: "Introduction", he: "הַקְדָּמָה" },
      { refTitle: "Tenth Treatise on Devotion to God", label: "Portón décimo: el amor a Dios (Sháar Ahavat Hashem)", labelFa: "دروازهٔ دهم: عشق به خداوند", labelEn: "Tenth Gate: The Love of God", he: "שַׁעַר עֲשִׂירִי — שַׁעַר אַהֲבַת ה׳", units: 7 },
    ],
  },
  {
    id: "apendice", label: "Apéndices", labelFa: "پیوست‌ها", labelEn: "Addenda", he: "הוֹסָפוֹת",
    sections: [
      { refTitle: "Addenda, Ten Sections (Poem)", label: "Las diez estrofas (poema)", labelFa: "ده بند (چکامه)", labelEn: "The Ten Stanzas (Poem)", he: "עֲשֶׂרֶת הַבָּתִּים (פִּיּוּט)" },
      { refTitle: "Addenda, Admonition", label: "Amonestación", labelFa: "اندرز", labelEn: "Admonition", he: "תּוֹכֵחָה" },
      { refTitle: "Addenda, Prayer", label: "Plegaria", labelFa: "نیایش", labelEn: "Prayer", he: "בַּקָּשָׁה" },
    ],
  },
];

// ── Las creencias y las opiniones (HaEmunot veHaDeot) ──
export const EMUNOT_GROUPS: ParshaWorkGroup[] = [
  {
    id: "apertura", label: "Apertura", labelFa: "درآمد", labelEn: "Opening", he: "פְּתִיחָה",
    sections: [
      { refTitle: "Introduction", label: "Introducción", labelFa: "درآمد", labelEn: "Introduction", he: "הַקְדָּמָה", units: 8 },
    ],
  },
  {
    id: "tratado1", label: "Tratado primero: la creación del mundo (Jidush)", labelFa: "گفتار یکم: آفرینش جهان", labelEn: "Treatise I: The Creation of the World", he: "מַאֲמָר רִאשׁוֹן — חִדּוּשׁ",
    sections: [
      { refTitle: "[Treatise I] The Creation of the World, Introduction", label: "Introducción", labelFa: "درآمد", labelEn: "Introduction", he: "הַקְדָּמָה" },
      { refTitle: "[Treatise I] The Creation of the World", label: "Tratado primero: la creación del mundo (Jidush)", labelFa: "گفتار یکم: آفرینش جهان", labelEn: "Treatise I: The Creation of the World", he: "מַאֲמָר רִאשׁוֹן — חִדּוּשׁ", units: 5, star: true },
    ],
  },
  {
    id: "tratado2", label: "Tratado segundo: la unidad del Creador (Ajdut)", labelFa: "گفتار دوم: یگانگی آفریدگار", labelEn: "Treatise II: The Unity of the Creator", he: "מַאֲמָר שֵׁנִי — אַחְדוּת",
    sections: [
      { refTitle: "[Treatise II] The Unity of the Creator, Introduction", label: "Introducción", labelFa: "درآمد", labelEn: "Introduction", he: "הַקְדָּמָה" },
      { refTitle: "[Treatise II] The Unity of the Creator", label: "Tratado segundo: la unidad del Creador (Ajdut)", labelFa: "گفتار دوم: یگانگی آفریدگار", labelEn: "Treatise II: The Unity of the Creator", he: "מַאֲמָר שֵׁנִי — אַחְדוּת", units: 13 },
    ],
  },
  {
    id: "tratado3", label: "Tratado tercero: el mandato y la advertencia (Tzivui veAzhará)", labelFa: "گفتار سوم: فرمان و هشدار", labelEn: "Treatise III: Command and Prohibition", he: "מַאֲמָר שְׁלִישִׁי — צִוּוּי וְאַזְהָרָה",
    sections: [
      { refTitle: "[Treatise III] Revelation and the Commandments, Introduction", label: "Introducción", labelFa: "درآمد", labelEn: "Introduction", he: "הַקְדָּמָה" },
      { refTitle: "[Treatise III] Revelation and the Commandments", label: "Tratado tercero: el mandato y la advertencia (Tzivui veAzhará)", labelFa: "گفتار سوم: فرمان و هشدار", labelEn: "Treatise III: Command and Prohibition", he: "מַאֲמָר שְׁלִישִׁי — צִוּוּי וְאַזְהָרָה", units: 10 },
    ],
  },
  {
    id: "tratado4", label: "Tratado cuarto: obediencia y rebeldía (Avodá uMeri)", labelFa: "گفتار چهارم: بندگی و سرکشی", labelEn: "Treatise IV: Obedience and Rebellion", he: "מַאֲמָר רְבִיעִי — עֲבוֹדָה וּמְרִי",
    sections: [
      { refTitle: "[Treatise IV] Free Will; Obedience and Disobedience, Introduction", label: "Introducción", labelFa: "درآمد", labelEn: "Introduction", he: "הַקְדָּמָה" },
      { refTitle: "[Treatise IV] Free Will; Obedience and Disobedience", label: "Tratado cuarto: obediencia y rebeldía (Avodá uMeri)", labelFa: "گفتار چهارم: بندگی و سرکشی", labelEn: "Treatise IV: Obedience and Rebellion", he: "מַאֲמָר רְבִיעִי — עֲבוֹדָה וּמְרִי", units: 6 },
    ],
  },
  {
    id: "tratado5", label: "Tratado quinto: méritos y deudas (Zejuyot veJovot)", labelFa: "گفتار پنجم: ثواب و گناه", labelEn: "Treatise V: Merits and Debts", he: "מַאֲמָר חֲמִישִׁי — זְכֻיּוֹת וְחוֹבוֹת",
    sections: [
      { refTitle: "[Treatise V] Merit and Demerit", label: "Tratado quinto: méritos y deudas (Zejuyot veJovot)", labelFa: "گفتار پنجم: ثواب و گناه", labelEn: "Treatise V: Merits and Debts", he: "מַאֲמָר חֲמִישִׁי — זְכֻיּוֹת וְחוֹבוֹת", units: 8 },
    ],
  },
  {
    id: "tratado6", label: "Tratado sexto: la esencia del alma (Mahut HaNéfesh)", labelFa: "گفتار ششم: چیستی نفس", labelEn: "Treatise VI: The Essence of the Soul", he: "מַאֲמָר שִׁשִּׁי — מַהוּת הַנֶּפֶשׁ",
    sections: [
      { refTitle: "[Treatise VI] The Soul and Death", label: "Tratado sexto: la esencia del alma (Mahut HaNéfesh)", labelFa: "گفتار ششم: چیستی نفس", labelEn: "Treatise VI: The Essence of the Soul", he: "מַאֲמָר שִׁשִּׁי — מַהוּת הַנֶּפֶשׁ", units: 8 },
    ],
  },
  {
    id: "tratado7", label: "Tratado séptimo: la resurrección de los muertos (Tejiyat HaMetim)", labelFa: "گفتار هفتم: رستاخیز مردگان", labelEn: "Treatise VII: The Resurrection of the Dead", he: "מַאֲמָר שְׁבִיעִי — תְּחִיַּת הַמֵּתִים",
    sections: [
      { refTitle: "[Treatise VII] The Resurrection of the Dead", label: "Tratado séptimo: la resurrección de los muertos (Tejiyat HaMetim)", labelFa: "گفتار هفتم: رستاخیز مردگان", labelEn: "Treatise VII: The Resurrection of the Dead", he: "מַאֲמָר שְׁבִיעִי — תְּחִיַּת הַמֵּתִים", units: 8 },
    ],
  },
  {
    id: "tratado8", label: "Tratado octavo: la redención final (Gueulá Ajaroná)", labelFa: "گفتار هشتم: رهایی نهایی", labelEn: "Treatise VIII: The Final Redemption", he: "מַאֲמָר שְׁמִינִי — גְּאֻלָּה אַחֲרוֹנָה",
    sections: [
      { refTitle: "[Treatise VIII] Messianic Redemption", label: "Tratado octavo: la redención final (Gueulá Ajaroná)", labelFa: "گفتار هشتم: رهایی نهایی", labelEn: "Treatise VIII: The Final Redemption", he: "מַאֲמָר שְׁמִינִי — גְּאֻלָּה אַחֲרוֹנָה", units: 9 },
    ],
  },
  {
    id: "tratado9", label: "Tratado noveno: recompensa y castigo (Guemul veOnesh)", labelFa: "گفتار نهم: پاداش و کیفر", labelEn: "Treatise IX: Reward and Punishment", he: "מַאֲמָר תְּשִׁיעִי — גְּמוּל וָעֹנֶשׁ",
    sections: [
      { refTitle: "[Treatise IX] The World to Come", label: "Tratado noveno: recompensa y castigo (Guemul veOnesh)", labelFa: "گفتار نهم: پاداش و کیفر", labelEn: "Treatise IX: Reward and Punishment", he: "מַאֲמָר תְּשִׁיעִי — גְּמוּל וָעֹנֶשׁ", units: 11 },
    ],
  },
  {
    id: "tratado10", label: "Tratado décimo: la conducta del ser humano (Hanhagat HaAdam)", labelFa: "گفتار دهم: سلوک آدمی", labelEn: "Treatise X: The Conduct of Man", he: "מַאֲמָר עֲשִׂירִי — הַנְהָגַת הָאָדָם",
    sections: [
      { refTitle: "[Treatise X] Moral Conduct; Thought and Belief, Introduction", label: "Introducción", labelFa: "درآمد", labelEn: "Introduction", he: "הַקְדָּמָה" },
      { refTitle: "[Treatise X] Moral Conduct; Thought and Belief", label: "Tratado décimo: la conducta del ser humano (Hanhagat HaAdam)", labelFa: "گفتار دهم: سلوک آدمی", labelEn: "Treatise X: The Conduct of Man", he: "מַאֲמָר עֲשִׂירִי — הַנְהָגַת הָאָדָם", units: 19 },
    ],
  },
];

// ── El libro de los principios (Séfer HaIkarim) ──
export const IKKARIM_GROUPS: ParshaWorkGroup[] = [
  {
    id: "preliminares", label: "Preliminares", labelFa: "پیش‌درآمدها", labelEn: "Front matter", he: "פְּתִיחוֹת",
    sections: [
      { refTitle: "Title", label: "Portada del libro", labelFa: "صفحهٔ عنوان", labelEn: "Title Page", he: "שַׁעַר הַסֵּפֶר" },
      { refTitle: "Forward", label: "Prefacio", labelFa: "پیش‌گفتار", labelEn: "Foreword", he: "פְּתִיחָה" },
      { refTitle: "Introduction", label: "Introducción", labelFa: "درآمد", labelEn: "Introduction", he: "הַקְדָּמָה" },
    ],
  },
  {
    id: "maamar1", label: "Tratado primero: los principios de la ley divina", labelFa: "گفتار یکم: اصول شریعت الهی", labelEn: "Treatise One: The Principles of Divine Law", he: "מַאֲמָר רִאשׁוֹן",
    sections: [
      { refTitle: "Maamar 1, Introduction", label: "Introducción", labelFa: "درآمد", labelEn: "Introduction", he: "הַקְדָּמָה" },
      { refTitle: "Maamar 1", label: "Tratado primero: los principios de la ley divina", labelFa: "گفتار یکم: اصول شریعت الهی", labelEn: "Treatise One: The Principles of Divine Law", he: "מַאֲמָר רִאשׁוֹן", units: 26, star: true, glosa: true },
    ],
  },
  {
    id: "maamar2", label: "Tratado segundo: la existencia de Dios", labelFa: "گفتار دوم: هستی خداوند", labelEn: "Treatise Two: The Existence of God", he: "מַאֲמָר שֵׁנִי",
    sections: [
      { refTitle: "Maamar 2, Introduction", label: "Introducción", labelFa: "درآمد", labelEn: "Introduction", he: "הַקְדָּמָה" },
      { refTitle: "Maamar 2, Observation", label: "Advertencia", labelFa: "یادآوری", labelEn: "Observation", he: "הֶעָרָה" },
      { refTitle: "Maamar 2", label: "Tratado segundo: la existencia de Dios", labelFa: "گفتار دوم: هستی خداوند", labelEn: "Treatise Two: The Existence of God", he: "מַאֲמָר שֵׁנִי", units: 31, glosa: true },
    ],
  },
  {
    id: "maamar3", label: "Tratado tercero: la Torá viene del Cielo", labelFa: "گفتار سوم: تورا از آسمان", labelEn: "Treatise Three: Torah from Heaven", he: "מַאֲמָר שְׁלִישִׁי",
    sections: [
      { refTitle: "Maamar 3, Introduction", label: "Introducción", labelFa: "درآمد", labelEn: "Introduction", he: "הַקְדָּמָה" },
      { refTitle: "Maamar 3", label: "Tratado tercero: la Torá viene del Cielo", labelFa: "گفتار سوم: تورا از آسمان", labelEn: "Treatise Three: Torah from Heaven", he: "מַאֲמָר שְׁלִישִׁי", units: 37, glosa: true },
    ],
  },
  {
    id: "maamar4", label: "Tratado cuarto: recompensa y castigo", labelFa: "گفتار چهارم: پاداش و کیفر", labelEn: "Treatise Four: Reward and Punishment", he: "מַאֲמָר רְבִיעִי",
    sections: [
      { refTitle: "Maamar 4, Introduction", label: "Introducción", labelFa: "درآمد", labelEn: "Introduction", he: "הַקְדָּמָה" },
      { refTitle: "Maamar 4", label: "Tratado cuarto: recompensa y castigo", labelFa: "گفتار چهارم: پاداش و کیفر", labelEn: "Treatise Four: Reward and Punishment", he: "מַאֲמָר רְבִיעִי", units: 51, glosa: true },
    ],
  },
];

// ── El camino del Eterno (Dérej Hashem) ──
export const DEREKH_HASHEM_GROUPS: ParshaWorkGroup[] = [
  {
    id: "apertura", label: "Apertura", labelFa: "درآمد", labelEn: "Opening", he: "פְּתִיחָה",
    sections: [
      { refTitle: "Introduction", label: "Introducción", labelFa: "درآمد", labelEn: "Introduction", he: "הַקְדָּמָה" },
    ],
  },
  {
    id: "parte1", label: "Parte primera", labelFa: "بخش یکم", labelEn: "Part One", he: "חֵלֶק רִאשׁוֹן",
    sections: [
      { refTitle: "Part One, On the Creator", label: "Sobre el Creador, bendito sea", labelFa: "دربارهٔ آفریدگار", labelEn: "On the Creator", he: "בַּבּוֹרֵא יִתְבָּרַךְ", star: true },
      { refTitle: "Part One, On the Purpose of Creation", label: "Sobre el propósito de la creación", labelFa: "دربارهٔ هدف آفرینش", labelEn: "On the Purpose of Creation", he: "בְּתַכְלִית הַבְּרִיאָה" },
      { refTitle: "Part One, On Mankind", label: "Sobre la especie humana", labelFa: "دربارهٔ نوع انسان", labelEn: "On the Human Species", he: "בַּמִּין הָאֱנוֹשִׁי" },
      { refTitle: "Part One, On Human Responsibility", label: "Sobre la condición del ser humano en este mundo", labelFa: "دربارهٔ حال انسان در این جهان", labelEn: "On Man's Condition in This World", he: "בְּמַצַּב הָאָדָם בָּעוֹלָם הַזֶּה" },
      { refTitle: "Part One, On the Spiritual Realm", label: "Sobre las partes de la creación y sus estados", labelFa: "دربارهٔ بخش‌های آفرینش و حالات آن‌ها", labelEn: "On the Parts of Creation and Their States", he: "בְּחֶלְקֵי הַבְּרִיאָה וּמַצָּבֵיהֶם" },
    ],
  },
  {
    id: "parte2", label: "Parte segunda", labelFa: "بخش دوم", labelEn: "Part Two", he: "חֵלֶק שֵׁנִי",
    sections: [
      { refTitle: "Part Two, On Divine Providence in General", label: "Sobre la providencia divina en general", labelFa: "دربارهٔ تدبیر الهی به‌طور کلی", labelEn: "On Divine Providence in General", he: "בְּעִנְיַן הַשְׁגָּחָתוֹ יִתְבָּרַךְ בִּכְלָל" },
      { refTitle: "Part Two, On Mankind in This World", label: "Sobre lo que acontece al género humano en este mundo", labelFa: "دربارهٔ رویدادهای نوع انسان در این جهان", labelEn: "On What Befalls Mankind in This World", he: "בְּמִקְרֵי הַמִּין הָאֱנוֹשִׁי בָּעוֹלָם הַזֶּה" },
      { refTitle: "Part Two, On Personal Providence", label: "Sobre la providencia individual", labelFa: "دربارهٔ تدبیر فردی", labelEn: "On Individual Providence", he: "בַּהַשְׁגָּחָה הָאִישִׁית" },
      { refTitle: "Part Two, On Israel and the Nations", label: "Sobre Israel y las naciones del mundo", labelFa: "دربارهٔ اسرائیل و ملت‌های جهان", labelEn: "On Israel and the Nations of the World", he: "בְּעִנְיַן יִשְׂרָאֵל וְאֻמּוֹת הָעוֹלָם" },
      { refTitle: "Part Two, On How Providence Works", label: "Sobre el modo en que obra la providencia", labelFa: "دربارهٔ شیوهٔ تدبیر", labelEn: "On the Manner of Providence", he: "בְּאֹפֶן הַהַשְׁגָּחָה" },
      { refTitle: "Part Two, On the System of Providence", label: "Sobre el orden de la providencia", labelFa: "دربارهٔ نظم تدبیر", labelEn: "On the Order of Providence", he: "בְּסֵדֶר הַהַשְׁגָּחָה" },
      { refTitle: "Part Two, On the Influence of the Stars", label: "Sobre la influencia de los astros", labelFa: "دربارهٔ تأثیر ستارگان", labelEn: "On the Influence of the Stars", he: "בְּעִנְיַן הַשְׁפָּעַת הַכּוֹכָבִים" },
      { refTitle: "Part Two, On Specific Modes of Providence", label: "Sobre distinciones particulares en la providencia", labelFa: "دربارهٔ تمایزهای جزئی در تدبیر", labelEn: "On Particular Distinctions in Providence", he: "בְּהַבְחָנוֹת פְּרָטִיּוֹת בַּהַשְׁגָּחָה" },
    ],
  },
  {
    id: "parte3", label: "Parte tercera", labelFa: "بخش سوم", labelEn: "Part Three", he: "חֵלֶק שְׁלִישִׁי",
    sections: [
      { refTitle: "Part Three, On the Soul and Its Activities", label: "Sobre el alma y sus operaciones", labelFa: "دربارهٔ نفس و کارهای آن", labelEn: "On the Soul and Its Activities", he: "בְּעִנְיַן הַנֶּפֶשׁ וּפְעוּלּוֹתֶיהָ" },
      { refTitle: "Part Three, On Divine Names and Witchcraft", label: "Sobre la acción por medio de los Nombres divinos y la hechicería", labelFa: "دربارهٔ کار با نام‌های الهی و جادو", labelEn: "On Acting Through the Divine Names and Witchcraft", he: "בְּעִנְיַן הַפְּעוּלָּה בַּשֵּׁמוֹת וּבַכִּישּׁוּף" },
      { refTitle: "Part Three, On Divine Inspiration and Prophecy", label: "Sobre el espíritu santo y la profecía", labelFa: "دربارهٔ روح‌القدس و نبوت", labelEn: "On the Holy Spirit and Prophecy", he: "בְּעִנְיַן רוּחַ הַקֹּדֶשׁ וְהַנְּבוּאָה" },
      { refTitle: "Part Three, On the Prophetic Experience", label: "Sobre los estados de la profecía", labelFa: "دربارهٔ حالات نبوت", labelEn: "On the States of Prophecy", he: "בְּמִקְרֵי הַנְּבוּאָה" },
      { refTitle: "Part Three, On Moshe's Unique Status", label: "Sobre la diferencia entre la profecía de todos los profetas y la de Moshé", labelFa: "دربارهٔ تفاوت نبوت موسی با دیگر پیامبران", labelEn: "On the Difference Between Moses' Prophecy and That of All Other Prophets", he: "בַּהֶבְדֵּל שֶׁבֵּין נְבוּאַת כָּל הַנְּבִיאִים לְמֹשֶׁה" },
    ],
  },
  {
    id: "parte4", label: "Parte cuarta", labelFa: "بخش چهارم", labelEn: "Part Four", he: "חֵלֶק רְבִיעִי",
    sections: [
      { refTitle: "Part Four, On Divine Service", label: "Sobre las partes del servicio divino", labelFa: "دربارهٔ بخش‌های بندگی", labelEn: "On the Parts of Divine Service", he: "בְּחֶלְקֵי הָעֲבוֹדָה" },
      { refTitle: "Part Four, On Torah Study", label: "Sobre el estudio de la Torá", labelFa: "دربارهٔ آموختن تورا", labelEn: "On Torah Study", he: "בְּתַלְמוּד תּוֹרָה" },
      { refTitle: "Part Four, On Love and Fear of God", label: "Sobre el amor y el temor", labelFa: "دربارهٔ عشق و بیم", labelEn: "On Love and Fear", he: "בְּאַהֲבָה וְיִרְאָה" },
      { refTitle: "Part Four, On the Sh'ma and Its Blessings", label: "Sobre el Shemá y sus bendiciones", labelFa: "دربارهٔ شمَع و برکت‌های آن", labelEn: "On the Shema and Its Blessings", he: "בִּקְרִיאַת שְׁמַע וּבִרְכוֹתֶיהָ" },
      { refTitle: "Part Four, On Prayer", label: "Sobre la plegaria", labelFa: "دربارهٔ نیایش", labelEn: "On Prayer", he: "בִּתְפִלָּה" },
      { refTitle: "Part Four, On the Daily Order of Prayer", label: "Sobre el orden de las plegarias", labelFa: "دربارهٔ ترتیب نیایش‌ها", labelEn: "On the Order of the Prayers", he: "בְּסִדְרֵי הַתְּפִלּוֹת" },
      { refTitle: "Part Four, On Divine Service and the Calendar", label: "Sobre el servicio ligado al tiempo", labelFa: "دربارهٔ بندگی وابسته به زمان", labelEn: "On Time-Bound Divine Service", he: "בָּעֲבוֹדָה הַזְּמַנִּיִּית" },
      { refTitle: "Part Four, On Seasonal Commandments", label: "Sobre los preceptos de las fechas sagradas", labelFa: "دربارهٔ فرمان‌های موسمی", labelEn: "On the Commandments of the Sacred Seasons", he: "בְּמִצְוֹת הַזְּמַנִּים" },
      { refTitle: "Part Four, On Blessings", label: "Sobre las bendiciones", labelFa: "دربارهٔ برکت‌ها", labelEn: "On Blessings", he: "בִּבְרָכוֹת" },
    ],
  },
];

// ── Los senderos eternos (Netivot Olam) ──
export const NETIVOT_OLAM_GROUPS: ParshaWorkGroup[] = [
  {
    id: "apertura", label: "Apertura", labelFa: "درآمد", labelEn: "Opening", he: "פְּתִיחָה",
    sections: [
      { refTitle: "Introduction to Netivot Olam", label: "Introducción", labelFa: "درآمد", labelEn: "Introduction", he: "הַקְדָּמָה" },
    ],
  },
  {
    id: "senderos-1", label: "Senderos 1–11", labelFa: "راه‌های ۱ تا ۱۱", labelEn: "Paths 1–11", he: "נְתִיבוֹת א׳–י״א",
    sections: [
      { refTitle: "Netiv Hatorah", label: "El sendero de la Torá", labelFa: "راه تورا", labelEn: "The Path of Torah", he: "נְתִיב הַתּוֹרָה", units: 18, star: true },
      { refTitle: "Netiv Ha'Avodah", label: "El sendero del servicio divino", labelFa: "راه بندگی", labelEn: "The Path of Divine Service", he: "נְתִיב הָעֲבוֹדָה", units: 19 },
      { refTitle: "Netiv Gmilut Chasadim", label: "El sendero de los actos de bondad", labelFa: "راه نیکوکاری", labelEn: "The Path of Acts of Kindness", he: "נְתִיב גְּמִילוּת חֲסָדִים", units: 5 },
      { refTitle: "Netiv Hatzdaka", label: "El sendero de la caridad", labelFa: "راه صدقه", labelEn: "The Path of Charity", he: "נְתִיב הַצְּדָקָה", units: 6 },
      { refTitle: "Netiv Hadin", label: "El sendero de la justicia", labelFa: "راه داوری", labelEn: "The Path of Judgment", he: "נְתִיב הַדִּין", units: 2 },
      { refTitle: "Netiv Haemet", label: "El sendero de la verdad", labelFa: "راه راستی", labelEn: "The Path of Truth", he: "נְתִיב הָאֱמֶת", units: 3 },
      { refTitle: "Netiv Haemuna", label: "El sendero de la fe", labelFa: "راه ایمان", labelEn: "The Path of Faith", he: "נְתִיב הָאֱמוּנָה", units: 2 },
      { refTitle: "Netiv Hashalom", label: "El sendero de la paz", labelFa: "راه آشتی", labelEn: "The Path of Peace", he: "נְתִיב הַשָּׁלוֹם", units: 3 },
      { refTitle: "Netiv Ahavat Reia", label: "El sendero del amor al prójimo", labelFa: "راه دوست‌داری همنوع", labelEn: "The Path of Love of One's Fellow", he: "נְתִיב אַהֲבַת רֵעַ", units: 3 },
      { refTitle: "Netiv Haanava", label: "El sendero de la humildad", labelFa: "راه فروتنی", labelEn: "The Path of Humility", he: "נְתִיב הָעֲנָוָה", units: 8 },
      { refTitle: "Netiv Yirat Hashem", label: "El sendero del temor de Dios", labelFa: "راه بیم از خداوند", labelEn: "The Path of the Fear of God", he: "נְתִיב יִרְאַת הַשֵּׁם", units: 6 },
    ],
  },
  {
    id: "senderos-2", label: "Senderos 12–22", labelFa: "راه‌های ۱۲ تا ۲۲", labelEn: "Paths 12–22", he: "נְתִיבוֹת י״ב–כ״ב",
    sections: [
      { refTitle: "Netiv Halashon", label: "El sendero de la lengua", labelFa: "راه زبان", labelEn: "The Path of the Tongue", he: "נְתִיב הַלָּשׁוֹן", units: 11 },
      { refTitle: "Netiv Ahavat Hashem", label: "El sendero del amor a Dios", labelFa: "راه عشق به خداوند", labelEn: "The Path of the Love of God", he: "נְתִיב אַהֲבַת הַשֵּׁם", units: 2 },
      { refTitle: "Netiv Hashtika", label: "El sendero del silencio", labelFa: "راه خاموشی", labelEn: "The Path of Silence", he: "נְתִיב הַשְּׁתִיקָה", units: 1 },
      { refTitle: "Netiv Haprishut", label: "El sendero del desapego", labelFa: "راه پارسایی", labelEn: "The Path of Abstinence", he: "נְתִיב הַפְּרִישׁוּת", units: 3 },
      { refTitle: "Netiv Hatzniut", label: "El sendero del recato", labelFa: "راه پاکدامنی", labelEn: "The Path of Modesty", he: "נְתִיב הַצְּנִיעוּת", units: 4 },
      { refTitle: "Netiv Koach Hayeitzer", label: "El sendero de la fuerza del impulso", labelFa: "راه نیروی انگیزه", labelEn: "The Path of the Power of the Inclination", he: "נְתִיב כֹּחַ הַיֵּצֶר", units: 4 },
      { refTitle: "Netiv Hatzedek", label: "El sendero de la rectitud", labelFa: "راه داد", labelEn: "The Path of Righteousness", he: "נְתִיב הַצֶּדֶק", units: 3 },
      { refTitle: "Netiv Hatshuva", label: "El sendero del retorno", labelFa: "راه بازگشت", labelEn: "The Path of Return", he: "נְתִיב הַתְּשׁוּבָה", units: 8 },
      { refTitle: "Netiv Hayisurin", label: "El sendero de los sufrimientos", labelFa: "راه رنج‌ها", labelEn: "The Path of Suffering", he: "נְתִיב הַיִּסּוּרִין", units: 3 },
      { refTitle: "Netiv Hazrizut", label: "El sendero de la diligencia", labelFa: "راه چالاکی", labelEn: "The Path of Alacrity", he: "נְתִיב הַזְּרִיזוּת", units: 2 },
      { refTitle: "Netiv Hatochacha", label: "El sendero de la reprensión", labelFa: "راه اندرز", labelEn: "The Path of Rebuke", he: "נְתִיב הַתּוֹכֵחָה", units: 3 },
    ],
  },
  {
    id: "senderos-3", label: "Senderos 23–33", labelFa: "راه‌های ۲۳ تا ۳۳", labelEn: "Paths 23–33", he: "נְתִיבוֹת כ״ג–ל״ג",
    sections: [
      { refTitle: "Netiv Habusha", label: "El sendero del pudor", labelFa: "راه شرم", labelEn: "The Path of Shame", he: "נְתִיב הַבּוּשָׁה", units: 2 },
      { refTitle: "Netiv Hatmimut", label: "El sendero de la integridad", labelFa: "راه یکپارچگی", labelEn: "The Path of Wholeness", he: "נְתִיב הַתְּמִימוּת", units: 2 },
      { refTitle: "Netiv Lev Tov", label: "El sendero del buen corazón", labelFa: "راه دل نیک", labelEn: "The Path of a Good Heart", he: "נְתִיב לֵב טוֹב", units: 1 },
      { refTitle: "Netiv Ayin Tov", label: "El sendero del ojo generoso", labelFa: "راه چشم نیک", labelEn: "The Path of a Generous Eye", he: "נְתִיב עַיִן טוֹב", units: 1 },
      { refTitle: "Netiv Haleitzanut", label: "El sendero de la burla", labelFa: "راه ریشخند", labelEn: "The Path of Mockery", he: "נְתִיב הַלֵּיצָנוּת", units: 2 },
      { refTitle: "Netiv Haosher", label: "El sendero de la riqueza", labelFa: "راه ثروت", labelEn: "The Path of Wealth", he: "נְתִיב הָעֹשֶׁר", units: 2 },
      { refTitle: "Netiv Habitachon", label: "El sendero de la confianza", labelFa: "راه توکل", labelEn: "The Path of Trust", he: "נְתִיב הַבִּטָּחוֹן", units: 1 },
      { refTitle: "Netiv Hakaas", label: "El sendero de la ira", labelFa: "راه خشم", labelEn: "The Path of Anger", he: "נְתִיב הַכַּעַס", units: 2 },
      { refTitle: "Netiv Hanedivut", label: "El sendero de la generosidad", labelFa: "راه بخشندگی", labelEn: "The Path of Generosity", he: "נְתִיב הַנְּדִיבוּת", units: 1 },
      { refTitle: "Netiv Sheim Tov", label: "El sendero del buen nombre", labelFa: "راه نام نیک", labelEn: "The Path of a Good Name", he: "נְתִיב שֵׁם טוֹב", units: 1 },
      { refTitle: "Netiv Derech Eretz", label: "El sendero de la buena conducta (Dérej Éretz)", labelFa: "راه آیین زندگی", labelEn: "The Path of Proper Conduct", he: "נְתִיב דֶּרֶךְ אֶרֶץ", units: 1 },
    ],
  },
];

// ── El alma de la vida (Néfesh HaJaim) ──
export const NEFESH_HACHAYIM_GROUPS: ParshaWorkGroup[] = [
  {
    id: "apertura", label: "Apertura", labelFa: "درآمد", labelEn: "Opening", he: "פְּתִיחָה",
    sections: [
      { refTitle: "An Introduction by the Author's Son", label: "Introducción del hijo del autor", labelFa: "دیباچهٔ پسر مؤلف", labelEn: "Introduction by the Author's Son", he: "הַקְדָּמַת בֶּן הַמְחַבֵּר" },
    ],
  },
  {
    id: "portales", label: "Los portales", labelFa: "دروازه‌ها", labelEn: "The gates", he: "הַשְּׁעָרִים",
    sections: [
      { refTitle: "Gate I", label: "Portal primero", labelFa: "دروازهٔ یکم", labelEn: "Gate One", he: "שַׁעַר רִאשׁוֹן", units: 22, star: true },
      { refTitle: "Reb Itzele's Long Annotation", label: "La glosa extensa de Rab Itzele", labelFa: "حاشیهٔ بلند ربّی ایتسله", labelEn: "Reb Itzele's Long Annotation", he: "הַגָּהָה מַהֲרִי״ץ" },
      { refTitle: "Gate II", label: "Portal segundo", labelFa: "دروازهٔ دوم", labelEn: "Gate Two", he: "שַׁעַר שֵׁנִי", units: 18 },
      { refTitle: "Gate III", label: "Portal tercero", labelFa: "دروازهٔ سوم", labelEn: "Gate Three", he: "שַׁעַר שְׁלִישִׁי", units: 14 },
      { refTitle: "Chapters", label: "Capítulos (sección intermedia, sin portal)", labelFa: "فصل‌ها", labelEn: "Chapters", he: "פְּרָקִים", units: 8 },
      { refTitle: "Gate IV", label: "Portal cuarto", labelFa: "دروازهٔ چهارم", labelEn: "Gate Four", he: "שַׁעַר רְבִיעִי", units: 34 },
    ],
  },
];

// ─── Registro de obras navegadas con ParshaWorkNavigator ───────────────────
// Lo que antes era una cadena de `if` por id dentro de BookBrowser (Ben Porat
// Yosef, Me'or Einayim) es ahora esta lista. Añadir una obra = declarar su
// estructura arriba y una línea aquí.
export const PARSHA_WORKS: ParshaWork[] = [
  { bookId: "Ben Porat Yosef", he: "בֶּן פּוֹרָת יוֹסֵף", groups: BEN_PORAT_GROUPS, defaultOpenGroup: "bereshit" },
  { bookId: "Me'or Einayim", he: "מְאוֹר עֵינַיִם", groups: MEOR_EINAYIM_GROUPS, defaultOpenGroup: "bereshit" },
  { bookId: "Guide for the Perplexed", he: "מוֹרֵה נְבוּכִים", groups: MOREH_GROUPS, defaultOpenGroup: "parte1" },
  { bookId: "Eight Chapters", he: "שְׁמוֹנָה פְּרָקִים", groups: SHEMONA_PERAKIM_GROUPS, defaultOpenGroup: "capitulos8" },
  { bookId: "HaEmunot veHaDeot", he: "הָאֱמוּנוֹת וְהַדֵּעוֹת", groups: EMUNOT_GROUPS, defaultOpenGroup: "tratado1" },
  { bookId: "Duties of the Heart", he: "חוֹבוֹת הַלְּבָבוֹת", groups: CHOVOT_GROUPS, defaultOpenGroup: "porton1" },
  { bookId: "Sefer HaIkkarim", he: "סֵפֶר הָעִקָּרִים", groups: IKKARIM_GROUPS, defaultOpenGroup: "maamar1" },
  { bookId: "Derekh Hashem", he: "דֶּרֶךְ ה׳", groups: DEREKH_HASHEM_GROUPS, defaultOpenGroup: "parte1" },
  { bookId: "Netivot Olam", he: "נְתִיבוֹת עוֹלָם", groups: NETIVOT_OLAM_GROUPS, defaultOpenGroup: "senderos-1" },
  { bookId: "Nefesh HaChayim", he: "נֶפֶשׁ הַחַיִּים", groups: NEFESH_HACHAYIM_GROUPS, defaultOpenGroup: "portales" },
];

/** La obra del registro a la que pertenece un id de libro, o null. Reconoce
 * tanto la obra entera ("Derekh Hashem") como un nodo suyo ya elegido
 * ("Derekh Hashem, Part One, On the Creator"). */
export function parshaWorkOf(bookId: string | undefined | null): ParshaWork | null {
  if (!bookId) return null;
  for (const w of PARSHA_WORKS) {
    if (bookId === w.bookId || bookId.startsWith(`${w.bookId}, `)) return w;
  }
  return null;
}

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
