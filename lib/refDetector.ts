// Detector de referencias bíblicas y talmúdicas en texto español/farsi/inglés.
// Detecta y convierte referencias en objetos {text, ref} donde ref es el
// formato que entiende la API de Sefaria.

export interface DetectedRef {
  match: string;   // texto original (ej. "Génesis 1:1")
  ref: string;     // ref para Sefaria (ej. "Genesis 1:1")
}

// Mapa de nombres del libro en ES/EN/transliteración → título Sefaria
const BOOK_MAP: Record<string, string> = {
  // Torá
  "génesis": "Genesis", "genesis": "Genesis", "bereshit": "Genesis", "בראשית": "Genesis",
  "éxodo": "Exodus", "exodo": "Exodus", "shemot": "Exodus", "שמות": "Exodus",
  "levítico": "Leviticus", "levitico": "Leviticus", "vayikrá": "Leviticus", "vayikra": "Leviticus",
  "números": "Numbers", "numeros": "Numbers", "bamidbar": "Numbers", "במדבר": "Numbers",
  "deuteronomio": "Deuteronomy", "devarim": "Deuteronomy", "דברים": "Deuteronomy",
  // Neviim
  "josué": "Joshua", "josue": "Joshua", "yehoshúa": "Joshua", "yehoshua": "Joshua",
  "jueces": "Judges", "shoftim": "Judges",
  "isaías": "Isaiah", "isaias": "Isaiah", "yeshayahu": "Isaiah",
  "jeremías": "Jeremiah", "jeremias": "Jeremiah", "yirmeyahu": "Jeremiah",
  "ezequiel": "Ezekiel", "yejezkel": "Ezekiel", "yechezkél": "Ezekiel",
  "oseas": "Hosea", "hoshea": "Hosea",
  "amós": "Amos", "amos": "Amos",
  "jonás": "Jonah", "jonas": "Jonah", "yoná": "Jonah", "yona": "Jonah",
  "miqueas": "Micah", "mijá": "Micah", "mija": "Micah",
  "zacarías": "Zechariah", "zecarias": "Zechariah",
  "malaquías": "Malachi", "malaquias": "Malachi",
  // Ketuvim
  "salmos": "Psalms", "tehilim": "Psalms", "tehilím": "Psalms",
  "proverbios": "Proverbs", "mishlei": "Proverbs",
  "job": "Job", "iyov": "Job",
  "cantares": "Song of Songs", "shir hashirim": "Song of Songs",
  "rut": "Ruth",
  "lamentaciones": "Lamentations", "eijá": "Lamentations", "eija": "Lamentations",
  "eclesiastés": "Ecclesiastes", "eclesiastes": "Ecclesiastes", "kohélet": "Ecclesiastes", "kohelet": "Ecclesiastes",
  "ester": "Esther",
  "daniel": "Daniel",
  "ezrá": "Ezra", "ezra": "Ezra",
  "nehemías": "Nehemiah", "nehemias": "Nehemiah",
  // Talmud
  "berajot": "Berakhot", "berakhot": "Berakhot", "berachot": "Berakhot",
  "shabat": "Shabbat", "shabbat": "Shabbat",
  "eruvin": "Eruvin",
  "pesajim": "Pesachim", "pesachim": "Pesachim",
  "yoma": "Yoma",
  "suca": "Sukkah", "sukkah": "Sukkah",
  "sanedrín": "Sanhedrin", "sanhedrin": "Sanhedrin",
  "bava metzía": "Bava Metzia", "bava metzia": "Bava Metzia",
  "bava kama": "Bava Kamma",
  "bava batra": "Bava Batra",
  "avoda zará": "Avodah Zarah", "avodah zarah": "Avodah Zarah",
  "avot": "Pirkei Avot", "pirkei avot": "Pirkei Avot",
  "kidushin": "Kiddushin", "kiddushin": "Kiddushin",
  "guitin": "Gittin",
  "sotá": "Sotah", "sotah": "Sotah",
  "makot": "Makkot",
  "jevamot": "Yevamot",
  "ketubot": "Ketubot",
  "nedarim": "Nedarim",
  "nazir": "Nazir",
  "julín": "Chullin", "chullin": "Chullin",
  // Midrash
  "bereshit rabá": "Genesis Rabbah", "bereshit raba": "Genesis Rabbah", "génesis rabá": "Genesis Rabbah",
  "shemot rabá": "Exodus Rabbah", "éxodo rabá": "Exodus Rabbah",
  "vayikrá rabá": "Leviticus Rabbah",
  "bamidbar rabá": "Numbers Rabbah",
  "devarim rabá": "Deuteronomy Rabbah",
  "tanjumá": "Midrash Tanchuma", "tanchuma": "Midrash Tanchuma",
  "pirkei derabi eliezer": "Pirkei DeRabbi Eliezer",
  // Kabbalah / Jasidut
  "zohar": "Zohar",
  "tania": "Tanya", "tanya": "Tanya",
};

// Regexes para capturar referencias con capítulo:versículo o daf+amud.
// Formato 1: "Libro X:Y" (bíblico — capítulo:versículo)
// Formato 2: "Libro Xb" (talmúdico — daf + amud)
// Formato 3: "Libro X, Y" o "Libro X.Y" (alternativo)

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Ordena los nombres de mayor a menor longitud (para que "bereshit rabá" gane a "bereshit")
const BOOK_NAMES_SORTED = Object.keys(BOOK_MAP).sort((a, b) => b.length - a.length);

const BOOK_PATTERN = BOOK_NAMES_SORTED.map(escapeRegex).join("|");

// Capítulo:versículo o rango (ej. 1:1, 1:1-5, 1:1-2:3)
const CV = String.raw`\d+:\d+(?:-\d+(?::\d+)?)?`;
// Daf+amud talmúdico (ej. 2a, 14b, 64a)
const DAF = String.raw`\d+[ab]`;

// Regex principal (case-insensitive)
const REF_REGEX = new RegExp(
  `(${BOOK_PATTERN})\\s+(${CV}|${DAF})`,
  "gi"
);

/**
 * Detecta referencias en un texto y devuelve la lista de coincidencias únicas.
 */
export function detectRefs(text: string): DetectedRef[] {
  const found: DetectedRef[] = [];
  const seen = new Set<string>();
  let m: RegExpExecArray | null;
  REF_REGEX.lastIndex = 0;
  while ((m = REF_REGEX.exec(text)) !== null) {
    const bookRaw = m[1].toLowerCase();
    const location = m[2];
    const sefBook = BOOK_MAP[bookRaw];
    if (!sefBook) continue;
    const ref = `${sefBook} ${location}`;
    if (seen.has(ref)) continue;
    seen.add(ref);
    found.push({ match: m[0], ref });
  }
  return found;
}

/**
 * Divide un texto en segmentos de texto plano y referencias detectadas.
 * Útil para renderizar con enlaces intercalados.
 */
export type Segment =
  | { type: "text"; value: string }
  | { type: "ref"; value: string; ref: string };

export function segmentText(text: string): Segment[] {
  const segments: Segment[] = [];
  let last = 0;
  REF_REGEX.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = REF_REGEX.exec(text)) !== null) {
    const bookRaw = m[1].toLowerCase();
    const sefBook = BOOK_MAP[bookRaw];
    if (!sefBook) continue;
    if (m.index > last) {
      segments.push({ type: "text", value: text.slice(last, m.index) });
    }
    segments.push({ type: "ref", value: m[0], ref: `${sefBook} ${m[2]}` });
    last = m.index + m[0].length;
  }
  if (last < text.length) {
    segments.push({ type: "text", value: text.slice(last) });
  }
  return segments;
}
