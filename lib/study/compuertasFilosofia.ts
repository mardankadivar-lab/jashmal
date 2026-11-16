// ─────────────────────────────────────────────────────────────────────────
//  LAS CUATRO COMPUERTAS DE LA SÉPTIMA ESTANTERÍA
//  (filosofía judía · מַחְשֶׁבֶת יִשְׂרָאֵל)
// ─────────────────────────────────────────────────────────────────────────
//
//  Principio de la casa: el modelo propone, el código comprueba. De la
//  autopsia del estudio fallido del Moré (16-nov-2026) salieron cuatro
//  comprobaciones que no necesitan a Claude para hacerse:
//
//    C-1 · PERTENENCIA DE LA PALABRA — vive en `pertenenciaPalabra.ts`, es
//          genérica y hoy solo se enciende aquí. Es la que más rinde: atrapa
//          אמן/אמונים, que el verificador aritmético dejaba pasar porque la
//          suma estaba bien.
//    C-2 · GEMATRÍA CERRADA en `Jewish Thought`, salvo que el propio pasaje
//          traiga el número. Es P-5 hecho código.
//    C-3 · NADIE FUERA DE LA LISTA de comentaristas de la obra. Rashi, el
//          Ramban e Ibn Ezra en esta estantería son fallo duro.
//    C-4 · TÍTULOS DE SECCIÓN FUERA DE LUGAR: ni la antesala de palabras
//          repetidas ni ninguno de los ocho títulos del método del midrash.
//
//  Y una quinta, de regalo, porque es literal y barata: las CONSTRUCCIONES
//  PROHIBIDAS de P-3 («en clave cabalística esto corresponde a», «no por
//  casualidad», «el autor insinúa»). El Sofer las escribió como lista de
//  formas, no de palabras, precisamente para que se pudieran buscar.
//
//  Todas marcan, ninguna borra: igual que `citationCheck`, la prosa sale
//  entera y la marca le quita autoridad al dato que falló. Y ninguna puede
//  tumbar un estudio: si algo revienta, no hay marca.
// ─────────────────────────────────────────────────────────────────────────

import { esqueleto, revisaPertenencia, type CorpusRecuperado } from "@/lib/study/pertenenciaPalabra";
import { checkArithmetic } from "@/lib/sources/gematriaClaims";
import { checkMidrashBlock } from "@/lib/study/midrashBlock";
import { COMENTARISTAS_FILOSOFIA } from "@/lib/sources/comentaristas";

export type Compuerta = "C-1" | "C-2" | "C-3" | "C-4" | "P-3";

export interface HallazgoCompuerta {
  compuerta: Compuerta;
  /** El tramo tal como lo escribió el motor. */
  raw: string;
  /** Posición en el estudio donde termina el tramo marcado. */
  end: number;
  /** Qué se le dice al lector, en español (el rótulo corto va aparte). */
  detalle: string;
}

/** Las dos obras donde el autor ES el cabalista: ahí el Arizal es suyo. */
export const OBRAS_CABALISTAS = ["Nefesh HaChayim", "Derekh Hashem"] as const;

// ── Lo que NUNCA se juzga como palabra del pasaje (para C-1) ─────────────
// Títulos de sección, acrónimos y nombres de obra en hebreo. No pretenden
// estar en el pasaje, así que marcarlos sería ruido.
const TITULOS_PROPIOS = [
  // el método de esta estantería
  "תַּרְגּוּם", "מְפָרְשִׁים", "עִיּוּן", "עִקָּר", "יְסוֹדוֹת", "וִכּוּחַ",
  "נְקוּדַּת", "הַמִּפְגָּשׁ", "הִתְבּוֹנְנוּת", "מַעֲשֶׂה", "חֲתִימָה", "הֶמְשֵׁךְ",
  // obras y nombres que el estudio nombra en hebreo
  "מורה", "נבוכים", "הכוזרי", "חובות", "הלבבות", "האמונות", "והדעות",
  "שמונה", "פרקים", "ספר", "העקרים", "דרשות", "הרן", "דרך", "נתיבות",
  "עולם", "נפש", "החיים", "אגרות", "צפון", "אור", "מלחמות", "השם",
  "מנחת", "קנאות", "עקידת", "יצחק", "לנבוכי", "הדור", "משנה", "תורה",
  "הלכות", "יסודי", "התורה", "שער", "שערי", "היחוד", "פת", "לחם",
  "טוב", "הלבנון", "מרפא", "לנפש", "אפודי", "שם", "נרבוני", "קרשקש",
  "אברבנאל", "זהר", "הזהר", "תנך", "פרדס", "גימטריה", "מפתחות", "מפזרים",
];

/** Los esqueletos exentos, calculados una vez. */
const EXENTOS: string[] = TITULOS_PROPIOS.map(esqueleto).filter((e) => e.length >= 2);

// ─────────────────────────────────────────────────────────────────────────
//  C-2 · GEMATRÍA CERRADA
// ─────────────────────────────────────────────────────────────────────────
//
// P-5 del método: «Cero. No "con cautela": cero, salvo un caso» — que el
// cálculo esté EN EL PASAJE RECUPERADO, hecho por el autor.
//
// Así que la excepción se comprueba sobre el pasaje, no sobre el estudio: si
// el pasaje no trae ni una cifra, no hay cuenta del autor que reportar y
// cualquier aritmética del estudio la puso el motor.
//
// ── CÓMO SE RECONOCE «UN NÚMERO EN EL PASAJE», Y POR QUÉ ASÍ ──
//
// Un dígito. Nada más. Y es así porque lo medí contra el texto real y la
// alternativa no funciona:
//
//  · La primera versión de esto admitía también el número escrito con letras
//    (geresh y gershayim: «פרק ל״ה» = capítulo 35). Medido contra el Moré I:1
//    en la edición de Ibn Tibón que el sitio sirve, daba «sí» SIEMPRE — porque
//    ESTA EDICIÓN USA EL GERESH Y EL GERSHAYIM COMO COMILLAS: «׳צלם׳ ו׳דמות׳»,
//    «״פתחו שערים״». La compuerta quedaba apagada justo en la obra para la que
//    se escribió.
//  · Y no se arregla afinando el patrón, porque el número con letras y la
//    ABREVIATURA son la misma forma: «ל״ה» (35) y «ר״ל» (rotzé lomar, «quiere
//    decir») se escriben igual; y «ה׳» no es el número cinco, es el Nombre.
//
// Así que el dígito es la señal, y digo en voz alta cuál es el precio: si un
// autor hiciera una cuenta escrita con letras, el estudio que la REPORTARA
// bien saldría marcado. Es el error que estamos dispuestos a pagar, por tres
// razones: P-5 dice «cero, salvo un caso»; estas obras casi no traen cuentas
// (el Sofer no pudo verificar ni una en la estantería); y la marca EXPLICA su
// motivo —«el pasaje no trae ninguna cifra»— así que se distingue de un fallo
// de verdad con solo leerla.
const NUMERO_EN_PASAJE = /\d/;

export function pasajeTraeNumero(pasaje: string): boolean {
  return NUMERO_EN_PASAJE.test(pasaje ?? "");
}

/** Menciones de la gematría como instrumento, con o sin cuenta detrás. */
const MENCION_GEMATRIA =
  /guematr[íi]a|gematr[íi]a|gematria|valor num[ée]rico|حساب حروف|גימטריה|גימטריא/gi;

function c2(estudio: string, pasaje: string): HallazgoCompuerta[] {
  const out: HallazgoCompuerta[] = [];
  if (pasajeTraeNumero(pasaje)) return out; // el autor pudo hacer la cuenta
  try {
    for (const f of checkArithmetic(estudio).findings) {
      out.push({
        compuerta: "C-2",
        raw: f.raw,
        end: f.end,
        detalle:
          "la gematría no es instrumento de este método (P-5): el pasaje no trae " +
          "ninguna cifra, así que esta cuenta la añadió el motor",
      });
    }
  } catch {
    /* un texto raro no tumba el estudio */
  }
  MENCION_GEMATRIA.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = MENCION_GEMATRIA.exec(estudio)) !== null) {
    const end = m.index + m[0].length;
    if (out.some((h) => Math.abs(h.end - end) < 80)) continue; // ya marcado
    out.push({
      compuerta: "C-2",
      raw: m[0],
      end,
      detalle: "la gematría no se usa en filosofía judía (P-5)",
    });
  }
  return out;
}

// ─────────────────────────────────────────────────────────────────────────
//  C-3 · NADIE FUERA DE LA LISTA
// ─────────────────────────────────────────────────────────────────────────
//
// Dos cosas distintas, y conviene no mezclarlas:
//
// (a) Los comentaristas del TANAJ. El Sofer los prohíbe POR NOMBRE en esta
//     estantería y lo llama fallo duro: Rashi, el Ramban, Ibn Ezra, Sforno,
//     el Malbim, Rabenu Bajiá, el Kli Yakar, el Or HaJaim. No comentan estas
//     obras — no es que sea impreciso citarlos, es que no existe el texto.
//     Ojo con el Ramban: NO es el Rambam. Una letra, dos hombres, y el Rambam
//     es el autor de dos de las once obras. Por eso el patrón es exacto.
//
// (b) Las voces de la CABALÁ y del JASIDUT. Esas no están prohibidas de raíz:
//     entran por `נְקוּדַּת הַמִּפְגָּשׁ` si cumplen los tres requisitos —sujeto
//     nombrado, fecha, y obra localizable. El requisito (3) del método es
//     «se nombra la distancia», o sea el siglo. Así que lo que se comprueba
//     es justo eso: que haya una fecha o un siglo cerca del nombre. Si la hay,
//     el motor cumplió la forma y no se marca; si no, se marca pidiéndola.
//     En Néfesh HaJaim y Dérej Hashem el Arizal es fuente PROPIA del autor
//     (§4.2, la vía invertida) y queda exento.
const PROHIBIDOS_TANAJ: { nombre: string; re: RegExp }[] = [
  { nombre: "Rashi", re: /\bRash[ií]\b|רש״י|רש"י/g },
  { nombre: "Ramban", re: /\bRamb[áa]n\b|\bNajm[áa]nides\b|\bNachmanides\b|רמב״ן|רמב"ן/g },
  { nombre: "Ibn Ezra", re: /\bIbn\s+Ezra\b|אבן עזרא/g },
  { nombre: "Sforno", re: /\bSforno\b|ספורנו/g },
  { nombre: "Malbim", re: /\bMalbim\b|מלבי״ם|מלבי"ם/g },
  { nombre: "Rabenu Bajiá", re: /\bRab[ei]n?u\s+Baj[íi]a\b|\bRabbeinu\s+Bachya\b|רבנו בחיי/g },
  { nombre: "Kli Yakar", re: /\bKli\s+Yakar\b|כלי יקר/g },
  { nombre: "Or HaJaim", re: /\bOr\s+Ha[JCj]ha?[íi]?m\b|אור החיים/g },
];

const VOCES_POSTERIORES: { nombre: string; re: RegExp }[] = [
  { nombre: "el Arizal", re: /\bAriza?l\b|\bAr[íi]\s+HaKadosh\b|האר״י|האר"י/g },
  { nombre: "Jaim Vital", re: /\b[JCh]ai[mn]\s+Vital\b|חיים ויטאל/g },
  { nombre: "el Baal HaSulam", re: /\bBaal\s+Ha[Ss]ulam\b|בעל הסולם/g },
  { nombre: "el Baal Shem Tov", re: /\bBaal\s+Shem\s+Tov\b|בעל שם טוב|בעש״ט/g },
];

/** ¿Hay una fecha o un siglo a la vista? El método exige nombrar la distancia. */
const FECHA_CERCA = /\b1[0-9]{3}\b|\b[0-9]{3,4}\s*[–\-−]\s*[0-9]{3,4}\b|\bs(?:iglo)?\.?\s*[IVXLC]{1,6}\b|سدهٔ|\b1[0-9]th\b|\b[0-9]{1,2}(?:st|nd|rd|th)\s+c\.?\b/i;

function c3(estudio: string, obra: string): HallazgoCompuerta[] {
  const out: HallazgoCompuerta[] = [];
  const esCabalista = (OBRAS_CABALISTAS as readonly string[]).includes(obra);

  for (const p of PROHIBIDOS_TANAJ) {
    p.re.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = p.re.exec(estudio)) !== null) {
      out.push({
        compuerta: "C-3",
        raw: m[0],
        end: m.index + m[0].length,
        detalle:
          `${p.nombre} no comenta esta obra (P-6): los comentaristas de la ` +
          `estantería son otros, y los de «${obra}» están en la lista verificada`,
      });
    }
  }

  for (const v of VOCES_POSTERIORES) {
    if (esCabalista && (v.nombre === "el Arizal" || v.nombre === "Jaim Vital")) continue;
    v.re.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = v.re.exec(estudio)) !== null) {
      const ventana = estudio.slice(Math.max(0, m.index - 140), m.index + 140);
      if (FECHA_CERCA.test(ventana)) continue; // nombró la distancia: cumple
      out.push({
        compuerta: "C-3",
        raw: m[0],
        end: m.index + m[0].length,
        detalle:
          `voz posterior sin la distancia nombrada: ${v.nombre} entra solo con ` +
          `sujeto, siglo y obra localizable (נְקוּדַּת הַמִּפְגָּשׁ, requisito 3)`,
      });
    }
  }
  return out;
}

/** Los nombres de la lista de esta obra, para los guardianes. */
export function listaDeLaObra(obra: string): string[] {
  return (COMENTARISTAS_FILOSOFIA[obra] ?? []).map((c) => c.nombre);
}

// ─────────────────────────────────────────────────────────────────────────
//  C-4 · TÍTULOS DE SECCIÓN FUERA DE LUGAR
// ─────────────────────────────────────────────────────────────────────────
//
// Un chequeo de títulos, barato, y es el que ve de un golpe si el motor se
// cambió de método a mitad de camino. Se compara SIN NIKUD porque el motor
// vocaliza como quiere y la comparación no puede depender de eso.
// OJO: `esq` se pasa por `esqueleto()` al construir la tabla, igual que la
// línea con la que se compara. Si se escribiera a mano no encajaría nunca,
// porque `esqueleto()` devuelve las finales a su forma normal: «מִלִּים» no da
// «מלים» sino «מלימ», y la primera versión de esta tabla dejaba pasar
// precisamente el título de las palabras repetidas.
const TITULOS_AJENOS: { rotulo: string; esq: string }[] = [
  // la antesala del Tanaj
  { rotulo: "מִלִּים חוֹזְרוֹת (palabras repetidas)", esq: "מליםחוזרות" },
  { rotulo: "מִלִּים חוֹזְרוֹת (palabras repetidas)", esq: "מיליםחוזרות" },
  // el PaRDeS, que SE RETIRA de esta estantería
  { rotulo: "פרד״ס (PaRDeS)", esq: "פרדס" },
  // los ocho del método ampliado del midrash
  { rotulo: "דִּקְדּוּק הַכָּתוּב (la grieta)", esq: "דקדוקהכתוב" },
  { rotulo: "מָשָׁל וְנִמְשָׁל", esq: "משלונמשל" },
  { rotulo: "הַקְבָּלָה וּפְעָרִים", esq: "הקבלהופערים" },
  { rotulo: "הַנִּסְתָּר שֶׁבַּמָּשָׁל", esq: "הנסתרשבמשל" },
  { rotulo: "דַּרְכֵי הָאַגָּדָה", esq: "דרכיהאגדה" },
  { rotulo: "שִׁיבָה אֶל הַכָּתוּב", esq: "שיבהאלהכתוב" },
];

/** La tabla, con los esqueletos ya normalizados. */
const TITULOS_NORMALIZADOS = TITULOS_AJENOS.map((t) => ({
  rotulo: t.rotulo,
  esq: esqueleto(t.esq),
})).filter((t) => t.esq.length >= 4);

/**
 * ¿Esta línea tiene pinta de encabezado de sección?
 *
 * Estricta a propósito. Si valiera cualquier línea corta, una frase legítima
 * como «aquí no hay פרד״ס» pasaría por título y se marcaría al motor por
 * cumplir. Así que: o trae marca de encabezado (#, **, «3.», viñeta en
 * negrita), o es una línea corta SIN puntuación de prosa, que es lo que es un
 * título suelto.
 */
function pareceTitulo(linea: string): boolean {
  const l = linea.trim();
  if (l.length === 0 || l.length > 160) return false;
  if (/^(#{1,6}\s|\*\*|__|\d+[.)]\s|[-•]\s*\*\*)/.test(l)) return true;
  return l.length <= 60 && !/[.,;:!?؟،]/.test(l);
}

function c4(estudio: string): HallazgoCompuerta[] {
  const out: HallazgoCompuerta[] = [];
  let pos = 0;
  for (const linea of estudio.split("\n")) {
    const inicio = pos;
    pos += linea.length + 1;
    if (!pareceTitulo(linea)) continue;
    const esq = esqueleto(linea);
    for (const t of TITULOS_NORMALIZADOS) {
      if (!esq.includes(t.esq)) continue;
      out.push({
        compuerta: "C-4",
        raw: linea.trim().slice(0, 80),
        end: inicio + linea.length,
        detalle: `«${t.rotulo}» es un título de otro método, no de esta estantería (P-4)`,
      });
      break;
    }
  }
  // ── Y LO QUE VA PEGADO DETRÁS DEL SELLO ──
  //
  // C-4 vigilaba los rótulos que se cuelan DENTRO del estudio. Esto es lo
  // mismo, pero después de la חֲתִימָה: en la prueba del 16-nov-2026 el cuerpo
  // del estudio salió correcto y la fuga estaba en el umbral de navegación, con
  // un puente «¿Por qué שומר abre con la letra Shin, y qué guarda esa letra?».
  // Un enlace {{letter:…}} manda al lector al estudio místico de una letra
  // justo después de leer que este pasaje no autoriza esa lectura: deshace el
  // sello del estudio que lo precede. Prohibido en toda la estantería (P-10).
  // Los {{study:…}} NO se tocan: los otros tres puentes de esa prueba eran
  // buenos y son la salida legal.
  const ENLACE_LETRA = /\{\{letter:[^}]*\}\}/g;
  ENLACE_LETRA.lastIndex = 0;
  let mLetra: RegExpExecArray | null;
  while ((mLetra = ENLACE_LETRA.exec(estudio)) !== null) {
    out.push({
      compuerta: "C-4",
      raw: mLetra[0],
      end: mLetra.index + mLetra[0].length,
      detalle:
        "enlace de letra hebrea en un estudio de filosofía (P-10): el umbral " +
        "solo admite {{study:…}}, porque un puente al estudio místico de una " +
        "letra deshace el sello del estudio",
    });
  }

  // El rótulo del bloque compacto del midrash, que es el que apareció en el
  // estudio fallido. Lo detecta el medidor que ya existe.
  try {
    const bloque = checkMidrashBlock(estudio);
    if (bloque.found) {
      const i = estudio.search(/an[áa]lisis del midrash|midrash al desnudo/i);
      if (i >= 0) {
        out.push({
          compuerta: "C-4",
          raw: estudio.slice(i, i + 40),
          end: i + 20,
          detalle: "el bloque «Análisis del Midrash» es de otra estantería (P-4)",
        });
      }
    }
  } catch {
    /* el medidor nunca puede tumbar el estudio */
  }
  return out;
}

// ─────────────────────────────────────────────────────────────────────────
//  P-3 · LAS CONSTRUCCIONES PROHIBIDAS
// ─────────────────────────────────────────────────────────────────────────
//
// «La lista es de formas, no de palabras; traducida a cualquier idioma sigue
// prohibida.» Son las que permiten atribuirle al autor una doctrina posterior
// sin ponerle sujeto a la oración — y el requisito de sujeto gramatical de
// `נְקוּדַּת הַמִּפְגָּשׁ` es justo lo que no se puede rodear reencuadrando.
const FORMAS_PROHIBIDAS: { re: RegExp; porque: string }[] = [
  { re: /en clave cabal[íi]stica/gi, porque: "oración sin sujeto: el método exige una persona nombrada y fechada" },
  // Solo con el AUTOR por sujeto: «el argumento sugiere» es prosa legítima, y
  // lo que el Sofer prohíbe es «el autor alude / insinúa / sugiere».
  {
    re: /\b(?:el\s+(?:autor|Rambam|Ramjal|Maharal|Ran|Rav)|HaLev[íi]|Baji[áa]|Saadi[áa]|Albo|Hirsch)\b[^.\n]{0,40}\b(?:alude|insin[úu]a|sugiere|da a entender|hints at)\b/gi,
    porque: "atribuirle al autor una intención oculta",
  },
  { re: /\b(?:en el fondo|en realidad lo que|lo que verdaderamente dice)\b/gi, porque: "«lo que en el fondo dice» no es una lectura, es una suplantación" },
  { re: /la cabal[áa] ve aqu[íi]|lo que un cabalista ver[íi]a|qu[ée] dir[íi]a un cabalista/gi, porque: "sujeto colectivo o hipotético: esa salida está cerrada" },
  { re: /no (?:es|fue) casual|no por casualidad/gi, porque: "insinúa un designio sin fuente" },
  { re: /los sabios ense[ñn]an/gi, porque: "«los sabios enseñan» sin fuente localizada" },
  // Fusión de sujetos, y solo eso: «los comentaristas coinciden en» es correcto
  // y además es lo que se le pide. Lo prohibido es fundir al autor con una obra
  // posterior, así que se exige la Cabalá a la vista.
  {
    re: /(?:Z[óo]har|Cabal[áa]|C[áa]bala|Ariza?l)[^.\n]{0,40}coincide|coincide[^.\n]{0,40}(?:Z[óo]har|Cabal[áa]|C[áa]bala|Ariza?l)/gi,
    porque: "fusión de sujetos: el autor y una obra posterior no son un mismo sujeto",
  },
];

function p3(estudio: string): HallazgoCompuerta[] {
  const out: HallazgoCompuerta[] = [];
  for (const f of FORMAS_PROHIBIDAS) {
    f.re.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = f.re.exec(estudio)) !== null) {
      out.push({
        compuerta: "P-3",
        raw: m[0],
        end: m.index + m[0].length,
        detalle: `construcción prohibida (P-3): ${f.porque}`,
      });
    }
  }
  return out;
}

// ─────────────────────────────────────────────────────────────────────────
//  Las cuatro de una vez
// ─────────────────────────────────────────────────────────────────────────

export interface EntradaCompuertas {
  /** El estudio tal como se envió al lector. */
  estudio: string;
  /** La obra de filosofía abierta (id de Sefaria). */
  obra: string;
  /** El hebreo del pasaje que se le dio al motor. */
  pasaje: string;
  /** El hebreo de las fuentes adjuntas, si hubo modo profundo. */
  fuentes?: string;
}

export interface ResultadoCompuertas {
  hallazgos: HallazgoCompuerta[];
  /** Cuántas palabras hebreas se comprobaron y están donde se dice (C-1). */
  palabrasConfirmadas: number;
  /** Resumen por compuerta, para el log. */
  resumen: Record<Compuerta, number>;
}

export function revisaFilosofia(e: EntradaCompuertas): ResultadoCompuertas {
  const hallazgos: HallazgoCompuerta[] = [];
  let palabrasConfirmadas = 0;

  // C-1
  try {
    const corpus: CorpusRecuperado = {
      pasaje: e.pasaje ?? "",
      fuentes: e.fuentes ?? "",
      noJuzgar: EXENTOS,
    };
    const p = revisaPertenencia(e.estudio, corpus);
    palabrasConfirmadas = p.confirmadas;
    for (const h of p.hallazgos) {
      hallazgos.push({
        compuerta: "C-1",
        raw: h.raw,
        end: h.end,
        detalle:
          h.nivel === "estricto"
            ? `«${h.raw}» no está escrita así en el pasaje: una cuenta se hace ` +
              `sobre la palabra TAL COMO está, no sobre una parecida (P-5, prueba 2)`
            : `«${h.raw}» no aparece en el pasaje recuperado ni en las fuentes`,
      });
    }
  } catch {
    /* C-1 nunca tumba el estudio */
  }

  // C-2, C-3, C-4 y P-3
  try { hallazgos.push(...c2(e.estudio, e.pasaje ?? "")); } catch { /* */ }
  try { hallazgos.push(...c3(e.estudio, e.obra)); } catch { /* */ }
  try { hallazgos.push(...c4(e.estudio)); } catch { /* */ }
  try { hallazgos.push(...p3(e.estudio)); } catch { /* */ }

  const resumen: Record<Compuerta, number> = { "C-1": 0, "C-2": 0, "C-3": 0, "C-4": 0, "P-3": 0 };
  for (const h of hallazgos) resumen[h.compuerta]++;

  return { hallazgos, palabrasConfirmadas, resumen };
}

/**
 * Qué compuertas MARCAN EN LA PROSA, y cuáles solo MIDEN.
 *
 * Las cuatro compuertas marcan: lo que detectan es comprobable —una palabra que
 * no está en el pasaje, una cuenta que el pasaje no autoriza, un nombre que no
 * comenta esta obra, un título de otro método.
 *
 * P-3 NO marca: solo mide y se escribe en el log. Sus formas prohibidas son de
 * SINTAXIS, y aunque la lista es literal del Sofer, una frase legítima puede
 * caer dentro («el argumento sugiere que…»). Poner una marca de reproche sobre
 * una frase correcta sale más caro que no ponerla — es la misma postura que
 * `midrashBlock.ts`: primero medir, y con datos decidir si hay que apretar.
 */
export const COMPUERTAS_QUE_MARCAN: readonly Compuerta[] = ["C-1", "C-2", "C-3", "C-4"];

/** Rótulo corto de la marca, por idioma. El detalle solo se escribe en español. */
export const ROTULO_COMPUERTA: Record<string, string> = {
  es: "sin confirmar en el texto",
  fa: "در متن تأییدنشده",
  en: "unconfirmed in the text",
};
