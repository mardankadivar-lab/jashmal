"use client";

// ═══════════════════════════════════════════════════════════════════════════
//  JASHMAL · EL UNIVERSO OBSERVABLE DEL CONOCIMIENTO  (Fase 1)
//  Cada disciplina = una galaxia. Cada concepto = una estrella. Las aristas =
//  filamentos de la red cósmica. La cámara vive DENTRO; el universo se extiende
//  más allá de la pantalla. Sin esfera, sin objeto al centro. NASA/ESA.
// ═══════════════════════════════════════════════════════════════════════════

import { useMemo, useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { BNODES, BEDGES, BRAIN_CATS, type BNode } from "@/lib/brainData";

const Canvas = dynamic(() => import("@react-three/fiber").then((m) => m.Canvas), { ssr: false });

// ── Tuning ────────────────────────────────────────────────────────────────
const CFG = {
  galaxyMinR: 55,        // radio mínimo de un centro de galaxia (cerca)
  galaxyMaxR: 200,       // radio máximo (lejos) → profundidad
  starSizeBase: 0.9,     // tamaño base de una estrella-concepto
  dustPerGalaxy: 520,    // polvo/haze que da cuerpo a cada galaxia
  starfieldCount: 16000, // estrellas de fondo (más allá de todo)
  starfieldR: 520,       // radio del campo estelar de fondo
  approachDist: 70,      // a esta distancia la galaxia "resuelve" sus estrellas
  driftSpeed: 0.012,
};

// PRNG determinista
function mulberry32(seed: number) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function hashStr(s: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

// ── Textura de glow radial ──────────────────────────────────────────────
let _glow: THREE.Texture | null = null;
function glowTex(): THREE.Texture {
  if (_glow) return _glow;
  const s = 128, cv = document.createElement("canvas");
  cv.width = cv.height = s;
  const ctx = cv.getContext("2d")!;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.2, "rgba(255,255,255,0.7)");
  g.addColorStop(0.5, "rgba(255,255,255,0.22)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g; ctx.fillRect(0, 0, s, s);
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace;
  _glow = t; return t;
}

// ── Layout: agrupa nodos en galaxias (espirales) repartidas en el volumen ──
type Layout = {
  positions: Record<string, [number, number, number]>;
  galaxies: { cat: string; center: THREE.Vector3; radius: number; color: string; nodes: BNode[] }[];
};

function buildUniverse(): Layout {
  const byCat = new Map<string, BNode[]>();
  for (const n of BNODES) {
    const arr = byCat.get(n.cat) ?? [];
    arr.push(n); byCat.set(n.cat, arr);
  }
  const positions: Record<string, [number, number, number]> = {};
  const galaxies: Layout["galaxies"] = [];

  for (const [cat, nodes] of byCat) {
    const seed = hashStr(cat);
    const rng = mulberry32(seed);
    // centro de la galaxia: dirección uniforme en la esfera, radio variado (profundidad)
    const u = rng() * 2 - 1, phi = rng() * Math.PI * 2, sq = Math.sqrt(1 - u * u);
    const R = CFG.galaxyMinR + (CFG.galaxyMaxR - CFG.galaxyMinR) * Math.cbrt(rng());
    const center = new THREE.Vector3(sq * Math.cos(phi) * R, u * R * 0.55, sq * Math.sin(phi) * R);
    // orientación (tilt) de la galaxia
    const euler = new THREE.Euler(rng() * Math.PI, rng() * Math.PI, rng() * Math.PI);
    const rot = new THREE.Matrix4().makeRotationFromEuler(euler);
    const N = nodes.length;
    const gRadius = 7 + Math.sqrt(N) * 3.0;
    const color = BRAIN_CATS[cat]?.c ?? "#cccccc";
    const turns = 1.6 + rng() * 0.8;
    nodes.forEach((n, j) => {
      const t = (j + 1) / (N + 1);
      const arm = (hashStr(n.id) & 1) ? 0 : Math.PI; // dos brazos
      const ang = t * turns * Math.PI * 2 + arm + rng() * 0.25;
      const rr = gRadius * Math.sqrt(t);
      const jit = (k: number) => (rng() - 0.5) * gRadius * 0.12 * k;
      const local = new THREE.Vector3(
        Math.cos(ang) * rr + jit(1),
        jit(0.45),                       // disco fino
        Math.sin(ang) * rr + jit(1)
      ).applyMatrix4(rot).add(center);
      positions[n.id] = [local.x, local.y, local.z];
    });
    galaxies.push({ cat, center, radius: gRadius, color, nodes });
  }
  return { positions, galaxies };
}

// ── Campo estelar de fondo (más allá de todo) ─────────────────────────────
function Starfield() {
  const tex = useMemo(() => glowTex(), []);
  const geom = useMemo(() => {
    const n = CFG.starfieldCount;
    const pos = new Float32Array(n * 3);
    const col = new Float32Array(n * 3);
    const rng = mulberry32(99);
    for (let i = 0; i < n; i++) {
      const u = rng() * 2 - 1, phi = rng() * Math.PI * 2, sq = Math.sqrt(1 - u * u);
      const r = CFG.starfieldR * (0.6 + 0.4 * rng());
      pos[i * 3] = sq * Math.cos(phi) * r;
      pos[i * 3 + 1] = u * r;
      pos[i * 3 + 2] = sq * Math.sin(phi) * r;
      const w = 0.6 + rng() * 0.4;
      const tint = rng();
      col[i * 3] = w * (0.8 + tint * 0.2);
      col[i * 3 + 1] = w * (0.85 + tint * 0.1);
      col[i * 3 + 2] = w;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    return g;
  }, []);
  return (
    <points geometry={geom}>
      <pointsMaterial map={tex} size={1.1} vertexColors transparent opacity={0.85}
        blending={THREE.AdditiveBlending} depthWrite={false} sizeAttenuation />
    </points>
  );
}

// ── Polvo/haze de todas las galaxias (un solo buffer) ─────────────────────
function GalacticDust({ layout }: { layout: Layout }) {
  const tex = useMemo(() => glowTex(), []);
  const geom = useMemo(() => {
    const per = CFG.dustPerGalaxy;
    const total = layout.galaxies.length * per;
    const pos = new Float32Array(total * 3);
    const col = new Float32Array(total * 3);
    let k = 0;
    for (const gx of layout.galaxies) {
      const rng = mulberry32(hashStr(gx.cat) ^ 0xabcdef);
      const c = new THREE.Color(gx.color);
      const euler = new THREE.Euler(rng() * Math.PI, rng() * Math.PI, rng() * Math.PI);
      const rot = new THREE.Matrix4().makeRotationFromEuler(euler);
      const turns = 1.8 + rng() * 0.8;
      for (let i = 0; i < per; i++) {
        const t = Math.pow(rng(), 0.6);
        const arm = rng() < 0.5 ? 0 : Math.PI;
        const ang = t * turns * Math.PI * 2 + arm + (rng() - 0.5) * 0.5;
        const rr = gx.radius * 1.25 * t;
        const v = new THREE.Vector3(
          Math.cos(ang) * rr + (rng() - 0.5) * gx.radius * 0.2,
          (rng() - 0.5) * gx.radius * 0.18,
          Math.sin(ang) * rr + (rng() - 0.5) * gx.radius * 0.2
        ).applyMatrix4(rot).add(gx.center);
        pos[k * 3] = v.x; pos[k * 3 + 1] = v.y; pos[k * 3 + 2] = v.z;
        const f = 0.5 + (1 - t) * 0.7;
        col[k * 3] = c.r * f; col[k * 3 + 1] = c.g * f; col[k * 3 + 2] = c.b * f;
        k++;
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    return g;
  }, [layout]);
  return (
    <points geometry={geom}>
      <pointsMaterial map={tex} size={1.6} vertexColors transparent opacity={0.5}
        blending={THREE.AdditiveBlending} depthWrite={false} sizeAttenuation />
    </points>
  );
}

// ── Filamentos de la red cósmica (aristas, tenues) ────────────────────────
function CosmicWeb({ layout }: { layout: Layout }) {
  const geom = useMemo(() => {
    const pts: number[] = [];
    for (const [a, b] of BEDGES) {
      const pa = layout.positions[a], pb = layout.positions[b];
      if (!pa || !pb) continue;
      pts.push(pa[0], pa[1], pa[2], pb[0], pb[1], pb[2]);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pts), 3));
    return g;
  }, [layout]);
  return (
    <lineSegments geometry={geom}>
      <lineBasicMaterial color="#5a6cff" transparent opacity={0.10}
        blending={THREE.AdditiveBlending} depthWrite={false} />
    </lineSegments>
  );
}

// ── Núcleo brillante de una galaxia + su etiqueta ─────────────────────────
function GalaxyCore({ gx, locale, onFocus }: {
  gx: Layout["galaxies"][number]; locale: string; onFocus: (c: THREE.Vector3) => void;
}) {
  const tex = useMemo(() => glowTex(), []);
  const ref = useRef<THREE.Sprite>(null);
  const { camera } = useThree();
  const [near, setNear] = useState(false);
  useFrame(({ clock }) => {
    const d = camera.position.distanceTo(gx.center);
    setNear(d < CFG.approachDist + gx.radius * 2);
    if (ref.current) {
      const pulse = 1 + Math.sin(clock.elapsedTime * 0.5 + gx.center.x) * 0.08;
      const s = gx.radius * 2.4 * pulse;
      ref.current.scale.set(s, s, 1);
    }
  });
  const label = locale === "fa" ? (BRAIN_CATS[gx.cat]?.labelFa ?? gx.cat) : (BRAIN_CATS[gx.cat]?.label ?? gx.cat);
  return (
    <group position={[gx.center.x, gx.center.y, gx.center.z]}>
      <sprite ref={ref} onClick={(e) => { e.stopPropagation(); onFocus(gx.center); }}>
        <spriteMaterial map={tex} color={gx.color} transparent opacity={0.55}
          blending={THREE.AdditiveBlending} depthWrite={false} />
      </sprite>
      <Html center distanceFactor={140} style={{ pointerEvents: "none" }}>
        <div style={{
          fontFamily: "var(--font-cinzel), serif", whiteSpace: "nowrap",
          color: gx.color, textShadow: "0 0 12px rgba(0,0,0,0.9)",
          fontSize: near ? 18 : 13, letterSpacing: "0.12em", textTransform: "uppercase",
          opacity: near ? 1 : 0.55, transition: "all .4s", fontWeight: 700,
        }}>{label}</div>
      </Html>
    </group>
  );
}

// ── Estrellas-concepto (sprites clicables, LOD por cercanía a su galaxia) ──
function ConceptStars({ layout, onPick }: {
  layout: Layout; onPick: (n: BNode, p: THREE.Vector3) => void;
}) {
  const tex = useMemo(() => glowTex(), []);
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  // mapa nodo→galaxia para LOD
  const nodeGalaxy = useMemo(() => {
    const m: Record<string, THREE.Vector3> = {};
    for (const gx of layout.galaxies) for (const n of gx.nodes) m[n.id] = gx.center;
    return m;
  }, [layout]);
  const sprites = useRef<Record<string, THREE.Sprite | null>>({});
  useFrame(() => {
    for (const gx of layout.galaxies) {
      const d = camera.position.distanceTo(gx.center);
      const near = d < CFG.approachDist + gx.radius * 3;
      for (const n of gx.nodes) {
        const spr = sprites.current[n.id];
        if (!spr) continue;
        const base = CFG.starSizeBase * (n.level <= 1 ? 2.0 : n.level === 2 ? 1.4 : 1.0);
        spr.scale.setScalar(near ? base : base * 0.55);
        const mat = spr.material as THREE.SpriteMaterial;
        mat.opacity = near ? 1 : 0.55;
      }
    }
  });
  return (
    <group ref={groupRef}>
      {layout.galaxies.map((gx) => {
        const c = new THREE.Color(gx.color).lerp(new THREE.Color("#ffffff"), 0.55);
        return gx.nodes.map((n) => {
          const p = layout.positions[n.id];
          if (!p) return null;
          return (
            <sprite key={n.id} position={p}
              ref={(el) => { sprites.current[n.id] = el; }}
              onClick={(e) => { e.stopPropagation(); onPick(n, new THREE.Vector3(...p)); }}>
              <spriteMaterial map={tex} color={c} transparent opacity={0.9}
                blending={THREE.AdditiveBlending} depthWrite={false} />
            </sprite>
          );
        });
      })}
    </group>
  );
}

// ── Vuelo cinemático de cámara hacia un objetivo ──────────────────────────
function FlyTo({ target }: { target: THREE.Vector3 | null }) {
  const { camera } = useThree();
  const controls = useThree((s) => s.controls) as { target?: THREE.Vector3; update?: () => void } | null;
  const goal = useRef<{ cam: THREE.Vector3; tgt: THREE.Vector3 } | null>(null);
  useEffect(() => {
    if (!target) return;
    const dir = new THREE.Vector3().subVectors(camera.position, target).normalize();
    const cam = target.clone().add(dir.multiplyScalar(26));
    goal.current = { cam, tgt: target.clone() };
  }, [target, camera]);
  useFrame(() => {
    if (!goal.current) return;
    camera.position.lerp(goal.current.cam, 0.045);
    if (controls?.target) {
      controls.target.lerp(goal.current.tgt, 0.045);
      controls.update?.();
    }
    if (camera.position.distanceTo(goal.current.cam) < 0.6) goal.current = null;
  });
  return null;
}

// ── Deriva suave en reposo ────────────────────────────────────────────────
function Drift({ active }: { active: boolean }) {
  useFrame((state, dt) => {
    if (!active) return;
    state.camera.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), CFG.driftSpeed * dt);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

// ── Página ────────────────────────────────────────────────────────────────
export default function UniversoPage() {
  const locale = useLocale();
  const fa = locale === "fa";
  const layout = useMemo(() => buildUniverse(), []);
  const [target, setTarget] = useState<THREE.Vector3 | null>(null);
  const [picked, setPicked] = useState<BNode | null>(null);

  return (
    <div className="fixed inset-0 bg-black" dir={fa ? "rtl" : "ltr"}>
      <Canvas camera={{ position: [0, 8, 36], fov: 60, far: 4000 }} gl={{ antialias: true }}>
        <color attach="background" args={["#02030a"]} />
        <Starfield />
        <GalacticDust layout={layout} />
        <CosmicWeb layout={layout} />
        {layout.galaxies.map((gx) => (
          <GalaxyCore key={gx.cat} gx={gx} locale={locale} onFocus={(c) => { setTarget(c); setPicked(null); }} />
        ))}
        <ConceptStars layout={layout} onPick={(n, p) => { setPicked(n); setTarget(p); }} />
        <FlyTo target={target} />
        <Drift active={target === null} />
        <OrbitControls makeDefault enableDamping dampingFactor={0.08} enablePan
          rotateSpeed={0.5} zoomSpeed={1.0} minDistance={2} maxDistance={600} />
        <EffectComposer>
          <Bloom intensity={0.9} luminanceThreshold={0.2} luminanceSmoothing={0.8} mipmapBlur radius={0.6} />
        </EffectComposer>
      </Canvas>

      {/* Nav mínima */}
      <nav className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-4">
        <Link href="/" className="pointer-events-auto font-cinzel text-sm text-white/70 transition-colors hover:text-white">
          {fa ? "→ خَשמَל" : "← Jashmal"}
        </Link>
        <span className="font-cinzel text-xs uppercase tracking-[0.3em] text-white/40">
          {fa ? "جهانِ دانش" : "El Universo del Conocimiento"}
        </span>
      </nav>

      {/* Tarjeta del concepto elegido */}
      {picked && (
        <div className="absolute bottom-6 left-1/2 z-10 w-[min(92vw,460px)] -translate-x-1/2 rounded-2xl border border-white/15 bg-black/70 p-5 backdrop-blur-md">
          <p className="font-cinzel text-[10px] uppercase tracking-widest" style={{ color: BRAIN_CATS[picked.cat]?.c }}>
            {fa ? BRAIN_CATS[picked.cat]?.labelFa : BRAIN_CATS[picked.cat]?.label}
          </p>
          <h2 className="mt-1 font-cinzel text-lg text-white">{fa ? picked.labelFa : picked.label}</h2>
          <div className="mt-3 flex items-center gap-3">
            {picked.url && (
              <Link href={picked.url as string} className="rounded-full border border-white/30 px-4 py-1.5 text-xs text-white/90 transition-all hover:bg-white/10">
                {fa ? "مطالعه ↗" : "Estudiar ↗"}
              </Link>
            )}
            <button onClick={() => setPicked(null)} className="text-xs text-white/50 hover:text-white/80">
              {fa ? "بستن" : "cerrar"}
            </button>
          </div>
        </div>
      )}

      {/* Hint */}
      <p className="pointer-events-none absolute bottom-4 right-5 z-10 font-cinzel text-[10px] uppercase tracking-widest text-white/30">
        {fa ? "بکشید · زوم · کلیک" : "arrastra · zoom · clic"}
      </p>
    </div>
  );
}
