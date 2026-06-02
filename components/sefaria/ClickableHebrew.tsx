"use client";

import React, { useRef } from "react";

export interface WordAnchor {
  word: string;
  x: number;
  y: number;
  top: number;
}

export interface WordMenuAnchorEvt {
  word: string;
  x: number;
  y: number;
}

interface ClickableHebrewProps {
  text: string;
  onWord: (anchor: WordAnchor) => void;
  onWordMenu?: (anchor: WordMenuAnchorEvt) => void; // clic derecho / long-press
  className?: string;
}

// Parte un segmento hebreo en palabras pulsables.
// Toque/clic izquierdo → abre el léxico (WordAnchor con posición para popup).
// Clic derecho (escritorio) o mantener presionado (móvil) → menú contextual.
export default function ClickableHebrew({
  text,
  onWord,
  onWordMenu,
  className,
}: ClickableHebrewProps) {
  const tokens = text.split(/(\s+|־)/);

  // Estado del long-press (un solo toque a la vez).
  const lpTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lpFired = useRef(false);
  const lpStart = useRef<{ x: number; y: number } | null>(null);

  function handleLeft(e: React.MouseEvent<HTMLButtonElement>, tok: string) {
    // Si venimos de un long-press (móvil), no abrir el léxico: ya se abrió el menú.
    if (lpFired.current) {
      lpFired.current = false;
      return;
    }
    const r = e.currentTarget.getBoundingClientRect();
    onWord({ word: tok, x: r.left + r.width / 2, y: r.bottom, top: r.top });
  }

  function handleRight(e: React.MouseEvent<HTMLButtonElement>, tok: string) {
    e.preventDefault(); // evitar el menú nativo del sistema
    onWordMenu?.({ word: tok, x: e.clientX, y: e.clientY });
  }

  // ── Soporte táctil (móvil): mantener presionado abre el menú ──
  function handleTouchStart(e: React.TouchEvent<HTMLButtonElement>, tok: string) {
    if (!onWordMenu) return;
    lpFired.current = false;
    const touch = e.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;
    lpStart.current = { x, y };
    lpTimer.current = setTimeout(() => {
      lpFired.current = true;
      onWordMenu({ word: tok, x, y });
      // Vibración corta como feedback (donde el dispositivo lo soporte).
      try { navigator.vibrate?.(12); } catch { /* noop */ }
    }, 450);
  }

  function handleTouchMove(e: React.TouchEvent<HTMLButtonElement>) {
    // Si el dedo se mueve (scroll), cancelar el long-press.
    if (!lpStart.current) return;
    const touch = e.touches[0];
    const dx = Math.abs(touch.clientX - lpStart.current.x);
    const dy = Math.abs(touch.clientY - lpStart.current.y);
    if (dx > 10 || dy > 10) {
      if (lpTimer.current) clearTimeout(lpTimer.current);
    }
  }

  function handleTouchEnd() {
    if (lpTimer.current) clearTimeout(lpTimer.current);
    lpStart.current = null;
  }

  return (
    <p className={className}>
      {tokens.map((tok, i) => {
        if (!tok || /^\s+$/.test(tok) || tok === "־") {
          return <React.Fragment key={i}>{tok}</React.Fragment>;
        }
        if (!/[א-ת]/.test(tok)) {
          return <React.Fragment key={i}>{tok}</React.Fragment>;
        }
        return (
          <button
            key={i}
            type="button"
            onClick={(e) => handleLeft(e, tok)}
            onContextMenu={(e) => handleRight(e, tok)}
            onTouchStart={(e) => handleTouchStart(e, tok)}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            // Evitar el menú de selección/copia nativo de iOS/Android al mantener presionado.
            style={{ WebkitTouchCallout: "none", WebkitUserSelect: "none", userSelect: "none" }}
            className="cursor-pointer rounded transition-colors hover:bg-gold/15 hover:text-gold-soft"
            title={tok}
          >
            {tok}
          </button>
        );
      })}
    </p>
  );
}
