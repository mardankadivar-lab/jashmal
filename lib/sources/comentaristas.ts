// Qué comentaristas le pide el motor a cada texto.
//
// Hasta ahora la lista era FIJA: «Rashi, Ramban, Ibn Ezra, Abarbanel, Malbim»,
// escrita dentro de la estructura del estudio, para cualquier pasaje de
// cualquier estantería. En el Tanaj es la lista correcta. En el Moré Nevujim
// es falsa: Rashi, el Ramban e Ibn Ezra NO comentan el Moré. Los que lo
// comentan son otros cinco, y están en Sefaria.
//
// Así que la lista pasa a depender de la CATEGORÍA y, dentro de filosofía, de
// la OBRA. Y hay un tercer caso que importa tanto como los otros dos: la obra
// que NO TIENE comentaristas en Sefaria. Ahí el motor tiene que SABERLO, para
// no rellenar el hueco con los nombres que le suenan.
//
// Todo lo de filosofía está verificado contra Sefaria el 16-nov-2026: cada
// obra citada abajo existe, su `dependence` es «Commentary», su texto base es
// la obra que decimos, y trae hebreo real. El guardián
// (`npm run filosofia:check`) lo vuelve a comprobar con red.

import { obraDeFilosofia } from "@/lib/sources/filosofiaRef";

export interface Comentaristas {
  /** Los nombres tal como el motor debe nombrarlos al lector. */
  nombres: string[];
  /**
   * Frase que entra en el prompt. Cuando no hay comentaristas NO queda vacía:
   * dice que no los hay, que es justo lo que evita que el motor los invente.
   */
  frase: string;
  /** Para los guardianes y los logs: de dónde salió la lista. */
  fuente: "tanaj" | "filosofia" | "filosofia-sin-comentaristas";
}

/**
 * Comentaristas por obra de filosofía, con su título exacto en Sefaria.
 *
 * Una obra que NO aparece aquí es una obra SIN comentaristas en Sefaria, y eso
 * es un dato, no un olvido: así lo dice `comentaristasDe`.
 *
 * Queda FUERA a propósito: «Notes by Rabbi Yehoshua Hartman on Netivot Olam».
 * Existe en Sefaria y es un comentario al Maharal, pero son notas editoriales
 * de un estudioso contemporáneo —no una voz clásica—, no se pudo leer ninguna
 * de sus secciones por un ref armado desde el catálogo, y presentarlas junto a
 * Efodi o Abarbanel las haría pasar por lo que no son.
 */
export const COMENTARISTAS_FILOSOFIA: Readonly<Record<string, readonly { nombre: string; sefaria: string }[]>> = {
  "Guide for the Perplexed": [
    { nombre: "Efodi (Yitzjak ben Moshé HaLeví, impr. Venecia 1551)", sefaria: "Efodi on Guide for the Perplexed" },
    { nombre: "Shem Tov (Shem Tov ibn Yosef ibn Shem Tov, comp. 1484–1492)", sefaria: "Shem Tov on Guide for the Perplexed" },
    { nombre: "Narboni (Moshé de Narbona, comp. 1354–1362)", sefaria: "Narboni on Guide for the Perplexed" },
    // AVISO CLAVADO (P-8 del método): el «Crescas» que COMENTA la Guía es
    // ASHER BEN AVRAHAM CRESCAS. NO es Jasdai Crescas (1340–1410/11), que es
    // el autor de Or Hashem (comp. 1399–1409) — una CRÍTICA a la Guía, no un
    // comentario. Son dos hombres distintos, los dos en Sefaria, uno
    // comentando y el otro refutando, y aquí estaba escrito el equivocado.
    { nombre: "Asher ben Avraham Crescas (comp. c. 1400–1440)", sefaria: "Crescas on Guide for the Perplexed" },
    { nombre: "Abarbanel (Yitzjak Abarbanel, comp. 1492–1508)", sefaria: "Abarbanel on Guide for the Perplexed" },
  ],
  "Duties of the Heart": [
    { nombre: "Pat Lejem (Jaim Avraham Katz, Shklov 1803)", sefaria: "Pat Lechem" },
    { nombre: "Tov haLevanón (Israel ben Moshé HaLeví de Zamość, Viena 1809)", sefaria: "Tov haLevanon" },
    { nombre: "Marpé laNéfesh (Refael ben Zejariá Mendel, 1774)", sefaria: "Marpeh la'Nefesh" },
  ],
};

/** La lista clásica del Tanaj, palabra por palabra como estaba en el motor. */
const FRASE_TANAJ =
  "Rashi, Ramban, Ibn Ezra, Abarbanel, Malbim";

/**
 * Los comentaristas que el motor debe pedir para esta referencia.
 *
 * Hoy distingue dos territorios: filosofía judía (por obra, verificado) y todo
 * lo demás (la lista clásica, que es la que había y la que es correcta en el
 * Tanaj). El mecanismo queda montado para que el día que haya que afinar el
 * Talmud o la Cabalá no haya que volver a abrir la estructura del estudio.
 */
export function comentaristasDe(ref: string | undefined | null): Comentaristas {
  const obra = obraDeFilosofia(ref);
  if (!obra) {
    return { nombres: FRASE_TANAJ.split(", "), frase: FRASE_TANAJ, fuente: "tanaj" };
  }

  const lista = COMENTARISTAS_FILOSOFIA[obra];
  if (!lista || lista.length === 0) {
    return {
      nombres: [],
      frase:
        "ESTA OBRA NO TIENE COMENTARISTAS en Sefaria. No es un olvido: no los " +
        "hay. Así que NO nombres ninguno — ni Rashi, ni el Ramban, ni Ibn Ezra, " +
        "que no comentan esta obra, ni un comentario que no puedas señalar. " +
        "Trabaja el argumento del autor con el propio texto, y si traes una voz " +
        "de fuera, di que viene de fuera y por qué la traes.",
      fuente: "filosofia-sin-comentaristas",
    };
  }

  const nombres = lista.map((c) => c.nombre);
  return {
    nombres,
    frase:
      `los comentaristas REALES de esta obra, que son los que Sefaria sirve, ` +
      `con su identidad completa y su fecha: ${nombres.join(" · ")}. ` +
      `PROHIBIDO traer a Rashi, al Ramban, a Ibn Ezra, a Sforno, al Malbim, a ` +
      `Rabenu Bajiá, al Kli Yakar o al Or HaJaim como comentaristas de esta ` +
      `obra: no la comentaron —no es que sea impreciso citarlos, es que NO ` +
      `EXISTE EL TEXTO. Si citas a uno de los de la lista, cítalo con el ` +
      `capítulo de la obra que comenta y CON SU NOMBRE COMPLETO (P-8: nunca ` +
      `«Crescas» a secas, porque Asher ben Avraham Crescas COMENTA la Guía y ` +
      `Jasdai Crescas la REFUTA en Or Hashem — son dos hombres distintos). Si ` +
      `no tienes su texto delante, dilo en vez de resumir lo que te suene.`,
    fuente: "filosofia",
  };
}
