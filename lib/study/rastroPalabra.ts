// El rastro de una palabra por el Tanaj: «en todo lugar donde se dice»
// (כָּל מָקוֹם שֶׁנֶּאֱמַר).
//
// Cuando el lector abre un pasaje, el estudio puede tomar una palabra
// importante de ese pasaje y mostrarle en qué OTROS lugares del Tanaj aparece
// esa misma palabra. No es una curiosidad de concordancia: es la manera en que
// el Midrash, Rashi y el Zóhar iluminan un concepto —se ve qué matiz tiene la
// palabra viendo la compañía que lleva en el resto de la Escritura.
//
// EL NOMBRE ESTÁ VERIFICADO CON ERUDICIÓN y es el único que se usa: «en todo
// lugar donde se dice». Hay una regla talmúdica de derivación legal que
// también empareja dos pasajes por una palabra compartida, y a esta función le
// quedaría grande ese nombre: aquella exige tradición recibida y deriva
// halajá, y esto no deriva nada — ilumina un matiz. Llamarla como a esa regla
// sería un error de exactitud religiosa, así que su nombre no se escribe en
// ninguna parte de este código ni del prompt, ni para prohibirlo: nombrarlo en
// el prompt es justamente lo que le daría al motor la idea de usarlo.
//
// ── LA REGLA QUE DEFINE ESTA FUNCIÓN ────────────────────────────────────
//
// Cuando un lema es lo bastante raro para listarlo entero, se entregan TODAS
// sus apariciones. NUNCA una selección. Ni las más bonitas, ni las más
// cercanas, ni las primeras diez.
//
// El motivo no es técnico. El modelo de esto es Meguilá 10b, donde Rabí Leví
// rastrea «vayhí» por once lugares para mostrar que la palabra trae aflicción
// — y SE PONE ÉL MISMO EL CONTRAEJEMPLO: el día octavo del Mishkán, que es un
// día de alegría. No lo esconde: lo trae, y lo resuelve (ese día murieron
// Nadav y Avihú). Esa honestidad es el método, no un adorno del método.
//
// Si el código entregara una selección, el motor escogería los casos que le
// convienen y el rastreo se volvería propaganda con cara de erudición.
// Entregando la lista completa, el motor queda OBLIGADO a dar cuenta del caso
// que no encaja, porque lo tiene delante y el lector también.
//
// Alguien va a querer «optimizar» esto algún día: recortar la lista a cinco
// para que el prompt pese menos, o quedarse con las apariciones «relevantes».
// Eso no es una optimización, es quitarle a la función su razón de ser. Si la
// lista no cabe entera, el lema NO SE RASTREA — y por eso la tabla solo guarda
// lemas poco frecuentes (ver scripts/gen-concordancia.mjs): el filtro está en
// QUÉ palabras entran, nunca en cuántas apariciones se muestran de las que ya
// entraron.
//
// Lo que sí se limita es el número de PALABRAS que se rastrean en un estudio
// (dos o tres), porque un estudio no puede rastrear veinte palabras. Eso no
// toca la regla: cada palabra que se rastrea se rastrea completa.

import {
  APARICIONES,
  LIBROS_CONCORDANCIA,
  PISO_APARICIONES,
  TOPE_APARICIONES,
  LEMAS_NOMBRE_PROPIO,
} from "@/lib/sources/concordancia.generated";
import { tokenizaHebreo, lemaDeForma, POS_CONTENIDO } from "@/lib/study/palabrasRepetidas";
import { libroDeTanaj } from "@/lib/sources/tanajRef";
import { BOOK_NAMES } from "@/lib/sources/bookNames";

/** Una aparición: su dirección exacta, ya resuelta. */
export interface Aparicion {
  /** El libro con el nombre que usa Sefaria («Genesis»): es el de las refs. */
  libro: string;
  capitulo: number;
  versiculo: number;
  /** La referencia tal como se cita y se enlaza: «Genesis 22:14». */
  ref: string;
  /** ¿Cae dentro del pasaje que el lector tiene abierto? */
  aquí: boolean;
}

/** El rastro de una palabra: su lista completa de apariciones. */
export interface Rastro {
  /** La palabra como la escribe el pasaje abierto, con sus vocales. */
  forma: string;
  /** Solo consonantes. */
  consonantes: string;
  /** El lema que la agrupa: parte de la oración + número de Strong («V559»). */
  lema: string;
  /** Cuántas veces aparece en TODO el Tanaj. Es `apariciones.length`, siempre. */
  total: number;
  /** TODAS sus apariciones, en orden de lectura. Nunca un recorte. */
  apariciones: Aparicion[];
  /** La edición la etiqueta como nombre propio. */
  nombrePropio: boolean;
}

/** El pasaje abierto, en números, para saber qué apariciones caen dentro. */
interface Tramo {
  libro: string;
  desde: number;
  hasta: number;
}

/** Capítulo y versículo en un solo número comparable. Ningún capítulo del Tanaj pasa de 176 versículos. */
const punto = (cap: number, vers: number) => cap * 1000 + vers;

/**
 * El pasaje abierto, leído de su referencia.
 *
 * Entiende las cuatro formas que manda el sitio: «Genesis 1» (capítulo
 * entero), «Genesis 1:3» (un versículo), «Genesis 1:1-5» (un rango dentro del
 * capítulo) y «Genesis 1:1-6:8» (una parashá, que cruza capítulos).
 *
 * Para qué hace falta: una aparición que cae DENTRO del pasaje abierto no es
 * «otro lugar» —es el lugar donde está el lector—, y hay que poder decirlo.
 * No se quita de la lista (la lista es completa), se marca.
 */
export function tramoDeRef(ref: string | undefined | null): Tramo | null {
  const libro = libroDeTanaj(ref);
  if (!libro || !ref) return null;
  const resto = ref.trim().slice(libro.length).trim();
  const nums = resto.match(/\d+/g);
  if (!nums || nums.length === 0) return null;

  const hayRango = resto.includes("-");
  const n = nums.map(Number);

  // «Genesis 1» → el capítulo entero.
  if (!hayRango && n.length === 1) {
    return { libro, desde: punto(n[0], 0), hasta: punto(n[0], 999) };
  }
  // «Genesis 1:3» → un versículo.
  if (!hayRango && n.length >= 2) {
    return { libro, desde: punto(n[0], n[1]), hasta: punto(n[0], n[1]) };
  }
  // «Genesis 1:1-5» → mismo capítulo, del versículo 1 al 5.
  if (hayRango && n.length === 3) {
    return { libro, desde: punto(n[0], n[1]), hasta: punto(n[0], n[2]) };
  }
  // «Genesis 1:1-6:8» → de capítulo a capítulo.
  if (hayRango && n.length >= 4) {
    return { libro, desde: punto(n[0], n[1]), hasta: punto(n[2], n[3]) };
  }
  // «Genesis 1-3» → de capítulo a capítulo, enteros.
  if (hayRango && n.length === 2) {
    return { libro, desde: punto(n[0], 0), hasta: punto(n[1], 999) };
  }
  return null;
}

/**
 * Las apariciones de un lema, desempaquetadas de la tabla.
 *
 * Devuelve la lista COMPLETA o la lista vacía. No hay término medio y no hay
 * parámetro para pedir menos: ese es el punto de todo el módulo.
 */
export function aparicionesDeLema(lema: string, tramo?: Tramo | null): Aparicion[] {
  const empaquetado = APARICIONES[lema];
  if (!empaquetado) return [];
  const salida: Aparicion[] = [];
  for (const trozo of empaquetado.split(" ")) {
    const [i, cap, vers] = trozo.split(".").map(Number);
    const libro = LIBROS_CONCORDANCIA[i];
    if (!libro || !Number.isFinite(cap) || !Number.isFinite(vers)) continue;
    const dentro =
      !!tramo &&
      tramo.libro === libro &&
      punto(cap, vers) >= tramo.desde &&
      punto(cap, vers) <= tramo.hasta;
    salida.push({ libro, capitulo: cap, versiculo: vers, ref: `${libro} ${cap}:${vers}`, aquí: dentro });
  }
  return salida;
}

/**
 * El rastro de UNA palabra hebrea suelta, tal como se escribe.
 *
 * Devuelve null cuando no hay rastro que dar, y hay cuatro maneras de no
 * haberlo, todas legítimas: la edición no conoce la forma, la lee de dos
 * maneras distintas (ahí no se adivina), no es palabra de contenido, o el lema
 * es demasiado frecuente para listarlo entero y entonces no se lista nada.
 */
export function rastroPalabra(palabra: string, refAbierta?: string | null): Rastro | null {
  const [forma] = tokenizaHebreo(palabra);
  if (!forma) return null;
  const l = lemaDeForma(forma.voc, forma.cons);
  if (!l || !POS_CONTENIDO.has(l.pos)) return null;
  const apariciones = aparicionesDeLema(l.lema, tramoDeRef(refAbierta));
  if (apariciones.length === 0) return null;
  return {
    forma: forma.voc || forma.cons,
    consonantes: forma.cons,
    lema: l.lema,
    total: apariciones.length,
    apariciones,
    nombrePropio: LEMAS_NOMBRE_PROPIO.has(l.lema),
  };
}

/**
 * Los rastros de las palabras del pasaje abierto, ya elegidos y ordenados.
 *
 * A QUÉ PALABRAS SE LES SIGUE EL RASTRO. No a todas: a las que de verdad
 * iluminan algo.
 *  · Tienen que ser de contenido y estar en la tabla, que ya solo guarda lemas
 *    poco frecuentes.
 *  · Tienen que aparecer en ALGÚN OTRO LUGAR fuera del pasaje abierto. Si sus
 *    únicas apariciones son las de aquí, no hay «en todo lugar donde se dice»
 *    que mostrar.
 *  · Se prefiere lo más raro: cuatro apariciones dicen más que veinte.
 *  · Y los nombres propios van al final. Rastrear un nombre es legítimo —el
 *    Midrash lo hace todo el tiempo— pero en un capítulo de genealogías
 *    taparían al sustantivo raro, que es lo que ilumina el concepto.
 *
 * @param texto  El hebreo del pasaje abierto, como lo da Sefaria.
 * @param ref    La referencia del pasaje abierto.
 * @param cuántas Cuántas PALABRAS rastrear (no cuántas apariciones de cada
 *                una: de cada una van todas, siempre).
 */
export function rastrosDelPasaje(
  texto: string,
  ref: string | undefined | null,
  cuántas = 3
): Rastro[] {
  const tramo = tramoDeRef(ref);
  const vistos = new Map<string, Rastro>();
  let orden = 0;
  const posición = new Map<string, number>();

  for (const { voc, cons } of tokenizaHebreo(texto)) {
    const l = lemaDeForma(voc, cons);
    if (!l || !POS_CONTENIDO.has(l.pos)) continue;
    if (vistos.has(l.lema)) continue;
    const apariciones = aparicionesDeLema(l.lema, tramo);
    if (apariciones.length === 0) continue;
    // Si todas sus apariciones están dentro del pasaje abierto, no hay otros
    // lugares que mostrar: la palabra no sale de aquí.
    if (apariciones.every((a) => a.aquí)) continue;
    vistos.set(l.lema, {
      forma: voc || cons,
      consonantes: cons,
      lema: l.lema,
      total: apariciones.length,
      apariciones,
      nombrePropio: LEMAS_NOMBRE_PROPIO.has(l.lema),
    });
    posición.set(l.lema, orden++);
  }

  return [...vistos.values()]
    .sort(
      (a, b) =>
        Number(a.nombrePropio) - Number(b.nombrePropio) ||
        a.total - b.total ||
        (posición.get(a.lema) ?? 0) - (posición.get(b.lema) ?? 0)
    )
    .slice(0, cuántas);
}

/** El libro, en español, para que el motor no escriba «Numbers 11». */
function enEspañol(libro: string): string {
  return BOOK_NAMES[libro]?.es ?? libro;
}

/**
 * El rastro, escrito para el prompt. El motor recibe las direcciones YA
 * BUSCADAS y tiene prohibido añadir, inventar o corregir una que no esté.
 *
 * Las apariciones van agrupadas por libro para que una lista de veinte se
 * pueda leer, pero van TODAS: si un rastro llegara incompleto —algo que no
 * debería poder pasar— se descarta entero antes que mostrarlo recortado.
 */
export function formateaRastros(rastros: Rastro[], refAbierta: string): string {
  const completos = rastros.filter((r) => r.apariciones.length === r.total);
  if (completos.length === 0) return "";

  const bloques = completos.map((r) => {
    const porLibro = new Map<string, string[]>();
    for (const a of r.apariciones) {
      const lista = porLibro.get(a.libro) ?? [];
      lista.push(`${a.capitulo}:${a.versiculo}${a.aquí ? " (es el pasaje abierto)" : ""}`);
      porLibro.set(a.libro, lista);
    }
    const líneas = [...porLibro.entries()]
      .map(([libro, vv]) => `    · ${enEspañol(libro)} ${vv.join(", ")}`)
      .join("\n");
    const propio = r.nombrePropio ? " (la edición lo etiqueta como nombre propio)" : "";
    return `- ${r.forma} — ${r.total} ${r.total === 1 ? "aparición" : "apariciones"} en todo el Tanaj, y están TODAS aquí${propio}:\n${líneas}`;
  });

  return `EN TODO LUGAR DONDE SE DICE (כָּל מָקוֹם שֶׁנֶּאֱמַר) — el rastro de estas
palabras de ${refAbierta} por el resto del Tanaj, buscado por el CÓDIGO sobre la
edición etiquetada del Códice de Leningrado. Son palabras POCO FRECUENTES: la
tabla solo guarda lemas de ${PISO_APARICIONES} a ${TOPE_APARICIONES} apariciones, porque de una palabra
frecuente no se puede dar la lista entera y una lista a medias no sirve.
El rastro va POR PALABRA y no por grafía: todas las formas del mismo lema
cuentan juntas, así que una aparición puede estar escrita con otro prefijo o en
otra conjugación.
LA LISTA DE CADA PALABRA ESTÁ COMPLETA. No es una muestra ni una selección:
son todas las veces que esa palabra aparece en el Tanaj.
${bloques.join("\n")}`;
}
