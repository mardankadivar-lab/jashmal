import { notFound } from "next/navigation";
import { getLesson } from "@/lib/academia/modulo1";
import LeccionView from "@/components/academia/LeccionView";

export default async function LeccionPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();

  return (
    <div className="always-dark min-h-screen" style={{ background: "#05050a" }}>
      <LeccionView lesson={lesson} />
    </div>
  );
}
