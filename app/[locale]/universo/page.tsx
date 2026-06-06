"use client";

// ─────────────────────────────────────────────────────────────────────────
// /universo — "El Universo del Conocimiento de Jashmal"
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
  GALAXY_CATS,
  GALAXY_DISK,
  galaxyCenter,
  layoutNodes,
  ambientTissue,
  potentialNodes,
  bfsDistances,
  shortestPath,
  neighborsIn,
  edgeKind,
  TREE_PATHS,
  type BNode,
} from "@/lib/brainData";
import { gilgulChainForRoot, traverseGilgul, getGilgulModel } from "@/lib/gilgul";

type Graph = { nodes: BNode[]; edges: [string, string][] };

const Canvas = dynamic(() => import("@react-three/fiber").then((m) => m.Canvas), { ssr: false });
// Capa Gilgul (linaje de almas): ADITIVA, solo se monta cuando hay raíz invocada.
const GilgulLayer = dynamic(() => import("./GilgulLayer"), { ssr: false });

// ── Ajustes del look (todo el tuning fino vive aquí) ──────────────────────
const CFG = {
  fiberSegments: 24,
  fiberSag: 0.32,           // arco MÁS curvado de las fibras (menos rectas)
  fiberOpacityIdle: 0.022,  // red cósmica: hilos casi invisibles en reposo
  fiberOpacityDimmed: 0.02, // cuando hay selección, la base se apaga más
  fiberOpacityActive: 0.9,  // fibras encendidas
  ambientCount: 13000,      // polvo estelar que dibuja los brazos de las galaxias
  ambientSize: 0.058,
  ambientOpacity: 0.74,
  potentialCount: 1100,     // nodos POTENCIALES (chispas por recoger, Tikún incompleto)
  potentialSize: 0.07,      // un poco más grandes que el tejido, para leerse como "nodos"
  potentialOpacity: 0.22,   // muy tenues: insinúan, no compiten con los reales
  haloBase: 0.30,           // halo más chico: no lava las letras alrededor
  coreBase: 0.16,           // tamaño del núcleo brillante
  driftSpeed: 0.045,        // deriva lenta de cámara
  radiusIdle: 56,           // cámara: el universo de galaxias llena la pantalla
  radiusFocus: 7,           // al elegir/buscar, la cámara se ACERCA al concepto
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
type EdgeCurve = { a: string; b: string; pts: THREE.Vector3[]; kind: "solid" | "interp" };

function buildCurves(
  positions: Record<string, [number, number, number]>,
  edges: [string, string][],
  commSet: Set<string>,
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
    // una arista que toca la galaxia Comunidad (un jidush) es SIEMPRE interpretativa
    const kind = commSet.has(a) || commSet.has(b) ? "interp" : edgeKind(a, b);
    curves.push({ a, b, pts: curve.getPoints(CFG.fiberSegments), kind });
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

// ── Nodos POTENCIALES: chispas tenues por recoger (Tikún incompleto) ───────
// Llenan una esfera más grande que los nodos reales → zonas oscuras con
// potencial. Tinte dorado frío, muy tenue, con un parpadeo lento desfasado.
function PotentialNodes() {
  const tex = useMemo(() => glowTexture(), []);
  const positions = useMemo(() => potentialNodes(CFG.potentialCount), []);
  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);
  const matRef = useRef<THREE.PointsMaterial>(null);
  useFrame(({ clock }) => {
    if (matRef.current) {
      // respiración lenta y desfasada del tejido: las chispas "laten" suave
      matRef.current.opacity =
        CFG.potentialOpacity * (0.7 + Math.sin(clock.elapsedTime * 0.35 + 1.7) * 0.3);
    }
  });
  return (
    <points geometry={geom}>
      <pointsMaterial
        ref={matRef}
        map={tex}
        size={CFG.potentialSize * BRAIN_SCALE}
        color={"#d8b45a"}
        transparent
        opacity={CFG.potentialOpacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

// ── Campo estelar de fondo (profundidad del universo) ─────────────────────
function StarField() {
  const tex = useMemo(() => glowTexture(), []);
  const geom = useMemo(() => {
    const N = 5200;
    let s = 0x9e3779b9 >>> 0;
    const rnd = () => {
      s = (s + 0x6d2b79f5) >>> 0;
      let t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const pos = new Float32Array(N * 3);
    const col = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const u = rnd() * 2 - 1, ph = rnd() * Math.PI * 2, si = Math.sqrt(1 - u * u);
      const r = 70 + rnd() * 190; // muy detrás de las galaxias
      pos[i * 3] = si * Math.cos(ph) * r;
      pos[i * 3 + 1] = u * r;
      pos[i * 3 + 2] = si * Math.sin(ph) * r;
      const w = 0.45 + rnd() * 0.55;
      const blue = rnd() < 0.22;
      col[i * 3] = (blue ? 0.62 : 1) * w;
      col[i * 3 + 1] = (blue ? 0.74 : 1) * w;
      col[i * 3 + 2] = w;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    return g;
  }, []);
  return (
    <points geometry={geom}>
      <pointsMaterial map={tex} size={0.85} vertexColors transparent opacity={0.7} blending={THREE.AdditiveBlending} depthWrite={false} sizeAttenuation />
    </points>
  );
}

// ── Nebulosa + núcleo + nombre de cada galaxia (disciplina) ───────────────
function Nebulae({ isFa }: { isFa: boolean }) {
  const tex = useMemo(() => glowTexture(), []);
  return (
    <>
      {GALAXY_CATS.map((cat) => {
        const c = galaxyCenter(cat);
        const col = BRAIN_CATS[cat]?.c ?? "#9a9aae";
        const neb = GALAXY_DISK * 2.4;
        const core = GALAXY_DISK * 0.5;
        return (
          <group key={cat} position={c}>
            <sprite scale={[neb, neb, 1]}>
              <spriteMaterial map={tex} color={col} transparent opacity={0.18} blending={THREE.AdditiveBlending} depthWrite={false} />
            </sprite>
            <sprite scale={[core, core, 1]}>
              <spriteMaterial map={tex} color={"#fff7e6"} transparent opacity={0.24} blending={THREE.AdditiveBlending} depthWrite={false} />
            </sprite>
            <Html center zIndexRange={[15, 0]} style={{ pointerEvents: "none" }}>
              <div
                style={{
                  fontFamily: "var(--font-cinzel, serif)",
                  fontSize: "12px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  color: col,
                  textShadow: "0 0 14px #000, 0 0 6px #000",
                  opacity: 0.82,
                }}
              >
                {isFa ? BRAIN_CATS[cat]?.labelFa : BRAIN_CATS[cat]?.label}
              </div>
            </Html>
          </group>
        );
      })}
    </>
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
        color="#6a7fae"
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
const LAYER_OPACITY = [0.6, 0.26, 0.1]; // fibras encendidas: más finas/tenues
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

  // geometría por capa, SEPARADA en clásicas (solid) e interpretativas (interp)
  const geoms = useMemo(
    () =>
      layers.map((ls) => {
        const mk = (arr: EdgeCurve[]) => {
          const g = new THREE.BufferGeometry();
          g.setAttribute("position", new THREE.BufferAttribute(curvesToSegments(arr), 3));
          return g;
        };
        return {
          solid: mk(ls.filter((c) => c.kind === "solid")),
          interp: mk(ls.filter((c) => c.kind === "interp")),
        };
      }),
    [layers],
  );

  const col = useMemo(() => new THREE.Color(color), [color]);
  // tinte interpretativo: el color del dominio desvaído hacia un gris frío
  const interpCol = useMemo(() => new THREE.Color(color).lerp(new THREE.Color("#9aa6c4"), 0.55), [color]);
  const tex = useMemo(() => glowTexture(), []);
  // el electrón viaja SOLO por las aristas CLÁSICAS primarias (la autoridad)
  const primarySolid = useMemo(() => layers[0].filter((c) => c.kind === "solid"), [layers]);
  const pulseRefs = useRef<(THREE.Sprite | null)[]>([]);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    primarySolid.forEach((c, i) => {
      const spr = pulseRefs.current[i];
      if (!spr) return;
      const fwd = c.a === focusId;
      let u = (t * 0.6 + i * 0.13) % 1;
      if (!fwd) u = 1 - u;
      const idx = Math.min(c.pts.length - 1, Math.max(0, Math.floor(u * (c.pts.length - 1))));
      const p = c.pts[idx];
      spr.position.set(p.x, p.y, p.z);
      // electrón pequeño y sutil que viaja por la fibra (no una bola de luz)
      const s = (0.026 + Math.sin((t + i) * 3) * 0.007) * BRAIN_SCALE;
      spr.scale.set(s, s, 1);
    });
  });

  return (
    <group>
      {geoms.map((g, i) => (
        <group key={i}>
          {/* CLÁSICAS (fuente): plenas, color del dominio = autoridad */}
          <lineSegments geometry={g.solid}>
            <lineBasicMaterial color={col} transparent opacity={LAYER_OPACITY[i]} blending={THREE.AdditiveBlending} depthWrite={false} />
          </lineSegments>
          {/* INTERPRETATIVAS (lectura): tenues y frías = NO son fuente */}
          <lineSegments geometry={g.interp}>
            <lineBasicMaterial color={interpCol} transparent opacity={LAYER_OPACITY[i] * 0.4} blending={THREE.AdditiveBlending} depthWrite={false} />
          </lineSegments>
        </group>
      ))}
      {primarySolid.map((c, i) => (
        <sprite key={c.a + c.b} ref={(el) => { pulseRefs.current[i] = el; }}>
          <spriteMaterial map={tex} color={col} transparent opacity={0.7} blending={THREE.AdditiveBlending} depthWrite={false} />
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
        scale={[1.7 * BRAIN_SCALE * 0.34, 1.7 * BRAIN_SCALE * 0.34, 1]}
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
              transform: "translateY(-20px)",
              whiteSpace: "nowrap",
              userSelect: "none",
              fontFamily: "var(--font-cinzel, serif)",
              fontWeight: 600,
              fontSize: node.level <= 1 ? "13px" : "11px",
              color: baseCol,
              // contorno negro fuerte → legible aun sobre un núcleo brillante
              textShadow: "0 1px 3px #000, 0 0 6px #000, 0 0 11px #000, 0 0 2px #000",
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

// ═══════════════════════════════════════════════════════════════════════════
// "VIAJE DE LUZ" — interactividad de ARISTAS (encima de todo lo existente)
//   1. Hover de arista → glow + gradiente color(origen)→color(destino)
//   2. Tooltip flotante minimalista "origen → destino" (clásica/interpretativa)
//   3. Clic → la cámara VIAJA por el spline (fibra óptica) hasta el destino
// Sólo se vuelven interactivas las aristas DEL NODO EN FOCO (handful, barato).
// ═══════════════════════════════════════════════════════════════════════════

// Tipo del viaje en curso (lo orquesta la página). pts = puntos del spline.
type Travel = { from: string; to: string; pts: THREE.Vector3[] };

// Tubo con COLOR POR VÉRTICE a lo largo del spline: colA (galaxia origen) →
// colB (galaxia destino). El gradiente atraviesa el dominio (ej. rojo→púrpura→azul).
function gradientTube(
  pts: THREE.Vector3[],
  radius: number,
  colA: THREE.Color,
  colB: THREE.Color,
): THREE.BufferGeometry {
  const curve = new THREE.CatmullRomCurve3(pts);
  const tubular = Math.max(8, pts.length - 1);
  const radial = 6;
  const geo = new THREE.TubeGeometry(curve, tubular, radius, radial, false);
  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const tmp = new THREE.Color();
  // TubeGeometry recorre (tubular+1) anillos de (radial+1) vértices cada uno;
  // el índice de anillo da el parámetro t a lo largo de la curva.
  const ring = radial + 1;
  for (let i = 0; i < pos.count; i++) {
    const seg = Math.floor(i / ring);
    const t = tubular === 0 ? 0 : seg / tubular;
    tmp.copy(colA).lerp(colB, t);
    colors[i * 3] = tmp.r;
    colors[i * 3 + 1] = tmp.g;
    colors[i * 3 + 2] = tmp.b;
  }
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  return geo;
}

// Una arista interactiva (sólo las del nodo en foco). Tubo fino visible con
// gradiente + tubo "hit" grueso invisible para que sea fácil de tocar/clicar.
function InteractiveEdge({
  curve,
  colA,
  colB,
  isHot,
  isFa,
  fromLabel,
  toLabel,
  onHover,
  onPick,
}: {
  curve: EdgeCurve;
  colA: THREE.Color;
  colB: THREE.Color;
  isHot: boolean;
  isFa: boolean;
  fromLabel: string;
  toLabel: string;
  onHover: (h: boolean) => void;
  onPick: () => void;
}) {
  // tubo visible delgado, con gradiente por vértice
  const tubeGeo = useMemo(
    () => gradientTube(curve.pts, 0.012 * BRAIN_SCALE, colA, colB),
    [curve.pts, colA, colB],
  );
  // tubo de impacto: invisible, más grueso → área de hover/clic generosa
  const hitGeo = useMemo(
    () => gradientTube(curve.pts, 0.07 * BRAIN_SCALE, colA, colB),
    [curve.pts, colA, colB],
  );
  useEffect(() => () => { tubeGeo.dispose(); hitGeo.dispose(); }, [tubeGeo, hitGeo]);

  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  useFrame(({ clock }) => {
    if (!matRef.current) return;
    // en reposo apenas se insinúa; al hover late con un glow suave
    const base = isHot ? 0.55 + Math.sin(clock.elapsedTime * 4) * 0.12 : 0.16;
    matRef.current.opacity = base;
  });

  // punto medio del spline, un poco elevado → ahí flota el rótulo
  const mid = curve.pts[Math.floor(curve.pts.length / 2)];

  return (
    <group>
      <mesh geometry={tubeGeo}>
        <meshBasicMaterial
          ref={matRef}
          vertexColors
          transparent
          opacity={0.16}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      {/* área de impacto invisible (hover + clic) */}
      <mesh
        geometry={hitGeo}
        onPointerOver={(e) => { e.stopPropagation(); onHover(true); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { onHover(false); document.body.style.cursor = "default"; }}
        onClick={(e) => { e.stopPropagation(); onPick(); }}
      >
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      {isHot && (
        <Html position={[mid.x, mid.y, mid.z]} center distanceFactor={11} zIndexRange={[30, 0]} style={{ pointerEvents: "none" }}>
          <div
            dir={isFa ? "rtl" : "ltr"}
            style={{
              transform: "translateY(-16px)",
              whiteSpace: "nowrap",
              userSelect: "none",
              fontFamily: "var(--font-cinzel, serif)",
              fontSize: "11px",
              letterSpacing: "0.04em",
              padding: "3px 9px",
              borderRadius: "9999px",
              border: "1px solid rgba(201,164,62,0.35)",
              background: "rgba(5,5,10,0.82)",
              color: "#f0e6cf",
              backdropFilter: "blur(4px)",
              boxShadow: "0 0 14px rgba(0,0,0,0.6)",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>{isFa ? toLabel : fromLabel}</span>
            <span style={{ color: "#c9a43e" }}>{isFa ? "←" : "→"}</span>
            <span>{isFa ? fromLabel : toLabel}</span>
            <span
              style={{
                marginInlineStart: "4px",
                fontSize: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                opacity: 0.6,
                color: curve.kind === "solid" ? "#c9a43e" : "#9aa6c4",
              }}
            >
              {curve.kind === "solid" ? (isFa ? "کلاسیک" : "clásica") : (isFa ? "تفسیری" : "interp.")}
            </span>
          </div>
        </Html>
      )}
    </group>
  );
}

// Capa de aristas interactivas: SÓLO las del nodo en foco (raycasting barato).
function FocusEdges({
  curves,
  focusId,
  hotKey,
  nodeMap,
  isFa,
  onHover,
  onPick,
}: {
  curves: EdgeCurve[];
  focusId: string;
  hotKey: string | null;
  nodeMap: Map<string, BNode>;
  isFa: boolean;
  onHover: (key: string | null) => void;
  onPick: (c: EdgeCurve) => void;
}) {
  // aristas que tocan el nodo en foco, orientadas para que `a` sea SIEMPRE el foco
  const focusCurves = useMemo(() => {
    const out: { c: EdgeCurve; oriented: EdgeCurve }[] = [];
    for (const c of curves) {
      if (c.a !== focusId && c.b !== focusId) continue;
      if (c.a === focusId) out.push({ c, oriented: c });
      else out.push({ c, oriented: { a: c.b, b: c.a, pts: [...c.pts].reverse(), kind: c.kind } });
    }
    return out;
  }, [curves, focusId]);

  const colCache = useMemo(() => new Map<string, THREE.Color>(), []);
  const colorOf = (cat: string | undefined) => {
    const hex = BRAIN_CATS[cat ?? ""]?.c ?? "#c9a43e";
    let col = colCache.get(hex);
    if (!col) { col = new THREE.Color(hex); colCache.set(hex, col); }
    return col;
  };

  return (
    <group>
      {focusCurves.map(({ c, oriented }) => {
        const key = c.a + "→" + c.b;
        const fromN = nodeMap.get(oriented.a);
        const toN = nodeMap.get(oriented.b);
        return (
          <InteractiveEdge
            key={key}
            curve={oriented}
            colA={colorOf(fromN?.cat)}
            colB={colorOf(toN?.cat)}
            isHot={hotKey === key}
            isFa={isFa}
            fromLabel={fromN ? (isFa ? fromN.labelFa : fromN.label) : oriented.a}
            toLabel={toN ? (isFa ? toN.labelFa : toN.label) : oriented.b}
            onHover={(h) => onHover(h ? key : null)}
            onPick={() => onPick(oriented)}
          />
        );
      })}
    </group>
  );
}

// Pulsos de luz que FLUYEN por el spline mientras la cámara viaja (fibra óptica).
function TravelPulses({ pts, colA, colB }: { pts: THREE.Vector3[]; colA: THREE.Color; colB: THREE.Color }) {
  const tex = useMemo(() => glowTexture(), []);
  const N = 7; // pulsos escalonados que corren hacia el destino
  const refs = useRef<(THREE.Sprite | null)[]>([]);
  const last = pts.length - 1;
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    for (let i = 0; i < N; i++) {
      const spr = refs.current[i];
      if (!spr) continue;
      const u = (t * 0.9 + i / N) % 1;
      const idx = Math.min(last, Math.max(0, Math.floor(u * last)));
      const p = pts[idx];
      spr.position.set(p.x, p.y, p.z);
      const s = (0.05 + Math.sin((t + i) * 6) * 0.018) * BRAIN_SCALE;
      spr.scale.set(s, s, 1);
      const m = spr.material as THREE.SpriteMaterial;
      m.color.copy(colA).lerp(colB, u);
      m.opacity = 0.85 * Math.sin(u * Math.PI); // nace y muere suave en los extremos
    }
  });
  return (
    <group>
      {Array.from({ length: N }).map((_, i) => (
        <sprite key={i} ref={(el) => { refs.current[i] = el; }}>
          <spriteMaterial map={tex} transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
        </sprite>
      ))}
    </group>
  );
}

// Vuelo de cámara A LO LARGO del spline (no teletransporte): consciencia
// viajando por la fibra. Al llegar, dispara onArrived → reusa la selección.
function TravelHelper({
  travel,
  controlsRef,
  nodeMap,
  onArrived,
}: {
  travel: Travel;
  controlsRef: React.RefObject<any>;
  nodeMap: Map<string, BNode>;
  onArrived: (toId: string) => void;
}) {
  const camera = useThree((s) => s.camera);
  const curve = useMemo(() => new THREE.CatmullRomCurve3(travel.pts), [travel.pts]);
  const colA = useMemo(() => new THREE.Color(BRAIN_CATS[nodeMap.get(travel.from)?.cat ?? ""]?.c ?? "#c9a43e"), [nodeMap, travel.from]);
  const colB = useMemo(() => new THREE.Color(BRAIN_CATS[nodeMap.get(travel.to)?.cat ?? ""]?.c ?? "#c9a43e"), [nodeMap, travel.to]);
  const dest = useMemo(() => travel.pts[travel.pts.length - 1].clone(), [travel.pts]);
  const startOff = useRef<THREE.Vector3 | null>(null);
  const prog = useRef(0); // 0..1 a lo largo del recorrido
  const done = useRef(false);

  useFrame((_, dt) => {
    const c = controlsRef.current;
    if (!c || done.current) return;
    // offset inicial de la cámara respecto a su target (para conservar el "atrás")
    if (!startOff.current) startOff.current = camera.position.clone().sub(c.target);

    prog.current = Math.min(1, prog.current + dt * 0.55); // ~1.8s de viaje
    const e = prog.current < 0.5 ? 2 * prog.current * prog.current : 1 - Math.pow(-2 * prog.current + 2, 2) / 2; // easeInOut

    // el TARGET corre por la curva; la cámara lo sigue un poco por detrás sobre la misma curva
    const tgt = curve.getPointAt(e);
    c.target.lerp(tgt, Math.min(1, dt * 6));

    const back = Math.max(0, e - 0.10);
    const behind = curve.getPointAt(back);
    // distancia de seguimiento que se cierra al acercarse (de "dentro de la fibra" a encuadre)
    const followDist = THREE.MathUtils.lerp(CFG.radiusFocus * 0.55, CFG.radiusFocus, e);
    const dir = behind.clone().sub(tgt);
    if (dir.lengthSq() < 1e-6) dir.copy(startOff.current).normalize();
    else dir.normalize();
    const desired = tgt.clone().add(dir.multiplyScalar(followDist * 0.6))
      .add(new THREE.Vector3(0, CFG.radiusFocus * 0.25, 0)); // leve elevación
    camera.position.lerp(desired, Math.min(1, dt * 4));
    c.update();

    if (prog.current >= 1) {
      done.current = true;
      // asienta el target exactamente en el destino antes de soltar
      c.target.copy(dest);
      c.update();
      onArrived(travel.to);
    }
  });

  return <TravelPulses pts={travel.pts} colA={colA} colB={colB} />;
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
  travel,
  gilgulRoot,
  onFlewTo,
  onSelect,
  onHover,
  onDouble,
  onPickEdge,
  onTravelArrived,
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
  travel: Travel | null;
  gilgulRoot: string | null;
  onFlewTo: () => void;
  onSelect: (id: string, additive: boolean) => void;
  onHover: (id: string | null) => void;
  onDouble: (n: BNode) => void;
  onPickEdge: (from: string, to: string, pts: THREE.Vector3[]) => void;
  onTravelArrived: (toId: string) => void;
}) {
  const positions = useMemo(() => layoutNodes(nodes), [nodes]);
  // estrellas de la galaxia Comunidad (jidushim) → sus aristas son interpretativas
  const commSet = useMemo(
    () => new Set(nodes.filter((n) => n.cat === "comunidad").map((n) => n.id)),
    [nodes],
  );
  const curves = useMemo(() => buildCurves(positions, edges, commSet), [positions, edges, commSet]);
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

  // ── Modo GILGUL (linaje de almas): qué nodos toca el linaje de la raíz ──
  // Cuando hay raíz, atenuamos TODO lo no-relacionado y encendemos la cadena.
  const gilgulActive = !!gilgulRoot;
  const gilgulReach = useMemo(() => {
    if (!gilgulRoot) return null;
    return traverseGilgul(gilgulRoot).reachable; // ids alcanzados por el linaje
  }, [gilgulRoot]);

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
  // arista bajo el mouse (sólo entre las del nodo en foco) → glow + tooltip
  const [hotEdge, setHotEdge] = useState<string | null>(null);
  // al cambiar el nodo en foco (o entrar en viaje), olvida la arista resaltada
  useEffect(() => { setHotEdge(null); }, [focusId, travel]);
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
  // "Tanaj" en la leyenda enciende también el núcleo Torá (misma galaxia)
  const catHit = (c: string) => c === activeCat || (activeCat === "tanakh" && c === "torah");
  const intensityOf = (n: BNode): number => {
    const awakeBase = n.level <= 1 ? 0.55 : n.level === 2 ? 0.32 : 0.18; // latente
    if (gilgulActive && gilgulReach) {
      if (n.id === gilgulRoot) return 1.4;          // la raíz del alma, intensa
      if (gilgulReach.has(n.id)) return 1.1;        // vasijas del linaje, encendidas
      return awakeBase * 0.06;                       // todo lo demás se atenúa fuerte
    }
    if (compareActive) {
      if (compareSet.has(n.id)) return 1.4; // los nodos comparados
      if (sharedSet.has(n.id)) return 1.15; // lo que COMPARTEN
      return awakeBase * 0.12; // el resto se apaga (no desaparece)
    }
    if (catActive) {
      return catHit(n.cat) ? 1.25 : awakeBase * 0.1; // dominio encendido, resto apagado
    }
    // hover: la estrella apuntada se ilumina aunque haya OTRA lockeada (sin cambiar
    // las aristas encendidas, que siguen siendo las del nodo lockeado).
    if (n.id === hovered && n.id !== selected) return 1.1;
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
    if (n.id === hovered) return true; // la estrella apuntada SIEMPRE muestra su nombre
    if (gilgulActive && gilgulReach) return n.id === gilgulRoot || gilgulReach.has(n.id); // rotula el linaje
    if (compareActive) return compareSet.has(n.id) || sharedSet.has(n.id);
    if (catActive) return catHit(n.cat) && n.level <= 3; // rotula los nodos del dominio
    if (n.id === focusId) return true;
    if (dist) {
      const d = dist.get(n.id);
      if (d === 1) return true; // primarias rotuladas
      if (pathSet.has(n.id)) return true; // el camino a la Torá rotulado
    }
    // (en reposo NO se rotulan los nodos: solo los nombres de galaxia. Al pasar el
    //  mouse o elegir, aparecen las estrellas y sus vecinos → sin texto encimado)
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
        minDistance={0.5}
        maxDistance={90}
        autoRotate={autoRot && !selected && !compareActive && !catActive && !travel && !gilgulActive}
        autoRotateSpeed={0.3}
        onStart={() => { interacting.current = true; pauseAuto(); }}
        onEnd={() => { interacting.current = false; resumeAuto(); }}
        onChange={() => { if (interacting.current) lastCamMove.current = performance.now(); }}
      />
      {/* viaje fibra óptica (clic en arista) tiene prioridad sobre el vuelo al buscar */}
      {!travel && <FocusHelper flyToPos={flyToPos} controlsRef={controlsRef} onArrived={onFlewTo} />}
      {travel && (
        <TravelHelper travel={travel} controlsRef={controlsRef} nodeMap={nodeMap} onArrived={onTravelArrived} />
      )}
      <ambientLight intensity={0.35} />

      {/* el universo: estrellas de fondo + nebulosas con nombre por galaxia */}
      <StarField />
      <Nebulae isFa={isFa} />

      {/* (Se quitó el plano de "tap para deseleccionar": soltaba la selección
          por accidente al hacer zoom/arrastrar o al fallar un nodo por poco.
          Ahora la selección solo se cierra con el botón de la tarjeta o Escape.) */}

      <group ref={groupRef}>
        <AmbientTissue />
        <PotentialNodes />
        <BaseFibers segments={baseSegments} dimmed={focusId !== null || compareActive || catActive || gilgulActive} />
        {!gilgulActive && !compareActive && !catActive && focusId && dist && <LayeredFibers curves={curves} dist={dist} focusId={focusId} color={focusColor} />}
        {!gilgulActive && !compareActive && !catActive && pathToTorah.length > 1 && <PathToTorah path={pathToTorah} curves={curves} />}
        {!gilgulActive && compareActive && sharedCurves.length > 0 && <FiberHighlight curves={sharedCurves} color="#ffe9a8" />}
        {!gilgulActive && catActive && catCurves.length > 0 && <FiberHighlight curves={catCurves} color={BRAIN_CATS[activeCat ?? ""]?.c ?? "#c9a43e"} />}

        {/* "Viaje de luz": aristas interactivas del nodo en foco (hover/gradiente/tooltip/clic).
            En modo Gilgul se desactiva (las fibras de conocimiento ceden el paso al linaje). */}
        {!gilgulActive && !compareActive && !catActive && !travel && focusId && (
          <FocusEdges
            curves={curves}
            focusId={focusId}
            hotKey={hotEdge}
            nodeMap={nodeMap}
            isFa={isFa}
            onHover={setHotEdge}
            onPick={(c) => onPickEdge(c.a, c.b, c.pts)}
          />
        )}

        {/* ── CAPA GILGUL (linaje de almas) — solo cuando hay raíz invocada ── */}
        <GilgulLayer
          active={gilgulActive}
          rootId={gilgulRoot}
          positions={positions}
          nodeMap={nodeMap}
          lang={isFa ? "fa" : locale === "en" ? "en" : "es"}
          controlsRef={controlsRef}
        />

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
  const [suggestOpen, setSuggestOpen] = useState(false); // mostrar sugerencias solo al escribir
  const [compare, setCompare] = useState<string[]>([]); // modo comparación (Cmd/Ctrl-clic)
  const [flyToId, setFlyToId] = useState<string | null>(null); // SOLO al buscar: vuela al nodo
  const [activeCat, setActiveCat] = useState<string | null>(null); // dominio resaltado (leyenda)
  const [travel, setTravel] = useState<Travel | null>(null); // viaje fibra óptica en curso (clic en arista)
  const [gilgulRoot, setGilgulRoot] = useState<string | null>(null); // modo Gilgul: raíz de alma invocada
  // para distinguir un TAP deliberado en el vacío (soltar) de un arrastre/zoom de cámara
  const downRef = useRef<{ x: number; y: number; t: number } | null>(null);

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
  const hovNode = hovered ? graph.nodes.find((n) => n.id === hovered) ?? null : null;

  // ── Info del modo GILGUL para la tarjeta (raíz, cadena, nº de vasijas) ──
  const gilgulInfo = useMemo(() => {
    if (!gilgulRoot) return null;
    const chain = gilgulChainForRoot(gilgulRoot);
    const reach = traverseGilgul(gilgulRoot).reachable;
    const rootNode = graph.nodes.find((n) => n.id === gilgulRoot);
    return {
      root: gilgulRoot,
      label: rootNode ? (isFa ? rootNode.labelFa : rootNode.label) : gilgulRoot,
      source: chain?.source ?? "Sha'ar HaGilgulim",
      vessels: Math.max(0, reach.size - 1), // vasijas además de la raíz
      provisional: chain?.provisional ?? false,
    };
  }, [gilgulRoot, graph.nodes, isFa]);

  // huella de conexiones del nodo seleccionado: total + desglose por dominio
  const selConnections = useMemo(() => {
    if (!selected) return null;
    const nbrs = neighborsIn(graph.edges, selected);
    const nodeMap = new Map(graph.nodes.map((n) => [n.id, n]));
    const selCat = nodeMap.get(selected)?.cat;
    const byCat: Record<string, number> = {};
    let solid = 0, interp = 0;
    for (const id of nbrs) {
      const c = nodeMap.get(id)?.cat;
      if (c) byCat[c] = (byCat[c] ?? 0) + 1;
      // un jidush de la Comunidad cuenta SIEMPRE como interpretativa, nunca clásica
      const isComm = selCat === "comunidad" || c === "comunidad";
      if (!isComm && edgeKind(selected, id) === "solid") solid++; else interp++;
    }
    return { total: nbrs.size, byCat, solid, interp };
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
    search: isFa ? "جستجو… یا ترکیب با +" : "Busca un concepto… o mezcla con +",
    // Inscripción positiva (Sofer): la luz del estudio que crece — Proverbios 4:18
    mensaje: isFa ? "راهِ عادلان چون نورِ سپیده‌دم است، که پیوسته فزونی می‌یابد." : "La luz del justo es como la luz de aurora, que va de aumento a aumento.",
    mensajeHe: "וְאֹרַח צַדִּיקִים כְּאוֹר נֹגַהּ, הוֹלֵךְ וָאוֹר",
    mensajeRef: isFa ? "امثال ۴:۱۸" : "Proverbios 4:18",
  };

  // normaliza (minúsculas, sin acentos) para comparar
  const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  // término ACTUAL = lo escrito después del último "+" → sugerencias para mezclas
  const currentTerm = searchQ.split("+").pop() ?? "";
  type Sugg = { key: string; label: string; labelFa: string; cat: string; kind: "node" | "cat" | "gilgul" };
  // raíces de alma conocidas (ids) → para ofrecer "+ Gilgul" cuando aplica
  const gilgulRootIds = useMemo(() => new Set(getGilgulModel().byRoot.keys()), []);
  // Sugerencias del término actual: galaxias (disciplinas) + conceptos (nodos).
  const suggestions = useMemo<Sugg[]>(() => {
    const q = norm(currentTerm);
    if (q.length < 1) return [];
    const cats: Sugg[] = Object.entries(BRAIN_CATS)
      .filter(([k, v]) => k !== "torah" && k !== "jashmal" && (norm(k).includes(q) || norm(v.label).includes(q)))
      .slice(0, 3)
      .map(([k, v]) => ({ key: k, label: v.label, labelFa: v.labelFa, cat: k, kind: "cat" }));
    const matched = graph.nodes
      .filter((n) => norm(n.label).includes(q) || norm(n.id).includes(q) || (n.labelFa ?? "").includes(currentTerm.trim()))
      .sort((a, b) => norm(a.label).indexOf(q) - norm(b.label).indexOf(q));
    const nodes: Sugg[] = matched
      .slice(0, 7)
      .map((n) => ({ key: n.id, label: n.label, labelFa: n.labelFa, cat: n.cat, kind: "node" }));
    // si NO hay "+" todavía y el primer nodo es una raíz de alma → ofrece "+ Gilgul"
    const gilguls: Sugg[] = [];
    if (!searchQ.includes("+")) {
      const rootHit = matched.find((n) => gilgulRootIds.has(n.id));
      if (rootHit) gilguls.push({ key: rootHit.id, label: rootHit.label, labelFa: rootHit.labelFa, cat: rootHit.cat, kind: "gilgul" });
    }
    return [...gilguls, ...cats, ...nodes].slice(0, 8);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTerm, graph.nodes, searchQ]);

  // Buscar = seleccionar + VOLAR hacia el nodo (porque no se ve en pantalla).
  const pickNode = (id: string) => {
    setCompare([]);
    setActiveCat(null);
    setGilgulRoot(null);
    setSelected(id);
    setFlyToId(id);
    setSuggestOpen(false);
    const lbl = graph.nodes.find((n) => n.id === id)?.label;
    if (lbl) setSearchQ(lbl); // el texto se queda FIJO en el resultado
  };

  // resuelve un término a un nodo: por NOMBRE, o por GALAXIA (su nodo más conectado)
  const resolveTerm = (term: string): string | null => {
    const q = norm(term);
    if (!q) return null;
    const node = graph.nodes.find((n) => norm(n.label).includes(q) || norm(n.id).includes(q));
    if (node) return node.id;
    const catEntry = Object.entries(BRAIN_CATS).find(([k, v]) => norm(k) === q || norm(v.label).includes(q));
    if (catEntry) {
      const catKey = catEntry[0];
      const inCat = graph.nodes.filter((n) => n.cat === catKey || (catKey === "tanakh" && n.cat === "torah"));
      let best: string | null = null, bestDeg = -1;
      for (const n of inCat) { const deg = neighborsIn(graph.edges, n.id).size; if (deg > bestDeg) { bestDeg = deg; best = n.id; } }
      return best;
    }
    return null;
  };
  // ── Disparador del modo GILGUL ──
  // "<raíz> + gilgul" (o "gilgul + <raíz>") invoca el linaje de almas de esa raíz.
  // Reconoce "gilgul", "gilgulim" y el farsi "گیلگول". Devuelve el id de la raíz
  // si el término resuelto ES una raíz de alma conocida; si no, null (→ flujo normal).
  const isGilgulWord = (s: string) => {
    const n = norm(s);
    return n === "gilgul" || n === "gilgulim" || s.trim() === "گیلگول" || s.trim().startsWith("گیلگول");
  };
  const detectGilgulRoot = (rawQuery: string): string | null => {
    if (!rawQuery.includes("+")) return null;
    const parts = rawQuery.split("+").map((p) => p.trim()).filter(Boolean);
    if (parts.length < 2) return null;
    const gilgulIdx = parts.findIndex(isGilgulWord);
    if (gilgulIdx === -1) return null;
    // el OTRO término (no la palabra gilgul) es la raíz candidata
    const other = parts.find((_, i) => i !== gilgulIdx);
    if (!other) return null;
    const q = norm(other);
    // 1) intenta casar DIRECTO contra las raíces de alma conocidas (es/fa/id) →
    //    evita que "Raíz de Abel" gane sobre "Abel" por orden del array.
    for (const rootId of gilgulRootIds) {
      const rn = graph.nodes.find((n) => n.id === rootId);
      if (!rn) continue;
      if (norm(rn.id).includes(q) || norm(rn.label).includes(q) || (rn.labelFa ?? "").includes(other)) return rootId;
    }
    // 2) si no, resuelve normal y acepta solo si es una raíz de alma real
    const id = resolveTerm(other);
    if (id && gilgulChainForRoot(id)) return id;
    return null;
  };
  // entra al modo Gilgul: limpia los demás modos, fija el texto y enfoca la raíz
  const enterGilgul = (rootId: string) => {
    setSuggestOpen(false);
    setSelected(null); setCompare([]); setActiveCat(null); setTravel(null); setFlyToId(null);
    setGilgulRoot(rootId);
    const lbl = graph.nodes.find((n) => n.id === rootId)?.label ?? rootId;
    setSearchQ(`${lbl} + Gilgul`); // texto canónico fijo
  };

  // Enter en el buscador: primero GILGUL ("X + gilgul"); luego "A + B" = MEZCLA. Si no, vuela al 1º.
  const submitSearch = () => {
    setSuggestOpen(false);
    const q = searchQ.trim();
    if (!q) return;
    const gRoot = detectGilgulRoot(q);
    if (gRoot) { enterGilgul(gRoot); return; }
    if (q.includes("+")) {
      const ids = q.split("+").map((s) => resolveTerm(s)).filter((x): x is string => !!x);
      const uniq = [...new Set(ids)];
      if (uniq.length >= 2) {
        setSelected(null);
        setActiveCat(null);
        setCompare(uniq.slice(0, 4)); // modo mezcla: enciende sus conexiones comunes
        setFlyToId(uniq[0]); // acerca a uno para dar contexto
        // (el texto "A + B" queda FIJO en el buscador hasta que el usuario limpie con ×)
      }
      return;
    }
    const s0 = suggestions[0];
    if (s0) { const id = s0.kind === "cat" ? resolveTerm(s0.label) : s0.key; if (id) pickNode(id); }
  };
  // elegir una sugerencia: si es MEZCLA (hay "+"), completa el término; si no, va al concepto
  const chooseSuggestion = (s: Sugg) => {
    setSuggestOpen(false);
    if (s.kind === "gilgul") { enterGilgul(s.key); return; } // invoca el linaje de almas
    if (searchQ.includes("+")) {
      const parts = searchQ.split("+").map((p) => p.trim());
      parts[parts.length - 1] = s.label;
      setSearchQ(parts.join(" + ")); // completa el 2º término, listo para Enter o otro "+"
      return;
    }
    if (s.kind === "cat") {
      const id = resolveTerm(s.label);
      setCompare([]); setActiveCat(null);
      if (id) { setSelected(id); setFlyToId(id); }
      setSearchQ(s.label);
    } else {
      pickNode(s.key);
    }
  };
  // limpiar el buscador Y soltar el resultado (el texto se queda hasta que se limpie aquí)
  const clearSearch = () => {
    setSearchQ(""); setSuggestOpen(false);
    setSelected(null); setCompare([]); setFlyToId(null); setActiveCat(null); setGilgulRoot(null);
  };

  // clic normal = seleccionar uno; Cmd/Ctrl/Shift-clic = agregar a comparación.
  // Al hacer clic NO se vuela (la cámara se queda quieta y no se pierde el punto).
  const handleSelect = (id: string, additive: boolean) => {
    setActiveCat(null); // tocar un nodo apaga el resaltado de dominio
    setGilgulRoot(null); // y sale del modo Gilgul (vuelve a la exploración normal)
    if (additive) {
      setFlyToId(null);
      setSelected(null);
      setCompare((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    } else {
      const next = selected === id ? null : id;
      setCompare([]);
      setSelected(next);
      // al elegir un concepto, la cámara VIAJA hasta él → indagar y saltar por sus aristas
      setFlyToId(next);
    }
  };
  const clearAll = () => { setSelected(null); setCompare([]); setFlyToId(null); setActiveCat(null); setTravel(null); setGilgulRoot(null); };

  // ── "Viaje de luz": clic en una arista → la cámara VIAJA por la fibra ──
  // Mientras viaja, soltamos la selección (no hay tarjeta encima del recorrido)
  // y desactivamos flyTo (el viaje manda). La arista entrega su spline orientado.
  const startTravel = (from: string, to: string, pts: THREE.Vector3[]) => {
    if (travel) return; // no encadenar viajes a mitad de uno
    setActiveCat(null); setCompare([]); setFlyToId(null); setSelected(null);
    setTravel({ from, to, pts });
  };
  // al llegar al destino: termina el viaje y REUSA la selección normal (el
  // FocusHelper existente asienta el encuadre fino y lo vuelve el nuevo centro).
  const arriveTravel = (toId: string) => {
    setTravel(null);
    setSelected(toId);
    setFlyToId(toId); // pulso final + encuadre cómodo (flujo de selección existente)
  };

  // Escape = cerrar la selección. Junto al botón de la tarjeta, es la ÚNICA
  // forma de soltar el punto: ya nunca se pierde solo al explorar (zoom/arrastrar).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setSelected(null); setCompare([]); setFlyToId(null); setActiveCat(null); setTravel(null); setGilgulRoot(null); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  // clic en un dominio de la leyenda → enciende toda esa parte del cerebro (toggle)
  const toggleCat = (key: string) => {
    setSelected(null); setCompare([]); setFlyToId(null); setGilgulRoot(null);
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
      onPointerDown={(e) => { downRef.current = { x: e.clientX, y: e.clientY, t: performance.now() }; }}
    >
      <Suspense
        fallback={
          <div className="flex h-full items-center justify-center">
            <p className="animate-pulse font-cinzel text-gold/50">{isFa ? "در حال بیدار شدن…" : "Despertando la mente…"}</p>
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 6, CFG.radiusIdle], fov: 55 }}
          gl={{ antialias: true }}
          style={{ position: "absolute", inset: 0 }}
          onPointerMissed={(e) => {
            // soltar SOLO si fue un tap limpio en el vacío (no un arrastre/zoom)
            const d = downRef.current;
            if (!d) return;
            const moved = Math.hypot((e as MouseEvent).clientX - d.x, (e as MouseEvent).clientY - d.y);
            if (moved < 6 && performance.now() - d.t < 450) clearAll();
          }}
        >
          <color attach="background" args={["#03040a"]} />
          <fogExp2 attach="fog" args={["#03040a", 0.005]} />
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
            travel={travel}
            gilgulRoot={gilgulRoot}
            onFlewTo={() => setFlyToId(null)}
            onSelect={handleSelect}
            onHover={(id) => { if (!travel) setHovered(id); }}
            onDouble={handleDouble}
            onPickEdge={startTravel}
            onTravelArrived={arriveTravel}
          />
          <EffectComposer>
            <Bloom intensity={0.72} luminanceThreshold={0.2} luminanceSmoothing={0.7} mipmapBlur radius={0.5} />
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

      {/* Lupa de hover: qué nodo es y a qué disciplina pertenece — se lee aunque
          la estrella esté lejísimos en el cosmos. */}
      {hovNode && (
        <div className="pointer-events-none absolute start-4 top-16 z-20 max-w-[210px] rounded-lg border border-gold/30 bg-ink/90 px-3 py-2 shadow-lg backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
              style={{
                background: BRAIN_CATS[hovNode.cat]?.c ?? "#c9a43e",
                boxShadow: `0 0 8px ${BRAIN_CATS[hovNode.cat]?.c ?? "#c9a43e"}`,
              }}
            />
            <span className="truncate font-cinzel text-sm text-parchment">
              {isFa ? hovNode.labelFa : hovNode.label}
            </span>
          </div>
          <p className="mt-0.5 ps-[18px] text-[10px] uppercase tracking-wide text-muted/60">
            {(() => {
              const c = hovNode.cat === "torah" ? "tanakh" : hovNode.cat;
              return (isFa ? BRAIN_CATS[c]?.labelFa : BRAIN_CATS[c]?.label) ?? c;
            })()}
          </p>
        </div>
      )}

      {/* Buscador global (motor de búsqueda visual) */}
      <div className="pointer-events-none absolute inset-x-0 top-16 z-20 flex justify-center px-4">
        <div className="pointer-events-auto w-[min(360px,86vw)]">
          <div className="relative">
            <input
              value={searchQ}
              onChange={(e) => { setSearchQ(e.target.value); setSuggestOpen(true); }}
              onFocus={() => setSuggestOpen(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter") submitSearch();
                if (e.key === "Escape") clearSearch();
              }}
              placeholder={T.search}
              dir={isFa ? "rtl" : "ltr"}
              style={{ fontFamily: "var(--font-cormorant, serif)" }}
              className="w-full rounded-full border border-gold/25 bg-ink/85 px-4 py-2 pe-9 text-base text-[#e8e4d8] outline-none backdrop-blur-md placeholder:text-muted/40 focus:border-gold/60"
            />
            {searchQ ? (
              <button
                onClick={clearSearch}
                aria-label={isFa ? "پاک کردن" : "limpiar"}
                className="absolute end-2.5 top-1/2 -translate-y-1/2 rounded-full px-1.5 text-lg leading-none text-muted/60 transition-colors hover:text-gold"
              >
                ×
              </button>
            ) : (
              <span className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-gold/50">⌕</span>
            )}
          </div>
          {suggestOpen && suggestions.length > 0 && (
            <ul className="mt-1.5 overflow-hidden rounded-2xl border border-gold/15 bg-ink/90 backdrop-blur-md">
              {suggestions.map((s) => {
                const c = BRAIN_CATS[s.cat]?.c ?? "#c9a43e";
                const disc = s.cat === "torah" ? "tanakh" : s.cat;
                if (s.kind === "gilgul") {
                  // fila especial: invoca el LINAJE DE ALMAS de esta raíz
                  return (
                    <li key={"gilgul:" + s.key}>
                      <button
                        onClick={() => chooseSuggestion(s)}
                        className="flex w-full items-center gap-2 border-b border-gold/10 bg-gold/[0.05] px-4 py-2 text-start transition-colors hover:bg-gold/15"
                      >
                        <span className="text-sm leading-none" style={{ filter: "drop-shadow(0 0 6px #ffd66b)" }}>✦</span>
                        <span className="truncate text-sm text-gold">
                          {isFa ? `${s.labelFa} + گیلگول` : `${s.label} + Gilgul`}
                        </span>
                        <span className="ms-auto shrink-0 text-[10px] uppercase tracking-wide text-gold/55">
                          {isFa ? "تبارِ روح" : locale === "en" ? "soul lineage" : "linaje de alma"}
                        </span>
                      </button>
                    </li>
                  );
                }
                return (
                  <li key={s.kind + ":" + s.key}>
                    <button
                      onClick={() => chooseSuggestion(s)}
                      className="flex w-full items-center gap-2 px-4 py-2 text-start transition-colors hover:bg-gold/10"
                    >
                      <span className="inline-block h-2 w-2 shrink-0 rounded-full" style={{ background: c, boxShadow: `0 0 6px ${c}` }} />
                      <span className="truncate text-sm text-[#e8e4d8]">{isFa ? s.labelFa : s.label}</span>
                      <span className="ms-auto shrink-0 text-[10px] uppercase tracking-wide text-muted/40">
                        {s.kind === "cat" ? (isFa ? "کهکشان" : "galaxia") : (BRAIN_CATS[disc]?.label ?? "")}
                      </span>
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
          {Object.entries(BRAIN_CATS).filter(([k]) => k !== "jashmal" && k !== "torah").map(([key, v]) => {
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

      {/* Inscripción (la luz que crece) + controles */}
      <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 flex w-[min(440px,74vw)] -translate-x-1/2 flex-col items-center gap-0.5 text-center">
        <p className="font-cinzel text-xs italic tracking-wide text-gold/65 sm:text-sm">{T.mensaje}</p>
        <p className="hebrew text-[11px] leading-tight text-gold/35">
          {T.mensajeHe} <span className="text-muted/35">· {T.mensajeRef}</span>
        </p>
        <p className="mt-1.5 hidden font-cinzel text-[9px] uppercase tracking-[0.25em] text-gold/25 sm:block">{T.hint}</p>
      </div>

      {/* Tarjeta del nodo seleccionado */}
      {selNode && (
        <div className="absolute bottom-24 end-4 z-10 w-[min(260px,80vw)] rounded-xl border border-gold/25 bg-ink/90 p-4 backdrop-blur-md">
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
          {selNode.author && (
            <p className="mt-1 text-[11px] italic text-rose-200/80">✦ {isFa ? "از" : "por"} {selNode.author}</p>
          )}

          {selConnections && selConnections.total > 0 && (
            <div className="mt-2.5 border-t border-gold/10 pt-2.5">
              <p className="mb-1 text-[11px] text-parchment/80">
                <span className="font-cinzel text-sm text-gold">{selConnections.total}</span>{" "}
                {isFa ? "اتصال" : selConnections.total === 1 ? "conexión" : "conexiones"}
              </p>
              {(selConnections.solid > 0 || selConnections.interp > 0) && (
                <p
                  className="mb-1.5 text-[10px] text-muted/70"
                  title={isFa ? "کلاسیک = منبع مستقیم · تفسیری = خوانش" : "Clásicas = fuente directa · Interpretativas = lectura cabalística"}
                >
                  <span className="text-gold/90">{selConnections.solid}</span> {isFa ? "کلاسیک" : "clásicas"}
                  <span className="text-muted/40"> · </span>
                  <span className="text-parchment/55">{selConnections.interp}</span> {isFa ? "تفسیری" : "interpretativas"}
                </p>
              )}
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
        <div className="absolute bottom-24 end-4 z-10 w-[min(280px,84vw)] rounded-xl border border-cyan-300/30 bg-ink/90 p-4 backdrop-blur-md">
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

      {/* ── Tarjeta del modo GILGUL (linaje de almas) ── */}
      {gilgulInfo && (
        <div
          className="absolute bottom-24 end-4 z-10 w-[min(290px,86vw)] rounded-xl border bg-ink/92 p-4 backdrop-blur-md"
          style={{ borderColor: "rgba(255,214,107,0.4)", boxShadow: "0 0 26px rgba(255,214,107,0.12)" }}
          dir={isFa ? "rtl" : "ltr"}
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-cinzel text-[10px] uppercase tracking-[0.2em]" style={{ color: "#ffd66b" }}>
                {isFa ? "✦ تبارِ روح" : locale === "en" ? "✦ Soul lineage" : "✦ Linaje del alma"}
              </p>
              <p className="mt-0.5 font-cinzel text-base" style={{ color: "#ffe9a8" }}>{gilgulInfo.label}</p>
            </div>
            <button
              onClick={clearAll}
              aria-label={isFa ? "بستن" : "cerrar"}
              className="-me-1 -mt-1 shrink-0 rounded-full px-2 py-0.5 text-lg leading-none text-muted/50 transition-colors hover:text-gold"
            >
              ×
            </button>
          </div>

          <p className="mt-2 text-[12px] italic leading-snug text-parchment/80">
            {isFa
              ? "جرقهٔ روح را تماشا کن که از ریشه برمی‌خیزد و نسل به نسل سفر می‌کند."
              : locale === "en"
                ? "Watch the soul-spark rise from the root and travel from vessel to vessel through the generations."
                : "Mira la chispa del alma emerger de la raíz y viajar de vasija en vasija a través de las generaciones."}
          </p>

          <div className="mt-3 border-t border-gold/10 pt-2.5 text-[11px] text-muted/85">
            <p>
              <span className="font-cinzel" style={{ color: "#ffd66b" }}>{gilgulInfo.vessels}</span>{" "}
              {isFa ? "ظرفِ روح" : locale === "en" ? (gilgulInfo.vessels === 1 ? "vessel" : "vessels") : (gilgulInfo.vessels === 1 ? "vasija" : "vasijas")}
            </p>
            <p className="mt-0.5">
              <span className="opacity-60">{isFa ? "منبع: " : locale === "en" ? "Source: " : "Fuente: "}</span>
              {gilgulInfo.source}
            </p>
          </div>

          {/* leyenda de certeza por color (la spec) */}
          <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1 border-t border-gold/10 pt-2.5">
            {([
              ["#ffd66b", isFa ? "تصریح‌شده" : locale === "en" ? "direct" : "directo"],
              ["#f0b85a", isFa ? "سنتی" : locale === "en" ? "tradition" : "tradición"],
              ["#9fd0ff", isFa ? "گِماتریا" : "gematría"],
            ] as const).map(([col, lbl]) => (
              <span key={lbl} className="flex items-center gap-1.5 text-[10px] text-muted/80">
                <span className="inline-block h-2 w-4 rounded-full" style={{ background: col, boxShadow: `0 0 7px ${col}` }} />
                {lbl}
              </span>
            ))}
          </div>

          {gilgulInfo.provisional && (
            <p className="mt-2.5 rounded-md border border-amber-300/20 bg-amber-300/[0.06] px-2 py-1.5 text-[10px] italic leading-snug text-amber-200/80">
              {isFa
                ? "زنجیرهٔ نمونه (موقت) — به‌زودی با مجموعهٔ تأییدشدهٔ سوفر جایگزین می‌شود."
                : locale === "en"
                  ? "Sample chain (provisional) — to be replaced by the Sofer's verified dataset."
                  : "Cadena de muestra (provisional) — se reemplazará por el dataset verificado del Sofer."}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
