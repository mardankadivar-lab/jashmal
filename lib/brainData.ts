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
  { id: "Linaje",             label: "Linaje",             labelFa: "تبار",        cat: "jashmal", level: 4, url: "/linaje",             region: "kabbalah" },
  { id: "Bilaam",             label: "Bilaam",             labelFa: "بَلعام",      cat: "jashmal", level: 4, url: "/bilaam",             region: "tanakh" },

  // ── Estudio Mas'ei / Nombre de 42 / Ana BeKoaj (verificado por el Sofer) ──
  ...MASEI_NODES,
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
export const BRAIN_SCALE = 3.0;
type Region = { c: [number, number, number]; r: [number, number, number]; hemi: boolean };
export const REGIONS: Record<string, Region> = {
  core:       { c: [0.1, 0.1, 0.0],   r: [0.55, 0.5, 0.5],  hemi: false }, // Torá (centro profundo)
  frontal:    { c: [1.7, 0.45, 0.7],  r: [1.05, 0.95, 0.6], hemi: true },  // adelante-arriba
  parietal:   { c: [-0.1, 1.05, 0.65],r: [1.0, 0.78, 0.6],  hemi: true },  // arriba-atrás
  temporal:   { c: [0.7, -0.6, 1.0],  r: [1.1, 0.55, 0.5],  hemi: true },  // costado-abajo
  occipital:  { c: [-1.75, 0.35, 0.6],r: [0.85, 0.85, 0.6], hemi: true },  // atrás
  cerebellum: { c: [-1.85, -0.95, 0.5],r: [0.72, 0.5, 0.48],hemi: true },  // atrás-abajo
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
};

// Gravedad conceptual: cuánto se acerca al centro según el nivel
// (nivel bajo = más cerca de la Torá)
const LEVEL_GRAVITY: Record<number, number> = { 0: 1.0, 1: 0.55, 2: 0.34, 3: 0.16, 4: 0.07 };

// muestrea un punto dentro de un elipsoide (sesgado hacia la corteza/superficie)
function sampleInRegion(reg: Region, rng: () => number, hemiSign: number): [number, number, number] {
  // dirección aleatoria uniforme en la esfera
  let dx = rng() * 2 - 1, dy = rng() * 2 - 1, dz = rng() * 2 - 1;
  const dl = Math.hypot(dx, dy, dz) || 1; dx /= dl; dy /= dl; dz /= dl;
  // radio sesgado hacia la corteza (superficie más densa): r in [0.55, 1]
  const rad = 0.55 + Math.pow(rng(), 0.45) * 0.45;
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
  const center: [number, number, number] = [0.1 * BRAIN_SCALE, 0.1 * BRAIN_SCALE, 0];
  nodes.forEach((n, i) => {
    if (n.level === 0) { out[n.id] = center; return; }
    const regKey = n.region ?? CAT_REGION[n.cat] ?? "frontal";
    const reg = REGIONS[regKey] ?? REGIONS.frontal;
    const seed = (hashStr(n.id) ^ ((i + 1) * 0x9e3779b1)) >>> 0;
    const rng = mulberry32(seed);
    const hemiSign = (hashStr(n.id) & 1) ? 1 : -1;
    const p = sampleInRegion(reg, rng, hemiSign);
    // gravedad conceptual: acerca al centro según nivel
    const g = LEVEL_GRAVITY[n.level] ?? 0.1;
    out[n.id] = [
      p[0] + (center[0] - p[0]) * g,
      p[1] + (center[1] - p[1]) * g,
      p[2] + (center[2] - p[2]) * g,
    ];
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
  const regKeys = Object.keys(REGIONS).filter((k) => k !== "core");
  // color base tenue del tejido (azul-cian frío)
  for (let i = 0; i < count; i++) {
    const reg = REGIONS[regKeys[Math.floor(rng() * regKeys.length)]];
    const hemiSign = rng() < 0.5 ? 1 : -1;
    const p = sampleInRegion(reg, rng, hemiSign);
    positions[i * 3] = p[0];
    positions[i * 3 + 1] = p[1];
    positions[i * 3 + 2] = p[2];
    // tinte frío con leve variación
    const t = rng();
    colors[i * 3] = 0.18 + t * 0.10;       // R
    colors[i * 3 + 1] = 0.34 + t * 0.16;   // G
    colors[i * 3 + 2] = 0.60 + t * 0.30;   // B
  }
  return { positions, colors };
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
