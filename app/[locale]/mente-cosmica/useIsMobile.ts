"use client";

// Detección de viewport móvil (ancho + puntero grueso). SSR-safe: arranca en
// false y se ajusta en el cliente. Sirve para decidir bottom-sheet vs panel.
import { useEffect, useState } from "react";

export function useIsMobile(query = "(max-width: 768px)"): boolean {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia(query);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return isMobile;
}
