import MisterioTutor from "@/components/MisterioTutor";
import MisterioTranslationNotice from "@/components/MisterioTranslationNotice";

// Layout de las páginas de misterio: añade el tutor flotante a todas
// (/misterio/358, /26, /linaje, /habakuk...) sin repetirlo en cada una, y el
// aviso honesto de traducción (banner cuando el idioma activo —hoy inglés— no
// tiene versión del estudio, en vez de mostrar español silencioso).
export default function MisterioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MisterioTranslationNotice />
      {children}
      <MisterioTutor />
    </>
  );
}
