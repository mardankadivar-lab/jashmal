import { notFound } from "next/navigation";
import { getLesson5 } from "@/lib/academia/modulo5";
import LeccionView5 from "@/components/academia/LeccionView5";

export default async function Leccion5Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLesson5(slug);
  if (!lesson) notFound();

  return (
    <div className="always-dark min-h-screen" style={{ background: "#05050a" }}>
      <LeccionView5 lesson={lesson} />
    </div>
  );
}
