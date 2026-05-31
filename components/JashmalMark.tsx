"use client";

// La marca de Jashmal: gema de ámbar (con deformación orgánica viva) + los
// עיגולים (Igulim) pulsando hacia afuera — la luz del Ein Sof irradiando en
// círculos tras el tzimtzum. Sirve como logo y como indicador de carga: mientras
// el estudiante espera, contempla la emanación misma.

interface JashmalMarkProps {
  size?: number;
  /** true = los igulim pulsan hacia afuera (carga / espera). */
  animated?: boolean;
  className?: string;
}

export default function JashmalMark({
  size = 96,
  animated = true,
  className,
}: JashmalMarkProps) {
  return (
    <span
      className={className}
      style={{ display: "inline-block", width: size, height: size }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 200 200" width={size} height={size}>
        <defs>
          <radialGradient id="jm-amber" cx="50%" cy="42%" r="60%">
            <stop offset="0%" stopColor="#fff6e0" />
            <stop offset="16%" stopColor="#f4d27a" />
            <stop offset="42%" stopColor="#e0a850" />
            <stop offset="68%" stopColor="#d98a3d" />
            <stop offset="88%" stopColor="#a8641f" />
            <stop offset="100%" stopColor="#5c350f" />
          </radialGradient>
          <radialGradient id="jm-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fffaf0" />
            <stop offset="45%" stopColor="#ffe7b0" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffd27a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="jm-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e8b34f" stopOpacity="0.5" />
            <stop offset="55%" stopColor="#c9a43e" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#c9a43e" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* halo */}
        <circle cx="100" cy="100" r="92" fill="url(#jm-glow)" />

        {/* עיגולים — círculos de emanación que pulsan hacia afuera */}
        {animated && (
          <g fill="none" stroke="#e0c873">
            <circle cx="100" cy="100" r="52" className="jm-ring jm-ring-1" />
            <circle cx="100" cy="100" r="52" className="jm-ring jm-ring-2" />
            <circle cx="100" cy="100" r="52" className="jm-ring jm-ring-3" />
          </g>
        )}

        {/* la gema de ámbar, con una deformación orgánica sutil (no es círculo perfecto) */}
        <g className={animated ? "jm-gem" : undefined} style={{ transformOrigin: "100px 100px" }}>
          <ellipse cx="100" cy="100" rx="54" ry="50" fill="url(#jm-amber)" stroke="#f4d98a" strokeOpacity="0.5" strokeWidth="1" />
          {/* cáustica interior (brillo descentrado) */}
          <ellipse cx="84" cy="82" rx="20" ry="14" fill="#fff3d4" opacity="0.30" />
        </g>

        {/* núcleo incandescente que respira */}
        <circle cx="100" cy="101" r="17" fill="url(#jm-core)" className={animated ? "jm-core" : undefined} style={{ transformOrigin: "100px 101px" }} />
        <circle cx="100" cy="101" r="5" fill="#fffaf0" />

        <style>{`
          @keyframes jm-emanate {
            0%   { r: 50px; opacity: 0.55; }
            70%  { opacity: 0.12; }
            100% { r: 92px; opacity: 0; }
          }
          @keyframes jm-breathe {
            0%, 100% { transform: scale(1);    opacity: 0.95; }
            50%      { transform: scale(1.12); opacity: 1; }
          }
          @keyframes jm-wobble {
            0%, 100% { transform: scale(1, 1); }
            50%      { transform: scale(1.015, 0.985); }
          }
          .jm-ring { stroke-width: 1.4; }
          .jm-ring-1 { animation: jm-emanate 3.2s ease-out infinite; }
          .jm-ring-2 { animation: jm-emanate 3.2s ease-out infinite; animation-delay: 1.06s; }
          .jm-ring-3 { animation: jm-emanate 3.2s ease-out infinite; animation-delay: 2.13s; }
          .jm-core   { animation: jm-breathe 3.2s ease-in-out infinite; }
          .jm-gem    { animation: jm-wobble 6s ease-in-out infinite; }
          @media (prefers-reduced-motion: reduce) {
            .jm-ring, .jm-core, .jm-gem { animation: none; }
            .jm-ring { opacity: 0.18; }
          }
        `}</style>
      </svg>
    </span>
  );
}
