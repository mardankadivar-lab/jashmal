import { notFound } from "next/navigation";
import { getLesson9 } from "@/lib/academia/modulo9";
import LeccionView9 from "@/components/academia/LeccionView9";

export default async function Leccion9Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLesson9(slug);
  if (!lesson) notFound();

  return (
    <div className="always-dark min-h-screen" style={{ background: "#05050a" }}>
      <LeccionView9 lesson={lesson} />
    </div>
  );
}
