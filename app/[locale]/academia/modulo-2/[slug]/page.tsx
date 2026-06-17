import { notFound } from "next/navigation";
import { getLesson2 } from "@/lib/academia/modulo2";
import LeccionView2 from "@/components/academia/LeccionView2";

export default async function Leccion2Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLesson2(slug);
  if (!lesson) notFound();

  return (
    <div className="always-dark min-h-screen" style={{ background: "#05050a" }}>
      <LeccionView2 lesson={lesson} />
    </div>
  );
}
