// app/[locale]/academia/trece-middot/page.tsx
// Página SUELTA de la Academia (como javer-inicio, lista-de-espera o
// shoel-completo): no entra en la escalera de módulos, no se desbloquea y no
// pide sesión. Es una lectura de referencia sobre las trece reglas de
// hermenéutica de Rabí Ishmael.
//
// Página delgada a propósito: el contenido vive en ./data.ts (escrito y
// cotejado por el Sofer) y la presentación en el componente de la vista.
import TreceMiddotView from "@/components/academia/TreceMiddotView";

export const metadata = {
  title: "Las trece reglas de Rabí Ishmael · Academia Jashmal",
  description:
    "Las trece medidas por las que se interpreta la Torá, una por una, con su ejemplo en la fuente y marcadas según lo que cada una hace: diez derivan ley, dos son modos de leer y dos quedan a caballo.",
};

export default function TreceMiddotPagina() {
  return <TreceMiddotView />;
}
