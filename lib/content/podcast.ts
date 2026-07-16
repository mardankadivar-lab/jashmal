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
 * ─────────────────────────────────────────────────────────────────────────
 */

export type PodcastLocale = "es" | "fa";

export type PodcastEpisode = {
  /** Identificador estable (también nombre del archivo mp3). */
  slug: string;
  /** Idioma del episodio: decide en qué versión del sitio aparece. */
  locale: PodcastLocale;
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
};

const SPOTIFY_SHOW_ES = "https://open.spotify.com/show/033QcCauKm3tHaRO6QsmqJ";
const SPOTIFY_SHOW_FA = "https://open.spotify.com/show/6hXNwt8vOdFpWB0iPuu1J9";

export const PODCAST_EPISODES: PodcastEpisode[] = [
  // ── Español — "Jashmal en Español" ──────────────────────────────────────
  {
    slug: "es-shamati-01",
    locale: "es",
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
    season: 1,
    episode: 3,
    title: "La mecánica interna del logro espiritual — Shamati, Baal HaSulam",
    description:
      "¿Puedes describir un sabor que nunca has probado? Conversamos sobre la tercera enseñanza de Shamati («Escuché»), del cabalista Rav Yehuda Ashlag, Baal HaSulam: «lo que no alcanzamos, no lo conocemos por nombre». De la Esencia divina no hablamos jamás; solo conocemos la luz que llega a nosotros y la forma en que la recibimos. Espiritualidad no es especular: es alcanzar, vivir, saborear. Conversación generada con IA a partir del texto original.",
    durationSec: 1500,
    audioSrc: "/audio/podcast/es-shamati-03.mp3",
    spotifyShowUrl: SPOTIFY_SHOW_ES,
  },

  // ── Farsi — "Jashmal | خشمل" ────────────────────────────────────────────
  {
    slug: "fa-shamati-01",
    locale: "fa",
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
];

/** Episodios del idioma pedido, ordenados por temporada y número. */
export function episodesForLocale(locale: string): PodcastEpisode[] {
  // /en/podcast todavía no tiene episodios propios: muestra los de español.
  const target: PodcastLocale = locale === "fa" ? "fa" : "es";
  return PODCAST_EPISODES.filter((e) => e.locale === target).sort(
    (a, b) => a.season - b.season || a.episode - b.episode,
  );
}
