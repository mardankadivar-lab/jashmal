import type { LetterData } from "./types";

// ─────────────────────────────────────────────────────────────────────────
//  VAV (ו) — Data de la sexta letra. Contenido erudito VERIFICADO por el
//  Sofer (editor-erudito) contra Sefaria. Sin placeholders.
//
//  Fuentes verificadas (ver campo `fuentes`):
//   · Génesis 1:1 — la primera vav de la Torá (וְאֵת), 6ª palabra, une cielo/tierra.
//   · Éxodo 27:10 — וָוֵי הָעַמֻּדִים, "los ganchos de las columnas" del Mishkán.
//   · Números 25:12 — la vav quebrada (ketia) de שָׁלוֹם, el pacto de Pinjás.
//   · Kidushín 30a — la vav de גָּחוֹן (Lev 11:42) es el punto medio de las letras.
//   · Sefer Yetzirá 1:13 — las seis direcciones (ו' קצוות) selladas con yod-hey-vav.
//   · Rut 4:18 / Génesis 2:4 — las dos grafías plenas de תּוֹלְדוֹת con vav.
//  Gematrías (calculadas): vav = 6 · nombre pleno וו = 6+6 = 12 · ויו = 6+10+6 = 22.
// ─────────────────────────────────────────────────────────────────────────

export const vav: LetterData = {
  slug: "vav",
  letter: "ו",
  nameTranslit: { es: "Vav", en: "Vav", fa: "واو" },
  nameHe: "וָו",
  value: 6,

  level1: {
    es: "Una sola línea recta que desciende de arriba hacia abajo. Eso es la Vav: un trazo vertical, sin curvas ni adornos, el canal más simple del alfabeto. Es la letra-gancho, el clavo que cose lo de arriba con lo de abajo; y es la única letra hebrea que, puesta al frente de una palabra, significa 'y' — la conjunción que enlaza. Antes de leer su nombre o contar su valor, contémplala como lo que es: un puente tendido en silencio entre el Cielo y la Tierra.",
    en: "A single straight line descending from above to below. That is the Vav: a vertical stroke, the simplest channel of the alphabet. It is the hook, the nail that stitches what is above to what is below — and the one Hebrew letter that, placed before a word, means 'and'.",
  },

  // ── Sección A — NOMBRE ──────────────────────────────────────────────
  name: {
    raicesYsignificado: {
      es: "El nombre וָו significa literalmente 'gancho' o 'clavo'. La Torá lo usa en sentido concreto en la construcción del Mishkán (el Tabernáculo): 'וָוֵי הָעַמֻּדִים' — 'los ganchos de las columnas' (Éxodo 27:10; también 26:32 y 36:38), los ganchos de plata y oro de los que colgaban las cortinas. De ahí nacen sus tres oficios gramaticales, que son tres formas de conectar: (1) la vav ha-jibur, la 'y' que une palabras y frases — la vav de conexión; (2) la vav ha-hipuj (waw conversiva), la vav que 'voltea' el tiempo del verbo, transformando pasado en futuro y futuro en pasado — una vav que conecta también los tiempos; (3) su forma como clavo real, que sostiene y ensambla. El nombre pleno se escribe וו (dos vavs) o ויו; su esencia, en las tres, es la misma: unir.",
    },
    mundos: {
      es: "En los mundos (עוֹלָמוֹת), la Vav es el gancho cósmico: lo que impide que la creación se disperse en fragmentos inconexos. Cada 'y' de la Torá — 'el cielo Y la tierra', 'la luz Y la oscuridad' — es una vav que mantiene cosida la realidad. Sin la letra-conjunción, el mundo sería una lista de cosas sueltas; con ella, es un tejido.",
    },
    almas: {
      es: "En el alma (נְשָׁמוֹת), tu vocación de Vav es la conexión: ser el gancho que une a las personas entre sí y a la persona con su fuente. Quien vive como vav no acumula para sí, sino que hace de puente — recibe de arriba para entregar abajo. Es la midá del que enlaza, del que reconcilia, del que dice 'y' donde otros dicen 'o'.",
    },
    divinidad: {
      es: "En lo divino (אֱלֹהוּת), la Vav es la tercera letra del Nombre הוי״ה (Yud-Hey-Vav-Hey): la vav que baja el flujo desde las letras superiores (la Yud y la primera Hey — Jojmá y Biná, la mente) hacia la Hey final (Maljut, el reino, el mundo). La Vav del Nombre es el conducto de la abundancia divina: por ella desciende la vida desde lo oculto hasta lo revelado.",
    },
  },

  // ── Sección B — FORMA ───────────────────────────────────────────────
  form: {
    descripcion: {
      es: "La Vav es la línea vertical más pura del alfabeto: un solo trazo que baja recto de arriba hacia abajo, como una plomada o un rayo de luz que desciende. No tiene base ni pie; es puro descenso, puro canal. Por eso simboliza al hombre erguido y, sobre todo, la hamshajá: el 'traer hacia abajo' la luz desde lo alto. Cuando la Torá quiere mostrar una conexión rota, la escribe con una vav quebrada (vav ketia) — como en el pacto de paz de Pinjás, שָׁלוֹם (Números 25:12) —, señal de que hasta el canal más recto puede fracturarse y pedir reparación.",
    },
    partes: [
      {
        label: { es: "Cabeza (la corona)", en: "Head (crown)", fa: "سر" },
        significado: {
          es: "El pequeño remate superior de la Vav es como una Yud: un punto de origen en lo alto. Ahí nace la letra, en el mundo de la mente y de lo oculto (Jojmá), antes de descender. La Vav empieza siendo un punto de luz arriba y se estira hacia abajo.",
        },
        svgPathId: "vav-head",
      },
      {
        label: { es: "Cuerpo (el descenso)", en: "Body (descent)", fa: "بدن" },
        significado: {
          es: "La larga línea vertical es el canal mismo: el trayecto de la luz desde su origen hasta el mundo de abajo. Es la hamshajá hecha trazo — el flujo que baja sin desviarse. Este cuerpo recto es el clavo que atraviesa y ensambla los pisos de la realidad.",
        },
        svgPathId: "vav-body",
      },
    ],
    mundos: {
      es: "En los mundos, la forma vertical de la Vav es el eje que conecta los planos: el 'clavo' que atraviesa de arriba abajo la estructura entera de la creación, como los ganchos que sostenían las columnas del Mishkán. Es la columna vertebral del cosmos.",
    },
    almas: {
      es: "En el alma, ser una Vav es mantenerse erguido y ser conducto: recibir de arriba y transmitir hacia abajo sin quedarte con la luz. La vav quebrada te recuerda que la conexión se puede dañar — y que repararla (reparar un vínculo roto, una paz incompleta) es una de las labores más altas.",
    },
    divinidad: {
      es: "En lo divino, la línea recta de la Vav es la vía por la que Ein Sof se derrama hacia los mundos. La forma no tiene curvas porque el descenso divino, en su raíz, es directo: una sola línea de luz desde lo infinito hasta lo finito.",
    },
  },

  // ── Sección C — NÚMERO ──────────────────────────────────────────────
  number: {
    valor: 6,
    // La Vav es un solo trazo; su "gematría de forma" es el milui (nombre pleno).
    guematriaForma: {
      es: "ו + ו = 6 + 6 = 12 (nombre pleno וָו) · variante ויו = 6 + 10 + 6 = 22 (las 22 letras)",
    },
    mundos: {
      es: "6 son los días de la creación y las seis direcciones del espacio: arriba, abajo, norte, sur, este y oeste. El Sefer Yetzirá (1:13) enseña que las 'seis extremidades' (ו' קצוות) fueron selladas con las permutaciones del Nombre yod-hey-vav. La Vav es, así, el número del mundo físico desplegado en seis direcciones alrededor de un centro.",
    },
    almas: {
      es: "6 son las seis sefirot emotivas de Zeir Anpin — Jésed, Guevurá, Tiféret, Nétzaj, Hod y Yesod — las 'seis midot' del corazón que traducen la mente en acción. La Vav del Nombre הוי״ה corresponde a estas seis: por eso ser vav es dejar que lo que entiendes baje hasta lo que sientes y haces.",
    },
    divinidad: {
      es: "La Vav (valor 6) es la letra-puente del Nombre הוי״ה, donde Yud(10)+Hey(5)+Vav(6)+Hey(5) = 26. Une lo alto (Biná, la Madre) con lo bajo (Maljut, la Hija): un solo trazo que sostiene todo el Nombre y hace descender por él la abundancia. Seis es el número de lo que conecta el centro con todas sus direcciones.",
    },
  },

  // ── Conexiones (senderos al Universo) ───────────────────────────────
  conexiones: {
    tanaj: [
      {
        titulo: { es: "La primera Vav de la Torá une cielo y tierra" },
        fuente: {
          es: "Génesis 1:1 — la primera vav aparece en 'וְאֵת הָאָרֶץ' (y la tierra), la 6ª palabra; conecta הַשָּׁמַיִם (cielo) con הָאָרֶץ (tierra). Vav = 6.",
        },
        href: "/mente-cosmica",
      },
    ],
    talmud: [
      {
        titulo: { es: "La Vav de גָּחוֹן: el centro exacto de la Torá" },
        fuente: {
          es: "Kidushín 30a — 'וָא״ו דְּגָחוֹן חֶצְיָין שֶׁל אוֹתִיּוֹת שֶׁל סֵפֶר תּוֹרָה': la vav de גָּחוֹן (Levítico 11:42) es el punto medio de todas las letras del rollo. La letra-conexión es el eje del texto.",
        },
        href: "/mente-cosmica",
      },
    ],
    midrash: [
      {
        titulo: { es: "La Vav restaurada de las תּוֹלְדוֹת" },
        fuente: {
          es: "Tradición midráshica de las 'generaciones' (תּוֹלְדוֹת), casi siempre escritas defectivas (sin vav). Solo dos veces aparecen plenas con vav: Génesis 2:4 (el mundo antes del pecado) y Rut 4:18 (el linaje de Péretz → David → Mashíaj). La vav restaurada = la creación completa.",
        },
        href: "/mente-cosmica",
      },
    ],
    cabala: [
      {
        titulo: { es: "Las seis direcciones selladas con la Vav" },
        fuente: {
          es: "Sefer Yetzirá 1:13 — las seis extremidades del espacio (ו' קצוות: arriba, abajo, este, oeste, norte, sur) se sellan con las seis permutaciones de las letras yod-hey-vav. Vav = 6 = la estructura del espacio.",
        },
        href: "/mente-cosmica",
      },
    ],
    jasidut: [
      {
        titulo: { es: "La Vav como hamshajá: bajar la luz al mundo" },
        fuente: {
          es: "Jasidut jabad (Tania, mapeo de הוי״ה a las sefirot): la Vav del Nombre son las seis midot que hacen descender la luz de la mente (Jojmá-Biná) hasta Maljut. Ser vav es hacer de conducto — recibir de arriba para entregar abajo.",
        },
        href: "/mente-cosmica",
      },
    ],
  },

  fuentes: [
    { es: "Génesis 1:1 — la primera vav de la Torá (וְאֵת), 6ª palabra, une cielo y tierra." },
    { es: "Éxodo 27:10 — 'וָוֵי הָעַמֻּדִים', los ganchos de las columnas del Mishkán (cf. 26:32; 36:38)." },
    { es: "Números 25:12 — la vav quebrada (ketia) de שָׁלוֹם en el pacto de paz de Pinjás." },
    { es: "Levítico 11:42 con Kidushín 30a — la vav de גָּחוֹן, punto medio de las letras de la Torá." },
    { es: "Sefer Yetzirá 1:13 — las seis direcciones (ו' קצוות) selladas con yod-hey-vav." },
    { es: "Génesis 2:4 y Rut 4:18 — las dos grafías plenas de תּוֹלְדוֹת con vav." },
    { es: "R. Yitzchak Ginsburgh, 'The Hebrew Letters: Channels of Creative Consciousness' — la Vav como conexión (jibur) y hamshajá." },
    { es: "Gematrías calculadas: vav = 6 · nombre pleno וו = 12 · ויו = 22 · הוי״ה = 10+5+6+5 = 26." },
  ],
};
