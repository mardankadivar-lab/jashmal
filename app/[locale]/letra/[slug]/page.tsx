import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLetter, LETTERS } from "@/lib/letters";
import { pickText } from "@/lib/letters/types";
import LetterExperience from "@/components/letra/LetterExperience";

// Pre-genera la ruta de cada letra registrada (hoy: alef).
export function generateStaticParams() {
  return Object.keys(LETTERS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const data = getLetter(slug);
  if (!data) return { title: "Jashmal" };
  const name = pickText(data.nameTranslit, locale);
  return {
    title: `${name} (${data.letter}) — Jashmal`,
    description: `La letra ${name}: nombre, forma y número. Una experiencia inmersiva.`,
  };
}

export default async function LetraPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const data = getLetter(slug);
  if (!data) notFound();
  return <LetterExperience data={data} />;
}
