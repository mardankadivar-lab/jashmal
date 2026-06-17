import { notFound } from "next/navigation";
import { getLesson10 } from "@/lib/academia/modulo10";
import LeccionView10 from "@/components/academia/LeccionView10";

export default async function Leccion10Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLesson10(slug);
  if (!lesson) notFound();

  return (
    <div className="always-dark min-h-screen" style={{ background: "#05050a" }}>
      <LeccionView10 lesson={lesson} />
    </div>
  );
}
