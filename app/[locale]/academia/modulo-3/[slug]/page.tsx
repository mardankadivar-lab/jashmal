import { notFound } from "next/navigation";
import { getLesson3 } from "@/lib/academia/modulo3";
import LeccionView3 from "@/components/academia/LeccionView3";

export default async function Leccion3Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLesson3(slug);
  if (!lesson) notFound();

  return (
    <div className="always-dark min-h-screen" style={{ background: "#05050a" }}>
      <LeccionView3 lesson={lesson} />
    </div>
  );
}
