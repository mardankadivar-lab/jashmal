// ─────────────────────────────────────────────────────────────────────────
// Lo que hay que decirle al lector ANTES de que abra un libro.
//
// Dos cosas viven aquí, las dos entregadas por el Departamento de Erudición
// (el Sofer) el 16-nov-2026, y las dos en los tres idiomas de la interfaz:
//
//   1. La FRASE DE LA CATEGORÍA. Encabeza la estantería, a la vista, no en una
//      nota al pie. En filosofía judía es una salvaguarda, no un adorno: sin
//      ella el lector aplana filosofía y Cabalá en una sola cosa y acaba
//      leyendo el Moré como si probara un punto cabalístico — cuando el Rambam
//      niega las sefirot.
//   2. Las FICHAS DE ADVERTENCIA por obra. Una sola frase, visible sin
//      desplegar nada, donde la obra puede leerse mal: un libro que cambia de
//      género a mitad, uno que es Cabalá vestida de filosofía, una atribución
//      que la crítica moderna discute, un orden de estantería que sugiere una
//      polémica que nunca ocurrió.
//
// Texto del Sofer, literal. Si hay que cambiarlo, se le pide a él.
// ─────────────────────────────────────────────────────────────────────────

export interface Trilingue {
  es: string;
  fa: string;
  en: string;
}

/** Devuelve el texto en el idioma activo; cae al español si falta. */
export function tri(t: Trilingue | undefined, locale: string): string | null {
  if (!t) return null;
  if (locale === "fa") return t.fa || t.es;
  if (locale === "en") return t.en || t.es;
  return t.es;
}

export interface CategoryNote extends Trilingue {
  /** Epígrafe hebreo con nikud, opcional. */
  he?: string;
}

/** Frase de cabecera por categoría (clave = id de Sefaria). */
export const CATEGORY_NOTES: Record<string, CategoryNote> = {
  "Jewish Thought": {
    es:
      "La filosofía judía y la Cabalá recorren el mismo territorio por caminos distintos: " +
      "una avanza por demostración y argumento, la otra por tradición recibida y revelación. " +
      "A veces se encuentran y se refuerzan; a veces se enfrentan, y esa tensión es parte del legado.",
    fa:
      "فلسفهٔ یهودی و کابالا یک سرزمین را از دو راه می‌پیمایند: یکی با برهان و استدلال پیش " +
      "می‌رود و دیگری با سنت دریافت‌شده و وحی. گاه به هم می‌رسند و یکدیگر را استوار می‌کنند و " +
      "گاه در برابر هم می‌ایستند؛ همین کشاکش نیز بخشی از این میراث است.",
    en:
      "Jewish philosophy and Kabbalah cross the same terrain by different roads: one proceeds by " +
      "demonstration and argument, the other by received tradition and revelation. At times they " +
      "meet and reinforce one another; at times they collide, and that tension is itself part of the legacy.",
    he:
      "הַפִילוֹסוֹפְיָה הַיְּהוּדִית וְהַקַּבָּלָה הוֹלְכוֹת בְּאוֹתוֹ שֶׁטַח בִּשְׁתֵּי דְּרָכִים: זוֹ בְּמוֹפֵת וּבִסְבָרָה, וְזוֹ בְּמָסוֹרֶת וּבְגִלּוּי. " +
      "לִפְעָמִים הֵן נִפְגָּשׁוֹת וּמְחַזְּקוֹת זוֹ אֶת זוֹ, וְלִפְעָמִים הֵן חוֹלְקוֹת — וְגַם הַמַּחֲלוֹקֶת הַזּוֹ חֵלֶק מִן הַיְּרוּשָׁה.",
  },
};

/** Ficha de advertencia por obra (clave = id del libro en Sefaria). */
export const WORK_NOTICES: Record<string, Trilingue> = {
  // Cambia de género a mitad de camino.
  "Duties of the Heart": {
    es:
      "Este libro cambia de género a mitad de camino: abre como filosofía, con la demostración " +
      "de la unidad divina, y termina como un manual de la vida interior.",
    fa:
      "این کتاب در میانهٔ راه تغییر جنس می‌دهد: با فلسفه و اثبات یگانگی خداوند آغاز می‌شود و به " +
      "راهنمای زندگی درونی می‌انجامد.",
    en:
      "This book changes genre midway: it opens as philosophy, with a demonstration of divine " +
      "unity, and ends as a manual of the inner life.",
  },

  // Cabalá en forma filosófica. Está en esta estantería por su MÉTODO, no por
  // su materia: es el aviso que impide leerlo como si fuera racionalismo.
  "Nefesh HaChayim": {
    es:
      "Es un libro de Cabalá escrito en forma filosófica: su materia es luriana, su método es " +
      "la argumentación ordenada.",
    fa:
      "این کتابی کابالایی است که در قالب فلسفی نوشته شده: مادهٔ آن لوریانی است و روش آن استدلال " +
      "منظم.",
    en:
      "This is a work of Kabbalah written in philosophical form: its subject matter is Lurianic, " +
      "its method is ordered argument.",
  },

  // Segunda obra de «Cabalá en forma filosófica». La propuso el Sofer en §4.2
  // del método y la gerencia la aprobó el 16-nov-2026: el Ramjal construye su
  // explicación de la providencia y de los gilgulim sobre cimientos lurianos,
  // igual que R. Jaim de Volozhin. Hasta hoy la ficha solo cubría Néfesh
  // HaJaim, y en el método estas dos obras comparten la VÍA INVERTIDA: aquí el
  // peligro no es leer al filósofo como cabalista, sino leer al cabalista como
  // racionalista.
  "Derekh Hashem": {
    es:
      "Es Cabalá escrita en forma filosófica: el Ramjal construye su explicación de la providencia " +
      "y de los gilgulim sobre cimientos lurianos.",
    fa:
      "این کابالا است که در قالب فلسفی نوشته شده: رمحال تبیین خود از تدبیر الهی و گیلگولیم را بر " +
      "پایه‌های لوریانی بنا می‌کند.",
    en:
      "This is Kabbalah written in philosophical form: the Ramchal builds his account of providence " +
      "and of gilgulim on Lurianic foundations.",
  },

  // Fórmula EXACTA de atribución del Sofer: dos frases, ni una más. Dice que la
  // atribución es tradicional y que la crítica moderna la discute — sin negarla
  // y sin afirmarla.
  "Derashot HaRan": {
    es:
      "Atribuido a Rabenu Nisim de Gerona (el Ran, siglo XIV). La atribución es tradicional y " +
      "ha sido cuestionada por la crítica moderna.",
    fa:
      "منسوب به ربّی نیسیم گِرونْدی (هَران، سدهٔ چهاردهم). این انتساب سنتی است و پژوهش جدید در آن " +
      "تردید کرده است.",
    en:
      "Attributed to Rabbenu Nissim of Girona (the Ran, 14th c.). The attribution is traditional " +
      "and has been questioned by modern scholarship.",
  },

  // El orden de la estantería puede leerse mal: el Kuzari está entre «Los que
  // le responden» por su FUNCIÓN, y se escribió medio siglo antes que el Moré.
  Kuzari: {
    es:
      "El Kuzari se escribió antes de la Guía de los perplejos: no responde al Rambam, sino al " +
      "racionalismo filosófico de su tiempo. Figura en este grupo por su función, no por su fecha.",
    fa:
      "کوزاری پیش از راهنمای سرگشتگان نوشته شده است: پاسخ آن به ابن میمون نیست، بلکه به " +
      "عقل‌گرایی فلسفی زمانهٔ خود است. جای آن در این گروه به سبب کارکرد آن است، نه تاریخ نگارش.",
    en:
      "The Kuzari was written before the Guide for the Perplexed: it answers not Maimonides but " +
      "the philosophical rationalism of its own day. It stands in this group for what it does, " +
      "not for when it was written.",
  },
};

/** La ficha de una obra, o de la obra a la que pertenece una sección suya. */
export function workNotice(bookId: string | undefined | null): Trilingue | null {
  if (!bookId) return null;
  for (const [id, n] of Object.entries(WORK_NOTICES)) {
    if (bookId === id || bookId.startsWith(`${id}, `) || bookId.startsWith(`${id}-`)) return n;
  }
  return null;
}
