"use client";

/**
 * Árbol de la Vida — vista contemplativa (artifact premium, SVG ligero).
 *
 * Interacción objetivo: tocar/hover una sefirá → se ilumina y revela su luz
 * (nombre hebreo con nikud, transliteración, traducción, pilar y función
 * espiritual) en un panel dorado RTL-aware. Sin WebGL: rápido en móvil.
 *
 * La experiencia 3D inmersiva (Three.js) sigue disponible aparte; este
 * componente es la puerta serena y premium a /arbol.
 */

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  SEFIROT,
  PATHS,
  getSefira,
  sefiraLabel,
  sefiraGloss,
  sefiraFunc,
  pillarLabel,
} from "@/lib/nodes/sefirot";

// El viewBox del lienzo. x: 0–100 (igual que los datos), y se estira a 0–112
// para dar aire arriba (Kéter) y abajo (Maljut) sin recortar el glow.
const VB_W = 100;
const VB_H = 112;
const Y_PAD = 6; // empuja todo el árbol hacia abajo un poco

function sx(x: number) {
  return x;
}
function sy(y: number) {
  return y + Y_PAD;
}

export default function TreeOfLifeSVG({
  onImmersive,
}: {
  onImmersive?: () => void;
}) {
  const locale = useLocale();
  const t = useTranslations("tree");
  const rtl = locale === "fa";

  // sefirá activa (clic/tap = fija; hover sólo resalta visualmente)
  const [active, setActive] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);

  const lit = active ?? hover; // la que está "iluminada" ahora mismo
  const activeSefira = active ? getSefira(active) : null;

  return (
    <div
      className="always-dark relative w-full overflow-hidden rounded-2xl border border-gold/15"
      style={{
        background:
          "radial-gradient(120% 80% at 50% 0%, #0c0a18 0%, #05050a 55%, #020109 100%)",
        boxShadow: "inset 0 0 120px rgba(0,0,0,0.8)",
      }}
      dir={rtl ? "rtl" : "ltr"}
    >
      {/* Rótulo superior */}
      <div className="pointer-events-none absolute inset-x-0 top-4 z-10 text-center">
        <p
          className="hebrew text-2xl text-gold/70"
          style={{ filter: "drop-shadow(0 0 10px rgba(201,164,62,0.45))" }}
        >
          עֵץ חַיִּים
        </p>
        <p className="mt-1 font-cinzel text-[10px] uppercase tracking-[0.35em] text-gold/35">
          {t("tapHint")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-0 md:grid-cols-[1.35fr_1fr]">
        {/* ─── Lienzo del árbol ─────────────────────────────── */}
        <div className="relative mx-auto w-full max-w-[440px] px-2 py-2">
          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            className="h-auto w-full select-none"
            style={{ maxHeight: "78vh" }}
            // El SVG no se voltea en RTL: el árbol es simétrico (los pilares
            // izq/der son fijos en cábala) y los glifos hebreos ya van bien.
          >
            <defs>
              {/* Glow dorado para senderos */}
              <filter id="pathGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="0.6" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Glow fuerte para la esfera iluminada */}
              <filter id="orbGlow" x="-120%" y="-120%" width="340%" height="340%">
                <feGaussianBlur stdDeviation="1.6" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Halo radial reutilizable */}
              <radialGradient id="halo" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="35%" stopColor="#ffffff" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* ─── 22 senderos (líneas de luz) ─── */}
            <g>
              {PATHS.map(([a, b], i) => {
                const A = getSefira(a)!;
                const B = getSefira(b)!;
                const isLit =
                  lit !== null && (lit === a || lit === b);
                return (
                  <line
                    key={i}
                    x1={sx(A.x)}
                    y1={sy(A.y)}
                    x2={sx(B.x)}
                    y2={sy(B.y)}
                    stroke={isLit ? (getSefira(lit!)?.glow ?? "#c9a43e") : "#c9a43e"}
                    strokeWidth={isLit ? 0.7 : 0.28}
                    strokeOpacity={isLit ? 0.85 : 0.18}
                    strokeLinecap="round"
                    filter={isLit ? "url(#pathGlow)" : undefined}
                    style={{ transition: "all 0.4s ease" }}
                  />
                );
              })}
            </g>

            {/* ─── 10 sefirot (esferas) ─── */}
            <g>
              {SEFIROT.map((s) => {
                const isLit = lit === s.id;
                const isActive = active === s.id;
                const cx = sx(s.x);
                const cy = sy(s.y);
                const r = 4.4;
                return (
                  <g
                    key={s.id}
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() => setHover(s.id)}
                    onMouseLeave={() => setHover(null)}
                    onClick={() =>
                      setActive((prev) => (prev === s.id ? null : s.id))
                    }
                    role="button"
                    tabIndex={0}
                    aria-label={sefiraLabel(s, locale)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActive((prev) => (prev === s.id ? null : s.id));
                      }
                    }}
                  >
                    {/* halo */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isLit ? r * 2.6 : r * 1.7}
                      fill="url(#halo)"
                      opacity={isLit ? 0.55 : 0.16}
                      style={{ transition: "all 0.45s ease" }}
                    />
                    {/* anillo de selección */}
                    {isActive && (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={r + 2}
                        fill="none"
                        stroke={s.glow}
                        strokeWidth={0.4}
                        strokeOpacity={0.9}
                      >
                        <animate
                          attributeName="r"
                          values={`${r + 1.6};${r + 2.6};${r + 1.6}`}
                          dur="2.4s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}
                    {/* cuerpo de la esfera */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={r}
                      fill={s.color === "#f8f8f8" ? "#e8e6df" : s.color}
                      stroke={s.glow}
                      strokeWidth={0.5}
                      strokeOpacity={0.9}
                      filter={isLit ? "url(#orbGlow)" : undefined}
                      style={{ transition: "filter 0.4s ease" }}
                    >
                      <animate
                        attributeName="r"
                        values={`${r};${r + 0.25};${r}`}
                        dur={`${3 + (s.number % 4) * 0.5}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                    {/* brillo especular */}
                    <circle
                      cx={cx - 1.3}
                      cy={cy - 1.4}
                      r={1.1}
                      fill="#ffffff"
                      opacity={0.5}
                    />
                    {/* número hebreo de orden (1..10) en pequeño dentro */}
                    {/* nombre hebreo bajo la esfera */}
                    <text
                      x={cx}
                      y={cy + r + 3.6}
                      textAnchor="middle"
                      className="hebrew"
                      style={{
                        fontFamily: "var(--font-hebrew), serif",
                        fontSize: "3.4px",
                        fill:
                          s.color === "#f8f8f8" ? "#e8e6df" : s.glow,
                        opacity: isLit ? 1 : 0.7,
                        transition: "opacity 0.3s ease",
                      }}
                    >
                      {s.he}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* ─── Panel de la luz revelada ─────────────────────── */}
        <div className="relative px-4 pb-6 pt-2 md:py-10 md:pe-8">
          {activeSefira ? (
            <div
              key={activeSefira.id}
              className="rounded-2xl border bg-ink/60 p-5 backdrop-blur-sm"
              style={{
                borderColor: activeSefira.glow + "55",
                boxShadow: `0 0 40px ${activeSefira.glow}22, inset 0 0 30px ${activeSefira.glow}11`,
                animation: "lightReveal 0.5s ease-out",
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p
                    className="hebrew text-4xl font-bold leading-none"
                    style={{
                      color: activeSefira.glow,
                      filter: `drop-shadow(0 0 12px ${activeSefira.glow}88)`,
                    }}
                  >
                    {activeSefira.he}
                  </p>
                  <p className="mt-2 font-cinzel text-lg tracking-wide text-parchment">
                    {activeSefira.translit}
                  </p>
                  <p className="font-cinzel text-xs uppercase tracking-[0.25em] text-gold/55">
                    {sefiraGloss(activeSefira, locale)}
                  </p>
                </div>
                <button
                  onClick={() => setActive(null)}
                  className="rounded-full border border-gold/20 px-2 py-1 text-sm text-muted transition-colors hover:text-gold"
                  aria-label={t("close")}
                >
                  ✕
                </button>
              </div>

              {/* pilar */}
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold/15 bg-gold/[0.04] px-3 py-1">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ background: activeSefira.glow }}
                />
                <span className="font-cinzel text-[10px] uppercase tracking-widest text-gold/60">
                  {pillarLabel(activeSefira.pillar, locale)}
                </span>
              </div>

              {/* función espiritual */}
              <p
                className="mt-4 text-[15px] leading-relaxed text-parchment/90"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                {sefiraFunc(activeSefira, locale)}
              </p>

              {/* mundo */}
              <p className="mt-4 font-cinzel text-[10px] uppercase tracking-widest text-muted/45">
                {activeSefira.number} / 10 · {activeSefira.world}
              </p>
            </div>
          ) : (
            <div className="flex h-full flex-col items-start justify-center">
              <p
                className="text-xl leading-relaxed text-muted/70"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                {t("emptyPanel")}
              </p>
              {onImmersive && (
                <button
                  onClick={onImmersive}
                  className="mt-6 rounded-full border border-gold/25 bg-gold/[0.05] px-5 py-2 font-cinzel text-xs uppercase tracking-widest text-gold/80 transition-all hover:border-gold/50 hover:bg-gold/10 hover:text-gold"
                >
                  {t("immersive")} →
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes lightReveal {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
