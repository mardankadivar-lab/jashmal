"use client";

// ─────────────────────────────────────────────────────────────────────────
// /grafo — "El cerebro vivo de Jashmal"
// El grafo MISMO es el cerebro: nodos = sinapsis luminosas, aristas = fibras
// neuronales curvas. Torá = corazón central. Forma cerebral 3D (lóbulos) desde
// cualquier ángulo. Bloom + additive blending. Cámara cinematográfica con
// parallax e inercia. Respira. Al tocar una idea se encienden SOLO sus fibras
// y vecinos (sin cambiar el color de categoría); el resto baja de opacidad.
// ─────────────────────────────────────────────────────────────────────────

import { useMemo, useRef, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  BNODES,
  BEDGES,
  BRAIN_CATS,
  BRAIN_SCALE,
  brainLayout,
  ambientTissue,
  neighborsOf,
  nodeById,
  type BNode,
} from "@/lib/brainData";

const Canvas = dynamic(() => import("@react-three/fiber").then((m) => m.Canvas), { ssr: false });

// ── Ajustes del look (todo el tuning fino vive aquí) ──────────────────────
const CFG = {
  fiberSegments: 24,
  fiberSag: 0.14,           // arco suave de las fibras (axón)
  fiberOpacityIdle: 0.05,   // casi invisible en reposo
  fiberOpacityDimmed: 0.02, // cuando hay selección, la base se apaga más
  fiberOpacityActive: 0.9,  // fibras encendidas
  ambientCount: 6500,       // sinapsis decorativas (tejido del cerebro)
  ambientSize: 0.05,
  ambientOpacity: 0.6,
  haloBase: 0.55,           // tamaño del halo de una sinapsis
  coreBase: 0.16,           // tamaño del núcleo brillante
  driftSpeed: 0.045,        // deriva lenta de cámara
  radiusIdle: 24,
  radiusFocus: 15,
};

const CENTER = new THREE.Vector3(0.1 * BRAIN_SCALE, 0.1 * BRAIN_SCALE, 0);

// ── Textura de glow radial (blanco al centro → transparente) ──────────────
let _glowTex: THREE.Texture | null = null;
function glowTexture(): THREE.Texture {
  if (_glowTex) return _glowTex;
  const s = 128;
  const cv = document.createElement("canvas");
  cv.width = cv.height = s;
  const ctx = cv.getContext("2d")!;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.25, "rgba(255,255,255,0.85)");
  g.addColorStop(0.5, "rgba(255,255,255,0.35)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  _glowTex = tex;
  return tex;
}

// ── Curvas (fibras) precomputadas por arista ──────────────────────────────
type EdgeCurve = { a: string; b: string; pts: THREE.Vector3[] };

function buildCurves(positions: Record<string, [number, number, number]>): EdgeCurve[] {
  const curves: EdgeCurve[] = [];
  for (const [a, b] of BEDGES) {
    const pa = positions[a], pb = positions[b];
    if (!pa || !pb) continue;
    const va = new THREE.Vector3(...pa);
    const vb = new THREE.Vector3(...pb);
    const mid = va.clone().add(vb).multiplyScalar(0.5);
    // arco hacia afuera (desde el centro del cerebro) → trayectoria orgánica
    const out = mid.clone().sub(CENTER);
    if (out.lengthSq() < 1e-4) out.set(0, 1, 0);
    out.normalize();
    const len = va.distanceTo(vb);
    const ctrl = mid.add(out.multiplyScalar(len * CFG.fiberSag));
    const curve = new THREE.QuadraticBezierCurve3(va, ctrl, vb);
    curves.push({ a, b, pts: curve.getPoints(CFG.fiberSegments) });
  }
  return curves;
}

// polilíneas → pares de vértices (para LineSegments)
function curvesToSegments(curves: EdgeCurve[]): Float32Array {
  let count = 0;
  for (const c of curves) count += (c.pts.length - 1);
  const arr = new Float32Array(count * 6);
  let o = 0;
  for (const c of curves) {
    for (let i = 0; i < c.pts.length - 1; i++) {
      const p0 = c.pts[i], p1 = c.pts[i + 1];
      arr[o++] = p0.x; arr[o++] = p0.y; arr[o++] = p0.z;
      arr[o++] = p1.x; arr[o++] = p1.y; arr[o++] = p1.z;
    }
  }
  return arr;
}

// ── Tejido ambiental (sinapsis decorativas que forman la masa del cerebro) ─
function AmbientTissue() {
  const tex = useMemo(() => glowTexture(), []);
  const { positions, colors } = useMemo(() => ambientTissue(CFG.ambientCount), []);
  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return g;
  }, [positions, colors]);
  const matRef = useRef<THREE.PointsMaterial>(null);
  useFrame(({ clock }) => {
    if (matRef.current) {
      // respiración: leve parpadeo del tejido
      matRef.current.opacity = CFG.ambientOpacity * (0.8 + Math.sin(clock.elapsedTime * 0.6) * 0.12);
    }
  });
  return (
    <points geometry={geom}>
      <pointsMaterial
        ref={matRef}
        map={tex}
        size={CFG.ambientSize * BRAIN_SCALE}
        vertexColors
        transparent
        opacity={CFG.ambientOpacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

// ── Fibras base (todas, casi invisibles) ──────────────────────────────────
function BaseFibers({ segments, dimmed }: { segments: Float32Array; dimmed: boolean }) {
  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(segments, 3));
    return g;
  }, [segments]);
  const matRef = useRef<THREE.LineBasicMaterial>(null);
  useFrame(() => {
    if (matRef.current) matRef.current.opacity = dimmed ? CFG.fiberOpacityDimmed : CFG.fiberOpacityIdle;
  });
  return (
    <lineSegments geometry={geom}>
      <lineBasicMaterial
        ref={matRef}
        color="#5fa8ff"
        transparent
        opacity={CFG.fiberOpacityIdle}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
}

// ── Fibras activas (las del nodo enfocado) + pulsos viajando ───────────────
function ActiveFibers({
  curves,
  focusId,
  color,
}: {
  curves: EdgeCurve[];
  focusId: string;
  color: string;
}) {
  const active = useMemo(
    () => curves.filter((c) => c.a === focusId || c.b === focusId),
    [curves, focusId],
  );
  const geom = useMemo(() => {
    const segs = curvesToSegments(active);
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(segs, 3));
    return g;
  }, [active]);

  const tex = useMemo(() => glowTexture(), []);
  const col = useMemo(() => new THREE.Color(color), [color]);
  // un pulso por arista activa (sprite que viaja del nodo al vecino)
  const pulseRefs = useRef<(THREE.Sprite | null)[]>([]);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    active.forEach((c, i) => {
      const spr = pulseRefs.current[i];
      if (!spr) return;
      // dirección: siempre sale DESDE el nodo enfocado
      const fwd = c.a === focusId;
      let u = (t * 0.6 + i * 0.13) % 1;
      if (!fwd) u = 1 - u;
      const idx = Math.min(c.pts.length - 1, Math.max(0, Math.floor(u * (c.pts.length - 1))));
      const p = c.pts[idx];
      spr.position.set(p.x, p.y, p.z);
      const s = (0.18 + Math.sin((t + i) * 3) * 0.04) * BRAIN_SCALE;
      spr.scale.set(s, s, 1);
    });
  });

  return (
    <group>
      <lineSegments geometry={geom}>
        <lineBasicMaterial
          color={col}
          transparent
          opacity={CFG.fiberOpacityActive}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
      {active.map((c, i) => (
        <sprite key={c.a + c.b} ref={(el) => { pulseRefs.current[i] = el; }}>
          <spriteMaterial map={tex} color={col} transparent opacity={0.95} blending={THREE.AdditiveBlending} depthWrite={false} />
        </sprite>
      ))}
    </group>
  );
}

// ── Una sinapsis (nodo) ────────────────────────────────────────────────────
function Synapse({
  node,
  pos,
  intensity,
  showLabel,
  isFa,
  onClick,
  onDouble,
  onHover,
}: {
  node: BNode;
  pos: [number, number, number];
  intensity: number; // 0..1.4 — cuánto está "despierta"
  showLabel: boolean;
  isFa: boolean;
  onClick: () => void;
  onDouble: () => void;
  onHover: (h: boolean) => void;
}) {
  const tex = useMemo(() => glowTexture(), []);
  const baseCol = BRAIN_CATS[node.cat]?.c ?? "#c9a43e";
  const col = useMemo(() => new THREE.Color(baseCol), [baseCol]);
  const white = useMemo(() => new THREE.Color(baseCol).lerp(new THREE.Color("#ffffff"), 0.7), [baseCol]);

  // tamaño según nivel (la Torá y los dominios son mayores)
  const lvlScale = node.level === 0 ? 2.0 : node.level === 1 ? 1.3 : node.level === 2 ? 1.0 : node.level === 3 ? 0.8 : 0.7;
  const haloRef = useRef<THREE.Sprite>(null);
  const coreRef = useRef<THREE.Sprite>(null);
  const haloMat = useRef<THREE.SpriteMaterial>(null);
  const coreMat = useRef<THREE.SpriteMaterial>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const pulse = 1 + Math.sin(t * 1.4 + pos[0] * 1.7) * 0.1;
    const k = intensity; // 0..~1.4
    const halo = CFG.haloBase * lvlScale * (0.8 + k * 0.9) * pulse * BRAIN_SCALE * 0.34;
    const core = CFG.coreBase * lvlScale * (0.9 + k * 0.7) * pulse * BRAIN_SCALE * 0.34;
    if (haloRef.current) haloRef.current.scale.set(halo, halo, 1);
    if (coreRef.current) coreRef.current.scale.set(core, core, 1);
    if (haloMat.current) haloMat.current.opacity = Math.min(0.9, 0.12 + k * 0.5);
    if (coreMat.current) coreMat.current.opacity = Math.min(1, 0.25 + k * 0.7);
  });

  return (
    <group position={pos}>
      {/* halo de color (categoría, permanente) */}
      <sprite ref={haloRef}>
        <spriteMaterial ref={haloMat} map={tex} color={col} transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
      </sprite>
      {/* núcleo brillante */}
      <sprite ref={coreRef}>
        <spriteMaterial ref={coreMat} map={tex} color={white} transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
      </sprite>
      {/* área de clic invisible */}
      <sprite
        scale={[1.1 * BRAIN_SCALE * 0.34, 1.1 * BRAIN_SCALE * 0.34, 1]}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onDoubleClick={(e) => { e.stopPropagation(); onDouble(); }}
        onPointerOver={(e) => { e.stopPropagation(); onHover(true); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { onHover(false); document.body.style.cursor = "default"; }}
      >
        <spriteMaterial map={tex} transparent opacity={0} depthWrite={false} />
      </sprite>

      {showLabel && (
        <Html center distanceFactor={14} zIndexRange={[20, 0]} style={{ pointerEvents: "none" }}>
          <div
            style={{
              transform: "translateY(-16px)",
              whiteSpace: "nowrap",
              userSelect: "none",
              fontFamily: "var(--font-cinzel, serif)",
              fontSize: node.level <= 1 ? "13px" : "11px",
              color: baseCol,
              textShadow: `0 0 12px ${baseCol}, 0 0 4px #000`,
            }}
          >
            {isFa ? node.labelFa : node.label}
          </div>
        </Html>
      )}
    </group>
  );
}

// ── Foco de cámara: centra suavemente el target en el nodo seleccionado ───
function FocusHelper({
  selectedPos,
  controlsRef,
}: {
  selectedPos: THREE.Vector3 | null;
  controlsRef: React.RefObject<any>;
}) {
  useFrame((_, dt) => {
    const c = controlsRef.current;
    if (!c) return;
    const goal = selectedPos ?? CENTER;
    c.target.lerp(goal, Math.min(1, dt * 2.2));
  });
  return null;
}

// ── Escena ─────────────────────────────────────────────────────────────────
function BrainScene({
  selected,
  hovered,
  isFa,
  onSelect,
  onHover,
  onDouble,
  onBackground,
}: {
  selected: string | null;
  hovered: string | null;
  isFa: boolean;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  onDouble: (n: BNode) => void;
  onBackground: () => void;
}) {
  const positions = useMemo(() => brainLayout(), []);
  const curves = useMemo(() => buildCurves(positions), [positions]);
  const baseSegments = useMemo(() => curvesToSegments(curves), [curves]);

  const focusId = selected ?? hovered;
  const neighbors = useMemo(
    () => (focusId ? neighborsOf(focusId) : new Set<string>()),
    [focusId],
  );
  const selectedPos = selected && positions[selected] ? new THREE.Vector3(...positions[selected]) : null;
  const focusColor = focusId ? (BRAIN_CATS[nodeById(focusId)?.cat ?? ""]?.c ?? "#cfe6ff") : "#cfe6ff";

  // controles de mouse (girar / mover / zoom) con pausa de auto-giro al interactuar
  const controlsRef = useRef<any>(null);
  const [autoRot, setAutoRot] = useState(true);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pauseAuto = () => { setAutoRot(false); if (idleTimer.current) clearTimeout(idleTimer.current); };
  const resumeAuto = () => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setAutoRot(true), 3000);
  };

  // breathing group
  const groupRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (groupRef.current) {
      const s = 1 + Math.sin(clock.elapsedTime * 0.5) * 0.012;
      groupRef.current.scale.set(s, s, s);
    }
  });

  // intensidad por nodo (0 dormido .. 1.4 enfocado)
  const intensityOf = (n: BNode): number => {
    const awakeBase = n.level <= 1 ? 0.55 : n.level === 2 ? 0.32 : 0.18; // latente
    if (!focusId) return awakeBase;
    if (n.id === focusId) return 1.4;
    if (neighbors.has(n.id)) return 1.0;
    return awakeBase * 0.35; // baja opacidad pero no desaparece
  };
  const showLabelOf = (n: BNode): boolean => {
    if (n.id === focusId) return true;
    if (focusId && neighbors.has(n.id)) return true;
    if (!focusId && n.level <= 1) return true; // dominios + Torá siempre rotulados
    return false;
  };

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        makeDefault
        enableDamping
        dampingFactor={0.08}
        enablePan
        panSpeed={0.5}
        rotateSpeed={0.55}
        zoomSpeed={0.9}
        minDistance={6}
        maxDistance={42}
        autoRotate={autoRot && !selected}
        autoRotateSpeed={0.3}
        onStart={pauseAuto}
        onEnd={resumeAuto}
      />
      <FocusHelper selectedPos={selectedPos} controlsRef={controlsRef} />
      <ambientLight intensity={0.35} />

      {/* plano de fondo invisible → clic en vacío deselecciona */}
      <mesh position={[0, 0, -40]} onClick={(e) => { e.stopPropagation(); onBackground(); }}>
        <planeGeometry args={[400, 400]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      <group ref={groupRef}>
        <AmbientTissue />
        <BaseFibers segments={baseSegments} dimmed={focusId !== null} />
        {focusId && <ActiveFibers curves={curves} focusId={focusId} color={focusColor} />}

        {BNODES.map((n) => {
          const pos = positions[n.id];
          if (!pos) return null;
          return (
            <Synapse
              key={n.id}
              node={n}
              pos={pos}
              intensity={intensityOf(n)}
              showLabel={showLabelOf(n)}
              isFa={isFa}
              onClick={() => onSelect(n.id)}
              onDouble={() => onDouble(n)}
              onHover={(h) => onHover(h ? n.id : null)}
            />
          );
        })}
      </group>
    </>
  );
}

// ── Página ──────────────────────────────────────────────────────────────────
export default function GrafoPage() {
  const locale = useLocale();
  const isFa = locale === "fa";
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const selNode = selected ? nodeById(selected) : null;

  const T = {
    title: "חַשְׁמַל",
    subtitle: isFa ? "مغزِ زندهٔ خَשمَل" : "El cerebro vivo de Jashmal",
    back: isFa ? "بازگشت به خانه" : "Volver al inicio",
    hint: isFa
      ? "بکشید برای چرخش · اسکرول/پینچ برای زوم · کلیک روی سیناپس · دوبار کلیک برای مطالعه"
      : "Arrastra para girar · rueda o pellizca para acercar · clic en una sinapsis · doble clic para estudiar",
    legend: isFa ? "دامنه‌های دانش" : "Dominios del saber",
    study: isFa ? "مطالعه ←" : "Estudiar →",
  };

  const handleSelect = (id: string) => setSelected((p) => (p === id ? null : id));
  const handleDouble = (n: BNode) => { if (n.url) window.open("https://jashmal.org" + n.url, "_blank"); };

  return (
    <div
      className="always-dark fixed inset-0 z-50 overflow-hidden"
      style={{ background: "#03040a" }}
      dir={isFa ? "rtl" : "ltr"}
    >
      <Suspense
        fallback={
          <div className="flex h-full items-center justify-center">
            <p className="animate-pulse font-cinzel text-gold/50">{isFa ? "در حال بیدار شدن…" : "Despertando la mente…"}</p>
          </div>
        }
      >
        <Canvas camera={{ position: [0, 6, CFG.radiusIdle], fov: 55 }} gl={{ antialias: true }} style={{ position: "absolute", inset: 0 }}>
          <color attach="background" args={["#03040a"]} />
          <fogExp2 attach="fog" args={["#03040a", 0.018]} />
          <BrainScene
            selected={selected}
            hovered={hovered}
            isFa={isFa}
            onSelect={handleSelect}
            onHover={setHovered}
            onDouble={handleDouble}
            onBackground={() => setSelected(null)}
          />
          <EffectComposer>
            <Bloom intensity={1.3} luminanceThreshold={0.12} luminanceSmoothing={0.7} mipmapBlur radius={0.75} />
          </EffectComposer>
        </Canvas>
      </Suspense>

      {/* Título + volver */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between p-4">
        <div>
          <p className="hebrew text-2xl text-gold" style={{ filter: "drop-shadow(0 0 10px #c9a43e55)" }}>{T.title}</p>
          <p className="font-cinzel text-xs uppercase tracking-[0.25em] text-gold/50">{T.subtitle}</p>
        </div>
        <Link
          href="/"
          className="pointer-events-auto rounded-full border border-gold/20 bg-ink/80 px-3 py-1.5 font-cinzel text-xs text-muted backdrop-blur-md transition-colors hover:text-gold"
        >
          {isFa ? "→ " : "← "}{T.back}
        </Link>
      </div>

      {/* Leyenda */}
      <div className="absolute bottom-4 start-4 z-10 rounded-xl border border-gold/15 bg-ink/80 p-3 backdrop-blur-md">
        <p className="mb-2 font-cinzel text-[9px] uppercase tracking-[0.2em] text-gold/40">{T.legend}</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          {Object.entries(BRAIN_CATS).filter(([k]) => k !== "jashmal").map(([key, v]) => (
            <div key={key} className="flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full" style={{ background: v.c, boxShadow: `0 0 8px ${v.c}` }} />
              <span className="text-[10px] text-muted/80">{isFa ? v.labelFa : v.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hint */}
      <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2">
        <p className="font-cinzel text-[9px] uppercase tracking-[0.25em] text-gold/25">{T.hint}</p>
      </div>

      {/* Tarjeta del nodo seleccionado */}
      {selNode && (
        <div className="absolute bottom-4 end-4 z-10 w-[min(260px,80vw)] rounded-xl border border-gold/25 bg-ink/90 p-4 backdrop-blur-md">
          <p className="font-cinzel text-base" style={{ color: BRAIN_CATS[selNode.cat]?.c ?? "#c9a43e" }}>
            {isFa ? selNode.labelFa : selNode.label}
          </p>
          <p className="mt-0.5 text-[10px] uppercase tracking-wide text-muted/50">{BRAIN_CATS[selNode.cat]?.label}</p>
          {selNode.url && (
            <a
              href={"https://jashmal.org" + selNode.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block rounded-full border border-gold/30 bg-gold/[0.07] px-4 py-2 text-center font-cinzel text-xs uppercase tracking-widest text-gold transition-all hover:border-gold/60 hover:bg-gold/15"
            >
              {T.study}
            </a>
          )}
        </div>
      )}
    </div>
  );
}
