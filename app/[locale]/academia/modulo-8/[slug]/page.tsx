import { notFound } from "next/navigation";
import { getLesson8 } from "@/lib/academia/modulo8";
import LeccionView8 from "@/components/academia/LeccionView8";

export default async function LeccionPage8({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLesson8(slug);
  if (!lesson) notFound();

  return (
    <div className="always-dark min-h-screen" style={{ background: "#05050a" }}>
      <LeccionView8 lesson={lesson} />
    </div>
  );
}
