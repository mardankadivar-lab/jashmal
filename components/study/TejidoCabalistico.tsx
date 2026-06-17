"use client";

// ─────────────────────────────────────────────────────────────────────────
// TejidoCabalistico.tsx — Fase 4
// Panel visual lightweight que muestra las entidades cabalísticas detectadas
// en un estudio. Se monta después del contenido del estudio en StudyEngine.
//
// Datos: recibe KabMatch[] como prop (ya escaneados en el cliente, sin API).
// No hace fetch ni escribe en BD. Pura visualización.
// ─────────────────────────────────────────────────────────────────────────

import Link from "next/link";
import type { KabMatch, EntityDimension } from "@/lib/nodes/kabbalisticScanner";

interface Props {
  matches: KabMatch[];
  locale: string;
}

// Orden de presentación de las dimensiones
const DIMENSION_ORDER: EntityDimension[] = [
  "sefirot", "otiot", "partzufim", "or-kli", "olamot", "nombres", "gematria", "senderos",
];

// Etiquetas trilingüe de cada dimensión
const DIMENSION_LABELS: Record<EntityDimension, Record<string, string>> = {
  sefirot:   { es: "Sefirot",           fa: "ספیروت",          en: "Sefirot" },
  otiot:     { es: "Letras hebreas",    fa: "حروف عبری",       en: "Hebrew Letters" },
  partzufim: { es: "Partzufim",         fa: "پارتزوفیم",       en: "Partzufim" },
  "or-kli":  { es: "Or y Kelim",        fa: "اور و کِلیم",     en: "Or and Kelim" },
  olamot:    { es: "Mundos",            fa: "عوالم",           en: "Worlds" },
  nombres:   { es: "Nombres divinos",   fa: "اسماء الهی",      en: "Divine Names" },
  gematria:  { es: "Guematría",         fa: "گماتریا",         en: "Gematria" },
  senderos:  { es: "Senderos",          fa: "مسیرها",          en: "Paths" },
};

function dimLabel(dim: EntityDimension, locale: string): string {
  const labels = DIMENSION_LABELS[dim];
  return labels[locale] ?? labels["es"];
}

export default function TejidoCabalistico({ matches, locale }: Props) {
  if (matches.length === 0) return null;

  // Subtítulo localizado
  const subtitle =
    locale === "fa" ? "بافته قبالایی"
    : locale === "en" ? "Kabbalistic Web"
    : "Tejido cabalístico";

  // Agrupar por dimensión
  const byDimension = new Map<EntityDimension, KabMatch[]>();
  for (const m of matches) {
    const group = byDimension.get(m.dimension) ?? [];
    group.push(m);
    byDimension.set(m.dimension, group);
  }

  // Solo dimensiones que aparecen, en el orden canónico
  const activeDimensions = DIMENSION_ORDER.filter((d) => byDimension.has(d));

  return (
    <div className="mt-8 rounded-lg border border-gold/20 bg-[#0a0a12] px-5 py-4">
      {/* Encabezado */}
      <div className="mb-4 border-b border-gold/10 pb-3">
        <p className="hebrew text-center text-base text-gold/70 leading-loose">
          קְשָׁרִים קַבָּלִיִּים
        </p>
        <p className="mt-1 text-center font-cinzel text-[10px] uppercase tracking-widest text-muted">
          {subtitle}
        </p>
      </div>

      {/* Dimensiones */}
      <div className="space-y-3">
        {activeDimensions.map((dim) => {
          const group = byDimension.get(dim)!;
          return (
            <div key={dim}>
              <p className="mb-1.5 font-cinzel text-[9px] uppercase tracking-widest text-gold/40">
                {dimLabel(dim, locale)}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {group.map((m) => {
                  const chipClass =
                    "bg-gold/10 hover:bg-gold/20 text-gold text-xs px-2 py-0.5 rounded-full transition-colors";
                  // Etiqueta del chip: nombre canónico en español
                  const label = m.canonicalEs;

                  if (m.graphNodeId) {
                    // Entidad que ya tiene nodo en el cerebro → enlace a /mente-cosmica
                    return (
                      <Link
                        key={m.entityId}
                        href="/mente-cosmica"
                        className={chipClass}
                        title={`Aparece ${m.count}× en el estudio`}
                      >
                        {label}
                      </Link>
                    );
                  }

                  // Entidad reconocida pero sin nodo en el grafo → chip inerte
                  return (
                    <span
                      key={m.entityId}
                      className={`${chipClass} cursor-default opacity-80`}
                      title={`Aparece ${m.count}× en el estudio`}
                    >
                      {label}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
