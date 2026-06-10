// Nombres transliterados ES/FA para los libros (sobre el id inglés de Sefaria).
// Si un libro no está aquí, se muestra su título inglés (fallback honesto).
// FA: nombres de la Biblia persa estándar que la audiencia iraní reconoce
// (lista autoritativa provista por Mardan, 2026-06-03). Persa puro, sin
// transliteración hebrea, para no confundir al lector persa.

interface Name { es: string; fa: string; }

export const BOOK_NAMES: Record<string, Name> = {
  // Torá
  Genesis: { es: "Bereshit (Génesis)", fa: "پیدایش" },
  Exodus: { es: "Shemot (Éxodo)", fa: "خروج" },
  Leviticus: { es: "Vayikrá (Levítico)", fa: "لاویان" },
  Numbers: { es: "Bamidbar (Números)", fa: "أعداد" },
  Deuteronomy: { es: "Devarim (Deuteronomio)", fa: "تَثنیه" },
  // Neviim
  Joshua: { es: "Yehoshúa (Josué)", fa: "یوشَع" },
  Judges: { es: "Shoftim (Jueces)", fa: "داوران" },
  "I Samuel": { es: "Shmuel I", fa: "اول سَموئیل" },
  "II Samuel": { es: "Shmuel II", fa: "دوم سَموئیل" },
  "I Kings": { es: "Melajim I (Reyes)", fa: "اول پادشاهان" },
  "II Kings": { es: "Melajim II (Reyes)", fa: "دوم پادشاهان" },
  Isaiah: { es: "Yeshayahu (Isaías)", fa: "اِشعیا" },
  Jeremiah: { es: "Yirmeyahu (Jeremías)", fa: "اِرمیا" },
  Ezekiel: { es: "Yejezkel (Ezequiel)", fa: "حِزقیال" },
  Hosea: { es: "Hoshea (Oseas)", fa: "هوشَع" },
  Joel: { es: "Yoel (Joel)", fa: "یوئیل" },
  Amos: { es: "Amós", fa: "عاموس" },
  Obadiah: { es: "Ovadiá (Abdías)", fa: "عوبَدیا" },
  Jonah: { es: "Yoná (Jonás)", fa: "یونس" },
  Micah: { es: "Mijá (Miqueas)", fa: "میکاه" },
  Nahum: { es: "Najum (Nahúm)", fa: "ناحوم" },
  Habakkuk: { es: "Javakuk (Habacuc)", fa: "حَبقوق" },
  Zephaniah: { es: "Tzefaniá (Sofonías)", fa: "صَفنیا" },
  Haggai: { es: "Jagái (Hageo)", fa: "حَجّی" },
  Zechariah: { es: "Zejariá (Zacarías)", fa: "زکریا" },
  Malachi: { es: "Malají (Malaquías)", fa: "مَلاکی" },
  // Ketuvim
  Psalms: { es: "Tehilim (Salmos)", fa: "مَزامیر" },
  Proverbs: { es: "Mishlei (Proverbios)", fa: "أمثال" },
  Job: { es: "Iyov (Job)", fa: "ایوب" },
  "Song of Songs": { es: "Shir HaShirim (Cantares)", fa: "غزل غزلها" },
  Ruth: { es: "Rut", fa: "روت" },
  Lamentations: { es: "Eijá (Lamentaciones)", fa: "مَراثی اِرمیا" },
  Ecclesiastes: { es: "Kohélet (Eclesiastés)", fa: "جامعه" },
  Esther: { es: "Ester", fa: "إستر" },
  Daniel: { es: "Daniel", fa: "دانیال" },
  Ezra: { es: "Ezrá (Esdras)", fa: "عِزرا" },
  Nehemiah: { es: "Nejemiá (Nehemías)", fa: "نِحمیا" },
  "I Chronicles": { es: "Divrei HaYamim I (Crónicas)", fa: "اول تَواریخ" },
  "II Chronicles": { es: "Divrei HaYamim II (Crónicas)", fa: "دوم تَواریخ" },
  // Jasidut / Cabalá frecuentes (no bíblicos: nombre judío en grafía persa)
  Tanya: { es: "Tania", fa: "تانیا" },
  "Likutei Moharan": { es: "Likutéi Moharán", fa: "لیکوتی موهاران" },
  "Mei HaShiloach": { es: "Mei HaShiloaj", fa: "مه هشیلوآح" },
  "Sefat Emet": { es: "Sefat Emet", fa: "سفت امت" },
  "Kedushat Levi": { es: "Kedushat Levi", fa: "قدوشت لوی" },
  Zohar: { es: "Zohar", fa: "زوهر" },
  "Sefer Yetzirah": { es: "Séfer Yetzirá", fa: "سفر یصیرا" },
};

export function localizedBookLabel(id: string, fallback: string, locale: string): string {
  const n = BOOK_NAMES[id];
  if (n) return locale === "fa" ? n.fa : n.es;
  return fallback; // título inglés de Sefaria
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
