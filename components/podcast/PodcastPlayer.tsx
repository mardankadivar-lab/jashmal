"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reproductor de audio nativo del podcast.
 * Sin librerías: <audio> + botón play/pausa dorado + barra de progreso + tiempo.
 * Los mp3 se auto-hospedan en /audio/podcast/ (Spotify no funciona en Irán).
 */
export default function PodcastPlayer({
  src,
  durationSec,
  playLabel,
  pauseLabel,
}: {
  src: string;
  durationSec: number;
  playLabel: string;
  pauseLabel: string;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  // Duración real del archivo cuando el navegador la conoce; mientras tanto,
  // la del catálogo (para pintar el total sin esperar la descarga).
  const [duration, setDuration] = useState(durationSec);

  // Pausar este reproductor si otro episodio empieza a sonar.
  useEffect(() => {
    const onOtherPlay = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (detail !== src) {
        audioRef.current?.pause();
      }
    };
    window.addEventListener("jashmal:podcast-play", onOtherPlay);
    return () => window.removeEventListener("jashmal:podcast-play", onOtherPlay);
  }, [src]);

  function fmt(sec: number): string {
    if (!Number.isFinite(sec)) return "0:00";
    const s = Math.max(0, Math.round(sec));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}:${r.toString().padStart(2, "0")}`;
  }

  function toggle() {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      window.dispatchEvent(new CustomEvent("jashmal:podcast-play", { detail: src }));
      void a.play();
    } else {
      a.pause();
    }
  }

  function seek(value: number) {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = value;
    setCurrent(value);
  }

  return (
    <div className="mt-4 flex items-center gap-3" dir="ltr">
      <audio
        ref={audioRef}
        src={src}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => {
          const d = e.currentTarget.duration;
          if (Number.isFinite(d) && d > 0) setDuration(d);
        }}
      />

      {/* Botón play/pausa dorado */}
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? pauseLabel : playLabel}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold transition-all hover:bg-gold/10"
        style={{ boxShadow: "0 0 18px rgba(201,164,62,0.25)" }}
      >
        {playing ? (
          // pausa
          <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
            <rect x="1" y="0" width="4" height="16" rx="1" />
            <rect x="9" y="0" width="4" height="16" rx="1" />
          </svg>
        ) : (
          // play (triángulo, ligeramente descentrado para verse óptico-centrado)
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="ml-0.5">
            <path d="M3 1.5v13a1 1 0 0 0 1.53.85l10.2-6.5a1 1 0 0 0 0-1.7L4.53.65A1 1 0 0 0 3 1.5Z" />
          </svg>
        )}
      </button>

      {/* Tiempo actual · barra · duración */}
      <span className="w-11 shrink-0 text-right font-mono text-xs tabular-nums text-muted">
        {fmt(current)}
      </span>
      <input
        type="range"
        min={0}
        max={Math.max(1, Math.floor(duration))}
        step={1}
        value={Math.min(current, duration)}
        onChange={(e) => seek(Number(e.target.value))}
        aria-label={`${fmt(current)} / ${fmt(duration)}`}
        className="h-1 w-full cursor-pointer appearance-auto"
        style={{ accentColor: "#c9a43e" }}
      />
      <span className="w-11 shrink-0 font-mono text-xs tabular-nums text-muted">
        {fmt(duration)}
      </span>
    </div>
  );
}
