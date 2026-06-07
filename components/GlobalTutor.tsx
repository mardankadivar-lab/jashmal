"use client";

import { usePathname } from "next/navigation";
import StudyChat from "@/components/study/StudyChat";

// Idiomas del sitio (para quitar el prefijo de locale de la ruta).
const LOCALES = ["es", "fa", "en"];

// Páginas que YA montan su propio tutor (con contexto o cableado especial) y
// por eso NO deben llevar el tutor global, para no duplicarlo:
//  · /estudio   → el motor de estudio monta su StudyChat (con "preguntar sobre
//                 esta palabra" desde el texto seleccionado)
//  · /misterio* → el layout de misterios monta MisterioTutor
//  · /misterios y /gematrias → montan MisterioTutor
//  · /admin*    → panel interno, sin tutor
function selfMountsTutor(seg: string): boolean {
  return (
    seg === "estudio" ||
    seg === "misterio" ||
    seg === "misterios" ||
    seg === "gematrias" ||
    seg === "admin"
  );
}

// Describe en lenguaje sencillo DÓNDE está el estudiante, para que el tutor dé
// respuestas relevantes a esa página. (El "no hace falta saber hebreo" vive en
// el system prompt de /api/chat, así aplica a TODOS los tutores por igual.)
function contextFor(seg: string, sub: string): string {
  switch (seg) {
    case "":
      return "la página principal de Jashmal (estudio de Torá y Cabalá)";
    // "mente-cosmica" (es) y "cosmic-mind" (en/fa) son la MISMA página: la URL
    // cambia por idioma (pathnames localizados de next-intl), el contexto no.
    case "mente-cosmica":
    case "cosmic-mind":
      return 'el "Universo del Conocimiento" de Jashmal: un mapa cósmico donde cada estrella es un concepto de Torá o Cabalá y las líneas conectan estudios entre sí';
    case "letras":
      return sub
        ? `la letra hebrea "${sub}" — su forma, su nombre, su valor de gematría (el número de la letra) y su "canal de consciencia" según Rav Ginsburgh`
        : "el alfabeto hebreo: las 22 letras como canales de la creación";
    case "comunidad":
      return "la Comunidad de Jashmal, donde los estudiantes comparten sus jidushim (ideas o revelaciones nuevas de Torá) y un Sofer (editor-erudito) las revisa";
    case "arbol":
      return "el Árbol de la Vida: las diez sefirot (atributos divinos) de la Cabalá";
    case "atlas":
      return "el Atlas de estudios de Jashmal";
    case "creacion":
      return 'el estudio del Maasé Bereshit (la "obra de la Creación", el principio del mundo)';
    case "acerca":
      return 'la página "Acerca de" Jashmal';
    default:
      return "Jashmal, una plataforma de estudio de Torá y Cabalá";
  }
}

// Tutor flotante GLOBAL: aparece en todas las páginas (salvo las que ya tienen
// el suyo). Detecta la página por la URL y le pasa ese contexto al tutor, para
// que el estudiante pueda preguntar el significado de cualquier término sin
// tener que saber hebreo.
export default function GlobalTutor() {
  const pathname = usePathname(); // p. ej. /es/mente-cosmica, /fa/letras/bet, /es
  const all = pathname.split("/").filter(Boolean);
  const rest = LOCALES.includes(all[0]) ? all.slice(1) : all;
  const seg = rest[0] ?? "";
  const sub = rest[1] ?? "";

  if (selfMountsTutor(seg)) return null; // evita tutor doble

  return <StudyChat studyRef={contextFor(seg, sub)} />;
}
