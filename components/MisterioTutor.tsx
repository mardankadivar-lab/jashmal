"use client";

import { usePathname } from "next/navigation";
import StudyChat from "@/components/study/StudyChat";
import { MISTERIOS } from "@/lib/content/misterios";

// Tutor flotante para las páginas de Misterios. Detecta qué misterio se está
// leyendo (por la URL) y le pasa ese contexto al tutor, para que sus respuestas
// sean relevantes a la página. Si no es un misterio concreto, contexto general.
export default function MisterioTutor() {
  const pathname = usePathname(); // ej. /es/misterio/habakuk
  const slug = pathname.split("/").filter(Boolean).pop() ?? "";
  const m = MISTERIOS.find((x) => x.slug === slug);
  const ref = m
    ? `${m.titulo} (${m.he}) — un misterio de Cabalá publicado en Jashmal. ${m.gancho}`
    : "los Misterios de Jashmal (estudios de Cabalá: gematría, Zohar, paradojas)";
  return <StudyChat studyRef={ref} />;
}
