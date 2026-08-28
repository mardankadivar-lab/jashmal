// @generado por scripts/gen-misterio-metadata.mjs — no editar a mano (se reescribe).
// Metadata del estudio /misterio/betsabe: título, descripción, canonical,
// hreflang e imagen de compartir, en el idioma de la ruta (es · fa · en).
// El texto sale del catálogo lib/content/misterios.ts — aquí no hay contenido.
import type { Metadata } from "next";
import { metadataDeMisterio } from "@/lib/content/misterioMetadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return metadataDeMisterio("betsabe", locale);
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
