// AUTO-GENERADO por scripts/gen-tablas-fuentes.mjs. No editar a mano.
// Fuente: /api/shape/<Obra> de Sefaria, 2026-11-13.
//
// Para cada obra midráshica: cuántos capítulos tiene y cuántas secciones
// (simanim) tiene cada capítulo. El índice 0 es el capítulo 1.
//
// Un 0 significa "Sefaria no tiene texto en ese tramo", NO "no existe": el
// verificador lo trata como no concluyente y calla (ver citationCheck.ts).
//
// shape:
//  · "flat"   — capítulo:sección. "Bereshit Rabá 12:6".
//  · "nested" — capítulo:versículo:sección; `sections` dice cuántos versículos
//               tiene cada capítulo y el tercer número no se juzga.
//  · "parts"  — dividida por parashá/masejta; el número es el simán dentro de
//               ella. "Tanjumá Bereshit 7".
//
// `sub: false` marca las obras donde la sección NO se juzga: Sefaria no las
// segmenta de verdad (Pesikta Rabbati trae una sola sección en 45 de sus 47
// piskaot) y juzgarla sería inventar falsos positivos.

export interface MidrashPart {
  /** Nombre inglés de Sefaria, ej. "Lech Lecha". */
  name: string;
  /** Nombre hebreo, ej. "לך לך". */
  he: string;
  /** Cuántos simanim tiene esta parte. */
  len: number;
}

export interface MidrashWork {
  /** Título inglés de Sefaria, ej. "Bereshit Rabbah". */
  name: string;
  /** Título hebreo, ej. "בראשית רבה". */
  he: string;
  shape: "flat" | "nested" | "parts";
  /**
   * flat/nested: ¿es fiable el SEGUNDO número (la sección)? `false` en las
   * obras que Sefaria no segmenta de verdad (casi todo capítulo con una sola
   * sección): ahí se juzga el capítulo y se calla sobre la sección.
   */
  sub?: boolean;
  /** flat/nested: secciones (o versículos) de cada capítulo. */
  sections?: number[];
  /**
   * Cuántos proemios tiene la Petijtá, en las obras que la tienen (Eikhá 34,
   * Ester 12, Rut 7). Se cita por su propio número: "Eikhá Rabá, Petijtá 24".
   */
  petichta?: number;
  /** parts: las parashiot/masajtot de la obra. */
  parts?: MidrashPart[];
}

export const MIDRASH_WORKS: MidrashWork[] = [
  { name: "Bereshit Rabbah", he: "בראשית רבה", shape: "flat", sub: true, sections: [15,5,9,7,10,9,5,13,14,9,10,16,17,10,7,6,8,6,12,12,9,13,7,7,3,7,4,9,5,10,14,11,7,15,3,8,8,14,16,6,10,8,9,23,10,13,10,21,14,12,11,13,15,6,8,11,4,9,12,16,7,4,14,10,23,7,13,14,8,20,10,6,12,17,13,9,3,16,8,12,5,15,5,22,14,6,10,7,9,6,11,9,12,9,4,5,6,20,12,13] },
  { name: "Shemot Rabbah", he: "שמות רבה", shape: "flat", sub: true, sections: [36,6,17,4,23,5,5,3,13,7,6,7,7,4,31,4,5,12,8,19,11,3,15,4,12,3,9,6,9,24,17,9,8,3,6,4,4,9,1,4,7,9,9,10,6,5,9,6,2,5,8,5] },
  { name: "Vayikra Rabbah", he: "ויקרא רבה", shape: "flat", sub: true, sections: [15,12,7,8,8,6,6,4,9,9,9,5,5,9,9,9,7,5,6,12,12,10,13,9,8,9,12,6,12,16,11,8,6,16,12,6,4] },
  { name: "Bamidbar Rabbah", he: "במדבר רבה", shape: "flat", sub: true, sections: [12,26,14,20,9,11,10,9,49,25,8,21,20,22,25,28,6,23,33,25,25,9,14] },
  { name: "Devarim Rabbah", he: "דברים רבה", shape: "flat", sub: true, sections: [25,38,17,11,15,14,12,7,9,4,10,0,0,0,0,0,0] },
  { name: "Shir HaShirim Rabbah", he: "שיר השירים רבה", shape: "nested", sub: true, sections: [20,17,11,16,16,12,14,13] },
  { name: "Ruth Rabbah", he: "רות רבה", shape: "flat", petichta: 7, sub: true, sections: [5,24,7,9,15,4,16,1,0] },
  { name: "Eikhah Rabbah", he: "איכה רבה", shape: "flat", petichta: 34, sub: true, sections: [57,25,23,25,22] },
  { name: "Kohelet Rabbah", he: "קוהלת רבה", shape: "nested", sub: true, sections: [18,26,22,17,19,12,29,17,18,20,9,14] },
  { name: "Esther Rabbah", he: "אסתר רבה", shape: "flat", petichta: 12, sub: true, sections: [20,14,15,12,4,14,25,7,4,15] },
  { name: "Midrash Tanchuma", he: "מדרש תנחומא", shape: "parts",
    parts: [
      { name: "Bereshit", he: "בראשית", len: 13 },
      { name: "Noach", he: "נח", len: 19 },
      { name: "Lech Lecha", he: "לך לך", len: 20 },
      { name: "Vayera", he: "וירא", len: 23 },
      { name: "Chayei Sara", he: "חיי שרה", len: 8 },
      { name: "Toldot", he: "תולדות", len: 14 },
      { name: "Vayetzei", he: "ויצא", len: 13 },
      { name: "Vayishlach", he: "וישלח", len: 10 },
      { name: "Vayeshev", he: "וישב", len: 9 },
      { name: "Miketz", he: "מקץ", len: 10 },
      { name: "Vayigash", he: "ויגש", len: 11 },
      { name: "Vayechi", he: "ויחי", len: 17 },
      { name: "Shemot", he: "שמות", len: 29 },
      { name: "Vaera", he: "וארא", len: 17 },
      { name: "Bo", he: "בא", len: 14 },
      { name: "Beshalach", he: "בשלח", len: 28 },
      { name: "Yitro", he: "יתרו", len: 17 },
      { name: "Mishpatim", he: "משפטים", len: 19 },
      { name: "Terumah", he: "תרומה", len: 11 },
      { name: "Tetzaveh", he: "תצוה", len: 15 },
      { name: "Ki Tisa", he: "כי תשא", len: 37 },
      { name: "Vayakhel", he: "ויקהל", len: 20 },
      { name: "Pekudei", he: "פקודי", len: 11 },
      { name: "Vayikra", he: "ויקרא", len: 8 },
      { name: "Tzav", he: "צו", len: 28 },
      { name: "Shmini", he: "שמיני", len: 12 },
      { name: "Tazria", he: "תזריע", len: 11 },
      { name: "Metzora", he: "מצורע", len: 9 },
      { name: "Achrei Mot", he: "אחרי מות", len: 12 },
      { name: "Kedoshim", he: "קדושים", len: 15 },
      { name: "Emor", he: "אמור", len: 24 },
      { name: "Behar", he: "בהר", len: 4 },
      { name: "Bechukotai", he: "בחוקתי", len: 6 },
      { name: "Bamidbar", he: "במדבר", len: 26 },
      { name: "Nasso", he: "נשא", len: 54 },
      { name: "Beha'alotcha", he: "בהעלותך", len: 16 },
      { name: "Sh'lach", he: "שלח", len: 15 },
      { name: "Korach", he: "קרח", len: 12 },
      { name: "Chukat", he: "חקת", len: 27 },
      { name: "Balak", he: "בלק", len: 21 },
      { name: "Pinchas", he: "פנחס", len: 17 },
      { name: "Matot", he: "מטות", len: 7 },
      { name: "Masei", he: "מסעי", len: 13 },
      { name: "Devarim", he: "דברים", len: 4 },
      { name: "Vaetchanan", he: "ואתחנן", len: 6 },
      { name: "Eikev", he: "עקב", len: 11 },
      { name: "Re'eh", he: "ראה", len: 18 },
      { name: "Shoftim", he: "שופטים", len: 19 },
      { name: "Ki Teitzei", he: "כי תצא", len: 11 },
      { name: "Ki Tavo", he: "כי תבוא", len: 8 },
      { name: "Nitzavim", he: "נצבים", len: 11 },
      { name: "Vayeilech", he: "וילך", len: 3 },
      { name: "Ha'Azinu", he: "האזינו", len: 8 },
      { name: "V'Zot HaBerachah", he: "וזאת הברכה", len: 7 },
    ] },
  { name: "Midrash Tanchuma Buber", he: "תנחומא בובר", shape: "parts",
    parts: [
      { name: "Bereshit", he: "בראשית", len: 40 },
      { name: "Noach", he: "נח", len: 28 },
      { name: "Lech Lecha", he: "לך לך", len: 27 },
      { name: "Vayera", he: "וירא", len: 46 },
      { name: "Chayei Sara", he: "חיי שרה", len: 10 },
      { name: "Toldot", he: "תולדות", len: 24 },
      { name: "Vayetzei", he: "ויצא", len: 24 },
      { name: "Vayishlach", he: "וישלח", len: 30 },
      { name: "Vayeshev", he: "וישב", len: 21 },
      { name: "Miketz", he: "מקץ", len: 17 },
      { name: "Vayigash", he: "ויגש", len: 12 },
      { name: "Vayechi", he: "ויחי", len: 18 },
      { name: "Shemot", he: "שמות", len: 26 },
      { name: "Vaera", he: "וארא", len: 22 },
      { name: "Bo", he: "בא", len: 19 },
      { name: "Beshalach", he: "בשלח", len: 24 },
      { name: "Yitro", he: "יתרו", len: 17 },
      { name: "Mishpatim", he: "משפטים", len: 12 },
      { name: "Terumah", he: "תרומה", len: 9 },
      { name: "Tetzaveh", he: "תצוה", len: 16 },
      { name: "Ki Tisa", he: "כי תשא", len: 20 },
      { name: "Vayakhel", he: "ויקהל", len: 11 },
      { name: "Pekudei", he: "פקודי", len: 8 },
      { name: "Vayikra", he: "ויקרא", len: 18 },
      { name: "Tzav", he: "צו", len: 16 },
      { name: "Shmini", he: "שמיני", len: 14 },
      { name: "Tazria", he: "תזריע", len: 16 },
      { name: "Metzora", he: "מצורע", len: 18 },
      { name: "Achrei Mot", he: "אחרי מות", len: 18 },
      { name: "Kedoshim", he: "קדושים", len: 15 },
      { name: "Emor", he: "אמור", len: 32 },
      { name: "Behar", he: "בהר", len: 9 },
      { name: "Bechukotai", he: "בחוקתי", len: 8 },
      { name: "Bamidbar", he: "במדבר", len: 33 },
      { name: "Nasso", he: "נשא", len: 34 },
      { name: "Beha'alotcha", he: "בהעלותך", len: 28 },
      { name: "Sh'lach", he: "שלח", len: 31 },
      { name: "Appendix to Sh'lach", he: "הוספה לשלח", len: 21 },
      { name: "Korach", he: "קרח", len: 27 },
      { name: "Appendix to Korach", he: "הוספה לקרח", len: 5 },
      { name: "Chukat", he: "חקת", len: 55 },
      { name: "Appendix to Chukat", he: "הוספה לחקת", len: 2 },
      { name: "Balak", he: "בלק", len: 30 },
      { name: "Pinchas", he: "פנחס", len: 17 },
      { name: "Matot", he: "מטות", len: 9 },
      { name: "Masei", he: "מסעי", len: 10 },
      { name: "Devarim", he: "דברים", len: 5 },
      { name: "Appendix to Devarim", he: "הוספה לדברים", len: 10 },
      { name: "Vaetchanan", he: "ואתחנן", len: 6 },
      { name: "Appendix to Vaetchanan", he: "הוספה לואתחנן", len: 5 },
      { name: "Eikev", he: "עקב", len: 6 },
      { name: "Re'eh", he: "ראה", len: 17 },
      { name: "Appendix to Re'eh", he: "הוספה לראה", len: 1 },
      { name: "Shoftim", he: "שופטים", len: 10 },
      { name: "Ki Teitzei", he: "כי תצא", len: 18 },
      { name: "Ki Tavo", he: "כי תבוא", len: 4 },
      { name: "Nitzavim", he: "נצבים", len: 8 },
      { name: "Ha'Azinu", he: "האזינו", len: 4 },
      { name: "V'Zot HaBerachah", he: "וזאת הברכה", len: 7 },
    ] },
  { name: "Mekhilta DeRabbi Yishmael", he: "מכילתא דרבי ישמעאל", shape: "parts",
    parts: [
      { name: "Tractate Pischa", he: "מַסֶּכְתָּא דְפִסְחָא", len: 18 },
      { name: "Tractate Vayehi Beshalach", he: "מַסֶּכְתָּא דְוַיְהִי בְּשַׁלַּח", len: 7 },
      { name: "Tractate Shirah", he: "מַסֶּכְתָּא דְשִׁירָה", len: 10 },
      { name: "Tractate Vayassa", he: "מַסֶּכְתָּא דְוַיַּסַּע", len: 7 },
      { name: "Tractate Amalek", he: "מַסֶּכְתָּא דַעֲמָלֵק", len: 4 },
      { name: "Tractate Bachodesh", he: "מַסֶּכְתָּא דְבַחֹדֶשׁ", len: 11 },
      { name: "Tractate Nezikin", he: "מַסֶּכְתָּא דִנְזִיקִין", len: 18 },
      { name: "Tractate Kaspa", he: "מַסֶּכְתָּא דְכַסְפָּא", len: 5 },
      { name: "Tractate Shabbata", he: "מַסֶּכְתָּא דְשַׁבְּתָא", len: 2 },
    ] },
  { name: "Sifrei Bamidbar", he: "ספרי במדבר", shape: "flat", sub: false, sections: [8,1,1,4,1,2,3,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,3,1,1,1,1,1,1,1,1,1,1,4,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1,1,1,3,1,1,1,1,3,1,1,1,1,3,5,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,3,1,1,2,3,2,1,1,2,2,3,1,5,1,1,1,2,2,1,1,5,2,5,1,5,4,4,5,1,3,2,1,2,2,3,5,3,2,3,1,2,1,2,1,2,1,10,3,1,3,9,3,1,14,5] },
  { name: "Sifrei Devarim", he: "ספרי דברים", shape: "flat", sub: true, sections: [20,8,5,2,4,5,1,3,2,2,1,4,6,1,5,9,7,2,3,5,3,3,3,4,8,10,7,3,9,2,10,21,4,10,12,10,16,11,11,14,20,10,35,1,1,1,9,12,3,4,3,4,2,4,2,4,3,1,5,4,8,4,11,5,6,2,4,6,4,6,14,11,1,9,15,9,9,10,5,5,6,5,5,5,6,10,13,2,8,3,4,5,10,6,7,12,5,6,2,3,10,1,10,10,19,6,16,2,12,5,11,11,3,3,2,18,8,7,5,2,4,9,3,6,1,6,8,5,7,7,5,4,2,5,3,8,3,8,1,7,3,6,9,15,4,1,7,10,7,3,3,15,5,5,9,6,10,4,4,8,5,5,4,3,14,9,2,4,3,3,11,5,4,2,2,5,1,3,2,8,6,2,8,3,3,2,7,11,2,21,1,3,6,6,7,3,4,1,5,7,4,2,10,6,11,5,5,4,2,9,8,4,8,6,16,5,8,11,4,4,10,8,4,7,6,3,11,8,10,13,3,5,5,7,11,4,3,10,3,5,7,10,4,3,7,1,5,5,4,5,3,3,3,4,5,2,6,4,8,2,6,3,4,7,9,6,4,3,14,13,6,2,9,6,3,3,5,5,4,3,3,4,6,6,4,17,3,6,11,4,9,5,2,9,4,9,10,3,4,2,37,1,20,2,6,37,15,4,7,8,5,2,16,6,6,4,7,16,6,13,14,12,13,3,4,7,2,4,4,2,4,6,5,3,2,2,1,3,3,2,1,7,15,7,3,2,5,9,5,3,4,17,13,8,30,14,44] },
  { name: "Pirkei DeRabbi Eliezer", he: "פרקי דרבי אליעזר", shape: "flat", sub: true, sections: [3,5,13,7,5,12,13,10,8,10,20,12,7,8,5,16,16,13,15,9,10,9,14,12,11,9,7,10,18,13,14,16,17,15,9,24,9,26,16,11,17,16,12,12,13,13,11,21,13,12,13,10,10,6] },
  { name: "Pesikta DeRav Kahana", he: "פסיקתא דרב כהנא", shape: "flat", sub: true, sections: [8,10,16,10,19,4,12,4,12,10,25,25,15,7,11,11,8,6,6,7,6,5,12,19,4,11,10,11] },
  { name: "Pesikta Rabbati", he: "פסיקתא רבתי", shape: "flat", sub: false, sections: [1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,49,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1] },
  { name: "Midrash Tehillim", he: "מדרש תהילים", shape: "flat", sub: false, sections: [20,14,9,16,11,8,20,6,21,11,7,4,7,8,4,11,15,33,17,6,5,27,6,8,15,8,8,6,1,6,6,2,1,2,2,5,3,1,3,4,4,5,0,2,7,2,2,7,2,2,3,6,4,3,3,2,2,1,4,3,3,4,3,1,4,1,1,3,3,2,2,6,3,4,4,2,2,19,3,7,3,3,3,5,1,8,7,4,1,10,6,10,6,3,3,0,0,0,2,3,3,6,13,22,10,9,4,3,2,1,4,3,4,5,0,12,4,22,36,2,1,1,0,1,1,3,1,1,1,1,0,1,1,1,1,6,1,2,5,1,1,6,2,1,1,5,4,2,4,1] },
  { name: "Midrash Mishlei", he: "מדרש משלי", shape: "flat", sub: false, sections: [13,7,1,5,9,8,1,6,4,1,5,1,5,3,6,4,1,1,3,3,4,8,3,3,5,5,5,6,1,8,5] },
  { name: "Tanna DeBei Eliyahu Rabbah", he: "תנא דבי אליהו רבה", shape: "flat", sub: false, sections: [3,1,1,1,1,1,1,1,1,2,25,1,1,2,2,1,1,10,1,2,2,1,2,1,1,2,2,1,2,5,3] },
];
