"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html, Stars } from "@react-three/drei";
import * as THREE from "three";
import { useLocale } from "next-intl";
import { COSMOLOGY_STAGES } from "@/lib/cosmologyStages";
import { useRouter } from "@/i18n/navigation";

// ── Posiciones del Árbol de la Vida (sefirot en 3D) ──────────────────────────
const TREE_POSITIONS: [number, number, number][] = [
  [0,    3.5,  0],  // Keter
  [2.2,  2.2,  0],  // Chokhmah
  [-2.2, 2.2,  0],  // Binah
  [2.2,  0,    0],  // Chesed
  [-2.2, 0,    0],  // Gevurah
  [0,    -0.5, 0],  // Tiferet
  [2.2,  -2.0, 0],  // Netzach
  [-2.2, -2.0, 0],  // Hod
  [0,    -3.2, 0],  // Yesod
  [0,    -4.8, 0],  // Malkhut
];

const TREE_CONNECTIONS: [number, number][] = [
  [0,1],[0,2],[0,5],[1,2],[1,3],[1,5],[2,4],[2,5],[3,4],[3,5],[3,6],
  [4,5],[4,7],[5,6],[5,7],[5,8],[6,7],[6,8],[6,9],[7,8],[7,9],[8,9],
];

const N = 5000; // partículas totales

// ── Generadores de posición por comportamiento ────────────────────────────────
function genPositions(behavior: string, t: number): Float32Array {
  const pos = new Float32Array(N * 3);
  const seed = (i: number, s: number) => Math.sin(i * 127.1 + s) * 0.5 + 0.5;

  for (let i = 0; i < N; i++) {
    const fi = i / N;
    const r0 = seed(i, 0);
    const r1 = seed(i, 1);
    const r2 = seed(i, 2);
    const theta = r0 * Math.PI * 2;
    const phi = Math.acos(2 * r1 - 1);
    let x = 0, y = 0, z = 0;

    switch (behavior) {
      case "sphere-expand": {
        const r = Math.pow(r2, 0.5) * 5 + Math.sin(t * 0.3 + fi * 6) * 0.3;
        x = r * Math.sin(phi) * Math.cos(theta);
        y = r * Math.sin(phi) * Math.sin(theta);
        z = r * Math.cos(phi) * 0.4;
        break;
      }
      case "sphere-contract": {
        const r = Math.pow(r2, 2) * 1.5;
        x = r * Math.sin(phi) * Math.cos(theta);
        y = r * Math.sin(phi) * Math.sin(theta);
        z = r * Math.cos(phi) * 0.3;
        break;
      }
      case "sparse": {
        const r = 3 + r2 * 8;
        x = r * Math.sin(phi) * Math.cos(theta) * (1 + Math.sin(t * 0.1 + fi * 3) * 0.1);
        y = r * Math.sin(phi) * Math.sin(theta);
        z = r * Math.cos(phi) * 0.5;
        break;
      }
      case "beam": {
        const onBeam = r0 < 0.6;
        if (onBeam) {
          x = (r1 - 0.5) * 0.4;
          y = (r2 - 0.3) * 12;
          z = (seed(i, 3) - 0.5) * 0.3;
        } else {
          x = (r1 - 0.5) * 0.2 + Math.sin(t * 0.5 + fi * 10) * 0.1;
          y = (r2 - 0.5) * 12;
          z = (seed(i, 3) - 0.5) * 0.2;
        }
        break;
      }
      case "humanoid": {
        // Torso, cabeza, brazos, piernas como volúmenes
        const zone = r0;
        if (zone < 0.15) { // cabeza
          x = (r1 - 0.5) * 1.2; y = 3.5 + r2 * 1.2; z = (seed(i,3)-0.5)*0.8;
        } else if (zone < 0.5) { // torso
          x = (r1 - 0.5) * 1.8; y = 0.5 + r2 * 2.5; z = (seed(i,3)-0.5)*0.9;
        } else if (zone < 0.65) { // brazo izq
          x = -1.5 - r1 * 2; y = 1.5 - r2 * 1.5; z = (seed(i,3)-0.5)*0.5;
        } else if (zone < 0.8) { // brazo der
          x = 1.5 + r1 * 2; y = 1.5 - r2 * 1.5; z = (seed(i,3)-0.5)*0.5;
        } else { // piernas
          x = (r1 - 0.5) * 1.6; y = -1.5 - r2 * 3; z = (seed(i,3)-0.5)*0.7;
        }
        x += Math.sin(t * 0.4 + fi * 5) * 0.1;
        y += Math.cos(t * 0.3 + fi * 7) * 0.08;
        break;
      }
      case "clusters-tight": {
        const cluster = Math.floor(r0 * 10);
        const cx = TREE_POSITIONS[cluster][0] * 0.5;
        const cy = TREE_POSITIONS[cluster][1] * 0.5;
        x = cx + (r1 - 0.5) * 0.8 + Math.sin(t * 0.5 + cluster) * 0.1;
        y = cy + (r2 - 0.5) * 0.8 + Math.cos(t * 0.4 + cluster) * 0.1;
        z = (seed(i,3) - 0.5) * 0.4;
        break;
      }
      case "clusters-loose": {
        const cluster = Math.floor(r0 * 10);
        const cx = TREE_POSITIONS[cluster][0] * 1.2;
        const cy = TREE_POSITIONS[cluster][1] * 1.2;
        x = cx + (r1 - 0.5) * 0.5;
        y = cy + (r2 - 0.5) * 0.5;
        z = (seed(i,3) - 0.5) * 0.3;
        break;
      }
      case "explode": {
        const r = 4 + r2 * 14 + Math.sin(t * 2 + fi * 20) * 0.5;
        x = r * Math.sin(phi) * Math.cos(theta);
        y = r * Math.sin(phi) * Math.sin(theta);
        z = r * Math.cos(phi) * 0.6;
        break;
      }
      case "rain": {
        const fallOffset = ((r1 + t * 0.4) % 1);
        x = (r0 - 0.5) * 14;
        y = 6 - fallOffset * 14;
        z = (r2 - 0.5) * 4;
        break;
      }
      case "trapped": {
        const cluster = Math.floor(r0 * 10);
        const spread = cluster < 5 ? 0.3 : 2.5; // algunas chispas atrapadas (pequeñas), otras dispersas
        x = (r1 - 0.5) * 20 * spread - 5 + cluster;
        y = (r2 - 0.5) * 20 * spread;
        z = (seed(i,3) - 0.5) * 5;
        break;
      }
      case "tree":
      case "tree-glow": {
        const sefiraIdx = Math.floor(r0 * 10);
        const [tx, ty, tz] = TREE_POSITIONS[sefiraIdx];
        const rad = behavior === "tree-glow"
          ? 0.35 + Math.sin(t * 1.5 + sefiraIdx) * 0.12
          : 0.5 + r2 * 0.3;
        x = tx + (r1 - 0.5) * rad * 2;
        y = ty + (r2 - 0.5) * rad * 2;
        z = tz + (seed(i,3) - 0.5) * rad;
        break;
      }
      case "planes": {
        const plane = Math.floor(r0 * 4);
        x = (r1 - 0.5) * 12;
        y = 3.5 - plane * 2.5 + (r2 - 0.5) * 0.6;
        z = (seed(i,3) - 0.5) * 5;
        break;
      }
      case "spiral-up": {
        const angle = fi * Math.PI * 8 + t * 0.6;
        const r = 1.5 + r2 * 2;
        x = Math.cos(angle) * r;
        y = fi * 12 - 5 + Math.sin(t * 0.3) * 0.5;
        z = Math.sin(angle) * r * 0.5;
        break;
      }
    }
    pos[i * 3] = x;
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = z;
  }
  return pos;
}

// ── Partículas principales ────────────────────────────────────────────────────
function CosmologyParticles({ stageIdx, stageFrac, time }: {
  stageIdx: number; stageFrac: number; time: number;
}) {
  const ref = useRef<THREE.Points>(null);
  const prevRef = useRef<Float32Array | null>(null);

  const geo = useMemo(() => new THREE.BufferGeometry(), []);

  const stage = COSMOLOGY_STAGES[stageIdx];
  const nextStage = COSMOLOGY_STAGES[Math.min(stageIdx + 1, COSMOLOGY_STAGES.length - 1)];

  const currentColor = new THREE.Color(stage.particleColor);
  const nextColor = new THREE.Color(nextStage.particleColor);
  const color = currentColor.clone().lerp(nextColor, stageFrac);

  useFrame(() => {
    if (!ref.current) return;
    const curPos = genPositions(stage.particleBehavior, time);
    const nxtPos = genPositions(nextStage.particleBehavior, time);

    // Interpolar entre estado actual y siguiente
    const blended = new Float32Array(N * 3);
    for (let i = 0; i < N * 3; i++) {
      blended[i] = curPos[i] * (1 - stageFrac) + nxtPos[i] * stageFrac;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(blended, 3));
    ref.current.material = new THREE.PointsMaterial({
      color,
      size: stageIdx === 7 ? 0.12 : 0.06, // más grande en explosión
      transparent: true,
      opacity: 0.55 + stage.particleIntensity * 0.35,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  });

  return <points ref={ref} geometry={geo} />;
}

// ── Árbol de la Vida (visible en etapas 10-13) ────────────────────────────────
function TreeLines({ opacity }: { opacity: number }) {
  if (opacity < 0.01) return null;
  return (
    <group>
      {TREE_CONNECTIONS.map(([a, b], i) => {
        const pa = TREE_POSITIONS[a];
        const pb = TREE_POSITIONS[b];
        return (
          <line key={i}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array([...pa, ...pb]), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#c9a43e" transparent opacity={opacity * 0.45} />
          </line>
        );
      })}
      {TREE_POSITIONS.map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshBasicMaterial color="#e8c866" transparent opacity={opacity * 0.8} />
        </mesh>
      ))}
    </group>
  );
}

// ── Flash de la Shevirat ──────────────────────────────────────────────────────
function SheviratFlash({ intensity }: { intensity: number }) {
  if (intensity < 0.01) return null;
  return (
    <mesh position={[0, 0, 8]}>
      <planeGeometry args={[200, 200]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={intensity * 0.92} depthWrite={false} />
    </mesh>
  );
}

// ── Ein Sof glow central ──────────────────────────────────────────────────────
function EinSofGlow({ opacity }: { opacity: number }) {
  if (opacity < 0.01) return null;
  return (
    <>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[3.5, 32, 32]} />
        <meshBasicMaterial color="#fffef0" transparent opacity={opacity * 0.3} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={opacity * 0.6} />
      </mesh>
      <pointLight color="#fffef0" intensity={opacity * 8} distance={20} />
    </>
  );
}

// ── Kav beam ─────────────────────────────────────────────────────────────────
function KavBeam({ opacity }: { opacity: number }) {
  if (opacity < 0.01) return null;
  return (
    <mesh position={[0, 0, 0]}>
      <cylinderGeometry args={[0.03, 0.03, 16, 8]} />
      <meshBasicMaterial color="#f8e060" transparent opacity={opacity * 0.9} />
    </mesh>
  );
}

// ── Escena principal ──────────────────────────────────────────────────────────
export default function CosmologyScene({
  scrollProgress,
  onStudyRef,
}: {
  scrollProgress: number;
  onStudyRef?: (ref: string) => void;
}) {
  const timeRef = useRef(0);
  const locale = useLocale();
  const totalStages = COSMOLOGY_STAGES.length;

  useFrame((_, delta) => { timeRef.current += delta; });

  const rawStage = scrollProgress * totalStages;
  const stageIdx = Math.min(Math.floor(rawStage), totalStages - 1);
  const stageFrac = rawStage - stageIdx;
  const stage = COSMOLOGY_STAGES[stageIdx];

  // Opacidades por etapa
  const einSofOpacity = stageIdx === 0 ? 1 - stageFrac : stageIdx === 13 ? stageFrac : 0;
  const kavOpacity = (stageIdx === 3 ? stageFrac : stageIdx === 4 ? 1 - stageFrac : 0);
  const treeOpacity = stageIdx >= 10 ? Math.min((stageIdx - 9) / 3 + stageFrac * 0.33, 1) : 0;
  const flashIntensity = stageIdx === 7 ? Math.sin(stageFrac * Math.PI) : 0;

  return (
    <>
      <ambientLight intensity={0.08} />
      <pointLight position={[0, 5, 5]} color="#c9a43e" intensity={0.5} />

      <Stars radius={80} depth={50} count={3000} factor={2.5} saturation={0} fade speed={0.2} />

      <EinSofGlow opacity={einSofOpacity} />
      <KavBeam opacity={kavOpacity} />
      <TreeLines opacity={treeOpacity} />
      <SheviratFlash intensity={flashIntensity} />

      <CosmologyParticles
        stageIdx={stageIdx}
        stageFrac={stageFrac}
        time={timeRef.current}
      />
    </>
  );
}
