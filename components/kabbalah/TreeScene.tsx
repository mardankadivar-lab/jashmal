"use client";

import { useRef, useState, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Stars, Html, Billboard, Line } from "@react-three/drei";
import * as THREE from "three";
import { SEFIROT, PATHS, getSefira, sefiraLabel, type Sefira } from "@/lib/sefirot";

// ─── Posiciones 3D de los sefirot (x: -4..4, y: -5..5, z: 0) ───
function to3D(x2d: number, y2d: number): [number, number, number] {
  return [(x2d - 50) / 50 * 4.2, -(y2d - 50) / 50 * 6.5, 0];
}

const SEFIRA_POS: Record<string, [number, number, number]> = {};
SEFIROT.forEach((s) => { SEFIRA_POS[s.id] = to3D(s.x, s.y); });

// ─── Cámara animada ───────────────────────────────────────────────
interface CameraRigProps { targetZ: number; targetPos: THREE.Vector3 | null; }
function CameraRig({ targetZ, targetPos }: CameraRigProps) {
  const { camera } = useThree();
  useFrame(() => {
    const tz = targetPos ? targetZ : targetZ;
    camera.position.z += (tz - camera.position.z) * 0.04;
    if (targetPos) {
      camera.position.x += (targetPos.x * 0.3 - camera.position.x) * 0.04;
      camera.position.y += (targetPos.y * 0.3 - camera.position.y) * 0.04;
    } else {
      camera.position.x += (0 - camera.position.x) * 0.04;
      camera.position.y += (0 - camera.position.y) * 0.04;
    }
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// ─── Nodo sefirá ─────────────────────────────────────────────────
interface SefiraNodeProps {
  sefira: Sefira;
  selected: boolean;
  depthLabel?: string;
  locale: string;
  onClick: (id: string) => void;
}
function SefiraNode({ sefira, selected, depthLabel, locale, onClick }: SefiraNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const [hovered, setHovered] = useState(false);
  const pos = SEFIRA_POS[sefira.id];
  const color = new THREE.Color(sefira.color === "#f8f8f8" ? "#dddddd" : sefira.color);
  const glow = new THREE.Color(sefira.glow);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (meshRef.current) {
      const pulse = 1 + Math.sin(t * 1.8 + sefira.number * 0.7) * 0.04;
      meshRef.current.scale.setScalar(selected ? pulse * 1.3 : hovered ? pulse * 1.15 : pulse);
    }
    if (lightRef.current) {
      lightRef.current.intensity = selected ? 4 + Math.sin(t * 3) * 1 : hovered ? 2.5 : 1.2;
    }
  });

  return (
    <group position={pos}>
      {/* Luz de resplandor */}
      <pointLight ref={lightRef} color={glow} distance={3.5} decay={2} />

      {/* Esfera principal */}
      <mesh ref={meshRef}
        onClick={(e) => { e.stopPropagation(); onClick(sefira.id); }}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <sphereGeometry args={[0.32, 64, 64]} />
        <meshStandardMaterial
          color={color}
          emissive={glow}
          emissiveIntensity={selected ? 2.5 : hovered ? 1.5 : 0.5}
          roughness={0.05}
          metalness={0.9}
        />
      </mesh>

      {/* Anillo de selección */}
      {selected && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.55, 0.02, 8, 64]} />
          <meshBasicMaterial color={glow} transparent opacity={0.7} />
        </mesh>
      )}

      {/* Etiqueta HTML (hebreo + nombre) */}
      <Html center distanceFactor={10} zIndexRange={[10, 0]}
        style={{ pointerEvents: "none", textAlign: "center", whiteSpace: "nowrap" }}
      >
        <div style={{
          transform: "translateY(28px)",
          color: sefira.color === "#f8f8f8" ? "#dddddd" : sefira.color,
          textShadow: `0 0 8px ${sefira.glow}`,
          opacity: selected || hovered ? 1 : 0.7,
          transition: "opacity 0.3s",
        }}>
          <div style={{ fontFamily: "var(--font-hebrew)", fontSize: "13px", lineHeight: 1 }}>
            {sefira.he}
          </div>
          {selected && (
            <div style={{ fontFamily: "var(--font-cinzel)", fontSize: "8px", letterSpacing: "0.08em", marginTop: "2px", opacity: 0.8 }}>
              {depthLabel || sefiraLabel(sefira, locale)}
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}

// ─── Rayo de referencia ──────────────────────────────────────────
interface RefRayProps {
  from: [number, number, number];
  ref_text: string;
  angle: number;
  color: string;
  onRefClick: (ref: string) => void;
}
function RefRay({ from, ref_text, angle, color, onRefClick }: RefRayProps) {
  const len = 2.8;
  const rad = (angle * Math.PI) / 180;
  const to: [number, number, number] = [
    from[0] + Math.sin(rad) * len,
    from[1] + Math.cos(rad) * len * 0.8,
    from[2] + 0.5,
  ];
  const glow = new THREE.Color(color);

  return (
    <group>
      <Line points={[from, to]} color={color} lineWidth={1.5} transparent opacity={0.6}
        dashed dashSize={0.08} gapSize={0.04} />
      <mesh position={to}
        onClick={(e) => { e.stopPropagation(); onRefClick(ref_text); }}
      >
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={glow} />
      </mesh>
      <Html position={to} center zIndexRange={[20, 0]}>
        <div
          onClick={() => onRefClick(ref_text)}
          style={{
            transform: "translate(8px, -4px)",
            background: "rgba(5,5,10,0.85)",
            border: `1px solid ${color}66`,
            borderRadius: "4px",
            padding: "2px 5px",
            color: color,
            fontSize: "8px",
            fontFamily: "var(--font-cinzel)",
            whiteSpace: "nowrap",
            cursor: "pointer",
            textShadow: `0 0 6px ${color}`,
            backdropFilter: "blur(4px)",
          }}
        >
          {ref_text.length > 16 ? ref_text.slice(0, 15) + "…" : ref_text}
        </div>
      </Html>
    </group>
  );
}

// ─── Escena principal ────────────────────────────────────────────
export interface TreeSceneProps {
  selected: string | null;
  depth: { sefiraId: string }[];
  onSelect: (id: string) => void;
  onRefClick: (ref: string) => void;
  locale: string;
  cameraZ: number;
}

export default function TreeScene({
  selected, depth, onSelect, onRefClick, locale, cameraZ
}: TreeSceneProps) {
  const selectedSefira = selected ? getSefira(selected) : null;
  const targetPos = selectedSefira
    ? new THREE.Vector3(...SEFIRA_POS[selectedSefira.id])
    : null;

  // Rays de referencias (solo cuando hay una sefirá seleccionada)
  const rays = selectedSefira
    ? selectedSefira.refs.map((ref, i) => {
        const total = selectedSefira.refs.length;
        const angle = -55 + (i / Math.max(total - 1, 1)) * 110;
        return { ref, angle };
      })
    : [];

  return (
    <>
      <CameraRig targetZ={cameraZ} targetPos={targetPos} />

      {/* Iluminación ambiental */}
      <ambientLight intensity={0.15} />
      <directionalLight position={[0, 10, 5]} intensity={0.3} />

      {/* Luz Ein Sof desde arriba (dorada) */}
      <pointLight position={[0, 12, 2]} color="#c9a43e" intensity={2} distance={18} decay={1.5} />

      {/* Estrellas de fondo */}
      <Stars radius={60} depth={30} count={3000} factor={3} saturation={0} fade speed={0.5} />

      {/* Senderos luminosos */}
      {PATHS.map(([a, b], i) => {
        const pa = SEFIRA_POS[a];
        const pb = SEFIRA_POS[b];
        const isActive = selected === a || selected === b;
        return (
          <Line key={i}
            points={[pa, pb]}
            color={isActive ? "#c9a43e" : "#c9a43e"}
            lineWidth={isActive ? 1.2 : 0.5}
            transparent
            opacity={isActive ? 0.65 : 0.18}
          />
        );
      })}

      {/* Rayos de referencias */}
      {selectedSefira && rays.map((ray, i) => (
        <RefRay
          key={i}
          from={SEFIRA_POS[selectedSefira.id]}
          ref_text={ray.ref}
          angle={ray.angle}
          color={selectedSefira.glow}
          onRefClick={onRefClick}
        />
      ))}

      {/* Sefirot */}
      {SEFIROT.map((s) => (
        <SefiraNode key={s.id}
          sefira={s}
          selected={selected === s.id}
          locale={locale}
          onClick={onSelect}
        />
      ))}
    </>
  );
}
