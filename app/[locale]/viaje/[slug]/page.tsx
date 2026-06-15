import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ESTACIONES, getEstacion, vecinos } from "@/lib/content/estaciones";
import EstacionView from "@/components/viaje/EstacionView";

// Pre-genera la ruta de cada una de las 14 estaciones.
export function generateStaticParams() {
  return ESTACIONES.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const e = getEstacion(slug);
  if (!e) return { title: "Jashmal" };
  return {
    title: `${e.transliteracion} (${e.hebreo}) — El Viaje de la Creación · Jashmal`,
    description: `Estación ${e.numero} de 14. ${e.esencia}`,
  };
}

export default async function EstacionPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const e = getEstacion(slug);
  if (!e) notFound();
  const { prev, next } = vecinos(slug);
  return <EstacionView estacion={e} prev={prev} next={next} />;
}
