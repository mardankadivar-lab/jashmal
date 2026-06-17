import { notFound } from "next/navigation";
import { getLesson4 } from "@/lib/academia/modulo4";
import LeccionView4 from "@/components/academia/LeccionView4";

export default async function Leccion4Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLesson4(slug);
  if (!lesson) notFound();

  return (
    <div className="always-dark min-h-screen" style={{ background: "#05050a" }}>
      <LeccionView4 lesson={lesson} />
    </div>
  );
}
