// ¿El motor diseccionó el midrash, o solo lo citó bonito?
//
// El prompt le pide seis líneas rotuladas ("Midrash al desnudo"). Un modelo
// abandonado a su inercia hace lo contrario: resume el midrash y lo cierra con
// una moraleja que podría escribirse sin él. Eso no es estudio, es decoración,
// y por fuera se parece bastante a lo bueno.
//
// Lo que SÍ se puede comprobar en código es la estructura, y la estructura
// protege lo demás: si está la línea "dónde no encaja" es que hubo un hueco o
// un desajuste que señalar; si la grieta trae la palabra hebrea es que se miró
// el versículo y no solo el midrash; si el bloque cierra en "lo que queda
// abierto" es que no terminó en moraleja. Lo que NO se puede comprobar —si el
// desajuste es real, si la lectura es buena— no se finge comprobar.
//
// Esto NO marca nada en la prosa: solo mide, para saber cuántas veces el motor
// cumple de verdad. Primero medir, y con datos decidir si hay que apretar.

/** Las seis líneas del bloque, en orden. `alt` admite la variante sin parábola. */
const LINEAS: { id: string; etiqueta: RegExp; alt?: RegExp }[] = [
  { id: "cabecera", etiqueta: /midrash al desnudo/i },
  { id: "grieta", etiqueta: /la grieta/i },
  { id: "cita", etiqueta: /lo que dice el midrash/i },
  {
    id: "emparejamiento",
    etiqueta: /la par[áa]bola y su aplicaci[óo]n/i,
    alt: /la escena y su giro/i,
  },
  { id: "desajuste", etiqueta: /d[óo]nde no encaja/i },
  { id: "contrafactual", etiqueta: /qu[ée] se pierde sin/i },
  { id: "abierto", etiqueta: /lo que queda abierto/i },
];

const HEBREO = /[א-ת]/;

export interface MidrashBlockReport {
  /** ¿Hay un bloque de disección en el estudio? */
  found: boolean;
  /** Cuántas de las líneas rotuladas aparecen. */
  lineas: number;
  /** Palabras del bloque (presupuesto: 180–300). */
  palabras: number;
  /** Lo que falta o se pasó de la raya. Vacío = el bloque cumple. */
  problemas: string[];
}

/**
 * Revisa el bloque de disección de un estudio. Síncrona, sin red y sin tablas:
 * no puede fallar ni hacer esperar a nadie. Si no hay bloque, lo dice y calla —
 * no todos los estudios traen un midrash que merezca disección.
 */
export function checkMidrashBlock(text: string): MidrashBlockReport {
  const inicio = text.search(/midrash al desnudo/i);
  if (inicio === -1) {
    return { found: false, lineas: 0, palabras: 0, problemas: [] };
  }

  // Dónde termina el bloque. Medido en producción: el motor no siempre pone un
  // título ni un separador detrás, así que cortar por el siguiente encabezado
  // se tragaba el párrafo de después y la cuenta de palabras salía un 50% más
  // alta de la real (394 contadas, 251 verdaderas). El bloque termina donde
  // termina su ÚLTIMA línea rotulada, que sí sabemos cuál es.
  const resto = text.slice(inicio);
  const titulo = resto.slice(1).search(/\n#{1,4}\s|\n\s*---\s*\n/);
  const porTitulo = titulo === -1 ? resto.slice(0, 2500) : resto.slice(0, titulo + 1);

  const ultima = LINEAS[LINEAS.length - 1].etiqueta.exec(porTitulo);
  let bloque = porTitulo;
  if (ultima) {
    // Hasta el final del párrafo donde vive la última etiqueta.
    const finParrafo = porTitulo.indexOf("\n\n", ultima.index);
    bloque = finParrafo === -1 ? porTitulo : porTitulo.slice(0, finParrafo);
  }

  const problemas: string[] = [];
  let lineas = 0;
  for (const l of LINEAS) {
    const hay = l.etiqueta.test(bloque) || (l.alt ? l.alt.test(bloque) : false);
    if (hay) lineas++;
    else problemas.push(`falta la línea «${l.id}»`);
  }

  // La grieta se enuncia sobre el versículo, y el versículo está en hebreo: sin
  // una palabra hebrea, el bloque habla del midrash sin haber mirado el texto.
  const grieta = /la grieta[.:]?\s*\*{0,2}([\s\S]{0,400})/i.exec(bloque);
  if (grieta && !HEBREO.test(grieta[1])) {
    problemas.push("la grieta no cita la palabra hebrea del versículo");
  }

  // El presupuesto del prompt son 180–260 palabras, techo duro 300. La cuenta
  // incluye los rótulos, que suman unas sesenta: el patrón del Sofer mide 290
  // y el primer bloque real del motor, 251. La alarma se pone en 360 — el
  // techo de 300 más los rótulos — para cazar al que se desmanda sin molestar
  // al que cumple.
  const palabras = bloque.trim().split(/\s+/).filter(Boolean).length;
  if (palabras > 360) problemas.push(`el bloque se pasa del techo: ${palabras} palabras`);
  if (palabras < 120) problemas.push(`el bloque se queda corto: ${palabras} palabras`);

  return { found: true, lineas, palabras, problemas };
}
