// Citas de motivación para el estudio, de las fuentes sagradas.
// Una rota cada día (índice por día del año), en ES y FA.

export interface Quote {
  es: string;
  fa: string;
  source: string; // fuente (se muestra igual en ambos idiomas)
  ref?: string; // ref de Sefaria si es estudiable (clickable)
}

export const QUOTES: Quote[] = [
  {
    es: "La luz del justo es como la luz de la aurora, que va en aumento hasta que el día es perfecto.",
    fa: "نورِ پارسا چون روشناییِ سپیده‌دم است که فزاینده می‌رود تا روز کامل شود.",
    source: "Mishlei 4:18",
    ref: "Proverbs 4:18",
  },
  {
    es: "No es el estudio lo esencial, sino la acción.",
    fa: "اصل، نه آموختن، بلکه عمل است.",
    source: "Pirkei Avot 1:17",
    ref: "Pirkei Avot 1:17",
  },
  {
    es: "Hazte un maestro, adquiérete un compañero, y juzga a todo hombre con favor.",
    fa: "برای خود استادی برگزین، یاری به‌دست آور، و هر کس را به دیدهٔ نیکی بسنج.",
    source: "Pirkei Avot 1:6",
    ref: "Pirkei Avot 1:6",
  },
  {
    es: "En el lugar donde hay penitentes, ni los justos perfectos pueden estar.",
    fa: "در جایی که بازگشتگان می‌ایستند، حتی پارسایانِ کامل نمی‌توانند بایستند.",
    source: "Berajot 34b",
    ref: "Berakhot 34b",
  },
  {
    es: "Vuélvete a ella una y otra vez, porque todo está en ella.",
    fa: "بارها و بارها در آن بنگر، زیرا همه‌چیز در آن است.",
    source: "Pirkei Avot 5:22",
    ref: "Pirkei Avot 5:22",
  },
  {
    es: "Buscadme y viviréis.",
    fa: "مرا بطلبید و زنده بمانید.",
    source: "Amós 5:4",
    ref: "Amos 5:4",
  },
  {
    es: "Abre mis ojos, para que vea las maravillas de tu Torá.",
    fa: "چشمانم را بگشا تا شگفتی‌های تورات تو را ببینم.",
    source: "Tehilim 119:18",
    ref: "Psalms 119:18",
  },
  {
    es: "El principio de la sabiduría es el temor del Eterno.",
    fa: "آغاز حکمت، ترسِ خداوند است.",
    source: "Tehilim 111:10",
    ref: "Psalms 111:10",
  },
  {
    es: "Si no es ahora, ¿cuándo?",
    fa: "اگر اکنون نه، پس کِی؟",
    source: "Pirkei Avot 1:14",
    ref: "Pirkei Avot 1:14",
  },
  {
    es: "Sé de los discípulos de Aarón: ama la paz y persíguela, ama a las criaturas y acércalas a la Torá.",
    fa: "از شاگردان هارون باش: صلح را دوست بدار و در پی‌اش باش، آفریدگان را دوست بدار و آنان را به تورات نزدیک کن.",
    source: "Pirkei Avot 1:12",
    ref: "Pirkei Avot 1:12",
  },
  {
    es: "El alma del hombre es la lámpara del Eterno.",
    fa: "روحِ آدمی، چراغِ خداوند است.",
    source: "Mishlei 20:27",
    ref: "Proverbs 20:27",
  },
  {
    es: "Quien adquiere para sí palabras de Torá, adquiere para sí vida en el mundo venidero.",
    fa: "هر که سخنانِ تورات را برای خود فرا گیرد، زندگیِ جهانِ آینده را برای خود فراهم آورده است.",
    source: "Pirkei Avot 2:7",
    ref: "Pirkei Avot 2:7",
  },
];

/** Cita del día (estable por fecha, rota cada día). */
export function quoteOfTheDay(seed?: number): Quote {
  const day =
    seed ??
    Math.floor(Date.now() / (1000 * 60 * 60 * 24)); // día desde época
  return QUOTES[day % QUOTES.length];
}

export function quoteText(q: Quote, locale: string): string {
  return locale === "fa" ? q.fa : q.es;
}
