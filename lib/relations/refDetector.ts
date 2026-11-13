// Detector de referencias bíblicas y talmúdicas en texto español/farsi/inglés.
// Detecta y convierte referencias en objetos {text, ref} donde ref es el
// formato que entiende la API de Sefaria.

export interface DetectedRef {
  match: string;   // texto original (ej. "Génesis 1:1")
  ref: string;     // ref para Sefaria (ej. "Genesis 1:1")
}

import { CATALOG } from "@/lib/sources/catalog.generated";
import { BEN_PORAT_GROUPS, MEOR_EINAYIM_GROUPS } from "@/lib/sources/catalogOverrides";

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

// ─── Midrash ────────────────────────────────────────────────────────────────
// El motor cita Midrash en cada estudio desde que se le pide con número
// exacto, pero esas citas no se podían abrir: el detector solo entendía
// "Libro cap:versículo" y "Tratado daf", y el Midrash se cita de otras tres
// maneras. Aquí están las tres.
//
// Los nombres SON los que verificó el Sofer, y cada ref de ejemplo se comprobó
// contra la API de Sefaria (devuelve el mismo ref que se le pide, con texto).
// La lista hermana vive en lib/sources/citationCheck.ts, que JUZGA estas mismas
// citas; aquí solo se enlazan. Se mantienen aparte a propósito: el verificador
// arrastra las tablas de Tanaj, Talmud y Zóhar, que no tienen por qué viajar
// al navegador solo para pintar un enlace.

// 1. Obras con capítulos: "Bereshit Rabá 12:6", "Pirkei de Rabí Eliezer 34".
const MIDRASH_MAP: Record<string, string> = {
  "bereshit rabá": "Bereshit Rabbah", "bereshit raba": "Bereshit Rabbah",
  "génesis rabá": "Bereshit Rabbah", "genesis rabá": "Bereshit Rabbah",
  "shemot rabá": "Shemot Rabbah", "shemot raba": "Shemot Rabbah",
  "éxodo rabá": "Shemot Rabbah", "exodo rabá": "Shemot Rabbah",
  "vayikrá rabá": "Vayikra Rabbah", "vayikra rabá": "Vayikra Rabbah",
  "levítico rabá": "Vayikra Rabbah",
  "bamidbar rabá": "Bamidbar Rabbah", "bemidbar rabá": "Bamidbar Rabbah",
  "números rabá": "Bamidbar Rabbah",
  "devarim rabá": "Devarim Rabbah", "deuteronomio rabá": "Devarim Rabbah",
  "shir hashirim rabá": "Shir HaShirim Rabbah", "cantares rabá": "Shir HaShirim Rabbah",
  "rut rabá": "Ruth Rabbah", "ruth rabá": "Ruth Rabbah",
  "eijá rabá": "Eikhah Rabbah", "eikhá rabá": "Eikhah Rabbah", "ejá rabá": "Eikhah Rabbah",
  "lamentaciones rabá": "Eikhah Rabbah",
  "kohelet rabá": "Kohelet Rabbah", "kohélet rabá": "Kohelet Rabbah",
  "eclesiastés rabá": "Kohelet Rabbah",
  "ester rabá": "Esther Rabbah", "esther rabá": "Esther Rabbah",
  "pirkei de rabí eliezer": "Pirkei DeRabbi Eliezer",
  "pirkei derabí eliezer": "Pirkei DeRabbi Eliezer",
  "pirkei de rabi eliezer": "Pirkei DeRabbi Eliezer",
  "pesikta de rav kahaná": "Pesikta DeRav Kahana",
  "pesiktá de rav kahaná": "Pesikta DeRav Kahana",
  "pesikta de rav kahana": "Pesikta DeRav Kahana",
  "pesikta rabati": "Pesikta Rabbati", "pesiktá rabatí": "Pesikta Rabbati",
  "sifrí bamidbar": "Sifrei Bamidbar", "sifré bamidbar": "Sifrei Bamidbar",
  "sifrí números": "Sifrei Bamidbar",
  "sifrí devarim": "Sifrei Devarim", "sifré devarim": "Sifrei Devarim",
  "sifrí deuteronomio": "Sifrei Devarim",
  "midrash tehilim": "Midrash Tehillim", "midrash tehilím": "Midrash Tehillim",
  "midrash salmos": "Midrash Tehillim", "shojer tov": "Midrash Tehillim",
  "midrash mishlei": "Midrash Mishlei", "midrash proverbios": "Midrash Mishlei",
};

// 2. Obras divididas por parashá o masejta: "Tanjumá, Lej Lejá 7".
const MIDRASH_PART_MAP: Record<string, string> = {
  "tanjumá": "Midrash Tanchuma", "tanjuma": "Midrash Tanchuma",
  "midrash tanjumá": "Midrash Tanchuma", "tanchuma": "Midrash Tanchuma",
  "tanjumá buber": "Midrash Tanchuma Buber",
  "midrash tanjumá buber": "Midrash Tanchuma Buber",
  "mejiltá": "Mekhilta DeRabbi Yishmael", "mejilta": "Mekhilta DeRabbi Yishmael",
  "mejiltá de rabí yishmael": "Mekhilta DeRabbi Yishmael",
  "mejiltá de rabí ishmael": "Mekhilta DeRabbi Yishmael",
};

// Nombre de la parashá en español → título de Sefaria. Se reutilizan las
// parashiot ya traducidas y verificadas en el repo (las dos obras por parashá
// cubren entre ambas las 54) en vez de escribirlas otra vez.
const PART_MAP: Record<string, string> = (() => {
  const out: Record<string, string> = {};
  for (const g of [...BEN_PORAT_GROUPS, ...MEOR_EINAYIM_GROUPS]) {
    for (const sec of g.sections) {
      out[sec.label.toLowerCase()] = sec.refTitle;
      out[sec.refTitle.toLowerCase()] = sec.refTitle;
    }
  }
  // Las masajtot de la Mejiltá, con la grafía española del Sofer.
  const mejilta: [string, string][] = [
    ["pisja", "Tractate Pischa"], ["pischa", "Tractate Pischa"],
    ["vayehí beshalaj", "Tractate Vayehi Beshalach"],
    ["shirá", "Tractate Shirah"], ["shirah", "Tractate Shirah"],
    ["vayasá", "Tractate Vayassa"], ["amalek", "Tractate Amalek"],
    ["bajodesh", "Tractate Bachodesh"], ["nezikin", "Tractate Nezikin"],
    ["kaspa", "Tractate Kaspa"], ["shabatá", "Tractate Shabbata"],
  ];
  for (const [es, en] of mejilta) out[es] = en;
  return out;
})();

// 3. La Petijtá (los proemios), que se numera aparte de los capítulos:
//    "Eijá Rabá, Petijtá 24".
const PETICHTA_WORDS = "petijtá|petijta|petichta|petihta|proemio";

// 4. El Yalkut Shimoní, caso aparte. El verificador no lo juzga a propósito
// (se cita por "remez" y hay tres notaciones incompatibles), pero el motor lo
// cita de verdad y el lector merece poder abrirlo. Se enlaza SOLO cuando la
// cita nombra un libro de la Torá, porque Sefaria únicamente tiene el Yalkut
// sobre la Torá: el de Nevi'im y Ketuvim empieza a numerar otra vez desde 1, y
// enlazar "Yalkut, Shmuel 93" llevaría al remez 93 de la Torá — otro texto.
// Y se corta en 966, que es donde termina ("ends at Remez 966", comprobado).
const YALKUT_OBRA = String.raw`\b(?:yalkut\s+shimon[íi]|yalkut\s+shimoni|yalkut)`;
const YALKUT_LIBRO = String.raw`(?:bereshit|génesis|genesis|shemot|éxodo|exodo|vayikrá|vayikra|levítico|levitico|bamidbar|números|numeros|devarim|deuteronomio)`;
const YALKUT_NUM = String.raw`\d{1,3}(?::\d{1,3})?`;
// Dos formas, para que el enlace no se quede con un paréntesis sin cerrar:
// "Yalkut Shimoní (Bereshit 93:3)" y "Yalkut Shimoní, Bereshit 93".
const YALKUT_TORAH = new RegExp(
  `${YALKUT_OBRA}(?:\\s*\\(\\s*${YALKUT_LIBRO}[\\s,]+(${YALKUT_NUM})\\s*\\)` +
    `|[\\s,]+${YALKUT_LIBRO}[\\s,]+(${YALKUT_NUM}))`,
  "gi"
);
const YALKUT_ULTIMO_REMEZ = 966;

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

// ── Regexes del Midrash ────────────────────────────────────────────────────
const alternation = (keys: string[]) =>
  keys.sort((a, b) => b.length - a.length).map(escapeRegex).join("|");

// Sección suelta o capítulo:sección, con rango opcional: 34, 12:6, 12:6-7.
const SEC = String.raw`\d+(?::\d+)?(?:-\d+(?::\d+)?)?`;

// "Bereshit Rabá 12:6" · "Pirkei de Rabí Eliezer 34" · "Sifrí Devarim 343"
const MIDRASH_REGEX = new RegExp(`(${alternation(Object.keys(MIDRASH_MAP))}),?\\s+(${SEC})`, "gi");

// "Eijá Rabá, Petijtá 24"
const PETICHTA_REGEX = new RegExp(
  `(${alternation(Object.keys(MIDRASH_MAP))}),?\\s+(?:${PETICHTA_WORDS}),?\\s+(\\d+)`,
  "gi"
);

// "Tanjumá, Lej Lejá 7" · "Mejiltá, Shirá 3"
const MIDRASH_PART_REGEX = new RegExp(
  `(${alternation(Object.keys(MIDRASH_PART_MAP))}),?\\s+(${alternation(Object.keys(PART_MAP))}),?\\s+(\\d+)`,
  "gi"
);

// ── Folios del Talmud, con cualquier grafía ────────────────────────────────
// El mapa de arriba exige la grafía exacta, y el motor escribe con tildes:
// "Bavá Batrá 99a", "Sukká 14a", "Yevamot 64a" no se abrían aunque el tratado
// estuviera en la lista. Para los folios (número + a/b, un patrón que no se
// confunde con nada) se hace al revés: se captura el nombre venga como venga y
// se resuelve después, sin acentos y probando también los sufijos — así "En
// Yevamot 64a" encuentra el tratado aunque delante vaya la preposición.
// Los 37 tratados salen del catálogo, que ya los tiene con el id de Sefaria:
// no hay que mantener la lista a mano.
const TALMUD_IDS: string[] = CATALOG.flatMap((g) =>
  g.subs.flatMap((sub) => sub.books.filter((b) => b.type === "talmud").map((b) => b.id))
);

const sinAcentos = (x: string) =>
  x.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const ES_TALMUD = new Set(TALMUD_IDS);

// Cuántos capítulos tiene cada libro del Tanaj, del mismo catálogo. Sin esto
// se enlazaba "Génesis 93:3" —que aparece cuando el motor escribe "el Yalkut
// Shimoní (Bereshit 93:3)" y el detector se queda con el pedazo de dentro— y
// el lector pulsaba para llegar a un capítulo que no existe. Un enlace muerto
// es la misma promesa rota que una cita inventada.
const CAPITULOS: Record<string, number> = Object.fromEntries(
  CATALOG.flatMap((g) =>
    g.subs.flatMap((sub) =>
      sub.books
        .filter((b) => b.type === "chapters" && b.units > 0)
        .map((b) => [b.id, b.units] as const)
    )
  )
);

const TALMUD_LOOKUP: Record<string, string> = (() => {
  const out: Record<string, string> = {};
  for (const id of TALMUD_IDS) out[sinAcentos(id)] = id;
  // Las grafías españolas que ya estaban catalogadas arriba, SOLO las de
  // tratados: un libro del Tanaj no tiene folios, y "Génesis 14a" no existe.
  const esTalmud = ES_TALMUD;
  for (const [alias, id] of Object.entries(BOOK_MAP)) {
    if (esTalmud.has(id)) out[sinAcentos(alias)] = id;
  }
  // Transliteraciones que no se alcanzan quitando tildes.
  const extra: [string, string][] = [
    ["suca", "Sukkah"], ["suka", "Sukkah"], ["sukka", "Sukkah"],
    ["macot", "Makkot"], ["makot", "Makkot"],
    ["meguila", "Megillah"], ["jaguiga", "Chagigah"],
    ["guitin", "Gittin"], ["kidushin", "Kiddushin"],
    ["beitza", "Beitzah"], ["betza", "Beitzah"],
    ["taanit", "Taanit"], ["rosh hashana", "Rosh Hashanah"],
    ["moed katan", "Moed Katan"], ["nida", "Niddah"],
    ["julin", "Chullin"], ["menajot", "Menachot"], ["zevajim", "Zevachim"],
    ["bejorot", "Bekhorot"], ["arajin", "Arakhin"], ["temura", "Temurah"],
    ["keritot", "Keritot"], ["meila", "Meilah"], ["shevuot", "Shevuot"],
    ["avoda zara", "Avodah Zarah"], ["sanedrin", "Sanhedrin"],
    ["bava kama", "Bava Kamma"], ["bava metzia", "Bava Metzia"],
    ["bava batra", "Bava Batra"], ["berajot", "Berakhot"],
    ["eruvin", "Eruvin"], ["pesajim", "Pesachim"], ["yoma", "Yoma"],
    ["sota", "Sotah"], ["yevamot", "Yevamot"], ["jevamot", "Yevamot"],
    ["ketubot", "Ketubot"], ["horayot", "Horayot"], ["tamid", "Tamid"],
  ];
  for (const [alias, id] of extra) out[alias] = id;
  return out;
})();

// Nombre de hasta tres palabras justo antes del folio.
const TALMUD_REGEX = new RegExp(
  String.raw`([A-Za-zÀ-ÿ'’]+(?:\s+[A-Za-zÀ-ÿ'’]+){0,2})\s+(${DAF})`,
  "g"
);

/**
 * Prueba la frase entera y, si falla, sus sufijos (de más larga a más corta).
 * Devuelve también cuántos caracteres hay que saltarse por delante: lo
 * capturado puede traer palabras que no son la cita ("Rabí Elazar en Sukká"),
 * y el enlace debe abrazar el tratado y el folio, nada más.
 */
function resolveTalmud(phrase: string): { id: string; skip: number } | null {
  const words = phrase.trim().split(/\s+/);
  for (let i = 0; i < words.length; i++) {
    const id = TALMUD_LOOKUP[sinAcentos(words.slice(i).join(" "))];
    if (id) {
      const skip = i === 0 ? 0 : phrase.indexOf(words[i], words.slice(0, i).join(" ").length);
      return { id, skip: skip < 0 ? 0 : skip };
    }
  }
  return null;
}

interface RawMatch { start: number; end: number; match: string; ref: string; }

/**
 * Pasa una regex por el texto y traduce cada acierto a un ref de Sefaria.
 * `skip` recorta por delante lo capturado que no forma parte de la cita.
 */
function scan(
  text: string,
  re: RegExp,
  build: (m: RegExpExecArray) => { ref: string; skip?: number } | null
): RawMatch[] {
  const out: RawMatch[] = [];
  re.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    const hit = build(m);
    if (!hit) continue;
    const start = m.index + (hit.skip ?? 0);
    const end = m.index + m[0].length;
    out.push({ start, end, match: text.slice(start, end), ref: hit.ref });
  }
  return out;
}

/**
 * Todas las referencias del texto, ya sin solapes. El orden de las capas
 * importa: "Midrash Tehilim 90:3" tiene DENTRO lo que parece el salmo 90:3, y
 * "Eijá Rabá, Petijtá 24" tiene dentro "Eijá Rabá" a secas. Gana siempre el
 * acierto que empieza antes y, a igualdad, el más largo — es decir, la cita
 * completa, nunca el pedazo.
 */
function allMatches(text: string): RawMatch[] {
  const raw = [
    ...scan(text, PETICHTA_REGEX, (m) => {
      const work = MIDRASH_MAP[m[1].toLowerCase()];
      return work ? { ref: `${work}, Petichta ${m[2]}` } : null;
    }),
    ...scan(text, MIDRASH_PART_REGEX, (m) => {
      const work = MIDRASH_PART_MAP[m[1].toLowerCase()];
      const part = PART_MAP[m[2].toLowerCase()];
      return work && part ? { ref: `${work}, ${part} ${m[3]}` } : null;
    }),
    ...scan(text, YALKUT_TORAH, (m) => {
      const num = m[1] ?? m[2];
      const remez = Number(String(num).split(":")[0]);
      if (!remez || remez > YALKUT_ULTIMO_REMEZ) return null;
      return { ref: `Yalkut Shimoni on Torah ${num}` };
    }),
    ...scan(text, MIDRASH_REGEX, (m) => {
      const work = MIDRASH_MAP[m[1].toLowerCase()];
      return work ? { ref: `${work} ${m[2]}` } : null;
    }),
    ...scan(text, REF_REGEX, (m) => {
      const book = BOOK_MAP[m[1].toLowerCase()];
      if (!book) return null;
      // Un folio (14a) solo existe en un tratado del Talmud; un libro del
      // Tanaj se cita por capítulo:versículo. "Génesis 14a" no es una
      // referencia: no se enlaza a ninguna parte.
      if (/[ab]$/i.test(m[2]) && !ES_TALMUD.has(book)) return null;
      // Ni un capítulo que el libro no tiene.
      const cap = Number(m[2].split(":")[0]);
      const tiene = CAPITULOS[book];
      if (tiene && cap > tiene) return null;
      return { ref: `${book} ${m[2]}` };
    }),
    ...scan(text, TALMUD_REGEX, (m) => {
      const hit = resolveTalmud(m[1]);
      if (!hit) return null;
      return { ref: `${hit.id} ${m[2]}`, skip: hit.skip };
    }),
  ].sort((a, b) => a.start - b.start || b.end - a.end);

  const out: RawMatch[] = [];
  for (const m of raw) {
    if (out.length > 0 && m.start < out[out.length - 1].end) continue; // solapa
    out.push(m);
  }
  return out;
}

/**
 * Detecta referencias en un texto y devuelve la lista de coincidencias únicas.
 */
export function detectRefs(text: string): DetectedRef[] {
  const found: DetectedRef[] = [];
  const seen = new Set<string>();
  for (const m of allMatches(text)) {
    if (seen.has(m.ref)) continue;
    seen.add(m.ref);
    found.push({ match: m.match, ref: m.ref });
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
  for (const m of allMatches(text)) {
    if (m.start > last) {
      segments.push({ type: "text", value: text.slice(last, m.start) });
    }
    segments.push({ type: "ref", value: m.match, ref: m.ref });
    last = m.end;
  }
  if (last < text.length) {
    segments.push({ type: "text", value: text.slice(last) });
  }
  return segments;
}
