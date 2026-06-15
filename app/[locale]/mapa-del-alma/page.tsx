import SiteHeader from "@/components/SiteHeader";
import MapaDelAlma from "@/components/conocete/MapaDelAlma";

// מַרְאָה / Mapa del Alma — gematría del nombre + mes hebreo → mazal como MAPA
// SIMBÓLICO de avodá. Nunca destino. Sin foto. Contenido verificado por el Sofer
// en docs/specs/mazal-mapa-del-alma.md (transcrito en lib/content/autoconocimiento.ts).
export default function MapaDelAlmaPage() {
  return (
    <>
      <SiteHeader />
      <MapaDelAlma />
    </>
  );
}
