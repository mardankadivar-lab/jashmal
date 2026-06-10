// ─────────────────────────────────────────────────────────────────────────
// gilgul.ts — CAPA GILGUL del Universo (linaje de almas, Sha'ar HaGilgulim)
//
// El gilgul NO es una relación de conocimiento (arista del grafo). Es un
// LINAJE TEMPORAL-ESPIRITUAL: una raíz de alma que transmite su chispa de una
// vasija (personaje) a otra a través de las generaciones.
//
// Este archivo es SOLO DATOS + helpers. No renderiza nada. El render vive en
// app/[locale]/mente-cosmica/GilgulLayer.tsx y consume `getGilgulModel()`.
//
// PUNTO DE INGESTA DEL SOFER (editor-erudito):
//   El Sofer está preparando el dataset verificado de gilgulim (cadenas de alma
//   con fuente exacta de Sha'ar HaGilgulim y nivel de certeza). Cuando esté
//   listo, se REEMPLAZA el contenido de `SOFER_GILGUL_LINKS` (abajo) — y NADA
//   del render cambia. Todos los `from`/`to` deben ser ids de BNode existentes
//   en lib/brainData.ts (o nodos nuevos que el Sofer agregue allí).
// ─────────────────────────────────────────────────────────────────────────

import { GILGUL_CAIN_HEVEL_EDGES, type BNode } from "@/lib/nodes/brainData";

// ── Modelo de datos ────────────────────────────────────────────────────────

// Certeza de una transmisión de alma (define el color del sendero):
//   "direct"      — declaración explícita y localizada en Sha'ar HaGilgulim → dorado
//   "traditional" — atribución tradicional / asociación no literal       → ámbar intermedio
//   "gematria"    — inferencia por gematría / permutación de letras       → sendero azul-plata
export type GilgulConfidence = "direct" | "traditional" | "gematria";

// Una transmisión: la chispa salta de `from` a `to`.
// Multi-chispa = varios GilgulLink saliendo del MISMO `from` (el alma se divide
// en streams). El render dibuja esa división automáticamente.
export type GilgulLink = {
  from: string;          // id de BNode (vasija anterior)
  to: string;            // id de BNode (vasija siguiente)
  source: string;        // referencia exacta: "Sha'ar HaGilgulim 34:0", etc.
  confidence: GilgulConfidence;
  era?: string;          // época histórica del DESTINO (para la Fase 2: línea de tiempo)
  // multi-chispa: el alma se DIVIDE aquí (varias chispas / vasijas que confluyen o
  // brotan del mismo nodo). Marca explícita del Sofer (ej. Pinjás = 4 chispas).
  // Visualmente ya emerge de que varios links comparten `from`; este flag lo
  // documenta para tooltips/Fase 2 (coreografía de bifurcación).
  multichispa?: boolean;
  // dato opcional para el tooltip de gematría (solo cuando confidence === "gematria").
  // `shared` = raíz común (igualdad/anagrama). `rule` = regla de transformación de
  // letras (ej. at-bash) cuando NO hay igualdad numérica — el tooltip muestra la
  // regla en vez de un empate falso (caso Yoav→Yoash: יואב=19 ≠ יואש=317, at-bash).
  gematria?: { aName: string; aValue: number; bName: string; bValue: number; shared?: number; rule?: string };
  note?: string;         // glosa breve (es) para el tooltip / la tarjeta
  noteFa?: string;       // glosa breve (fa)
};

// Una cadena/raíz de alma con nombre (lo que se "invoca" al buscar "X + gilgul").
export type GilgulChain = {
  id: string;            // clave estable (ej. "abel")
  root: string;          // id de BNode de la raíz del alma (ej. "Abel")
  label: string;         // nombre de la raíz (es)
  labelFa: string;       // nombre de la raíz (fa)
  labelEn: string;       // nombre de la raíz (en)
  source: string;        // tratado base (Sha'ar HaGilgulim)
  provisional?: boolean; // true = cadena de muestra, se reemplaza por dataset del Sofer
  links: GilgulLink[];   // las transmisiones de ESTA raíz
};

// ── Catálogo de épocas (para etiquetar `era`; usado en Fase 2) ──────────────
// Orden histórico → la línea de tiempo de la Fase 2 avanza por este índice.
export const GILGUL_ERAS: { id: string; label: string; labelFa: string; labelEn: string; order: number }[] = [
  { id: "bereshit",  label: "Génesis",          labelFa: "آفرینش",        labelEn: "Genesis",        order: 0 },
  { id: "mabul",     label: "El Diluvio",       labelFa: "توفان",         labelEn: "The Flood",      order: 1 },
  { id: "avot",      label: "Los Patriarcas",   labelFa: "نیاکان",        labelEn: "The Patriarchs", order: 2 },
  { id: "shemot",    label: "Éxodo · Sinaí",    labelFa: "خروج · سینا",   labelEn: "Exodus · Sinai", order: 3 },
  { id: "shoftim",   label: "Jueces y Reyes",   labelFa: "داوران و پادشاهان", labelEn: "Judges & Kings", order: 4 },
  { id: "neviim",    label: "Los Profetas",     labelFa: "پیامبران",      labelEn: "The Prophets",   order: 5 },
  { id: "talmud",    label: "Era Talmúdica",    labelFa: "دوران تلمود",   labelEn: "Talmudic Era",   order: 6 },
];

// ─────────────────────────────────────────────────────────────────────────
// SEMILLA — derivada de la data VERIFICADA del Sofer (Caín y Abel).
//
// La fuente de verdad de la verificación vive en brainData.ts
// (GILGUL_CAIN_HEVEL_EDGES: cada arista trae su localización ShG en el comentario
// y su `kind` solid/interp). Aquí declaramos el ORDEN DE LINAJE y la FUENTE
// legible — porque una arista de grafo no dice "primero Shet, luego Nóaj".
//
// Marcamos la certeza así:
//   - Transmisiones explícitas y localizadas en ShG → "direct".
//   - Las que el Sofer marcó como gematría (נח=חן, etc.)  → "gematria".
//   - Asociaciones / lecturas                            → "traditional".
// Todos los `from`/`to` son ids de BNode reales (confirmado).
// ─────────────────────────────────────────────────────────────────────────

// Raíz de ABEL (Hevel) — lado del jésed. La línea principal de transmisión.
const ABEL_LINKS: GilgulLink[] = [
  {
    from: "Abel", to: "Shet", source: "Sha'ar HaGilgulim, Hakdamá 34:0 / 29:8",
    confidence: "direct", era: "bereshit",
    note: "El alma de Hevel pasa a Shet, hijo de Adam.",
    noteFa: "روحِ هابیل به شیت، فرزند آدم، منتقل می‌شود.",
  },
  {
    from: "Shet", to: "Noaj", source: "Sha'ar HaGilgulim, Hakdamá 34:0",
    confidence: "direct", era: "mabul",
    note: "La chispa continúa en Nóaj (Hevel→Shet→Nóaj→Shem→Moshé).",
    noteFa: "جرقه در نوح ادامه می‌یابد (هابیل→شیت→نوح→شیم→موشه).",
  },
  {
    from: "Noaj", to: "Moshé", source: "Sha'ar HaGilgulim, Hakdamá 34:0",
    confidence: "gematria", era: "shemot",
    gematria: { aName: "נח", aValue: 58, bName: "חן", bValue: 58, shared: 58 },
    note: "Nóaj (נח) = Jen (חן) = 58; la raíz del jésed llega a Moshé.",
    noteFa: "نوح (נח) = حِن (חן) = ۵۸؛ ریشهٔ خِسِد به موشه می‌رسد.",
  },
  // (Auditoría Sofer 2026-06-06: ELIMINADOS de la raíz de Abel dos links erróneos —
  //  Moshé→Egipcio Ex2 [el egipcio es el LADO MALO de CAÍN, no gilgul de Moshé:
  //  ShG 32:18, 36:100; la relación correcta Caín→Egipcio ya existe] y Abel→Naval
  //  [Naval es de la raíz oscura de Laván, נבל=לבן=82: ShG 36:76,103]. Ver
  //  SOFER_DARK_LINKS para el linaje correcto Laván→Bilaam→Naval.)
];

// Raíz de CAÍN (Kayin) — lado de la guevurá. Se divide en MUCHAS vasijas.
const CAIN_LINKS: GilgulLink[] = [
  {
    from: "Caín", to: "Yitró", source: "Sha'ar HaGilgulim, Hakdamá 33:7",
    confidence: "direct", era: "shemot",
    note: "El lado BUENO de Caín se rectifica en Yitró.",
    noteFa: "سویِ نیکِ قائن در یترو اصلاح می‌شود.",
  },
  {
    from: "Caín", to: "Kóraj", source: "Sha'ar HaGilgulim, Hakdamá 33:7",
    confidence: "direct", era: "shemot",
    note: "El lado NO rectificado de Caín (la guevurá del din) cae en Kóraj.",
    noteFa: "سویِ اصلاح‌نشدهٔ قائن (گبورای دین) در قورح می‌افتد.",
  },
  {
    from: "Caín", to: "Rabí Akiva", source: "Sha'ar HaGilgulim, Hakdamá 34:7",
    confidence: "direct", era: "talmud",
    note: "Rabí Akiva endulza la guevurá de Caín → la convierte en jésed.",
    noteFa: "ربی عقیوا گبورای قائن را شیرین می‌کند → به خِسِد بدل می‌شود.",
  },
  {
    from: "Caín", to: "Shmuel HaNavi", source: "Sha'ar HaGilgulim, Hakdamá 33:7 / 33:6",
    confidence: "direct", era: "neviim",
    note: "Shmuel HaNaví participa de la rectificación de Caín.",
    noteFa: "شموئل نبی در اصلاحِ قائن سهیم است.",
  },
  {
    from: "Caín", to: "Jizkiyahu", source: "Sha'ar HaGilgulim, Hakdamá 31:4 / 31:10",
    confidence: "direct", era: "neviim",
    note: "El rey Jizkiyahu (Ezequías) de la raíz de Caín.",
    noteFa: "پادشاه حِزقیاهو از ریشهٔ قائن.",
  },
  {
    from: "Caín", to: "Yejezkel", source: "Sha'ar HaGilgulim, Hakdamá 35:11",
    confidence: "direct", era: "neviim",
    note: "El profeta Yejezkel (Ezequiel) de la raíz de Caín.",
    noteFa: "یِحِزقیئلِ نبی از ریشهٔ قائن.",
  },
  {
    from: "Caín", to: "Nadav-Avihu", source: "Sha'ar HaGilgulim, Hakdamá 33:2-3 / 32:1",
    confidence: "direct", era: "shemot",
    note: "Nadav y Avihú, hijos de Aharón, de la raíz de Caín.",
    noteFa: "ناداو و اَبیهو، پسران اهرون، از ریشهٔ قائن.",
  },
  // Cadena secundaria dentro de la raíz de Caín: el ibur en Pinjás → Eliyahu.
  {
    from: "Nadav-Avihu", to: "Pinjás", source: "Sha'ar HaGilgulim, Hakdamá 33:6",
    confidence: "direct", era: "neviim",
    note: "Las almas de Nadav y Avihú se enviste (ibur) en Pinjás.",
    noteFa: "ارواحِ ناداو و اَبیهو در پینحاس جامه (عیبور) می‌پوشند.",
  },
  {
    from: "Pinjás", to: "Eliyahu", source: "Sha'ar HaGilgulim, Hakdamá 33:6",
    confidence: "direct", era: "neviim",
    note: "Pinjás es Eliyahu HaNaví.",
    noteFa: "پینحاس همان الیاهوی نبی است.",
  },
];

// ═════════════════════════════════════════════════════════════════════════
// >>> DATASET DEL SOFER — VERIFICADO <<<
// Las 5 CADENAS-ANCLA del Sha'ar HaGilgulim (Hakdamot 32–36) + la raíz oscura
// (Laván→Bilaam→Naval) + el caso especial Adam→David→Mashíaj (tradición zohárica,
// ámbar, CLARAMENTE separado del Arizal). Verificado por el editor-erudito (Sofer)
// leyendo el hebreo directo de Sefaria, con cada gematría recalculada a mano.
// Fuente: "Gilgulim - dataset verificado (Sofer).md".
//
// Certeza:  direct = ✅ declaración explícita del Arizal (verde/dorado).
//           traditional = ⚠️ tradición Zohar/Midrash, NO del Sha'ar HaGilgulim (ámbar).
//           gematria = 🔢 vínculo por permutación de letras / valor numérico (azul-plata).
// Cada from/to es un id de BNode real (ver GILGUL_VESSEL_NODES en brainData.ts).
// REGLA DE INTEGRIDAD: nada marcado ❌ por el Sofer entra aquí; y Adam-David-
// Mashíaj jamás se marca "direct" (es tradición, no Arizal) — protege la credibilidad.
// ═════════════════════════════════════════════════════════════════════════

// ── CADENA 1 — Caín → … → Rabí Akiva (la columna vertebral; ShG 36:3) ──
// 15 eslabones. Raíz de la Guevurá (hombro izquierdo de Adam). Kóraj (lado MAL)
// e Itró (lado BIEN) son los dos filos del mismo eslabón; Nadav-Avihu = 2 personas
// / 1 alma (תרי פלגי גופא, 33:6). Cierra en Abaye (Rav Yeiva Saba, 36:4).
const SOFER_CAIN_LINKS: GilgulLink[] = [
  { from: "Caín", to: "Kenán", source: "Sha'ar HaGilgulim, Hakdamá 33:2 (Zohar Terumá 168a)", confidence: "direct", era: "bereshit",
    note: "La raíz de Caín desciende en Kenán y Mahalalel.", noteFa: "ریشهٔ قائن در کِنان و مَهَلَلئیل فرود می‌آید." },
  { from: "Kenán", to: "Mahalalel", source: "Sha'ar HaGilgulim, Hakdamá 33:2", confidence: "direct", era: "bereshit",
    note: "Kenán → Mahalalel (mismo tramo de la raíz de Caín).", noteFa: "کِنان ← مَهَلَلئیل (همان شاخهٔ ریشهٔ قائن)." },
  { from: "Mahalalel", to: "Yshajar", source: "Sha'ar HaGilgulim, Hakdamá 33:2 / 36:2", confidence: "direct", era: "bereshit",
    note: "La chispa llega a Yshajar, hijo de Yaakov.", noteFa: "جرقه به یِساخار، فرزند یعقوب، می‌رسد." },
  { from: "Yshajar", to: "Najshón", source: "Sha'ar HaGilgulim, Hakdamá 33:4", confidence: "direct", era: "shemot",
    gematria: { aName: "נחשון", aValue: 414, bName: "אור+אור", bValue: 414, shared: 207 },
    note: "Najshón ben Aminadav. נחשון = 414 = 2×אור (luz·luz).", noteFa: "نَحشون بن عَمیناداو. نחשون = ۴۱۴ = ۲×اور (نور·نور)." },
  { from: "Najshón", to: "Nadav-Avihu", source: "Sha'ar HaGilgulim, Hakdamá 33:3 / 36:3", confidence: "direct", era: "shemot",
    note: "Nadav y Avihú = dos personas, una sola raíz-alma (תרי פלגי גופא).", noteFa: "ناداو و اَبیهو = دو تن، یک ریشهٔ روح (תרי פלגי גופא)." },
  { from: "Nadav-Avihu", to: "Yishai", source: "Sha'ar HaGilgulim, Hakdamá 33:5", confidence: "direct", era: "shoftim",
    note: "La raíz continúa en Yishai, padre del rey David.", noteFa: "ریشه در ییشای، پدرِ داوودِ پادشاه، ادامه می‌یابد." },
  { from: "Yishai", to: "Kóraj", source: "Sha'ar HaGilgulim, Hakdamá 33:7", confidence: "direct", era: "shemot",
    note: "Eslabón de lado MAL: la guevurá no rectificada cae en Kóraj.", noteFa: "حلقهٔ سویِ بد: گبورای اصلاح‌نشده در قورح می‌افتد." },
  { from: "Kóraj", to: "Yitró", source: "Sha'ar HaGilgulim, Hakdamá 33:7", confidence: "direct", era: "shemot",
    note: "Eslabón de lado BIEN: la misma guevurá se rectifica en Itró.", noteFa: "حلقهٔ سویِ نیک: همان گبورا در یترو اصلاح می‌شود." },
  { from: "Yitró", to: "Shmuel HaNavi", source: "Sha'ar HaGilgulim, Hakdamá 33:6-7 / 36:3", confidence: "direct", era: "neviim",
    note: "Shmuel HaNaví participa de la rectificación de Caín.", noteFa: "شموئل نبی در اصلاحِ قائن سهیم است." },
  { from: "Shmuel HaNavi", to: "Jizkiyahu", source: "Sha'ar HaGilgulim, Hakdamá 32:19 / 36:3", confidence: "direct", era: "neviim",
    note: "El rey Jizkiyahu (Ezequías), de la raíz de Caín.", noteFa: "پادشاه حِزقیاهو، از ریشهٔ قائن." },
  { from: "Jizkiyahu", to: "Matityahu", source: "Sha'ar HaGilgulim, Hakdamá 32:20 / 36:3", confidence: "direct", era: "neviim",
    note: "Matityahu HaKohén (el Macabeo).", noteFa: "مَتیتیاهوِ کوهِن (مَکَّابی)." },
  { from: "Matityahu", to: "Akavia", source: "Sha'ar HaGilgulim, Hakdamá 32:20 / 36:3", confidence: "direct", era: "talmud",
    note: "Akavia ben Mahalalel (Mishná).", noteFa: "عَکَویا بن مَهَلَلئیل (میشنا)." },
  { from: "Akavia", to: "Ribaz", source: "Sha'ar HaGilgulim, Hakdamá 32:20 / 36:3", confidence: "direct", era: "talmud",
    note: "Rabán Yojanán ben Zakai (Ribaz).", noteFa: "رَبان یوحانان بن زَکای (ریباز)." },
  { from: "Ribaz", to: "Rabí Akiva", source: "Sha'ar HaGilgulim, Hakdamá 32:20 / 33:2 / 36:3", confidence: "direct", era: "talmud",
    note: "Rabí Akiva endulza la guevurá de Caín → la vuelve jésed.", noteFa: "ربی عقیوا گبورای قائن را شیرین می‌کند ← به خِسِد بدل می‌شود." },
  { from: "Rabí Akiva", to: "Abaye", source: "Sha'ar HaGilgulim, Hakdamá 36:4", confidence: "direct", era: "talmud",
    note: "Cierre de la columna: Rav Yeiva Saba → Abaye (Amoraim).", noteFa: "بستنِ ستون: رَو ییوا سَبا ← اَبَیه (آموراییم)." },
];

// ── CADENA 2 — Pinjás → Eliyahu (la joya multi-chispa; Hakdamá 32 + Berajot 4b) ──
// Pinjás = 4 chispas (32:6): (1) Yosef+Itró, (2) Nadav-Avihu por ibur, (3) "Eliahu"
// de Gad, (4) "Eliahu" de Biniamín → el Eliahu eterno. Descomposición era por era
// (32:14-19): a Jiel, a Shmuel, a Elishá ("פי שנים"), a Mashíaj ben Yosef.
// multichispa: varias salidas del MISMO nodo Pinjás → el render dibuja la división.
const SOFER_PINJAS_LINKS: GilgulLink[] = [
  // Las 4 chispas que CONFLUYEN en Pinjás (sus fuentes-alma):
  { from: "Yosef", to: "Pinjás", source: "Sha'ar HaGilgulim, Hakdamá 32:6", confidence: "direct", era: "shemot", multichispa: true,
    note: "Chispa 1 de Pinjás: una gota de Yosef (con Itró).", noteFa: "جرقهٔ ۱ پینحاس: قطره‌ای از یوسف (با یترو)." },
  { from: "Yitró", to: "Pinjás", source: "Sha'ar HaGilgulim, Hakdamá 32:6", confidence: "direct", era: "shemot", multichispa: true,
    note: "Chispa 1 (par): la gota de Itró se une en Pinjás.", noteFa: "جرقهٔ ۱ (جفت): قطرهٔ یترو در پینحاس می‌پیوندد." },
  { from: "Nadav-Avihu", to: "Pinjás", source: "Sha'ar HaGilgulim, Hakdamá 32:6 / 33:6", confidence: "direct", era: "shemot", multichispa: true,
    note: "Chispa 2: las almas de Nadav y Avihú se enviste (ibur) en Pinjás.", noteFa: "جرقهٔ ۲: ارواحِ ناداو و اَبیهو در پینحاس جامه (عیبور) می‌پوشند." },
  // Pinjás → Eliyahu (el núcleo: Pinjás ES Eliyahu):
  { from: "Pinjás", to: "Eliyahu", source: "Sha'ar HaGilgulim, Hakdamá 32 (Berajot 4b: «Eliahu en cuatro»)", confidence: "direct", era: "neviim", multichispa: true,
    note: "Pinjás es Eliyahu HaNaví; Eliahu = 4 chispas (Berajot 4b).", noteFa: "پینحاس همان الیاهوی نبی است؛ الیاهو = ۴ جرقه (بِراخوت ۴ب)." },
  // Descomposición de Eliyahu/Pinjás era por era (32:14-19):
  { from: "Pinjás", to: "Jiel", source: "Sha'ar HaGilgulim, Hakdamá 32:9", confidence: "direct", era: "shoftim", multichispa: true,
    gematria: { aName: "חיאל", aValue: 49, bName: "אליה", bValue: 46 },
    note: "Pinjás → Jiel Bet-HaElí (חיאל↔אליה por permutación, NO igualdad: 49≠46).", noteFa: "پینحاس ← حیئل بیت‌الئیلی (חיאל↔אליה با جابجایی حروف، نه برابری: ۴۹≠۴۶)." },
  { from: "Pinjás", to: "Elishá", source: "Sha'ar HaGilgulim, Hakdamá 32:16-17 (נ\"א «פי שנים»)", confidence: "direct", era: "neviim", multichispa: true,
    gematria: { aName: "אלישע", aValue: 411, bName: "אל\"י (de אליהו)", bValue: 41 },
    note: "Vía Nadav-Avihu→Shmuel→Elishá. אֱלִישָׁע lleva אל\"י de Eliyahu.", noteFa: "از راهِ ناداو-اَبیهو ← شموئل ← اِلیشَع. اَلیشَع، اَل\"ی از الیاهو را دارد." },
  { from: "Yosef", to: "Mashíaj ben Yosef", source: "Sha'ar HaGilgulim, Hakdamá 32:15 (Zohar Vayakhel 197a)", confidence: "direct", era: "neviim", multichispa: true,
    note: "La chispa de Yosef en Pinjás → el hijo de la Tzarfit = Mashíaj ben Yosef.", noteFa: "جرقهٔ یوسف در پینحاس ← پسرِ زنِ صَرفَتی = ماشیَخ بن یوسف." },
];

// ── CADENA 3 — Hevel → Set → Nóaj → Shem → Moshé (34:1) + Hillel/Shamai ──
// Raíz del Jésed (hombro derecho de Adam). ש de מֹשֶׁה viene de שת/שם; ה de הֶבֶל.
// Sub-ramas: Hillel (Jésed) y Shamai (Guevurá) brotan de Moshé (34:4-6).
const SOFER_HEVEL_LINKS: GilgulLink[] = [
  { from: "Abel", to: "Shet", source: "Sha'ar HaGilgulim, Hakdamá 34:1", confidence: "direct", era: "bereshit",
    note: "El alma de Hevel pasa a Shet, hijo de Adam.", noteFa: "روحِ هابیل به شیت، فرزند آدم، منتقل می‌شود." },
  { from: "Shet", to: "Noaj", source: "Sha'ar HaGilgulim, Hakdamá 34:1", confidence: "gematria", era: "mabul",
    gematria: { aName: "נח", aValue: 58, bName: "חן", bValue: 58, shared: 58 },
    note: "La chispa continúa en Nóaj. נֹחַ (נח) = Jen (חן) = 58 (anagrama).", noteFa: "جرقه در نوح ادامه می‌یابد. نوح (נח) = حِن (חן) = ۵۸ (واروبافت)." },
  { from: "Noaj", to: "Shem", source: "Sha'ar HaGilgulim, Hakdamá 34:1", confidence: "direct", era: "mabul",
    note: "Shem ben Nóaj porta la raíz del jésed.", noteFa: "شیم بن نوح ریشهٔ خِسِد را حمل می‌کند." },
  { from: "Shem", to: "Moshé", source: "Sha'ar HaGilgulim, Hakdamá 34:1-2", confidence: "gematria", era: "shemot",
    gematria: { aName: "משה", aValue: 345, bName: "מה\"ש (Shem 72 #14)", bValue: 345, shared: 345 },
    note: "La ש de מֹשֶׁה viene de שת/שם; la ה, de הֶבֶל. משה = 345 = מה\"ש.", noteFa: "شینِ מֹשֶׁה از שת/שם است؛ هِی آن از הֶבֶل. مֹשֶׁה = ۳۴۵ = مה\"ש." },
  // Sub-ramas de Hevel/Moshé: Hillel y Shamai (34:4-6)
  { from: "Moshé", to: "Hillel", source: "Sha'ar HaGilgulim, Hakdamá 34:4 / 36:107", confidence: "gematria", era: "talmud", multichispa: true,
    gematria: { aName: "הלל", aValue: 65, bName: "אֲדֹנָי", bValue: 65, shared: 65 },
    note: "Lado Jésed: Moshé → Hillel. ר\"ת «היה לך לעזרני» = הלל; הלל = אֲדֹנָי = 65.", noteFa: "سویِ خِسِد: موشه ← هیلِل. سرحرفِ «היה לך לעזרני» = הלל؛ הלל = اَدونای = ۶۵." },
  { from: "Moshé", to: "Shamai", source: "Sha'ar HaGilgulim, Hakdamá 34:6 / 36:98", confidence: "direct", era: "talmud", multichispa: true,
    note: "Lado Guevurá: Moshé → Shamai (→ Shimon ben Azai). שמאי directo = 351 (kolel +1).", noteFa: "سویِ گبورا: موشه ← شَمّای (← شیمعون بن عَزای). שמאی مستقیم = ۳۵۱ (با کولِل +۱)." },
];

// ── CADENA 4 — Zihará Ilá'a: Janoj/Metatrón → … → R. Yishmael (36:54) ──
// El "resplandor supremo" de Adam (nivel Atzilut) que NO cayó en las kelipot — la
// más elevada. Multi-chispa (34:13): los 10 Mártires = 10 gotas de Yosef; R.
// Yishmael = Yosef mismo. Cadena lineal directa del Arizal.
const SOFER_ZIHARA_LINKS: GilgulLink[] = [
  { from: "Janoj", to: "Yosef", source: "Sha'ar HaGilgulim, Hakdamá 36:54", confidence: "direct", era: "bereshit",
    note: "La Zihará Ilá'a (Janoj/Metatrón) desciende en Yosef HaTzadik.", noteFa: "زیهارا عیلاآ (حَنوخ/مِطَطرون) در یوسفِ صدّیق فرود می‌آید." },
  { from: "Yosef", to: "Yehoshúa", source: "Sha'ar HaGilgulim, Hakdamá 36:54", confidence: "direct", era: "shemot",
    note: "→ Yehoshúa bin Nun (de la tribu de Yosef/Efráim).", noteFa: "← یهوشع بن نون (از سبطِ یوسف/اِفرایم)." },
  { from: "Yehoshúa", to: "Ajiá HaShiloní", source: "Sha'ar HaGilgulim, Hakdamá 36:54", confidence: "direct", era: "shoftim",
    note: "→ Ajiá HaShiloní (el profeta de Shiló, maestro de Eliyahu).", noteFa: "← اَخیا هَشیلونی (نبیِ شیلو، استادِ الیاهو)." },
  { from: "Ajiá HaShiloní", to: "Elishá", source: "Sha'ar HaGilgulim, Hakdamá 36:54", confidence: "direct", era: "neviim",
    note: "→ Elishá HaNaví (Eliseo). (Mismo nodo que en la cadena de Pinjás.)", noteFa: "← اِلیشَعِ نبی. (همان گرهِ زنجیرهٔ پینحاس.)" },
  { from: "Elishá", to: "Yehoshúa ben Perajiá", source: "Sha'ar HaGilgulim, Hakdamá 36:54", confidence: "direct", era: "talmud",
    note: "→ Yehoshúa ben Perajiá (de los Zugot).", noteFa: "← یهوشع بن پِرَخیا (از زوگوت)." },
  { from: "Yehoshúa ben Perajiá", to: "R. Yehoshúa ben Janania", source: "Sha'ar HaGilgulim, Hakdamá 36:54", confidence: "direct", era: "talmud",
    note: "→ Rabí Yehoshúa ben Janania (Tanná).", noteFa: "← ربی یهوشع بن حَنَنیا (تنّا)." },
  { from: "R. Yehoshúa ben Janania", to: "R. Yishmael", source: "Sha'ar HaGilgulim, Hakdamá 36:54 / 34:13", confidence: "direct", era: "talmud", multichispa: true,
    note: "→ R. Yishmael (Kohén Gadol) = Yosef mismo; los 10 Mártires = 10 gotas de Yosef.", noteFa: "← ربی یشمَعئیل (کوهِن گادول) = خودِ یوسف؛ ۱۰ شهید = ۱۰ قطرهٔ یوسف." },
];

// ── CADENA 5 — línea sacerdotal: Harán → Aharón → … → Zejariá (33:10-13) ──
// Sub-raíz de Hevel. אַהֲרֹן (256) = הָרָן (255) + א.
const SOFER_HARAN_LINKS: GilgulLink[] = [
  { from: "Harán", to: "Aharón", source: "Sha'ar HaGilgulim, Hakdamá 33:10", confidence: "gematria", era: "shemot",
    gematria: { aName: "אהרן", aValue: 256, bName: "הרן+א", bValue: 256, shared: 255 },
    note: "Harán (hermano de Avraham) → Aharón HaKohén. אַהֲרֹן (256) = הָרָן (255) + א.", noteFa: "هاران (برادر ابراهیم) ← اَهارونِ کوهِن. اَهَرون (۲۵۶) = هاران (۲۵۵) + اَلِف." },
  { from: "Aharón", to: "Yaavetz", source: "Sha'ar HaGilgulim, Hakdamá 33:11", confidence: "direct", era: "shoftim",
    note: "→ Yaavetz (el juez).", noteFa: "← یَعبِص (داور)." },
  { from: "Yaavetz", to: "Tolá", source: "Sha'ar HaGilgulim, Hakdamá 33:12", confidence: "direct", era: "shoftim",
    note: "→ Tolá ben Puá (el juez).", noteFa: "← تولاع بن پووا (داور)." },
  { from: "Tolá", to: "Uriah HaKohén", source: "Sha'ar HaGilgulim, Hakdamá 33:13", confidence: "direct", era: "neviim",
    note: "→ Uriah HaKohén (Primer Templo).", noteFa: "← اوریاهِ کوهِن (معبد اول)." },
  { from: "Uriah HaKohén", to: "Zejariá", source: "Sha'ar HaGilgulim, Hakdamá 33:13", confidence: "direct", era: "neviim",
    note: "→ Zejariá ben Yeverejiahu (la línea sacerdotal-profética).", noteFa: "← زِخَریا بن یِوِرِخیاهو (شاخهٔ کاهنی-نبوی)." },
];

// ── RAÍZ OSCURA — Laván → Bilaam → Naval (3 gilgulim; ShG 36:76, 103) ──
// נָבָל (82) = לָבָן (82), anagrama (נבל = לבן al revés). El lado no rectificado.
const SOFER_DARK_LINKS: GilgulLink[] = [
  { from: "Laván", to: "Bilaam", source: "Sha'ar HaGilgulim, Hakdamá 36:76", confidence: "direct", era: "shemot",
    note: "Laván HaArami (ל) → Bilaam (ב), el adivino.", noteFa: "لاوان هَاَرامی (ل) ← بَلعام (ب)، فالگیر." },
  { from: "Bilaam", to: "Naval", source: "Sha'ar HaGilgulim, Hakdamá 36:76 / 103", confidence: "gematria", era: "shoftim",
    gematria: { aName: "נבל", aValue: 82, bName: "לבן", bValue: 82, shared: 82 },
    note: "Bilaam (ב) → Naval HaKarmelí (נ). נָבָל (82) = לָבָן (82), anagrama (נבל ↔ לבן).", noteFa: "بَلعام (ب) ← ناوال کَرمِلی (ن). نָבָל (۸۲) = لָבָן (۸۲)، واروبافت (נבל ↔ לבן)." },
];

// ── CADENA 6 — Yaakov → Yirmiahu → Daniel → … → el Ran (36:52) — NUEVA ──
// Lista directa del Arí: "שרש יעקב אבינו ע"ה, יעקב, ירמיהו הנביא, דניאל, אנטיגנוס
// איש סוכו, ר"א בן דהבאי, רב פפא, הר"ן מפרש על הרי"ף". (+2 gotas en las dos Avigail
// quedan como NOTA, no como eslabón, para no cruzar el linaje con la raíz oscura.)
const SOFER_YAAKOV_LINKS: GilgulLink[] = [
  { from: "Yaakov", to: "Yirmiahu", source: "Sha'ar HaGilgulim, Hakdamá 36:52", confidence: "direct", era: "shemot",
    note: "La raíz de Yaakov Avinu desciende en Yirmiahu HaNaví.", noteFa: "ریشهٔ یعقوب آوینو در یِرمیاهوِ نبی فرود می‌آید." },
  { from: "Yirmiahu", to: "Daniel", source: "Sha'ar HaGilgulim, Hakdamá 36:52", confidence: "direct", era: "neviim",
    note: "→ Daniel.", noteFa: "← دانیال." },
  { from: "Daniel", to: "Antígonos", source: "Sha'ar HaGilgulim, Hakdamá 36:52", confidence: "direct", era: "talmud",
    note: "→ Antígonos Ish Sojo (de los Anshei Knéset HaGuedolá).", noteFa: "← اَنتیگونوس ایش سوخو (از مردانِ کِنِسِت بزرگ)." },
  { from: "Antígonos", to: "R. Eleazar ben Dahavai", source: "Sha'ar HaGilgulim, Hakdamá 36:52", confidence: "direct", era: "talmud",
    note: "→ Rabí Eleazar ben Dahavai.", noteFa: "← ربی اِلعازار بن دَهَوای." },
  { from: "R. Eleazar ben Dahavai", to: "Rav Papa", source: "Sha'ar HaGilgulim, Hakdamá 36:52", confidence: "direct", era: "talmud",
    note: "→ Rav Papa (Amorá).", noteFa: "← رَو پاپا (آمورا)." },
  { from: "Rav Papa", to: "Ran", source: "Sha'ar HaGilgulim, Hakdamá 36:52", confidence: "direct", era: "talmud",
    note: "→ el Ran (R. Nissim), comentarista del Rif. Cierra la raíz de Yaakov.", noteFa: "← هَران (ربی نیسیم)، شارحِ ریف. ریشهٔ یعقوب را می‌بندد." },
];

// ── CADENA 7 — Eliezer → Kalev → Benaiahu → Zejariá ben Yehoiada (36:53) — NUEVA ──
// Lista directa del Arí: "שרש אליעזר עבד אברהם, אליעזר, כלב בן יפונה, בניהו בן
// יהוידע, זכריהו בן יהוידע". Gematrías ✅: כָּלֵב(52)=בֵּן(52) (36:94);
// יְפֻנֶּה(151)=אֶהְיֶ"ה דההי"ן/קנ"א (36:96).
const SOFER_ELIEZER_LINKS: GilgulLink[] = [
  { from: "Eliezer", to: "Kalev", source: "Sha'ar HaGilgulim, Hakdamá 36:53 / 36:94", confidence: "gematria", era: "shemot",
    gematria: { aName: "כלב", aValue: 52, bName: "בן", bValue: 52, shared: 52 },
    note: "Eliezer (siervo de Avraham) → Kalev ben Yefuné. כָּלֵב (52) = בֵּן (52).", noteFa: "اِلیعِزِر (خادم ابراهیم) ← کالِب بن یِفونه. کالِب (۵۲) = بِن (۵۲)." },
  { from: "Kalev", to: "Benaiahu", source: "Sha'ar HaGilgulim, Hakdamá 36:53", confidence: "direct", era: "shoftim",
    note: "→ Benaiahu ben Yehoiada (el guerrero de David).", noteFa: "← بِنایاهو بن یِهویاداع (دلاورِ داوود)." },
  { from: "Benaiahu", to: "Zejariá ben Yehoiada", source: "Sha'ar HaGilgulim, Hakdamá 36:53", confidence: "direct", era: "neviim",
    note: "→ Zejariá ben Yehoiada (el kohén; ≠ el profeta Zejariá).", noteFa: "← زِخَریا بن یِهویاداع (کوهِن؛ ≠ زِخَریای نبی)." },
];

// ── CADENA 8 — Yoav → Yoash (36:59, at-bash) — NUEVA ──
// Lista directa del Arí: "שרש אחר, יואב בן צרויה, יואש המלך". El vínculo es por
// AT-BASH (ב↔ש): "ויואב נתגלגל ביואש המלך, בחלוף בי"ת בשי"ן בא"ת ב"ש" (36:96,78).
// NO es igualdad numérica (יואב=19, יואש=317): es la regla at-bash. El tooltip
// muestra la REGLA (rule), no un empate de valores.
const SOFER_YOAV_LINKS: GilgulLink[] = [
  { from: "Yoav", to: "Yoash", source: "Sha'ar HaGilgulim, Hakdamá 36:59 / 96 / 78", confidence: "gematria", era: "shoftim",
    gematria: { aName: "יואב", aValue: 19, bName: "יואש", bValue: 317, rule: "at-bash (ב↔ש)" },
    note: "Yoav ben Tzeruiá → Yoash HaMélej, por at-bash (la ב de יואב ↔ la ש de יואש).", noteFa: "یوآو بن تصِرویا ← یوآش پادشاه، با اَت‌بَش (بِتِ یوآو ↔ شینِ یوآش)." },
];

// ── CASO ESPECIAL — Adam → David → Mashíaj  ⚠️ TRADICIÓN (NO Sha'ar HaGilgulim) ──
// CRÍTICO para la credibilidad: esta cadena NO está en el Sha'ar HaGilgulim. En el
// Arizal, David pertenece a la raíz de CAÍN (vía Yishai, ✅ 33:5). El secreto אד"ם
// = Adam–David–Mashíaj y los "70 años que Adam regaló a David" (1000−930=70) son de
// OTRA capa: Zohar Bereshit / Yalkut Shimoni / Pirkei DeRabbi Eliezer. Por eso va
// como "traditional" (ámbar), separada de las verdes "direct" del Arizal.
const SOFER_TRADITION_LINKS: GilgulLink[] = [
  { from: "Adam HaRishon", to: "David", source: "Tradición: Zohar Bereshit · Yalkut Shimoni · Pirkei DeRabbi Eliezer (NO Sha'ar HaGilgulim)", confidence: "traditional", era: "shoftim",
    note: "Tradición zohárica (NO del Arizal): Adam regaló 70 de sus años a David (1000−930=70).", noteFa: "سنتِ زوهَری (نه از آری): آدم ۷۰ سال از عمرِ خود را به داوود بخشید (۱۰۰۰−۹۳۰=۷۰)." },
  { from: "David", to: "Mashíaj", source: "Tradición: acróstico אד\"ם = Adam–David–Mashíaj (Remez zohárico, NO Sha'ar HaGilgulim)", confidence: "traditional", era: "talmud",
    note: "Remez tradicional: אד\"ם = Adam·David·Mashíaj. אדם=45, דוד=14, משיח=358. NO es del Arizal.", noteFa: "رِمزِ سنتی: אד\"ם = آدم·داوود·ماشیح. אדם=۴۵، דוד=۱۴، משיח=۳۵۸. از آری نیست." },
];

// >>> El dataset del Sofer: unión de todas las cadenas verificadas <<<
// Estos GANAN sobre la semilla en getGilgulModel() (su source/confidence prevalece).
export const SOFER_GILGUL_LINKS: GilgulLink[] = [
  ...SOFER_CAIN_LINKS,
  ...SOFER_PINJAS_LINKS,
  ...SOFER_HEVEL_LINKS,
  ...SOFER_ZIHARA_LINKS,
  ...SOFER_HARAN_LINKS,
  ...SOFER_YAAKOV_LINKS,
  ...SOFER_ELIEZER_LINKS,
  ...SOFER_YOAV_LINKS,
  ...SOFER_DARK_LINKS,
  ...SOFER_TRADITION_LINKS,
];

// ── Cadenas activas (lo que el universo puede invocar) ──────────────────────
// El orden importa solo para desempates de búsqueda. Cada raíz es invocable
// con "<raíz> + gilgul". Las cadenas del Sofer que NO arrancan de Caín/Abel se
// registran como raíces propias (Pinjás, Janoj/Zihará Ilá'a, Harán, Laván, y la
// tradición Adam-David). Sus `links` reusan las constantes verificadas SOFER_*;
// getGilgulModel() los dedup con SOFER_GILGUL_LINKS, sin doble conteo.
// NOTA: Caín y Abel además ALCANZAN sus sub-raíces por BFS (Nadav-Avihu/Yitró del
// tronco de Caín fluyen a Pinjás; el Sofer las une explícitamente).
export const GILGUL_CHAINS: GilgulChain[] = [
  {
    id: "abel", root: "Abel",
    label: "Abel (Hevel)", labelFa: "هابیل (هِوِل)", labelEn: "Abel (Hevel)",
    source: "Sha'ar HaGilgulim, Hakdamá 34:1", links: [...ABEL_LINKS, ...SOFER_HEVEL_LINKS],
  },
  {
    id: "cain", root: "Caín",
    label: "Caín (Kayin)", labelFa: "قائن (قابیل)", labelEn: "Cain (Kayin)",
    source: "Sha'ar HaGilgulim, Hakdamá 33 / 36:3", links: [...CAIN_LINKS, ...SOFER_CAIN_LINKS],
  },
  {
    id: "pinjas", root: "Pinjás",
    label: "Pinjás → Eliyahu", labelFa: "پینحاس ← الیاهو", labelEn: "Pinchas → Eliyahu",
    source: "Sha'ar HaGilgulim, Hakdamá 32 (Berajot 4b)", links: SOFER_PINJAS_LINKS,
  },
  {
    id: "zihara", root: "Janoj",
    label: "Zihará Ilá'a (Janoj/Metatrón)", labelFa: "زیهارا عیلاآ (حَنوخ/مِطَطرون)", labelEn: "Zihara Ila'a (Chanoch/Metatron)",
    source: "Sha'ar HaGilgulim, Hakdamá 36:54", links: SOFER_ZIHARA_LINKS,
  },
  {
    id: "haran", root: "Harán",
    label: "Harán → Aharón (sacerdocio)", labelFa: "هاران ← اَهارون (کهانت)", labelEn: "Charan → Aharon (priesthood)",
    source: "Sha'ar HaGilgulim, Hakdamá 33:10-13", links: SOFER_HARAN_LINKS,
  },
  {
    id: "yaakov", root: "Yaakov",
    label: "Yaakov → Yirmiahu → … → el Ran", labelFa: "یعقوب ← یِرمیاهو ← … ← هَران", labelEn: "Yaakov → Yirmiahu → … → the Ran",
    source: "Sha'ar HaGilgulim, Hakdamá 36:52", links: SOFER_YAAKOV_LINKS,
  },
  {
    id: "eliezer", root: "Eliezer",
    label: "Eliezer → Kalev → Benaiahu → Zejariá", labelFa: "اِلیعِزِر ← کالِب ← بِنایاهو ← زِخَریا", labelEn: "Eliezer → Kalev → Benaiahu → Zechariah",
    source: "Sha'ar HaGilgulim, Hakdamá 36:53", links: SOFER_ELIEZER_LINKS,
  },
  {
    id: "yoav", root: "Yoav",
    label: "Yoav → Yoash (at-bash)", labelFa: "یوآو ← یوآش (اَت‌بَش)", labelEn: "Yoav → Yoash (at-bash)",
    source: "Sha'ar HaGilgulim, Hakdamá 36:59", links: SOFER_YOAV_LINKS,
  },
  {
    id: "lavan", root: "Laván",
    label: "Laván → Bilaam → Naval (raíz oscura)", labelFa: "لاوان ← بَلعام ← ناوال (ریشهٔ تاریک)", labelEn: "Lavan → Bilaam → Naval (dark root)",
    source: "Sha'ar HaGilgulim, Hakdamá 36:76", links: SOFER_DARK_LINKS,
  },
  {
    id: "adam-david", root: "Adam HaRishon",
    label: "Adam → David → Mashíaj (tradición)", labelFa: "آدم ← داوود ← ماشیح (سنتی)", labelEn: "Adam → David → Mashiach (tradition)",
    source: "Tradición zohárica (NO Sha'ar HaGilgulim)", links: SOFER_TRADITION_LINKS,
  },
];

// ─────────────────────────────────────────────────────────────────────────
// MODELO RESUELTO — lo que consume el render.
// `getGilgulModel()` une SEMILLA + DATASET DEL SOFER (si existe) y deduplica.
// Si el Sofer entrega links, esos GANAN (su `source`/`confidence` prevalece).
// ─────────────────────────────────────────────────────────────────────────

export type GilgulModel = {
  links: GilgulLink[];                        // todas las transmisiones (dedup)
  byRoot: Map<string, GilgulChain>;           // raíz id → cadena
  adjacency: Map<string, GilgulLink[]>;       // from id → links salientes (multi-chispa)
  nodeIds: Set<string>;                       // todos los nodos tocados por algún link
};

function linkKey(l: GilgulLink): string {
  return `${l.from}→${l.to}`;
}

let _model: GilgulModel | null = null;

export function getGilgulModel(): GilgulModel {
  if (_model) return _model;

  // 1) reúne semilla (cadenas no provisionales) + dataset del Sofer
  const seedLinks: GilgulLink[] = [];
  for (const ch of GILGUL_CHAINS) {
    if (ch.provisional) continue; // la cadena demo no entra al modelo "real"
    seedLinks.push(...ch.links);
  }

  // 2) dedup; el dataset del Sofer pisa a la semilla en colisiones
  const map = new Map<string, GilgulLink>();
  for (const l of seedLinks) map.set(linkKey(l), l);
  for (const l of SOFER_GILGUL_LINKS) map.set(linkKey(l), l); // Sofer gana

  const links = [...map.values()];

  // 3) índices
  const adjacency = new Map<string, GilgulLink[]>();
  const nodeIds = new Set<string>();
  for (const l of links) {
    nodeIds.add(l.from);
    nodeIds.add(l.to);
    const arr = adjacency.get(l.from);
    if (arr) arr.push(l); else adjacency.set(l.from, [l]);
  }

  const byRoot = new Map<string, GilgulChain>();
  for (const ch of GILGUL_CHAINS) if (!ch.provisional) byRoot.set(ch.root, ch);

  _model = { links, byRoot, adjacency, nodeIds };
  return _model;
}

// ── Recorrido (BFS) desde una raíz por los senderos de gilgul ───────────────
// Devuelve los links en orden de "olas" (capa por distancia) → la chispa los
// recorre encendiendo cada vasija al llegar. Soporta multi-chispa (varias
// salidas del mismo nodo) y evita ciclos.
export type GilgulTraversal = {
  root: string;
  order: GilgulLink[];                 // links en orden de descubrimiento (BFS)
  reachable: Set<string>;              // nodos alcanzados desde la raíz
  depth: Map<string, number>;          // nodo id → nº de saltos desde la raíz
};

export function traverseGilgul(rootId: string, model = getGilgulModel()): GilgulTraversal {
  const order: GilgulLink[] = [];
  const reachable = new Set<string>([rootId]);
  const depth = new Map<string, number>([[rootId, 0]]);
  let frontier = [rootId];
  let d = 0;
  while (frontier.length) {
    d++;
    const next: string[] = [];
    for (const u of frontier) {
      for (const l of model.adjacency.get(u) ?? []) {
        order.push(l);
        if (!reachable.has(l.to)) {
          reachable.add(l.to);
          depth.set(l.to, d);
          next.push(l.to);
        }
      }
    }
    frontier = next;
    if (d > 24) break; // guarda anti-ciclos
  }
  return { root: rootId, order, reachable, depth };
}

// ── Ramas raíz→hoja (coreógrafo de la multi-chispa, Fase 2) ─────────────────
// Descompone el linaje en CAMINOS desde la raíz hasta cada "hoja" (vasija sin
// salida nueva). Las ramas que comparten prefijo arrancan juntas y se BIFURCAN
// físicamente en el primer link donde divergen. Cada rama es una secuencia de
// links contiguos (l[i].to === l[i+1].from), lista para una chispa propia.
//
// Construcción: DFS desde la raíz sobre el árbol de cobertura (cada nodo se
// expande una sola vez → sin ciclos). En cada nodo, sus links salientes hacia
// nodos AÚN no incorporados al árbol abren nuevas ramas; el primero continúa la
// rama actual, los demás generan ramas hermanas que heredan el prefijo recorrido.
export type GilgulBranch = {
  links: GilgulLink[];        // links contiguos de la raíz a una hoja
  startDepth: number[];       // depth (saltos desde raíz) del `from` de cada link
};

export function gilgulBranches(rootId: string, model = getGilgulModel()): GilgulBranch[] {
  const branches: GilgulBranch[] = [];
  const visited = new Set<string>([rootId]);

  // DFS que arrastra el prefijo (los links ya recorridos para llegar a `node`).
  const walk = (node: string, prefix: GilgulLink[], guard: number) => {
    if (guard > 48) return; // anti-ciclo duro
    // links salientes a nodos no incorporados todavía (define el árbol de cobertura)
    const outs = (model.adjacency.get(node) ?? []).filter((l) => !visited.has(l.to));
    if (outs.length === 0) {
      // hoja: cierra la rama con su prefijo (si tiene al menos un link)
      if (prefix.length > 0) {
        branches.push({ links: prefix, startDepth: prefix.map((_, i) => i) });
      }
      return;
    }
    // reserva los destinos ANTES de descender (evita que dos hermanos repitan nodo)
    for (const l of outs) visited.add(l.to);
    outs.forEach((l) => {
      // cada salida hereda el prefijo + este link → bifurcación real en `node`
      walk(l.to, [...prefix, l], guard + 1);
    });
  };

  walk(rootId, [], 0);
  return branches;
}

// ── Detección: ¿este nodo es una raíz de alma invocable? ────────────────────
export function gilgulChainForRoot(rootId: string): GilgulChain | undefined {
  return getGilgulModel().byRoot.get(rootId);
}

// ── Colores de los senderos según certeza (la spec) ─────────────────────────
// direct = dorado · traditional = ámbar intermedio · gematria = azul-plata.
export const GILGUL_CONFIDENCE_COLOR: Record<GilgulConfidence, string> = {
  direct: "#ffd66b",      // dorado vivo
  traditional: "#f0b85a", // ámbar (intermedio)
  gematria: "#9fd0ff",    // azul-plata (gematría)
};

// Etiqueta legible de la certeza (es/fa/en) para tooltips.
export function confidenceLabel(c: GilgulConfidence, lang: "es" | "fa" | "en"): string {
  const map: Record<GilgulConfidence, [string, string, string]> = {
    direct: ["directo", "تصریح‌شده", "direct"],
    traditional: ["tradición", "سنتی", "traditional"],
    gematria: ["gematría", "گِماتریا", "gematria"],
  };
  const [es, fa, en] = map[c];
  return lang === "fa" ? fa : lang === "en" ? en : es;
}

// ── Validación de integridad (dev): que todo link apunte a BNodes reales ────
// No se llama en producción; útil para el Sofer al cargar su dataset.
export function validateGilgulAgainstNodes(nodes: BNode[]): string[] {
  const ids = new Set(nodes.map((n) => n.id));
  const problems: string[] = [];
  for (const l of getGilgulModel().links) {
    if (!ids.has(l.from)) problems.push(`from desconocido: "${l.from}" (${l.source})`);
    if (!ids.has(l.to)) problems.push(`to desconocido: "${l.to}" (${l.source})`);
  }
  return problems;
}

// Re-export para conveniencia del render (evita doble import en page.tsx).
export { GILGUL_CAIN_HEVEL_EDGES };
