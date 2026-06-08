"use client";

import { useEffect, useRef, useState } from "react";

// Bloque que se ilumina al entrar en el viewport (IntersectionObserver →
// clase .is-in que dispara la transición CSS). Reversible: se atenúa al salir,
// para que volver a subir lo re-ilumine. Cero dependencias, corre en compositor.
export default function Reveal({
  children,
  className = "",
  delay,
  threshold = 0.2,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: 1 | 2 | 3;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      data-delay={delay}
      className={`letra-reveal ${inView ? "is-in" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
