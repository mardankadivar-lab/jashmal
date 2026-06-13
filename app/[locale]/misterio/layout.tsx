import MisterioTutor from "@/components/MisterioTutor";
import MisterioTranslationNotice from "@/components/MisterioTranslationNotice";
import SelloSofer from "@/components/SelloSofer";

// Layout de las páginas de misterio: añade a TODAS (/misterio/358, /26, /linaje,
// /habakuk…) sin repetir en cada una:
//  · el aviso honesto de traducción (banner cuando el idioma activo no tiene
//    versión del estudio, en vez de mostrar español silencioso);
//  · el sello "Verificado por el Sofer" — la ventaja de Jashmal (cada gematría
//    y cada fuente se comprueba) hecha visible. Flota discreto abajo a la
//    izquierda (el tutor vive abajo a la derecha, así no chocan) y enlaza a
//    /como-verificamos;
//  · el tutor flotante.
export default function MisterioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MisterioTranslationNotice />
      {children}
      {/* Sello del Sofer: fijo, discreto, abajo a la izquierda. Oculto en
          pantallas muy pequeñas para no tapar el texto; visible desde sm. */}
      <div className="pointer-events-none fixed bottom-4 left-4 z-30 hidden sm:block">
        <div className="pointer-events-auto">
          <SelloSofer variant="badge" />
        </div>
      </div>
      <MisterioTutor />
    </>
  );
}
