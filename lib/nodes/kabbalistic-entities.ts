// ─────────────────────────────────────────────────────────────────────────
// kabbalistic-entities.ts — Registro CANÓNICO de entidades cabalísticas.
//
// Propósito: dar a Jashmal un catálogo único y fiable de las "piezas" de la
// cosmología (sefirot, letras, partzufim, orot/kelim, olamot, Nombres divinos
// + miluim, senderos) para RECONOCERLAS dentro de un texto. Lo consumirá la
// FASE 3 (la rutina que cosecha conexiones de los estudios): cuando un estudio
// mencione "Jésed", "خِسِد", "חֶסֶד" o "Chesed", el detector sabrá que apunta a
// la MISMA entidad canónica.
//
// PRINCIPIOS:
//   · NO duplicar datos. Las sefirot vienen de sefirot.ts; las 22 letras de
//     hebrewLetters.ts. Aquí solo se ENVUELVEN con sus alias multi-idioma.
//   · Cuando la entidad YA es un nodo del grafo (brain_nodes), se enlaza con
//     `graphNodeId` = el id real del nodo (ej. "YHVH", "Tzimtzum"). Si todavía
//     no es un nodo (ej. los partzufim individuales, los miluim AB/SaG/MaH/BaN,
//     los 4 mundos por separado), `graphNodeId` queda undefined: la entidad es
//     reconocible en texto pero aún no tiene estrella propia en el cerebro.
//   · `aliases` es lo que el detector busca en el texto (es/fa/he + variantes).
//     Todo en MINÚSCULAS y sin tocar; el detector normaliza al comparar.
//
// Este archivo es SOLO DATOS + un par de helpers de lookup. No toca la BD ni
// el grafo: la Fase 3 decidirá qué hacer con lo que detecte.
// ─────────────────────────────────────────────────────────────────────────

import { SEFIROT } from "@/lib/nodes/sefirot";
import { LETTER_MEANINGS } from "@/lib/nodes/hebrewLetters";

// Dimensiones (familias) de la cosmología cabalística.
export type EntityDimension =
  | "sefirot"     // las 10 sefirot del Árbol de la Vida
  | "otiot"       // las 22 letras hebreas (canales de consciencia, Ginsburgh)
  | "partzufim"   // los 5 "rostros" (Atik, Arij, Aba, Ima, Zeir Anpín, Nukvá)
  | "or-kli"      // luz (or) y vasija (kli): orot, kelim, chispas, ruptura
  | "olamot"      // los mundos: Adam Kadmón + Atzilut, Beriá, Yetzirá, Asiyá
  | "nombres"     // Nombres divinos y sus miluim (AB/SaG/MaH/BaN)
  | "gematria"    // valores/estructuras numéricas recurrentes
  | "senderos";   // los 32 senderos de sabiduría (10 sefirot + 22 letras)

export interface KabEntity {
  id: string;                 // id estable y único en este registro
  dimension: EntityDimension;
  es: string;                 // nombre canónico en español
  fa: string;                 // nombre en farsi/persa
  he: string;                 // nombre/glifo en hebreo
  aliases: string[];          // términos a buscar en texto (es/fa/he + variantes), minúsculas
  value?: number;             // gematría, cuando aplica (letra, Nombre, miluy)
  graphNodeId?: string;       // id del nodo en brain_nodes, si ya existe esa estrella
  note?: string;              // nota breve (para curaduría / Fase 3); no se muestra al público
}

// ── Helper interno: junta alias sin vacíos ni duplicados, en minúsculas ──
function uniqLower(...vals: Array<string | undefined>): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const v of vals) {
    const s = (v ?? "").trim().toLowerCase();
    if (s && !seen.has(s)) { seen.add(s); out.push(s); }
  }
  return out;
}

// ═══════════════════════════════════════════════════════════════════════════
// 1) SEFIROT — derivadas de SEFIROT (sefirot.ts), sin duplicar datos.
//    El id del nodo en el grafo es el español SIN el glose entre paréntesis
//    (ej. "Jésed", "Guevurá"), tal como están sembradas las estrellas.
// ═══════════════════════════════════════════════════════════════════════════
// transliteración corta → id real del nodo en brain_nodes (verificado en brainData.ts)
const SEFIRA_NODE_ID: Record<string, string> = {
  keter: "Kéter", chochmah: "Jojmá", binah: "Biná", chesed: "Jésed",
  gevurah: "Guevurá", tiferet: "Tiferet", netzach: "Netzaj", hod: "Hod",
  yesod: "Yesod", malchut: "Maljut",
};

const SEFIROT_ENTITIES: KabEntity[] = SEFIROT.map((s) => ({
  id: `sefira:${s.id}`,
  dimension: "sefirot" as const,
  es: s.es,
  fa: s.fa,
  he: s.he,
  aliases: uniqLower(
    s.translit, s.es, s.fa, s.he, s.en, s.glossEs, s.glossFa, s.glossEn, s.id,
  ),
  graphNodeId: SEFIRA_NODE_ID[s.id],
}));

// ═══════════════════════════════════════════════════════════════════════════
// 2) OTIOT — las 22 letras hebreas, derivadas de LETTER_MEANINGS.
//    Incluye gematría y referencia su sendero (32 senderos = sefirot + letras).
//    Estas son nodos del grafo en TREE_NODES como "Letra <nombre>" (verificar
//    en Fase 3 antes de enlazar graphNodeId; aquí lo dejamos abierto).
// ═══════════════════════════════════════════════════════════════════════════
const OTIOT_ENTITIES: KabEntity[] = Object.values(LETTER_MEANINGS).map((l) => ({
  id: `otiot:${l.letter}`,
  dimension: "otiot" as const,
  es: l.name,
  fa: l.name,        // el nombre de la letra se translitera igual; el glifo va en he
  he: l.letter,
  aliases: uniqLower(l.name, l.nameHe, l.letter),
  value: l.value,
}));

// ═══════════════════════════════════════════════════════════════════════════
// 3) PARTZUFIM — los 5 "rostros". HOY no son nodos sueltos del grafo
//    (graphNodeId undefined): reconocibles en texto, candidatos de Fase 3.
// ═══════════════════════════════════════════════════════════════════════════
const PARTZUFIM_ENTITIES: KabEntity[] = [
  {
    id: "partzuf:atik", dimension: "partzufim",
    es: "Atik Yomín", fa: "عَتیق یومین", he: "עַתִּיק יוֹמִין",
    aliases: uniqLower("atik yomín", "atik yomin", "atik", "el anciano de los días", "عتیق یومین", "עתיק יומין"),
    note: "El más oculto de los partzufim, raíz de Kéter.",
  },
  {
    id: "partzuf:arij", dimension: "partzufim",
    es: "Arij Anpín", fa: "اَریخ آنپین", he: "אֲרִיךְ אַנְפִּין",
    aliases: uniqLower("arij anpín", "arich anpin", "arij", "el rostro largo", "اریخ آنپین", "אריך אנפין"),
    note: "El \"rostro largo/paciente\"; exterior de Kéter.",
  },
  {
    id: "partzuf:aba", dimension: "partzufim",
    es: "Aba", fa: "اَبّا", he: "אַבָּא",
    aliases: uniqLower("aba", "abba", "el padre", "اَبّا", "אבא"),
    value: 63, // Aba se asocia a Jojmá; ver miluy SaG
    note: "El Padre (Jojmá).",
  },
  {
    id: "partzuf:ima", dimension: "partzufim",
    es: "Ima", fa: "ایما", he: "אִמָּא",
    aliases: uniqLower("ima", "imma", "la madre", "ima superna", "ایما", "אמא"),
    note: "La Madre (Biná).",
  },
  {
    id: "partzuf:zeir-anpin", dimension: "partzufim",
    es: "Zeir Anpín", fa: "زِئیر آنپین", he: "זְעֵיר אַנְפִּין",
    aliases: uniqLower("zeir anpín", "zeir anpin", "zer anpin", "el rostro pequeño", "z\"a", "za", "زئیر آنپین", "זעיר אנפין"),
    value: 45, // Zeir Anpín se asocia a Mah / Adam
    note: "El \"rostro pequeño\"; las 6 sefirot emotivas (Jésed→Yesod).",
  },
  {
    id: "partzuf:nukva", dimension: "partzufim",
    es: "Nukvá", fa: "نوقوا", he: "נוּקְבָא",
    aliases: uniqLower("nukvá", "nukva", "nukvah", "la nukva", "نوقوا", "נוקבא"),
    value: 52, // Nukvá se asocia a Ban / Maljut
    note: "La femenina (Maljut), la receptora.",
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// 4) OR-KLI — luz, vasija y la dinámica de la ruptura/reparación.
//    Varias YA son nodos del grafo (Nitzotzot, Shevirá, Tzimtzum, Tikún).
// ═══════════════════════════════════════════════════════════════════════════
const OR_KLI_ENTITIES: KabEntity[] = [
  {
    id: "orkli:or", dimension: "or-kli",
    es: "Or (luz)", fa: "اور (نور)", he: "אוֹר",
    aliases: uniqLower("or", "luz", "la luz", "or ein sof", "اور", "نور", "אור"),
    value: 207, // Or = Raz = Ein Sof = 207
    note: "La luz infinita que llena y rodea (or pnimí / or makíf).",
  },
  {
    id: "orkli:kli", dimension: "or-kli",
    es: "Kli (vasija)", fa: "کِلی (ظرف)", he: "כְּלִי",
    aliases: uniqLower("kli", "keli", "vasija", "la vasija", "kelim", "vasijas", "کلی", "ظرف", "כלי", "כלים"),
    note: "El recipiente que recibe la luz; en plural, kelim.",
  },
  {
    id: "orkli:nitzotzot", dimension: "or-kli",
    es: "Nitzotzot (chispas)", fa: "نیتسوتسوت (جرقه‌ها)", he: "נִיצוֹצוֹת",
    aliases: uniqLower("nitzotzot", "nitzotzdim", "chispas", "las chispas", "chispa", "نیتسوتسوت", "جرقه", "ניצוצות"),
    graphNodeId: "Nitzotzot",
    note: "Las chispas santas atrapadas tras la ruptura.",
  },
  {
    id: "orkli:shevirá", dimension: "or-kli",
    es: "Shevirat HaKelim", fa: "شِویرَت هَکِلیم", he: "שְׁבִירַת הַכֵּלִים",
    aliases: uniqLower("shevirat hakelim", "shevirá", "shevira", "la ruptura", "ruptura de las vasijas", "شویرت هکلیم", "שבירת הכלים"),
    graphNodeId: "Shevirá",
    note: "La ruptura de las vasijas (mundo de Tohu).",
  },
  {
    id: "orkli:tzimtzum", dimension: "or-kli",
    es: "Tzimtzum", fa: "تزیمتزوم", he: "צִמְצוּם",
    aliases: uniqLower("tzimtzum", "la contracción", "contracción", "تزیمتزوم", "צמצום"),
    graphNodeId: "Tzimtzum",
    note: "La contracción de la Luz infinita que abre espacio para el mundo.",
  },
  {
    id: "orkli:tikún", dimension: "or-kli",
    es: "Tikún", fa: "تیقون", he: "תִּיקּוּן",
    aliases: uniqLower("tikún", "tikun", "tikkun", "reparación", "rectificación", "تیقون", "תיקון"),
    note: "La reparación: reunir las chispas, rectificar las vasijas (mundo de Tikún).",
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// 5) OLAMOT — Adam Kadmón + los 4 mundos. El grafo tiene UN nodo agregado
//    "Olamot" (los 4 mundos); los mundos individuales no son nodos sueltos hoy.
// ═══════════════════════════════════════════════════════════════════════════
const OLAMOT_ENTITIES: KabEntity[] = [
  {
    id: "olam:adam-kadmon", dimension: "olamot",
    es: "Adam Kadmón", fa: "آدام قَدمون", he: "אָדָם קַדְמוֹן",
    aliases: uniqLower("adam kadmón", "adam kadmon", "a\"k", "el hombre primordial", "آدام قدمون", "אדם קדמון"),
    note: "El mundo primordial, anterior a los cuatro; la primera emanación tras el tzimtzum.",
  },
  {
    id: "olam:atzilut", dimension: "olamot",
    es: "Atzilut", fa: "آتزیلوت", he: "אֲצִילוּת",
    aliases: uniqLower("atzilut", "mundo de la emanación", "emanación", "آتزیلوت", "אצילות"),
    value: 72, // Atzilut ↔ AB
    note: "Mundo de la Emanación (asociado al miluy AB · 72).",
  },
  {
    id: "olam:beria", dimension: "olamot",
    es: "Beriá", fa: "بِریاه", he: "בְּרִיאָה",
    aliases: uniqLower("beriá", "beria", "beriah", "mundo de la creación", "creación", "بریاه", "בריאה"),
    value: 63, // Beriá ↔ SaG
    note: "Mundo de la Creación (asociado al miluy SaG · 63).",
  },
  {
    id: "olam:yetzira", dimension: "olamot",
    es: "Yetzirá", fa: "یِتزیراه", he: "יְצִירָה",
    aliases: uniqLower("yetzirá", "yetzira", "yetzirah", "mundo de la formación", "formación", "یتزیراه", "יצירה"),
    value: 45, // Yetzirá ↔ MaH
    note: "Mundo de la Formación (asociado al miluy MaH · 45).",
  },
  {
    id: "olam:asiya", dimension: "olamot",
    es: "Asiyá", fa: "عَسیّا", he: "עֲשִׂיָּה",
    aliases: uniqLower("asiyá", "asiya", "asiyah", "asia", "mundo de la acción", "acción", "عسیا", "עשיה"),
    value: 52, // Asiyá ↔ BaN
    note: "Mundo de la Acción (asociado al miluy BaN · 52).",
  },
  {
    id: "olam:olamot", dimension: "olamot",
    es: "Los 4 Mundos", fa: "چهار عالَم", he: "אֲבי\"ע",
    aliases: uniqLower("los 4 mundos", "4 mundos", "cuatro mundos", "olamot", "abyá", "abiyá", "چهار عالم", "אבי\"ע"),
    graphNodeId: "Olamot",
    note: "El nodo agregado del grafo: Atzilut→Beriá→Yetzirá→Asiyá (ABYA).",
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// 6) NOMBRES — Nombres divinos y los 4 miluim (expansiones) de YHVH.
//    Los Nombres principales YA son nodos del grafo; los miluim no aún.
// ═══════════════════════════════════════════════════════════════════════════
const NOMBRES_ENTITIES: KabEntity[] = [
  {
    id: "nombre:yhvh", dimension: "nombres",
    es: "YHVH (Havayá)", fa: "یهوه (هَوایا)", he: "יהוה",
    aliases: uniqLower("yhvh", "havayá", "havaya", "tetragrámaton", "tetragrammaton", "el nombre", "هَوایا", "یهوه", "יהוה"),
    value: 26,
    graphNodeId: "YHVH",
    note: "El Tetragrámaton, 26.",
  },
  {
    id: "nombre:ehyé", dimension: "nombres",
    es: "Ehyé", fa: "اَهیه", he: "אֶהְיֶה",
    aliases: uniqLower("ehyé", "ehye", "eheyé", "ehyeh", "yo seré", "اهیه", "אהיה"),
    value: 21,
    graphNodeId: "Ehyé",
    note: "El Nombre de Kéter, 21 (Éx 3:14).",
  },
  {
    id: "nombre:ehyé-asher-ehyé", dimension: "nombres",
    es: "Ehyé Asher Ehyé", fa: "اَهیه اَشِر اَهیه", he: "אֶהְיֶה אֲשֶׁר אֶהְיֶה",
    aliases: uniqLower("ehyé asher ehyé", "ehye asher ehye", "seré el que seré", "אהיה אשר אהיה"),
    value: 543,
    graphNodeId: "Ehyé Asher Ehyé",
    note: "La respuesta de la zarza, 543 (Éx 3:14).",
  },
  {
    id: "nombre:adonai", dimension: "nombres",
    es: "Adonai", fa: "اَدونای", he: "אֲדֹנָי",
    aliases: uniqLower("adonai", "adonái", "mi señor", "اَدونای", "אדני"),
    value: 65,
    note: "El Nombre revelado, 65; complemento de YHVH.",
  },
  {
    id: "nombre:elohim", dimension: "nombres",
    es: "Elohim", fa: "اِلوهیم", he: "אֱלֹהִים",
    aliases: uniqLower("elohim", "el nombre del juicio", "اِلوهیم", "אלהים"),
    value: 86,
    note: "El Nombre del juicio y la naturaleza (= HaTeva, 86).",
  },
  {
    id: "nombre:shaddai", dimension: "nombres",
    es: "Shaddai", fa: "شَدّای", he: "שַׁדַּי",
    aliases: uniqLower("shaddai", "shadai", "el shaddai", "شَدّای", "שדי"),
    value: 314,
    note: "El Nombre del límite, 314 (= Metatrón).",
  },
  {
    id: "nombre:72", dimension: "nombres",
    es: "Nombre de 72", fa: "نام ۷۲", he: "שֵׁם ע\"ב",
    aliases: uniqLower("nombre de 72", "shem hamforash", "shem hameforash", "72 nombres", "los 72 nombres", "نام ۷۲", "شم המפורש"),
    value: 72,
    graphNodeId: "Nombre de 72",
    note: "El Shem HaMforash de 72 tripletes (Éx 14:19-21) = 216 letras.",
  },
  {
    id: "nombre:42", dimension: "nombres",
    es: "Nombre de 42", fa: "نام ۴۲", he: "שֵׁם מ\"ב",
    aliases: uniqLower("nombre de 42", "shem mem-bet", "ana bekoaj", "aná bekoaj", "نام ۴۲", "שם מ\"ב"),
    value: 42,
    graphNodeId: "Nombre de 42",
    note: "El Nombre de 42 letras (Aná BeKoaj).",
  },
  // ── Los 4 miluim (expansiones) del Nombre YHVH → los 4 mundos ──
  {
    id: "nombre:miluy-ab", dimension: "nombres",
    es: "AB (ע\"ב · 72)", fa: "عَب (۷۲)", he: "ע\"ב",
    aliases: uniqLower("ab", "ע\"ב", "miluy ab", "milui ab", "expansión de 72", "عب"),
    value: 72,
    note: "Expansión de YHVH con yud = 72; mundo de Atzilut, Jojmá/Aba.",
  },
  {
    id: "nombre:miluy-sag", dimension: "nombres",
    es: "SaG (ס\"ג · 63)", fa: "سَگ (۶۳)", he: "ס\"ג",
    aliases: uniqLower("sag", "sa\"g", "ס\"ג", "miluy sag", "milui sag", "expansión de 63", "سگ"),
    value: 63,
    note: "Expansión = 63; mundo de Beriá, Biná/Ima.",
  },
  {
    id: "nombre:miluy-mah", dimension: "nombres",
    es: "MaH (מ\"ה · 45)", fa: "مَه (۴۵)", he: "מ\"ה",
    aliases: uniqLower("mah", "ma\"h", "מ\"ה", "miluy mah", "milui mah", "expansión de 45", "مه"),
    value: 45,
    note: "Expansión = 45 = Adam; mundo de Yetzirá, Zeir Anpín, el Tikún.",
  },
  {
    id: "nombre:miluy-ban", dimension: "nombres",
    es: "BaN (ב\"ן · 52)", fa: "بَن (۵۲)", he: "ב\"ן",
    aliases: uniqLower("ban", "ba\"n", "ב\"ן", "miluy ban", "milui ban", "expansión de 52", "بن"),
    value: 52,
    note: "Expansión = 52 = Ben; mundo de Asiyá, Nukvá/Maljut.",
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// 7) SENDEROS — los 32 senderos de sabiduría: 10 sefirot + 22 letras.
//    Es una entidad ESTRUCTURAL: la entrada "32 senderos" como concepto, más
//    el puntero a que cada letra (otiot) ES un sendero entre dos sefirot.
// ═══════════════════════════════════════════════════════════════════════════
const SENDEROS_ENTITIES: KabEntity[] = [
  {
    id: "sendero:32-netivot", dimension: "senderos",
    es: "Los 32 senderos de sabiduría", fa: "سی‌ودو مسیرِ حکمت", he: "ל\"ב נְתִיבוֹת",
    aliases: uniqLower("32 senderos", "los 32 senderos", "32 netivot", "netivot jojmá", "lev", "سی‌ودو مسیر", "לב נתיבות", "ל\"ב נתיבות"),
    value: 32, // Lev (corazón) = 32 = 10 sefirot + 22 letras
    note: "10 sefirot + 22 letras = 32 (Sefer Yetzirá 1:1). Lev (corazón) = 32.",
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// REGISTRO CANÓNICO COMPLETO
// ═══════════════════════════════════════════════════════════════════════════
export const KAB_ENTITIES: KabEntity[] = [
  ...SEFIROT_ENTITIES,
  ...OTIOT_ENTITIES,
  ...PARTZUFIM_ENTITIES,
  ...OR_KLI_ENTITIES,
  ...OLAMOT_ENTITIES,
  ...NOMBRES_ENTITIES,
  ...SENDEROS_ENTITIES,
];

// ── Helpers de lookup (para la Fase 3) ──────────────────────────────────────

// Normaliza un término para comparar: minúsculas, sin diacríticos latinos.
// Conserva el hebreo (U+0590–05FF) y el árabe/persa (U+0600–06FF) intactos,
// porque ahí el "acento" es parte de la letra, no un adorno separable.
export function normalizeEntityTerm(s: string): string {
  return (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // quita SOLO diacríticos latinos (é → e)
    .replace(/\s+/g, " ")
    .trim();
}

// Índice alias-normalizado → entidad (la primera entidad gana ante colisión).
const ALIAS_INDEX: Map<string, KabEntity> = (() => {
  const m = new Map<string, KabEntity>();
  for (const e of KAB_ENTITIES) {
    for (const a of e.aliases) {
      const k = normalizeEntityTerm(a);
      if (k && !m.has(k)) m.set(k, e);
    }
  }
  return m;
})();

// Devuelve la entidad canónica para un término suelto (o null si no se reconoce).
export function findEntity(term: string): KabEntity | null {
  return ALIAS_INDEX.get(normalizeEntityTerm(term)) ?? null;
}

// Devuelve la entidad por su id de registro (ej. "sefira:chesed").
export function getEntityById(id: string): KabEntity | null {
  return KAB_ENTITIES.find((e) => e.id === id) ?? null;
}

// Todas las entidades de una dimensión (ej. todas las sefirot).
export function entitiesByDimension(dim: EntityDimension): KabEntity[] {
  return KAB_ENTITIES.filter((e) => e.dimension === dim);
}
