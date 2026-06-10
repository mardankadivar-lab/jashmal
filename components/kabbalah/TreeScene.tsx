"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars, Html, Line, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { SEFIROT, PATHS, getSefira, sefiraLabel, type Sefira } from "@/lib/nodes/sefirot";

// Posiciones 3D de los sefirot
function to3D(x2d: number, y2d: number): [number, number, number] {
  return [(x2d - 50) / 50 * 4.8, -(y2d - 50) / 50 * 7, 0];
}
const SPOS: Record<string, [number, number, number]> = {};
SEFIROT.forEach((s) => { SPOS[s.id] = to3D(s.x, s.y); });

// ─── Ayudante de foco (mueve el pivot de órbita hacia la sefirá) ───
function FocusHelper({ selected, controlsRef }: { selected: string | null; controlsRef: React.RefObject<any> }) {
  const tv = useRef(new THREE.Vector3());
  useFrame(() => {
    if (!controlsRef.current) return;
    const pos = selected ? SPOS[selected] : null;
    const goal = pos
      ? new THREE.Vector3(pos[0] * 0.35, pos[1] * 0.25, 0)
      : new THREE.Vector3(0, 0, 0);
    tv.current.lerp(goal, 0.04);
    controlsRef.current.target.copy(tv.current);
    controlsRef.current.update();
  });
  return null;
}

// ─── Nodo sefirá ─────────────────────────────────────────────────
function SefiraNode({ sefira, selected, locale, onClick }: {
  sefira: Sefira; selected: boolean; locale: string; onClick: (id: string) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const [hovered, setHovered] = useState(false);
  const pos = SPOS[sefira.id];
  const col = new THREE.Color(sefira.color === "#f8f8f8" ? "#d8d8d8" : sefira.color);
  const glow = new THREE.Color(sefira.glow);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (meshRef.current) {
      const p = 1 + Math.sin(t * 1.6 + sefira.number * 0.8) * 0.05;
      meshRef.current.scale.setScalar(selected ? p * 1.35 : hovered ? p * 1.15 : p);
    }
    if (lightRef.current) {
      lightRef.current.intensity = selected ? 5 + Math.sin(t * 3) * 1.5 : hovered ? 3 : 1.5;
    }
  });

  return (
    <group position={pos}>
      <pointLight ref={lightRef} color={glow} distance={4} decay={2} />
      <mesh ref={meshRef}
        onClick={(e) => { e.stopPropagation(); onClick(sefira.id); }}
        onPointerEnter={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
        onPointerLeave={() => { setHovered(false); document.body.style.cursor = "default"; }}
      >
        <sphereGeometry args={[0.3, 64, 64]} />
        <meshStandardMaterial
          color={col} emissive={glow}
          emissiveIntensity={selected ? 3 : hovered ? 1.8 : 0.6}
          roughness={0.05} metalness={0.9}
        />
      </mesh>

      {/* Anillo de selección */}
      {selected && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.52, 0.018, 8, 64]} />
          <meshBasicMaterial color={glow} transparent opacity={0.75} />
        </mesh>
      )}

      {/* Etiqueta HTML */}
      <Html center distanceFactor={12} zIndexRange={[1, 0]}>
        <div style={{
          transform: "translateY(26px)",
          textAlign: "center",
          pointerEvents: "none",
          color: sefira.color === "#f8f8f8" ? "#d8d8d8" : sefira.color,
          textShadow: `0 0 10px ${sefira.glow}88`,
          opacity: selected || hovered ? 1 : 0.65,
          transition: "opacity 0.3s",
          userSelect: "none",
        }}>
          <div style={{ fontFamily: "var(--font-hebrew)", fontSize: "14px" }}>{sefira.he}</div>
        </div>
      </Html>
    </group>
  );
}

// ─── Datos de cada sección YHVH + mundo ABYA ─────────────────────────────────
export const YHVH_SECTIONS = [
  {
    id: "kotz",
    he: "◆",
    y: 6.7,
    color: "#ffffff",
    olamHe: "אֵין סוֹף",
    olamAbbr: "—",
    olamEs: "Ein Sof",
    olamFa: "اِین سوف",
    size: 18,
  },
  {
    id: "yud",
    he: "י",
    y: 3.92,
    color: "#e8d070",
    olamHe: "אֲצִילוּת",
    olamAbbr: "א",
    olamEs: "Atzilut — Emanación",
    olamFa: "عالم اَتزیلوت",
    size: 40,
  },
  {
    id: "hei1",
    he: "ה",
    y: 3.0,
    color: "#9999dd",
    olamHe: "בְּרִיאָה",
    olamAbbr: "ב",
    olamEs: "Beriá — Creación",
    olamFa: "عالم بِریاه",
    size: 40,
  },
  {
    id: "vav",
    he: "ו",
    y: -1.85,
    color: "#c9a43e",
    olamHe: "יְצִירָה",
    olamAbbr: "י",
    olamEs: "Yetzirá — Formación",
    olamFa: "عالم یِتزیراه",
    size: 48,
  },
  {
    id: "hei2",
    he: "ה",
    y: -6.44,
    color: "#c9a43e",
    olamHe: "עֲשִׂיָּה",
    olamAbbr: "ע",
    olamEs: "Asiá — Acción",
    olamFa: "عالم عَسیاه",
    size: 40,
  },
];

// ─── Spine del Tetragrámmaton (YHVH) — secciona el árbol horizontalmente ──────
function YHVHSpine({ onYhvhClick, locale }: { onYhvhClick?: (id: string) => void; locale: string }) {
  const XS = 6.4;
  const XL = -5.4;

  const dividers: [[number,number,number],[number,number,number]][] = [
    [[XL, 5.0, -0.05], [XS + 0.5, 5.0, -0.05]],
    [[XL, 2.0, -0.05], [XS + 0.5, 2.0, -0.05]],
    [[XL, -5.3,-0.05], [XS + 0.5,-5.3,-0.05]],
  ];

  return (
    <>
      {/* Spine vertical */}
      <Line points={[[XS, 7.4, 0], [XS, -7.4, 0]]}
        color="#c9a43e" lineWidth={0.6} transparent opacity={0.3} />

      {/* Divisores horizontales — más iluminados */}
      {dividers.map(([a, b], i) => (
        <Line key={i} points={[a, b]}
          color="#e0c060" lineWidth={1.0} transparent opacity={0.55} />
      ))}

      {/* Corchete del Vav (ZA) — más visible */}
      <Line
        points={[
          [XS + 0.2, 0.7,   0.1],
          [XS + 0.6, 0.7,   0.1],
          [XS + 0.6, -4.48, 0.1],
          [XS + 0.2, -4.48, 0.1],
        ]}
        color="#e0c060" lineWidth={2.0} transparent opacity={0.75}
      />

      {/* Etiquetas YHVH — más grandes + mundo ABYA */}
      {YHVH_SECTIONS.map((s) => (
        <Html key={s.id} position={[XS + 0.8, s.y, 0.2]} center distanceFactor={13} zIndexRange={[10,0]}>
          <button
            onClick={() => onYhvhClick?.(s.id)}
            style={{
              background: "none", border: "none", padding: "2px 4px",
              cursor: "pointer", textAlign: "center", userSelect: "none",
            }}
          >
            {/* Letra principal */}
            <div style={{
              fontFamily: "var(--font-hebrew)",
              fontSize: `${s.size}px`,
              color: s.color,
              textShadow: `0 0 14px ${s.color}cc, 0 0 28px ${s.color}77, 0 0 4px ${s.color}`,
              lineHeight: 1,
              filter: `drop-shadow(0 0 6px ${s.color}aa)`,
            }}>
              {s.he}
            </div>
            {/* Mundo ABYA — pequeño, debajo de la letra */}
            <div style={{
              fontFamily: "var(--font-hebrew)",
              fontSize: "9px",
              color: s.color,
              opacity: 0.7,
              marginTop: "1px",
              textShadow: `0 0 6px ${s.color}88`,
              whiteSpace: "nowrap",
            }}>
              {locale === "fa" ? s.olamFa : s.olamHe}
            </div>
          </button>
        </Html>
      ))}
    </>
  );
}

// ─── Escena exportada ─────────────────────────────────────────────
export interface TreeSceneProps {
  selected: string | null;
  depth: { sefiraId: string }[];
  onSelect: (id: string) => void;
  onLetterClick?: (letter: string) => void;
  onYhvhClick?: (id: string) => void;
  locale: string;
}

export default function TreeScene({ selected, onSelect, onLetterClick, onYhvhClick, locale }: TreeSceneProps) {
  const controlsRef = useRef<any>(null);

  return (
    <>
      {/* 360° órbita: arrastrar para rotar, scroll para zoom */}
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        minDistance={5}
        maxDistance={24}
        zoomSpeed={0.7}
        rotateSpeed={0.55}
        dampingFactor={0.1}
        enableDamping
      />
      <FocusHelper selected={selected} controlsRef={controlsRef} />

      {/* Iluminación */}
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 10, 5]} intensity={0.25} />
      {/* Luz Ein Sof desde arriba */}
      <pointLight position={[0, 14, 2]} color="#c9a43e" intensity={2.5} distance={22} decay={1.4} />

      <Stars radius={70} depth={35} count={4000} factor={3} saturation={0} fade speed={0.4} />

      {/* Senderos con letras hebreas */}
      {PATHS.map(([a, b, letter, letterName], i) => {
        const pa = SPOS[a];
        const pb = SPOS[b];
        const mid: [number, number, number] = [
          (pa[0] + pb[0]) / 2,
          (pa[1] + pb[1]) / 2,
          0.12,
        ];
        const isActive = selected === a || selected === b;
        const selA = getSefira(a);
        const selB = getSefira(b);
        const pathColor = isActive
          ? (selA?.id === selected ? selA?.glow : selB?.glow) ?? "#c9a43e"
          : "#c9a43e";

        return (
          <group key={i}>
            <Line
              points={[pa, pb]}
              color={pathColor}
              lineWidth={isActive ? 1.4 : 0.55}
              transparent
              opacity={isActive ? 0.7 : 0.2}
            />
            {/* Letra hebrea en el sendero — clicable */}
            <Html position={mid} center distanceFactor={14} zIndexRange={[5, 0]}>
              <button
                onClick={(e) => { e.stopPropagation(); onLetterClick?.(letter); }}
                title={letterName}
                style={{
                  fontFamily: "var(--font-hebrew)",
                  fontSize: isActive ? "15px" : "11px",
                  fontWeight: "bold",
                  color: isActive ? pathColor : "#e0c873",
                  opacity: isActive ? 1 : 0.6,
                  textShadow: isActive
                    ? `0 0 12px ${pathColor}, 0 0 20px ${pathColor}88`
                    : "0 0 8px #c9a43e88, 0 0 4px #e0c87366",
                  filter: isActive ? `drop-shadow(0 0 6px ${pathColor})` : "none",
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  padding: "2px",
                  lineHeight: 1,
                  transition: "all 0.3s",
                  userSelect: "none",
                }}
              >
                {letter}
              </button>
            </Html>
          </group>
        );
      })}

      {/* Sefirot */}
      {SEFIROT.map((s) => (
        <SefiraNode key={s.id} sefira={s} selected={selected === s.id} locale={locale} onClick={onSelect} />
      ))}

      {/* Tetragrámmaton — secciones YHVH al lado del árbol */}
      <YHVHSpine onYhvhClick={onYhvhClick} locale={locale} />
    </>
  );
}
