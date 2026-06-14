"use client";

import { useEffect, useRef, useState } from "react";

/**
 * LamedLoader — la letra Lamed (ל) que se "escribe" sola en bucle.
 *
 * Es la letra más alta del alefbet: empieza arriba (el Yud, y≈283) y desciende
 * al recipiente Kaf (y≈894), así que el trazo se dibuja de arriba hacia abajo,
 * como si una mano lo escribiera. Color dorado (#c9a43e), fondo transparente.
 *
 * Técnica: line-drawing SVG con stroke-dasharray + stroke-dashoffset. Medimos
 * el largo real del trazo con getTotalLength() y lo inyectamos como --lamed-len
 * para que el dibujado sea exacto a cualquier tamaño. La animación
 * (@keyframes lamed-draw) vive en app/globals.css.
 *
 * El path proviene de lamed-3-layers.svg (viewBox 0 0 1254 1254).
 */

const LAMED_PATH =
  "M 510.0 283.0 L 499.0 321.0 L 500.0 349.0 L 513.0 364.0 L 541.0 369.0 L 552.0 379.0 L 533.0 483.0 L 533.0 516.0 L 540.0 535.0 L 548.0 543.0 L 565.0 549.0 L 721.0 550.0 L 742.0 559.0 L 752.0 578.0 L 752.0 628.0 L 740.0 666.0 L 628.0 787.0 L 599.0 832.0 L 595.0 865.0 L 600.0 880.0 L 615.0 893.0 L 632.0 894.0 L 641.0 890.0 L 651.0 875.0 L 651.0 855.0 L 642.0 831.0 L 650.0 806.0 L 755.0 702.0 L 780.0 664.0 L 795.0 599.0 L 795.0 532.0 L 783.0 495.0 L 760.0 477.0 L 588.0 475.0 L 571.0 469.0 L 564.0 458.0 L 563.0 442.0 L 590.0 363.0 L 591.0 335.0 L 586.0 325.0 L 573.0 316.0 L 529.0 306.0 L 524.0 298.0 L 526.0 283.0 Z";

type LamedLoaderProps = {
  /** Lado del SVG en píxeles. Por defecto 64. */
  size?: number;
  /** Clases extra para el contenedor. */
  className?: string;
  /** Texto accesible para lectores de pantalla. */
  label?: string;
};

export default function LamedLoader({
  size = 64,
  className = "",
  label = "Cargando",
}: LamedLoaderProps) {
  const pathRef = useRef<SVGPathElement>(null);
  // Largo aproximado por defecto (evita el "salto" en el primer frame antes de
  // medir). Se reemplaza por la medición real apenas monta el componente.
  const [length, setLength] = useState(2400);

  useEffect(() => {
    if (pathRef.current) {
      try {
        const real = pathRef.current.getTotalLength();
        if (real && Number.isFinite(real)) setLength(real);
      } catch {
        /* getTotalLength no disponible: usamos el valor por defecto. */
      }
    }
  }, []);

  return (
    <span
      role="status"
      aria-label={label}
      className={`inline-flex items-center justify-center ${className}`}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 1254 1254"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <filter
            id="lamedLoaderGlow"
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
          >
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          ref={pathRef}
          d={LAMED_PATH}
          className="lamed-loader__path"
          filter="url(#lamedLoaderGlow)"
          style={
            { "--lamed-len": `${length}px` } as React.CSSProperties
          }
        />
      </svg>
    </span>
  );
}
