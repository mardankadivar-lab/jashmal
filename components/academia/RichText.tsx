import React from "react";
import { renderRich } from "@/components/study/inlineRender";

// Renderiza el texto de las lecciones respetando el formato del Sofer:
//   **negrita**  ·  *cursiva*  ·  hebreo en línea (aislado con <bdi> para que
// no desordene el párrafo latino). NO procesa {{hooks}}: en el cuerpo de las 6
// lecciones no hay; los puentes "Sigue el hilo" se renderizan aparte.
// La lógica de render (withHebrew + renderRich) vive en inlineRender.tsx,
// compartida con InlineText/InteractiveText.

export default function RichText({ text, keyPrefix = "r" }: { text: string; keyPrefix?: string }) {
  return <>{renderRich(text, keyPrefix)}</>;
}
