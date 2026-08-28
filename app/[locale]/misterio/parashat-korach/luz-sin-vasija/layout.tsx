// Metadata de la sub-ruta /misterio/parashat-korach/luz-sin-vasija.
// No está en el catálogo de misterios (es una enseñanza dentro de la parashá),
// así que su texto viene de ../ensenanzas.ts — el mismo que pinta el índice.
import type { Metadata } from "next";
import { metadataDeEstudio } from "@/lib/content/misterioMetadata";
import { getEnsenanzaKorach } from "../ensenanzas";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const e = getEnsenanzaKorach("luz-sin-vasija");
  if (!e) return {};
  return metadataDeEstudio(
    {
      path: `/misterio/parashat-korach/${e.slug}`,
      titulo: `${e.titulo} — Parashat Korach`,
      tituloEn: `${e.tituloEn} — Parashat Korach`,
      gancho: e.gancho,
      ganchoEn: e.ganchoEn,
      he: e.he,
      numero: e.numero,
    },
    locale,
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
