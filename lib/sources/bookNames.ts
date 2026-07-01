// Nombres transliterados ES/FA para los libros (sobre el id inglés de Sefaria).
// Si un libro no está aquí, se muestra su título inglés (fallback honesto).
// FA: nombres de la Biblia persa estándar que la audiencia iraní reconoce
// (lista autoritativa provista por Mardan, 2026-06-03). Persa puro, sin
// transliteración hebrea, para no confundir al lector persa.

interface Name { es: string; fa: string; }

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
  Zohar: { es: "Zohar", fa: "زوهر" },
  "Sefer Yetzirah": { es: "Séfer Yetzirá", fa: "سفر یصیرا" },
};

export function localizedBookLabel(id: string, fallback: string, locale: string): string {
  const n = BOOK_NAMES[id];
  if (n) return locale === "fa" ? n.fa : n.es;
  return fallback; // título inglés de Sefaria
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
      const label = locale === "fa" ? BOOK_NAMES[id].fa : BOOK_NAMES[id].es;
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
