import { notFound } from "next/navigation";
import { getLesson7 } from "@/lib/academia/modulo7";
import LeccionView7 from "@/components/academia/LeccionView7";

export default async function Leccion7Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLesson7(slug);
  if (!lesson) notFound();

  return (
    <div className="always-dark min-h-screen" style={{ background: "#05050a" }}>
      <LeccionView7 lesson={lesson} />
    </div>
  );
}
