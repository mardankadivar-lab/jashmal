import SiteHeader from "@/components/SiteHeader";
import EspejoDelAlma from "@/components/conocete/EspejoDelAlma";

// מַרְאָה — El Espejo del Alma — autoconocimiento guiado por TEXTO, SIN foto.
// 4 preguntas → rasgo-tema dominante con su fuente verificada (Zohar Yitró /
// Rabbeinu Bachya). Tendencias, NUNCA destino. Contenido verificado por el Sofer
// en docs/specs/espejo-del-alma.md (transcrito en lib/content/autoconocimiento.ts).
export default function EspejoDelAlmaPage() {
  return (
    <>
      <SiteHeader />
      <EspejoDelAlma />
    </>
  );
}
