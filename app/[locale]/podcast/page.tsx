"use client";

import { useLocale, useTranslations } from "next-intl";
import SiteHeader from "@/components/SiteHeader";
import { seriesForLocale } from "@/lib/content/podcast";
import PodcastPlayer from "@/components/podcast/PodcastPlayer";

/**
 * /podcast — episodios del podcast con reproductor NATIVO (auto-hospedado),
 * agrupados por OBRA (Shamati, y las que vengan).
 * Decisión de arquitectura: Spotify no funciona en Irán y la audiencia farsi
 * es clave, así que el player del sitio es el principal y Spotify el botón
 * secundario. /es → episodios en español · /fa → en farsi (RTL) ·
 * /en → muestra los de español con un aviso en inglés.
 */
export default function PodcastPage() {
  const locale = useLocale();
  const fa = locale === "fa";
  const t = useTranslations("podcast");

  const series = seriesForLocale(locale);

  return (
    <>
    <SiteHeader />
    <main className="mx-auto max-w-3xl px-5 pb-24 pt-12" dir={fa ? "rtl" : "ltr"}>
      {/* Encabezado — de la sección, no de una obra: el hebreo vive en cada obra */}
      <div className="mb-14 text-center">
        <h1 className="font-cinzel text-2xl font-bold tracking-wide text-parchment sm:text-3xl">
          {t("title")}
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted">
          {t("subtitle")}
        </p>
        {locale === "en" && (
          <p className="mx-auto mt-4 w-fit rounded-lg border border-gold/25 bg-gold/5 px-4 py-2 text-xs text-gold/80">
            {t("enNotice")}
          </p>
        )}
      </div>

      {/* Una sección por obra */}
      <div className="flex flex-col gap-16">
        {series.map((serie) => (
          <section key={serie.slug}>
            {/* Encabezado de la obra: hebreo grande, español debajo */}
            <div className="mb-7 text-center">
              <p
                className="hebrew mb-2 text-3xl text-gold/80"
                style={{ filter: "drop-shadow(0 0 10px rgba(201,164,62,0.4))" }}
              >
                {serie.he}
              </p>
              <h2 className="font-cinzel text-lg font-bold tracking-wide text-parchment sm:text-xl">
                {serie.title}
              </h2>
              <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-muted">
                {serie.blurb}
              </p>
              <div className="mx-auto mt-5 h-px w-16 bg-gold/25" />
            </div>

            <div className="flex flex-col gap-6">
        {serie.episodes.map((ep) => (
          <article
            key={ep.slug}
            className="relative overflow-hidden rounded-2xl border border-gold/25 p-6 transition-colors hover:border-gold/40"
            style={{ background: "rgb(var(--c-surface) / 0.94)" }}
          >
            {/* Rótulo del episodio. Sin temporada: la obra ya encabeza el
                grupo, y la temporada solo existe para Spotify. */}
            <p className="font-cinzel text-[11px] uppercase tracking-widest text-gold/70">
              {t("episodeLabel", { episode: ep.episode })}
            </p>

            {/* Título (+ subtítulo latino en los episodios farsi) */}
            <h2
              className={`mt-2 text-lg font-semibold leading-snug text-parchment sm:text-xl ${fa ? "" : "font-cinzel"}`}
            >
              {ep.title}
            </h2>
            {ep.subtitle && (
              <p
                className={`mt-1 font-cinzel text-xs uppercase tracking-widest text-gold/60 ${fa ? "text-end" : ""}`}
                dir="ltr"
              >
                {ep.subtitle}
              </p>
            )}

            {/* Descripción */}
            <p className="mt-3 text-sm leading-relaxed text-muted">{ep.description}</p>

            {/* Reproductor nativo */}
            <PodcastPlayer
              src={ep.audioSrc}
              durationSec={ep.durationSec}
              playLabel={t("play")}
              pauseLabel={t("pause")}
            />

            {/* Spotify — opción secundaria */}
            <div className="mt-4">
              <a
                href={ep.spotifyShowUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-gold/25 px-3.5 py-2 font-cinzel text-xs uppercase tracking-widest text-gold/80 transition-colors hover:border-gold/50 hover:bg-gold/10 hover:text-gold"
              >
                {/* Icono Spotify (trazo simple) */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0Zm5.5 17.31a.75.75 0 0 1-1.03.25c-2.82-1.72-6.37-2.11-10.55-1.16a.75.75 0 1 1-.33-1.46c4.57-1.05 8.5-.6 11.66 1.34.35.22.47.68.25 1.03Zm1.47-3.27a.94.94 0 0 1-1.29.31c-3.23-1.98-8.15-2.56-11.97-1.4a.94.94 0 1 1-.54-1.79c4.36-1.32 9.78-.68 13.49 1.6.44.27.58.85.31 1.28Zm.13-3.4C15.24 8.34 8.87 8.13 5.17 9.25a1.12 1.12 0 1 1-.65-2.15c4.25-1.29 11.3-1.04 15.76 1.6a1.12 1.12 0 0 1-1.18 1.94Z" />
                </svg>
                {t("spotify")}
              </a>
            </div>
          </article>
        ))}
            </div>
          </section>
        ))}
      </div>
    </main>
    </>
  );
}
