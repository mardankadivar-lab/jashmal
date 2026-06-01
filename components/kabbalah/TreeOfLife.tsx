"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { SEFIROT, PATHS, getSefira, sefiraLabel, type Sefira } from "@/lib/sefirot";
import { useRouter } from "@/i18n/navigation";

const VW = 100;  // viewBox width
const VH = 106;  // viewBox height (ligero margen inferior para etiquetas)

// Tiferet está al (50, 55) — es la puerta de entrada (el corazón del árbol)
const TIFERET_X = 50;
const TIFERET_Y = 55;

interface DepthEntry { sefiraId: string; }

function truncRef(ref: string): string {
  return ref.length > 14 ? ref.slice(0, 13) + "…" : ref;
}

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

export default function TreeOfLife() {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("tree");

  const [selected, setSelected] = useState<string | null>(null);
  const [depth, setDepth] = useState<DepthEntry[]>([]);
  const [phase, setPhase] = useState<"idle" | "zoom" | "inner">("idle");
  const [heijalot, setHeijalot] = useState<string | null>(null);
  const [heijalotLoading, setHeijalotLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selectedSefira = selected ? getSefira(selected) : null;
  const currentRoot = depth.length > 0 ? getSefira(depth[depth.length - 1].sefiraId) : null;

  const handleSelect = useCallback((id: string) => {
    setSelected((prev) => (prev === id ? null : id));
  }, []);

  const handleEnter = useCallback((id: string) => {
    setPhase("zoom");
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setPhase("inner");
      setSelected(null);
      setDepth((d) => [...d, { sefiraId: id }]);
      setHeijalot(null);
    }, 900);
  }, []);

  const handleBack = useCallback(() => {
    setPhase("idle");
    setDepth((d) => d.slice(0, -1));
    setSelected(null);
    setHeijalot(null);
  }, []);

  // Cargar explicación del Héijal cuando la profundidad >= 2
  useEffect(() => {
    if (depth.length < 2) { setHeijalot(null); return; }
    const path = depth.map((d) => d.sefiraId);
    setHeijalotLoading(true);
    setHeijalot(null);
    fetch("/api/heijalot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path, locale }),
    })
      .then((r) => r.json())
      .then((d) => setHeijalot(d.explanation || ""))
      .catch(() => setHeijalot(""))
      .finally(() => setHeijalotLoading(false));
  }, [depth, locale]);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  // Animación: el árbol se aleja por Tiferet (el corazón, la puerta)
  const treeStyle = {
    transition: "transform 0.9s cubic-bezier(0.4,0,0.2,1), opacity 0.9s",
    transformOrigin: `${TIFERET_X}% ${TIFERET_Y}%`, // zoom desde Tiferet
    transform: phase === "zoom" ? "scale(12)" : "scale(1)",
    opacity: phase === "zoom" ? 0 : 1,
  };

  return (
    <div className="always-dark flex min-h-screen flex-col items-center px-4 py-6">
      {/* Breadcrumb */}
      {depth.length > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-muted">
          <button onClick={() => { setDepth([]); setPhase("idle"); }} className="text-gold/70 hover:text-gold">
            {t("root")}
          </button>
          {depth.map((d, i) => {
            const s = getSefira(d.sefiraId);
            return (
              <span key={i} className="flex items-center gap-2">
                <span className="text-muted/40">›</span>
                <button
                  onClick={() => { setDepth(depth.slice(0, i + 1)); setPhase("idle"); }}
                  className={i === depth.length - 1 ? "text-gold" : "text-muted/60 hover:text-gold transition-colors"}
                >
                  <span className="hebrew">{s?.he}</span>
                </button>
              </span>
            );
          })}
          <button onClick={handleBack} className="ms-1 rounded-full border border-gold/25 px-2 py-0.5 text-muted hover:text-gold transition-colors">
            ← {t("back")}
          </button>
        </div>
      )}

      {/* Título del nivel interior */}
      {currentRoot && (
        <div className="mb-3 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold/50 font-cinzel">{t("insideLevel", { level: depth.length })}</p>
          <p className="hebrew text-3xl text-gold" style={{ filter: `drop-shadow(0 0 12px ${currentRoot.glow})` }}>
            {currentRoot.he}
          </p>
        </div>
      )}

      {/* SVG del Árbol */}
      <div className="w-full max-w-sm" style={treeStyle}>
        <svg
          viewBox={`-5 -3 ${VW + 10} ${VH + 5}`}
          className="w-full"
        >
          <defs>
            {/* Filtro de resplandor para cada sefirá */}
            {SEFIROT.map((s) => (
              <filter key={`glow-${s.id}`} id={`glow-${s.id}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
                <feColorMatrix in="blur" type="matrix"
                  values={`0 0 0 0 ${hexToRgbNorm(s.glow, 0)}  0 0 0 0 ${hexToRgbNorm(s.glow, 1)}  0 0 0 0 ${hexToRgbNorm(s.glow, 2)}  0 0 0 1 0`}
                  result="glow" />
                <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            ))}
            {/* Gradiente de fondo */}
            <radialGradient id="bgGrad" cx="50%" cy="45%" r="55%">
              <stop offset="0%" stopColor="#0a0818" />
              <stop offset="100%" stopColor="#02010a" />
            </radialGradient>
            {/* Gradiente de luz Ein Sof (arriba) */}
            <radialGradient id="einSof" cx="50%" cy="0%" r="40%">
              <stop offset="0%" stopColor="#c9a43e" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#c9a43e" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Fondo cósmico */}
          <rect x="-5" y="-3" width={VW + 10} height={VH + 5} fill="url(#bgGrad)" />
          <rect x="-5" y="-3" width={VW + 10} height={VH + 5} fill="url(#einSof)" />

          {/* Partículas de fondo (estrellas) */}
          {STARS.map((star, i) => (
            <circle key={i} cx={star[0]} cy={star[1]} r={star[2]}
              fill="#c9a43e" opacity={star[3]}
              style={{ animation: `twinkle ${star[4]}s ${star[5]}s infinite` }} />
          ))}

          {/* Senderos — con leve resplandor */}
          {PATHS.map(([a, b], i) => {
            const sa = SEFIROT.find((s) => s.id === a);
            const sb = SEFIROT.find((s) => s.id === b);
            if (!sa || !sb) return null;
            const isActive = selected === a || selected === b;
            return (
              <line key={i}
                x1={sa.x} y1={sa.y} x2={sb.x} y2={sb.y}
                stroke={isActive ? "#c9a43e" : "#c9a43e"}
                strokeWidth={isActive ? "0.8" : "0.4"}
                strokeOpacity={isActive ? 0.5 : 0.18}
                style={{ transition: "stroke-opacity 0.3s, stroke-width 0.3s" }}
              />
            );
          })}

          {/* Rayos de referencias */}
          {selectedSefira && selectedSefira.refs.map((ref, i) => {
            const total = selectedSefira.refs.length;
            const angle = (-50 + (i / Math.max(total - 1, 1)) * 100) * (Math.PI / 180);
            const len = 26;
            const ex = selectedSefira.x + Math.sin(angle) * len;
            const ey = selectedSefira.y - Math.cos(angle) * len;
            // Clamp dentro del viewBox
            const cx = clamp(ex, 4, VW - 4);
            const cy = clamp(ey, 2, VH - 2);

            return (
              <g key={i} onClick={() => router.push(`/estudio?ref=${encodeURIComponent(ref)}`)}
                style={{ cursor: "pointer" }}>
                {/* Línea del rayo */}
                <line
                  x1={selectedSefira.x} y1={selectedSefira.y}
                  x2={cx} y2={cy}
                  stroke={selectedSefira.glow}
                  strokeWidth="0.4"
                  strokeOpacity="0.65"
                  strokeDasharray="1.5 0.8"
                  style={{ animation: `rayIn 0.5s ${i * 0.08}s both ease-out` }}
                />
                {/* Orbe terminal */}
                <circle cx={cx} cy={cy} r="1.8"
                  fill={selectedSefira.glow} opacity="0.85"
                  filter={`url(#glow-${selectedSefira.id})`}
                  style={{ animation: `rayIn 0.5s ${i * 0.08}s both ease-out` }}
                />
                {/* Texto pequeño de la referencia */}
                <text x={cx} y={cy + 3.8}
                  textAnchor="middle" fontSize="1.6"
                  fill="#e8e4d8" opacity="0.75"
                  style={{ fontFamily: "var(--font-cinzel), serif", pointerEvents: "none" }}
                >
                  {truncRef(ref)}
                </text>
              </g>
            );
          })}

          {/* Sefirot */}
          {SEFIROT.map((s) => {
            const isSel = selected === s.id;
            return (
              <g key={s.id} onClick={() => handleSelect(s.id)} style={{ cursor: "pointer" }}>
                {/* Halo de selección */}
                {isSel && (
                  <>
                    <circle cx={s.x} cy={s.y} r="10" fill="none"
                      stroke={s.glow} strokeWidth="0.3" strokeOpacity="0.25"
                      style={{ animation: "expandRing 1.5s ease-out infinite" }} />
                    <circle cx={s.x} cy={s.y} r="8" fill="none"
                      stroke={s.glow} strokeWidth="0.5" strokeOpacity="0.35"
                      style={{ animation: "expandRing 1.5s 0.3s ease-out infinite" }} />
                  </>
                )}

                {/* Círculo principal con filtro de glow */}
                <circle cx={s.x} cy={s.y} r="5.5"
                  fill="#07070f"
                  stroke={s.color}
                  strokeWidth={isSel ? "1.4" : "0.9"}
                  strokeOpacity={isSel ? 1 : 0.75}
                  filter={isSel ? `url(#glow-${s.id})` : undefined}
                  style={{ transition: "all 0.25s" }}
                />

                {/* Destello interior */}
                <circle cx={s.x - 1.5} cy={s.y - 1.8} r="2.2"
                  fill={s.glow} opacity={isSel ? 0.5 : 0.18}
                  style={{ pointerEvents: "none", transition: "opacity 0.25s" }} />

                {/* Número */}
                <text x={s.x} y={s.y + 0.9}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="2.8" fill={s.color} opacity="0.9"
                  style={{ fontFamily: "var(--font-cinzel), serif", pointerEvents: "none" }}
                >
                  {s.number}
                </text>

                {/* Nombre hebreo */}
                <text x={s.x} y={s.y + 8.6}
                  textAnchor="middle" fontSize="2.1"
                  fill={s.color} opacity={isSel ? 1 : 0.65}
                  className="hebrew"
                  style={{ pointerEvents: "none", transition: "opacity 0.25s" }}
                >
                  {s.he}
                </text>

                {/* Botón "Entrar" cuando está seleccionado */}
                {isSel && (
                  <g onClick={(e) => { e.stopPropagation(); handleEnter(s.id); }}>
                    <rect x={s.x - 8} y={s.y - 14} width="16" height="4.5" rx="2.2"
                      fill={s.glow} fillOpacity="0.18"
                      stroke={s.glow} strokeWidth="0.5" strokeOpacity="0.7" />
                    <text x={s.x} y={s.y - 11.2}
                      textAnchor="middle" fontSize="2.1" fill={s.glow}
                      style={{ fontFamily: "var(--font-cinzel), serif", pointerEvents: "none" }}
                    >
                      {t("enter")} →
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          <style>{`
            @keyframes expandRing {
              0% { r: 6.5; opacity: 0.5; }
              100% { r: 12; opacity: 0; }
            }
            @keyframes rayIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes twinkle {
              0%, 100% { opacity: var(--o); }
              50% { opacity: 0.05; }
            }
          `}</style>
        </svg>
      </div>

      {/* Panel de info de la sefirá seleccionada */}
      {selectedSefira && (
        <div className="mt-4 w-full max-w-sm rounded-xl border p-4 transition-all"
          style={{ borderColor: selectedSefira.glow + "44", background: "#07070f" }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="hebrew text-2xl" style={{ color: selectedSefira.glow, filter: `drop-shadow(0 0 8px ${selectedSefira.glow}66)` }}>
                {selectedSefira.he}
              </p>
              <p className="font-cinzel text-sm text-gold-soft">{sefiraLabel(selectedSefira, locale)}</p>
              <p className="mt-1 text-xs text-muted/80">{selectedSefira.world} · {selectedSefira.pillar}</p>
            </div>
            <button onClick={() => handleEnter(selectedSefira.id)}
              className="rounded-full border px-3 py-1.5 font-cinzel text-xs uppercase tracking-widest transition-all hover:brightness-125"
              style={{ borderColor: selectedSefira.glow + "80", color: selectedSefira.glow }}>
              {t("enter")} →
            </button>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted/90">{selectedSefira.description}</p>
          <p className="mt-1 text-[10px] text-muted/50 italic">{t("refHint")}</p>
        </div>
      )}

      {/* Panel del Héijal (cámara dentro de cámara) — nivel ≥ 2 */}
      {depth.length >= 2 && (
        <div className="mt-4 w-full max-w-sm rounded-xl border border-gold/20 bg-gold/[0.04] p-4">
          <p className="hebrew text-center text-lg text-gold mb-2">
            הֵיכָלוֹת — {depth.map((d) => getSefira(d.sefiraId)?.he).join(" › ")}
          </p>
          {heijalotLoading && (
            <p className="animate-pulse text-sm text-muted text-center">{t("loadingHeijalot")}</p>
          )}
          {heijalot && !heijalotLoading && (
            <div className="study-prose text-sm">
              {heijalot.split(/\n+/).map((line, i) => {
                const h = line.match(/^\*\*(.+?)\*\*/);
                if (h) return <h4 key={i} className="mt-3 font-cinzel text-gold text-sm">{h[1]}</h4>;
                return line.trim() ? <p key={i} className="mt-1 text-muted/90 leading-relaxed">{line.replace(/\*\*/g, "")}</p> : null;
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Convierte hex a componente RGB normalizado (0-1) para SVG filters
function hexToRgbNorm(hex: string, ch: number): number {
  const c = hex.replace("#", "");
  const val = parseInt(c.slice(ch * 2, ch * 2 + 2), 16) / 255;
  return isNaN(val) ? 0 : +val.toFixed(3);
}

// Estrellas de fondo (seed estático para evitar hidratación mismatch)
const STARS: number[][] = [
  [8,10,0.3,0.3,3,0],[15,30,0.2,0.2,4,1],[25,8,0.25,0.25,3.5,0.5],
  [38,18,0.3,0.15,5,1.5],[62,12,0.2,0.2,4,2],[75,25,0.3,0.3,3,0.8],
  [88,15,0.25,0.15,4.5,0.3],[92,40,0.2,0.2,3.5,1.2],[5,55,0.3,0.25,4,1.8],
  [95,60,0.2,0.2,5,0.6],[12,75,0.25,0.15,3,2],[85,72,0.3,0.25,4,1],
  [45,90,0.2,0.2,3.5,1.5],[70,88,0.25,0.15,5,0.4],[30,95,0.2,0.2,4,2.2],
];
