"use client";

import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { PodcastEpisode, PodcastEstudio } from "@/lib/content/podcast";
import { etiquetaEpisodio } from "@/lib/content/podcast";
import PodcastPlayer from "./PodcastPlayer";
import EstudioBody from "./EstudioBody";

// Vista completa de un episodio: oírlo y LEERLO. Misma estética que las
// páginas de misterio y de estación (fondo #05050a, dorado, Cinzel): aquí no
// se inventa nada visual, solo se aplica lo que ya existe.
//
// El cuerpo del estudio está en español —es el idioma en que el Sofer escribe
// el guion— también en /fa y /en. Es la misma política honesta del resto del
// sitio: antes que traducir a máquina, se avisa.

export default function EpisodioView({
  episodio,
  estudio,
  serieTitulo,
  serieHe,
  prev,
  next,
}: {
  episodio: PodcastEpisode;
  estudio: PodcastEstudio;
  serieTitulo: string;
  serieHe: string;
  prev?: PodcastEpisode;
  next?: PodcastEpisode;
}) {
  const locale = useLocale();
  const fa = locale === "fa";
  const t = useTranslations("podcast");
  const C = "#c9a43e";

  // Igual que misterios y estaciones: el dorado sobre pergamino solo se lee
  // bien en oscuro.
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div
      className="always-dark min-h-screen"
      style={{ background: "#05050a" }}
      dir={fa ? "rtl" : "ltr"}
    >
      {/* NAV superior */}
      <nav
        className="sticky top-0 z-40 border-b border-gold/10 px-5 py-3 backdrop-blur-md"
        style={{ background: "rgba(5,5,10,0.9)" }}
      >
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-4">
          <Link href="/podcast" className="font-cinzel text-sm text-gold/70 hover:text-gold">
            ← {t("title")}
          </Link>
          <span className="font-cinzel text-xs uppercase tracking-widest text-gold/40">
            {t("episodeLabel", { episode: etiquetaEpisodio(episodio) })}
          </span>
        </div>
      </nav>

      <main className="mx-auto max-w-2xl px-5 pb-24 pt-12">
        {/* HERO — español primero, hebreo como apoyo.
            La dirección la manda el idioma del EPISODIO, no el de la ruta: en
            /fa la página va en RTL, pero un título español dentro de un bloque
            RTL se lee con el punto final cambiado de lado. */}
        <header
          className="mb-10 text-center"
          dir={episodio.locale === "fa" ? "rtl" : "ltr"}
        >
          <p className="hebrew mb-2 text-3xl text-gold/75" style={{ filter: `drop-shadow(0 0 10px ${C}66)` }}>
            {serieHe}
          </p>
          <p className="mb-6 font-cinzel text-[11px] uppercase tracking-[0.3em] text-gold/50">
            {serieTitulo}
          </p>
          <h1 className="font-cinzel text-xl font-bold leading-snug text-parchment sm:text-2xl">
            {episodio.title}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted">
            {episodio.description}
          </p>
        </header>

        {/* OÍRLO — reproductor propio si tenemos el mp3; si no, Spotify */}
        <section className="mb-12 rounded-2xl border border-gold/20 p-5" style={{ background: "rgb(var(--c-surface) / 0.9)" }}>
          {episodio.audioSrc ? (
            <PodcastPlayer
              src={episodio.audioSrc}
              durationSec={episodio.durationSec}
              playLabel={t("play")}
              pauseLabel={t("pause")}
            />
          ) : (
            <p className="mb-3 text-center text-xs leading-relaxed text-muted">
              {t("soloSpotify")}
            </p>
          )}
          <div className={episodio.audioSrc ? "mt-4 text-center" : "text-center"}>
            <a
              href={episodio.spotifyEpisodeUrl ?? episodio.spotifyShowUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-gold/25 px-3.5 py-2 font-cinzel text-xs uppercase tracking-widest text-gold/80 transition-colors hover:border-gold/50 hover:bg-gold/10 hover:text-gold"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0Zm5.5 17.31a.75.75 0 0 1-1.03.25c-2.82-1.72-6.37-2.11-10.55-1.16a.75.75 0 1 1-.33-1.46c4.57-1.05 8.5-.6 11.66 1.34.35.22.47.68.25 1.03Zm1.47-3.27a.94.94 0 0 1-1.29.31c-3.23-1.98-8.15-2.56-11.97-1.4a.94.94 0 1 1-.54-1.79c4.36-1.32 9.78-.68 13.49 1.6.44.27.58.85.31 1.28Zm.13-3.4C15.24 8.34 8.87 8.13 5.17 9.25a1.12 1.12 0 1 1-.65-2.15c4.25-1.29 11.3-1.04 15.76 1.6a1.12 1.12 0 0 1-1.18 1.94Z" />
              </svg>
              {t("spotify")}
            </a>
          </div>
        </section>

        {/* LEERLO */}
        <div className="mb-8 flex items-center gap-4">
          <span className="font-cinzel text-xs uppercase tracking-[0.3em] text-gold/60">
            {t("estudioLabel")}
          </span>
          <div className="h-px flex-1 bg-gold/15" />
        </div>

        {locale !== "es" && (
          <p className="mb-8 rounded-lg border border-gold/25 bg-gold/5 px-4 py-2.5 text-center text-xs text-gold/80" dir="ltr">
            {t("estudioSoloEs")}
          </p>
        )}

        {/* El estudio va SIEMPRE en español y de izquierda a derecha, también
            en /fa: es el texto del Sofer sin traducir. */}
        <div dir="ltr" className="text-start">
          <EstudioBody markdown={estudio.markdown} />
        </div>

        {/* FUENTES — las mismas que se publicaron con el episodio */}
        {estudio.fuentes && (
          <section className="mt-14" dir="ltr">
            <div className="mb-5 flex items-center gap-4">
              <span className="font-cinzel text-xs uppercase tracking-[0.3em] text-gold/60">
                {t("fuentesLabel")}
              </span>
              <div className="h-px flex-1 bg-gold/15" />
            </div>
            <div className="rounded-2xl border border-gold/15 bg-gold/[0.03] p-5">
              {estudio.fuentes.split(/\n+/).map((linea, i) => (
                <p key={`f${i}`} className="mb-2 text-xs leading-relaxed text-parchment/70 last:mb-0">
                  {linea}
                </p>
              ))}
            </div>
          </section>
        )}

        {/* NAVEGACIÓN anterior / siguiente dentro de la obra.
            Misma razón que el hero: manda el idioma de los episodios. */}
        <div
          className="mt-16 grid grid-cols-2 gap-3 border-t border-gold/10 pt-8"
          dir={episodio.locale === "fa" ? "rtl" : "ltr"}
        >
          {prev ? (
            <Link
              href={`/podcast/${prev.slug}`}
              className="rounded-xl border border-gold/15 px-4 py-3 transition-colors hover:border-gold/40 hover:bg-gold/[0.04]"
            >
              <span className="block font-cinzel text-[10px] uppercase tracking-widest text-gold/40">
                ← {t("episodeLabel", { episode: etiquetaEpisodio(prev) })}
              </span>
              <span className="mt-1 block text-sm leading-snug text-parchment/75">
                {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/podcast/${next.slug}`}
              className="rounded-xl border border-gold/15 px-4 py-3 text-end transition-colors hover:border-gold/40 hover:bg-gold/[0.04]"
            >
              <span className="block font-cinzel text-[10px] uppercase tracking-widest text-gold/40">
                {t("episodeLabel", { episode: etiquetaEpisodio(next) })} →
              </span>
              <span className="mt-1 block text-sm leading-snug text-parchment/75">
                {next.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/podcast"
            className="font-cinzel text-xs uppercase tracking-widest text-gold/50 hover:text-gold"
          >
            ← {t("volverAlPodcast")}
          </Link>
        </div>
      </main>
    </div>
  );
}
