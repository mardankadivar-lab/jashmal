// Nombres transliterados ES/FA para los libros (sobre el id inglés de Sefaria).
// Si un libro no está aquí, se muestra su título inglés (fallback honesto).

interface Name { es: string; fa: string; }

export const BOOK_NAMES: Record<string, Name> = {
  // Torá
  Genesis: { es: "Bereshit (Génesis)", fa: "برشیت (پیدایش)" },
  Exodus: { es: "Shemot (Éxodo)", fa: "شموت (خروج)" },
  Leviticus: { es: "Vayikrá (Levítico)", fa: "وییکرا (لاویان)" },
  Numbers: { es: "Bamidbar (Números)", fa: "بمیدبار (اعداد)" },
  Deuteronomy: { es: "Devarim (Deuteronomio)", fa: "دواریم (تثنیه)" },
  // Neviim
  Joshua: { es: "Yehoshúa (Josué)", fa: "یهوشع" },
  Judges: { es: "Shoftim (Jueces)", fa: "شوفطیم" },
  "I Samuel": { es: "Shmuel I", fa: "شموئل ۱" },
  "II Samuel": { es: "Shmuel II", fa: "شموئل ۲" },
  "I Kings": { es: "Melajim I (Reyes)", fa: "ملاخیم ۱" },
  "II Kings": { es: "Melajim II (Reyes)", fa: "ملاخیم ۲" },
  Isaiah: { es: "Yeshayahu (Isaías)", fa: "یشعیا" },
  Jeremiah: { es: "Yirmeyahu (Jeremías)", fa: "ارمیا" },
  Ezekiel: { es: "Yejezkel (Ezequiel)", fa: "حزقیال" },
  Hosea: { es: "Hoshea (Oseas)", fa: "هوشع" },
  Joel: { es: "Yoel (Joel)", fa: "یوئل" },
  Amos: { es: "Amós", fa: "عاموس" },
  Obadiah: { es: "Ovadiá (Abdías)", fa: "عوبدیا" },
  Jonah: { es: "Yoná (Jonás)", fa: "یونس" },
  Micah: { es: "Mijá (Miqueas)", fa: "میخا" },
  Nahum: { es: "Najum (Nahúm)", fa: "ناحوم" },
  Habakkuk: { es: "Javakuk (Habacuc)", fa: "حبقوق" },
  Zephaniah: { es: "Tzefaniá (Sofonías)", fa: "صفنیا" },
  Haggai: { es: "Jagái (Hageo)", fa: "حجی" },
  Zechariah: { es: "Zejariá (Zacarías)", fa: "زکریا" },
  Malachi: { es: "Malají (Malaquías)", fa: "ملاکی" },
  // Ketuvim
  Psalms: { es: "Tehilim (Salmos)", fa: "تهیلیم (مزامیر)" },
  Proverbs: { es: "Mishlei (Proverbios)", fa: "میشلی (امثال)" },
  Job: { es: "Iyov (Job)", fa: "ایوب" },
  "Song of Songs": { es: "Shir HaShirim (Cantares)", fa: "غزل غزل‌ها" },
  Ruth: { es: "Rut", fa: "روت" },
  Lamentations: { es: "Eijá (Lamentaciones)", fa: "مراثی" },
  Ecclesiastes: { es: "Kohélet (Eclesiastés)", fa: "کوهلت" },
  Esther: { es: "Ester", fa: "استر" },
  Daniel: { es: "Daniel", fa: "دانیال" },
  Ezra: { es: "Ezrá (Esdras)", fa: "عزرا" },
  Nehemiah: { es: "Nejemiá (Nehemías)", fa: "نحمیا" },
  "I Chronicles": { es: "Divrei HaYamim I (Crónicas)", fa: "تواریخ ۱" },
  "II Chronicles": { es: "Divrei HaYamim II (Crónicas)", fa: "تواریخ ۲" },
  // Jasidut / Cabalá frecuentes
  Tanya: { es: "Tania", fa: "تانیا" },
  "Likutei Moharan": { es: "Likutéi Moharán", fa: "لیکوتی موهاران" },
  "Mei HaShiloach": { es: "Mei HaShiloaj", fa: "می هشیلوآخ" },
  "Sefat Emet": { es: "Sefat Emet", fa: "سفت امت" },
  "Kedushat Levi": { es: "Kedushat Levi", fa: "قدوشت لوی" },
  Zohar: { es: "Zohar", fa: "زوهر" },
  "Sefer Yetzirah": { es: "Séfer Yetzirá", fa: "سفر یتسیرا" },
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
