"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars, Html, Line } from "@react-three/drei";
import * as THREE from "three";

// ── Utilidad smoothstep ───────────────────────────────────────────────────────
function ss(a: number, b: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

// ── Suelo del desierto ────────────────────────────────────────────────────────
function Desert({ t }: { t: number }) {
  const op = ss(0, 1.5, t);
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshBasicMaterial color="#0d0a04" transparent opacity={op * 0.9} />
      </mesh>
      {/* Horizonte tenue */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.15, 0]}>
        <planeGeometry args={[40, 4]} />
        <meshBasicMaterial color="#1a1208" transparent opacity={op * 0.5} />
      </mesh>
    </group>
  );
}

// ── La piedra ─────────────────────────────────────────────────────────────────
function Stone({ t }: { t: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const stoneOp = ss(2, 3.5, t) * (1 - ss(5.5, 6.2, t));
  const pulse = 1 + Math.sin(t * 2.5) * 0.04 * ss(3, 5.5, t);

  useFrame(() => {
    if (meshRef.current) meshRef.current.scale.setScalar(pulse);
  });

  if (stoneOp < 0.01) return null;

  return (
    <group position={[0, -1.8, 0]}>
      {/* Cuerpo de la piedra */}
      <mesh ref={meshRef} scale={[1.0, 0.55, 0.8]}>
        <dodecahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial
          color="#1e1608" roughness={0.95} metalness={0.05}
          transparent opacity={stoneOp}
        />
      </mesh>
      {/* Veta interna dorada */}
      <mesh scale={[0.95, 0.52, 0.75]}>
        <dodecahedronGeometry args={[0.55, 0]} />
        <meshBasicMaterial color="#c9a43e" transparent
          opacity={stoneOp * ss(2, 5, t) * 0.12} />
      </mesh>
      {/* Glow interior */}
      <pointLight color="#f0d060" intensity={ss(2.5, 5, t) * 4} distance={3} decay={2} />
    </group>
  );
}

// ── Explosión al romperse ─────────────────────────────────────────────────────
function StoneExplosion({ t }: { t: number }) {
  const ref = useRef<THREE.Points>(null);
  const N = 250;

  const { geo, vel } = useMemo(() => {
    const v = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      const sp = 0.8 + Math.random() * 2.5;
      v[i*3]   = Math.sin(ph) * Math.cos(th) * sp;
      v[i*3+1] = Math.abs(Math.sin(ph) * Math.sin(th)) * sp * 0.4 - 0.1;
      v[i*3+2] = Math.cos(ph) * sp * 0.35;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(N * 3), 3));
    return { geo: g, vel: v };
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const active = t > 5.5 && t < 10;
    if (!active) { (ref.current.material as THREE.PointsMaterial).opacity = 0; return; }
    const age = t - 5.5;
    const friction = Math.max(0, 1 - age * 0.25);
    const pos = geo.attributes.position.array as Float32Array;
    for (let i = 0; i < N; i++) {
      pos[i*3]   = vel[i*3]   * age * friction;
      pos[i*3+1] = -1.8 + vel[i*3+1] * age * friction - age * age * 0.05;
      pos[i*3+2] = vel[i*3+2] * age * friction;
    }
    geo.attributes.position.needsUpdate = true;
    (ref.current.material as THREE.PointsMaterial).opacity = Math.max(0, 0.85 - age * 0.28);
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color="#f0d060" size={0.07} transparent opacity={0}
        sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

// ── Mitades de la piedra separándose ─────────────────────────────────────────
function StoneParts({ t }: { t: number }) {
  const sep = ss(5.8, 7.5, t);
  const op  = ss(5.5, 6.5, t) * (1 - ss(8.5, 9.5, t));
  if (op < 0.01) return null;

  return (
    <>
      {[-1, 1].map((side) => (
        <group key={side} position={[side * sep * 1.6, -1.8, 0]}>
          <mesh scale={[0.9, 0.5, 0.75]}>
            <dodecahedronGeometry args={[0.42, 0]} />
            <meshStandardMaterial color="#1e1608" roughness={0.95}
              transparent opacity={op} />
          </mesh>
          <pointLight color={side === -1 ? "#f08030" : "#f0e060"}
            intensity={sep * 5} distance={4} decay={2} />
        </group>
      ))}
    </>
  );
}

// ── Flash blanco al romperse ──────────────────────────────────────────────────
function CrackFlash({ t }: { t: number }) {
  const op = Math.sin(ss(5.5, 6.0, t) * Math.PI);
  if (op < 0.01) return null;
  return (
    <mesh position={[0, 0, 5]}>
      <planeGeometry args={[200, 200]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={op * 0.75} depthWrite={false} />
    </mesh>
  );
}

// ── Haz de luz (Nachash / Mashiaj) ────────────────────────────────────────────
function LightBeam({ side, t }: { side: "left" | "right"; t: number }) {
  const startT = 7.0;
  const beamOp = ss(startT, startT + 2, t);
  if (beamOp < 0.01) return null;

  const x = side === "left" ? -2.0 : 2.0;
  // Najash = ámbar oscuro / Mashiaj = dorado claro
  const color  = side === "left" ? "#e08020" : "#f0e050";
  const color2 = side === "left" ? "#ff6010" : "#ffffff";
  const h = 6 + beamOp * 2;
  const baseY = -1.8;

  return (
    <group position={[x, baseY + h / 2, 0]}>
      {/* Cono exterior */}
      <mesh>
        <cylinderGeometry args={[0.05, 0.7, h, 16, 1, true]} />
        <meshBasicMaterial color={color} transparent opacity={beamOp * 0.28}
          side={THREE.BackSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {/* Núcleo brillante */}
      <mesh>
        <cylinderGeometry args={[0.02, 0.2, h * 0.96, 8, 1, true]} />
        <meshBasicMaterial color={color2} transparent opacity={beamOp * 0.55}
          side={THREE.BackSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {/* Luz puntual */}
      <pointLight color={color} intensity={beamOp * 6} distance={8} decay={2} />
    </group>
  );
}

// ── Partículas flotando dentro de cada haz ────────────────────────────────────
function BeamParticles({ side, t }: { side: "left" | "right"; t: number }) {
  const ref = useRef<THREE.Points>(null);
  const N = 120;
  const startT = 7.5;
  const x0 = side === "left" ? -2.0 : 2.0;
  const color = side === "left" ? "#e09030" : "#f0e070";

  const { geo, seeds } = useMemo(() => {
    const s = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      s[i*3]   = Math.sin(i * 127.1) * 0.5 + 0.5;
      s[i*3+1] = Math.cos(i * 311.7) * 0.5 + 0.5;
      s[i*3+2] = Math.sin(i * 57.3) * 0.5 + 0.5;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(N * 3), 3));
    return { geo: g, seeds: s };
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const op = ss(startT, startT + 2, t) * (1 - ss(19, 20, t));
    if (op < 0.01) { (ref.current.material as THREE.PointsMaterial).opacity = 0; return; }
    const age = t - startT;
    const pos = geo.attributes.position.array as Float32Array;
    for (let i = 0; i < N; i++) {
      const r = seeds[i*3+2] * 0.4;
      const ang = seeds[i*3] * Math.PI * 2;
      pos[i*3]   = x0 + Math.cos(ang) * r;
      pos[i*3+1] = -1.8 + ((seeds[i*3+1] + age * 0.15) % 1) * 8;
      pos[i*3+2] = Math.sin(ang) * r * 0.5;
    }
    geo.attributes.position.needsUpdate = true;
    (ref.current.material as THREE.PointsMaterial).opacity = op * 0.5;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color={color} size={0.055} transparent opacity={0}
        sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

// ── Silueta de serpiente (izquierda) ──────────────────────────────────────────
function SerpentSilhouette({ t }: { t: number }) {
  const op = ss(13, 15, t) * (1 - ss(19.5, 20.5, t));
  if (op < 0.01) return null;

  // Curva sinuosa de serpiente
  const pts = useMemo(() => {
    const p: [number, number, number][] = [];
    for (let i = 0; i <= 30; i++) {
      const f = i / 30;
      const y = -1.8 + f * 7;
      const x = -2.0 + Math.sin(f * Math.PI * 3.5 + 0.5) * (0.35 - f * 0.15);
      p.push([x, y, 0]);
    }
    // Cabeza con triángulo (lengua)
    p.push([-2.0 + 0.15, -1.8 + 7.3, 0]);
    p.push([-2.0 - 0.15, -1.8 + 7.3, 0]);
    return p;
  }, []);

  return (
    <group>
      <Line points={pts} color="#ff6010"
        lineWidth={2.5} transparent opacity={op * 0.85} />
      {/* Cabeza de serpiente */}
      <mesh position={[-2.0, -1.8 + 7.4, 0]}>
        <circleGeometry args={[0.18, 8]} />
        <meshBasicMaterial color="#e05010" transparent opacity={op * 0.7} />
      </mesh>
      <pointLight position={[-2.0, 3, 0.5]} color="#ff6010"
        intensity={op * 3} distance={4} decay={2} />
    </group>
  );
}

// ── Silueta humana (derecha) ──────────────────────────────────────────────────
function HumanSilhouette({ t }: { t: number }) {
  const op = ss(13, 15, t) * (1 - ss(19.5, 20.5, t));
  if (op < 0.01) return null;

  const x = 2.0;
  const base = -1.8;

  // Cuerpo como líneas
  const lines: [[number,number,number],[number,number,number]][] = [
    [[x, base+6.8, 0], [x, base+5.5, 0]],        // cuello-cuerpo
    [[x-0.6, base+6.0, 0], [x+0.6, base+6.0, 0]], // hombros
    [[x-0.6, base+6.0, 0], [x-0.45, base+4.8, 0]],// brazo izq
    [[x+0.6, base+6.0, 0], [x+0.45, base+4.8, 0]],// brazo der
    [[x, base+5.5, 0], [x, base+3.5, 0]],          // torso
    [[x, base+3.5, 0], [x-0.45, base+1.8, 0]],     // pierna izq
    [[x, base+3.5, 0], [x+0.45, base+1.8, 0]],     // pierna der
  ];

  return (
    <group>
      {/* Cabeza */}
      <mesh position={[x, base + 7.35, 0]}>
        <circleGeometry args={[0.35, 16]} />
        <meshBasicMaterial color="#f0e060" transparent opacity={op * 0.4} />
      </mesh>
      {/* Líneas del cuerpo */}
      {lines.map(([a, b], i) => (
        <Line key={i} points={[a, b]} color="#f0e060"
          lineWidth={2} transparent opacity={op * 0.8} />
      ))}
      <pointLight position={[x, 2.5, 0.5]} color="#f0e060"
        intensity={op * 3} distance={4} decay={2} />
    </group>
  );
}

// ── Escena completa ───────────────────────────────────────────────────────────
export default function Scene358({ time }: { time: number }) {
  const t = time;

  return (
    <>
      {/* Iluminación ambiente mínima */}
      <ambientLight intensity={0.04} />

      {/* Estrellas del desierto */}
      <Stars radius={80} depth={50} count={3000} factor={2.5}
        saturation={0} fade speed={0.2} />

      <Desert t={t} />
      <Stone t={t} />
      <StoneExplosion t={t} />
      <CrackFlash t={t} />
      <StoneParts t={t} />

      <LightBeam side="left"  t={t} />
      <LightBeam side="right" t={t} />
      <BeamParticles side="left"  t={t} />
      <BeamParticles side="right" t={t} />

      <SerpentSilhouette t={t} />
      <HumanSilhouette   t={t} />

      {/* Luz ambiental narrativa según momento */}
      {t > 7 && (
        <pointLight position={[0, 0, 3]} color="#c9a43e"
          intensity={ss(7, 9, t) * 2} distance={15} decay={1.5} />
      )}
    </>
  );
}
