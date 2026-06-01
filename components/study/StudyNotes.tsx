"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

interface StudyNotesProps {
  studyRef: string; // clave para localStorage (por texto)
}

// Bloc de notas personal: el estudiante anota mientras estudia.
// Se guarda en localStorage por studyRef (persistente entre recargas).
export default function StudyNotes({ studyRef }: StudyNotesProps) {
  const t = useTranslations("notes");
  const storageKey = `jashmal-notes:${studyRef}`;
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Cargar notas guardadas al abrir.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) setText(stored);
      else setText("");
    } catch {
      setText("");
    }
  }, [storageKey]);

  // Guardado automático (debounce 1.5s).
  function handleChange(val: string) {
    setText(val);
    setSaved(false);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(storageKey, val);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } catch {
        /* cuota de storage llena */
      }
    }, 1500);
  }

  function toggle() {
    setOpen((o) => {
      if (!o) setTimeout(() => textareaRef.current?.focus(), 80);
      return !o;
    });
  }

  const hasNotes = text.trim().length > 0;

  return (
    <div className="mt-6">
      <button
        onClick={toggle}
        className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-gold"
      >
        <span>{hasNotes ? "📝" : "🖊️"}</span>
        <span className="font-cinzel text-xs uppercase tracking-widest">
          {t("toggle")}
          {hasNotes && (
            <span className="ms-1.5 inline-flex h-1.5 w-1.5 rounded-full bg-gold align-middle" />
          )}
        </span>
        <span className="text-gold/50">{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="mt-2 rounded-lg border border-gold/20 bg-gold/[0.03]">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={t("placeholder")}
            rows={5}
            className="w-full resize-y rounded-lg bg-transparent p-3 text-sm leading-relaxed text-parchment/90 placeholder:text-muted/60 focus:outline-none"
          />
          <div className="flex items-center justify-between border-t border-gold/10 px-3 py-1.5 text-xs text-muted/70">
            <span>{t("local")}</span>
            {saved && <span className="text-gold/70">{t("saved")}</span>}
            {text.trim() && !saved && (
              <span className="animate-pulse">{t("saving")}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
