"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

// ── Utilidades ────────────────────────────────────────────────────────────────
function ss(e0: number, e1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}
// p = stageIdx + stageFrac  (0..14)
type P = { p: number };

// ── 1. EIN SOF — cuerdas de energía flotantes ─────────────────────────────────
function EinSofStrings({ opacity }: { opacity: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const geosRef  = useRef<THREE.BufferGeometry[]>([]);
  const COUNT = 26;
  const PTS   = 70;

  useEffect(() => {
    if (!groupRef.current) return;
    for (let s = 0; s < COUNT; s++) {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(PTS * 3), 3));
      geosRef.current[s] = geo;
      const hue = [0xf0c830, 0xffeebb, 0xffd060, 0xfff0a0, 0xe8d070][s % 5];
      const mat = new THREE.LineBasicMaterial({
        color: hue, transparent: true,
        opacity: (0.18 + (s % 6) * 0.07),
      });
      groupRef.current.add(new THREE.Line(geo, mat));
    }
    return () => { groupRef.current?.clear(); };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    geosRef.current.forEach((geo, s) => {
      if (!geo) return;
      const pos = geo.attributes.position.array as Float32Array;
      const bx = Math.sin(s * 1.618 * 2.1) * 10;
      const by = Math.cos(s * 2.414 * 1.3) * 7;
      const bz = Math.sin(s * 0.927 * 1.7) * 4;
      const ph = s * 0.618;
      const spd = 0.18 + (s % 4) * 0.06;
      for (let p = 0; p < PTS; p++) {
        const tp = p / (PTS - 1);
        pos[p*3]   = bx + Math.sin(tp * Math.PI * 2.5 + t * spd + ph) * 3;
        pos[p*3+1] = by + (tp - 0.5) * 13 + Math.sin(t * 0.15 + ph * 2) * 1.5;
        pos[p*3+2] = bz + Math.cos(tp * Math.PI * 3.2 + t * spd * 0.7 + ph) * 2.5;
      }
      geo.attributes.position.needsUpdate = true;
      (geo.userData.mat as THREE.LineBasicMaterial | undefined);
    });
    groupRef.current?.children.forEach((c, i) => {
      (c as THREE.Line).material && ((c as THREE.Line).material as THREE.LineBasicMaterial).opacity !== undefined &&
        (((c as THREE.Line).material as THREE.LineBasicMaterial).opacity = opacity * (0.18 + (i % 6) * 0.07));
    });
  });

  return <group ref={groupRef} />;
}

// ── 2. TZIMTZUM — cuerdas que se condensan en un punto ───────────────────────
function TzimtzumEffect({ contraction, pointOpacity }: { contraction: number; pointOpacity: number }) {
  const groupRef  = useRef<THREE.Group>(null);
  const geosRef   = useRef<THREE.BufferGeometry[]>([]);
  const COUNT = 26; const PTS = 70;

  useEffect(() => {
    if (!groupRef.current) return;
    for (let s = 0; s < COUNT; s++) {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(PTS * 3), 3));
      geosRef.current[s] = geo;
      const mat = new THREE.LineBasicMaterial({ color: 0xffd04a, transparent: true, opacity: 0.4 });
      groupRef.current.add(new THREE.Line(geo, mat));
    }
    return () => { groupRef.current?.clear(); };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const inv = 1 - contraction;
    geosRef.current.forEach((geo, s) => {
      if (!geo) return;
      const pos = geo.attributes.position.array as Float32Array;
      const bx = Math.sin(s * 1.618 * 2.1) * 10 * inv;
      const by = Math.cos(s * 2.414 * 1.3) * 7 * inv;
      const bz = Math.sin(s * 0.927 * 1.7) * 4 * inv;
      const ph = s * 0.618; const spd = 0.18 + (s%4)*0.06;
      for (let p = 0; p < PTS; p++) {
        const tp = p / (PTS-1);
        pos[p*3]   = (bx + Math.sin(tp*Math.PI*2.5 + t*spd + ph)*3) * inv;
        pos[p*3+1] = (by + (tp-0.5)*13 + Math.sin(t*0.15+ph*2)*1.5) * inv;
        pos[p*3+2] = (bz + Math.cos(tp*Math.PI*3.2 + t*spd*0.7+ph)*2.5) * inv;
      }
      geo.attributes.position.needsUpdate = true;
    });
    groupRef.current?.children.forEach((c) => {
      ((c as THREE.Line).material as THREE.LineBasicMaterial).opacity = (1-contraction) * 0.5;
    });
  });

  return (
    <group>
      <group ref={groupRef} />
      {/* Punto central brillante */}
      {pointOpacity > 0.01 && (
        <>
          <mesh>
            <sphereGeometry args={[0.07 + pointOpacity * 0.06, 16, 16]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={pointOpacity} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshBasicMaterial color="#fff8e0" transparent opacity={pointOpacity * 0.35} />
          </mesh>
          <pointLight color="#ffffff" intensity={pointOpacity * 20} distance={8} decay={2} />
        </>
      )}
    </group>
  );
}

// ── 3. RESHIMÓ — huella tenue de las cuerdas ──────────────────────────────────
function ReshimoStrings({ opacity }: { opacity: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const geosRef  = useRef<THREE.BufferGeometry[]>([]);
  const COUNT = 26; const PTS = 70;

  useEffect(() => {
    if (!groupRef.current) return;
    for (let s = 0; s < COUNT; s++) {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(PTS * 3), 3));
      geosRef.current[s] = geo;
      const mat = new THREE.LineBasicMaterial({ color: 0xc9a43e, transparent: true, opacity: 0.06 });
      groupRef.current.add(new THREE.Line(geo, mat));
    }
    return () => { groupRef.current?.clear(); };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 0.12; // muy lento — es una huella
    geosRef.current.forEach((geo, s) => {
      if (!geo) return;
      const pos = geo.attributes.position.array as Float32Array;
      const bx = Math.sin(s * 1.618 * 2.1) * 10;
      const by = Math.cos(s * 2.414 * 1.3) * 7;
      const bz = Math.sin(s * 0.927 * 1.7) * 4;
      const ph = s * 0.618; const spd = 0.18 + (s%4)*0.06;
      for (let p = 0; p < PTS; p++) {
        const tp = p / (PTS-1);
        pos[p*3]   = bx + Math.sin(tp*Math.PI*2.5 + t*spd + ph) * 3;
        pos[p*3+1] = by + (tp-0.5)*13 + Math.sin(t*0.15+ph*2)*1.5;
        pos[p*3+2] = bz + Math.cos(tp*Math.PI*3.2 + t*spd*0.7+ph)*2.5;
      }
      geo.attributes.position.needsUpdate = true;
    });
    groupRef.current?.children.forEach((c) => {
      ((c as THREE.Line).material as THREE.LineBasicMaterial).opacity = opacity * 0.1;
    });
  });
  return <group ref={groupRef} />;
}

// ── 4. KAV — rayo luminoso desde el punto central ────────────────────────────
function KavRay({ opacity, length }: { opacity: number; length: number }) {
  if (opacity < 0.01) return null;
  const L = length * 9;
  return (
    <>
      {/* Rayo principal */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.025, 0.025, L, 8]} />
        <meshBasicMaterial color="#f8f060" transparent opacity={opacity * 0.95} />
      </mesh>
      {/* Halo exterior suave */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.12, L * 0.95, 8]} />
        <meshBasicMaterial color="#fff080" transparent opacity={opacity * 0.18} side={THREE.BackSide} />
      </mesh>
      {/* Punto origen */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={opacity} />
      </mesh>
      <pointLight position={[0, 0, 0]} color="#fff8c0" intensity={opacity * 12} distance={10} decay={2} />
    </>
  );
}

// ── 5. ADAM KADMÓN — estructura cósmica arquetípica ───────────────────────────
function AdamKadmon({ opacity }: { opacity: number }) {
  if (opacity < 0.01) return null;
  const o = opacity;
  // Figura cósmica hecha de líneas luminosas (no antropomórfica, sino arquitectónica)
  const lines: [THREE.Vector3, THREE.Vector3, number][] = [
    // Cabeza / corona
    [new THREE.Vector3(0, 5.8, 0), new THREE.Vector3(0, 4.2, 0), 0xd4c8ff],
    // Hombros
    [new THREE.Vector3(-2.5, 3.2, 0), new THREE.Vector3(2.5, 3.2, 0), 0xb0a0ff],
    // Brazos extendidos
    [new THREE.Vector3(-2.5, 3.2, 0), new THREE.Vector3(-4.8, 0.5, 0), 0x9090ee],
    [new THREE.Vector3(2.5, 3.2, 0), new THREE.Vector3(4.8, 0.5, 0), 0x9090ee],
    // Torso
    [new THREE.Vector3(0, 3.2, 0), new THREE.Vector3(0, -1.0, 0), 0xc0b8ff],
    // Pelvis
    [new THREE.Vector3(-1.8, -1.0, 0), new THREE.Vector3(1.8, -1.0, 0), 0xb0a0ff],
    // Piernas
    [new THREE.Vector3(-1.2, -1.0, 0), new THREE.Vector3(-1.8, -5.5, 0), 0x8888dd],
    [new THREE.Vector3(1.2, -1.0, 0), new THREE.Vector3(1.8, -5.5, 0), 0x8888dd],
    // Líneas diagonales internas (estructura interna cósmica)
    [new THREE.Vector3(-2.5, 3.2, 0), new THREE.Vector3(0, -1.0, 0), 0x7070cc],
    [new THREE.Vector3(2.5, 3.2, 0), new THREE.Vector3(0, -1.0, 0), 0x7070cc],
    // Círculo de la cabeza (arco)
    [new THREE.Vector3(-0.8, 5.6, 0), new THREE.Vector3(0.8, 5.6, 0), 0xe0d8ff],
    [new THREE.Vector3(-0.8, 5.6, 0), new THREE.Vector3(-0.4, 4.5, 0), 0xe0d8ff],
    [new THREE.Vector3(0.8, 5.6, 0), new THREE.Vector3(0.4, 4.5, 0), 0xe0d8ff],
  ];

  return (
    <group>
      {lines.map(([a, b, col], i) => {
        const pts = new Float32Array([a.x, a.y, a.z, b.x, b.y, b.z]);
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(pts, 3));
        const mat = new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: o * 0.7 });
        return <primitive key={i} object={new THREE.Line(geo, mat)} />;
      })}
      {/* Puntos en nodos clave */}
      {[[0,5.0,0],[0,3.2,0],[0,0,0],[0,-1.0,0],[-2.5,3.2,0],[2.5,3.2,0],
        [-4.8,0.5,0],[4.8,0.5,0],[-1.8,-5.5,0],[1.8,-5.5,0]].map(([x,y,z],i) => (
        <mesh key={i} position={[x,y,z]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial color="#c0b8ff" transparent opacity={o * 0.8} />
        </mesh>
      ))}
      <pointLight position={[0, 0, 5]} color="#9090ff" intensity={o * 3} distance={15} />
    </group>
  );
}

// ── 7. SHEVIRAT — Big Bang ────────────────────────────────────────────────────
function SheviratBigBang({ p }: P) {
  // p = 7..8 → 7=inicio explosión, 8=fin
  const frac = ss(7, 8, p);
  const flashOp = Math.sin(ss(7, 7.35, p) * Math.PI);
  const shockwave1Scale = 1 + frac * 18;
  const shockwave2Scale = 1 + Math.max(0, frac - 0.2) * 14;
  const plasmaOp = ss(7, 7.3, p) * (1 - ss(7.6, 8.2, p));
  const plasmaR  = frac * 10;

  return (
    <>
      {/* Flash blanco total */}
      {flashOp > 0.01 && (
        <mesh position={[0, 0, 9]}>
          <planeGeometry args={[200, 200]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={flashOp * 0.95} depthWrite={false} />
        </mesh>
      )}
      {/* Onda de choque 1 — naranja */}
      {frac > 0.01 && (
        <mesh rotation={[Math.PI/2, 0, 0]} scale={[shockwave1Scale, shockwave1Scale, 1]}>
          <torusGeometry args={[1, 0.08, 8, 80]} />
          <meshBasicMaterial color="#ff7722" transparent opacity={(1-frac) * 0.9} />
        </mesh>
      )}
      {/* Onda de choque 2 — más suave */}
      {frac > 0.2 && (
        <mesh rotation={[Math.PI/2, 0, 0]} scale={[shockwave2Scale, shockwave2Scale, 1]}>
          <torusGeometry args={[1, 0.04, 8, 80]} />
          <meshBasicMaterial color="#ffcc44" transparent opacity={(1-frac) * 0.5} />
        </mesh>
      )}
      {/* Plasma caliente (esfera que se expande) */}
      {plasmaOp > 0.01 && (
        <mesh>
          <sphereGeometry args={[plasmaR, 32, 32]} />
          <meshBasicMaterial
            color={new THREE.Color(1, 0.4+frac*0.3, 0.1)}
            transparent opacity={plasmaOp * 0.18}
            side={THREE.BackSide}
          />
        </mesh>
      )}
      {/* Luz explosión */}
      <pointLight color="#ff8844" intensity={flashOp * 30 + frac * 5} distance={30} decay={2} />
    </>
  );
}

// ── 8. NITZOTZOT — chispas cayendo ────────────────────────────────────────────
function NitzotzotRain({ opacity }: { opacity: number }) {
  const ref = useRef<THREE.Points>(null);
  const N = 3000;

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(N * 3);
    const seeds = new Float32Array(N * 2); // [xSeed, fallOffset]
    for (let i = 0; i < N; i++) {
      seeds[i*2]   = (Math.sin(i * 127.1) * 0.5 + 0.5);
      seeds[i*2+1] = (Math.cos(i * 311.7) * 0.5 + 0.5);
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.userData.seeds = seeds;
    return g;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    const pos = geo.attributes.position.array as Float32Array;
    const seeds = geo.userData.seeds as Float32Array;
    for (let i = 0; i < N; i++) {
      const sx = seeds[i*2]; const sf = seeds[i*2+1];
      const fallOffset = ((sf + t * 0.35) % 1);
      pos[i*3]   = (sx - 0.5) * 16;
      pos[i*3+1] = 7 - fallOffset * 15;
      pos[i*3+2] = (Math.sin(i * 73.1) * 0.5) * 5;
    }
    geo.attributes.position.needsUpdate = true;
    (ref.current.material as THREE.PointsMaterial).opacity = opacity * 0.7;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        color="#ffd04a" size={0.07} transparent opacity={opacity * 0.7}
        sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false}
      />
    </points>
  );
}

// ── 9. KELIPOT — cuerpos negros con chispas atrapadas ─────────────────────────
function KelipotSpheres({ opacity }: { opacity: number }) {
  const spheres = useMemo(() => Array.from({ length: 14 }, (_, i) => ({
    x: Math.sin(i * 2.399) * 7,
    y: Math.cos(i * 1.732) * 5.5,
    z: Math.sin(i * 0.618) * 3,
    r: 0.35 + (i % 4) * 0.15,
  })), []);

  if (opacity < 0.01) return null;

  return (
    <group>
      {spheres.map((s, i) => (
        <group key={i} position={[s.x, s.y, s.z]}>
          {/* Cuerpo negro */}
          <mesh>
            <sphereGeometry args={[s.r, 16, 16]} />
            <meshBasicMaterial color="#000000" transparent opacity={opacity * 0.98} />
          </mesh>
          {/* Chispa interior (asoma por el borde) */}
          <mesh>
            <sphereGeometry args={[s.r * 0.22, 8, 8]} />
            <meshBasicMaterial color="#ffd04a" transparent opacity={opacity * 0.9} />
          </mesh>
          {/* Grieta / destello sutil */}
          <mesh>
            <sphereGeometry args={[s.r * 1.05, 16, 16]} />
            <meshBasicMaterial color="#ffa020" transparent opacity={opacity * 0.08} side={THREE.BackSide} />
          </mesh>
          <pointLight color="#ffd04a" intensity={opacity * 0.8} distance={1.8} decay={2} />
        </group>
      ))}
    </group>
  );
}

// ── 10-13. ÁRBOL DE LA VIDA ────────────────────────────────────────────────────
const TREE_POS: [number, number, number][] = [
  [0, 3.5, 0],[2.2, 2.2, 0],[-2.2, 2.2, 0],
  [2.2, 0, 0],[-2.2, 0, 0],[0, -0.5, 0],
  [2.2, -2.0, 0],[-2.2, -2.0, 0],[0, -3.2, 0],[0, -4.8, 0],
];
const TREE_CONN: [number, number][] = [
  [0,1],[0,2],[0,5],[1,2],[1,3],[1,5],[2,4],[2,5],[3,4],[3,5],[3,6],
  [4,5],[4,7],[5,6],[5,7],[5,8],[6,7],[6,8],[6,9],[7,8],[7,9],[8,9],
];
const SEFIRA_COLORS = [
  "#f8f8f8","#c9a43e","#6666cc","#4477cc","#cc3333",
  "#e8c830","#228833","#cc6600","#7733cc","#c9a43e",
];

function AtzilutTree({ opacity, glow = false }: { opacity: number; glow?: boolean }) {
  if (opacity < 0.01) return null;
  return (
    <group>
      {TREE_CONN.map(([a, b], i) => {
        const pa = TREE_POS[a], pb = TREE_POS[b];
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array([...pa, ...pb]), 3));
        const mat = new THREE.LineBasicMaterial({ color: 0xc9a43e, transparent: true, opacity: opacity * 0.4 });
        return <primitive key={i} object={new THREE.Line(geo, mat)} />;
      })}
      {TREE_POS.map(([x, y, z], i) => {
        const col = new THREE.Color(SEFIRA_COLORS[i]);
        return (
          <group key={i} position={[x, y, z]}>
            <mesh>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshBasicMaterial color={col} transparent opacity={opacity * 0.9} />
            </mesh>
            {glow && <pointLight color={SEFIRA_COLORS[i]} intensity={opacity * 2.5} distance={3} decay={2} />}
          </group>
        );
      })}
    </group>
  );
}

// ── 11. ABYA — cuatro planos horizontales ─────────────────────────────────────
const WORLD_PLANES = [
  { y: 4.5,  color: "#ffffff", he: "אֲצִילוּת", es: "Atzilut", opacity: 0.18 },
  { y: 1.5,  color: "#8899ff", he: "בְּרִיאָה", es: "Beriá",   opacity: 0.14 },
  { y: -1.5, color: "#88cc88", he: "יְצִירָה", es: "Yetzirá",  opacity: 0.12 },
  { y: -4.5, color: "#cc8844", he: "עֲשִׂיָּה", es: "Asiá",    opacity: 0.10 },
];

function ABYAPlanes({ opacity }: { opacity: number }) {
  if (opacity < 0.01) return null;
  return (
    <group>
      {WORLD_PLANES.map((wp, i) => (
        <group key={i} position={[0, wp.y, 0]}>
          {/* Plano semi-transparente */}
          <mesh rotation={[Math.PI/2, 0, 0]}>
            <planeGeometry args={[18, 14]} />
            <meshBasicMaterial
              color={wp.color} transparent
              opacity={opacity * wp.opacity} side={THREE.DoubleSide}
            />
          </mesh>
          {/* Borde luminoso */}
          {[[-9,0,-7],[9,0,-7],[9,0,7],[-9,0,7],[-9,0,-7]].reduce((acc,pt,j,arr) => {
            if (j === 0) return acc;
            const prev = arr[j-1];
            const geo = new THREE.BufferGeometry();
            geo.setAttribute("position", new THREE.BufferAttribute(
              new Float32Array([prev[0],0,prev[2],pt[0],0,pt[2]]), 3));
            const mat = new THREE.LineBasicMaterial({ color: wp.color, transparent: true, opacity: opacity * 0.6 });
            acc.push(<primitive key={j} object={new THREE.Line(geo, mat)} />);
            return acc;
          }, [] as React.ReactElement[])}
        </group>
      ))}
    </group>
  );
}

// ── 13. TIKÚN — árbol en plena gloria ────────────────────────────────────────
function TikunGlow({ opacity }: { opacity: number }) {
  if (opacity < 0.01) return null;
  return (
    <>
      <AtzilutTree opacity={opacity} glow />
      {/* Esfera de luz unificada */}
      <mesh>
        <sphereGeometry args={[6, 32, 32]} />
        <meshBasicMaterial
          color="#fffef0" transparent opacity={opacity * 0.06}
          side={THREE.BackSide}
        />
      </mesh>
      <pointLight position={[0, 0, 0]} color="#fffef0" intensity={opacity * 6} distance={20} decay={1} />
    </>
  );
}

// ── ESCENA PRINCIPAL ──────────────────────────────────────────────────────────
export default function CosmologyScene({ scrollProgress }: { scrollProgress: number }) {
  const p = scrollProgress * 14; // 0..14

  // Opacidades por etapa — cada elemento tiene su ventana de visibilidad
  const einSofOp      = ss(0, 0.3, p) * (1 - ss(1.3, 2.0, p));
  const tzimtzumCont  = ss(0.6, 1.8, p);                         // contracción 0→1
  const tzimtzumPtOp  = ss(1.5, 2.0, p) * (1 - ss(2.8, 3.5, p));
  const reshimoOp     = ss(2.0, 2.8, p) * (1 - ss(3.5, 4.2, p));
  const kavOp         = ss(3.0, 3.8, p) * (1 - ss(4.5, 5.2, p));
  const kavLen        = Math.min(ss(3.0, 4.0, p), 1);
  const adamOp        = ss(4.0, 4.8, p) * (1 - ss(5.5, 6.2, p));
  const sheviratActive = p >= 6.8 && p <= 8.5;
  const nitzotzotOp   = ss(7.8, 8.5, p) * (1 - ss(9.5, 10.2, p));
  const kelipotOp     = ss(9.0, 9.8, p) * (1 - ss(10.5, 11.2, p));
  const treeOp        = ss(10.0, 11.0, p) * (1 - ss(13.5, 14.0, p));
  const abyaOp        = ss(11.0, 11.8, p) * (1 - ss(12.8, 13.5, p));
  const tikunOp       = ss(13.0, 13.8, p);

  // Necesita tzimtzum si estamos entre 0.6 y 3.5
  const showTzimtzum  = p > 0.5 && p < 4.0;

  return (
    <>
      <ambientLight intensity={0.06} />
      <Stars radius={90} depth={60} count={2500} factor={2} saturation={0} fade speed={0.15} />

      {/* 1. EIN SOF — cuerdas de energía */}
      {einSofOp > 0.01 && <EinSofStrings opacity={einSofOp} />}

      {/* 2. TZIMTZUM — condensación */}
      {showTzimtzum && <TzimtzumEffect contraction={tzimtzumCont} pointOpacity={tzimtzumPtOp} />}

      {/* 3. RESHIMÓ — huella tenue */}
      {reshimoOp > 0.01 && <ReshimoStrings opacity={reshimoOp} />}

      {/* 4. KAV — rayo desde el punto */}
      {kavOp > 0.01 && <KavRay opacity={kavOp} length={kavLen} />}

      {/* 5. ADAM KADMÓN */}
      {adamOp > 0.01 && <AdamKadmon opacity={adamOp} />}

      {/* 7. SHEVIRAT — Big Bang */}
      {sheviratActive && <SheviratBigBang p={p} />}

      {/* 8. NITZOTZOT */}
      {nitzotzotOp > 0.01 && <NitzotzotRain opacity={nitzotzotOp} />}

      {/* 9. KELIPOT */}
      {kelipotOp > 0.01 && <KelipotSpheres opacity={kelipotOp} />}

      {/* 10-12. ÁRBOL */}
      {treeOp > 0.01 && <AtzilutTree opacity={treeOp} />}

      {/* 11. ABYA */}
      {abyaOp > 0.01 && <ABYAPlanes opacity={abyaOp} />}

      {/* 13. TIKÚN */}
      {tikunOp > 0.01 && <TikunGlow opacity={tikunOp} />}
    </>
  );
}
