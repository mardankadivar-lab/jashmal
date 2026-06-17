import { notFound } from "next/navigation";
import { getLesson6 } from "@/lib/academia/modulo6";
import LeccionView6 from "@/components/academia/LeccionView6";

export default async function Leccion6Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLesson6(slug);
  if (!lesson) notFound();

  return (
    <div className="always-dark min-h-screen" style={{ background: "#05050a" }}>
      <LeccionView6 lesson={lesson} />
    </div>
  );
}
