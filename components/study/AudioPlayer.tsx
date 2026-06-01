"use client";

import { useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

interface AudioPlayerProps {
  study: string;
}

// Botón de audio: genera síntesis limpia con Claude y la narra con ElevenLabs.
// Diseñado para estudiar en el auto o sin mirar la pantalla.
export default function AudioPlayer({ study }: AudioPlayerProps) {
  const locale = useLocale();
  const t = useTranslations("audio");
  const audioRef = useRef<HTMLAudioElement>(null);

  const [state, setState] = useState<"idle" | "loading" | "playing" | "paused" | "error">("idle");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  async function generate() {
    setState("loading");
    try {
      const res = await fetch("/api/audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ study, locale }),
      });

      if (!res.ok) {
        setState("error");
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);

      // Reproducir automáticamente cuando carga.
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.src = url;
          audioRef.current.play();
          setState("playing");
        }
      }, 50);
    } catch {
      setState("error");
    }
  }

  function togglePlay() {
    if (!audioRef.current || !audioUrl) return;
    if (state === "playing") {
      audioRef.current.pause();
      setState("paused");
    } else {
      audioRef.current.play();
      setState("playing");
    }
  }

  function handleEnded() {
    setState("paused");
  }

  return (
    <div className="mt-6 flex items-center gap-3 rounded-lg border border-gold/20 bg-gold/[0.04] p-3">
      <audio ref={audioRef} onEnded={handleEnded} className="hidden" />

      {/* Botón principal */}
      {state === "idle" && (
        <button
          onClick={generate}
          className="flex items-center gap-2 rounded-full border border-gold/50 px-4 py-2 text-sm text-gold transition-all hover:bg-gold/10"
        >
          <span>🎧</span>
          <span className="font-cinzel text-xs uppercase tracking-widest">{t("listen")}</span>
        </button>
      )}

      {state === "loading" && (
        <div className="flex items-center gap-2 text-sm text-muted">
          <span className="animate-spin">⏳</span>
          <span className="animate-pulse text-xs">{t("generating")}</span>
        </div>
      )}

      {(state === "playing" || state === "paused") && (
        <>
          <button
            onClick={togglePlay}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/50 text-gold transition-all hover:bg-gold/10"
            aria-label={state === "playing" ? t("pause") : t("play")}
          >
            {state === "playing" ? "⏸" : "▶"}
          </button>
          {audioUrl && (
            <audio
              controls
              src={audioUrl}
              className="h-8 flex-1 opacity-70"
              onPlay={() => setState("playing")}
              onPause={() => setState("paused")}
            />
          )}
          <a
            href={audioUrl ?? "#"}
            download="jashmal-estudio.mp3"
            className="text-xs text-muted transition-colors hover:text-gold"
            title={t("download")}
          >
            ⬇
          </a>
        </>
      )}

      {state === "error" && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-red-400/80">{t("error")}</span>
          <button onClick={generate} className="text-xs text-gold hover:underline">
            {t("retry")}
          </button>
        </div>
      )}

      {state === "idle" && (
        <p className="text-xs text-muted/70">{t("hint")}</p>
      )}
    </div>
  );
}
