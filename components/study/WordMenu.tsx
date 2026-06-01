"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

export interface WordMenuAnchor {
  word: string;
  x: number; // posición horizontal del menú
  y: number; // posición vertical del menú
}

interface WordMenuProps {
  anchor: WordMenuAnchor | null;
  onClose: () => void;
  onLexicon: (word: string) => void;
  onChat: (word: string) => void;
}

// Mini menú contextual (clic derecho) sobre palabras hebreas.
// Da a elegir entre abrir el léxico o preguntar al tutor de chat.
export default function WordMenu({ anchor, onClose, onLexicon, onChat }: WordMenuProps) {
  const t = useTranslations("wordMenu");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!anchor) return;
    const close = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const closeKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", closeKey);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", closeKey);
    };
  }, [anchor, onClose]);

  if (!anchor) return null;

  // Clamp al viewport para que no se salga de pantalla.
  const MENU_W = 180;
  const vw = typeof window !== "undefined" ? window.innerWidth : 800;
  const left = Math.min(anchor.x, vw - MENU_W - 8);
  const top = anchor.y + 6;

  return (
    <div
      ref={menuRef}
      className="fixed z-50 min-w-[180px] rounded-xl border border-gold/25 bg-ink/95 py-1 shadow-2xl backdrop-blur-md"
      style={{ left, top }}
      role="menu"
    >
      {/* La palabra seleccionada */}
      <div className="border-b border-gold/10 px-3 py-1.5">
        <span className="hebrew text-lg text-gold">{anchor.word}</span>
      </div>

      <button
        role="menuitem"
        onClick={() => { onLexicon(anchor.word); onClose(); }}
        className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-parchment/90 transition-colors hover:bg-gold/10 hover:text-gold"
      >
        <span>📖</span>
        <span>{t("lexicon")}</span>
      </button>

      <button
        role="menuitem"
        onClick={() => { onChat(anchor.word); onClose(); }}
        className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-parchment/90 transition-colors hover:bg-gold/10 hover:text-gold"
      >
        <span>💬</span>
        <span>{t("askTutor")}</span>
      </button>
    </div>
  );
}
