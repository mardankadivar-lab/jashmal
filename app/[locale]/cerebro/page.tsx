"use client";

// ─────────────────────────────────────────────────────────────────────────
// /cerebro — "El cerebro vivo de Jashmal"
// El grafo MISMO es el cerebro: nodos = sinapsis luminosas, aristas = fibras
// neuronales curvas. Torá = corazón central. Forma cerebral 3D (lóbulos) desde
// cualquier ángulo. Bloom + additive blending. Cámara cinematográfica con
// parallax e inercia. Respira. Al tocar una idea se encienden SOLO sus fibras
// y vecinos (sin cambiar el color de categoría); el resto baja de opacidad.
// ─────────────────────────────────────────────────────────────────────────

import { useMemo, useRef, useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { useFrame, useThree } from "@react-three/fiber";
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
  layoutNodes,
  ambientTissue,
  bfsDistances,
  shortestPath,
  neighborsIn,
  TREE_PATHS,
  type BNode,
} from "@/lib/brainData";

type Graph = { nodes: BNode[]; edges: [string, string][] };

const Canvas = dynamic(() => import("@react-three/fiber").then((m) => m.Canvas), { ssr: false });

// ── Ajustes del look (todo el tuning fino vive aquí) ──────────────────────
const CFG = {
  fiberSegments: 24,
  fiberSag: 0.14,           // arco suave de las fibras (axón)
  fiberOpacityIdle: 0.05,   // casi invisible en reposo
  fiberOpacityDimmed: 0.02, // cuando hay selección, la base se apaga más
  fiberOpacityActive: 0.9,  // fibras encendidas
  ambientCount: 12000,      // sinapsis latentes (tejido del cerebro) — más denso/lleno
  ambientSize: 0.045,
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

function buildCurves(
  positions: Record<string, [number, number, number]>,
  edges: [string, string][],
): EdgeCurve[] {
  const curves: EdgeCurve[] = [];
  for (const [a, b] of edges) {
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

// ── Fibras jerárquicas: capas por distancia (primaria→secundaria→terciaria) ─
// Cada arista pertenece a la capa = min(distancia de sus dos extremos al foco).
// Capa 0 = primaria (más brillante) · 1 = secundaria · 2 = terciaria (tenue).
const LAYER_OPACITY = [CFG.fiberOpacityActive, 0.38, 0.15];
function LayeredFibers({
  curves,
  dist,
  focusId,
  color,
}: {
  curves: EdgeCurve[];
  dist: Map<string, number>;
  focusId: string;
  color: string;
}) {
  const layers = useMemo(() => {
    const out: EdgeCurve[][] = [[], [], []];
    for (const c of curves) {
      const da = dist.get(c.a);
      const db = dist.get(c.b);
      if (da == null || db == null) continue;
      const layer = Math.min(da, db);
      if (layer <= 2) out[layer].push(c);
    }
    return out;
  }, [curves, dist]);

  const geoms = useMemo(
    () =>
      layers.map((ls) => {
        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.BufferAttribute(curvesToSegments(ls), 3));
        return g;
      }),
    [layers],
  );

  const col = useMemo(() => new THREE.Color(color), [color]);
  const tex = useMemo(() => glowTexture(), []);
  const primary = layers[0];
  const pulseRefs = useRef<(THREE.Sprite | null)[]>([]);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    primary.forEach((c, i) => {
      const spr = pulseRefs.current[i];
      if (!spr) return;
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
      {geoms.map((g, i) => (
        <lineSegments key={i} geometry={g}>
          <lineBasicMaterial
            color={col}
            transparent
            opacity={LAYER_OPACITY[i]}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>
      ))}
      {primary.map((c, i) => (
        <sprite key={c.a + c.b} ref={(el) => { pulseRefs.current[i] = el; }}>
          <spriteMaterial map={tex} color={col} transparent opacity={0.95} blending={THREE.AdditiveBlending} depthWrite={false} />
        </sprite>
      ))}
    </group>
  );
}

// ── Camino a la Torá: hilo dorado del nodo seleccionado de vuelta al núcleo ─
function PathToTorah({ path, curves }: { path: string[]; curves: EdgeCurve[] }) {
  const geom = useMemo(() => {
    const arr: EdgeCurve[] = [];
    for (let i = 0; i < path.length - 1; i++) {
      const a = path[i];
      const b = path[i + 1];
      const c = curves.find((c) => (c.a === a && c.b === b) || (c.a === b && c.b === a));
      if (c) arr.push(c);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(curvesToSegments(arr), 3));
    return g;
  }, [path, curves]);

  return (
    <lineSegments geometry={geom}>
      <lineBasicMaterial color="#ffe9a8" transparent opacity={0.95} blending={THREE.AdditiveBlending} depthWrite={false} />
    </lineSegments>
  );
}

// ── Resalte de fibras (modo comparación: lo que comparten los nodos) ───────
function FiberHighlight({ curves, color }: { curves: EdgeCurve[]; color: string }) {
  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(curvesToSegments(curves), 3));
    return g;
  }, [curves]);
  return (
    <lineSegments geometry={geom}>
      <lineBasicMaterial color={color} transparent opacity={0.95} blending={THREE.AdditiveBlending} depthWrite={false} />
    </lineSegments>
  );
}

// ── Las 22 letras sobre los senderos del Árbol (entre sefirot), clickeables ─
function TreePathLetters({
  curves,
  locale,
  selected,
}: {
  curves: EdgeCurve[];
  locale: string;
  selected: string | null;
}) {
  // Solo se muestran al hacer CLIC sobre una sefirá: aparecen las letras de SUS
  // senderos, posicionadas SOBRE la línea de conexión (punto medio de la curva).
  const items = useMemo(() => {
    if (!selected) return [];
    return TREE_PATHS.filter((p) => p.from === selected || p.to === selected)
      .map((p) => {
        const c = curves.find(
          (c) => (c.a === p.from && c.b === p.to) || (c.a === p.to && c.b === p.from),
        );
        if (!c || !c.pts.length) return null;
        const m = c.pts[Math.floor(c.pts.length / 2)];
        return { ...p, mid: [m.x, m.y, m.z] as [number, number, number] };
      })
      .filter(Boolean) as Array<(typeof TREE_PATHS)[number] & { mid: [number, number, number] }>;
  }, [curves, selected]);

  return (
    <>
      {items.map((it) => (
        <Html key={it.slug} position={it.mid} center distanceFactor={12} zIndexRange={[16, 0]} style={{ pointerEvents: "auto" }}>
          <a
            href={`/${locale}/letras/${it.slug}`}
            className="tree-letter hebrew"
            title={`Estudiar la letra ${it.name}`}
            style={{
              fontSize: "22px",
              lineHeight: 1,
              color: "#ffe9a8",
              textShadow: "0 0 9px #c9a43e, 0 0 3px #000",
              textDecoration: "none",
              opacity: 0.95,
              display: "inline-block",
              padding: "3px",
            }}
          >
            {it.letter}
          </a>
        </Html>
      ))}
    </>
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
  onClick: (additive: boolean) => void;
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
        onClick={(e) => {
          e.stopPropagation();
          const ne = e.nativeEvent as MouseEvent;
          onClick(!!(ne.metaKey || ne.ctrlKey || ne.shiftKey));
        }}
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

// ── Vuelo de cámara: SOLO al BUSCAR un nodo (no al hacer clic). Lleva el nodo
// al centro de la vista y lo encuadra a una distancia cómoda. Al hacer clic la
// cámara NO se mueve — así el punto se queda donde lo tocaste y no se pierde. ──
function FocusHelper({
  flyToPos,
  controlsRef,
  onArrived,
}: {
  flyToPos: THREE.Vector3 | null;
  controlsRef: React.RefObject<any>;
  onArrived: () => void;
}) {
  const camera = useThree((s) => s.camera);
  useFrame((_, dt) => {
    const c = controlsRef.current;
    if (!c || !flyToPos) return;
    const k = Math.min(1, dt * 2.4);
    // centrar el objetivo en el nodo buscado
    c.target.lerp(flyToPos, k);
    // acercar suavemente la cámara a una distancia cómoda del nodo
    const dir = camera.position.clone().sub(flyToPos);
    const len = dir.length();
    if (len > 0.001) {
      const newLen = THREE.MathUtils.lerp(len, CFG.radiusFocus, k);
      camera.position.copy(flyToPos).add(dir.multiplyScalar(newLen / len));
    }
    c.update();
    if (c.target.distanceTo(flyToPos) < 0.3) onArrived();
  });
  return null;
}

// ── Escena ─────────────────────────────────────────────────────────────────
function BrainScene({
  nodes,
  edges,
  selected,
  hovered,
  compare,
  isFa,
  locale,
  flyToId,
  activeCat,
  onFlewTo,
  onSelect,
  onHover,
  onDouble,
  onBackground,
}: {
  nodes: BNode[];
  edges: [string, string][];
  selected: string | null;
  hovered: string | null;
  compare: string[];
  isFa: boolean;
  locale: string;
  flyToId: string | null;
  activeCat: string | null;
  onFlewTo: () => void;
  onSelect: (id: string, additive: boolean) => void;
  onHover: (id: string | null) => void;
  onDouble: (n: BNode) => void;
  onBackground: () => void;
}) {
  const positions = useMemo(() => layoutNodes(nodes), [nodes]);
  const curves = useMemo(() => buildCurves(positions, edges), [positions, edges]);
  const baseSegments = useMemo(() => curvesToSegments(curves), [curves]);
  const nodeMap = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);

  const focusId = selected ?? hovered;
  // distancias por capas desde el foco (BFS) → visibilidad jerárquica
  const dist = useMemo(
    () => (focusId ? bfsDistances(edges, focusId) : null),
    [edges, focusId],
  );
  // camino a la Torá (solo al SELECCIONAR, no al pasar el mouse)
  const pathToTorah = useMemo(
    () => (selected && selected !== "Torá" ? shortestPath(edges, selected, "Torá") : []),
    [edges, selected],
  );
  const pathSet = useMemo(() => new Set(pathToTorah), [pathToTorah]);
  const flyToPos = flyToId && positions[flyToId] ? new THREE.Vector3(...positions[flyToId]) : null;
  const focusColor = focusId ? (BRAIN_CATS[nodeMap.get(focusId)?.cat ?? ""]?.c ?? "#cfe6ff") : "#cfe6ff";

  // ── Modo comparación (Cmd/Ctrl-clic 2+ nodos): qué COMPARTEN ──
  const compareActive = compare.length >= 2;
  const compareSet = useMemo(() => new Set(compare), [compare]);
  const sharedSet = useMemo(() => {
    if (!compareActive) return new Set<string>();
    let acc: Set<string> | null = null;
    for (const id of compare) {
      const nb = neighborsIn(edges, id);
      if (acc === null) acc = new Set(nb);
      else { const next = new Set<string>(); for (const x of acc) if (nb.has(x)) next.add(x); acc = next; }
    }
    const s = acc ?? new Set<string>();
    compare.forEach((id) => s.delete(id));
    return s;
  }, [compareActive, compare, edges]);
  const sharedCurves = useMemo(() => {
    if (!compareActive) return [] as EdgeCurve[];
    return curves.filter(
      (c) =>
        (compareSet.has(c.a) && sharedSet.has(c.b)) ||
        (compareSet.has(c.b) && sharedSet.has(c.a)),
    );
  }, [compareActive, curves, compareSet, sharedSet]);

  // ── Resaltado de dominio (clic en la leyenda): enciende TODA una categoría ──
  const catActive = !!activeCat;
  const catCurves = useMemo(() => {
    if (!activeCat) return [] as EdgeCurve[];
    return curves.filter(
      (c) => nodeMap.get(c.a)?.cat === activeCat || nodeMap.get(c.b)?.cat === activeCat,
    );
  }, [activeCat, curves, nodeMap]);

  // controles de mouse (girar / mover / zoom) con pausa de auto-giro al interactuar
  const controlsRef = useRef<any>(null);
  // marca de tiempo del último movimiento real de cámara (girar/zoom/pinch):
  // sirve para NO deseleccionar cuando el "clic" en el fondo viene de un gesto.
  // Solo cuenta mientras el usuario interactúa (no el auto-giro).
  const lastCamMove = useRef(0);
  const interacting = useRef(false);
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

  // intensidad por nodo según capa: primaria > secundaria > terciaria > lejana
  const intensityOf = (n: BNode): number => {
    const awakeBase = n.level <= 1 ? 0.55 : n.level === 2 ? 0.32 : 0.18; // latente
    if (compareActive) {
      if (compareSet.has(n.id)) return 1.4; // los nodos comparados
      if (sharedSet.has(n.id)) return 1.15; // lo que COMPARTEN
      return awakeBase * 0.12; // el resto se apaga (no desaparece)
    }
    if (catActive) {
      return n.cat === activeCat ? 1.25 : awakeBase * 0.1; // dominio encendido, resto apagado
    }
    if (!focusId || !dist) return awakeBase;
    if (n.id === focusId) return 1.4;
    const d = dist.get(n.id);
    if (d === 1) return 1.0; // primaria
    if (d === 2) return 0.62; // secundaria
    if (d === 3) return 0.38; // terciaria
    if (pathSet.has(n.id)) return 0.8; // en el camino a la Torá
    return awakeBase * 0.2; // lejano: muy tenue (no desaparece)
  };
  const showLabelOf = (n: BNode): boolean => {
    if (compareActive) return compareSet.has(n.id) || sharedSet.has(n.id);
    if (catActive) return n.cat === activeCat && n.level <= 3; // rotula los nodos del dominio
    if (n.id === focusId) return true;
    if (dist) {
      const d = dist.get(n.id);
      if (d === 1) return true; // primarias rotuladas
      if (pathSet.has(n.id)) return true; // el camino a la Torá rotulado
    }
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
        minDistance={5}
        maxDistance={54}
        autoRotate={autoRot && !selected && !compareActive && !catActive}
        autoRotateSpeed={0.3}
        onStart={() => { interacting.current = true; pauseAuto(); }}
        onEnd={() => { interacting.current = false; resumeAuto(); }}
        onChange={() => { if (interacting.current) lastCamMove.current = performance.now(); }}
      />
      <FocusHelper flyToPos={flyToPos} controlsRef={controlsRef} onArrived={onFlewTo} />
      <ambientLight intensity={0.35} />

      {/* plano de fondo invisible → un TAP limpio en vacío deselecciona.
          Si el usuario acaba de girar/zoom/pinch, el "clic" del gesto se ignora. */}
      <mesh
        position={[0, 0, -40]}
        onClick={(e) => {
          e.stopPropagation();
          if (performance.now() - lastCamMove.current < 350) return; // fue un gesto de cámara
          onBackground();
        }}
      >
        <planeGeometry args={[400, 400]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      <group ref={groupRef}>
        <AmbientTissue />
        <BaseFibers segments={baseSegments} dimmed={focusId !== null || compareActive || catActive} />
        {!compareActive && !catActive && focusId && dist && <LayeredFibers curves={curves} dist={dist} focusId={focusId} color={focusColor} />}
        {!compareActive && !catActive && pathToTorah.length > 1 && <PathToTorah path={pathToTorah} curves={curves} />}
        {compareActive && sharedCurves.length > 0 && <FiberHighlight curves={sharedCurves} color="#ffe9a8" />}
        {catActive && catCurves.length > 0 && <FiberHighlight curves={catCurves} color={BRAIN_CATS[activeCat ?? ""]?.c ?? "#c9a43e"} />}

        {nodes.map((n) => {
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
              onClick={(additive) => onSelect(n.id, additive)}
              onDouble={() => onDouble(n)}
              onHover={(h) => onHover(h ? n.id : null)}
            />
          );
        })}

        {/* las letras hebreas aparecen SOBRE los senderos al hacer clic en una sefirá */}
        <TreePathLetters curves={curves} locale={locale} selected={selected} />
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
  // el cerebro lee sus sinapsis/conexiones de /api/brain (BD); semilla como respaldo
  const [graph, setGraph] = useState<Graph>({ nodes: BNODES, edges: BEDGES });
  const [expanding, setExpanding] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [compare, setCompare] = useState<string[]>([]); // modo comparación (Cmd/Ctrl-clic)
  const [flyToId, setFlyToId] = useState<string | null>(null); // SOLO al buscar: vuela al nodo
  const [activeCat, setActiveCat] = useState<string | null>(null); // dominio resaltado (leyenda)

  useEffect(() => {
    let alive = true;
    fetch("/api/brain")
      .then((r) => r.json())
      .then((d) => {
        if (alive && d && Array.isArray(d.nodes) && d.nodes.length && Array.isArray(d.edges)) {
          setGraph({ nodes: d.nodes as BNode[], edges: d.edges as [string, string][] });
        }
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const selNode = selected ? graph.nodes.find((n) => n.id === selected) ?? null : null;

  // huella de conexiones del nodo seleccionado: total + desglose por dominio
  const selConnections = useMemo(() => {
    if (!selected) return null;
    const nbrs = neighborsIn(graph.edges, selected);
    const nodeMap = new Map(graph.nodes.map((n) => [n.id, n]));
    const byCat: Record<string, number> = {};
    for (const id of nbrs) {
      const c = nodeMap.get(id)?.cat;
      if (c) byCat[c] = (byCat[c] ?? 0) + 1;
    }
    return { total: nbrs.size, byCat };
  }, [selected, graph.edges, graph.nodes]);

  const T = {
    title: "חַשְׁמַל",
    subtitle: isFa ? "مغزِ زندهٔ خَשمَل" : "El cerebro vivo de Jashmal",
    back: isFa ? "بازگشت به خانه" : "Volver al inicio",
    hint: isFa
      ? "بکشید برای چرخش · اسکرول/پینچ برای زوم · کلیک روی سیناپس · دوبار کلیک برای مطالعه"
      : "Arrastra para girar · rueda o pellizca para acercar · clic en una sinapsis · doble clic para estudiar",
    legend: isFa ? "دامنه‌های دانش" : "Dominios del saber",
    study: isFa ? "مطالعه ←" : "Estudiar →",
    expand: isFa ? "✦ گسترش" : "✦ Expandir",
    expanding: isFa ? "در حال پژوهش…" : "Investigando…",
    search: isFa ? "جستجوی هر مفهوم…" : "Busca cualquier concepto…",
  };

  // Buscador global: sugerencias por nombre (es/fa). Seleccionar = volar + encender.
  const suggestions = useMemo(() => {
    const q = searchQ.trim().toLowerCase();
    if (q.length < 1) return [] as BNode[];
    return graph.nodes
      .filter((n) => n.label.toLowerCase().includes(q) || (n.labelFa ?? "").toLowerCase().includes(q))
      .sort((a, b) => a.label.toLowerCase().indexOf(q) - b.label.toLowerCase().indexOf(q))
      .slice(0, 8);
  }, [searchQ, graph.nodes]);

  // Buscar = seleccionar + VOLAR hacia el nodo (porque no se ve en pantalla).
  const pickNode = (id: string) => {
    setCompare([]);
    setActiveCat(null);
    setSelected(id);
    setSearchQ("");
    setFlyToId(id);
  };

  // clic normal = seleccionar uno; Cmd/Ctrl/Shift-clic = agregar a comparación.
  // Al hacer clic NO se vuela (la cámara se queda quieta y no se pierde el punto).
  const handleSelect = (id: string, additive: boolean) => {
    setFlyToId(null); // cancela cualquier vuelo en curso si el usuario toca algo
    setActiveCat(null); // tocar un nodo apaga el resaltado de dominio
    if (additive) {
      setSelected(null);
      setCompare((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    } else {
      setCompare([]);
      setSelected((p) => (p === id ? null : id));
    }
  };
  const clearAll = () => { setSelected(null); setCompare([]); setFlyToId(null); setActiveCat(null); };
  // clic en un dominio de la leyenda → enciende toda esa parte del cerebro (toggle)
  const toggleCat = (key: string) => {
    setSelected(null); setCompare([]); setFlyToId(null);
    setActiveCat((p) => (p === key ? null : key));
  };
  const handleDouble = (n: BNode) => { if (n.url) window.open("https://jashmal.org" + n.url, "_blank"); };

  // qué COMPARTEN los nodos en comparación (vecinos comunes)
  const compareShared = useMemo(() => {
    if (compare.length < 2) return [] as string[];
    let acc: Set<string> | null = null;
    for (const id of compare) {
      const nb = neighborsIn(graph.edges, id);
      if (acc === null) acc = new Set(nb);
      else { const next = new Set<string>(); for (const x of acc) if (nb.has(x)) next.add(x); acc = next; }
    }
    const s = acc ?? new Set<string>();
    compare.forEach((id) => s.delete(id));
    return [...s];
  }, [compare, graph.edges]);
  const labelOf = (id: string) => {
    const n = graph.nodes.find((x) => x.id === id);
    return n ? (isFa ? n.labelFa : n.label) : id;
  };

  // Expansión recursiva: el Sofer del dominio investiga el nodo → el cerebro crece.
  function mergeGraph(prev: Graph, addNodes: BNode[], addEdges: [string, string][]): Graph {
    const ids = new Set(prev.nodes.map((n) => n.id));
    const nodes = [...prev.nodes];
    for (const n of addNodes) if (!ids.has(n.id)) { ids.add(n.id); nodes.push(n); }
    const key = (a: string, b: string) => (a < b ? `${a}|${b}` : `${b}|${a}`);
    const ek = new Set(prev.edges.map(([a, b]) => key(a, b)));
    const edges = [...prev.edges];
    for (const [a, b] of addEdges) { const k = key(a, b); if (!ek.has(k)) { ek.add(k); edges.push([a, b]); } }
    return { nodes, edges };
  }

  async function expandNode() {
    if (!selNode || expanding) return;
    setExpanding(true);
    try {
      const res = await fetch("/api/brain/expand", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodeId: selNode.id, label: selNode.label, cat: selNode.cat, level: selNode.level, locale }),
      });
      const d = await res.json();
      if (d?.ok && Array.isArray(d.nodes) && d.nodes.length) {
        setGraph((prev) => mergeGraph(prev, d.nodes as BNode[], (d.edges ?? []) as [string, string][]));
      }
    } catch {
      /* silencioso */
    }
    setExpanding(false);
  }

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
          <fogExp2 attach="fog" args={["#03040a", 0.011]} />
          <BrainScene
            nodes={graph.nodes}
            edges={graph.edges}
            selected={selected}
            hovered={hovered}
            compare={compare}
            isFa={isFa}
            locale={locale}
            flyToId={flyToId}
            activeCat={activeCat}
            onFlewTo={() => setFlyToId(null)}
            onSelect={handleSelect}
            onHover={setHovered}
            onDouble={handleDouble}
            onBackground={clearAll}
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

      {/* Buscador global (motor de búsqueda visual) */}
      <div className="pointer-events-none absolute inset-x-0 top-16 z-20 flex justify-center px-4">
        <div className="pointer-events-auto w-[min(360px,86vw)]">
          <div className="relative">
            <input
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && suggestions[0]) pickNode(suggestions[0].id);
                if (e.key === "Escape") setSearchQ("");
              }}
              placeholder={T.search}
              dir={isFa ? "rtl" : "ltr"}
              style={{ fontFamily: "var(--font-cormorant, serif)" }}
              className="w-full rounded-full border border-gold/25 bg-ink/85 px-4 py-2 pe-9 text-base text-[#e8e4d8] outline-none backdrop-blur-md placeholder:text-muted/40 focus:border-gold/60"
            />
            <span className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-gold/50">⌕</span>
          </div>
          {suggestions.length > 0 && (
            <ul className="mt-1.5 overflow-hidden rounded-2xl border border-gold/15 bg-ink/90 backdrop-blur-md">
              {suggestions.map((n) => {
                const c = BRAIN_CATS[n.cat]?.c ?? "#c9a43e";
                return (
                  <li key={n.id}>
                    <button
                      onClick={() => pickNode(n.id)}
                      className="flex w-full items-center gap-2 px-4 py-2 text-start transition-colors hover:bg-gold/10"
                    >
                      <span className="inline-block h-2 w-2 shrink-0 rounded-full" style={{ background: c, boxShadow: `0 0 6px ${c}` }} />
                      <span className="truncate text-sm text-[#e8e4d8]">{isFa ? n.labelFa : n.label}</span>
                      <span className="ms-auto shrink-0 text-[10px] uppercase tracking-wide text-muted/40">{BRAIN_CATS[n.cat]?.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Leyenda — clic en un dominio enciende toda esa parte del cerebro */}
      <div className="absolute bottom-4 start-4 z-10 rounded-xl border border-gold/15 bg-ink/85 p-3 backdrop-blur-md">
        <p className="mb-1.5 font-cinzel text-[10px] uppercase tracking-[0.2em] text-gold/45">{T.legend}</p>
        <div className="grid grid-cols-2 gap-x-1.5 gap-y-0.5">
          {Object.entries(BRAIN_CATS).filter(([k]) => k !== "jashmal").map(([key, v]) => {
            const on = activeCat === key;
            return (
              <button
                key={key}
                onClick={() => toggleCat(key)}
                aria-pressed={on}
                className={`flex items-center gap-2 rounded-md px-2 py-1 text-start transition-colors ${on ? "bg-gold/15" : "hover:bg-gold/10"}`}
              >
                <span className="inline-block h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: v.c, boxShadow: `0 0 8px ${v.c}` }} />
                <span className={`text-[13px] leading-tight ${on ? "font-medium text-parchment" : "text-muted/85"}`}>{isFa ? v.labelFa : v.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hint */}
      <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2">
        <p className="font-cinzel text-[9px] uppercase tracking-[0.25em] text-gold/25">{T.hint}</p>
      </div>

      {/* Tarjeta del nodo seleccionado */}
      {selNode && (
        <div className="absolute bottom-4 end-4 z-10 w-[min(260px,80vw)] rounded-xl border border-gold/25 bg-ink/90 p-4 backdrop-blur-md">
          <div className="flex items-start justify-between gap-2">
            <p className="font-cinzel text-base" style={{ color: BRAIN_CATS[selNode.cat]?.c ?? "#c9a43e" }}>
              {isFa ? selNode.labelFa : selNode.label}
            </p>
            <button
              onClick={clearAll}
              aria-label={isFa ? "بستن" : "cerrar"}
              className="-me-1 -mt-1 shrink-0 rounded-full px-2 py-0.5 text-lg leading-none text-muted/50 transition-colors hover:text-gold"
            >
              ×
            </button>
          </div>
          <p className="mt-0.5 text-[10px] uppercase tracking-wide text-muted/50">{BRAIN_CATS[selNode.cat]?.label}</p>

          {selConnections && selConnections.total > 0 && (
            <div className="mt-2.5 border-t border-gold/10 pt-2.5">
              <p className="mb-1 text-[11px] text-parchment/80">
                <span className="font-cinzel text-sm text-gold">{selConnections.total}</span>{" "}
                {isFa ? "اتصال" : selConnections.total === 1 ? "conexión" : "conexiones"}
              </p>
              <div className="flex flex-wrap gap-x-2.5 gap-y-1">
                {Object.entries(selConnections.byCat)
                  .sort((a, b) => b[1] - a[1])
                  .map(([cat, n]) => (
                    <span key={cat} className="flex items-center gap-1 text-[10px] text-muted/85">
                      <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: BRAIN_CATS[cat]?.c ?? "#c9a43e" }} />
                      {(isFa ? BRAIN_CATS[cat]?.labelFa : BRAIN_CATS[cat]?.label) ?? cat}:{" "}
                      <span className="text-parchment/90">{n}</span>
                    </span>
                  ))}
              </div>
            </div>
          )}

          <button
            onClick={expandNode}
            disabled={expanding}
            className="mt-3 block w-full rounded-full border border-cyan-300/30 bg-cyan-300/[0.06] px-4 py-2 text-center font-cinzel text-xs uppercase tracking-widest text-cyan-200/90 transition-all hover:border-cyan-300/60 hover:bg-cyan-300/15 disabled:opacity-50"
            title="El Sofer investiga este tema y abre sus conexiones"
          >
            {expanding ? T.expanding : T.expand}
          </button>
          {selNode.url ? (
            <a
              href={"https://jashmal.org" + selNode.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block rounded-full border border-gold/30 bg-gold/[0.07] px-4 py-2 text-center font-cinzel text-xs uppercase tracking-widest text-gold transition-all hover:border-gold/60 hover:bg-gold/15"
            >
              {T.study}
            </a>
          ) : (
            <Link
              href={`/estudio?concept=${encodeURIComponent(selNode.label.replace(/\s*\([^)]*\)\s*/g, " ").trim())}`}
              className="mt-2 block rounded-full border border-gold/30 bg-gold/[0.07] px-4 py-2 text-center font-cinzel text-xs uppercase tracking-widest text-gold transition-all hover:border-gold/60 hover:bg-gold/15"
            >
              {T.study}
            </Link>
          )}
        </div>
      )}

      {/* Panel de comparación multi-nodo (intersección) */}
      {compare.length > 0 && (
        <div className="absolute bottom-4 end-4 z-10 w-[min(280px,84vw)] rounded-xl border border-cyan-300/30 bg-ink/90 p-4 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <p className="font-cinzel text-sm uppercase tracking-wide text-cyan-200/90">
              {isFa ? "مقایسه" : "Comparando"}
            </p>
            <button onClick={clearAll} className="text-[10px] uppercase tracking-wide text-muted/60 transition-colors hover:text-gold">
              {isFa ? "پاک کردن" : "limpiar"}
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {compare.map((id) => (
              <span key={id} className="inline-flex items-center gap-1 rounded-full border border-gold/25 bg-gold/[0.06] px-2 py-0.5 text-[11px] text-parchment">
                {labelOf(id)}
                <button
                  onClick={() => setCompare((p) => p.filter((x) => x !== id))}
                  className="text-muted/60 transition-colors hover:text-rose-300"
                  aria-label="quitar"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          {compare.length < 2 ? (
            <p className="mt-3 text-[11px] italic leading-snug text-muted/60">
              {isFa
                ? "با Cmd/Ctrl روی موضوع دیگری کلیک کن تا مقایسه شود"
                : "Cmd/Ctrl + clic en otro tema para comparar"}
            </p>
          ) : (
            <>
              <p className="mb-1 mt-3 font-cinzel text-[10px] uppercase tracking-wide text-gold/60">
                {isFa ? "مشترک" : "Comparten"}
              </p>
              {compareShared.length === 0 ? (
                <p className="text-[11px] italic leading-snug text-muted/50">
                  {isFa ? "اشتراک مستقیمی نیست (✦ گسترش بزن)" : "Sin coincidencia directa (toca ✦ Expandir para descubrir)"}
                </p>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {compareShared.map((id) => (
                    <button
                      key={id}
                      onClick={() => pickNode(id)}
                      className="rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 text-[11px] text-gold transition-colors hover:bg-gold/20"
                    >
                      {labelOf(id)}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
