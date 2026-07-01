"use client";

// ════════════════════════════════════════════════════════════════════════════
//  Envoltorio: EstudioMisterio (página completa) + su panel lateral.
// ────────────────────────────────────────────────────────────────────────────
//  Usado SOLO por las 16 páginas de /misterio/{slug}/page.tsx que ya usan la
//  plantilla EstudioMisterio/EstudioData top-level (ver
//  lib/content/misteriosPanel.ts para la lista exacta). Sustituye el antiguo
//  `<EstudioMisterio data={data} />` de cada page.tsx por
//  `<EstudioMisterioConPanel data={data} />` — mismo render de página completa,
//  más el estado de historial tipo pila para abrir OTROS misterios de la
//  lista en un panel lateral sin perder el estudio actual.
//
//  Los ~29 misterios a mano y /letra/* NO usan este wrapper: siguen
//  navegando a página completa con <Link>, sin cambios.
// ════════════════════════════════════════════════════════════════════════════

import { useState } from "react";
import EstudioMisterio, { type EstudioData } from "./EstudioMisterio";
import MisterioPanel from "./MisterioPanel";

export default function EstudioMisterioConPanel({ data }: { data: EstudioData }) {
  // Pila de slugs abiertos en el panel. El último es el visible; los
  // anteriores quedan "debajo" para el botón Volver (igual patrón que
  // conceptHistory/conceptTarget en components/study/StudyEngine.tsx).
  const [panelStack, setPanelStack] = useState<string[]>([]);

  function openPanel(slug: string) {
    setPanelStack((stack) => [...stack, slug]);
  }
  function backPanel() {
    setPanelStack((stack) => stack.slice(0, -1));
  }
  function closePanel() {
    setPanelStack([]);
  }

  const current = panelStack[panelStack.length - 1] ?? null;

  return (
    <>
      <EstudioMisterio data={data} onOpenPanel={openPanel} />
      <MisterioPanel
        slug={current}
        onClose={closePanel}
        onBack={panelStack.length > 1 ? backPanel : undefined}
        historyDepth={panelStack.length - 1}
        onOpenPanel={openPanel}
      />
    </>
  );
}
