// ─────────────────────────────────────────────────────────────────────────
// discipline.ts — deriva la DISCIPLINA (galaxia del cerebro) de una ref de
// Sefaria. Antes el harvest del cerebro metía TODO estudio de texto en la
// galaxia "tanakh" por defecto, y un texto cabalístico como "Sefer Etz Chaim
// 25:1:1" caía en Tanaj. Aquí derivamos la categoría REAL del texto desde el
// catálogo autogenerado de Sefaria (grupo top: Tanakh/Mishnah/Talmud/Midrash/
// Kabbalah/Chasidut) y la mapeamos a la `cat` del grafo (BRAIN_CATS).
//
// REGLA DEL SOFER (galaxia "Comentarios"): el motor de clasificación es el campo
// `dependence` de Sefaria (/api/v2/raw/index/{título}). NO listas a mano:
//   · `dependence` ausente → TEXTO BASE → clasifica por categories[0].
//   · `dependence` == "Commentary" | "Targum":
//       - si categories[0] == "Tanakh" → la OBRA va a "commentary" (Comentarios).
//       - si no → la OBRA se queda con la disciplina de su BASE (comentarios del
//         Talmud → Talmud; de la Mishná → Mishná; de la Halajá → Halajá).
// La PERSONA (el sabio) va siempre a Personajes; la OBRA va a su disciplina.
//
// La parte SÍNCRONA (disciplineFromRef) no tiene red: usa el catálogo (textos
// base) + un diccionario de alias de comentaristas/Targumim como FALLBACK.
// La parte ASÍNCRONA (disciplineFromIndex) consulta Sefaria con caché para
// aplicar la regla `dependence` con exactitud cuando hay red.
// ─────────────────────────────────────────────────────────────────────────

import { CATALOG } from "@/lib/sources/catalog.generated";

// Grupo top de Sefaria → clave de BRAIN_CATS (galaxia del cerebro).
const GROUP_TO_CAT: Record<string, string> = {
  Tanakh: "tanakh",
  Mishnah: "mishnah",
  Talmud: "talmud",
  Midrash: "midrash",
  Kabbalah: "kabbalah",
  Chasidut: "chasidut",
  Halakhah: "halakhah",
  Liturgy: "tanakh", // sidur/piyut: sin galaxia propia → al núcleo bíblico
  Philosophy: "philosophy",
};
export function groupToCat(group: string | undefined): string | null {
  return group ? GROUP_TO_CAT[group] ?? null : null;
}

// Índice bookId (lowercase) → cat del cerebro, construido una sola vez.
// El bookId del catálogo (ej. "Sefer Etz Chaim", "Genesis", "Likutei Moharan")
// es exactamente el prefijo que Sefaria usa al inicio de cualquier ref de ese
// libro, así que sirve para reconocer el libro dentro de una ref.
const BOOK_TO_CAT: Map<string, string> = (() => {
  const m = new Map<string, string>();
  for (const group of CATALOG) {
    const cat = GROUP_TO_CAT[group.id];
    if (!cat) continue;
    for (const sub of group.subs) {
      for (const book of sub.books) {
        m.set(book.id.toLowerCase(), cat);
      }
    }
  }
  return m;
})();

// ── Diccionario de COMENTARISTAS / Targumim (FALLBACK sin red) ─────────────
// El catálogo autogenerado SOLO trae textos base (los comentarios los trae el
// motor RAG), así que disciplineFromRef no los reconocería. Este diccionario es
// el respaldo que pidió el Sofer: cuando NO hay red o el id no resuelve por el
// índice de Sefaria, reconoce al comentarista por el prefijo de su obra.
//
// La cat es la galaxia donde va la OBRA según la regla `dependence`:
//   · comentario AL TANAJ → "commentary".
//   · comentario AL TALMUD/MISHNÁ/HALAJÁ → su disciplina base (talmud/mishnah/halakhah).
// Targumim: SIEMPRE del Tanaj → "commentary".
// Las claves son el inicio (lowercase) del título Sefaria de la obra. Probamos
// el prefijo MÁS LARGO primero (orden por longitud, abajo).
const COMMENTATOR_PREFIXES: Record<string, string> = {
  // ── Comentarios al Tanaj → Comentarios (commentary) ──
  "ibn ezra": "commentary",
  "rashbam on": "commentary",          // Rashbam comenta Tanaj (su Talmud es "Rashbam" sobre Bava Batra/Pesachim)
  "radak": "commentary",
  "ramban on torah": "commentary",
  "ramban on": "commentary",           // Ramban comenta principalmente Tanaj
  "sforno": "commentary",
  "abarbanel on torah": "commentary",
  "abarbanel on": "commentary",
  "malbim": "commentary",
  "or hachaim": "commentary",          // Or HaJaim (sobre la Torá)
  "or hahchaim": "commentary",
  "kli yakar": "commentary",
  "ralbag": "commentary",              // Gersónides sobre Tanaj
  "ralbag beur hamilot": "commentary",
  "baal haturim": "commentary",
  "chizkuni": "commentary",
  "siftei chakhamim": "commentary",    // Siftei Jajamim (supercomentario de Rashi sobre Tanaj)
  "tur haaroch": "commentary",
  "bekhor shor": "commentary",
  "daat zkenim": "commentary",
  "rabbeinu bahya": "commentary",
  "rabbeinu bachya": "commentary",
  "rashi on genesis": "commentary",    // Rashi sobre Tanaj → Comentarios (su Rashi sobre Talmud → talmud)
  "rashi on exodus": "commentary",
  "rashi on leviticus": "commentary",
  "rashi on numbers": "commentary",
  "rashi on deuteronomy": "commentary",
  "rashi on isaiah": "commentary",
  "rashi on psalms": "commentary",
  "ibn ezra on": "commentary",
  // ── Targumim (siempre del Tanaj) → Comentarios ──
  "onkelos": "commentary",
  "targum onkelos": "commentary",
  "targum jonathan": "commentary",
  "targum yonatan": "commentary",
  "targum yonatan ben uziel": "commentary",
  "targum jerusalem": "commentary",
  "targum yerushalmi": "commentary",
  "targum neofiti": "commentary",
  "targum pseudo-jonathan": "commentary",
  "aramaic targum": "commentary",
  // ── Comentarios al Talmud → se quedan en Talmud ──
  "rashi on berakhot": "talmud",
  "tosafot": "talmud",
  "tosafot on": "talmud",
  "rashi on shabbat": "talmud",
  "rabbeinu chananel": "talmud",
  "ran on": "talmud",
  "rashba on": "talmud",
  "ritva on": "talmud",
  "meiri on": "talmud",
  "maharsha": "talmud",
  "maharshal": "talmud",
  // ── Comentarios a la Mishná → Mishná ──
  "bartenura": "mishnah",
  "rambam on mishnah": "mishnah",
  "tosafot yom tov": "mishnah",
  "ikar tosafot yom tov": "mishnah",
  // ── Comentarios a la Halajá → Halajá ──
  "mishnah berurah": "halakhah",
  "shulchan arukh": "halakhah",        // base, pero por si aparece como comentario
  "magen avraham": "halakhah",
  "taz on": "halakhah",
  "shach on": "halakhah",
};
const COMMENTATOR_PREFIXES_BY_LEN: string[] = Object.keys(COMMENTATOR_PREFIXES).sort(
  (a, b) => b.length - a.length,
);

// `collective_title` del comentarista (la PERSONA) → su nombre canónico de nodo
// en la galaxia "Personajes". La obra va a su disciplina; el AUTOR va aquí.
const COMMENTATOR_PERSON: Record<string, string> = {
  "ibn ezra": "Ibn Ezra",
  rashbam: "Rashbam",
  radak: "Radak",
  ramban: "Ramban",
  sforno: "Sforno",
  abarbanel: "Abarbanel",
  malbim: "Malbim",
  "or hachaim": "Or HaJaim",
  "or hahchaim": "Or HaJaim",
  "kli yakar": "Kli Yakar",
  ralbag: "Ralbag",
  "baal haturim": "Baal HaTurim",
  chizkuni: "Chizkuni",
  "siftei chakhamim": "Siftei Jajamim",
  rashi: "Rashi",
  tosafot: "Tosafot",
  onkelos: "Onkelos",
  "targum yonatan": "Yonatan ben Uziel",
  "targum jonathan": "Yonatan ben Uziel",
};
// Resuelve un collective_title (cualquier grafía) al nombre de PERSONA canónico.
export function commentatorPerson(collectiveTitle: string | undefined): string | null {
  const t = (collectiveTitle || "").trim();
  if (!t) return null;
  const low = t.toLowerCase();
  for (const k of Object.keys(COMMENTATOR_PERSON)) {
    if (low === k || low.startsWith(k)) return COMMENTATOR_PERSON[k];
  }
  // si no está en el diccionario, usamos el propio collective_title (titlecase suave)
  return t;
}

// ── Comentaristas / Targumim como NOMBRE SUELTO (nodo cosechado "Ibn Ezra") ──
// La cosecha a veces crea un nodo con el NOMBRE del comentarista (no la ref de
// la obra), p.ej. {{study:Ibn Ezra}} → nodo "Ibn Ezra" suelto. Estos son la
// PERSONA y van a Personajes (figure). Los Targumim sueltos van a Comentarios
// (la obra). Este mapa cubre el nombre exacto (lowercase) → galaxia destino.
const COMMENTATOR_NAME_TO_CAT: Record<string, string> = {
  // personas (el sabio) → Personajes
  "ibn ezra": "figure",
  rashbam: "figure",
  radak: "figure",
  ramban: "figure",
  sforno: "figure",
  abarbanel: "figure",
  malbim: "figure",
  "or hajaim": "figure",
  "or hachaim": "figure",
  "kli yakar": "figure",
  ralbag: "figure",
  "baal haturim": "figure",
  chizkuni: "figure",
  "siftei jajamim": "figure",
  "siftei chakhamim": "figure",
  rashi: "figure",
  tosafot: "figure",
  // Targumim sueltos = OBRAS → Comentarios
  onkelos: "commentary",
  "targum onkelos": "commentary",
  "targum yonatan": "commentary",
  "targum jonathan": "commentary",
  "yonatan ben uziel": "figure", // la PERSONA del Targum
};
/**
 * Si `label` es el NOMBRE de un comentarista/Targum suelto, devuelve su galaxia
 * destino (figure para personas, commentary para Targumim-obra). null si no es
 * un comentarista conocido. Usado por la migración para sacar comentaristas de
 * la galaxia Tanaj.
 */
export function commentatorNameToCat(label: string): string | null {
  const low = (label || "").trim().toLowerCase();
  if (!low) return null;
  return COMMENTATOR_NAME_TO_CAT[low] ?? null;
}

// Lista de bookIds ordenada por longitud DESC: probamos el prefijo más largo
// primero para no confundir "Sefer Etz Chaim" con un hipotético "Sefer".
const BOOK_IDS_BY_LEN: string[] = Array.from(BOOK_TO_CAT.keys()).sort(
  (a, b) => b.length - a.length,
);

// El siguiente carácter tras el nombre del libro en una ref de Sefaria es un
// separador real (espacio antes del número/sección, coma, o fin), nunca una
// letra — así "Numbers" no matchea dentro de "Numbers Rabbah".
function isBoundary(ch: string | undefined): boolean {
  return ch === undefined || ch === " " || ch === "," || ch === ":" || ch === ".";
}

/**
 * Deriva la `cat` del cerebro (galaxia) a partir de una ref de Sefaria.
 * Devuelve null si la ref no corresponde a ningún libro/comentarista conocido,
 * para que quien llama decida el fallback (NUNCA forzamos "tanakh" silenciosamente).
 *
 * Orden: primero COMENTARISTAS/Targumim (diccionario de alias), luego textos
 * BASE (catálogo). Un comentarista del Tanaj (ej. "Ibn Ezra on Genesis 1:1")
 * cae a "commentary", NO a "tanakh".
 *
 * Ejemplos:
 *   "Ibn Ezra on Genesis 1:1"     → "commentary"
 *   "Targum Yonatan, Genesis 5:24"→ "commentary"
 *   "Rashi on Berakhot 2a"        → "talmud"
 *   "Sefer Etz Chaim 25:1:1"      → "kabbalah"
 *   "Genesis 1:1"                 → "tanakh"
 *   "Rosh Hashanah 16a"           → "talmud"
 */
export function disciplineFromRef(ref: string): string | null {
  const r = (ref || "").trim();
  if (!r) return null;
  const lower = r.toLowerCase();
  // 1) ¿Es un comentarista / Targum conocido? (prefijo más largo primero)
  for (const pre of COMMENTATOR_PREFIXES_BY_LEN) {
    if (lower.startsWith(pre) && isBoundary(lower[pre.length])) {
      return COMMENTATOR_PREFIXES[pre];
    }
  }
  // 2) Texto base reconocido por el catálogo.
  for (const bookId of BOOK_IDS_BY_LEN) {
    if (lower.startsWith(bookId) && isBoundary(lower[bookId.length])) {
      return BOOK_TO_CAT.get(bookId) ?? null;
    }
  }
  return null;
}

// ── Regla `dependence`-based con índice de Sefaria (ASÍNCRONA, con caché) ──
// Aplica la regla del Sofer con exactitud: consulta /api/v2/raw/index/{título}
// y mira `dependence` + `categories[0]`. Cae al diccionario síncrono si no hay
// red. Cachea por título (en memoria del proceso) para no repetir red.

type IndexInfo = { cat: string | null; person: string | null };
const indexCache = new Map<string, IndexInfo>();

// Extrae el "título de índice" de una ref (lo de antes del primer número/coma).
// "Ibn Ezra on Genesis 1:1" → "Ibn Ezra on Genesis"; "Rosh Hashanah 16a" → "Rosh Hashanah".
function indexTitleFromRef(ref: string): string {
  const r = (ref || "").trim();
  // corta en el primer dígito o ":" (sección numérica)
  const m = r.match(/^(.*?)(?:\s+\d|,|\s+\d+[ab]|:)/);
  let title = (m ? m[1] : r).trim();
  // quita una coma final residual
  title = title.replace(/[,:]\s*$/, "").trim();
  return title || r;
}

/**
 * Deriva la galaxia de una ref CONSULTANDO el índice de Sefaria (regla
 * `dependence`). Devuelve { cat, person }:
 *   · cat   → galaxia de la OBRA (commentary / talmud / mishnah / … / base).
 *   · person→ nombre de PERSONA (collective_title) para la galaxia Personajes,
 *             o null si la obra es un texto base (sin autor-comentarista).
 * Si la red falla, cae a disciplineFromRef (diccionario síncrono) y deja
 * person = collective inferido por el diccionario, si lo hay.
 */
export async function disciplineFromIndex(ref: string): Promise<IndexInfo> {
  const title = indexTitleFromRef(ref);
  const key = title.toLowerCase();
  const cached = indexCache.get(key);
  if (cached) return cached;

  let info: IndexInfo = { cat: null, person: null };
  try {
    const res = await fetch(
      `https://www.sefaria.org/api/v2/raw/index/${encodeURIComponent(title)}`,
      { headers: { Accept: "application/json" } },
    );
    if (res.ok) {
      const idx = (await res.json()) as {
        dependence?: string;
        categories?: string[];
        collective_title?: string | { en?: string };
        base_text_titles?: Array<string | { en?: string }>;
      };
      const dependence = (idx.dependence || "").trim();
      const cat0 = idx.categories?.[0];
      const collective =
        typeof idx.collective_title === "string"
          ? idx.collective_title
          : idx.collective_title?.en;

      if (dependence === "Commentary" || dependence === "Targum") {
        if (cat0 === "Tanakh") {
          info.cat = "commentary";
        } else {
          // comentario de Talmud/Mishná/Halajá → disciplina de su BASE
          info.cat = groupToCat(cat0) ?? "commentary";
        }
        info.person = commentatorPerson(collective);
      } else {
        // texto BASE → por categories[0]
        info.cat = groupToCat(cat0);
        info.person = null;
      }
    }
  } catch {
    /* sin red → fallback */
  }

  if (!info.cat) {
    // Fallback síncrono (diccionario de alias). person via diccionario.
    info = { cat: disciplineFromRef(ref), person: null };
  }
  indexCache.set(key, info);
  return info;
}
