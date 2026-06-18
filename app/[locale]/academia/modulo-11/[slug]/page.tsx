import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLesson11, MODULO11 } from "@/lib/academia/modulo11";
import LeccionView11 from "@/components/academia/LeccionView11";

type Params = Promise<{ locale: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLesson11(slug);
  if (!lesson) return {};
  return {
    title: `${lesson.title} · ${MODULO11.titulo} · Jashmal`,
    description: lesson.apertura.question,
    openGraph: {
      title: `${lesson.title} · Jashmal Academia`,
      description: lesson.apertura.question,
      type: "article",
    },
  };
}

export default async function Leccion11Page({ params }: { params: Params }) {
  const { slug } = await params;
  const lesson = getLesson11(slug);
  if (!lesson) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: lesson.title,
    description: lesson.apertura.question,
    educationalLevel: "advanced",
    learningResourceType: "lesson",
    inLanguage: "es",
    isPartOf: {
      "@type": "Course",
      name: `${MODULO11.titulo} · Jashmal Academia`,
      provider: { "@type": "Organization", name: "Jashmal", url: "https://jashmal.org" },
    },
  };

  return (
    <div className="always-dark min-h-screen" style={{ background: "#05050a" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LeccionView11 lesson={lesson} />
    </div>
  );
}
