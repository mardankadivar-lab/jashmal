import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  episodiosConEstudio,
  getPodcastEpisode,
  getPodcastEstudio,
  serieDeEpisodio,
  vecinosConEstudio,
} from "@/lib/content/podcast";
import EpisodioView from "@/components/podcast/EpisodioView";

// ─────────────────────────────────────────────────────────────────────────
//  /podcast/{slug} — el episodio para LEER, no solo para oír
// ─────────────────────────────────────────────────────────────────────────
//  Solo existen las rutas de los episodios cuyo estudio escribió el Sofer
//  (content/podcast/<slug>.md). Un episodio sin estudio NO tiene página: se
//  queda en la lista con su botón de Spotify. Así no hay enlaces a páginas
//  vacías, que es la otra forma de que algo quede perdido.
// ─────────────────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return episodiosConEstudio().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const e = getPodcastEpisode(slug);
  if (!e) return { title: "Jashmal" };
  // Título PLANO: el layout raíz ya le pega la plantilla "%s · Jashmal"
  // (lib/i18n/seo.ts). Añadirlo aquí lo duplicaba en la pestaña.
  return {
    title: `${e.title} · Podcast`,
    description: e.description,
  };
}

export default async function EpisodioPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const episodio = getPodcastEpisode(slug);
  const estudio = episodio ? getPodcastEstudio(slug) : undefined;
  if (!episodio || !estudio) notFound();

  const serie = serieDeEpisodio(episodio, locale);
  const { prev, next } = vecinosConEstudio(slug);

  return (
    <EpisodioView
      episodio={episodio}
      estudio={estudio}
      serieTitulo={serie?.title ?? ""}
      serieHe={serie?.he ?? ""}
      prev={prev}
      next={next}
    />
  );
}
