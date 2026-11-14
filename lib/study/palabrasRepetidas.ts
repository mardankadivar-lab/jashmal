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

export interface PalabraRepetida {
  /** La forma tal como se escribe, con sus vocales, como aparece más veces. */
  forma: string;
  /** Solo consonantes: es la clave con la que se cuenta. */
  consonantes: string;
  /** Cuántas veces aparece en el tramo, sumando las formas con prefijo. */
  veces: number;
  /** Las otras formas que se contaron con ella, p. ej. «וְהָאוֹר» dentro de «אוֹר». */
  variantes: string[];
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
const SEPARADORES = /[־–—-]/g;

/** Quita niqud, cantilación, puntuación masorética y marcas editoriales. */
function limpia(texto: string): string {
  return texto
    // Las etiquetas de Sefaria se borran SIN dejar espacio: son marcas dentro
    // de la palabra (la bet grande de בְּרֵאשִׁית, la ayin grande de שְׁמַע), y un
    // espacio en su lugar partiría la palabra en dos trozos de una letra que
    // el contador descarta. Medido: con espacio, el שְׁמַע de Devarim 6 se
    // perdía — la palabra que da nombre al pasaje.
    .replace(/<[^>]*>/g, "")
    .replace(/\{[^}]*\}/g, " ")          // notas entre llaves
    .replace(SEPARADORES, " ")           // maqaf y guiones: unen dos palabras
    .replace(/[֑-ׇ]/g, "")     // niqud, cantilación y puntuación
    .replace(/[^א-ת\s]/g, " ") // lo que no sea consonante hebrea
    .replace(/\s+/g, " ")
    .trim();
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
  const limpio = limpia(texto ?? "");
  const palabras = limpio ? limpio.split(" ").filter(Boolean) : [];
  if (palabras.length === 0) {
    return { total: 0, desde: 0, pasan: 0, palabras: [] };
  }

  // Primera pasada: contar formas consonánticas, sin partículas ni palabras
  // de una o dos letras (que son casi siempre preposiciones pegadas).
  const cuentas = new Map<string, number>();
  for (const p of palabras) {
    if (p.length < 3 || PARTICULAS.has(p)) continue;
    cuentas.set(p, (cuentas.get(p) ?? 0) + 1);
  }

  // Segunda pasada: juntar las formas con prefijo bajo su forma desnuda.
  const destino = agrupa(cuentas);
  const juntas = new Map<string, { veces: number; formas: Map<string, number> }>();
  for (const [forma, veces] of cuentas) {
    const base = destino.get(forma) ?? forma;
    if (PARTICULAS.has(base)) continue;
    const e = juntas.get(base) ?? { veces: 0, formas: new Map() };
    e.veces += veces;
    e.formas.set(forma, (e.formas.get(forma) ?? 0) + veces);
    juntas.set(base, e);
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

  // Para mostrar, se usa la forma CON vocales más frecuente en el texto real:
  // el lector no lee consonantes desnudas.
  // La forma que se le muestra al lector es LA QUE EL CAPÍTULO USA MÁS, no la
  // forma desnuda. Se probó al revés y era peor: en Bereshit 22 la base del
  // grupo es יאמר (porque וַיֹּאמֶר es ו + יאמר, y יֵאָמֵר aparece una vez en el
  // v. 14), así que mostrar la desnuda anunciaba «יֵאָמֵר, 14 veces» cuando lo
  // que el capítulo repite trece veces es וַיֹּאמֶר. El lector tiene que leer la
  // palabra que está en el texto.
  const conVocales = new Map<string, Map<string, { n: number; cons: string }>>();
  for (const bruto of texto.split(/[\s\u05BE\u2013\u2014-]+/)) {
    const cons = limpia(bruto);
    if (!cons) continue;
    const base = destino.get(cons) ?? cons;
    const m = conVocales.get(base) ?? new Map<string, { n: number; cons: string }>();
    // Se conservan letras, vocales y cantilación, pero NO la puntuación del
    // texto masorético: el sof pasuk (׃), el paseq (׀), el maqaf (־) y el nun
    // hafujá (׆) caen dentro del rango hebreo y, si no se quitan, el lector
    // ve «יְהֹוָֽה׃» con el punto final pegado como si fuera parte del nombre.
    const vocalizada = bruto
      .replace(/[^֑-ת]/g, "")
      .replace(/[־׀׃׆]/g, "");
    if (vocalizada) {
      const y = m.get(vocalizada);
      m.set(vocalizada, { n: (y?.n ?? 0) + 1, cons });
    }
    conVocales.set(base, m);
  }

  const resultado: PalabraRepetida[] = lista.slice(0, cuantas).map(([base, e]) => {
    const vistas = [...(conVocales.get(base) ?? new Map()).entries()].sort(
      (a, b) => b[1].n - a[1].n
    );
    const forma = vistas.length > 0 ? vistas[0][0] : base;
    const variantes = [...e.formas.entries()]
      .filter(([f]) => f !== base)
      .sort((a, b) => b[1] - a[1])
      .map(([f]) => f);
    return { forma, consonantes: base, veces: e.veces, variantes };
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
texto hebreo de Sefaria; ${c.total} palabras en total; umbral: ${c.desde} o más):
${filas}${recorte}`;
}
