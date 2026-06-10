// Capa paleo-hebrea (pictográfica), al estilo del Ancient Hebrew Lexicon of the
// Bible de Jeff Benner. Cada letra hebrea proviene de un pictograma primario con
// un significado simbólico. Estos datos son CANÓNICOS (codificados, no generados)
// para que sean fieles; la SÍNTESIS en frase la hace Claude anclada en ellos.

export interface PaleoLetter {
  hebrew: string; // letra moderna
  name: string; // nombre (transliteración)
  glyph: string; // glifo fenicio (≈ forma paleo-hebrea), Unicode
  depictionEs: string; // qué dibuja el pictograma (ES)
  depictionFa: string; // qué dibuja el pictograma (FA / persa)
  seed: string; // significados simbólicos (semilla en inglés para anclar a Claude)
}

// Mapa de finales a su forma base.
const FINALS: Record<string, string> = { ך: "כ", ם: "מ", ן: "נ", ף: "פ", ץ: "צ" };

export const PALEO: Record<string, PaleoLetter> = {
  א: { hebrew: "א", name: "alef", glyph: "𐤀", depictionEs: "cabeza de buey", depictionFa: "سرِ گاو", seed: "strength, leader, first, ox, God, power" },
  ב: { hebrew: "ב", name: "bet", glyph: "𐤁", depictionEs: "tienda / casa", depictionFa: "خیمه / خانه", seed: "house, tent, family, in, within" },
  ג: { hebrew: "ג", name: "guimel", glyph: "𐤂", depictionEs: "pie / camello", depictionFa: "پا / شتر", seed: "walk, gather, carry, lift, foot" },
  ד: { hebrew: "ד", name: "dalet", glyph: "𐤃", depictionEs: "puerta", depictionFa: "در", seed: "door, pathway, enter, move, hang" },
  ה: { hebrew: "ה", name: "he", glyph: "𐤄", depictionEs: "hombre con brazos en alto / ventana", depictionFa: "انسان با دستان برافراشته / پنجره", seed: "behold, reveal, breath, the, what comes from" },
  ו: { hebrew: "ו", name: "vav", glyph: "𐤅", depictionEs: "clavo / gancho", depictionFa: "میخ / قلاب", seed: "add, secure, hook, and, join, nail" },
  ז: { hebrew: "ז", name: "zayin", glyph: "𐤆", depictionEs: "azada / arma", depictionFa: "بیل / سلاح", seed: "cut, food, harvest, weapon, nourish" },
  ח: { hebrew: "ח", name: "jet", glyph: "𐤇", depictionEs: "muro / cerca", depictionFa: "دیوار / حصار", seed: "wall, fence, separate, outside, protect, half" },
  ט: { hebrew: "ט", name: "tet", glyph: "𐤈", depictionEs: "cesta / serpiente enroscada", depictionFa: "سبد / مارِ پیچیده", seed: "surround, contain, basket, mud, store, good" },
  י: { hebrew: "י", name: "yod", glyph: "𐤉", depictionEs: "brazo y mano cerrada", depictionFa: "بازو و دستِ بسته", seed: "work, deed, make, throw, hand, worship" },
  כ: { hebrew: "כ", name: "kaf", glyph: "𐤊", depictionEs: "palma de la mano abierta", depictionFa: "کفِ دستِ باز", seed: "open, cover, allow, palm, bend, tame" },
  ל: { hebrew: "ל", name: "lamed", glyph: "𐤋", depictionEs: "cayado del pastor / aguijón", depictionFa: "عصای شبان / سُک", seed: "teach, guide, authority, staff, toward, yoke" },
  מ: { hebrew: "מ", name: "mem", glyph: "𐤌", depictionEs: "agua", depictionFa: "آب", seed: "water, chaos, mighty, blood, mass, from" },
  נ: { hebrew: "נ", name: "nun", glyph: "𐤍", depictionEs: "semilla / pez / brote", depictionFa: "بذر / ماهی / جوانه", seed: "continue, heir, offspring, life, seed, fish" },
  ס: { hebrew: "ס", name: "samej", glyph: "𐤎", depictionEs: "puntal / apoyo", depictionFa: "ستون / تکیه‌گاه", seed: "support, prop, twist, turn, thorn, grab" },
  ע: { hebrew: "ע", name: "ayin", glyph: "𐤏", depictionEs: "ojo", depictionFa: "چشم", seed: "see, watch, know, experience, shade, eye" },
  פ: { hebrew: "פ", name: "pe", glyph: "𐤐", depictionEs: "boca", depictionFa: "دهان", seed: "mouth, speak, blow, edge, open, word" },
  צ: { hebrew: "צ", name: "tzadi", glyph: "𐤑", depictionEs: "anzuelo / hombre de lado", depictionFa: "قلاب ماهی / انسان از پهلو", seed: "trail, hunt, need, desire, righteous, catch" },
  ק: { hebrew: "ק", name: "kof", glyph: "𐤒", depictionEs: "sol en el horizonte / nuca", depictionFa: "خورشید در افق / پسِ سر", seed: "condense, circle, time, behind, last, sun, horizon" },
  ר: { hebrew: "ר", name: "resh", glyph: "𐤓", depictionEs: "cabeza de hombre", depictionFa: "سرِ انسان", seed: "head, man, person, chief, top, beginning, highest" },
  ש: { hebrew: "ש", name: "shin", glyph: "𐤔", depictionEs: "dos dientes", depictionFa: "دو دندان", seed: "teeth, sharp, press, eat, two, again, consume, destroy" },
  ת: { hebrew: "ת", name: "tav", glyph: "𐤕", depictionEs: "dos palos cruzados / marca", depictionFa: "دو چوبِ متقاطع / نشان", seed: "mark, sign, signature, covenant, monument, complete" },
};

function stripNiqud(s: string): string {
  return s.replace(/[֑-ׇ]/g, "");
}

/** Descompone una palabra hebrea en sus letras paleo (en orden de lectura). */
export function wordToPaleo(word: string): PaleoLetter[] {
  const consonants = stripNiqud(word);
  const out: PaleoLetter[] = [];
  for (const ch of consonants) {
    const base = FINALS[ch] ?? ch;
    const p = PALEO[base];
    if (p) out.push(p);
  }
  return out;
}

export function depiction(p: PaleoLetter, locale: string): string {
  return locale === "fa" ? p.depictionFa : p.depictionEs;
}
