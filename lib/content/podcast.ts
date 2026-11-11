/**
 * ─────────────────────────────────────────────────────────────────────────
 *  PODCAST — catálogo de episodios
 * ─────────────────────────────────────────────────────────────────────────
 *  Los audios se auto-hospedan en public/audio/podcast/ (mp3 comprimido)
 *  porque Spotify NO funciona en Irán y la audiencia farsi es clave:
 *  el reproductor nativo del sitio funciona para todos.
 *
 *  Cada episodio lleva además el link al show de Spotify correspondiente
 *  como opción secundaria ("Escuchar en Spotify").
 *
 *  AUDIO AUTO-HOSPEDADO: SOLO LOS PRIMEROS. Los 10 mp3 de julio están en el
 *  repo (122 MB ya versionados). Los 19 episodios nuevos NO: sumarían ~290 MB
 *  más al repo y al despliegue. Mientras no haya almacenamiento aparte (Vercel
 *  Blob / R2), esos episodios se oyen en Spotify y SE LEEN aquí —que es lo que
 *  de verdad faltaba—. Por eso `audioSrc` es opcional: cuando falta, la ficha
 *  no muestra reproductor, solo el botón de Spotify. Decisión pendiente de
 *  Mardan: pagar almacenamiento y auto-hospedar todo, o seguir así.
 *
 *  El locale del episodio decide en qué versión del sitio se muestra:
 *  /es/podcast → episodios "es" · /fa/podcast → episodios "fa".
 *  /en/podcast muestra los "es" con un aviso en inglés.
 *
 *  Los episodios se agrupan por OBRA (`serie`), no por tema: un episodio
 *  pertenece a un solo libro, mientras que un tema lo cruzaría en varios.
 *  Para sumar una obra nueva: una entrada en PODCAST_SERIES + `serie` en sus
 *  episodios. La agrupación de la página se acomoda sola.
 *
 *  NUMERACIÓN — leer antes de tocar nada:
 *  `episode` es el número del APUNTE de Shamatí (o del capítulo del Tanya),
 *  no el número de episodio del show. Siempre lo fue: es-shamati-01…05 son
 *  los apuntes 1 a 5, y la producción nueva sigue por el 18. Por eso el hueco
 *  del 6 al 17 era real, no un choque de numeración: esos apuntes se grabaron
 *  (están en Spotify) pero nunca se escribió su estudio. Se usan decimales
 *  para ordenar las partes de un apunte largo (33.1, 33.2, 33.3) y `etiqueta`
 *  para lo que de verdad ve el lector.
 * ─────────────────────────────────────────────────────────────────────────
 */

import { PODCAST_ESTUDIOS_DATA } from "./podcast-estudios.generated";

export type PodcastLocale = "es" | "fa";

/** Una obra estudiada en el podcast (Shamatí, Likutei Moharan, …). */
export type PodcastSeries = {
  slug: string;
  /** Nombre hebreo de la obra — encabeza su grupo. */
  he: string;
  /** Rótulo en cada idioma. Español primero: la audiencia no lee hebreo. */
  title: Record<PodcastLocale, string>;
  /** Una línea que sitúa la obra para quien nunca la ha oído nombrar. */
  blurb: Record<PodcastLocale, string>;
};

export type PodcastEpisode = {
  /** Identificador estable (también nombre del archivo mp3 y del estudio). */
  slug: string;
  /** Idioma del episodio: decide en qué versión del sitio aparece. */
  locale: PodcastLocale;
  /** Obra a la que pertenece → `slug` de PODCAST_SERIES. */
  serie: string;
  /**
   * Solo para paridad con Spotify, que no entiende de obras: una temporada por
   * obra (Shamatí = 1, Tanya = 2). En el sitio no se muestra — ahí manda `serie`.
   */
  season: number;
  /** Nº del apunte/capítulo. Ordena la lista. Decimal en apuntes partidos. */
  episode: number;
  /**
   * Lo que ve el lector cuando el número solo no alcanza: un apunte doble
   * ("23 y 24") o una parte ("33 · 1 de 3"). Si falta, se muestra `episode`.
   */
  etiqueta?: string;
  title: string;
  /** Rótulo latino de apoyo (los episodios farsi lo usan bajo el título). */
  subtitle?: string;
  description: string;
  /** Duración real del mp3, medida con ffprobe. Ver `duracionProvisional`. */
  durationSec: number;
  /**
   * true = la duración NO se midió sobre el mp3 (no lo tenemos en disco): se
   * tomó de la ficha publicada en Spotify. No es una medición nuestra.
   */
  duracionProvisional?: boolean;
  /** Ruta pública del mp3 auto-hospedado. Ausente = solo Spotify. */
  audioSrc?: string;
  /** Show completo en Spotify (no el episodio suelto). */
  spotifyShowUrl: string;
  /**
   * Episodio suelto en Spotify (forma canónica, sin `?si=`). Cuando existe, el
   * botón "Escuchar en Spotify" lleva directo a este episodio; si no, cae al show.
   */
  spotifyEpisodeUrl?: string;
};

const SPOTIFY_SHOW_ES = "https://open.spotify.com/show/033QcCauKm3tHaRO6QsmqJ";
const SPOTIFY_SHOW_FA = "https://open.spotify.com/show/6hXNwt8vOdFpWB0iPuu1J9";

/** Atajo: los episodios sueltos de Spotify se guardan solo por su id. */
const ep = (id: string) => `https://open.spotify.com/episode/${id}`;

/**
 * Las obras, en el orden en que se muestran.
 * Nota de producción: en el sitio agrupamos por obra; en Spotify, que solo
 * entiende temporadas, cada obra es una temporada (Shamatí = T1).
 */
export const PODCAST_SERIES: PodcastSeries[] = [
  {
    slug: "shamati",
    he: "שָׁמַעְתִּי",
    title: {
      es: "Shamatí — Baal HaSulam",
      fa: "شمعتی — بعل هسولام",
    },
    blurb: {
      es: "«Escuché». Las enseñanzas que Rav Yehuda Ashlag, Baal HaSulam, transmitió de viva voz.",
      fa: "«شنیدم». آموزه‌هایی که راو یهودا اشلگ، بعل هسولام، سینه‌به‌سینه منتقل کرد.",
    },
  },
  {
    slug: "tanya",
    // El libro se conoce por su primera palabra: תַּנְיָא, "se enseñó"
    // (Tanya, Likutei Amarim I:1, que abre citando Nidá 30b).
    he: "תַּנְיָא",
    title: {
      es: "Tanya — Rabí Shneur Zalman de Liadi",
      fa: "تانیا — راو شنئور زلمن از لیادی",
    },
    blurb: {
      es: "«Se enseñó». El libro que abre con esa palabra —y de ella toma su nombre— es la obra fundacional del jasidismo de Jabad.",
      fa: "«چنین آموخته‌اند». کتابی که با همین واژه آغاز می‌شود و نامش را از آن گرفته است: اثر بنیادین حسیدیسم چابد.",
    },
  },
];

export const PODCAST_EPISODES: PodcastEpisode[] = [
  // ── Español — "Jashmal en Español" ──────────────────────────────────────
  //
  // Apuntes 1 a 5 y Tanya 1-2: los primeros, de julio. Son los únicos con el
  // mp3 auto-hospedado en el repo, y los únicos hechos como "conversación con
  // IA" (NotebookLM) en vez de monólogo con guion verificado.
  {
    slug: "es-shamati-01",
    locale: "es",
    serie: "shamati",
    season: 1,
    episode: 1,
    title: "Solo existe una fuerza detrás de todo — Shamatí, Baal HaSulam",
    description:
      "¿Y si detrás de todo lo que te pasa — lo dulce y lo amargo — actuara una sola fuerza? Conversamos sobre una de las enseñanzas fundacionales de Shamatí («Escuché»), del cabalista Rav Yehuda Ashlag, Baal HaSulam: «Ein Od Milvadó» — no hay nadie más aparte de Él. Conversación generada con IA a partir del texto original.",
    durationSec: 1052,
    audioSrc: "/audio/podcast/es-shamati-01.mp3",
    spotifyShowUrl: SPOTIFY_SHOW_ES,
    spotifyEpisodeUrl: ep("5JyOpJpzmAXApVVjZYBcre"),
  },
  {
    slug: "es-shamati-02",
    locale: "es",
    serie: "shamati",
    season: 1,
    episode: 2,
    title:
      "Tus obstáculos son herramientas para tu evolución — Shamatí, Baal HaSulam",
    description:
      "Las caídas, las distracciones y los ocultamientos no son castigos ni accidentes: son la herramienta con la que se construye tu vasija. Cada descenso prepara un ascenso mayor. Conversación generada con IA a partir del texto original.",
    durationSec: 911,
    audioSrc: "/audio/podcast/es-shamati-02.mp3",
    spotifyShowUrl: SPOTIFY_SHOW_ES,
    spotifyEpisodeUrl: ep("1UdvsLVjkEY9X2VEvfIGQq"),
  },
  {
    slug: "es-shamati-03",
    locale: "es",
    serie: "shamati",
    season: 1,
    episode: 3,
    title: "La mecánica interna del logro espiritual — Shamatí, Baal HaSulam",
    description:
      "¿Puedes describir un sabor que nunca has probado? Conversamos sobre la tercera enseñanza de Shamatí («Escuché»), del cabalista Rav Yehuda Ashlag, Baal HaSulam: «lo que no alcanzamos, no lo conocemos por nombre». De la Esencia divina no hablamos jamás; solo conocemos la luz que llega a nosotros y la forma en que la recibimos. Espiritualidad no es especular: es alcanzar, vivir, saborear. Conversación generada con IA a partir del texto original.",
    durationSec: 1500,
    audioSrc: "/audio/podcast/es-shamati-03.mp3",
    spotifyShowUrl: SPOTIFY_SHOW_ES,
    spotifyEpisodeUrl: ep("4ZjYy4V0U8RUxwya28NyVB"),
  },
  {
    slug: "es-shamati-04",
    locale: "es",
    serie: "shamati",
    season: 1,
    episode: 4,
    title: "Por qué nos pesa dejar el ego — Shamatí, Baal HaSulam",
    description:
      "¿Por qué cuesta tanto soltar el ego? Conversamos sobre la cuarta enseñanza de Shamatí («Escuché»), del cabalista Rav Yehuda Ashlag, Baal HaSulam: la pesadez que sentimos al anularnos ante el Creador tiene una sola causa — no sentir Su presencia. Cuando el alma percibe la existencia del Creador, se anula sola, con gozo, «como una vela ante una antorcha». Conversación generada con IA a partir del texto original.",
    durationSec: 1218,
    audioSrc: "/audio/podcast/es-shamati-04.mp3",
    spotifyShowUrl: SPOTIFY_SHOW_ES,
    spotifyEpisodeUrl: ep("6A2BaPja51xsEszFRREnjA"),
  },
  {
    slug: "es-shamati-05",
    locale: "es",
    serie: "shamati",
    season: 1,
    episode: 5,
    title: "La paradoja del esfuerzo humano — Shamatí, Baal HaSulam",
    description:
      "Conversación sobre la quinta enseñanza de Shamatí («Escuché»), del cabalista Rav Yehuda Ashlag, Baal HaSulam. Conversación generada con IA a partir del texto original.",
    durationSec: 1086,
    audioSrc: "/audio/podcast/es-shamati-05.mp3",
    spotifyShowUrl: SPOTIFY_SHOW_ES,
    // Estaba cruzado con el de es-tanya-02: este episodio dura 18:06 y el de
    // Spotify que apuntaba (36HRJ…) dura 19:33 y se titula "La anatomia
    // espiritual de tus dos almas", que es el Tanya 2. Corregido.
    spotifyEpisodeUrl: ep("3AJHKcKELCK9v19YCrym2L"),
  },

  // ── Apuntes 6 a 17 — GRABADOS, SIN ESTUDIO ESCRITO ─────────────────────
  //  Se publicaron en Spotify entre el 26 de julio y el 27 de agosto de 2026,
  //  antes de que existiera el método de guion verificado por el Sofer. No hay
  //  guion ni artículo crudo de ninguno en /Users/mardan/jashmal-produccion:
  //  solo el audio ya publicado. Se registran para que la serie no tenga
  //  huecos, con su enlace directo a Spotify, y SIN página de estudio: el
  //  estudio lo tiene que escribir el Sofer.
  //  Las duraciones vienen de la ficha de Spotify (no medidas por nosotros).
  {
    slug: "es-shamati-06",
    locale: "es",
    serie: "shamati",
    season: 1,
    episode: 6,
    title: "La sabiduría se siente en el cuerpo — Shamatí, Baal HaSulam",
    description:
      "En este sexto capítulo de Shamatí, Baal HaSulam explica qué significa encontrar «apoyo en la Torá» durante el trabajo espiritual.",
    durationSec: 888,
    duracionProvisional: true,
    spotifyShowUrl: SPOTIFY_SHOW_ES,
    spotifyEpisodeUrl: ep("4d7WMj7a7namg0HwIcbZju"),
  },
  {
    slug: "es-shamati-07",
    locale: "es",
    serie: "shamati",
    season: 1,
    episode: 7,
    title:
      "El hábito se convierte en una segunda naturaleza — Shamatí, Baal HaSulam",
    description:
      "En este séptimo capítulo de Shamatí, exploramos el principio espiritual de que el hábito se convierte en una segunda naturaleza.",
    durationSec: 1540,
    duracionProvisional: true,
    spotifyShowUrl: SPOTIFY_SHOW_ES,
    spotifyEpisodeUrl: ep("0D6Np3tCYEnaurwQ7YYjWE"),
  },
  {
    // ANOMALÍA DE NUMERACIÓN — decisión del Sofer, no mía.
    // Su descripción publicada empieza con "Capítulo 10", pero el apunte 10 ya
    // lo cubre es-shamati-10 ("Tu deseo de rendirte es progreso genuino"), y
    // este se publicó el 2 de agosto, entre el 7 y el 8. Dos episodios no
    // pueden ser el apunte 10. Hasta que el Sofer diga de qué apunte es, va
    // ordenado por su fecha (7.5) y SIN número a la vista.
    slug: "es-shamati-apresurate",
    locale: "es",
    serie: "shamati",
    season: 1,
    episode: 7.5,
    etiqueta: "apunte por confirmar",
    title: "Por qué la santidad huye de ti — Shamatí, Baal HaSulam",
    description:
      "¿Qué ocurre cuando, después de haber avanzado espiritualmente, desaparecen de pronto el deseo, la inspiración y la fuerza para continuar? Baal HaSulam explica que el camino está hecho de ascensos y descensos.",
    durationSec: 1710,
    duracionProvisional: true,
    spotifyShowUrl: SPOTIFY_SHOW_ES,
    spotifyEpisodeUrl: ep("5BLCc9afRSJl3tMkDqKgFl"),
  },
  {
    slug: "es-shamati-08",
    locale: "es",
    serie: "shamati",
    season: 1,
    episode: 8,
    title: "Sombra de santidad o del ego — Shamatí, Baal HaSulam",
    description:
      "En el capítulo 8 de Shamatí, Baal HaSulam nos conduce hacia una distinción profunda: no toda oscuridad espiritual tiene el mismo origen.",
    durationSec: 1742,
    duracionProvisional: true,
    spotifyShowUrl: SPOTIFY_SHOW_ES,
    spotifyEpisodeUrl: ep("5oRBSgou7Ndt5wdnCHXMGJ"),
  },
  {
    slug: "es-shamati-09",
    locale: "es",
    serie: "shamati",
    season: 1,
    episode: 9,
    title: "Envidia y lujuria para ampliar la mente — Shamatí, Baal HaSulam",
    description:
      "En el capítulo 9 de Shamatí, Baal HaSulam revela una idea sorprendente: incluso la envidia, la lujuria y el honor —fuerzas que normalmente asociamos con el ego— pueden convertirse en instrumentos para ampliar la mente durante el trabajo espiritual.",
    durationSec: 1813,
    duracionProvisional: true,
    spotifyShowUrl: SPOTIFY_SHOW_ES,
    spotifyEpisodeUrl: ep("7wMrdYTmpVC7NMkWLzmKIJ"),
  },
  {
    slug: "es-shamati-10",
    locale: "es",
    serie: "shamati",
    season: 1,
    episode: 10,
    title: "Tu deseo de rendirte es progreso genuino — Shamatí, Baal HaSulam",
    description:
      "En el capítulo 10 de Shamatí, Baal HaSulam ilumina uno de los momentos más difíciles del trabajo espiritual: cuando la persona siente que ha perdido las fuerzas y desea rendirse.",
    durationSec: 1394,
    duracionProvisional: true,
    spotifyShowUrl: SPOTIFY_SHOW_ES,
    spotifyEpisodeUrl: ep("08rclIo6cwyUXuE8rZpkzO"),
  },
  {
    slug: "es-shamati-11",
    locale: "es",
    serie: "shamati",
    season: 1,
    episode: 11,
    title: "Sin temor el amor es una prisión — Shamatí, Baal HaSulam",
    description:
      "En el capítulo 11 de Shamatí, Baal HaSulam explica el significado profundo de «regocijaos con estremecimiento»: la unión indispensable entre el amor y el temor en el trabajo espiritual.",
    durationSec: 1045,
    duracionProvisional: true,
    spotifyShowUrl: SPOTIFY_SHOW_ES,
    spotifyEpisodeUrl: ep("3f2REm0U4gzg87qJ2wbb7Q"),
  },
  {
    slug: "es-shamati-12",
    locale: "es",
    serie: "shamati",
    season: 1,
    episode: 12,
    title: "El gusto de otorgar sin recibir nada — Shamatí, Baal HaSulam",
    description:
      "En el capítulo 12 de Shamatí, Baal HaSulam nos conduce al corazón del trabajo espiritual: aprender a otorgar sin esperar recibir nada a cambio.",
    durationSec: 1237,
    duracionProvisional: true,
    spotifyShowUrl: SPOTIFY_SHOW_ES,
    spotifyEpisodeUrl: ep("6tpApE6ggIATrJ5yw4daWo"),
  },
  {
    slug: "es-shamati-13",
    locale: "es",
    serie: "shamati",
    season: 1,
    episode: 13,
    title: "La granada y la verdadera grandeza — Shamatí, Baal HaSulam",
    description:
      "En el capítulo 13 de Shamatí, Baal HaSulam utiliza la imagen de la granada para revelar el significado de la verdadera grandeza en el trabajo espiritual.",
    durationSec: 753,
    duracionProvisional: true,
    spotifyShowUrl: SPOTIFY_SHOW_ES,
    spotifyEpisodeUrl: ep("7DUfraX0T9UXr4fe5fnWC4"),
  },
  {
    slug: "es-shamati-14",
    locale: "es",
    serie: "shamati",
    season: 1,
    episode: 14,
    title: "El intelecto es el mercenario del ego — Shamatí, Baal HaSulam",
    description:
      "En el capítulo 14 de Shamatí, Baal HaSulam revela una verdad incómoda: el intelecto no siempre dirige nuestros deseos; muchas veces trabaja para ellos.",
    durationSec: 1508,
    duracionProvisional: true,
    spotifyShowUrl: SPOTIFY_SHOW_ES,
    spotifyEpisodeUrl: ep("2nEMgqZ84jKbQJGcOjNBhw"),
  },
  {
    slug: "es-shamati-15",
    locale: "es",
    serie: "shamati",
    season: 1,
    episode: 15,
    title: "Tu mente te sabotea por diseño — Shamatí, Baal HaSulam",
    description:
      "¿Qué significa «otros dioses» en el trabajo espiritual? En este capítulo de Shamatí, Baal HaSulam explica que los «otros dioses» no son únicamente ídolos externos.",
    durationSec: 1765,
    duracionProvisional: true,
    spotifyShowUrl: SPOTIFY_SHOW_ES,
    spotifyEpisodeUrl: ep("6MxO6vDKVRLzY8gHG0EtYN"),
  },
  {
    slug: "es-shamati-16",
    locale: "es",
    serie: "shamati",
    season: 1,
    episode: 16,
    title: "Por qué la Luz puede destruirte — Shamatí, Baal HaSulam",
    description:
      "¿Qué significan «el día del Señor» y «la noche del Señor» en el trabajo espiritual? En este capítulo de Shamatí, Baal HaSulam nos invita a reconsiderar qué llamamos luz y qué llamamos oscuridad.",
    durationSec: 1566,
    duracionProvisional: true,
    spotifyShowUrl: SPOTIFY_SHOW_ES,
    spotifyEpisodeUrl: ep("17imcYWMsGm7GwwBhrrMJJ"),
  },
  {
    slug: "es-shamati-17",
    locale: "es",
    serie: "shamati",
    season: 1,
    episode: 17,
    title: "Por qué razonar nos quita la corona — Shamatí, Baal HaSulam",
    description:
      "En el capítulo 17 de Shamatí, Baal HaSulam explica por qué la Sitra Ajra es llamada «Maljut sin corona».",
    durationSec: 1594,
    duracionProvisional: true,
    spotifyShowUrl: SPOTIFY_SHOW_ES,
    spotifyEpisodeUrl: ep("0TAUbiQAz5kePKvAufNhW6"),
  },

  // ── Apuntes 18 en adelante — producción con guion verificado ────────────
  //  Monólogo (voz Martin) a partir de un guion que el Sofer coteja fuente por
  //  fuente. El guion ES el estudio: de ahí sale content/podcast/<slug>.md.
  {
    slug: "es-shamati-18",
    locale: "es",
    serie: "shamati",
    season: 1,
    episode: 18,
    title:
      "La puerta que solo existe cuando todas las demás se cierran — Shamatí, Baal HaSulam",
    description:
      "Hay un estado que no es tragedia: es sequedad. Rezas y es una lista. Estudias y son letras. Sabes lo que deberías sentir, y no sientes nada.",
    // Medido con ffprobe sobre shamati-18/es-shamati-18.mp3.
    durationSec: 964,
    spotifyShowUrl: SPOTIFY_SHOW_ES,
    spotifyEpisodeUrl: ep("1lYrjcl0UYU8dxeUcDoM8b"),
  },
  {
    slug: "es-shamati-19",
    locale: "es",
    serie: "shamati",
    season: 1,
    episode: 19,
    title: "Lo que el Creador aborrece no es tu cuerpo — Shamatí, Baal HaSulam",
    description:
      "Hay una voz dentro de ti que pregunta: ¿y yo qué gano con esto? No es una duda intelectual. Es más vieja, más terca, y aparece justo cuando estás a punto de dar algo sin recibir nada.",
    durationSec: 1557,
    duracionProvisional: true,
    spotifyShowUrl: SPOTIFY_SHOW_ES,
    spotifyEpisodeUrl: ep("0qztpIeQP16XidUU6FXGYF"),
  },
  {
    slug: "es-shamati-20",
    locale: "es",
    serie: "shamati",
    season: 1,
    episode: 20,
    title:
      "Por qué llevas años intentándolo y todavía no llega — Shamatí, Baal HaSulam",
    description:
      "Llevas tiempo haciendo lo que hay que hacer, y algo no termina de encenderse. Baal HaSulam escribió sobre eso en 1945, y dice algo que incomoda: eso no se consigue, se recibe. Entonces, ¿para qué esforzarse?",
    durationSec: 1033,
    duracionProvisional: true,
    spotifyShowUrl: SPOTIFY_SHOW_ES,
    spotifyEpisodeUrl: ep("0erGdp4P3Bx8WP2JyDaRRU"),
  },
  {
    slug: "es-shamati-21",
    locale: "es",
    serie: "shamati",
    season: 1,
    episode: 21,
    title:
      "Cerraste el libro sin entender nada. ¿Perdiste la hora? — Shamatí, Baal HaSulam",
    description:
      "Cierras el libro sin haber entendido nada y una voz razonable te dice que perdiste una hora. Baal HaSulam le responde en una página: el afán de entender ya es plegaria.",
    durationSec: 928,
    spotifyShowUrl: SPOTIFY_SHOW_ES,
    spotifyEpisodeUrl: ep("0dwqQu6dmBC2KQFWmqN5Zh"),
  },
  {
    slug: "es-shamati-22",
    locale: "es",
    serie: "shamati",
    season: 1,
    episode: 22,
    title:
      "Hiciste lo razonable y sentiste que bajabas. ¿Por qué? — Shamatí, Baal HaSulam",
    description:
      "Hiciste algo razonable y sentiste que bajabas un escalón. Baal HaSulam dice que ahí se ve que hay un juez; aquí vemos qué dice y, sobre todo, qué no dice.",
    durationSec: 965,
    spotifyShowUrl: SPOTIFY_SHOW_ES,
    spotifyEpisodeUrl: ep("1doT9h3ovDz6TxgteZzwb8"),
  },
  {
    slug: "es-shamati-23-24",
    locale: "es",
    serie: "shamati",
    season: 1,
    episode: 23,
    etiqueta: "23 y 24",
    title:
      "Volviste a hacer lo que prometiste no hacer, y te dijiste «qué mal soy» — Shamatí, Baal HaSulam",
    description:
      "Volviste a caer en lo que prometiste no hacer y pensaste «qué mal soy». Dos artículos de Shamatí sobre un mismo versículo: qué dicen, qué no, y qué hacer con esa frase.",
    durationSec: 1068,
    spotifyShowUrl: SPOTIFY_SHOW_ES,
    spotifyEpisodeUrl: ep("5dYk1bFQXmEQsxpZ8ZGN5l"),
  },
  {
    slug: "es-shamati-25",
    locale: "es",
    serie: "shamati",
    season: 1,
    episode: 25,
    title:
      "Lo decidiste con todo el corazón y a las pocas horas se había apagado. ¿Por qué? — Shamatí, Baal HaSulam",
    description:
      "Lo decidiste de verdad y la calle te lo quitó. Baal HaSulam explica por qué se cae lo que ya había entrado al corazón, y qué sí lo sostiene.",
    durationSec: 835,
    spotifyShowUrl: SPOTIFY_SHOW_ES,
    spotifyEpisodeUrl: ep("6vV5P76yzOwpEnkSIl3XX7"),
  },
  {
    slug: "es-shamati-26",
    locale: "es",
    serie: "shamati",
    season: 1,
    episode: 26,
    title: "Justo yo sigo aquí. ¿Orgullo o culpa? — Shamatí, Baal HaSulam",
    description:
      "«Justo yo sigo aquí» puede inflarte o apretarte. Baal HaSulam propone una tercera lectura: la gratitud como reconocimiento de lo recibido, sin compararte con nadie.",
    durationSec: 882,
    spotifyShowUrl: SPOTIFY_SHOW_ES,
    spotifyEpisodeUrl: ep("4p1CwOWQYCb4MJsz3UHyUV"),
  },
  {
    slug: "es-shamati-27",
    locale: "es",
    serie: "shamati",
    season: 1,
    episode: 27,
    title:
      "Te desprecian y no lo elegiste. ¿Eso es humildad? — Shamatí, Baal HaSulam",
    description:
      "Bajar por decisión propia no es lo mismo que que te bajen. Baal HaSulam distingue la modestia, que deja plenitud, del desprecio, que no la deja, y explica por qué duele.",
    durationSec: 779,
    spotifyShowUrl: SPOTIFY_SHOW_ES,
    spotifyEpisodeUrl: ep("6hrSaLW6JhhwwfXFQBbNuT"),
  },
  {
    slug: "es-shamati-28-29",
    locale: "es",
    serie: "shamati",
    season: 1,
    episode: 28,
    etiqueta: "28 y 29",
    title:
      "Hiciste algo bueno y de noche viste que era para que te vieran — Shamatí, Baal HaSulam",
    description:
      "Descubrir que te estabas engañando se siente como si algo muriera. Baal HaSulam lo lee como un camino: del fraude, por el entender, a la verdad.",
    durationSec: 904,
    spotifyShowUrl: SPOTIFY_SHOW_ES,
    spotifyEpisodeUrl: ep("7MnqCAqALmOA6sadJvLWzk"),
  },
  {
    slug: "es-shamati-30-31",
    locale: "es",
    serie: "shamati",
    season: 1,
    episode: 30,
    etiqueta: "30 y 31",
    title:
      "Trabajas todo el día y sientes que nada queda en pie — Shamatí, Baal HaSulam",
    description:
      "Es imposible dejar de recibir, dice Baal HaSulam; lo que sí se elige es adónde va tu fuerza. Dos apuntes de Shamatí sobre el esfuerzo que dura y por qué chocan las personas.",
    durationSec: 962,
    spotifyShowUrl: SPOTIFY_SHOW_ES,
    spotifyEpisodeUrl: ep("5N5vwhF1Fdsw5KC3Jx9VLo"),
  },
  {
    slug: "es-shamati-32",
    locale: "es",
    serie: "shamati",
    season: 1,
    episode: 32,
    title:
      "Empezaste por interés y te dieron más. «No te lo mereces» — Shamatí, Baal HaSulam",
    description:
      "Empezaste por interés y recibiste más de lo que buscabas. Baal HaSulam llama a la voz que te dice «no te lo mereces» por su nombre: la queja de Hamán.",
    durationSec: 863,
    spotifyShowUrl: SPOTIFY_SHOW_ES,
    spotifyEpisodeUrl: ep("3jxAehkQubG4yolJsUfXty"),
  },
  {
    slug: "es-shamati-33-p1",
    locale: "es",
    serie: "shamati",
    season: 1,
    episode: 33.1,
    etiqueta: "33 · 1 de 3",
    title:
      "Si Él es bueno, ¿por qué esto? La pregunta que vuelve como un pelo — Shamatí, Baal HaSulam",
    description:
      "Una pregunta sobre la bondad de Dios que no se deja contestar y vuelve una y otra vez. Baal HaSulam la llama «pelo» y explica para qué sirve. Parte 1 de 3.",
    durationSec: 1325,
    spotifyShowUrl: SPOTIFY_SHOW_ES,
    spotifyEpisodeUrl: ep("1Qr5kjCu7XIksEY1KemHSH"),
  },
  {
    slug: "es-shamati-33-p2",
    locale: "es",
    serie: "shamati",
    season: 1,
    episode: 33.2,
    etiqueta: "33 · 2 de 3",
    title:
      "Una frase ajena se te quedó adentro. ¿También es tuya? — Shamatí, Baal HaSulam",
    description:
      "Los pensamientos de otros también se vuelven tuyos. Baal HaSulam lee así «tomar tu parte y la de tu compañero», y lo lleva hasta Purim, Hamán y Jacob. Parte 2 de 3.",
    durationSec: 1342,
    spotifyShowUrl: SPOTIFY_SHOW_ES,
    spotifyEpisodeUrl: ep("5Jck1lTVTZM1EbF8hVfXU4"),
  },
  {
    slug: "es-shamati-33-p3",
    locale: "es",
    serie: "shamati",
    season: 1,
    episode: 33.3,
    etiqueta: "33 · 3 de 3",
    title:
      "Lo haces todo bien y no sientes alegría: «con esto alcanza» — Shamatí, Baal HaSulam",
    description:
      "«Con esto alcanza» es lo que dijo Esaú. Baal HaSulam distingue lo suficiente del todo, y explica por qué la alegría que falta no se finge: se siente. Parte 3 de 3.",
    durationSec: 1089,
    spotifyShowUrl: SPOTIFY_SHOW_ES,
    spotifyEpisodeUrl: ep("5G8OYlzMoP6ROA0wISPqxn"),
  },
  {
    slug: "es-shamati-34-p1",
    locale: "es",
    serie: "shamati",
    season: 1,
    episode: 34.1,
    etiqueta: "34 · 1 de 2",
    title: "Se fue la luz y por fin la viste — Shamatí, Baal HaSulam",
    description:
      "Solo cuando se va la luz te das cuenta de que estaba encendida. Baal HaSulam dice que con la cercanía al Creador pasa lo mismo. Parte 1 de 2.",
    durationSec: 1128,
    spotifyShowUrl: SPOTIFY_SHOW_ES,
    spotifyEpisodeUrl: ep("4tSR7dgb91D3m572EhNEas"),
  },
  {
    slug: "es-shamati-34-p2",
    locale: "es",
    serie: "shamati",
    season: 1,
    episode: 34.2,
    etiqueta: "34 · 2 de 2",
    title:
      "Te oíste decir «este mundo no tiene dueño» — Shamatí, Baal HaSulam",
    description:
      "Se te escapó una queja amarga sobre cómo va el mundo, y por la noche te pesa. Baal HaSulam dice que ese peso es el comienzo de una plegaria. Parte 2 de 2.",
    durationSec: 1289,
    spotifyShowUrl: SPOTIFY_SHOW_ES,
    spotifyEpisodeUrl: ep("2QbEegJi9zhpIWGPQXiics"),
  },
  {
    slug: "es-shamati-35-p1",
    locale: "es",
    serie: "shamati",
    season: 1,
    episode: 35.1,
    etiqueta: "35 · 1 de 2",
    title: "El mar se lo traga todo, y lo devuelve — Shamatí, Baal HaSulam",
    description:
      "El mar se traga lo que pierdes y un día lo devuelve a la orilla. Baal HaSulam dice que con la luz que se te escapa pasa lo mismo. Parte 1 de 2.",
    durationSec: 1064,
    spotifyShowUrl: SPOTIFY_SHOW_ES,
    spotifyEpisodeUrl: ep("05dx0EyFFRV2B0aA8B8Eef"),
  },
  {
    slug: "es-shamati-35-p2",
    locale: "es",
    serie: "shamati",
    season: 1,
    episode: 35.2,
    etiqueta: "35 · 2 de 2",
    // Título tal como se publicó en Spotify (en disco el guion lo llamaba
    // "Fotos viejas un domingo"; manda el que ve la audiencia).
    title:
      "¿De dónde sacas vida cuando el día no te da nada? — Shamatí, Baal HaSulam",
    description:
      "Cuando el presente no te da nada, buscas vida en las fotos viejas. Baal HaSulam dice que es una regla, y propone otra fuente. Parte 2 de 2.",
    durationSec: 1234,
    spotifyShowUrl: SPOTIFY_SHOW_ES,
    spotifyEpisodeUrl: ep("5tlXI1JdXOj9qfXANxBcwq"),
  },

  // ── Tanya ───────────────────────────────────────────────────────────────
  {
    slug: "es-tanya-01",
    locale: "es",
    serie: "tanya",
    // Cada obra es una temporada en Spotify, que no entiende de colecciones.
    season: 2,
    episode: 1,
    title: "La guerra entre tus dos almas — Tanya, capítulo 1",
    description:
      "Antes de nacer te toman juramento: «sé justo y no seas malvado». Así abre el Tanya, citando el Talmud (Nidá 30b) — y de esa primera palabra, תַּנְיָא («se enseñó»), toma el libro su nombre. El primer capítulo plantea la pregunta que lo sostiene todo: si te hacen jurar ser justo, ¿por qué cuesta tanto? Porque en ti no vive un alma, sino dos, y su tensión es la trama de tu vida. Conversación generada con IA a partir del texto original.",
    durationSec: 828,
    audioSrc: "/audio/podcast/es-tanya-01.mp3",
    spotifyShowUrl: SPOTIFY_SHOW_ES,
    spotifyEpisodeUrl: ep("6kFRenb2P3dsdn0kGiv6yF"),
  },
  {
    slug: "es-tanya-02",
    locale: "es",
    serie: "tanya",
    season: 2,
    episode: 2,
    title: "La anatomía espiritual de tus dos almas — Tanya, capítulo 2",
    description:
      "El segundo capítulo del Tanya, de Rabí Shneur Zalman de Liadi. Conversación generada con IA a partir del texto original.",
    durationSec: 1173,
    audioSrc: "/audio/podcast/es-tanya-02.mp3",
    spotifyShowUrl: SPOTIFY_SHOW_ES,
    // Estaba cruzado con el de es-shamati-05 (ver la nota de allí). Corregido.
    spotifyEpisodeUrl: ep("36HRJ7N0QoteFeNTWNKFKB"),
  },

  // ── Farsi — "Jashmal | خشمل" ────────────────────────────────────────────
  //  El show farsi va por su cuenta y NO se produce contenido farsi nuevo
  //  (regla de Mardan). Aquí solo lo que ya existe publicado.
  {
    slug: "fa-shamati-01",
    locale: "fa",
    serie: "shamati",
    season: 1,
    episode: 1,
    title: "هیچ قدرتی در جهان جز او نیست",
    subtitle: "Shamatí · Baal HaSulam",
    description:
      "گفت‌وگویی دربارهٔ یکی از آموزه‌های بنیادین شمعتی، اثر بعل هسولام: هیچ قدرتی در جهان جز او نیست. این گفت‌وگو با هوش مصنوعی از متن اصلی ساخته شده است.",
    durationSec: 1562,
    audioSrc: "/audio/podcast/fa-shamati-01.mp3",
    spotifyShowUrl: SPOTIFY_SHOW_FA,
  },
  {
    slug: "fa-shamati-02",
    locale: "fa",
    serie: "shamati",
    season: 1,
    episode: 2,
    title: "خداوند در تبعید و راز رنج های ما",
    subtitle: "Shamatí · Baal HaSulam",
    description:
      "گفت‌وگویی دربارهٔ تبعید شخینا و معنای رنج انسان، بر پایهٔ شمعتی اثر بعل هسولام. این گفت‌وگو با هوش مصنوعی از متن اصلی ساخته شده است.",
    durationSec: 1340,
    audioSrc: "/audio/podcast/fa-shamati-02.mp3",
    spotifyShowUrl: SPOTIFY_SHOW_FA,
  },
  {
    slug: "fa-shamati-03",
    locale: "fa",
    serie: "shamati",
    season: 1,
    episode: 3,
    title: "واقعیت تنها بازتاب ظرف ادراک ماست",
    subtitle: "Shamatí · Baal HaSulam",
    description:
      "گفت‌وگویی دربارهٔ سومین آموزهٔ شمعتی، اثر بعل هسولام: دستیابی روحانی. آنچه را درنیافته‌ایم، به نام نمی‌شناسیم — از ذات الهی سخن نمی‌گوییم؛ تنها نوری را می‌شناسیم که به ما می‌رسد و شکلی که در ظرف ادراک ما می‌گیرد. این گفت‌وگو با هوش مصنوعی از متن اصلی ساخته شده است.",
    durationSec: 935,
    audioSrc: "/audio/podcast/fa-shamati-03.mp3",
    spotifyShowUrl: SPOTIFY_SHOW_FA,
  },
];

// ─────────────────────────────────────────────────────────────────────────
//  ESTUDIOS — el texto leíble de un episodio
// ─────────────────────────────────────────────────────────────────────────
//  Lo que Mardan daba por hecho desde el principio: que cada capítulo del
//  podcast quedara publicado también como estudio en la web. El cuerpo sale
//  del guion que el Sofer coteja fuente por fuente; aquí no se edita.
// ─────────────────────────────────────────────────────────────────────────

export type PodcastEstudio = {
  slug: string;
  markdown: string;
  fuentes: string;
};

const ESTUDIOS_POR_SLUG = new Map<string, PodcastEstudio>(
  PODCAST_ESTUDIOS_DATA.map((e) => [e.slug, e]),
);

/** El estudio de un episodio, si se escribió. */
export function getPodcastEstudio(slug: string): PodcastEstudio | undefined {
  return ESTUDIOS_POR_SLUG.get(slug);
}

/** ¿Este episodio se puede LEER, además de oír? */
export function tieneEstudio(slug: string): boolean {
  return ESTUDIOS_POR_SLUG.has(slug);
}

/** Todos los episodios que tienen estudio — para prerenderizar sus rutas. */
export function episodiosConEstudio(): PodcastEpisode[] {
  return PODCAST_EPISODES.filter((e) => ESTUDIOS_POR_SLUG.has(e.slug));
}

/** Lo que se muestra como número del episodio ("25", "23 y 24", "33 · 1 de 3"). */
export function etiquetaEpisodio(e: PodcastEpisode): string {
  return e.etiqueta ?? String(e.episode);
}

const POR_SLUG = new Map(PODCAST_EPISODES.map((e) => [e.slug, e]));

export function getPodcastEpisode(slug: string): PodcastEpisode | undefined {
  return POR_SLUG.get(slug);
}

/** Idioma de contenido para una ruta. /en aún no tiene episodios propios. */
function contentLocale(locale: string): PodcastLocale {
  return locale === "fa" ? "fa" : "es";
}

/**
 * La obra de un episodio, ya resuelta al idioma de la ruta. Vive aquí y no en
 * la página para que la elección de idioma quede en la capa de datos (es la
 * misma razón por la que existe `contentLocale`).
 */
export function serieDeEpisodio(
  episodio: PodcastEpisode,
  locale: string,
): { he: string; title: string; blurb: string } | undefined {
  const s = PODCAST_SERIES.find((x) => x.slug === episodio.serie);
  if (!s) return undefined;
  const target = contentLocale(locale);
  return { he: s.he, title: s.title[target], blurb: s.blurb[target] };
}

/** Episodios del idioma pedido, ordenados por temporada y número. */
export function episodesForLocale(locale: string): PodcastEpisode[] {
  const target = contentLocale(locale);
  return PODCAST_EPISODES.filter((e) => e.locale === target).sort(
    (a, b) => a.season - b.season || a.episode - b.episode,
  );
}

/**
 * Episodio anterior/siguiente DENTRO de su obra — para pasar de un estudio al
 * siguiente sin volver al índice. Solo cuenta los que tienen estudio: un
 * enlace a una página que no existe sería un hueco a la vista.
 */
export function vecinosConEstudio(slug: string): {
  prev?: PodcastEpisode;
  next?: PodcastEpisode;
} {
  const actual = POR_SLUG.get(slug);
  if (!actual) return {};
  const hermanos = episodiosConEstudio()
    .filter((e) => e.locale === actual.locale && e.serie === actual.serie)
    .sort((a, b) => a.episode - b.episode);
  const i = hermanos.findIndex((e) => e.slug === slug);
  if (i === -1) return {};
  return {
    prev: i > 0 ? hermanos[i - 1] : undefined,
    next: i < hermanos.length - 1 ? hermanos[i + 1] : undefined,
  };
}

export type PodcastSeriesWithEpisodes = {
  slug: string;
  he: string;
  title: string;
  blurb: string;
  episodes: PodcastEpisode[];
};

/**
 * Las obras con sus episodios en el idioma pedido, listas para renderizar.
 * Una obra sin episodios en ese idioma no se devuelve (no se anuncia vacía).
 */
export function seriesForLocale(locale: string): PodcastSeriesWithEpisodes[] {
  const target = contentLocale(locale);
  const episodes = episodesForLocale(locale);
  return PODCAST_SERIES.map((s) => ({
    slug: s.slug,
    he: s.he,
    title: s.title[target],
    blurb: s.blurb[target],
    episodes: episodes.filter((e) => e.serie === s.slug),
  })).filter((s) => s.episodes.length > 0);
}
