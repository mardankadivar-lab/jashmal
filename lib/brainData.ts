// ─────────────────────────────────────────────────────────────────────────
// brainData.ts — "El cerebro vivo de Jashmal"
// Datos puros + layout determinista de una MENTE de conocimiento judío.
// El grafo MISMO forma el cerebro: nodos = sinapsis, aristas = fibras neuronales.
//
// Jerarquía (gravedad conceptual hacia la Torá, que es el corazón):
//   Nivel 0  Torá (núcleo central profundo)
//   Nivel 1  Dominios: Tanaj, Mishná, Talmud, Midrash, Cabalá, Jasidut,
//            Halajá, Filosofía, Ciencia
//   Nivel 2  Libros / tratados / obras primarias
//   Nivel 3  Temas / conceptos / personajes / sefirot / letras
//   Nivel 4  Contenido de Jashmal (misterios, estudios — con URL real)
//
// Anatomía: cada categoría vive en una REGIÓN cerebral (lóbulo). La unión de
// los lóbulos (en ambos hemisferios) forma la silueta del cerebro desde
// CUALQUIER ángulo. Anclajes anatómicos = la forma es una restricción fija.
// ─────────────────────────────────────────────────────────────────────────

export type BNode = {
  id: string;
  label: string;
  labelFa: string;
  cat: string;     // clave de BRAIN_CATS
  level: 0 | 1 | 2 | 3 | 4;
  url?: string;    // atajo real del sitio (solo donde existe)
  region?: string; // override de región (si difiere de la de su categoría)
};

// ─── Paleta de categorías (color = LUZ; permanente, nunca cambia al tocar) ──
export const BRAIN_CATS: Record<string, { c: string; label: string; labelFa: string }> = {
  torah:      { c: "#e8b923", label: "Torá",      labelFa: "تورات" },   // oro profundo
  tanakh:     { c: "#f0d878", label: "Tanaj",     labelFa: "تنخ" },     // oro claro
  mishnah:    { c: "#3f7bff", label: "Mishná",    labelFa: "میشنا" },   // azul eléctrico
  talmud:     { c: "#e0a93f", label: "Talmud",    labelFa: "تلمود" },   // ámbar cálido
  midrash:    { c: "#9b6cff", label: "Midrash",   labelFa: "میدراش" },  // violeta
  kabbalah:   { c: "#1fd8e0", label: "Cabalá",    labelFa: "کابالا" },  // cian eléctrico
  chasidut:   { c: "#9ad6a0", label: "Jasidut",   labelFa: "حسیدوت" },  // verde cálido
  halakhah:   { c: "#cfe0ff", label: "Halajá",    labelFa: "هلاخا" },   // blanco-azul
  philosophy: { c: "#7fd488", label: "Filosofía", labelFa: "فلسفه" },   // verde suave
  science:    { c: "#a8c4e8", label: "Ciencia",   labelFa: "علم" },     // plata-azul
  figure:     { c: "#e0795c", label: "Personajes", labelFa: "شخصیت‌ها" }, // personajes bíblicos (terracota)
  tema:       { c: "#c98bd6", label: "Temas",     labelFa: "موضوعات" },   // dominios temáticos (lavanda)
  jashmal:    { c: "#f4cf5a", label: "Jashmal",   labelFa: "خَשمَل" },  // contenido propio (oro)
};

// ─── Estudio: 42 estaciones (Mas'ei) · Nombre de 42 · Ana BeKoaj ──────────
// Verificado por el Sofer (editor-erudito). Cada arista marcada SÓLIDA (fuente
// clásica directa) o INTERPRETATIVA (lectura meditativa, NO texto del Arizal).
// Fuentes: Bamidbar 33; Rashi/Ramban/Or HaJaim 33:1; Zohar II 157a (vía Or
// HaJaim) = viajes para liberar chispas; Nombre de 42 = Kidushín 71a;
// Ana BeKoaj (7×6=42) atribución tradicional a R. Nejunia ben HaKana.
export const MASEI_NODES: BNode[] = [
  { id: "Masei",          label: "Mas'ei · 42 estaciones", labelFa: "مَسعِی · ۴۲ منزل",          cat: "tanakh",   level: 3 },
  { id: "Nombre de 42",   label: "Nombre de 42 (Mem-Bet)", labelFa: "نام ۴۲ حرفی (مم-بت)",        cat: "kabbalah", level: 3 },
  { id: "Ana BeKoaj",     label: "Ana BeKoaj",             labelFa: "آنا بِخوآח",                cat: "kabbalah", level: 3 },
  { id: "Birur",          label: "Birur (chispas)",        labelFa: "بیرور (جدا کردن جرقه‌ها)",   cat: "kabbalah", level: 3 },
  { id: "Tikún",          label: "Tikún",                  labelFa: "تیقون (اصلاح)",             cat: "kabbalah", level: 3 },
  { id: "Nitzotzot",      label: "Nitzotzot (chispas)",    labelFa: "نیتسوتسوت (جرقه‌ها)",         cat: "kabbalah", level: 3 },
  { id: "Gilgulim",       label: "Gilgulim",               labelFa: "گیلگولیم (تناسخ)",           cat: "kabbalah", level: 3 },
  { id: "Cuatro Mundos",  label: "Cuatro Mundos (ABYA)",   labelFa: "چهار عالم (آبیع)",           cat: "kabbalah", level: 3 },
  { id: "Raamses",        label: "Raamsés (esclavitud)",   labelFa: "رَعمسیس (بردگی)",            cat: "tanakh",   level: 3 },
  { id: "Mara",           label: "Mará (amargura)",        labelFa: "مارا (تلخی)",                cat: "tanakh",   level: 3 },
  { id: "Kivrot HaTaava", label: "Kivrot HaTaavá",         labelFa: "قبروت هَتَّاوا",              cat: "tanakh",   level: 3 },
  { id: "Arvot Moav",     label: "Arvot Moav (umbral)",    labelFa: "عَرووت موآو (آستانه)",        cat: "tanakh",   level: 3 },
];

export type MaseiEdge = { a: string; b: string; kind: "solid" | "interp" };
export const MASEI_EDGES: MaseiEdge[] = [
  // SÓLIDAS — fuente clásica directa
  { a: "Masei", b: "Bamidbar", kind: "solid" },
  { a: "Masei", b: "Raamses", kind: "solid" },
  { a: "Masei", b: "Arvot Moav", kind: "solid" },
  { a: "Masei", b: "Mara", kind: "solid" },
  { a: "Masei", b: "Kivrot HaTaava", kind: "solid" },
  { a: "Masei", b: "Birur", kind: "solid" },          // Zohar II 157a vía Or HaJaim 33:1
  { a: "Birur", b: "Nitzotzot", kind: "solid" },
  { a: "Birur", b: "Cabalá", kind: "solid" },
  { a: "Nitzotzot", b: "Cabalá", kind: "solid" },
  { a: "Tikún", b: "Cabalá", kind: "solid" },
  { a: "Gilgulim", b: "Cabalá", kind: "solid" },
  { a: "Cuatro Mundos", b: "Cabalá", kind: "solid" },
  { a: "Cuatro Mundos", b: "Tzimtzum", kind: "solid" },
  { a: "Nombre de 42", b: "Cabalá", kind: "solid" },
  { a: "Ana BeKoaj", b: "Nombre de 42", kind: "solid" }, // el Ana BeKoaj codifica el Nombre de 42
  { a: "Birur", b: "Tikún", kind: "solid" },
  { a: "Nitzotzot", b: "358", kind: "solid" },         // chispas ↔ Mashíaj (358)
  // INTERPRETATIVAS — lectura meditativa (NO texto literal del Arizal)
  { a: "Masei", b: "Nombre de 42", kind: "interp" },   // 42 estaciones ↔ 42 letras (paralelo de CONTEO)
  { a: "Masei", b: "Ana BeKoaj", kind: "interp" },
  { a: "Masei", b: "Tikún", kind: "interp" },
  { a: "Masei", b: "Gilgulim", kind: "interp" },
  { a: "Masei", b: "Cuatro Mundos", kind: "interp" },
  { a: "Nombre de 42", b: "Cuatro Mundos", kind: "interp" },
  { a: "Masei", b: "Mashíaj", kind: "interp" },
  { a: "Arvot Moav", b: "Mashíaj", kind: "interp" },
  { a: "Raamses", b: "Birur", kind: "interp" },
  { a: "Ana BeKoaj", b: "Jésed", kind: "interp" },
  { a: "Masei", b: "Maljut", kind: "interp" },
  { a: "Nombre de 42", b: "Tiféret", kind: "interp" },
];

// ─── Brain v4 · Personajes bíblicos (figure) + Dominios temáticos (tema) ──
// Verificado por el Sofer. Afinidades sefiróticas en SEFIRA_AFFINITY (arriba).
export const V4_NODES: BNode[] = [
  // Personajes
  { id: "Noaj", label: "Nóaj", labelFa: "نوح", cat: "figure", level: 3 },
  { id: "Avraham", label: "Abraham", labelFa: "ابراهیم", cat: "figure", level: 3 },
  { id: "Sará", label: "Sará", labelFa: "سارا", cat: "figure", level: 3 },
  { id: "Yitzjak", label: "Yitzjak", labelFa: "ییصحاق", cat: "figure", level: 3 },
  { id: "Rivká", label: "Rivká", labelFa: "ربکا", cat: "figure", level: 3 },
  { id: "Yaakov", label: "Yaakov", labelFa: "یعقوب", cat: "figure", level: 3 },
  { id: "Rajel", label: "Rajel", labelFa: "راحیل", cat: "figure", level: 3 },
  { id: "Leá", label: "Leá", labelFa: "لیه", cat: "figure", level: 3 },
  { id: "Moshé", label: "Moshé", labelFa: "موشه", cat: "figure", level: 3 },
  { id: "Aharón", label: "Aharón", labelFa: "اَهارون", cat: "figure", level: 3 },
  { id: "Miriam", label: "Miriam", labelFa: "میریام", cat: "figure", level: 3 },
  { id: "Yehoshúa", label: "Yehoshúa", labelFa: "یهوشع", cat: "figure", level: 3 },
  { id: "David", label: "David", labelFa: "داوود", cat: "figure", level: 3 },
  { id: "Shlomó", label: "Shlomó", labelFa: "شلومو", cat: "figure", level: 3 },
  { id: "Eliyahu", label: "Eliyahu", labelFa: "الیاهو", cat: "figure", level: 3 },
  { id: "Yeshayahu", label: "Yeshayahu", labelFa: "یشعیاهو", cat: "figure", level: 3 },
  // Temas
  { id: "Briá", label: "Creación (Briá)", labelFa: "آفرینش", cat: "tema", level: 3 },
  { id: "Neshamá", label: "Alma (Neshamá)", labelFa: "روح", cat: "tema", level: 3 },
  { id: "Nevuá", label: "Profecía (Nevuá)", labelFa: "نبوّت", cat: "tema", level: 3 },
  { id: "Malajim", label: "Ángeles (Malajim)", labelFa: "فرشتگان", cat: "tema", level: 3 },
  { id: "Gueulá", label: "Redención (Gueulá)", labelFa: "رستگاری", cat: "tema", level: 3 },
  { id: "Galut", label: "Exilio (Galut)", labelFa: "تبعید", cat: "tema", level: 3 },
  { id: "Eretz Israel", label: "Tierra de Israel", labelFa: "سرزمین اسرائیل", cat: "tema", level: 3 },
  { id: "Bet HaMikdash", label: "Templo (Bet HaMikdash)", labelFa: "بیت‌المقدس", cat: "tema", level: 3 },
  { id: "Tefilá", label: "Oración (Tefilá)", labelFa: "نیایش", cat: "tema", level: 3 },
  { id: "Shabat", label: "Shabat", labelFa: "شَبات", cat: "tema", level: 3 },
  { id: "Yirá", label: "Temor de Dios (Yirá)", labelFa: "ترس از خدا", cat: "tema", level: 3 },
  { id: "Ahavá", label: "Amor de Dios (Ahavá)", labelFa: "عشق به خدا", cat: "tema", level: 3 },
  { id: "Brit", label: "Pacto (Brit)", labelFa: "پیمان", cat: "tema", level: 3 },
  { id: "Shejiná", label: "Shejiná", labelFa: "شخینا", cat: "tema", level: 3 },
];

export const V4_EDGES: MaseiEdge[] = [
  // personaje ↔ libro/parashá
  { a: "Noaj", b: "Bereshit", kind: "solid" }, { a: "Avraham", b: "Bereshit", kind: "solid" },
  { a: "Sará", b: "Bereshit", kind: "solid" }, { a: "Yitzjak", b: "Bereshit", kind: "solid" },
  { a: "Rivká", b: "Bereshit", kind: "solid" }, { a: "Yaakov", b: "Bereshit", kind: "solid" },
  { a: "Rajel", b: "Bereshit", kind: "solid" }, { a: "Leá", b: "Bereshit", kind: "solid" },
  { a: "Moshé", b: "Shemot", kind: "solid" }, { a: "Aharón", b: "Shemot", kind: "solid" },
  { a: "Miriam", b: "Shemot", kind: "solid" }, { a: "Moshé", b: "Vayikrá", kind: "solid" },
  { a: "Moshé", b: "Bamidbar", kind: "solid" }, { a: "Moshé", b: "Devarim", kind: "solid" },
  { a: "Yehoshúa", b: "Neviim", kind: "solid" }, { a: "Eliyahu", b: "Neviim", kind: "solid" },
  { a: "Yeshayahu", b: "Neviim", kind: "solid" }, { a: "David", b: "Tehilim", kind: "solid" },
  { a: "David", b: "Ketuvim", kind: "solid" }, { a: "Shlomó", b: "Ketuvim", kind: "solid" },
  // personaje ↔ personaje
  { a: "Avraham", b: "Sará", kind: "solid" }, { a: "Avraham", b: "Yitzjak", kind: "solid" },
  { a: "Sará", b: "Yitzjak", kind: "solid" }, { a: "Yitzjak", b: "Rivká", kind: "solid" },
  { a: "Yitzjak", b: "Yaakov", kind: "solid" }, { a: "Rivká", b: "Yaakov", kind: "solid" },
  { a: "Yaakov", b: "Rajel", kind: "solid" }, { a: "Yaakov", b: "Leá", kind: "solid" },
  { a: "Rajel", b: "Yosef", kind: "solid" }, { a: "Moshé", b: "Aharón", kind: "solid" },
  { a: "Moshé", b: "Miriam", kind: "solid" }, { a: "Aharón", b: "Miriam", kind: "solid" },
  { a: "Moshé", b: "Yehoshúa", kind: "solid" }, { a: "David", b: "Shlomó", kind: "solid" },
  // personaje ↔ concepto/evento
  { a: "Avraham", b: "Akedá", kind: "solid" }, { a: "Yitzjak", b: "Akedá", kind: "solid" },
  { a: "David", b: "Mashíaj", kind: "interp" }, { a: "Eliyahu", b: "Mashíaj", kind: "interp" },
  { a: "Moshé", b: "Cabalá", kind: "interp" }, { a: "David", b: "Maljut", kind: "interp" },
  { a: "Shlomó", b: "Bet HaMikdash", kind: "solid" },
  // tema ↔ nodos existentes
  { a: "Briá", b: "Bereshit", kind: "solid" }, { a: "Briá", b: "Tzimtzum", kind: "interp" },
  { a: "Briá", b: "Álef", kind: "interp" }, { a: "Neshamá", b: "Adam HaRishon", kind: "interp" },
  { a: "Neshamá", b: "Teshuvá", kind: "interp" }, { a: "Nevuá", b: "Moshé", kind: "solid" },
  { a: "Nevuá", b: "Yeshayahu", kind: "solid" }, { a: "Nevuá", b: "Eliyahu", kind: "solid" },
  { a: "Malajim", b: "Zohar", kind: "interp" }, { a: "Gueulá", b: "Mashíaj", kind: "solid" },
  { a: "Gueulá", b: "Galut", kind: "solid" }, { a: "Galut", b: "Shejiná", kind: "interp" },
  { a: "Eretz Israel", b: "Bet HaMikdash", kind: "solid" }, { a: "Bet HaMikdash", b: "Shejiná", kind: "interp" },
  { a: "Tefilá", b: "Tehilim", kind: "solid" }, { a: "Tefilá", b: "Maljut", kind: "interp" },
  { a: "Shabat", b: "Briá", kind: "solid" }, { a: "Shabat", b: "Maljut", kind: "interp" },
  { a: "Shabat", b: "Shejiná", kind: "interp" }, { a: "Yirá", b: "Ahavá", kind: "solid" },
  { a: "Ahavá", b: "Jésed", kind: "interp" }, { a: "Yirá", b: "Guevurá", kind: "interp" },
  { a: "Brit", b: "Avraham", kind: "solid" }, { a: "Brit", b: "Yesod", kind: "interp" },
  { a: "Brit", b: "Yosef", kind: "interp" }, { a: "Shejiná", b: "Maljut", kind: "interp" },
  { a: "Shejiná", b: "Cabalá", kind: "interp" },
  // tema ↔ tema
  { a: "Briá", b: "Neshamá", kind: "interp" }, { a: "Nevuá", b: "Gueulá", kind: "interp" },
  { a: "Galut", b: "Eretz Israel", kind: "solid" }, { a: "Gueulá", b: "Bet HaMikdash", kind: "interp" },
  { a: "Tefilá", b: "Bet HaMikdash", kind: "solid" }, { a: "Brit", b: "Eretz Israel", kind: "solid" },
];

// ─── Brain v4.1 · Las 22 letras en los senderos del Árbol (disposición Ari-Gra) ──
// Verificado por el Sofer. Netzaj y Hod completan las 10 sefirot. Cada sendero
// (par de sefirot) lleva su letra, clickeable → estudio de la letra (/letras/slug).
// NOTA: la colocación letra↔sendero es la disposición del Arizal (no texto literal
// del Sefer Yetzirá, que solo da 3 madres / 7 dobles / 12 simples).
export const TREE_NODES: BNode[] = [
  { id: "Netzaj", label: "Netzaj", labelFa: "نتسح", cat: "kabbalah", level: 3 },
  { id: "Hod", label: "Hod", labelFa: "هود", cat: "kabbalah", level: 3 },
];

export type TreePath = { from: string; to: string; letter: string; name: string; slug: string };
export const TREE_PATHS: TreePath[] = [
  // 3 madres (אמ"ש)
  { from: "Keter", to: "Tiféret", letter: "א", name: "Álef", slug: "alef" },
  { from: "Biná", to: "Guevurá", letter: "מ", name: "Mem", slug: "mem" },
  { from: "Jojmá", to: "Jésed", letter: "ש", name: "Shin", slug: "shin" },
  // 7 dobles (בג"ד כפר"ת)
  { from: "Keter", to: "Jojmá", letter: "ב", name: "Bet", slug: "bet" },
  { from: "Keter", to: "Biná", letter: "ג", name: "Guímel", slug: "guimel" },
  { from: "Jojmá", to: "Biná", letter: "ד", name: "Dálet", slug: "dalet" },
  { from: "Jésed", to: "Guevurá", letter: "כ", name: "Caf", slug: "kaf" },
  { from: "Tiféret", to: "Yesod", letter: "פ", name: "Pe", slug: "pe" },
  { from: "Netzaj", to: "Hod", letter: "ר", name: "Resh", slug: "resh" },
  { from: "Yesod", to: "Maljut", letter: "ת", name: "Tav", slug: "tav" },
  // 12 simples (הוז"ח טי"ל נ"ס ע"צ ק)
  { from: "Keter", to: "Jésed", letter: "ה", name: "He", slug: "he" },
  { from: "Keter", to: "Guevurá", letter: "ו", name: "Vav", slug: "vav" },
  { from: "Jojmá", to: "Tiféret", letter: "ז", name: "Zayin", slug: "zayin" },
  { from: "Jojmá", to: "Netzaj", letter: "ח", name: "Jet", slug: "jet" },
  { from: "Biná", to: "Tiféret", letter: "ט", name: "Tet", slug: "tet" },
  { from: "Biná", to: "Hod", letter: "י", name: "Yod", slug: "yod" },
  { from: "Jésed", to: "Tiféret", letter: "ל", name: "Lámed", slug: "lamed" },
  { from: "Jésed", to: "Netzaj", letter: "נ", name: "Nun", slug: "nun" },
  { from: "Guevurá", to: "Tiféret", letter: "ס", name: "Sámej", slug: "samej" },
  { from: "Guevurá", to: "Hod", letter: "ע", name: "Áyin", slug: "ayin" },
  { from: "Tiféret", to: "Netzaj", letter: "צ", name: "Tzadi", slug: "tzadi" },
  { from: "Tiféret", to: "Hod", letter: "ק", name: "Quf", slug: "kuf" },
];

// ─── Estudios: Birurim (Números 21/Arad) + Cuerdas de vanidad (Isaías 5:18) ──
// Desarrollados y verificados por el Sofer. Hallazgos: jamor=jómer=254 (gematría
// exacta); el "cananeo" de Arad era Amalek (Rashi/Tanjumá Jukat 18); el hilo→soga
// de Is 5:18 es Rashi citando Sukká 52a (Rav Asi). Aristas solid/interp.
export const STUDY2_NODES: BNode[] = [
  { id: "Birurim", label: "Birurim", labelFa: "بیروریم (پالایش جرقه‌ها)", cat: "jashmal", level: 4, region: "occipital" },
  { id: "Cuerdas de vanidad", label: "Cuerdas de vanidad", labelFa: "ریسمان‌های پوچی", cat: "jashmal", level: 4, region: "frontal" },
  { id: "Números 21", label: "Números 21", labelFa: "اعداد ۲۱", cat: "tanakh", level: 3 },
  { id: "Arad", label: "Arad (terquedad)", labelFa: "عَراد (لجاجت)", cat: "tema", level: 3 },
  { id: "Kelipot", label: "Kelipot (cáscaras)", labelFa: "قلیپوت (پوسته‌ها)", cat: "kabbalah", level: 3 },
  { id: "Ratzón", label: "Ratzón (deseo/voluntad)", labelFa: "راتسون (اراده/میل)", cat: "kabbalah", level: 3 },
  { id: "Koaj HaMedameh", label: "Koaj HaMedameh (imaginación)", labelFa: "کوح هَمِدَمه (قوّهٔ خیال)", cat: "tema", level: 3 },
  { id: "Reshimó", label: "Reshimó (la huella)", labelFa: "رِشیمو (ردِّ نور)", cat: "kabbalah", level: 3 },
  { id: "Yetzer Hará", label: "Yetzer Hará", labelFa: "یِتسِر هَرَع (میل بد)", cat: "tema", level: 3 },
];

export const STUDY2_EDGES: MaseiEdge[] = [
  // Birurim (Números 21 / Arad / birur)
  { a: "Birurim", b: "Números 21", kind: "solid" }, { a: "Birurim", b: "Bamidbar", kind: "solid" },
  { a: "Birurim", b: "Arad", kind: "solid" }, { a: "Arad", b: "Números 21", kind: "solid" },
  { a: "Birurim", b: "Birur", kind: "solid" }, { a: "Birurim", b: "Nitzotzot", kind: "solid" },
  { a: "Birurim", b: "Shevirá", kind: "solid" }, { a: "Kelipot", b: "Cabalá", kind: "solid" },
  { a: "Kelipot", b: "Nitzotzot", kind: "solid" }, { a: "Kelipot", b: "Shevirá", kind: "solid" },
  { a: "Birur", b: "Kelipot", kind: "solid" }, { a: "Ratzón", b: "Cabalá", kind: "solid" },
  { a: "Birurim", b: "Tania", kind: "solid" },
  { a: "Arad", b: "Yetzer Hará", kind: "interp" }, { a: "Birurim", b: "Ratzón", kind: "interp" },
  { a: "Birurim", b: "Tikún", kind: "interp" }, { a: "Birurim", b: "Kelipot", kind: "interp" },
  { a: "Ratzón", b: "Tikún", kind: "interp" }, { a: "Birurim", b: "Jasidut", kind: "interp" },
  { a: "Arad", b: "Guevurá", kind: "interp" },
  // Números 21 cruza con la serpiente de cobre (mismo capítulo)
  { a: "Números 21", b: "Serpiente de cobre", kind: "solid" }, { a: "Números 21", b: "Najash", kind: "interp" },
  // Cuerdas de vanidad (Isaías 5:18 / yetzer hará / imaginación)
  { a: "Cuerdas de vanidad", b: "Yeshayahu", kind: "solid" }, { a: "Cuerdas de vanidad", b: "Neviim", kind: "solid" },
  { a: "Cuerdas de vanidad", b: "Yetzer Hará", kind: "solid" }, { a: "Cuerdas de vanidad", b: "Talmud", kind: "solid" },
  { a: "Yetzer Hará", b: "Talmud", kind: "solid" }, { a: "Yetzer Hará", b: "Yeshayahu", kind: "solid" },
  { a: "Cuerdas de vanidad", b: "Koaj HaMedameh", kind: "solid" }, { a: "Koaj HaMedameh", b: "Nevuá", kind: "solid" },
  { a: "Koaj HaMedameh", b: "Moré Nevujim", kind: "solid" }, { a: "Reshimó", b: "Tzimtzum", kind: "solid" },
  { a: "Reshimó", b: "Etz Jaim", kind: "solid" },
  { a: "Cuerdas de vanidad", b: "Reshimó", kind: "interp" }, { a: "Cuerdas de vanidad", b: "Kelipot", kind: "interp" },
  { a: "Cuerdas de vanidad", b: "Teshuvá", kind: "interp" }, { a: "Cuerdas de vanidad", b: "Mashíaj", kind: "interp" },
  { a: "Cuerdas de vanidad", b: "Yosef", kind: "interp" }, { a: "Koaj HaMedameh", b: "Hod", kind: "interp" },
  { a: "Yetzer Hará", b: "Guevurá", kind: "interp" },
  // Puente entre los dos estudios (jidush)
  { a: "Birurim", b: "Cuerdas de vanidad", kind: "interp" }, { a: "Arad", b: "Cuerdas de vanidad", kind: "interp" },
  { a: "Kelipot", b: "Yetzer Hará", kind: "interp" }, { a: "Birur", b: "Cuerdas de vanidad", kind: "interp" },
];

// ─── Estudios: 3 oraciones (Berajot 26b) · Sansón (Shoftim) · Descensos de la Shejiná ──
// Verificado por el Sofer. Hallazgos: la lista de descensos es Avot DeRabbi Natan 34
// (no Bereshit Rabá 19:7, que es 7 ascensos/7 descensos por los justos); Rashi a
// Jueces 14:4 (toaná=pretexto) respalda lo de Sansón infiltrado; sulam=Sinaí=130.
export const STUDY3_NODES: BNode[] = [
  { id: "Tres oraciones", label: "Tres oraciones", labelFa: "سه نماز", cat: "jashmal", level: 4 },
  { id: "Sansón", label: "Sansón (Shimshón)", labelFa: "شَمشون", cat: "jashmal", level: 4 },
  { id: "Descensos de la Shejiná", label: "Descensos de la Shejiná", labelFa: "فرودهای شخینا", cat: "jashmal", level: 4 },
  { id: "Shimshon", label: "Shimshón", labelFa: "شَمشون", cat: "figure", level: 3 },
  { id: "Ester", label: "Ester", labelFa: "اِستر", cat: "figure", level: 3 },
  { id: "Dagón", label: "Dagón (ídolo)", labelFa: "داگون (بت)", cat: "tema", level: 3 },
  { id: "Sinaí", label: "Sinaí", labelFa: "سینای", cat: "tema", level: 3 },
  { id: "Itaruta", label: "Itaruta (despertar arriba/abajo)", labelFa: "اِتعَروتا (بیداری از بالا و پایین)", cat: "kabbalah", level: 3 },
  { id: "Shoftim", label: "Shoftim (Jueces)", labelFa: "شوفطیم (داوران)", cat: "tanakh", level: 2 },
];

export const STUDY3_EDGES: MaseiEdge[] = [
  // A — Tres oraciones (Berajot 26b)
  { a: "Tres oraciones", b: "Berajot", kind: "solid" }, { a: "Tres oraciones", b: "Talmud", kind: "solid" },
  { a: "Tres oraciones", b: "Tefilá", kind: "solid" }, { a: "Tres oraciones", b: "Avraham", kind: "solid" },
  { a: "Tres oraciones", b: "Yitzjak", kind: "solid" }, { a: "Tres oraciones", b: "Yaakov", kind: "solid" },
  { a: "Avraham", b: "Tefilá", kind: "solid" }, { a: "Yitzjak", b: "Tefilá", kind: "solid" },
  { a: "Yaakov", b: "Tefilá", kind: "solid" },
  { a: "Tres oraciones", b: "Jésed", kind: "interp" }, { a: "Tres oraciones", b: "Guevurá", kind: "interp" },
  { a: "Tres oraciones", b: "Tiféret", kind: "interp" }, { a: "Tres oraciones", b: "Cabalá", kind: "interp" },
  { a: "Tres oraciones", b: "Neshamá", kind: "interp" },
  // B — Sansón (Shoftim 14:4, 16:23)
  { a: "Sansón", b: "Shimshon", kind: "solid" }, { a: "Sansón", b: "Shoftim", kind: "solid" },
  { a: "Sansón", b: "Neviim", kind: "solid" }, { a: "Sansón", b: "Dagón", kind: "solid" },
  { a: "Shimshon", b: "Shoftim", kind: "solid" }, { a: "Shimshon", b: "Neviim", kind: "solid" },
  { a: "Shoftim", b: "Neviim", kind: "solid" }, { a: "Shimshon", b: "Dagón", kind: "solid" },
  { a: "Sansón", b: "Birur", kind: "interp" }, { a: "Sansón", b: "Nitzotzot", kind: "interp" },
  { a: "Sansón", b: "Kelipot", kind: "interp" }, { a: "Sansón", b: "Yosef", kind: "interp" },
  { a: "Sansón", b: "Ester", kind: "interp" }, { a: "Sansón", b: "Galut", kind: "interp" },
  { a: "Shimshon", b: "Guevurá", kind: "interp" }, { a: "Ester", b: "Galut", kind: "interp" },
  { a: "Ester", b: "Shejiná", kind: "interp" }, { a: "Ester", b: "Birur", kind: "interp" },
  { a: "Dagón", b: "Kelipot", kind: "interp" },
  // C — Descensos de la Shejiná (BR 19:7 + Avot DeRabbi Natan 34)
  { a: "Descensos de la Shejiná", b: "Bereshit Rabá", kind: "solid" }, { a: "Descensos de la Shejiná", b: "Midrash", kind: "solid" },
  { a: "Descensos de la Shejiná", b: "Shejiná", kind: "solid" }, { a: "Descensos de la Shejiná", b: "Bereshit", kind: "solid" },
  { a: "Descensos de la Shejiná", b: "Shemot", kind: "solid" }, { a: "Descensos de la Shejiná", b: "Bamidbar", kind: "solid" },
  { a: "Descensos de la Shejiná", b: "Sinaí", kind: "solid" }, { a: "Descensos de la Shejiná", b: "Avraham", kind: "solid" },
  { a: "Descensos de la Shejiná", b: "Yitzjak", kind: "solid" }, { a: "Descensos de la Shejiná", b: "Yaakov", kind: "solid" },
  { a: "Descensos de la Shejiná", b: "Moshé", kind: "solid" }, { a: "Descensos de la Shejiná", b: "Gan Edén", kind: "solid" },
  { a: "Sinaí", b: "Shemot", kind: "solid" }, { a: "Sinaí", b: "Moshé", kind: "solid" }, { a: "Sinaí", b: "Tefilá", kind: "interp" },
  { a: "Descensos de la Shejiná", b: "Galut", kind: "interp" }, { a: "Descensos de la Shejiná", b: "Gueulá", kind: "interp" },
  { a: "Descensos de la Shejiná", b: "Itaruta", kind: "interp" }, { a: "Descensos de la Shejiná", b: "Tzimtzum", kind: "interp" },
  { a: "Descensos de la Shejiná", b: "Zohar", kind: "interp" }, { a: "Descensos de la Shejiná", b: "Maljut", kind: "interp" },
  { a: "Itaruta", b: "Tzimtzum", kind: "interp" }, { a: "Itaruta", b: "Gueulá", kind: "interp" },
  { a: "Itaruta", b: "Cabalá", kind: "solid" }, { a: "Sinaí", b: "Tiféret", kind: "interp" },
  // Puentes entre los 3 estudios
  { a: "Tres oraciones", b: "Descensos de la Shejiná", kind: "interp" },
  { a: "Sansón", b: "Descensos de la Shejiná", kind: "interp" },
];

// ─── Estudio: Los 21 Pactos (Britot) + Ehyé (אהיה = 21) → Biná ─────────────
// Verificado por el Sofer. El Nombre Ehyé ("Yo Seré", Shemot 3:14) tiene gematría
// 21 y se asocia a Keter/Biná; los pactos de la Torá se leen como su despliegue.
// Aristas SÓLIDAS = fuente clásica directa; INTERPRETATIVAS = lectura meditativa.
// NOTA: el nodo "Brit" (Pacto) y el núcleo "Torá" YA existen — se usan como destino.
export const BRIT21_NODES: BNode[] = [
  { id: "21 Pactos",        label: "21 Pactos (Britot)",        labelFa: "۲۱ پیمان",                  cat: "jashmal",  level: 4, url: "/21-pactos" },
  { id: "Ehyé",             label: "Ehyé (Yo Seré) · 21",       labelFa: "اَهیه (خواهم بود) · ۲۱",     cat: "kabbalah", level: 3 },
  { id: "Ehyé Asher Ehyé",  label: "Ehyé Asher Ehyé",           labelFa: "اَهیه اَشِر اَهیه",           cat: "tanakh",   level: 3 },
  { id: "YHVH",             label: "YHVH · 26",                 labelFa: "یهوه · ۲۶",                  cat: "kabbalah", level: 3 },
  { id: "Adonai",           label: "Adonai · 65",               labelFa: "اَدونای · ۶۵",                cat: "kabbalah", level: 3 },
  { id: "Brit Milá",        label: "Brit Milá (circuncisión)",  labelFa: "بریت میلا (ختنه)",           cat: "tema",     level: 3 },
  { id: "Pacto de Noé",     label: "Pacto de Noé (arcoíris)",   labelFa: "پیمان نوح (رنگین‌کمان)",      cat: "tema",     level: 3 },
  { id: "Pacto davídico",   label: "Pacto davídico",            labelFa: "پیمان داوودی",                cat: "tema",     level: 3 },
  { id: "Nuevo Pacto",      label: "Nuevo Pacto (en el corazón)", labelFa: "پیمان نو (در قلب)",         cat: "tema",     level: 3 },
  { id: "Pacto de sal",     label: "Pacto de sal",              labelFa: "پیمان نمک",                  cat: "tema",     level: 3 },
  { id: "Brit Shalom",      label: "Brit Shalom (Pinjás)",      labelFa: "بریت شالوم (پینحاس)",         cat: "tema",     level: 3 },
  { id: "Arcoíris",         label: "Arcoíris (Késhet)",         labelFa: "رنگین‌کمان (قِشِت)",          cat: "tanakh",   level: 3 },
];

export const BRIT21_EDGES: MaseiEdge[] = [
  // Núcleo del estudio: 21 Pactos ↔ Ehyé (21) ↔ Biná / Keter / Tikún
  { a: "21 Pactos", b: "Brit", kind: "solid" }, { a: "21 Pactos", b: "Ehyé", kind: "interp" },
  { a: "Ehyé", b: "Biná", kind: "interp" }, { a: "Ehyé", b: "Keter", kind: "interp" },
  { a: "21 Pactos", b: "Biná", kind: "interp" }, { a: "21 Pactos", b: "Tikún", kind: "interp" },
  // Ehyé Asher Ehyé (Shemot 3:14, Moshé) + Nombres divinos
  { a: "Ehyé", b: "Ehyé Asher Ehyé", kind: "solid" }, { a: "Ehyé Asher Ehyé", b: "Shemot", kind: "solid" },
  { a: "Ehyé Asher Ehyé", b: "Moshé", kind: "solid" }, { a: "Ehyé", b: "YHVH", kind: "interp" },
  { a: "YHVH", b: "Adonai", kind: "interp" }, { a: "YHVH", b: "Tiféret", kind: "interp" },
  { a: "Adonai", b: "Maljut", kind: "interp" },
  // Pacto de Noé (arcoíris)
  { a: "Pacto de Noé", b: "21 Pactos", kind: "solid" }, { a: "Pacto de Noé", b: "Noaj", kind: "solid" },
  { a: "Pacto de Noé", b: "Arcoíris", kind: "solid" }, { a: "Pacto de Noé", b: "Maljut", kind: "interp" },
  { a: "Arcoíris", b: "Noaj", kind: "solid" }, { a: "Arcoíris", b: "Bereshit", kind: "solid" },
  { a: "Arcoíris", b: "Maljut", kind: "interp" },
  // Brit Milá (Avraham, Bereshit 17)
  { a: "Brit Milá", b: "21 Pactos", kind: "solid" }, { a: "Brit Milá", b: "Avraham", kind: "solid" },
  { a: "Brit Milá", b: "Brit", kind: "solid" }, { a: "Brit Milá", b: "Bereshit", kind: "solid" },
  { a: "Brit Milá", b: "Yesod", kind: "interp" }, { a: "Brit Milá", b: "Jésed", kind: "interp" },
  // Pacto davídico (David, Tehilim, reino eterno)
  { a: "Pacto davídico", b: "21 Pactos", kind: "solid" }, { a: "Pacto davídico", b: "David", kind: "solid" },
  { a: "Pacto davídico", b: "Tehilim", kind: "solid" }, { a: "Pacto davídico", b: "Maljut", kind: "interp" },
  { a: "Pacto davídico", b: "Mashíaj", kind: "interp" }, { a: "Pacto davídico", b: "Pacto de sal", kind: "solid" },
  // Pacto de sal (Vayikrá 2:13, Bamidbar 18:19)
  { a: "Pacto de sal", b: "21 Pactos", kind: "solid" }, { a: "Pacto de sal", b: "Vayikrá", kind: "solid" },
  { a: "Pacto de sal", b: "Brit", kind: "solid" }, { a: "Pacto de sal", b: "Guevurá", kind: "interp" },
  // Brit Shalom (Pinjás, Bamidbar 25:12)
  { a: "Brit Shalom", b: "21 Pactos", kind: "solid" }, { a: "Brit Shalom", b: "Bamidbar", kind: "solid" },
  { a: "Brit Shalom", b: "Brit", kind: "solid" }, { a: "Brit Shalom", b: "Guevurá", kind: "interp" },
  { a: "Brit Shalom", b: "Tikún", kind: "interp" },
  // Nuevo Pacto (Yirmiyahu 31:30, en el corazón)
  { a: "Nuevo Pacto", b: "21 Pactos", kind: "solid" }, { a: "Nuevo Pacto", b: "Neviim", kind: "solid" },
  { a: "Nuevo Pacto", b: "Brit", kind: "solid" }, { a: "Nuevo Pacto", b: "Teshuvá", kind: "interp" },
  { a: "Nuevo Pacto", b: "Biná", kind: "interp" }, { a: "Nuevo Pacto", b: "Gueulá", kind: "interp" },
  // Pactos del Sinaí / Shabat / Torá (el gran marco)
  { a: "21 Pactos", b: "Shabat", kind: "solid" }, { a: "21 Pactos", b: "Sinaí", kind: "solid" },
  { a: "21 Pactos", b: "Moshé", kind: "solid" }, { a: "Shabat", b: "Brit", kind: "interp" },
  { a: "21 Pactos", b: "Torá", kind: "solid" },
];

// ─── Estudio: Las Madres del Mashíaj (Tamar + Rut) ─────────────────────────
// Verificado por el Sofer. Cuatro mujeres en la genealogía real (Tamar, Rut,
// Betsabé, Naamá) por las que pasa el linaje de David → Mashíaj; el motivo de la
// "averá lishmah" (transgresión por el Cielo, Nazir 23b) abre la brecha (Péretz)
// de donde brota la realeza. HUB = el nodo EXISTENTE "Linaje" (renombrado a
// "Linaje · Madres del Mashíaj"): NO se duplica aquí; solo se le tienden aristas.
// Aristas SÓLIDAS = fuente clásica directa; INTERPRETATIVAS = lectura meditativa.
export const MADRES_NODES: BNode[] = [
  { id: "Tamar",          label: "Tamar",                                  labelFa: "تامار",                          cat: "figure", level: 4, url: "/tamar" },
  { id: "Rut",            label: "Rut (la moabita)",                       labelFa: "روت (موآبی)",                    cat: "figure", level: 3, url: "/linaje" },
  { id: "Betsabé",        label: "Betsabé (Bat-Sheva)",                    labelFa: "بَت‌شِبَع",                       cat: "figure", level: 3, url: "/linaje" },
  { id: "Naamá",          label: "Naamá (la amonita)",                     labelFa: "نَعَما (عَمّونی)",                cat: "figure", level: 3, url: "/linaje" },
  { id: "Yehudá",         label: "Yehudá",                                 labelFa: "یهودا",                          cat: "figure", level: 3, url: "/tamar" },
  { id: "Fares",          label: "Fares (Péretz · brecha)",                labelFa: "پِرِص (شکاف)",                    cat: "figure", level: 3, url: "/tamar" },
  { id: "Averá Lishmah",  label: "Averá Lishmah (transgresión por el Cielo)", labelFa: "عَوِرا لِشماه (گناه برای آسمان)", cat: "tema",   level: 3, url: "/linaje" },
];

export const MADRES_EDGES: MaseiEdge[] = [
  // Las cuatro madres + el motivo → el linaje (hub)
  { a: "Tamar", b: "Linaje", kind: "solid" }, { a: "Rut", b: "Linaje", kind: "solid" },
  { a: "Betsabé", b: "Linaje", kind: "solid" }, { a: "Naamá", b: "Linaje", kind: "solid" },
  { a: "Averá Lishmah", b: "Linaje", kind: "interp" },
  // Tamar (Bereshit 38): Yehudá, Péretz, la brecha, la averá lishmah
  { a: "Tamar", b: "Yehudá", kind: "solid" }, { a: "Tamar", b: "Bereshit", kind: "solid" },
  { a: "Tamar", b: "Fares", kind: "solid" }, { a: "Tamar", b: "Averá Lishmah", kind: "interp" },
  { a: "Tamar", b: "Najash", kind: "interp" }, { a: "Tamar", b: "Mashíaj", kind: "interp" },
  { a: "Tamar", b: "Maljut", kind: "interp" },
  // Yehudá (hijo de Yaakov, padre de la realeza)
  { a: "Yehudá", b: "Yaakov", kind: "solid" }, { a: "Yehudá", b: "Bereshit", kind: "solid" },
  { a: "Yehudá", b: "David", kind: "interp" }, { a: "Yehudá", b: "Maljut", kind: "interp" },
  // Fares / Péretz (la brecha → David)
  { a: "Fares", b: "David", kind: "solid" }, { a: "Fares", b: "Mashíaj", kind: "interp" },
  { a: "Fares", b: "Yesod", kind: "interp" },
  // Rut (la moabita → David; redención de Boaz)
  { a: "Rut", b: "David", kind: "solid" }, { a: "Rut", b: "Ketuvim", kind: "solid" },
  { a: "Rut", b: "Averá Lishmah", kind: "interp" }, { a: "Rut", b: "Gueulá", kind: "interp" },
  { a: "Rut", b: "Maljut", kind: "interp" },
  // Betsabé (Bat-Sheva → Shlomó)
  { a: "Betsabé", b: "David", kind: "solid" }, { a: "Betsabé", b: "Shlomó", kind: "solid" },
  { a: "Betsabé", b: "Maljut", kind: "interp" },
  // Naamá (la amonita, madre de Rejavam por Shlomó)
  { a: "Naamá", b: "Shlomó", kind: "solid" }, { a: "Naamá", b: "Maljut", kind: "interp" },
  // Averá Lishmah (Nazir 23b: "grande es la transgresión por el Cielo")
  { a: "Averá Lishmah", b: "Talmud", kind: "solid" }, { a: "Averá Lishmah", b: "Tikún", kind: "interp" },
  { a: "Averá Lishmah", b: "Mashíaj", kind: "interp" }, { a: "Averá Lishmah", b: "Shejiná", kind: "interp" },
];

// ─── Estudio: Tamar, Tohu y Tikún (las tres prendas → תֹהוּ) ───────────────
// Verificado por el Sofer. LECTURA DE DERASH/SOD — un jidush simbólico, NO fuente
// explícita del Zóhar ni del Arí: las tres prendas que Tamar pide (Bereshit 38:18)
// —Sello (חותם→ת), Cordón (פתיל→ה), Bastón (מטה→ו)— deletrean תֹהוּ (Tohu, el caos
// primordial, gematría 411). El arco: Tamar toma el Tohu en sus manos → custodia
// las chispas caídas (Shevirat HaKelim) → "Tzadká mimeni" (Gn 38:26) es el Tikún →
// nace Péretz/Fares, la brecha por donde irrumpe la luz. Casi todas las aristas
// son INTERPRETATIVAS (lectura meditativa); las del eje Tohu→Cabalá/Shevirá/
// Nitzotzot/Tikún son sólidas porque ese es vocabulario cabalístico establecido.
export const TOHU_NODES: BNode[] = [
  { id: "Tohu",   label: "Tohu (caos primordial · תֹהוּ)", labelFa: "توهو (آشوب آغازین · תֹהוּ)", cat: "kabbalah", level: 4, url: "/tamar" },
  { id: "Sello",  label: "Sello (Jotam · חותם → ת)",       labelFa: "مُهر (خوتام · חותם ← ת)",     cat: "tema",     level: 4, url: "/tamar" },
  { id: "Cordón", label: "Cordón (Petil · פתיל → ה)",      labelFa: "بند (پتیل · פתיל ← ה)",       cat: "tema",     level: 4, url: "/tamar" },
  { id: "Bastón", label: "Bastón (Maté · מטה → ו)",        labelFa: "عصا (مَطه · מטה ← ו)",        cat: "tema",     level: 4, url: "/tamar" },
];

export const TOHU_EDGES: MaseiEdge[] = [
  // Las tres prendas deletrean el Tohu (lectura simbólica)
  { a: "Sello", b: "Tohu", kind: "interp" }, { a: "Cordón", b: "Tohu", kind: "interp" },
  { a: "Bastón", b: "Tohu", kind: "interp" },
  // Tamar las tiene en sus manos
  { a: "Tamar", b: "Sello", kind: "solid" }, { a: "Tamar", b: "Cordón", kind: "solid" },
  { a: "Tamar", b: "Bastón", kind: "solid" }, { a: "Tamar", b: "Tohu", kind: "interp" },
  // cada prenda ↔ su sefirá (por su letra: ת=Maljut, ה=Biná, ו=Tiféret)
  { a: "Sello", b: "Maljut", kind: "interp" }, { a: "Cordón", b: "Biná", kind: "interp" },
  { a: "Bastón", b: "Tiféret", kind: "interp" },
  // Tohu ↔ el vocabulario cabalístico establecido (caos → quiebre → chispas → reparación)
  { a: "Tohu", b: "Shevirá", kind: "solid" }, { a: "Tohu", b: "Nitzotzot", kind: "solid" },
  { a: "Tohu", b: "Tikún", kind: "solid" }, { a: "Tohu", b: "Cabalá", kind: "solid" },
  // el despertar / la brecha (Fares) por donde irrumpe la luz tras el Tikún
  { a: "Tamar", b: "Itaruta", kind: "interp" }, { a: "Fares", b: "Tohu", kind: "interp" },
  { a: "Fares", b: "Tikún", kind: "interp" },
  // Tohu va-vohu (Bereshit 1:2)
  { a: "Tohu", b: "Bereshit", kind: "solid" },
];

// ─── Estudio: Abraham en la Cabalá (verificado por el Sofer en Sefaria) ───
// Ancla a Abraham en la dimensión cabalística con AUTORIDAD clásica (Zohar,
// Sefer Yetzirá, midrash). La fuente exacta va en el comentario de cada arista.
// Gematrías verificadas: אברם=243 · אברהם=248 (+ה=5) · חסד=72.
export const AVRAHAM_KAB_NODES: BNode[] = [
  { id: "Sefer Yetzirá",  label: "Sefer Yetzirá (Libro de la Formación)", labelFa: "سفر یِتسیرا (کتاب آفرینش)", cat: "kabbalah", level: 2 },
  { id: "22 Letras",      label: "Las 22 letras",                          labelFa: "بیست‌ودو حرف",            cat: "kabbalah", level: 3 },
  { id: "10 Pruebas",     label: "Las 10 pruebas de Abraham",              labelFa: "ده آزمایش ابراهیم",       cat: "tema",     level: 3 },
  { id: "Birá Doleket",   label: "El palacio iluminado (Birá Doleket)",    labelFa: "کاخ روشن (بیرا دولِقِت)", cat: "tema",     level: 3 },
  { id: "Hajnasat Orjim", label: "Hospitalidad (Hajnasat Orjim)",          labelFa: "مهمان‌نوازی",            cat: "tema",     level: 3 },
  { id: "Malki-Tzedek",   label: "Malki-Tzedek",                           labelFa: "مَلכی‌صِدِق",             cat: "figure",   level: 3 },
  { id: "Merkavá",        label: "Merkavá (la Carroza)",                   labelFa: "مرکبه (ارابه)",          cat: "kabbalah", level: 3 },
  { id: "Nombre de 72",   label: "Nombre de 72 (Shem HaMforash)",          labelFa: "نام ۷۲ (شِم هَمفوراش)",   cat: "kabbalah", level: 3 },
];
export const AVRAHAM_KAB_EDGES: MaseiEdge[] = [
  // ── PRINCIPALES — autoridad clásica (estas son las aristas primarias) ──
  { a: "Avraham", b: "Jésed",          kind: "solid" },  // Miqueas 7:20 "jésed le-Avraham" + Pataj Eliyahu (Tikkunei Zohar 17)
  { a: "Avraham", b: "Sefer Yetzirá",  kind: "solid" },  // Sefer Yetzirá 6:4 (autoría = atribución tradicional)
  { a: "Avraham", b: "22 Letras",      kind: "solid" },  // Sefer Yetzirá 6:4 "22 letras atadas a su lengua"
  { a: "Avraham", b: "Brit Milá",      kind: "solid" },  // Génesis 17:11 (signo del pacto)
  { a: "Brit Milá", b: "Yesod",        kind: "solid" },  // Pataj Eliyahu (Tikkunei Zohar 17): "ot brit kódesh"
  { a: "Avraham", b: "Merkavá",        kind: "solid" },  // Bereshit Rabbah 82:6 "los patriarcas son la Merkavá"
  { a: "Yitzjak", b: "Merkavá",        kind: "solid" },  // Bereshit Rabbah 82:6
  { a: "Yaakov",  b: "Merkavá",        kind: "solid" },  // Bereshit Rabbah 82:6
  { a: "Avraham", b: "Birá Doleket",   kind: "solid" },  // Bereshit Rabbah 39:1 (el palacio iluminado)
  { a: "Avraham", b: "Neshamá",        kind: "solid" },  // Génesis 12:5 + Bereshit Rabbah 39:14 (almas de Jarán)
  { a: "Sará",    b: "Neshamá",        kind: "solid" },  // Bereshit Rabbah 39:14
  { a: "Avraham", b: "Zohar",          kind: "solid" },  // Zohar, Lej Lejá (apertura 1:1)
  { a: "Sefer Yetzirá", b: "22 Letras", kind: "solid" }, // Sefer Yetzirá (las letras como bloques de la creación)
  { a: "Sefer Yetzirá", b: "Cabalá",    kind: "solid" }, // obra primaria de la Cabalá
  { a: "Merkavá",       b: "Cabalá",    kind: "solid" }, // Maaseh Merkavá = raíz de la mística
  // ── SECUNDARIAS — interpretativas ──
  { a: "Avraham", b: "10 Pruebas",      kind: "solid" },  // Pirkei Avot 5:3 (las 10 pruebas)
  { a: "10 Pruebas", b: "Cabalá",       kind: "interp" }, // paralelo 10 pruebas ↔ 10 sefirot
  { a: "Avraham", b: "Hajnasat Orjim",  kind: "solid" },  // Génesis 18 (los tres ángeles)
  { a: "Hajnasat Orjim", b: "Jésed",    kind: "interp" }, // hospitalidad = expresión del jésed
  { a: "Avraham", b: "Guevurá",         kind: "interp" }, // Akedá: Guevurá endulzada en el jésed
  { a: "Malki-Tzedek", b: "Avraham",    kind: "solid" },  // Génesis 14:18 (pan y vino)
  { a: "Malki-Tzedek", b: "Jésed",      kind: "interp" }, // sacerdocio del jésed
  { a: "Jésed",   b: "Nombre de 72",    kind: "interp" }, // gematría חסד = 72
  { a: "Nombre de 72", b: "Cabalá",     kind: "interp" }, // Shem HaMforash
];

// ─── Nodos ───────────────────────────────────────────────────────────────
export const BNODES: BNode[] = [
  // ── Nivel 0 — corazón (Torá y Tanaj UNIFICADOS: la Torá es el núcleo del Tanaj) ──
  { id: "Torá", label: "Torá · Tanaj", labelFa: "تورات · تنخ", cat: "torah", level: 0 },

  // ── Nivel 1 — dominios ──
  // Neviim (Profetas) y Ketuvim (Escritos): las otras dos divisiones del Tanaj,
  // alrededor del núcleo Torá. Los 5 libros de la Torá cuelgan directo del núcleo.
  { id: "Neviim",    label: "Neviim",    labelFa: "نِویئیم (انبیا)",   cat: "tanakh", level: 1 },
  { id: "Ketuvim",   label: "Ketuvim",   labelFa: "کتوویم (مکتوبات)", cat: "tanakh", level: 1 },
  { id: "Mishná",    label: "Mishná",    labelFa: "میشنا",  cat: "mishnah",    level: 1 },
  { id: "Talmud",    label: "Talmud",    labelFa: "تلمود",  cat: "talmud",     level: 1 },
  { id: "Midrash",   label: "Midrash",   labelFa: "میدراش", cat: "midrash",    level: 1 },
  { id: "Cabalá",    label: "Cabalá",    labelFa: "کابالا", cat: "kabbalah",   level: 1 },
  { id: "Jasidut",   label: "Jasidut",   labelFa: "حسیدوت", cat: "chasidut",   level: 1 },
  { id: "Halajá",    label: "Halajá",    labelFa: "هلاخا",  cat: "halakhah",   level: 1 },
  { id: "Filosofía", label: "Filosofía", labelFa: "فلسفه",  cat: "philosophy", level: 1 },
  { id: "Ciencia",   label: "Ciencia",   labelFa: "علم",    cat: "science",    level: 1 },

  // ── Nivel 2 — libros del Jumash (alrededor de la Torá) ──
  { id: "Bereshit", label: "Bereshit", labelFa: "بِرِشیت (پیدایش)", cat: "tanakh", level: 2 },
  { id: "Shemot",   label: "Shemot",   labelFa: "شِموت (خروج)",     cat: "tanakh", level: 2 },
  { id: "Vayikrá",  label: "Vayikrá",  labelFa: "وَیِقرا (لاویان)", cat: "tanakh", level: 2 },
  { id: "Bamidbar", label: "Bamidbar", labelFa: "بَمیدبار (اعداد)", cat: "tanakh", level: 2 },
  { id: "Devarim",  label: "Devarim",  labelFa: "دِواریم (تثنیه)",  cat: "tanakh", level: 2 },
  { id: "Tehilim",  label: "Tehilim",  labelFa: "مزامیر",           cat: "tanakh", level: 2 },

  // ── Nivel 2 — obras / tratados ──
  { id: "Berajot",       label: "Berajot",       labelFa: "بِراخوت",   cat: "talmud",   level: 2 },
  { id: "Rosh Hashaná",  label: "Rosh Hashaná",  labelFa: "روش هَشانا", cat: "mishnah",  level: 2 },
  { id: "Bereshit Rabá", label: "Bereshit Rabá", labelFa: "بِرِشیت رَبا", cat: "midrash", level: 2 },
  { id: "Zohar",         label: "Zohar",         labelFa: "زوهَر",     cat: "kabbalah", level: 2 },
  { id: "Etz Jaim",      label: "Etz Jaim",      labelFa: "عِتص حَییم", cat: "kabbalah", level: 2 },
  { id: "Tania",         label: "Tania",         labelFa: "تانیا",     cat: "chasidut", level: 2 },
  { id: "Baal Shem Tov", label: "Baal Shem Tov", labelFa: "بَعل شِم طوב", cat: "chasidut", level: 2 },
  { id: "Mishné Torá",   label: "Mishné Torá",   labelFa: "میشنه تورا", cat: "halakhah", level: 2 },
  { id: "Moré Nevujim",  label: "Moré Nevujim",  labelFa: "دلالة الحائرین", cat: "philosophy", level: 2 },
  { id: "Kuzari",        label: "Kuzari",        labelFa: "کوزاری",    cat: "philosophy", level: 2 },
  { id: "Maharal",       label: "Maharal",       labelFa: "مَهَرال",   cat: "philosophy", level: 2 },
  { id: "Física",        label: "Física",        labelFa: "فیزیک",     cat: "science",  level: 2 },
  { id: "Matemática",    label: "Matemática",    labelFa: "ریاضیات",   cat: "science",  level: 2 },
  { id: "Cosmología",    label: "Cosmología",    labelFa: "کیهان‌شناسی", cat: "science", level: 2 },

  // ── Nivel 3 — temas / personajes / conceptos (Bereshit) ──
  { id: "Adam HaRishon", label: "Adam HaRishon", labelFa: "آدَم هَریشون", cat: "tanakh", level: 3 },
  { id: "Javá",          label: "Javá",          labelFa: "حَوا",        cat: "tanakh", level: 3 },
  { id: "Najash",        label: "Najash",        labelFa: "ناخاش (مار)",  cat: "tanakh", level: 3 },
  { id: "Gan Edén",      label: "Gan Edén",      labelFa: "گَن عِدِن",    cat: "tanakh", level: 3 },
  { id: "Tzelem Elohim", label: "Tzelem Elohim", labelFa: "تصِلِم اِلوهیم", cat: "tanakh", level: 3 },
  { id: "Teshuvá",       label: "Teshuvá",       labelFa: "تِشووا",      cat: "tanakh", level: 3 },
  { id: "Akedá",         label: "Akedá",         labelFa: "عَقیدا",      cat: "tanakh", level: 3 },

  // ── Nivel 3 — sefirot / letras / conceptos cabalísticos ──
  { id: "Keter",   label: "Keter",   labelFa: "کِتِر",   cat: "kabbalah", level: 3 },
  { id: "Jojmá",   label: "Jojmá",   labelFa: "خوخما",   cat: "kabbalah", level: 3 },
  { id: "Biná",    label: "Biná",    labelFa: "بینا",    cat: "kabbalah", level: 3 },
  { id: "Jésed",   label: "Jésed",   labelFa: "خِسِد",   cat: "kabbalah", level: 3 },
  { id: "Guevurá", label: "Guevurá", labelFa: "گِوورا",  cat: "kabbalah", level: 3 },
  { id: "Tiféret", label: "Tiféret", labelFa: "تیفِرِت", cat: "kabbalah", level: 3 },
  { id: "Yesod",   label: "Yesod",   labelFa: "یِسود",   cat: "kabbalah", level: 3 },
  { id: "Maljut",  label: "Maljut",  labelFa: "مَلخوت",  cat: "kabbalah", level: 3 },
  { id: "Tzimtzum", label: "Tzimtzum", labelFa: "تزیمتزوم", cat: "kabbalah", level: 3 },
  { id: "Shevirá",  label: "Shevirat HaKelim", labelFa: "شِویرَت هَکِلیم", cat: "kabbalah", level: 3 },
  { id: "Mashíaj",  label: "Mashíaj", labelFa: "ماشیَخ", cat: "kabbalah", level: 3 },
  { id: "Álef",     label: "Álef",    labelFa: "اَلِف",  cat: "kabbalah", level: 3 },
  { id: "Nun",      label: "Nun",     labelFa: "نون",    cat: "kabbalah", level: 3 },
  { id: "Sámej",    label: "Sámej",   labelFa: "سامِخ",  cat: "kabbalah", level: 3 },
  { id: "Yosef",    label: "Yosef",   labelFa: "یوسف",   cat: "tanakh",   level: 3 },
  { id: "Nes",      label: "Nes",     labelFa: "نِس",    cat: "kabbalah", level: 3 },

  // ── Nivel 3 — ciencia ──
  { id: "Constante α", label: "Constante α (1/137)", labelFa: "ثابت آلفا", cat: "science", level: 3 },
  { id: "Entanglement", label: "Entrelazamiento cuántico", labelFa: "درهم‌تنیدگی کوانتومی", cat: "science", level: 3 },

  // ── Nivel 4 — contenido de Jashmal (misterios con URL real) ──
  { id: "137",                label: "137",                labelFa: "۱۳۷",        cat: "jashmal", level: 4, url: "/137",                region: "science" },
  { id: "26",                 label: "26",                 labelFa: "۲۶",         cat: "jashmal", level: 4, url: "/26",                 region: "kabbalah" },
  { id: "358",                label: "358",                labelFa: "۳۵۸",        cat: "jashmal", level: 4, url: "/358",                region: "kabbalah" },
  { id: "Entrelazamiento",    label: "Entrelazamiento",    labelFa: "درهم‌تنیدگی", cat: "jashmal", level: 4, url: "/entrelazamiento",    region: "science" },
  { id: "Serpiente de cobre", label: "Serpiente de cobre", labelFa: "مار مفرغی",   cat: "jashmal", level: 4, url: "/serpiente-de-cobre", region: "tanakh" },
  { id: "Sanador",            label: "Sanador",            labelFa: "شفادهنده",    cat: "jashmal", level: 4, url: "/sanador",            region: "tanakh" },
  { id: "Refael",             label: "Refael",             labelFa: "رِفائل",      cat: "jashmal", level: 4, url: "/refael",             region: "kabbalah" },
  { id: "Refuá",              label: "Refuá",              labelFa: "رِفوآه",      cat: "jashmal", level: 4, url: "/refua",              region: "tanakh" },
  { id: "Linaje",             label: "Linaje · Madres del Mashíaj", labelFa: "تبار · مادران ماشیح", cat: "jashmal", level: 4, url: "/linaje",             region: "kabbalah" },
  { id: "Bilaam",             label: "Bilaam",             labelFa: "بَلعام",      cat: "jashmal", level: 4, url: "/bilaam",             region: "tanakh" },

  // ── Estudio Mas'ei / Nombre de 42 / Ana BeKoaj (verificado por el Sofer) ──
  ...MASEI_NODES,
  // ── Brain v4: personajes bíblicos + dominios temáticos ──
  ...V4_NODES,
  // ── Sefirot que faltaban (Netzaj, Hod) para los 22 senderos ──
  ...TREE_NODES,
  // ── Estudios Birurim + Cuerdas de vanidad (verificado por el Sofer) ──
  ...STUDY2_NODES,
  // ── Estudios 3 oraciones · Sansón · Descensos de la Shejiná ──
  ...STUDY3_NODES,
  // ── Estudio 21 Pactos + Ehyé (21) → Biná (verificado por el Sofer) ──
  ...BRIT21_NODES,
  // ── Estudio Las Madres del Mashíaj (Tamar + Rut) (verificado por el Sofer) ──
  ...MADRES_NODES,
  // ── Estudio Tamar, Tohu y Tikún (las tres prendas → תֹהוּ) ──
  ...TOHU_NODES,
  ...AVRAHAM_KAB_NODES,
];

// ─── Aristas (relaciones reales, NO dirigidas). Se deduplican antes de render ─
const RAW_EDGES: [string, string][] = [
  // Torá (núcleo) → dominios (el corazón irriga todo)
  ["Torá", "Neviim"], ["Torá", "Ketuvim"], ["Torá", "Mishná"], ["Torá", "Talmud"], ["Torá", "Midrash"],
  ["Torá", "Cabalá"], ["Torá", "Jasidut"], ["Torá", "Halajá"], ["Torá", "Filosofía"], ["Torá", "Ciencia"],
  // Torá (núcleo) → sus 5 libros
  ["Torá", "Bereshit"], ["Torá", "Shemot"], ["Torá", "Vayikrá"], ["Torá", "Bamidbar"], ["Torá", "Devarim"],
  // Ketuvim → Tehilim (Salmos); Neviim/Ketuvim crecerán al expandirlos
  ["Ketuvim", "Tehilim"],
  // Bereshit → temas
  ["Bereshit", "Adam HaRishon"], ["Bereshit", "Javá"], ["Bereshit", "Najash"], ["Bereshit", "Gan Edén"],
  ["Bereshit", "Tzelem Elohim"], ["Bereshit", "Teshuvá"], ["Bereshit", "Akedá"], ["Bereshit", "Yosef"],
  ["Adam HaRishon", "Javá"], ["Adam HaRishon", "Tzelem Elohim"], ["Adam HaRishon", "Gan Edén"],
  ["Najash", "Gan Edén"], ["Najash", "Javá"],
  // Mishná / Talmud / Midrash
  ["Mishná", "Rosh Hashaná"], ["Talmud", "Berajot"], ["Talmud", "Mishná"], ["Midrash", "Bereshit Rabá"],
  ["Bereshit Rabá", "Bereshit"], ["Berajot", "Tehilim"],
  // Cabalá
  ["Cabalá", "Zohar"], ["Cabalá", "Etz Jaim"], ["Cabalá", "Tzimtzum"], ["Cabalá", "Shevirá"],
  ["Cabalá", "Keter"], ["Cabalá", "Mashíaj"],
  ["Zohar", "Najash"], ["Zohar", "Tiféret"], ["Etz Jaim", "Tzimtzum"], ["Etz Jaim", "Shevirá"],
  // Sefirot (Árbol)
  ["Keter", "Jojmá"], ["Keter", "Biná"], ["Jojmá", "Biná"], ["Jojmá", "Jésed"], ["Biná", "Guevurá"],
  ["Jésed", "Guevurá"], ["Jésed", "Tiféret"], ["Guevurá", "Tiféret"], ["Tiféret", "Yesod"],
  ["Yesod", "Maljut"], ["Tiféret", "Maljut"], ["Yesod", "Yosef"],
  // Letras
  ["Álef", "Torá"], ["Álef", "Keter"], ["Nun", "Sámej"], ["Nun", "Mashíaj"],
  // Jasidut
  ["Jasidut", "Tania"], ["Jasidut", "Baal Shem Tov"], ["Tania", "Zohar"], ["Tania", "Yesod"], ["Baal Shem Tov", "Teshuvá"],
  // Halajá / Filosofía
  ["Halajá", "Mishné Torá"], ["Mishné Torá", "Rambam-link?"],
  ["Filosofía", "Moré Nevujim"], ["Filosofía", "Kuzari"], ["Filosofía", "Maharal"],
  ["Moré Nevujim", "Tzelem Elohim"], ["Maharal", "Najash"],
  // Ciencia
  ["Ciencia", "Física"], ["Ciencia", "Matemática"], ["Ciencia", "Cosmología"],
  ["Ciencia", "Constante α"], ["Ciencia", "Entanglement"],
  ["Cosmología", "Tzimtzum"], ["Física", "Constante α"], ["Constante α", "137"],
  // Nivel 4 — misterios ↔ sus conceptos
  ["137", "Constante α"], ["137", "Álef"], ["137", "Tiféret"], ["137", "Zohar"], ["137", "Entrelazamiento"],
  ["Entrelazamiento", "Entanglement"], ["Entrelazamiento", "Jésed"], ["Entrelazamiento", "Guevurá"], ["Entrelazamiento", "Akedá"],
  ["Serpiente de cobre", "Najash"], ["Serpiente de cobre", "Bamidbar"], ["Serpiente de cobre", "Nes"],
  ["Serpiente de cobre", "Tiféret"], ["Serpiente de cobre", "Refuá"], ["Serpiente de cobre", "358"],
  ["358", "Mashíaj"], ["358", "Najash"], ["26", "Mashíaj"], ["26", "Tiféret"],
  ["Nes", "Nun"], ["Nes", "Sámej"], ["Nes", "Yosef"], ["Nes", "Tehilim"],
  ["Refuá", "Refael"], ["Refuá", "Sanador"], ["Refuá", "Tehilim"], ["Sanador", "Shemot"], ["Refael", "Bereshit Rabá"],
  ["Sanador", "Mishné Torá"], ["Linaje", "Mashíaj"], ["Linaje", "Yosef"], ["Bilaam", "Najash"], ["Bilaam", "Bamidbar"],
  // Estudio Mas'ei / Nombre de 42 / Ana BeKoaj (sólidas + interpretativas)
  ...MASEI_EDGES.map((e) => [e.a, e.b] as [string, string]),
  // Brain v4: personajes + temas
  ...V4_EDGES.map((e) => [e.a, e.b] as [string, string]),
  // Brain v4.1: los 22 senderos del Árbol (entre sefirot) — llevan las letras
  ...TREE_PATHS.map((p) => [p.from, p.to] as [string, string]),
  // Estudios Birurim + Cuerdas de vanidad
  ...STUDY2_EDGES.map((e) => [e.a, e.b] as [string, string]),
  // Estudios 3 oraciones · Sansón · Descensos de la Shejiná
  ...STUDY3_EDGES.map((e) => [e.a, e.b] as [string, string]),
  // Estudio 21 Pactos + Ehyé (21) → Biná
  ...BRIT21_EDGES.map((e) => [e.a, e.b] as [string, string]),
  // Estudio Las Madres del Mashíaj (Tamar + Rut)
  ...MADRES_EDGES.map((e) => [e.a, e.b] as [string, string]),
  // Estudio Tamar, Tohu y Tikún (las tres prendas → תֹהוּ)
  ...TOHU_EDGES.map((e) => [e.a, e.b] as [string, string]),
  ...AVRAHAM_KAB_EDGES.map((e) => [e.a, e.b] as [string, string]),
];

// dedup + descarta aristas a nodos inexistentes (p.ej. placeholders)
const NODE_IDS = new Set(BNODES.map((n) => n.id));
export const BEDGES: [string, string][] = (() => {
  const seen = new Set<string>();
  const out: [string, string][] = [];
  for (const [a, b] of RAW_EDGES) {
    if (a === b) continue;
    if (!NODE_IDS.has(a) || !NODE_IDS.has(b)) continue; // ignora placeholders
    const key = a < b ? `${a}|${b}` : `${b}|${a}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push([a, b]);
  }
  return out;
})();

// kind por arista (solid = fuente clásica / interp = lectura interpretativa).
// Permite distinguir AUTORIDAD de INTERPRETACIÓN en el render. Si una arista
// aparece como "solid" en cualquier estudio, gana solid. Las aristas crudas sin
// marca (RAW_EDGES estructurales) se consideran solid por defecto.
const _KINDED_EDGES: MaseiEdge[] = [
  ...MASEI_EDGES, ...V4_EDGES, ...STUDY2_EDGES, ...STUDY3_EDGES,
  ...BRIT21_EDGES, ...MADRES_EDGES, ...TOHU_EDGES, ...AVRAHAM_KAB_EDGES,
];
const EDGE_KIND = new Map<string, "solid" | "interp">();
for (const e of _KINDED_EDGES) {
  const k = e.a < e.b ? `${e.a}|${e.b}` : `${e.b}|${e.a}`;
  if (e.kind === "solid") EDGE_KIND.set(k, "solid");
  else if (!EDGE_KIND.has(k)) EDGE_KIND.set(k, "interp");
}
export function edgeKind(a: string, b: string): "solid" | "interp" {
  const k = a < b ? `${a}|${b}` : `${b}|${a}`;
  return EDGE_KIND.get(k) ?? "solid";
}

// ─── PRNG determinista ──────────────────────────────────────────────────
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

// ─── Anatomía: regiones (lóbulos) — centro + radios, en espacio normalizado ─
// Brain mira hacia +X (frontal adelante). Hemisferios en ±Z. La UNIÓN de
// estos elipsoides (espejados en Z) forma la silueta del cerebro en 3D.
export const BRAIN_SCALE = 3.5;

// ─────────────────────────────────────────────────────────────────────────
// UNIVERSO DEL CONOCIMIENTO — cada disciplina es una GALAXIA espiral.
// Torá = corazón en el origen; Tanaj = raíz/principio al centro-fondo; las
// demás disciplinas emanan a su alrededor (cuanto más lejos de la Torá, más
// afuera). layoutNodes coloca cada nodo en el disco de la galaxia de su
// categoría → cambia DÓNDE quedan los puntos (el look), pero las aristas, el
// foco, la búsqueda y todo lo demás siguen funcionando exactamente igual.
// ─────────────────────────────────────────────────────────────────────────
function hexToRgb01(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0, 2), 16) / 255, parseInt(h.slice(2, 4), 16) / 255, parseInt(h.slice(4, 6), 16) / 255];
}
// dirección normalizada del centro de cada galaxia (≈radio 0..1) — emanación 3D
const GALAXY_DIR: Record<string, [number, number, number]> = {
  torah:      [0, 0.04, -0.38],    // Torá comparte la MISMA galaxia que Tanaj (su núcleo)
  tanakh:     [0, 0.04, -0.38],    // raíz / principio: la galaxia central (Torá en su núcleo)
  figure:     [0.92, 0.12, 0.28],  // las demás, repartidas parejo en una esfera
  tema:       [-0.88, 0.18, 0.30],
  talmud:     [0.58, 0.62, -0.52],
  mishnah:    [0.22, 0.78, 0.55],
  midrash:    [-0.55, 0.55, -0.62],
  halakhah:   [-0.42, 0.82, 0.30],
  kabbalah:   [0.95, -0.32, -0.22],
  chasidut:   [-0.92, -0.38, -0.20],
  philosophy: [0.38, -0.62, 0.70],
  science:    [-0.34, -0.70, -0.58],
  jashmal:    [0.52, -0.28, 0.82],
};
export const GALAXY_CATS = Object.keys(GALAXY_DIR).filter((c) => c !== "torah");
const GALAXY_SPREAD = 6.4 * BRAIN_SCALE;   // separación entre galaxias (bien apartadas)
export const GALAXY_DISK = 1.45 * BRAIN_SCALE; // radio del disco (estrellas con MÁS aire para clicar)
const GALAXY_TWIST = 2.4;                   // vueltas de la espiral

export function galaxyCenter(cat: string): [number, number, number] {
  const d = GALAXY_DIR[cat] ?? GALAXY_DIR.tema;
  return [d[0] * GALAXY_SPREAD, d[1] * GALAXY_SPREAD, d[2] * GALAXY_SPREAD];
}
export function galaxyColor(cat: string): [number, number, number] {
  return hexToRgb01(BRAIN_CATS[cat]?.c ?? "#9a9aae");
}
// base ortonormal (u,v) + normal del disco de cada galaxia → inclinación 3D determinista
function galaxyBasis(cat: string): { u: [number, number, number]; v: [number, number, number]; n: [number, number, number] } {
  const h = hashStr(cat) >>> 0;
  const a = ((h % 1000) / 1000) * Math.PI * 2;
  const b = (((h >>> 10) % 1000) / 1000) * Math.PI;
  let nx = Math.sin(b) * Math.cos(a), ny = Math.cos(b), nz = Math.sin(b) * Math.sin(a);
  const nl = Math.hypot(nx, ny, nz) || 1; nx /= nl; ny /= nl; nz /= nl;
  const up: [number, number, number] = Math.abs(ny) > 0.9 ? [1, 0, 0] : [0, 1, 0];
  let ux = ny * up[2] - nz * up[1], uy = nz * up[0] - nx * up[2], uz = nx * up[1] - ny * up[0];
  const ul = Math.hypot(ux, uy, uz) || 1; ux /= ul; uy /= ul; uz /= ul;
  const vx = ny * uz - nz * uy, vy = nz * ux - nx * uz, vz = nx * uy - ny * ux;
  return { u: [ux, uy, uz], v: [vx, vy, vz], n: [nx, ny, nz] };
}
// un punto en el disco espiral de una galaxia (rng determinista por nodo/polvo)
function galaxyPoint(cat: string, rng: () => number, radPow = 0.62, radScale = 1, thickK = 0.12): [number, number, number] {
  const c = galaxyCenter(cat);
  const { u, v, n } = galaxyBasis(cat);
  const arms = 2 + (hashStr(cat) % 2); // 2 o 3 brazos
  const radN = 0.10 + Math.pow(rng(), radPow) * 0.98;
  const rad = GALAXY_DISK * radN * radScale;
  const arm = Math.floor(rng() * arms);
  const theta = radN * GALAXY_TWIST * Math.PI + arm * ((Math.PI * 2) / arms) + (rng() - 0.5) * 0.7;
  const cs = Math.cos(theta), sn = Math.sin(theta);
  // VOLUMEN: bulbo 3D al centro + disco esponjoso (campana vertical, no plano).
  // El grosor crece hacia el núcleo (bulbo) y se afina en los brazos.
  const bulge = (1 - Math.min(radN, 1)) * (1 - Math.min(radN, 1));
  const vmax = GALAXY_DISK * (thickK + 0.55 * bulge);
  const thick = (rng() + rng() - 1) * vmax; // ~gaussiana: mucho al centro, poco al borde
  return [
    c[0] + (u[0] * cs + v[0] * sn) * rad + n[0] * thick,
    c[1] + (u[1] * cs + v[1] * sn) * rad + n[1] * thick,
    c[2] + (u[2] * cs + v[2] * sn) * rad + n[2] * thick,
  ];
}

type Region = { c: [number, number, number]; r: [number, number, number]; hemi: boolean };
// Una sola ESFERA limpia (decisión de Mardan: olvidar la forma de cerebro).
// Todas las "regiones" son la misma esfera centrada en el origen → la unión es
// una esfera uniforme. El núcleo (Torá) es una esfera interior más pequeña.
const SPHERE_R = 1.45;
export const REGIONS: Record<string, Region> = {
  core:       { c: [0, 0, 0], r: [0.42, 0.42, 0.42], hemi: false }, // Torá (corazón interior)
  frontal:    { c: [0, 0, 0], r: [SPHERE_R, SPHERE_R, SPHERE_R], hemi: false },
  parietal:   { c: [0, 0, 0], r: [SPHERE_R, SPHERE_R, SPHERE_R], hemi: false },
  temporal:   { c: [0, 0, 0], r: [SPHERE_R, SPHERE_R, SPHERE_R], hemi: false },
  occipital:  { c: [0, 0, 0], r: [SPHERE_R, SPHERE_R, SPHERE_R], hemi: false },
  cerebellum: { c: [0, 0, 0], r: [SPHERE_R, SPHERE_R, SPHERE_R], hemi: false },
  stem:       { c: [0, 0, 0], r: [SPHERE_R, SPHERE_R, SPHERE_R], hemi: false },
};

// Categoría → región primaria
export const CAT_REGION: Record<string, string> = {
  torah: "core",
  tanakh: "frontal",
  philosophy: "frontal",
  mishnah: "parietal",
  talmud: "parietal",
  halakhah: "cerebellum",
  midrash: "temporal",
  chasidut: "temporal",
  kabbalah: "occipital",
  science: "occipital",
  jashmal: "frontal",
  figure: "frontal",
  tema: "parietal",
};

// ─── Brain v4 · Arquitectura cognitiva sefirótica (coordenadas OCULTAS) ────
// Las sefirot NO se dibujan (el cerebro sigue siendo cerebro). Son anclas de
// "gravedad blanda": un concepto con afinidad sefirótica se acerca a su ancla,
// así los de cualidad parecida se agrupan — emergencia con sentido, sin Árbol.
// Anclas en espacio normalizado (×BRAIN_SCALE), repartidas en 3D con variación
// de profundidad (X) para que NUNCA formen un árbol plano visible.
export const SEFIRA_ANCHORS: Record<string, [number, number, number]> = {
  Keter:     [0.35, 1.45, 0.05],
  "Jojmá":   [1.25, 0.95, 0.85],
  "Biná":    [0.95, 0.95, -0.9],
  Daat:      [0.25, 0.55, 0.1],
  "Jésed":   [0.55, 0.15, 1.15],
  "Guevurá": [0.4, 0.15, -1.15],
  "Tiféret": [0.6, 0.05, 0.0],
  Netzaj:    [-1.15, -0.35, 0.95],
  Hod:       [-1.25, -0.35, -0.95],
  Yesod:     [-0.35, -0.85, 0.1],
  "Maljut":  [-1.75, -1.1, 0.25],
};

// Afinidad sefirótica por nodo (1+). Lo demás queda en su región (neutral).
export const SEFIRA_AFFINITY: Record<string, string[]> = {
  Keter: ["Keter"], "Jojmá": ["Jojmá"], "Biná": ["Biná"], "Jésed": ["Jésed"],
  "Guevurá": ["Guevurá"], "Tiféret": ["Tiféret"], Yesod: ["Yesod"], "Maljut": ["Maljut"],
  Netzaj: ["Netzaj"], Hod: ["Hod"],
  Tzimtzum: ["Keter"], "Mashíaj": ["Yesod", "Maljut"], "Teshuvá": ["Biná"],
  Zohar: ["Tiféret"], "Etz Jaim": ["Jojmá"], Tania: ["Daat"],
  "Mishné Torá": ["Guevurá", "Tiféret"], "Moré Nevujim": ["Biná"],
  Yosef: ["Yesod"], "Akedá": ["Guevurá"], "Gan Edén": ["Tiféret"], Najash: ["Guevurá"],
  Shevirá: ["Guevurá"], "Nombre de 42": ["Tiféret"], "Ana BeKoaj": ["Tiféret"],
  Tikún: ["Tiféret"], "Arvot Moav": ["Maljut"], Birur: ["Yesod"],
  // Brain v4 — personajes (siete pastores, Pataj Eliyahu / Tikunei Zohar 17a)
  Noaj: ["Yesod"], Avraham: ["Jésed"], "Sará": ["Maljut"], Yitzjak: ["Guevurá"],
  "Rivká": ["Guevurá"], Yaakov: ["Tiféret"], Rajel: ["Maljut"], "Leá": ["Biná"],
  "Moshé": ["Netzaj"], "Aharón": ["Hod"], Miriam: ["Netzaj"], "Yehoshúa": ["Hod"],
  David: ["Maljut"], "Shlomó": ["Maljut"], Eliyahu: ["Yesod"], Yeshayahu: ["Tiféret"],
  // Brain v4 — temas
  "Briá": ["Jojmá"], "Neshamá": ["Tiféret"], "Nevuá": ["Netzaj", "Hod"], Malajim: ["Hod"],
  "Gueulá": ["Yesod", "Maljut"], Galut: ["Maljut"], "Eretz Israel": ["Maljut"],
  "Bet HaMikdash": ["Maljut"], "Tefilá": ["Maljut"], Shabat: ["Maljut"],
  "Yirá": ["Guevurá"], "Ahavá": ["Jésed"], Brit: ["Yesod"], "Shejiná": ["Maljut"],
  // Brain — estudios Birurim + Cuerdas de vanidad
  Arad: ["Guevurá"], Kelipot: ["Guevurá"], "Yetzer Hará": ["Guevurá"],
  "Ratzón": ["Keter"], "Koaj HaMedameh": ["Hod"], "Reshimó": ["Keter"],
  // Brain — estudios 3 oraciones · Sansón · Descensos de la Shejiná
  Shimshon: ["Guevurá"], Ester: ["Maljut"], "Dagón": ["Guevurá"], "Sinaí": ["Tiféret"],
  Itaruta: ["Yesod"], "Tres oraciones": ["Tiféret"], "Sansón": ["Guevurá"],
  "Descensos de la Shejiná": ["Maljut"],
  // Brain — estudio 21 Pactos + Ehyé (21) → Biná
  "21 Pactos": ["Biná"], "Ehyé": ["Biná", "Keter"], "Ehyé Asher Ehyé": ["Keter"],
  YHVH: ["Tiféret"], Adonai: ["Maljut"], "Brit Milá": ["Yesod"], "Pacto de Noé": ["Maljut"],
  "Pacto davídico": ["Maljut"], "Nuevo Pacto": ["Biná"], "Pacto de sal": ["Guevurá"],
  "Brit Shalom": ["Guevurá", "Tiféret"], "Arcoíris": ["Maljut"],
  // Brain — estudio Las Madres del Mashíaj (Tamar + Rut)
  Tamar: ["Yesod", "Maljut"], Rut: ["Maljut"], "Betsabé": ["Maljut"], "Naamá": ["Maljut"],
  "Yehudá": ["Maljut"], Fares: ["Yesod"], "Averá Lishmah": ["Daat"],
  // Brain — estudio Tamar, Tohu y Tikún (las tres prendas → תֹהוּ)
  Tohu: ["Guevurá"], Sello: ["Maljut"], "Cordón": ["Biná"], "Bastón": ["Tiféret"],
};
const SEFIRA_PULL = 0.25; // jalón hacia el ancla (suavizado: agrupa sin amontonar)

// Gravedad conceptual hacia el centro, por nivel. REDUCIDA (Brain v4): antes
// amontonaba todo al centro; ahora los conceptos se reparten por el volumen.
const LEVEL_GRAVITY: Record<number, number> = { 0: 1.0, 1: 0.34, 2: 0.12, 3: 0.05, 4: 0.03 };

// muestrea un punto dentro de un elipsoide (sesgado hacia la corteza/superficie)
// radMin/radSpread/radPow permiten empujar los nodos con nombre hacia los bordes
// (más legibles) SIN tocar el tejido latente, que llama con los valores por defecto.
function sampleInRegion(
  reg: Region,
  rng: () => number,
  hemiSign: number,
  radMin = 0.42,
  radSpread = 0.7,
  radPow = 0.5,
): [number, number, number] {
  // dirección aleatoria uniforme en la esfera
  let dx = rng() * 2 - 1, dy = rng() * 2 - 1, dz = rng() * 2 - 1;
  const dl = Math.hypot(dx, dy, dz) || 1; dx /= dl; dy /= dl; dz /= dl;
  // radio: llena desde el interior medio hasta un poco más allá de la corteza
  // (Brain v4.1: rellenar más volumen y los alrededores con tejido latente)
  const rad = radMin + Math.pow(rng(), radPow) * radSpread;
  const cz = reg.hemi ? reg.c[2] * hemiSign : reg.c[2];
  return [
    (reg.c[0] + dx * reg.r[0] * rad) * BRAIN_SCALE,
    (reg.c[1] + dy * reg.r[1] * rad) * BRAIN_SCALE,
    (cz + dz * reg.r[2] * rad) * BRAIN_SCALE,
  ];
}

// ─── Layout de los nodos semánticos (determinista por id) ───────────────
// Acepta CUALQUIER lista de nodos (estática o traída de la BD) → así el
// cerebro puede crecer y los nodos nuevos se ubican automáticamente.
export function layoutNodes(nodes: BNode[]): Record<string, [number, number, number]> {
  const out: Record<string, [number, number, number]> = {};
  nodes.forEach((n, i) => {
    if (n.level === 0) { out[n.id] = galaxyCenter("tanakh"); return; } // Torá = núcleo de la galaxia Tanaj
    const cat = GALAXY_DIR[n.cat] ? n.cat : "tema";
    const seed = (hashStr(n.id) ^ ((i + 1) * 0x9e3779b1)) >>> 0;
    const rng = mulberry32(seed);
    // nivel: los hubs (nivel 1) cerca del núcleo de su galaxia; los conceptos hacia afuera
    const radScale = n.level <= 1 ? 0.30 : n.level === 2 ? 0.62 : n.level === 3 ? 0.85 : 1.0;
    out[n.id] = galaxyPoint(cat, rng, 0.62, radScale, 0.34);
  });
  return out;
}

// Back-compat: layout de la semilla estática.
export function brainLayout(): Record<string, [number, number, number]> {
  return layoutNodes(BNODES);
}

// Vecinos / grados a partir de una lista de aristas arbitraria (dinámica).
export function neighborsIn(edges: [string, string][], id: string): Set<string> {
  const s = new Set<string>();
  for (const [a, b] of edges) {
    if (a === id) s.add(b);
    if (b === id) s.add(a);
  }
  return s;
}
export function degreesIn(nodes: BNode[], edges: [string, string][]): Record<string, number> {
  const deg: Record<string, number> = {};
  nodes.forEach((n) => (deg[n.id] = 0));
  edges.forEach(([a, b]) => {
    if (deg[a] !== undefined) deg[a]++;
    if (deg[b] !== undefined) deg[b]++;
  });
  return deg;
}

// ─── Lista de adyacencia ──────────────────────────────────────────────────
function buildAdj(edges: [string, string][]): Map<string, string[]> {
  const adj = new Map<string, string[]>();
  const add = (a: string, b: string) => {
    const l = adj.get(a);
    if (l) l.push(b);
    else adj.set(a, [b]);
  };
  for (const [a, b] of edges) { add(a, b); add(b, a); }
  return adj;
}

// Distancia (nº de saltos) desde un nodo a todos los demás (BFS).
// Capa 1 = primaria, 2 = secundaria, 3 = terciaria… → visibilidad jerárquica.
export function bfsDistances(edges: [string, string][], start: string): Map<string, number> {
  const adj = buildAdj(edges);
  const dist = new Map<string, number>([[start, 0]]);
  let frontier = [start];
  let d = 0;
  while (frontier.length) {
    d++;
    const next: string[] = [];
    for (const u of frontier)
      for (const v of adj.get(u) ?? []) {
        if (!dist.has(v)) { dist.set(v, d); next.push(v); }
      }
    frontier = next;
    if (d > 16) break;
  }
  return dist;
}

// Camino más corto entre dos nodos (lista de ids); [] si no hay. → "Camino a la Torá".
export function shortestPath(edges: [string, string][], from: string, to: string): string[] {
  if (from === to) return [from];
  const adj = buildAdj(edges);
  const prev = new Map<string, string | null>([[from, null]]);
  let frontier = [from];
  while (frontier.length && !prev.has(to)) {
    const next: string[] = [];
    for (const u of frontier)
      for (const v of adj.get(u) ?? []) {
        if (!prev.has(v)) { prev.set(v, u); next.push(v); }
      }
    frontier = next;
  }
  if (!prev.has(to)) return [];
  const path: string[] = [];
  let c: string | null = to;
  while (c != null) { path.unshift(c); c = prev.get(c) ?? null; }
  return path;
}

// ─── Tejido ambiental: sinapsis decorativas que dan masa/forma al cerebro ──
// Puntos tenues dentro de la unión de los lóbulos (ambos hemisferios).
// Devuelve { positions: Float32Array(n*3), colors: Float32Array(n*3) }.
export function ambientTissue(count: number, seed = 7): { positions: Float32Array; colors: Float32Array } {
  const rng = mulberry32(seed >>> 0);
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const cats = GALAXY_CATS;
  // El polvo dibuja las galaxias mismas: cada punto cae en el disco espiral de
  // una galaxia y toma el color (atenuado) de su dominio → nebulosas vivas.
  for (let i = 0; i < count; i++) {
    const cat = cats[Math.floor(rng() * cats.length)];
    const p = galaxyPoint(cat, rng, 0.55, 1.08, 0.40); // polvo: más volumen que los nodos
    positions[i * 3] = p[0];
    positions[i * 3 + 1] = p[1];
    positions[i * 3 + 2] = p[2];
    const col = galaxyColor(cat);
    const b = 0.30 + rng() * 0.55; // brillo variable del polvo
    colors[i * 3] = col[0] * b;
    colors[i * 3 + 1] = col[1] * b;
    colors[i * 3 + 2] = col[2] * b;
  }
  return { positions, colors };
}

// ─── Nodos POTENCIALES: chispas aún no realizadas (Tikún incompleto) ──────
// Llenan una esfera MÁS GRANDE que los nodos reales, dejando zonas oscuras
// con potencial entre ellas. No son interactivos: sugieren "hay lugar para
// crecer" — la luz que aún no se ha recogido. Distribución de volumen
// (cbrt → densidad pareja) en una cáscara desde el cloud real hacia afuera.
export function potentialNodes(count: number, seed = 23): Float32Array {
  const rng = mulberry32(seed >>> 0);
  const positions = new Float32Array(count * 3);
  const rMin = 1.6 * BRAIN_SCALE;  // empieza fuera del centro (espacio entre galaxias)
  const rMax = 7.2 * BRAIN_SCALE;  // llena el espacio profundo alrededor de las galaxias
  for (let i = 0; i < count; i++) {
    // dirección uniforme en la esfera
    const u = rng() * 2 - 1;          // cos(theta)
    const phi = rng() * Math.PI * 2;
    const s = Math.sqrt(1 - u * u);
    // radio sesgado por volumen para repartir parejo (más afuera = más espacio)
    const r = rMin + (rMax - rMin) * Math.cbrt(rng());
    positions[i * 3]     = s * Math.cos(phi) * r;
    positions[i * 3 + 1] = s * Math.sin(phi) * r;
    positions[i * 3 + 2] = u * r;
  }
  return positions;
}

// ─── Utilidades de grafo ────────────────────────────────────────────────
export function nodeDegrees(): Record<string, number> {
  const deg: Record<string, number> = {};
  BNODES.forEach((n) => (deg[n.id] = 0));
  BEDGES.forEach(([a, b]) => { deg[a]++; deg[b]++; });
  return deg;
}
export function neighborsOf(id: string): Set<string> {
  const s = new Set<string>();
  BEDGES.forEach(([a, b]) => { if (a === id) s.add(b); if (b === id) s.add(a); });
  return s;
}
export function nodeById(id: string): BNode | undefined {
  return BNODES.find((n) => n.id === id);
}
