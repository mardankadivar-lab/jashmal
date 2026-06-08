import type { LetterData } from "./types";

// ─────────────────────────────────────────────────────────────────────────
//  ÁLEF (א) — Data de la primera letra. TEMPLATE de las 22.
//
//  ⚠️ CONTENIDO ERUDITO = PLACEHOLDER. Marcado con "[Sofer: …]".
//  Regla CLAUDE.md: ninguna gematría/fuente se publica sin verificar. El
//  editor-erudito (Sofer) entrega el texto verificado y se pega aquí.
//  La ÚNICA gematría "dura" ya correcta: Yud(10)+Vav(6)+Yud(10)=26=הוי״ה.
// ─────────────────────────────────────────────────────────────────────────

export const alef: LetterData = {
  slug: "alef",
  letter: "א",
  nameTranslit: { es: "Álef", en: "Alef", fa: "آلِف" },
  nameHe: "אָלֶף",
  value: 1,

  level1: {
    es: "[Sofer: Nivel 1 — texto de contemplación inicial del Álef. El instante de silencio antes de la primera palabra.]",
  },

  // ── Sección A — NOMBRE ──────────────────────────────────────────────
  name: {
    raicesYsignificado: {
      es: "[Sofer: Nombre→Raíces y significado. Álef / Aluf (maestro, jefe) / Elef (mil) / la raíz del aprendizaje (אולפנא).]",
    },
    mundos: { es: "[Sofer: Nombre→Mundos]" },
    almas: { es: "[Sofer: Nombre→Almas]" },
    divinidad: { es: "[Sofer: Nombre→Divinidad]" },
  },

  // ── Sección B — FORMA ───────────────────────────────────────────────
  form: {
    descripcion: {
      es: "[Sofer: Forma→Descripción. El Álef se compone de tres trazos: una Yud superior, una Vav diagonal y una Yud inferior — lo alto, el puente y lo bajo.]",
    },
    partes: [
      {
        label: { es: "Yud superior", en: "Upper Yud", fa: "یود بالا" },
        significado: { es: "[Sofer: Forma→Yud superior — las aguas/mundos de arriba.]" },
        svgPathId: "yud-top",
      },
      {
        label: { es: "Vav", en: "Vav", fa: "واو" },
        significado: { es: "[Sofer: Forma→Vav diagonal — el puente, el firmamento que une.]" },
        svgPathId: "vav",
      },
      {
        label: { es: "Yud inferior", en: "Lower Yud", fa: "یود پایین" },
        significado: { es: "[Sofer: Forma→Yud inferior — las aguas/mundos de abajo.]" },
        svgPathId: "yud-bottom",
      },
    ],
    mundos: { es: "[Sofer: Forma→Mundos]" },
    almas: { es: "[Sofer: Forma→Almas]" },
    divinidad: { es: "[Sofer: Forma→Divinidad]" },
  },

  // ── Sección C — NÚMERO ──────────────────────────────────────────────
  number: {
    valor: 1,
    // Esta es la única ecuación ya verificada (estructura del glifo).
    guematriaForma: { es: "Yud (10) + Vav (6) + Yud (10) = 26 = הוי״ה" },
    mundos: { es: "[Sofer: Número→Mundos]" },
    almas: { es: "[Sofer: Número→Almas]" },
    divinidad: { es: "[Sofer: Número→Divinidad]" },
  },

  // ── Conexiones (senderos al Universo) ───────────────────────────────
  conexiones: {
    tanaj: [
      {
        titulo: { es: "[Sofer: conexión Tanaj]" },
        fuente: { es: "[Sofer: referencia exacta]" },
        href: "/mente-cosmica",
      },
    ],
    talmud: [
      {
        titulo: { es: "[Sofer: conexión Talmud]" },
        fuente: { es: "[Sofer: folio]" },
        href: "/mente-cosmica",
      },
    ],
    midrash: [
      {
        titulo: { es: "[Sofer: conexión Midrash]" },
        fuente: { es: "[Sofer: referencia]" },
        href: "/mente-cosmica",
      },
    ],
    cabala: [
      {
        titulo: { es: "[Sofer: conexión Cabalá]" },
        fuente: { es: "[Sofer: Zohar/Etz Jaim]" },
        href: "/mente-cosmica",
      },
    ],
    jasidut: [
      {
        titulo: { es: "[Sofer: conexión Jasidut]" },
        fuente: { es: "[Sofer: Tania/Likutei…]" },
        href: "/mente-cosmica",
      },
    ],
  },

  fuentes: [
    { es: "[Sofer: fuente verificada 1]" },
    { es: "[Sofer: fuente verificada 2]" },
  ],
};
