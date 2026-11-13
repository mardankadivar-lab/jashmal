import { BEN_PORAT_GROUPS, MEOR_EINAYIM_GROUPS } from "@/lib/sources/catalogOverrides";

// Nombres transliterados ES/FA para los libros (sobre el id inglés de Sefaria).
// Si un libro no está aquí, se muestra su título inglés (fallback honesto).
// FA: nombres de la Biblia persa estándar que la audiencia iraní reconoce
// (lista autoritativa provista por Mardan, 2026-06-03). Persa puro, sin
// transliteración hebrea, para no confundir al lector persa.

// `fa` es opcional a propósito: la lista persa es la de la Biblia persa
// estándar que dio Mardan, y para las obras midráshicas no tenemos un nombre
// persa autorizado. Antes que inventarlo, se deja el título de Sefaria.
interface Name { es: string; fa?: string; }

export const BOOK_NAMES: Record<string, Name> = {
  // Torá
  Genesis: { es: "Génesis (Bereshit)", fa: "پیدایش" },
  Exodus: { es: "Éxodo (Shemot)", fa: "خروج" },
  Leviticus: { es: "Levítico (Vayikrá)", fa: "لاویان" },
  Numbers: { es: "Números (Bamidbar)", fa: "أعداد" },
  Deuteronomy: { es: "Deuteronomio (Devarim)", fa: "تَثنیه" },
  // Neviim
  Joshua: { es: "Josué (Yehoshúa)", fa: "یوشَع" },
  Judges: { es: "Jueces (Shoftim)", fa: "داوران" },
  "I Samuel": { es: "Shmuel I", fa: "اول سَموئیل" },
  "II Samuel": { es: "Shmuel II", fa: "دوم سَموئیل" },
  "I Kings": { es: "Reyes I (Melajim I)", fa: "اول پادشاهان" },
  "II Kings": { es: "Reyes II (Melajim II)", fa: "دوم پادشاهان" },
  Isaiah: { es: "Isaías (Yeshayahu)", fa: "اِشعیا" },
  Jeremiah: { es: "Jeremías (Yirmeyahu)", fa: "اِرمیا" },
  Ezekiel: { es: "Ezequiel (Yejezkel)", fa: "حِزقیال" },
  Hosea: { es: "Oseas (Hoshea)", fa: "هوشَع" },
  Joel: { es: "Joel (Yoel)", fa: "یوئیل" },
  Amos: { es: "Amós", fa: "عاموس" },
  Obadiah: { es: "Abdías (Ovadiá)", fa: "عوبَدیا" },
  Jonah: { es: "Jonás (Yoná)", fa: "یونس" },
  Micah: { es: "Miqueas (Mijá)", fa: "میکاه" },
  Nahum: { es: "Nahúm (Najum)", fa: "ناحوم" },
  Habakkuk: { es: "Habacuc (Javakuk)", fa: "حَبقوق" },
  Zephaniah: { es: "Sofonías (Tzefaniá)", fa: "صَفنیا" },
  Haggai: { es: "Hageo (Jagái)", fa: "حَجّی" },
  Zechariah: { es: "Zacarías (Zejariá)", fa: "زکریا" },
  Malachi: { es: "Malaquías (Malají)", fa: "مَلاکی" },
  // Ketuvim
  Psalms: { es: "Salmos (Tehilim)", fa: "مَزامیر" },
  Proverbs: { es: "Proverbios (Mishlei)", fa: "أمثال" },
  Job: { es: "Job (Iyov)", fa: "ایوب" },
  "Song of Songs": { es: "Cantares (Shir HaShirim)", fa: "غزل غزلها" },
  Ruth: { es: "Rut", fa: "روت" },
  Lamentations: { es: "Lamentaciones (Eijá)", fa: "مَراثی اِرمیا" },
  Ecclesiastes: { es: "Eclesiastés (Kohélet)", fa: "جامعه" },
  Esther: { es: "Ester", fa: "إستر" },
  Daniel: { es: "Daniel", fa: "دانیال" },
  Ezra: { es: "Esdras (Ezrá)", fa: "عِزرا" },
  Nehemiah: { es: "Nehemías (Nejemiá)", fa: "نِحمیا" },
  "I Chronicles": { es: "Crónicas I (Divrei HaYamim I)", fa: "اول تَواریخ" },
  "II Chronicles": { es: "Crónicas II (Divrei HaYamim II)", fa: "دوم تَواریخ" },
  // Jasidut / Cabalá frecuentes (no bíblicos: nombre judío en grafía persa)
  Tanya: { es: "Tania", fa: "تانیا" },
  "Likutei Moharan": { es: "Likutéi Moharán", fa: "لیکوتی موهاران" },
  "Mei HaShiloach": { es: "Mei HaShiloaj", fa: "مه هشیلوآح" },
  "Sefat Emet": { es: "Sefat Emet", fa: "سفت امت" },
  "Kedushat Levi": { es: "Kedushat Levi", fa: "قدوشت لوی" },
  "Ben Porat Yosef": { es: "Ben Porat Yosef", fa: "بن پورت یوسف" },
  "Me'or Einayim": { es: "Me'or Einayim", fa: "مئور عینایم" },
  // Midrash. El motor lo cita en cada estudio desde que se le pide con número
  // exacto, así que sus rótulos tienen que leerse en español. Se catalogan los
  // DOS títulos con que Sefaria conoce cada obra (el hebreo transliterado y el
  // inglés), porque el detector de referencias puede devolver cualquiera.
  // Nombre español primero, transliteración entre paréntesis: la audiencia no
  // lee hebreo.
  "Bereshit Rabbah": { es: "Génesis Rabá (Bereshit Rabá)" },
  "Genesis Rabbah": { es: "Génesis Rabá (Bereshit Rabá)" },
  "Shemot Rabbah": { es: "Éxodo Rabá (Shemot Rabá)" },
  "Exodus Rabbah": { es: "Éxodo Rabá (Shemot Rabá)" },
  "Vayikra Rabbah": { es: "Levítico Rabá (Vayikrá Rabá)" },
  "Leviticus Rabbah": { es: "Levítico Rabá (Vayikrá Rabá)" },
  "Bamidbar Rabbah": { es: "Números Rabá (Bamidbar Rabá)" },
  "Numbers Rabbah": { es: "Números Rabá (Bamidbar Rabá)" },
  "Devarim Rabbah": { es: "Deuteronomio Rabá (Devarim Rabá)" },
  "Deuteronomy Rabbah": { es: "Deuteronomio Rabá (Devarim Rabá)" },
  "Shir HaShirim Rabbah": { es: "Cantares Rabá (Shir HaShirim Rabá)" },
  "Song of Songs Rabbah": { es: "Cantares Rabá (Shir HaShirim Rabá)" },
  "Ruth Rabbah": { es: "Rut Rabá" },
  "Eikhah Rabbah": { es: "Lamentaciones Rabá (Eijá Rabá)" },
  "Lamentations Rabbah": { es: "Lamentaciones Rabá (Eijá Rabá)" },
  "Kohelet Rabbah": { es: "Eclesiastés Rabá (Kohelet Rabá)" },
  "Ecclesiastes Rabbah": { es: "Eclesiastés Rabá (Kohelet Rabá)" },
  "Esther Rabbah": { es: "Ester Rabá" },
  "Midrash Tanchuma": { es: "Midrash Tanjumá" },
  "Midrash Tanchuma Buber": { es: "Midrash Tanjumá (ed. Buber)" },
  "Mekhilta DeRabbi Yishmael": { es: "Mejiltá de Rabí Yishmael" },
  "Sifrei Bamidbar": { es: "Sifrí Bamidbar (Sifrí Números)" },
  "Sifrei Devarim": { es: "Sifrí Devarim (Sifrí Deuteronomio)" },
  "Pirkei DeRabbi Eliezer": { es: "Pirkei de Rabí Eliezer" },
  "Pesikta DeRav Kahana": { es: "Pesiktá de Rav Kahaná" },
  "Pesikta Rabbati": { es: "Pesiktá Rabatí" },
  "Midrash Tehillim": { es: "Midrash Tehilim (Salmos)" },
  "Midrash Mishlei": { es: "Midrash Mishlei (Proverbios)" },
  "Tanna DeBei Eliyahu Rabbah": { es: "Tana deBei Eliahu Rabá" },
  "Yalkut Shimoni on Torah": { es: "Yalkut Shimoní sobre la Torá" },
  Zohar: { es: "Zohar", fa: "زوهر" },
  "Sefer Yetzirah": { es: "Séfer Yetzirá", fa: "سفر یصیرا" },
};

// ── Nombre de la SECCIÓN dentro del ref ───────────────────────────────────
// Un ref de Midrash o de Zohar no termina en números: "Midrash Tanchuma,
// Lech Lecha 7", "Eikhah Rabbah, Petichta 24". Traducir solo el libro dejaba
// media referencia en inglés delante del lector. Las parashiot ya están
// traducidas y verificadas en el repo (BEN_PORAT_GROUPS y MEOR_EINAYIM_GROUPS,
// que entre los dos cubren las 54): se reutilizan en vez de escribirlas otra vez.
const PARASHA_NAMES: Record<string, Name> = Object.fromEntries(
  [...BEN_PORAT_GROUPS, ...MEOR_EINAYIM_GROUPS].flatMap((g) =>
    g.sections.map((sec) => [sec.refTitle, { es: sec.label, fa: sec.labelFa }] as const)
  )
);

// Palabras de estructura que Sefaria escribe en inglés dentro del ref.
const SECTION_WORDS: Record<string, Name> = {
  Petichta: { es: "Petijtá" },       // los proemios de Eikhá, Ester y Rut Rabá
  Tractate: { es: "Masejta" },       // las masajtot de la Mejiltá
  Introduction: { es: "Introducción" },
  Foreword: { es: "Apertura" },
};

/** Traduce el nombre de sección que va tras la coma del ref. */
function localizedSection(name: string, locale: string): string {
  const fa = locale === "fa";
  const whole = PARASHA_NAMES[name];
  if (whole) return (fa ? whole.fa : whole.es) ?? name;
  // "Tractate Shirah" → "Masejta Shirah": se traduce la palabra inglesa y se
  // respeta el nombre hebreo, que no nos toca transliterar por nuestra cuenta.
  const parts = name.split(/\s+/);
  const head = SECTION_WORDS[parts[0]];
  if (head && !fa && parts.length > 1) return `${head.es} ${parts.slice(1).join(" ")}`;
  if (head && !fa) return head.es;
  return name;
}

export function localizedBookLabel(id: string, fallback: string, locale: string): string {
  const n = BOOK_NAMES[id];
  if (!n) return fallback; // título inglés de Sefaria
  if (locale === "fa") return n.fa ?? fallback; // sin nombre persa: el de Sefaria
  return n.es;
}

// Nombres de libro ordenados de más largo a más corto, para que "I Samuel"
// no sea capturado por un match parcial equivocado antes de tiempo.
const BOOK_IDS_SORTED = Object.keys(BOOK_NAMES).sort((a, b) => b.length - a.length);

/**
 * Toma un ref canónico de Sefaria (ej. "Numbers 25:10", "Numbers 25:10-26:4")
 * y devuelve la referencia legible en el idioma de la interfaz, ej. para es:
 * "Números (Bamidbar) 25:10". Solo traduce el NOMBRE del libro (prefijo);
 * el resto del ref (capítulo:versículo, folio, etc.) queda intacto.
 * Fallback honesto: si el libro no está en BOOK_NAMES, devuelve el ref tal cual
 * (nunca inventa un nombre). locale "en" también devuelve el ref tal cual,
 * porque el ref canónico de Sefaria YA está en inglés.
 */
export function localizedRef(ref: string, locale: string): string {
  if (locale === "en") return ref;
  for (const id of BOOK_IDS_SORTED) {
    if (ref === id || ref.startsWith(`${id} `) || ref.startsWith(`${id},`)) {
      const rest = ref.slice(id.length);
      const n = BOOK_NAMES[id];
      const label = locale === "fa" ? n.fa : n.es;
      if (!label) return ref; // sin nombre en ese idioma: el ref tal cual
      // La cola puede traer el nombre de la sección en inglés ("Midrash
      // Tanchuma, Lech Lecha 7"): se traduce lo que esté entre la coma y el
      // número, y los números quedan intactos.
      const sec = /^,\s*([^,\d]+?)\s*(\d.*)?$/.exec(rest);
      if (sec) {
        const name = localizedSection(sec[1], locale);
        return `${label}, ${name}${sec[2] ? ` ${sec[2]}` : ""}`;
      }
      return `${label}${rest}`;
    }
  }
  return ref; // fallback honesto: libro no catalogado, se muestra tal cual
}

// Nombres de las 6 categorías principales en FA
export const CATEGORY_FA: Record<string, string> = {
  Tanakh:   "تنخ — کتاب مقدس",
  Mishnah:  "میشنا",
  Talmud:   "تلمود بابلی",
  Midrash:  "میدراش",
  Kabbalah: "قبالا",
  Chasidut: "حسیدوت",
};

// Etiquetas de subcategoría en FA (las ES ya vienen en el catálogo).
export const SUB_FA: Record<string, string> = {
  "Torá": "تورات",
  "Profetas (Neviim)": "نوئیم (انبیا)",
  "Escritos (Ketuvim)": "کتوویم (مکتوبات)",
  "Séder Zeraim": "سدر زرعیم",
  "Séder Moed": "سدر موعد",
  "Séder Nashim": "سدر نشیم",
  "Séder Nezikin": "سدر نزیقین",
  "Séder Kodashim": "سدر قداشیم",
  "Séder Tahorot": "سدر طهروت",
};
