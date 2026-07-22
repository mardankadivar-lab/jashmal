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
 *  El locale del episodio decide en qué versión del sitio se muestra:
 *  /es/podcast → episodios "es" · /fa/podcast → episodios "fa".
 *  /en/podcast muestra los "es" con un aviso en inglés.
 *
 *  Los episodios se agrupan por OBRA (`serie`), no por tema: un episodio
 *  pertenece a un solo libro, mientras que un tema lo cruzaría en varios.
 *  Para sumar una obra nueva: una entrada en PODCAST_SERIES + `serie` en sus
 *  episodios. La agrupación de la página se acomoda sola.
 * ─────────────────────────────────────────────────────────────────────────
 */

export type PodcastLocale = "es" | "fa";

/** Una obra estudiada en el podcast (Shamati, Likutei Moharan, …). */
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
  /** Identificador estable (también nombre del archivo mp3). */
  slug: string;
  /** Idioma del episodio: decide en qué versión del sitio aparece. */
  locale: PodcastLocale;
  /** Obra a la que pertenece → `slug` de PODCAST_SERIES. */
  serie: string;
  /**
   * Solo para paridad con Spotify, que no entiende de obras: una temporada por
   * obra (Shamati = 1, Tanya = 2). En el sitio no se muestra — ahí manda `serie`.
   */
  season: number;
  episode: number;
  title: string;
  /** Rótulo latino de apoyo (los episodios farsi lo usan bajo el título). */
  subtitle?: string;
  description: string;
  durationSec: number;
  /** Ruta pública del mp3 auto-hospedado. */
  audioSrc: string;
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

/**
 * Las obras, en el orden en que se muestran.
 * Nota de producción: en el sitio agrupamos por obra; en Spotify, que solo
 * entiende temporadas, cada obra es una temporada (Shamati = T1).
 */
export const PODCAST_SERIES: PodcastSeries[] = [
  {
    slug: "shamati",
    he: "שָׁמַעְתִּי",
    title: {
      es: "Shamati — Baal HaSulam",
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
  {
    slug: "es-shamati-01",
    locale: "es",
    serie: "shamati",
    season: 1,
    episode: 1,
    title: "Solo existe una fuerza detrás de todo — Shamati, Baal HaSulam",
    description:
      "¿Y si detrás de todo lo que te pasa — lo dulce y lo amargo — actuara una sola fuerza? Conversamos sobre una de las enseñanzas fundacionales de Shamati («Escuché»), del cabalista Rav Yehuda Ashlag, Baal HaSulam: «Ein Od Milvadó» — no hay nadie más aparte de Él. Conversación generada con IA a partir del texto original.",
    durationSec: 1052,
    audioSrc: "/audio/podcast/es-shamati-01.mp3",
    spotifyShowUrl: SPOTIFY_SHOW_ES,
  },
  {
    slug: "es-shamati-02",
    locale: "es",
    serie: "shamati",
    season: 1,
    episode: 2,
    title:
      "Tus obstáculos son herramientas para tu evolución — Shamati, Baal HaSulam",
    description:
      "Las caídas, las distracciones y los ocultamientos no son castigos ni accidentes: son la herramienta con la que se construye tu vasija. Cada descenso prepara un ascenso mayor. Conversación generada con IA a partir del texto original.",
    durationSec: 911,
    audioSrc: "/audio/podcast/es-shamati-02.mp3",
    spotifyShowUrl: SPOTIFY_SHOW_ES,
  },
  {
    slug: "es-shamati-03",
    locale: "es",
    serie: "shamati",
    season: 1,
    episode: 3,
    title: "La mecánica interna del logro espiritual — Shamati, Baal HaSulam",
    description:
      "¿Puedes describir un sabor que nunca has probado? Conversamos sobre la tercera enseñanza de Shamati («Escuché»), del cabalista Rav Yehuda Ashlag, Baal HaSulam: «lo que no alcanzamos, no lo conocemos por nombre». De la Esencia divina no hablamos jamás; solo conocemos la luz que llega a nosotros y la forma en que la recibimos. Espiritualidad no es especular: es alcanzar, vivir, saborear. Conversación generada con IA a partir del texto original.",
    durationSec: 1500,
    audioSrc: "/audio/podcast/es-shamati-03.mp3",
    spotifyShowUrl: SPOTIFY_SHOW_ES,
  },
  {
    slug: "es-shamati-04",
    locale: "es",
    serie: "shamati",
    season: 1,
    episode: 4,
    title: "Por qué nos pesa dejar el ego — Shamati, Baal HaSulam",
    description:
      "¿Por qué cuesta tanto soltar el ego? Conversamos sobre la cuarta enseñanza de Shamati («Escuché»), del cabalista Rav Yehuda Ashlag, Baal HaSulam: la pesadez que sentimos al anularnos ante el Creador tiene una sola causa — no sentir Su presencia. Cuando el alma percibe la existencia del Creador, se anula sola, con gozo, «como una vela ante una antorcha». Conversación generada con IA a partir del texto original.",
    durationSec: 1218,
    audioSrc: "/audio/podcast/es-shamati-04.mp3",
    spotifyShowUrl: SPOTIFY_SHOW_ES,
  },
  {
    slug: "es-shamati-05",
    locale: "es",
    serie: "shamati",
    season: 1,
    episode: 5,
    title: "La paradoja del esfuerzo humano — Shamati, Baal HaSulam",
    description:
      "Conversación sobre la quinta enseñanza de Shamati («Escuché»), del cabalista Rav Yehuda Ashlag, Baal HaSulam. Conversación generada con IA a partir del texto original.",
    durationSec: 1086,
    audioSrc: "/audio/podcast/es-shamati-05.mp3",
    spotifyShowUrl: SPOTIFY_SHOW_ES,
    spotifyEpisodeUrl: "https://open.spotify.com/episode/36HRJ7N0QoteFeNTWNKFKB",
  },
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
    spotifyEpisodeUrl: "https://open.spotify.com/episode/3AJHKcKELCK9v19YCrym2L",
  },

  // ── Farsi — "Jashmal | خشمل" ────────────────────────────────────────────
  {
    slug: "fa-shamati-01",
    locale: "fa",
    serie: "shamati",
    season: 1,
    episode: 1,
    title: "هیچ قدرتی در جهان جز او نیست",
    subtitle: "Shamati · Baal HaSulam",
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
    subtitle: "Shamati · Baal HaSulam",
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
    subtitle: "Shamati · Baal HaSulam",
    description:
      "گفت‌وگویی دربارهٔ سومین آموزهٔ شمعتی، اثر بعل هسولام: دستیابی روحانی. آنچه را درنیافته‌ایم، به نام نمی‌شناسیم — از ذات الهی سخن نمی‌گوییم؛ تنها نوری را می‌شناسیم که به ما می‌رسد و شکلی که در ظرف ادراک ما می‌گیرد. این گفت‌وگو با هوش مصنوعی از متن اصلی ساخته شده است.",
    durationSec: 935,
    audioSrc: "/audio/podcast/fa-shamati-03.mp3",
    spotifyShowUrl: SPOTIFY_SHOW_FA,
  },
];

/** Idioma de contenido para una ruta. /en aún no tiene episodios propios. */
function contentLocale(locale: string): PodcastLocale {
  return locale === "fa" ? "fa" : "es";
}

/** Episodios del idioma pedido, ordenados por temporada y número. */
export function episodesForLocale(locale: string): PodcastEpisode[] {
  const target = contentLocale(locale);
  return PODCAST_EPISODES.filter((e) => e.locale === target).sort(
    (a, b) => a.season - b.season || a.episode - b.episode,
  );
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
