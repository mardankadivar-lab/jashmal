// AUTO-GENERADO por scripts/gen-zohar-dafim.mjs. No editar a mano.
// Fuente: índice del Zóhar en Sefaria (alt_structs.Daf), 2026-11-11.
//
// `lo` y `hi` están en MEDIOS FOLIOS: 1a=0, 1b=1, 2a=2… (ver dafToUnit).
// El comentario de cada línea trae el rango legible.

export interface ZoharParashaRange {
  /** Título inglés de Sefaria, ej. "Lech Lecha". */
  name: string;
  /** Título hebreo, ej. "לך לך". */
  he: string;
  /** "Volume I" | "Volume II" | "Volume III". */
  volume: string;
  lo: number;
  hi: number;
}

export const ZOHAR_DAFIM: ZoharParashaRange[] = [
  { name: "Introduction", he: "הקדמה", volume: "Volume I", lo: 0, hi: 27 }, // 1a–14b
  { name: "Bereshit", he: "בראשית", volume: "Volume I", lo: 28, hi: 116 }, // 15a–59a
  { name: "Noach", he: "נח", volume: "Volume I", lo: 117, hi: 151 }, // 59b–76b
  { name: "Lech Lecha", he: "לך לך", volume: "Volume I", lo: 151, hi: 188 }, // 76b–95a
  { name: "Vayera", he: "וירא", volume: "Volume I", lo: 192, hi: 239 }, // 97a–120b
  { name: "Chayei Sara", he: "חיי שרה", volume: "Volume I", lo: 240, hi: 266 }, // 121a–134a
  { name: "Toldot", he: "תולדות", volume: "Volume I", lo: 266, hi: 291 }, // 134a–146b
  { name: "Vayetzei", he: "ויצא", volume: "Volume I", lo: 291, hi: 329 }, // 146b–165b
  { name: "Vayishlach", he: "וישלח", volume: "Volume I", lo: 329, hi: 356 }, // 165b–179a
  { name: "Vayeshev", he: "וישב", volume: "Volume I", lo: 356, hi: 384 }, // 179a–193a
  { name: "Miketz", he: "מקץ", volume: "Volume I", lo: 384, hi: 408 }, // 193a–205a
  { name: "Vayigash", he: "ויגש", volume: "Volume I", lo: 408, hi: 421 }, // 205a–211b
  { name: "Vayechi", he: "ויחי", volume: "Volume I", lo: 421, hi: 500 }, // 211b–251a
  { name: "Addenda", he: "תוספות", volume: "Volume I", lo: 500, hi: 533 }, // 251a–267b
  { name: "Shemot", he: "שמות", volume: "Volume II", lo: 2, hi: 42 }, // 2a–22a
  { name: "Vaera", he: "וארא", volume: "Volume II", lo: 42, hi: 62 }, // 22a–32a
  { name: "Bo", he: "בא", volume: "Volume II", lo: 63, hi: 85 }, // 32b–43b
  { name: "Beshalach", he: "בשלח", volume: "Volume II", lo: 86, hi: 132 }, // 44a–67a
  { name: "Yitro", he: "יתרו", volume: "Volume II", lo: 132, hi: 186 }, // 67a–94a
  { name: "Mishpatim", he: "משפטים", volume: "Volume II", lo: 186, hi: 245 }, // 94a–123b
  { name: "Terumah", he: "תרומה", volume: "Volume II", lo: 250, hi: 348 }, // 126a–175a
  { name: "Sifra DiTzniuta", he: "ספרא דצניעותא", volume: "Volume II", lo: 350, hi: 356 }, // 176a–179a
  { name: "Tetzaveh", he: "תצוה", volume: "Volume II", lo: 357, hi: 373 }, // 179b–187b
  { name: "Ki Tisa", he: "כי תשא", volume: "Volume II", lo: 373, hi: 387 }, // 187b–194b
  { name: "Vayakhel", he: "ויקהל", volume: "Volume II", lo: 387, hi: 438 }, // 194b–220a
  { name: "Pekudei", he: "פקודי", volume: "Volume II", lo: 438, hi: 536 }, // 220a–269a
  { name: "Addenda", he: "תוספות", volume: "Volume II", lo: 539, hi: 555 }, // 270b–278b
  { name: "Vayikra", he: "ויקרא", volume: "Volume III", lo: 2, hi: 50 }, // 2a–26a
  { name: "Tzav", he: "צו", volume: "Volume III", lo: 50, hi: 66 }, // 26a–34a
  { name: "Shmini", he: "שמיני", volume: "Volume III", lo: 69, hi: 82 }, // 35b–42a
  { name: "Tazria", he: "תזריע", volume: "Volume III", lo: 82, hi: 102 }, // 42a–52a
  { name: "Metzora", he: "מצורע", volume: "Volume III", lo: 103, hi: 110 }, // 52b–56a
  { name: "Achrei Mot", he: "אחרי מות", volume: "Volume III", lo: 110, hi: 158 }, // 56a–80a
  { name: "Kedoshim", he: "קדושים", volume: "Volume III", lo: 158, hi: 172 }, // 80a–87a
  { name: "Emor", he: "אמור", volume: "Volume III", lo: 174, hi: 213 }, // 88a–107b
  { name: "Behar", he: "בהר", volume: "Volume III", lo: 213, hi: 221 }, // 107b–111b
  { name: "Bechukotai", he: "בחקותי", volume: "Volume III", lo: 222, hi: 229 }, // 112a–115b
  { name: "Bamidbar", he: "במדבר", volume: "Volume III", lo: 232, hi: 240 }, // 117a–121a
  { name: "Nasso", he: "נשא", volume: "Volume III", lo: 240, hi: 259 }, // 121a–130b
  { name: "Idra Rabba", he: "האדרא רבא", volume: "Volume III", lo: 253, hi: 288 }, // 127b–145a
  { name: "Beha'alotcha", he: "בהעלותך", volume: "Volume III", lo: 295, hi: 311 }, // 148b–156b
  { name: "Sh'lach", he: "שלח לך", volume: "Volume III", lo: 311, hi: 348 }, // 156b–175a
  { name: "Korach", he: "קרח", volume: "Volume III", lo: 350, hi: 357 }, // 176a–179b
  { name: "Chukat", he: "חקת", volume: "Volume III", lo: 357, hi: 367 }, // 179b–184b
  { name: "Balak", he: "בלק", volume: "Volume III", lo: 367, hi: 423 }, // 184b–212b
  { name: "Pinchas", he: "פנחס", volume: "Volume III", lo: 424, hi: 506 }, // 213a–254a
  { name: "Matot", he: "מטות", volume: "Volume III", lo: 517, hi: 517 }, // 259b–259b
  { name: "Vaetchanan", he: "ואתחנן", volume: "Volume III", lo: 518, hi: 536 }, // 260a–269a
  { name: "Eikev", he: "עקב", volume: "Volume III", lo: 539, hi: 546 }, // 270b–274a
  { name: "Shoftim", he: "שופטים", volume: "Volume III", lo: 547, hi: 549 }, // 274b–275b
  { name: "Ki Teitzei", he: "כי תצא", volume: "Volume III", lo: 549, hi: 564 }, // 275b–283a
  { name: "Vayeilech", he: "וילך", volume: "Volume III", lo: 564, hi: 570 }, // 283a–286a
  { name: "Ha'Azinu", he: "האזינו", volume: "Volume III", lo: 570, hi: 580 }, // 286a–291a
  { name: "Idra Zuta", he: "האדרא זוטא", volume: "Volume III", lo: 574, hi: 592 }, // 288a–297a
  { name: "Addenda", he: "תוספות", volume: "Volume III", lo: 598, hi: 617 }, // 300a–309b
];
