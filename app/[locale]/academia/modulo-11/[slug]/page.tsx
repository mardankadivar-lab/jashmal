import { notFound } from "next/navigation";
import { getLesson11 } from "@/lib/academia/modulo11";
import LeccionView11 from "@/components/academia/LeccionView11";

export default async function Leccion11Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLesson11(slug);
  if (!lesson) notFound();

  return (
    <div className="always-dark min-h-screen" style={{ background: "#05050a" }}>
      <LeccionView11 lesson={lesson} />
    </div>
  );
}
