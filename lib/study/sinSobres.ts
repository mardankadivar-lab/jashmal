// El sobre no se publica.
//
// Los datos que el motor recibe van envueltos en etiquetas —<fuentes> para las
// fuentes de Sefaria, <palabras_repetidas> para la cuenta del código— y eso es
// el sobre, no la carta. Pero al pedirle una sección HECHA con esos datos, el
// modelo imitó el sobre: el estudio de Shemot 3 salió publicado empezando por
// «<palabras_repetidas>» y cerrando con «</palabras_repetidas>», delante del
// lector. La regla del prompt lo prohíbe ahora, pero una regla no es una
// garantía, así que además se filtra aquí.
//
// Por qué un filtro con memoria y no un simple replace: el texto llega en
// trocitos y una etiqueta se parte entre dos ('<palabras_' en uno,
// 'repetidas>' en el siguiente). Un replace por trozo no la vería. Este
// guarda el final del trozo mientras pueda ser el principio de una etiqueta, y
// lo suelta en cuanto deja de serlo.
//
// Y hay una razón para filtrar aquí y no en el navegador: las marcas de citas
// falsas viajan con la POSICIÓN exacta donde van, calculada sobre el texto que
// se envía. Si el cliente borrara caracteres por su cuenta, cada marca
// quedaría corrida. Lo que se envía y lo que se verifica tienen que ser el
// mismo texto, y por eso el filtro vive del lado del servidor.

/** Las etiquetas que envuelven datos en el prompt. Ninguna es del estudio. */
const SOBRES = [
  "<palabras_repetidas>",
  "</palabras_repetidas>",
  "<fuentes>",
  "</fuentes>",
];

const MAS_LARGO = Math.max(...SOBRES.map((s) => s.length));

/** ¿El final de `texto` puede ser el principio de una etiqueta todavía? */
function colaDudosa(texto: string): number {
  const desde = Math.max(0, texto.length - (MAS_LARGO - 1));
  for (let i = desde; i < texto.length; i++) {
    const cola = texto.slice(i);
    if (SOBRES.some((s) => s.startsWith(cola))) return texto.length - i;
  }
  return 0;
}

function quitaCompletas(texto: string): string {
  let salida = texto;
  for (const s of SOBRES) {
    while (salida.includes(s)) salida = salida.replace(s, "");
  }
  return salida;
}

export interface FiltroSobres {
  /** Pasa un trozo recién llegado y devuelve lo que se puede enviar ya. */
  trozo(texto: string): string;
  /** Al cerrar el stream: lo que quedaba guardado, ya limpio. */
  cierra(): string;
}

/**
 * Un filtro por stream. Se crea uno por estudio porque guarda estado.
 *
 * No toca nada más del texto: ni espacios, ni saltos, ni otras etiquetas. Si
 * el modelo no escribe ningún sobre —lo normal— lo que sale es byte a byte lo
 * que entró.
 */
export function filtroSobres(): FiltroSobres {
  let pendiente = "";
  return {
    trozo(texto: string): string {
      pendiente = quitaCompletas(pendiente + texto);
      const guardar = colaDudosa(pendiente);
      const salida = guardar > 0 ? pendiente.slice(0, pendiente.length - guardar) : pendiente;
      pendiente = guardar > 0 ? pendiente.slice(pendiente.length - guardar) : "";
      return salida;
    },
    cierra(): string {
      const salida = quitaCompletas(pendiente);
      pendiente = "";
      return salida;
    },
  };
}
