"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { SEFIROT, PATHS, getSefira, sefiraLabel, type Sefira } from "@/lib/sefirot";
import { useRouter } from "@/i18n/navigation";

const VB = 100; // viewBox size

interface RayRef {
  ref: string;
  angle: number;
}

interface DepthEntry {
  sefiraId: string;
  label: string; // ej. "Jojmá dentro de Kéter"
}

export default function TreeOfLife() {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("tree");

  // Sefirá seleccionada (para los rayos de referencias)
  const [selected, setSelected] = useState<string | null>(null);
  // Profundidad de navegación (concatenación sefirótica)
  const [depth, setDepth] = useState<DepthEntry[]>([]);
  // Animación de entrada
  const [entering, setEntering] = useState(false);
  // Rayos de referencias
  const [rays, setRays] = useState<RayRef[]>([]);
  const rayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sefirá actual según el nivel de profundidad
  const currentRootId = depth.length > 0 ? depth[depth.length - 1].sefiraId : null;

  // Al seleccionar (1 click): mostrar rayos de referencias
  const handleSelect = useCallback((id: string) => {
    if (selected === id) {
      setSelected(null);
      setRays([]);
      return;
    }
    setSelected(id);
    const s = getSefira(id);
    if (!s) return;
    // Generar rayos distribuidos en abanico alrededor de la sefirá
    const newRays: RayRef[] = s.refs.map((ref, i) => ({
      ref,
      angle: -60 + (i / Math.max(s.refs.length - 1, 1)) * 120,
    }));
    setRays(newRays);
    // Los rayos desaparecen solos tras 8 segundos
    if (rayTimerRef.current) clearTimeout(rayTimerRef.current);
    rayTimerRef.current = setTimeout(() => setRays([]), 8000);
  }, [selected]);

  // Al hacer "Entrar" en una sefirá: animación + navegar al nivel interior
  const handleEnter = useCallback((id: string) => {
    const s = getSefira(id);
    if (!s) return;
    setEntering(true);
    setTimeout(() => {
      setEntering(false);
      setSelected(null);
      setRays([]);
      const parent = depth.length > 0
        ? getSefira(depth[depth.length - 1].sefiraId)
        : null;
      const label = parent
        ? `${sefiraLabel(s, locale)} ${t("within")} ${sefiraLabel(parent, locale)}`
        : sefiraLabel(s, locale);
      setDepth((d) => [...d, { sefiraId: id, label }]);
    }, 600);
  }, [depth, locale, t]);

  // Volver un nivel
  const handleBack = useCallback(() => {
    setDepth((d) => d.slice(0, -1));
    setSelected(null);
    setRays([]);
  }, []);

  // Abrir estudio de una referencia
  function studyRef(ref: string) {
    router.push(`/estudio?ref=${encodeURIComponent(ref)}`);
  }

  // Cuando el usuario hace clic en una referencia-rayo, abre el estudio
  function handleRayClick(ref: string) {
    studyRef(ref);
  }

  useEffect(() => () => {
    if (rayTimerRef.current) clearTimeout(rayTimerRef.current);
  }, []);

  const selectedSefira = selected ? getSefira(selected) : null;
  const innerSefira = currentRootId ? getSefira(currentRootId) : null;

  return (
    <div className="flex h-full w-full flex-col items-center">
      {/* Breadcrumb de profundidad */}
      {depth.length > 0 && (
        <div className="mb-4 flex items-center gap-2 text-sm text-muted">
          <button
            onClick={() => setDepth([])}
            className="text-gold/70 transition-colors hover:text-gold"
          >
            {t("root")}
          </button>
          {depth.map((d, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="text-muted/50">›</span>
              <button
                onClick={() => setDepth(depth.slice(0, i + 1))}
                className={i === depth.length - 1 ? "text-gold" : "text-muted/70 hover:text-gold transition-colors"}
              >
                {d.label}
              </button>
            </span>
          ))}
          <button
            onClick={handleBack}
            className="ms-2 rounded-full border border-gold/30 px-2 py-0.5 text-xs text-muted transition-colors hover:text-gold"
          >
            ← {t("back")}
          </button>
        </div>
      )}

      {/* Título del nivel actual */}
      {innerSefira && (
        <div className="mb-4 text-center">
          <p className="font-cinzel text-sm uppercase tracking-widest text-gold/60">
            {t("insideLevel", { level: depth.length })}
          </p>
          <p className="hebrew text-2xl text-gold">{innerSefira.he}</p>
        </div>
      )}

      {/* SVG del Árbol */}
      <div
        className="relative w-full max-w-lg"
        style={{
          transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1), opacity 0.6s",
          transform: entering ? "scale(8)" : "scale(1)",
          opacity: entering ? 0 : 1,
        }}
      >
        <svg
          viewBox="-5 -2 110 110"
          className="w-full"
          style={{ filter: "drop-shadow(0 0 20px rgba(201,164,62,0.15))" }}
        >
          {/* Senderos */}
          {PATHS.map(([a, b], i) => {
            const sa = SEFIROT.find((s) => s.id === a);
            const sb = SEFIROT.find((s) => s.id === b);
            if (!sa || !sb) return null;
            return (
              <line
                key={i}
                x1={sa.x} y1={sa.y} x2={sb.x} y2={sb.y}
                stroke="#c9a43e"
                strokeWidth="0.6"
                strokeOpacity="0.25"
              />
            );
          })}

          {/* Rayos de referencias */}
          {selectedSefira && rays.map((ray, i) => {
            const rad = (ray.angle * Math.PI) / 180;
            const len = 28;
            const x2 = selectedSefira.x + Math.sin(rad) * len;
            const y2 = selectedSefira.y - Math.cos(rad) * len;
            return (
              <g key={i}>
                <line
                  x1={selectedSefira.x} y1={selectedSefira.y}
                  x2={x2} y2={y2}
                  stroke={selectedSefira.glow}
                  strokeWidth="0.5"
                  strokeOpacity="0.7"
                  strokeDasharray="2 1"
                  style={{ animation: "rayAnim 0.4s ease-out" }}
                />
                <circle cx={x2} cy={y2} r="1.2" fill={selectedSefira.glow} opacity="0.8" />
                <foreignObject
                  x={x2 - 14} y={y2 - 3}
                  width="28" height="8"
                  style={{ overflow: "visible" }}
                >
                  <button
                    onClick={() => handleRayClick(ray.ref)}
                    className="w-full rounded bg-ink/90 px-1 py-0.5 text-center font-cinzel text-[0.4rem] leading-none text-gold-soft transition-colors hover:text-gold"
                    style={{ fontSize: "0.38rem" }}
                    title={ray.ref}
                  >
                    {ray.ref}
                  </button>
                </foreignObject>
              </g>
            );
          })}

          {/* Sefirot */}
          {SEFIROT.map((s) => {
            const isSelected = selected === s.id;
            const isInner = s.id === currentRootId;
            return (
              <g key={s.id} style={{ cursor: "pointer" }}>
                {/* Halo exterior (seleccionado) */}
                {isSelected && (
                  <circle
                    cx={s.x} cy={s.y} r="8"
                    fill="none"
                    stroke={s.glow}
                    strokeWidth="0.5"
                    strokeOpacity="0.4"
                    style={{ animation: "pulse 2s infinite" }}
                  />
                )}

                {/* Círculo principal */}
                <circle
                  cx={s.x} cy={s.y} r="5.5"
                  fill="#05050a"
                  stroke={s.color}
                  strokeWidth={isSelected ? "1.2" : "0.8"}
                  strokeOpacity={isSelected ? 1 : 0.7}
                  onClick={() => handleSelect(s.id)}
                  style={{ transition: "all 0.25s" }}
                />

                {/* Brillo interior */}
                <circle
                  cx={s.x - 1.5} cy={s.y - 1.5} r="2"
                  fill={s.glow}
                  opacity={isSelected ? 0.4 : 0.15}
                  onClick={() => handleSelect(s.id)}
                  style={{ pointerEvents: "none", transition: "opacity 0.25s" }}
                />

                {/* Número */}
                <text
                  x={s.x} y={s.y + 1}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="2.8" fill={s.color} opacity="0.9"
                  style={{ fontFamily: "var(--font-cinzel), serif", pointerEvents: "none" }}
                >
                  {s.number}
                </text>

                {/* Nombre hebreo debajo */}
                <text
                  x={s.x} y={s.y + 8.5}
                  textAnchor="middle" fontSize="2.2"
                  fill={s.color} opacity={isSelected ? 1 : 0.7}
                  className="hebrew"
                  style={{ pointerEvents: "none", transition: "opacity 0.25s" }}
                >
                  {s.he}
                </text>

                {/* Si está seleccionado: botón "Entrar" */}
                {isSelected && (
                  <g onClick={() => handleEnter(s.id)}>
                    <rect
                      x={s.x - 7} y={s.y - 12}
                      width="14" height="4"
                      rx="2"
                      fill="#c9a43e" fillOpacity="0.15"
                      stroke="#c9a43e" strokeWidth="0.4" strokeOpacity="0.6"
                    />
                    <text
                      x={s.x} y={s.y - 9.5}
                      textAnchor="middle" fontSize="2"
                      fill="#c9a43e"
                      style={{ fontFamily: "var(--font-cinzel), serif", pointerEvents: "none" }}
                    >
                      {t("enter")} →
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 0.4; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.05); }
          }
          @keyframes rayAnim {
            from { opacity: 0; stroke-dashoffset: 20; }
            to { opacity: 0.7; stroke-dashoffset: 0; }
          }
        `}</style>
      </div>

      {/* Panel de información de la sefirá seleccionada */}
      {selectedSefira && (
        <div className="mt-4 w-full max-w-lg rounded-xl border border-gold/25 bg-gold/[0.04] p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="hebrew text-2xl text-gold">{selectedSefira.he}</p>
              <p className="font-cinzel text-sm text-gold-soft">{sefiraLabel(selectedSefira, locale)}</p>
            </div>
            <button
              onClick={() => handleEnter(selectedSefira.id)}
              className="rounded-full border border-gold/50 px-4 py-1.5 font-cinzel text-xs uppercase tracking-widest text-gold transition-all hover:bg-gold/10"
            >
              {t("enter")} →
            </button>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted/90">
            {selectedSefira.description}
          </p>
          <p className="mt-2 text-xs text-muted/60">
            {t("refHint")}
          </p>
        </div>
      )}
    </div>
  );
}
