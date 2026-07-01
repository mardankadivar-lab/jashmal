"use client";

// ════════════════════════════════════════════════════════════════════════════
//  PANEL LATERAL DE MISTERIO — contenido ESTÁTICO (no genera nada con Claude)
// ────────────────────────────────────────────────────────────────────────────
//  Cuando un enlace dorado {{study:slug|texto}} dentro de uno de los 18
//  misterios que comparten la plantilla EstudioMisterio/EstudioData apunta a
//  OTRO de esos 18, este panel muestra su contenido ya escrito sin abandonar
//  la página. Mismo contenedor/estilo que components/study/ConceptPanel.tsx
//  (panel lateral con overlay + historial tipo pila + botón "Volver"), pero
//  SIN pedirle nada a Claude: es la misma plantilla EstudioMisterio, montada
//  en modo `embedded` (sin su nav/CTA/footer de página completa).
//
//  Para los otros ~29 misterios a mano y todo /letra/*, este panel NUNCA se
//  usa — siguen navegando a página completa con <Link>, sin cambios (ver
//  lib/content/studyLinks.tsx).
// ════════════════════════════════════════════════════════════════════════════

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import EstudioMisterio from "./EstudioMisterio";
import { getMisterioParaPanel } from "@/lib/content/misteriosPanel";
import { getMisterio } from "@/lib/content/misterios";

interface MisterioPanelProps {
  slug: string | null;
  onClose: () => void;
  onBack?: () => void;       // volver al panel anterior (existe si hay historial)
  historyDepth?: number;     // cuántos paneles hay debajo (para el indicador)
  onOpenPanel: (slug: string) => void; // abrir otro misterio del panel (apila)
}

export default function MisterioPanel({
  slug,
  onClose,
  onBack,
  historyDepth = 0,
  onOpenPanel,
}: MisterioPanelProps) {
  const locale = useLocale();
  const fa = locale === "fa";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!!slug);
  }, [slug]);

  // Escape: si hay historial, ir atrás; si no, cerrar. (Igual que ConceptPanel.)
  useEffect(() => {
    if (!slug) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onBack ? onBack() : onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slug, onBack, onClose]);

  if (!slug) return null;

  const data = getMisterioParaPanel(slug);
  const catalogo = getMisterio(slug);
  const titulo = catalogo ? (fa ? catalogo.tituloFa : catalogo.titulo) : slug;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
      {/* Fondo: si hay historial, clic en fondo = volver (no cerrar todo) */}
      <button
        className="absolute inset-0 bg-black/60"
        onClick={onBack ?? onClose}
        aria-label={onBack ? "Volver" : "Cerrar"}
      />

      <div
        className="relative z-10 h-full w-full max-w-lg overflow-y-auto border-s border-gold/25 bg-ink p-6 shadow-2xl transition-opacity duration-200"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {/* Cabecera con navegación de stack (igual patrón que ConceptPanel) */}
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-gold"
              >
                ← <span className="font-cinzel uppercase tracking-wide">{fa ? "بازگشت" : "Volver"}</span>
                {historyDepth > 1 && (
                  <span className="rounded-full bg-gold/15 px-1.5 py-0.5 text-gold/70">
                    {historyDepth}
                  </span>
                )}
              </button>
            )}
            <h2 className="font-cinzel text-lg text-gold">{titulo}</h2>
          </div>
          {/* Cerrar todo */}
          <button
            onClick={onClose}
            className="shrink-0 rounded-full border border-gold/30 px-3 py-1 text-sm text-muted transition-colors hover:text-gold"
            title={fa ? "بستن" : "Cerrar todo"}
          >
            {fa ? "بستن" : "Cerrar"}
          </button>
        </div>

        {data ? (
          <EstudioMisterio data={data} embedded onOpenPanel={onOpenPanel} />
        ) : (
          <p className="mt-8 text-sm text-red-400/80">
            {fa ? "این محتوا در دسترس نیست." : "Este contenido no está disponible."}
          </p>
        )}
      </div>
    </div>
  );
}
