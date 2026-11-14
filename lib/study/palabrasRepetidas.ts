// Las palabras que un capítulo repite, contadas por el código.
//
// La idea es de Mardan y es de método, no de adorno: antes de desarrollar el
// estudio conviene ver qué palabra insiste el capítulo, porque ahí se ve su
// enfoque. En Bereshit 1 el "y dijo Dios" y el "y vio que era bueno" no son
// decoración: son la forma del capítulo.
//
// Y esto lo cuenta el CÓDIGO, no el modelo. Un modelo que cuenta de memoria
// dice "aparece siete veces" porque suena bien; el número que el lector ve
// aquí sale de contar el texto hebreo de Sefaria, letra por letra. El motor
// recibe la cuenta ya hecha y le tiene prohibido cambiarla.
//
// Lo que NO hace, y conviene decirlo en voz alta: no lematiza. No sabe que
// וַיֹּאמֶר y אָמַר son la misma raíz. Agrupar por raíz exige un analizador
// morfológico que no tenemos, y un agrupamiento inventado sería peor que
// ninguno: diría "la raíz tal aparece 12 veces" sin poder probarlo. Lo que sí
// hace es juntar las formas que el propio capítulo demuestra que son la misma
// palabra con un prefijo delante (ver `agrupa`).


/**
 * Partículas, pronombres y preposiciones. Son las palabras más repetidas de
 * cualquier capítulo y no dicen nada de su enfoque: si no se apartan, la lista
 * entera sale siendo «et, asher, ki, al». NO entra aquí ningún sustantivo ni
 * verbo, por frecuente que sea: «decir», «hacer», «ver» o «hijo» son enfoque,
 * no ruido, y el lector tiene que verlos.
 */
const PARTICULAS = new Set([
  "את", "אתה", "אתו", "אתי", "אתם", "אתכם", "אותו", "אותה", "אותם",
  "אשר", "כי", "על", "אל", "לא", "כל", "הוא", "היא", "הם", "הן", "הנה",
  "אם", "מן", "זה", "זאת", "אלה", "אני", "אנחנו", "אנכי", "לו", "לה",
  "להם", "לי", "לך", "לכם", "עד", "גם", "או", "יש", "אין", "כן", "אך",
  "רק", "אז", "עם", "בו", "בה", "בם", "בי", "בך", "בכם", "מה", "מי",
  "ולא", "וכל", "ואת", "וגם", "ועד", "וזה", "ואם", "ואני", "והוא", "והיא",
  "אתכן", "להן", "ככל", "לכן", "אפוא", "נא", "הא", "של", "כמו", "אצל",
  "תחת", "בין", "אחר", "אחרי", "לפני", "מעל", "בלי", "זו", "ההוא", "ההיא",
]);

/**
 * Prefijos que el hebreo pega delante y que es seguro pelar: vav, he, bet,
 * kaf, lamed.
 *
 * Mem y shin quedan FUERA a propósito, y esto se midió sobre Bereshit 1: al
 * pelarlos, שָׁמַיִם (cielos) se contaba dentro de מַיִם (aguas) y מַיִם dentro
 * de יָם (mar). El resultado era un «cielos 20 veces» que mezclaba dos
 * palabras distintas del relato de la creación — justo el capítulo donde la
 * diferencia entre las aguas y los cielos ES el tema. La condición de que la
 * forma desnuda exista en el texto no basta cuando esa forma desnuda es otra
 * palabra de verdad, y eso pasa precisamente con mem y shin.
 */
const PREFIJOS = ["ו", "ה", "ב", "כ", "ל"];

import {
  LEMA_POR_VOCALIZADA,
  LEMA_POR_FORMA,
  FORMAS_AMBIGUAS,
  VOCALIZADAS_AMBIGUAS,
} from "@/lib/sources/morfologia.generated";

/**
 * Partes de la oración con contenido. Lo demás —partículas, preposiciones,
 * pronombres, conjunciones, sufijos— se aparta porque lo dice la gramática de
 * la edición etiquetada, no porque esté en una lista escrita a mano.
 */
const CONTENIDO = new Set(["N", "V", "A", "D"]);

/**
 * El lema de una forma, según la edición etiquetada, o null.
 *
 * Devuelve null para las formas que la propia edición lee de dos maneras
 * distintas: ahí no se sabe cuál es la de ESTE capítulo, así que no se agrupa.
 */
function lemaDe(voc: string, cons: string): { pos: string; lema: string } | null {
  // Primero con vocales, que es donde la edición distingue de verdad: וַיַּרְא
  // («vio») y וַיִּירָא («temió») comparten consonantes y no comparten lema.
  if (voc && !VOCALIZADAS_AMBIGUAS.has(voc)) {
    const e = LEMA_POR_VOCALIZADA[voc];
    if (e) return { pos: e.slice(0, 1), lema: e };
  }
  // Y si la vocalización de Sefaria no coincide letra por letra con la del
  // Códice de Leningrado, se prueba en consonantes — pero solo si la forma no
  // es de las que reciben dos lemas, porque ahí acertar sería casualidad.
  if (cons && !FORMAS_AMBIGUAS.has(cons)) {
    const e = LEMA_POR_FORMA[cons];
    if (e) return { pos: e.slice(0, 1), lema: e };
  }
  return null;
}

export interface PalabraRepetida {
  /** La forma tal como se escribe, con sus vocales, como aparece más veces. */
  forma: string;
  /** Solo consonantes: es la clave con la que se cuenta. */
  consonantes: string;
  /** Cuántas veces aparece en el tramo, sumando las formas con prefijo. */
  veces: number;
  /** Las otras formas que se contaron con ella, p. ej. «וְהָאוֹר» dentro de «אוֹר». */
  variantes: string[];
  /**
   * El lema que juntó el grupo, si vino de la edición etiquetada: una letra de
   * parte de la oración y el número de Strong (V559 = el verbo «decir»).
   * Ausente cuando el grupo se formó por la regla de prefijos, que es el
   * recurso para las formas que la tabla no tiene.
   */
  lema?: string;
}

export interface ConteoRepetidas {
  /** Cuántas palabras tiene el tramo en total. Da la escala de las cuentas. */
  total: number;
  /** El umbral que se aplicó: una palabra entra si aparece esas veces o más. */
  desde: number;
  /**
   * Cuántas palabras pasan el umbral EN TOTAL, aunque la lista solo traiga las
   * primeras. Importa para no argumentar desde la ausencia: en Bereshit 22 el
   * nombre de Itzjak se repite cuatro veces y se quedaba fuera de la lista por
   * el tope, y el motor concluyó —razonablemente y en falso— que «falta,
   * llamativamente, el nombre de Itzjak». Una lista recortada no prueba que
   * algo no esté, y el prompt tiene que saber que está recortada.
   */
  pasan: number;
  /** Las más repetidas, de mayor a menor. */
  palabras: PalabraRepetida[];
}

/**
 * Separador de palabras del texto masorético: el maqaf (־) une dos palabras
 * que se cuentan por separado («אֶת־יְהֹוָה» son dos), igual que un guion.
 *
 * EL ORDEN IMPORTA, y aquí hubo un fallo medido: `stripNiqud` borra todo el
 * rango 0591–05C7, y el maqaf vive dentro de ese rango. Si se quita el niqud
 * primero, el maqaf desaparece sin dejar espacio y las dos palabras quedan
 * pegadas en una sola: en Devarim 6 aparecía «אתיהוה» contado 5 veces como si
 * fuera una palabra del capítulo. Por eso el maqaf se convierte en espacio
 * ANTES de tocar el niqud.
 */
const SEPARADORES = /[\s\u05BE\u2013\u2014-]+/;

/** Marcas de cantilación y puntuación masorética: melodía, no palabra. */
const CANTILACION = /[\u0591-\u05AF\u05BD\u05C0\u05C3\u05C6]/g;

interface Palabra {
  /** Con vocales, sin cantilación: la clave fina para buscar el lema. */
  voc: string;
  /** Solo consonantes: con la que se cuenta y se agrupa para mostrar. */
  cons: string;
}

/**
 * Parte el texto en palabras y da de cada una sus dos formas.
 *
 * Las etiquetas de Sefaria se borran SIN dejar espacio: son marcas dentro de la
 * palabra (la bet grande de בְּרֵאשִׁית, la ayin grande de שְׁמַע) y un espacio en su
 * lugar la partiría en dos trozos de una letra. Medido: con espacio, el שְׁמַע de
 * Devarim 6 se perdía — la palabra que da nombre al pasaje.
 *
 * Y el maqaf (־) separa: «אֶת־יְהֹוָה» son dos palabras. Hay que quitarlo ANTES
 * que el niqud, porque vive en el mismo rango Unicode y, si se va con él, las
 * dos palabras quedan pegadas: así se contaba «אתיהוה» cinco veces en Devarim 6.
 */
function tokeniza(texto: string): Palabra[] {
  // Las etiquetas se borran SIN espacio. Todo lo demás que no sea hebreo —una
  // entidad HTML, un paréntesis, un número— se cambia POR espacio, porque
  // separa palabras: en el Shemá, «יְהֹוָה&thinsp;׀&thinsp;אֶחָד» no lleva ni un
  // espacio, y borrando la entidad sin dejar hueco el Nombre y «אֶחָד» quedaban
  // pegados en una sola palabra. También separan el paseq (׀) y el sof pasuk (׃).
  const bruto = (texto ?? "")
    .replace(/<[^>]*>/g, "")
    .replace(/\{[^}]*\}/g, " ")
    .replace(/[^\u0591-\u05EA\s]/g, " ")
    .replace(/[\u05C0\u05C3\u05C6]/g, " ");
  const salida: Palabra[] = [];
  for (const trozo of bruto.split(SEPARADORES)) {
    const voc = trozo
      .replace(CANTILACION, "")
      // El qamatz qatán se iguala al qamatz normal: Sefaria escribe כׇּל y el
      // Códice de Leningrado כָל, y sin igualarlos «todo» no se encuentra.
      .replace(/\u05C7/g, "\u05B8")
      .replace(/[^\u05B0-\u05EA]/g, "");
    const cons = voc.replace(/[\u0591-\u05C7]/g, "").replace(/[^\u05D0-\u05EA]/g, "");
    if (cons) salida.push({ voc, cons });
  }
  return salida;
}

/**
 * Junta las formas con prefijo con su forma desnuda, pero SOLO cuando el
 * propio tramo trae la desnuda. Es decir: «וְהָאוֹר» se cuenta dentro de
 * «אוֹר» únicamente si «אוֹר» aparece también por su cuenta en este capítulo.
 *
 * Esa condición es lo que lo hace honesto. Quitar prefijos a ciegas destroza
 * palabras —a בית le arranca la bet y deja ית, que no existe— y nos haría
 * contar fantasmas. Así, en cambio, no se inventa ninguna forma base: solo se
 * reconocen como la misma palabra dos formas que el texto ya puso delante del
 * lector, y la lista de variantes queda a la vista para que se pueda comprobar.
 */
function agrupa(cuentas: Map<string, number>): Map<string, string> {
  const destino = new Map<string, string>();
  for (const forma of cuentas.keys()) {
    let base = forma;
    // Se pelan prefijos de uno en uno mientras lo que queda esté en el texto.
    for (let vuelta = 0; vuelta < 2; vuelta++) {
      let cambió = false;
      for (const p of PREFIJOS) {
        if (!base.startsWith(p) || base.length < 4) continue;
        const resto = base.slice(1);
        if (resto.length >= 3 && cuentas.has(resto) && resto !== base) {
          base = resto;
          cambió = true;
          break;
        }
      }
      if (!cambió) break;
    }
    destino.set(forma, base);
  }
  return destino;
}

/**
 * Cuenta las palabras que el tramo repite.
 *
 * @param texto   El hebreo del capítulo o de la parashá, como lo da Sefaria.
 * @param cuantas Cuántas palabras devolver como máximo (7 por defecto).
 */
export function palabrasRepetidas(texto: string, cuantas = 10): ConteoRepetidas {
  const palabras = tokeniza(texto);
  if (palabras.length === 0) {
    return { total: 0, desde: 0, pasan: 0, palabras: [] };
  }

  // PRIMERA PASADA — a cada palabra, su grupo.
  //
  // Quién entra y quién no lo decide la edición etiquetada cuando conoce la
  // forma: aparta partículas, preposiciones, pronombres, conjunciones y
  // sufijos por su gramática, no por una lista. Y una palabra de contenido de
  // dos letras (אָב, «padre») entra si la tabla dice que es un nombre; con el
  // filtro de longitud a secas se perdía.
  //
  // El grupo se decide POR PALABRA y no por grafía, que es lo que evita el
  // choque de las homógrafas: en un mismo capítulo, וַיַּרְא («vio») y וַיִּירָא
  // («temió») comparten consonantes y van a grupos distintos porque sus
  // vocales llevan a lemas distintos.
  const asignadas: { clave: string; cons: string; voc: string }[] = [];
  const pendientes: { cons: string; voc: string }[] = [];
  for (const { voc, cons } of palabras) {
    const l = lemaDe(voc, cons);
    if (l) {
      if (CONTENIDO.has(l.pos)) asignadas.push({ clave: `L:${l.lema}`, cons, voc });
      continue;
    }
    // Sin lema en la tabla: aquí sí hacen falta la lista de partículas escrita
    // a mano y el filtro de longitud, que es lo único que se tiene.
    if (cons.length < 3 || PARTICULAS.has(cons)) continue;
    pendientes.push({ cons, voc });
  }

  // SEGUNDA PASADA — las que se quedaron sin lema.
  //
  // Antes de la regla de prefijos hay un puente, y hace falta: la forma desnuda
  // de una palabra es a veces la ambigua y las que llevan prefijo no. אוֹר es a
  // la vez el nombre «luz» y el verbo «iluminar», así que la edición le da dos
  // lemas y no se puede decidir; pero הָאוֹר y לָאוֹר solo pueden ser el nombre, y
  // en Bereshit 1 están las tres. Sin puente, la luz se partía en dos grupos
  // —tres veces con artículo y dos sin él— cuando el capítulo la repite cinco.
  // Así que si una forma hermana (la misma con o sin prefijo) ya tiene grupo
  // por lema en ESTE tramo, la ambigua se va con ella. Es una inferencia, no un
  // dato, y por eso solo se usa donde la tabla no puede decidir y queda a la
  // vista en la lista de variantes.
  const grupoPorCons = new Map<string, string>();
  for (const a of asignadas) if (!grupoPorCons.has(a.cons)) grupoPorCons.set(a.cons, a.clave);

  const huérfanas: { cons: string; voc: string }[] = [];
  for (const p of pendientes) {
    let clave = grupoPorCons.get(p.cons);
    if (!clave) {
      for (const pre of PREFIJOS) {
        const hermana = grupoPorCons.get(pre + p.cons);
        if (hermana) {
          clave = hermana;
          break;
        }
      }
    }
    if (!clave && p.cons.length > 3 && PREFIJOS.includes(p.cons[0])) {
      clave = grupoPorCons.get(p.cons.slice(1));
    }
    if (clave) asignadas.push({ clave, cons: p.cons, voc: p.voc });
    else huérfanas.push(p);
  }

  // Y lo que sigue sin grupo se agrupa por la regla de prefijos, que no inventa
  // nada: solo junta dos formas que este mismo tramo trae, una desnuda y otra
  // con prefijo.
  const cuentasPend = new Map<string, number>();
  for (const p of huérfanas) cuentasPend.set(p.cons, (cuentasPend.get(p.cons) ?? 0) + 1);
  const base = agrupa(cuentasPend);
  for (const p of huérfanas) {
    const clave = base.get(p.cons) ?? p.cons;
    if (PARTICULAS.has(clave)) continue;
    asignadas.push({ clave, cons: p.cons, voc: p.voc });
  }

  // TERCERA PASADA — juntar cada grupo con sus formas.
  const juntas = new Map<
    string,
    { veces: number; formas: Map<string, number>; vocs: Map<string, number> }
  >();
  for (const { clave, cons, voc } of asignadas) {
    const e = juntas.get(clave) ?? {
      veces: 0,
      formas: new Map<string, number>(),
      vocs: new Map<string, number>(),
    };
    e.veces += 1;
    e.formas.set(cons, (e.formas.get(cons) ?? 0) + 1);
    if (voc) e.vocs.set(voc, (e.vocs.get(voc) ?? 0) + 1);
    juntas.set(clave, e);
  }

  // El umbral se ajusta al tramo: en un capítulo largo una palabra que sale
  // tres veces no dice nada; en un salmo de seis versículos, sí. Se pide 3 y
  // se baja a 2 solo si con 3 no habría casi nada que mostrar.
  const candidatas = (desde: number) =>
    [...juntas.entries()]
      .filter(([, e]) => e.veces >= desde)
      .sort((a, b) => b[1].veces - a[1].veces || a[0].localeCompare(b[0]));

  let desde = 3;
  let lista = candidatas(desde);
  if (lista.length < 3) {
    desde = 2;
    lista = candidatas(desde);
  }

  // La forma que se le muestra al lector es LA QUE EL CAPÍTULO USA MÁS, no la
  // forma de diccionario. Se probó al revés y era peor: anunciar «יֵאָמֵר, 14
  // veces» cuando lo que Bereshit 22 repite trece veces es וַיֹּאמֶר. El lector
  // tiene que leer la palabra que está en el texto, y el grupo se explica con
  // sus variantes al lado.
  const resultado: PalabraRepetida[] = lista.slice(0, cuantas).map(([clave, e]) => {
    const vistas = [...e.vocs.entries()].sort((a, b) => b[1] - a[1]);
    const formasOrdenadas = [...e.formas.entries()].sort((a, b) => b[1] - a[1]);
    const consonantes = formasOrdenadas[0]?.[0] ?? clave;
    return {
      forma: vistas.length > 0 ? vistas[0][0] : consonantes,
      consonantes,
      veces: e.veces,
      variantes: formasOrdenadas.slice(1).map(([f]) => f),
      lema: clave.startsWith("L:") ? clave.slice(2) : undefined,
    };
  });

  return { total: palabras.length, desde, pasan: lista.length, palabras: resultado };
}

/**
 * La cuenta, escrita para el prompt. El motor recibe los números YA HECHOS y
 * tiene prohibido cambiarlos: lo suyo es decir qué significan, no contar.
 */
export function formateaRepetidas(c: ConteoRepetidas, refTramo: string): string {
  if (c.palabras.length === 0) return "";
  const filas = c.palabras
    .map((p) => {
      const v = p.variantes.length > 0 ? ` (contando ${p.variantes.join(", ")})` : "";
      return `- ${p.forma} — ${p.veces} veces${v}`;
    })
    .join("\n");
  const recorte =
    c.pasan > c.palabras.length
      ? `\nESTA LISTA ESTÁ RECORTADA: son las ${c.palabras.length} más repetidas de
${c.pasan} palabras que pasan el umbral. Hay más palabras que se repiten y no
están aquí, así que NO concluyas que una palabra falta o no se repite porque no
la veas en la lista.`
      : "";
  return `PALABRAS QUE SE REPITEN EN ${refTramo} (contadas por el código sobre el
texto hebreo de Sefaria; ${c.total} palabras en total; umbral: ${c.desde} o más).
La cuenta es POR PALABRA, no por grafía: las formas de una misma palabra se
suman, y las que se sumaron van entre paréntesis. La forma que encabeza cada
línea es la que el tramo usa más veces:
${filas}${recorte}`;
}
