"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { noteFor, saveNote, deleteNote, isCuadernoSynced } from "@/lib/study/cuaderno";

interface VerseNoteEditorProps {
  refBase: string;
  verse: number;
  onChanged?: () => void;
  onClose?: () => void;
  autoFocus?: boolean;
}

// Editor de la nota de UN versículo: escribir / editar / borrar, guardado
// automático en localStorage (debounce). Se usa igual en escritorio (margen) y
// en móvil (expandido bajo el versículo).
export default function VerseNoteEditor({
  refBase,
  verse,
  onChanged,
  onClose,
  autoFocus = true,
}: VerseNoteEditorProps) {
  const t = useTranslations("cuaderno");
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);
  const [synced, setSynced] = useState(false);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const existing = noteFor(refBase, verse);
    setText(existing?.text ?? "");
    if (autoFocus) setTimeout(() => taRef.current?.focus(), 60);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refBase, verse]);

  // Reflejar si el cuaderno está ligado a la cuenta (se resuelve tras la
  // hidratación, que emite "jashmal:cuaderno"). Sin sesión → guardado local.
  useEffect(() => {
    const refresh = () => setSynced(isCuadernoSynced());
    refresh();
    window.addEventListener("jashmal:cuaderno", refresh);
    return () => window.removeEventListener("jashmal:cuaderno", refresh);
  }, []);

  function persist(val: string) {
    saveNote(refBase, verse, val);
    setSaved(true);
    onChanged?.();
    setTimeout(() => setSaved(false), 1800);
  }

  function handleChange(val: string) {
    setText(val);
    setSaved(false);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => persist(val), 900);
  }

  function handleDelete() {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    deleteNote(refBase, verse);
    setText("");
    onChanged?.();
    onClose?.();
  }

  return (
    <div className="rounded-lg border border-gold/25 bg-gold/[0.04]">
      <div className="flex items-center justify-between border-b border-gold/10 px-3 py-1.5">
        <span className="font-cinzel text-[10px] uppercase tracking-widest text-gold/70">
          {t("noteTitle", { n: verse + 1 })}
        </span>
        {onClose && (
          <button
            onClick={onClose}
            aria-label={t("close")}
            className="text-muted transition-colors hover:text-gold"
          >
            ×
          </button>
        )}
      </div>
      <textarea
        ref={taRef}
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={() => { if (saveTimer.current) { clearTimeout(saveTimer.current); persist(text); } }}
        placeholder={t("notePlaceholder")}
        rows={3}
        className="w-full resize-y rounded-b-lg bg-transparent p-3 text-sm leading-relaxed text-parchment/90 placeholder:text-muted/55 focus:outline-none"
      />
      <div className="flex items-center justify-between border-t border-gold/10 px-3 py-1.5 text-[11px] text-muted/70">
        <span>{synced ? t("syncedAccount") : t("local")}</span>
        <span className="flex items-center gap-3">
          {saved && <span className="text-gold/70">{t("saved")}</span>}
          {text.trim() && (
            <button
              onClick={handleDelete}
              className="text-muted/70 transition-colors hover:text-red-400/80"
            >
              {t("deleteNote")}
            </button>
          )}
        </span>
      </div>
    </div>
  );
}
