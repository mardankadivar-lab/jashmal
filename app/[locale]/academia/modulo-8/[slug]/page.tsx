import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLesson8, MODULO8 } from "@/lib/academia/modulo8";
import LeccionView8 from "@/components/academia/LeccionView8";

type Params = Promise<{ locale: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLesson8(slug);
  if (!lesson) return {};
  return {
    title: `${lesson.title} · ${MODULO8.titulo} · Jashmal`,
    description: lesson.apertura.question,
    openGraph: {
      title: `${lesson.title} · Jashmal Academia`,
      description: lesson.apertura.question,
      type: "article",
    },
  };
}

export default async function LeccionPage8({ params }: { params: Params }) {
  const { slug } = await params;
  const lesson = getLesson8(slug);
  if (!lesson) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: lesson.title,
    description: lesson.apertura.question,
    educationalLevel: "intermediate",
    learningResourceType: "lesson",
    inLanguage: "es",
    isPartOf: {
      "@type": "Course",
      name: `${MODULO8.titulo} · Jashmal Academia`,
      provider: { "@type": "Organization", name: "Jashmal", url: "https://jashmal.org" },
    },
  };

  return (
    <div className="always-dark min-h-screen" style={{ background: "#05050a" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LeccionView8 lesson={lesson} />
    </div>
  );
}
