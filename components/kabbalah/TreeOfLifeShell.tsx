"use client";

/**
 * Cáscara cliente de /arbol.
 * Por defecto muestra la vista contemplativa premium (SVG, ligera).
 * Bajo demanda monta la experiencia 3D inmersiva (Three.js) — así el
 * WebGL pesado sólo se carga si el usuario lo pide.
 */

import dynamic from "next/dynamic";
import { useState } from "react";
import TreeOfLifeSVG from "./TreeOfLifeSVG";

const TreeOfLife3D = dynamic(() => import("./TreeOfLife"), { ssr: false });

export default function TreeOfLifeShell() {
  const [immersive, setImmersive] = useState(false);

  if (immersive) {
    // La experiencia 3D es fixed inset-0 a pantalla completa y trae su
    // propio botón de salida.
    return <TreeOfLife3D />;
  }

  return <TreeOfLifeSVG onImmersive={() => setImmersive(true)} />;
}
