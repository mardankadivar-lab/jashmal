"use client";

import { useEffect, useRef, useState } from "react";

// Video loop cinematográfico de fondo del hero (chispas doradas, 8s).
// - Es la capa MÁS BAJA del hero: las partículas Nitzotzot viven ENCIMA.
// - Respeta prefers-reduced-motion: si está activo, solo se muestra el poster.
// - El poster es también el fallback natural si el video no carga.
// - Decorativo puro: aria-hidden, sin texto (no toca i18n ni RTL).

const VIDEO_SRC = "/videos/hero-nitzotzot.mp4";
const POSTER_SRC = "/videos/hero-nitzotzot-poster.jpg";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  // null = aún no sabemos (SSR / antes de hidratar): solo poster, sin video.
  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion !== false) return;
    // React no siempre refleja `muted` como atributo en el DOM; lo forzamos
    // antes de reproducir para que el autoplay funcione en iOS/Safari.
    video.muted = true;
    video.play().catch(() => {
      // Autoplay bloqueado: el poster queda visible. No es un error.
    });
  }, [reducedMotion]);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Poster siempre presente debajo: primer paint, reduced-motion y fallback. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={POSTER_SRC}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />

      {/* El video solo se monta si el usuario NO pidió reducir movimiento. */}
      {reducedMotion === false && (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
          src={VIDEO_SRC}
          poster={POSTER_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onPlaying={() => setVideoReady(true)}
        />
      )}

      {/* Overlay sutil: funde los bordes hacia #05050a y da un velo ligero
          al centro para que el texto siga legible (el video ya es oscuro). */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse at center, rgba(5,5,10,0.35) 0%, rgba(5,5,10,0) 65%)",
            "linear-gradient(to bottom, rgba(5,5,10,0.9) 0%, rgba(5,5,10,0.25) 22%, rgba(5,5,10,0.18) 55%, rgba(5,5,10,0.6) 82%, #05050a 100%)",
          ].join(", "),
        }}
      />
    </div>
  );
}
