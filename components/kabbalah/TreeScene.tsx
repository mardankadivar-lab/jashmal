"use client";

import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Stars, Html, Line } from "@react-three/drei";
import * as THREE from "three";
import { SEFIROT, PATHS, getSefira, sefiraLabel, type Sefira } from "@/lib/sefirot";

// Posiciones 3D de los sefirot
function to3D(x2d: number, y2d: number): [number, number, number] {
  return [(x2d - 50) / 50 * 4.8, -(y2d - 50) / 50 * 7, 0];
}
const SPOS: Record<string, [number, number, number]> = {};
SEFIROT.forEach((s) => { SPOS[s.id] = to3D(s.x, s.y); });

// ─── Cámara animada ───────────────────────────────────────────────
function CameraRig({ targetZ, focusId }: { targetZ: number; focusId: string | null }) {
  const { camera } = useThree();
  const focus = focusId ? SPOS[focusId] : null;
  useFrame(() => {
    camera.position.z += (targetZ - camera.position.z) * 0.05;
    camera.position.x += ((focus ? focus[0] * 0.25 : 0) - camera.position.x) * 0.05;
    camera.position.y += ((focus ? focus[1] * 0.15 : 0) - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
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

// ─── Escena exportada ─────────────────────────────────────────────
export interface TreeSceneProps {
  selected: string | null;
  depth: { sefiraId: string }[];
  onSelect: (id: string) => void;
  locale: string;
  cameraZ: number;
}

export default function TreeScene({ selected, onSelect, locale, cameraZ }: TreeSceneProps) {
  return (
    <>
      <CameraRig targetZ={cameraZ} focusId={selected} />

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
            {/* Letra hebrea en el sendero */}
            <Html position={mid} center distanceFactor={14} zIndexRange={[0, 0]}>
              <div
                title={letterName}
                style={{
                  fontFamily: "var(--font-hebrew)",
                  fontSize: "10px",
                  color: isActive ? pathColor : "#c9a43e",
                  opacity: isActive ? 0.95 : 0.45,
                  textShadow: isActive ? `0 0 8px ${pathColor}` : "0 0 4px #c9a43e66",
                  pointerEvents: "none",
                  userSelect: "none",
                  transition: "opacity 0.3s, color 0.3s",
                  lineHeight: 1,
                }}
              >
                {letter}
              </div>
            </Html>
          </group>
        );
      })}

      {/* Sefirot */}
      {SEFIROT.map((s) => (
        <SefiraNode key={s.id} sefira={s} selected={selected === s.id} locale={locale} onClick={onSelect} />
      ))}
    </>
  );
}
