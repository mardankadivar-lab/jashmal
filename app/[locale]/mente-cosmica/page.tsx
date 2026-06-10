"use client";

// ─────────────────────────────────────────────────────────────────────────
// /mente-cosmica — "El Universo del Conocimiento de Jashmal"
// El grafo MISMO es el cerebro: nodos = sinapsis luminosas, aristas = fibras
// neuronales curvas. Torá = corazón central. Forma cerebral 3D (lóbulos) desde
// cualquier ángulo. Bloom + additive blending. Cámara cinematográfica con
// parallax e inercia. Respira. Al tocar una idea se encienden SOLO sus fibras
// y vecinos (sin cambiar el color de categoría); el resto baja de opacidad.
// ─────────────────────────────────────────────────────────────────────────

import { useMemo, useRef, useState, useEffect, useCallback, Suspense } from "react";
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
  nodeLabel,
  catLabel,
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
import { gilgulChainForRoot, traverseGilgul, getGilgulModel, GILGUL_ERAS } from "@/lib/gilgul";
import { getEdgeData, type OrientedEdgeData } from "@/lib/edgeData";
import type { GilgulMode } from "./GilgulLayer";
import Consola from "./Consola";
import EdgeTooltip, { type EdgeHint } from "./EdgeTooltip";
import GilgulTooltip, { type GilgulHint } from "./GilgulTooltip";
import { useUniversoHistory } from "./useUniversoHistory";
import { useIsMobile } from "./useIsMobile";

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
function Nebulae({ locale }: { locale: string }) {
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
                {catLabel(cat, locale)}
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
  sizeBoost = 1,
  locale,
  onClick,
  onDouble,
  onHover,
}: {
  node: BNode;
  pos: [number, number, number];
  intensity: number; // 0..1.4 — cuánto está "despierta"
  showLabel: boolean;
  sizeBoost?: number; // >1 → la sinapsis se agranda (vecino directo del foco)
  locale: string;
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
    const halo = CFG.haloBase * lvlScale * (0.8 + k * 0.9) * pulse * BRAIN_SCALE * 0.34 * sizeBoost;
    const core = CFG.coreBase * lvlScale * (0.9 + k * 0.7) * pulse * BRAIN_SCALE * 0.34 * sizeBoost;
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
            {nodeLabel(node, locale)}
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
  onHover,
  onPick,
}: {
  curve: EdgeCurve;
  colA: THREE.Color;
  colB: THREE.Color;
  isHot: boolean;
  onHover: (h: boolean) => void;
  onPick: () => void;
}) {
  // tubo visible delgado, con gradiente por vértice
  const tubeGeo = useMemo(
    () => gradientTube(curve.pts, 0.012 * BRAIN_SCALE, colA, colB),
    [curve.pts, colA, colB],
  );
  // tubo de impacto: invisible, MUY grueso → área de hover/clic generosa, así se
  // viaja por la fibra sin tener que cazar el nodo diminuto del destino.
  const hitGeo = useMemo(
    () => gradientTube(curve.pts, 0.13 * BRAIN_SCALE, colA, colB),
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
    </group>
  );
}

// Capa de aristas interactivas: SÓLO las del nodo en foco (raycasting barato).
function FocusEdges({
  curves,
  focusId,
  hotKey,
  nodeMap,
  locale,
  filterCat,
  onHover,
  onPick,
}: {
  curves: EdgeCurve[];
  focusId: string;
  hotKey: string | null;
  nodeMap: Map<string, BNode>;
  locale: string;
  filterCat: string | null; // chip-filtro activo → solo aristas hacia esa disciplina
  onHover: (info: { key: string; toLabel: string; kind: "solid" | "interp" } | null) => void;
  onPick: (c: EdgeCurve) => void;
}) {
  // aristas que tocan el nodo en foco, orientadas para que `a` sea SIEMPRE el foco.
  // Si hay chip-filtro activo, solo se vuelven interactivas las que llevan a esa disciplina.
  const focusCurves = useMemo(() => {
    const out: { c: EdgeCurve; oriented: EdgeCurve }[] = [];
    for (const c of curves) {
      if (c.a !== focusId && c.b !== focusId) continue;
      const otherId = c.a === focusId ? c.b : c.a;
      if (filterCat && nodeMap.get(otherId)?.cat !== filterCat) continue;
      if (c.a === focusId) out.push({ c, oriented: c });
      else out.push({ c, oriented: { a: c.b, b: c.a, pts: [...c.pts].reverse(), kind: c.kind } });
    }
    return out;
  }, [curves, focusId, filterCat, nodeMap]);

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
            onHover={(h) =>
              onHover(h ? { key, toLabel: toN ? nodeLabel(toN, locale) : oriented.b, kind: oriented.kind } : null)
            }
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

    prog.current = Math.min(1, prog.current + dt * 0.27); // ~3.7s de viaje galáctico (lento, cinematográfico)
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
  filterCat,
  travel,
  travelRequest,
  gilgulRoot,
  gilgulMode,
  onEra,
  onFlewTo,
  onSelect,
  onHover,
  onEdgeHint,
  onGilgulHint,
  onDouble,
  onPickEdge,
  onTravelSpline,
  onTravelArrived,
  onTravelConsumed,
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
  filterCat: string | null;
  travel: Travel | null;
  travelRequest: { from: string; to: string } | null;
  gilgulRoot: string | null;
  gilgulMode: GilgulMode;
  onEra: (era: string) => void;
  onFlewTo: () => void;
  onSelect: (id: string, additive: boolean) => void;
  onHover: (id: string | null) => void;
  onEdgeHint: (hint: { toLabel: string; kind: "solid" | "interp" } | null) => void;
  onGilgulHint: (hint: GilgulHint | null) => void;
  onDouble: (n: BNode) => void;
  onPickEdge: (from: string, to: string, pts: THREE.Vector3[]) => void;
  onTravelSpline: (from: string, to: string, pts: THREE.Vector3[]) => void;
  onTravelArrived: (toId: string) => void;
  onTravelConsumed: () => void;
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

  // ── Chip-filtro (Consola): con un nodo seleccionado, aísla SUS aristas hacia
  //    una disciplina; resalta esos destinos y atenúa el resto del universo. ──
  const filterActive = !!(selected && filterCat);

  // controles de mouse (girar / mover / zoom) con pausa de auto-giro al interactuar
  const controlsRef = useRef<any>(null);
  // arista bajo el mouse (sólo entre las del nodo en foco) → glow + tooltip al cursor
  const [hotEdge, setHotEdge] = useState<string | null>(null);
  // al cambiar el nodo en foco (o entrar en viaje), olvida la arista resaltada y su rótulo
  useEffect(() => { setHotEdge(null); onEdgeHint(null); }, [focusId, travel, onEdgeHint]);

  // ── Petición de viaje desde la Consola (chip de destino o panel de conexión):
  //    la página pide "viaja de A → B"; aquí encontramos el spline real, lo
  //    orientamos y disparamos el "Viaje de luz". (El clic FÍSICO en una arista
  //    ya no viaja directo: abre el panel de la conexión vía onPickEdge.) ──
  useEffect(() => {
    if (!travelRequest) return;
    const { from, to } = travelRequest;
    const c = curves.find((c) => (c.a === from && c.b === to) || (c.a === to && c.b === from));
    if (c) {
      const pts = c.a === from ? c.pts : [...c.pts].reverse();
      onTravelSpline(from, to, pts);
    }
    onTravelConsumed();
  }, [travelRequest, curves, onTravelSpline, onTravelConsumed]);
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
    if (filterActive && dist) {
      if (n.id === selected) return 1.4;                                  // el nodo en foco
      if (dist.get(n.id) === 1 && n.cat === filterCat) return 1.1;        // destinos de la disciplina filtrada
      return awakeBase * 0.1;                                             // el resto se atenúa
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
    if (filterActive) return n.id === selected || (dist?.get(n.id) === 1 && n.cat === filterCat); // foco + destinos filtrados
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
  // tamaño extra de la sinapsis: cuando hay un nodo SELECCIONADO, sus vecinos
  // DIRECTOS (distancia 1) se agrandan para que se VEAN aunque estén lejos o en
  // una zona densa → así el usuario sabe a dónde llevan las aristas encendidas.
  const boostOf = (n: BNode): number => {
    if (gilgulActive || compareActive || catActive) return 1; // esos modos tienen su propio realce
    if (filterActive) return n.id === selected ? 1.18 : (dist?.get(n.id) === 1 && n.cat === filterCat ? 1.5 : 1);
    if (!selected || !dist) return 1; // solo al SELECCIONAR (no en simple hover)
    if (n.id === selected) return 1.18; // el foco, un punto más grande
    return dist.get(n.id) === 1 ? 1.5 : 1; // vecino directo: claramente más grande
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
        zoomSpeed={1.05}
        minDistance={0.02}
        maxDistance={120}
        // ── Movimiento 360° esférico: SIN topes de ángulo (polar 0..π, azimut libre) ──
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
        minAzimuthAngle={-Infinity}
        maxAzimuthAngle={Infinity}
        // ── Táctil (móvil): un dedo orbita · dos dedos pellizco-zoom + paneo ──
        touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }}
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
      <Nebulae locale={locale} />

      {/* La selección NUNCA se suelta al tocar el fondo, arrastrar, hacer zoom ni
          al fallar un clic cerca de un nodo. Solo se cierra con acciones explícitas:
          el botón × de la tarjeta, la tecla Escape, o al elegir OTRO nodo. */}

      <group ref={groupRef}>
        <AmbientTissue />
        <PotentialNodes />
        <BaseFibers segments={baseSegments} dimmed={focusId !== null || compareActive || catActive || gilgulActive} />
        {/* en modo filtro, la malla jerárquica y el camino a la Torá se apagan para
            que solo brillen las aristas hacia la disciplina elegida (foco limpio) */}
        {!gilgulActive && !compareActive && !catActive && !filterActive && focusId && dist && <LayeredFibers curves={curves} dist={dist} focusId={focusId} color={focusColor} />}
        {!gilgulActive && !compareActive && !catActive && !filterActive && pathToTorah.length > 1 && <PathToTorah path={pathToTorah} curves={curves} />}
        {!gilgulActive && compareActive && sharedCurves.length > 0 && <FiberHighlight curves={sharedCurves} color="#ffe9a8" />}
        {!gilgulActive && catActive && catCurves.length > 0 && <FiberHighlight curves={catCurves} color={BRAIN_CATS[activeCat ?? ""]?.c ?? "#c9a43e"} />}

        {/* "Viaje de luz": aristas interactivas del nodo en foco (hover/gradiente/clic →
            tooltip al cursor). Con chip-filtro activo solo se activan las de esa disciplina.
            En modo Gilgul se desactiva (las fibras de conocimiento ceden el paso al linaje). */}
        {!gilgulActive && !compareActive && !catActive && !travel && focusId && (
          <FocusEdges
            curves={curves}
            focusId={focusId}
            hotKey={hotEdge}
            nodeMap={nodeMap}
            locale={locale}
            filterCat={selected ? filterCat : null}
            onHover={(info) => { setHotEdge(info?.key ?? null); onEdgeHint(info ? { toLabel: info.toLabel, kind: info.kind } : null); }}
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
          mode={gilgulMode}
          onEra={onEra}
          onHint={onGilgulHint}
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
              sizeBoost={boostOf(n)}
              locale={locale}
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
  const [gilgulMode, setGilgulMode] = useState<GilgulMode>("journey"); // Fase 2: "journey" (viaje) | "tree" (árbol completo)
  const [currentEra, setCurrentEra] = useState<string | null>(null); // Fase 2: era que la chispa acaba de alcanzar (línea de tiempo)
  const [filterCat, setFilterCat] = useState<string | null>(null); // chip-filtro de la Consola (disciplina del nodo en foco)
  const [travelRequest, setTravelRequest] = useState<{ from: string; to: string } | null>(null); // viaje pedido desde la Consola
  const [edgeHint, setEdgeHint] = useState<EdgeHint | null>(null); // rótulo "ver conexión" que sigue al cursor
  // ── Contexto relacional (V3): el CAMINO activo de la navegación ──
  // Invariante: si hay nodo seleccionado y camino, el ÚLTIMO paso es el nodo
  // seleccionado. Con ≥2 pasos hay contexto: el panel ofrece estudiar LA RELACIÓN
  // (penúltimo → último). Búsqueda/click "directo" lo reinician a [nodo].
  const [activePath, setActivePath] = useState<string[]>([]);
  // panel de CONEXIÓN (clic en una arista o "ver conexión" del panel del nodo).
  // pts = spline orientado (si vino del clic 3D) para poder "Viajar" sin recalcular.
  const [edgeView, setEdgeView] = useState<{ from: string; to: string; pts: THREE.Vector3[] | null } | null>(null);
  const [gilgulHint, setGilgulHint] = useState<GilgulHint | null>(null); // sendero de gilgul bajo el cursor → tooltip DOM que lo sigue

  // Consola unificada + hoja inferior en móvil + historial de navegación (migaja ← →)
  const isMobile = useIsMobile();
  const history = useUniversoHistory();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const consumeTravelRequest = useCallback(() => setTravelRequest(null), []);
  // al cambiar de nodo seleccionado, el chip-filtro se reinicia (cada nodo, filtro fresco)
  useEffect(() => { setFilterCat(null); }, [selected]);

  // ── Mantenimiento del camino contextual (V3) ──
  // extendPath: el usuario VIAJÓ por una conexión from→to (clic en vecino, viaje
  // de luz, chip de la Consola) → el camino se extiende y el contexto vive.
  const extendPath = useCallback((fromId: string, toId: string) => {
    setActivePath((p) => (p.length > 0 && p[p.length - 1] === fromId ? [...p, toId] : [fromId, toId]));
  }, []);
  // resetPathTo: apertura DIRECTA (búsqueda, clic sin origen, salir) → el
  // contexto se reinicia; el siguiente estudio vuelve a ser general.
  const resetPathTo = useCallback((id: string | null) => {
    setActivePath(id ? [id] : []);
  }, []);
  // ¿existe la arista a–b en el grafo vivo? (decide si un clic "viaja" o "salta")
  const isNeighborEdge = useCallback(
    (a: string, b: string) => graph.edges.some(([x, y]) => (x === a && y === b) || (x === b && y === a)),
    [graph.edges],
  );

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

  // ── Fase 2 (línea de tiempo): orden de las eras y avance de la chispa ──
  // GILGUL_ERAS da el orden histórico. La chispa reporta su `era` al llegar a
  // cada vasija; la barra avanza SOLO hacia adelante (coherente con el flujo
  // lineal del proyecto: el linaje progresa por las generaciones, no retrocede).
  const eraOrder = useMemo(() => {
    const m = new Map<string, number>();
    for (const e of GILGUL_ERAS) m.set(e.id, e.order);
    return m;
  }, []);
  const onEra = useCallback((era: string) => {
    setCurrentEra((prev) => {
      if (!prev) return era;
      const a = eraOrder.get(prev) ?? -1;
      const b = eraOrder.get(era) ?? -1;
      return b > a ? era : prev; // solo avanza
    });
  }, [eraOrder]);
  // al cambiar de raíz o de modo, reinicia la línea de tiempo
  useEffect(() => { setCurrentEra(null); }, [gilgulRoot, gilgulMode]);
  // al salir del modo Gilgul, vuelve a "journey" para la próxima invocación
  useEffect(() => { if (!gilgulRoot) setGilgulMode("journey"); }, [gilgulRoot]);

  // eras que TOCA esta raíz (para dibujar solo los tramos relevantes de la barra)
  const gilgulEras = useMemo(() => {
    if (!gilgulRoot) return [] as typeof GILGUL_ERAS;
    const reachLinks = traverseGilgul(gilgulRoot).order;
    const present = new Set<string>();
    for (const l of reachLinks) if (l.era) present.add(l.era);
    return GILGUL_ERAS.filter((e) => present.has(e.id));
  }, [gilgulRoot]);

  // ── Info del modo GILGUL para la tarjeta (raíz, cadena, nº de vasijas) ──
  const gilgulInfo = useMemo(() => {
    if (!gilgulRoot) return null;
    const chain = gilgulChainForRoot(gilgulRoot);
    const reach = traverseGilgul(gilgulRoot).reachable;
    const rootNode = graph.nodes.find((n) => n.id === gilgulRoot);
    return {
      root: gilgulRoot,
      label: rootNode ? nodeLabel(rootNode, locale) : gilgulRoot,
      source: chain?.source ?? "Sha'ar HaGilgulim",
      vessels: Math.max(0, reach.size - 1), // vasijas además de la raíz
      provisional: chain?.provisional ?? false,
    };
  }, [gilgulRoot, graph.nodes, locale]);

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

  // tri(es, fa, en): elige por idioma. EN nunca debe caer a la rama española.
  const tri = (es: string, fa: string, en: string) => (isFa ? fa : locale === "en" ? en : es);
  const T = {
    title: "חַשְׁמַל",
    subtitle: tri("La Mente Cósmica de Jashmal", "ذهنِ کیهانیِ خَشمَل", "The Cosmic Mind of Jashmal"),
    back: tri("Volver al inicio", "بازگشت به خانه", "Back to home"),
    hint: tri(
      "Arrastra para girar la mente · haz zoom para entrar en una galaxia · clic en un nodo para revelar conexiones · doble clic para estudiar",
      "بکشید برای چرخشِ ذهن · زوم کنید تا به یک کهکشان وارد شوید · روی یک گره کلیک کنید تا پیوندها آشکار شوند · دوبار کلیک برای مطالعه",
      "Drag to rotate the mind · zoom to enter a galaxy · click a node to reveal its connections · double-click to study",
    ),
    legend: tri("Dominios del saber", "دامنه‌های دانش", "Domains of knowledge"),
    study: tri("Estudiar →", "مطالعه ←", "Study →"),
    expand: tri("✦ Expandir", "✦ گسترش", "✦ Expand"),
    expanding: tri("Investigando…", "در حال پژوهش…", "Researching…"),
    search: tri("Busca un concepto… o mezcla con +", "جستجو… یا ترکیب با +", "Search a concept… or mix with +"),
    // Inscripción positiva (Sofer): el Creador se envuelve en luz — Salmo 104:2
    // (fa verificado por el Sofer: persa puro, sin letras hebreas)
    mensaje: isFa
      ? "خویشتن را به نور مثل ردا پوشانیده‌ای، و آسمان را مثل پرده پهن ساخته‌ای."
      : locale === "en"
        ? "He wraps Himself in light as with a garment; He stretches out the heavens like a curtain."
        : "El que se cubre de luz como de vestidura, que extiende los cielos como una cortina.",
    mensajeHe: "עֹטֶה אוֹר כַּשַּׂלְמָה נוֹטֶה שָׁמַיִם כַּיְרִיעָה",
    mensajeRef: isFa ? "مزمور ۱۰۴:۲" : locale === "en" ? "Psalm 104:2" : "Salmo 104:2",
  };

  // normaliza (minúsculas, sin acentos) para comparar
  const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  // término ACTUAL = lo escrito después del último "+" → sugerencias para mezclas
  const currentTerm = searchQ.split("+").pop() ?? "";
  type Sugg = { key: string; label: string; labelFa?: string; labelEn?: string; cat: string; kind: "node" | "cat" | "gilgul" };
  // raíces de alma conocidas (ids) → para ofrecer "+ Gilgul" cuando aplica
  const gilgulRootIds = useMemo(() => new Set(getGilgulModel().byRoot.keys()), []);
  // Sugerencias del término actual: galaxias (disciplinas) + conceptos (nodos).
  const suggestions = useMemo<Sugg[]>(() => {
    const q = norm(currentTerm);
    if (q.length < 1) return [];
    const cats: Sugg[] = Object.entries(BRAIN_CATS)
      .filter(([k, v]) => k !== "torah" && k !== "jashmal" && (norm(k).includes(q) || norm(v.label).includes(q)))
      .slice(0, 3)
      .map(([k, v]) => ({ key: k, label: v.label, labelFa: v.labelFa, labelEn: v.labelEn, cat: k, kind: "cat" }));
    const matched = graph.nodes
      .filter((n) => norm(n.label).includes(q) || norm(n.id).includes(q) || (n.labelFa ?? "").includes(currentTerm.trim()))
      .sort((a, b) => norm(a.label).indexOf(q) - norm(b.label).indexOf(q));
    const nodes: Sugg[] = matched
      .slice(0, 7)
      .map((n) => ({ key: n.id, label: n.label, labelFa: n.labelFa, labelEn: n.labelEn, cat: n.cat, kind: "node" }));
    // si NO hay "+" todavía y el primer nodo es una raíz de alma → ofrece "+ Gilgul"
    const gilguls: Sugg[] = [];
    if (!searchQ.includes("+")) {
      const rootHit = matched.find((n) => gilgulRootIds.has(n.id));
      if (rootHit) gilguls.push({ key: rootHit.id, label: rootHit.label, labelFa: rootHit.labelFa, labelEn: rootHit.labelEn, cat: rootHit.cat, kind: "gilgul" });
    }
    return [...gilguls, ...cats, ...nodes].slice(0, 8);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTerm, graph.nodes, searchQ]);

  // Buscar = seleccionar + VOLAR hacia el nodo (porque no se ve en pantalla).
  // Es una apertura DIRECTA → el contexto relacional se reinicia (espec V3).
  const pickNode = (id: string) => {
    setCompare([]);
    setActiveCat(null);
    setGilgulRoot(null);
    setSelected(id);
    setFlyToId(id);
    setSuggestOpen(false);
    setEdgeView(null);
    resetPathTo(id); // nodo directo: sin nodo origen → estudio general
    history.visit(id); // registra en el historial de navegación (migaja ← →)
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
    setEdgeView(null); resetPathTo(null); // el linaje es otro modo: contexto fuera
    history.clear(); // el linaje de almas es otro modo: el historial de nodos se reinicia
    setGilgulMode("journey");  // cada invocación arranca en el VIAJE (no hereda "árbol")
    setCurrentEra(null);       // y con la línea de tiempo en cero
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
        setEdgeView(null); resetPathTo(null); // la mezcla es otro modo: contexto fuera
        history.clear(); // la mezcla/comparación es otro modo → reinicia el historial
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
      setCompare([]); setActiveCat(null); setGilgulRoot(null); setEdgeView(null);
      if (id) { setSelected(id); setFlyToId(id); resetPathTo(id); history.visit(id); }
      setSearchQ(s.label);
    } else {
      pickNode(s.key);
    }
  };
  // limpiar el buscador Y soltar el resultado (el texto se queda hasta que se limpie aquí)
  const clearSearch = () => {
    setSearchQ(""); setSuggestOpen(false);
    setSelected(null); setCompare([]); setFlyToId(null); setActiveCat(null); setGilgulRoot(null);
    setEdgeView(null); resetPathTo(null);
    history.clear();
  };

  // clic normal = seleccionar uno; Cmd/Ctrl/Shift-clic = agregar a comparación.
  // Al hacer clic NO se vuela (la cámara se queda quieta y no se pierde el punto).
  const handleSelect = (id: string, additive: boolean) => {
    setActiveCat(null); // tocar un nodo apaga el resaltado de dominio
    setGilgulRoot(null); // y sale del modo Gilgul (vuelve a la exploración normal)
    setEdgeView(null); // y cierra el panel de conexión si estaba abierto
    if (additive) {
      setFlyToId(null);
      setSelected(null);
      resetPathTo(null); // la comparación es otro modo: contexto fuera
      history.clear(); // entrar a comparación reinicia el historial de nodos
      setCompare((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    } else {
      const next = selected === id ? null : id;
      setCompare([]);
      setSelected(next);
      // al elegir un concepto, la cámara VIAJA hasta él → indagar y saltar por sus aristas
      setFlyToId(next);
      // ── Contexto (V3): clic en un VECINO del nodo en foco = viajar por esa
      //    conexión (el camino se extiende). Clic en un nodo suelto = apertura
      //    directa (el contexto se reinicia). Soltar el nodo = sin contexto. ──
      if (next) {
        if (selected && selected !== next && isNeighborEdge(selected, next)) extendPath(selected, next);
        else resetPathTo(next);
      } else {
        resetPathTo(null);
      }
      if (next) history.visit(next); else history.clear(); // registra el salto (o limpia al soltar)
    }
  };
  const clearAll = () => { setSelected(null); setCompare([]); setFlyToId(null); setActiveCat(null); setTravel(null); setGilgulRoot(null); setEdgeView(null); resetPathTo(null); history.clear(); };

  // ── Historial: ← volver · → adelante · saltar a un punto de la migaja ──
  // Re-seleccionan el nodo y VUELAN la cámara, SIN registrar (no crean rama nueva).
  // Contexto (V3): si el destino está en el camino activo, el camino se TRUNCA
  // hasta él (volver atrás también retrocede el contexto); si no, se reinicia.
  const goToHistory = (id: string) => {
    setActiveCat(null); setCompare([]); setGilgulRoot(null); setTravel(null); setEdgeView(null);
    setActivePath((p) => {
      const i = p.lastIndexOf(id);
      return i >= 0 ? p.slice(0, i + 1) : [id];
    });
    setSelected(id);
    setFlyToId(id);
  };
  const goBack = () => { const id = history.peekBack; if (id) { history.back(); goToHistory(id); } };
  const goForward = () => { const id = history.peekForward; if (id) { history.forward(); goToHistory(id); } };
  const jumpTo = (index: number) => { const id = history.stack[index]; if (id) { history.jumpTo(index); goToHistory(id); } };

  // ── Viaje pedido desde la Consola (chip de destino de una disciplina) ──
  // Captura el origen (el nodo en foco) AHORA; BrainScene halla el spline y dispara el viaje.
  const travelTo = (toId: string) => {
    if (!selected || travel) return;
    setTravelRequest({ from: selected, to: toId });
  };

  // ── "Viaje de luz": la cámara VIAJA por la fibra (desde el panel de conexión
  // o un chip de la Consola). Mientras viaja, soltamos la selección (no hay
  // tarjeta encima del recorrido) y desactivamos flyTo (el viaje manda).
  // El camino contextual NO se toca aquí: se extiende al LLEGAR (arriveTravel).
  const startTravel = (from: string, to: string, pts: THREE.Vector3[]) => {
    if (travel) return; // no encadenar viajes a mitad de uno
    setActiveCat(null); setCompare([]); setFlyToId(null); setSelected(null); setEdgeView(null);
    setTravel({ from, to, pts });
  };
  // al llegar al destino: termina el viaje y REUSA la selección normal (el
  // FocusHelper existente asienta el encuadre fino y lo vuelve el nuevo centro).
  const arriveTravel = (toId: string) => {
    if (travel) extendPath(travel.from, toId); // V3: viajar por la fibra EXTIENDE el camino contextual
    setTravel(null);
    setSelected(toId);
    setFlyToId(toId); // pulso final + encuadre cómodo (flujo de selección existente)
    history.visit(toId); // el viaje por la fibra SÍ se registra (es navegar a un nodo nuevo)
  };

  // ── Panel de CONEXIÓN (V3): clic en una arista = acción de ESTUDIO ──
  // Abre la ficha de la sinapsis (tipo, explicación, fuentes, estudiar, viajar).
  // El nodo en foco NO se suelta: la conexión se examina sin perder el lugar.
  const openEdgePanel = (from: string, to: string, pts: THREE.Vector3[]) => {
    if (travel) return;
    setEdgeView({ from, to, pts });
  };
  // "Ver conexión" desde el panel del nodo (contexto prev→selected, sin spline:
  // si luego se viaja, el resolutor de splines de BrainScene lo encuentra).
  const openContextEdge = () => {
    const n = activePath.length;
    if (n >= 2) setEdgeView({ from: activePath[n - 2], to: activePath[n - 1], pts: null });
  };
  // Viajar DESDE el panel de conexión: usa el spline del clic, o lo pide a la escena.
  const travelFromEdge = () => {
    if (!edgeView || travel) return;
    if (edgeView.pts) startTravel(edgeView.from, edgeView.to, edgeView.pts);
    else { setTravelRequest({ from: edgeView.from, to: edgeView.to }); setEdgeView(null); }
  };

  // ── Controles del contexto (V3) ──
  // Saltar a un paso del breadcrumb contextual: TRUNCA el camino y vuelve allí.
  const jumpToPathStep = (i: number) => {
    const id = activePath[i];
    if (!id) return;
    setActiveCat(null); setCompare([]); setGilgulRoot(null); setTravel(null); setEdgeView(null);
    setActivePath((p) => p.slice(0, i + 1));
    setSelected(id);
    setFlyToId(id);
    history.visit(id);
  };
  // Reiniciar contexto: el nodo sigue abierto, pero olvida el camino → el
  // siguiente estudio vuelve a ser GENERAL (caso 7 de la espec).
  const resetContext = () => {
    setEdgeView(null);
    resetPathTo(selected);
  };

  // Escape = cerrar la selección. Junto al botón de la tarjeta, es la ÚNICA
  // forma de soltar el punto: ya nunca se pierde solo al explorar (zoom/arrastrar).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setSelected(null); setCompare([]); setFlyToId(null); setActiveCat(null); setTravel(null); setGilgulRoot(null); setEdgeView(null); setActivePath([]); history.clear(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // clic en un dominio de la leyenda → enciende toda esa parte del cerebro (toggle)
  const toggleCat = (key: string) => {
    setSelected(null); setCompare([]); setFlyToId(null); setGilgulRoot(null); setEdgeView(null); resetPathTo(null); history.clear();
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
    return n ? nodeLabel(n, locale) : id;
  };

  // destinos del chip-filtro: vecinos del nodo en foco que pertenecen a la disciplina
  // elegida → cada uno es un botón "viajar a" en la Consola (elige dirección y vuela).
  const destinations = useMemo(() => {
    if (!selected || !filterCat) return [] as { id: string; label: string; cat: string }[];
    const nbrs = neighborsIn(graph.edges, selected);
    const out: { id: string; label: string; cat: string }[] = [];
    for (const id of nbrs) {
      const n = graph.nodes.find((x) => x.id === id);
      if (n && n.cat === filterCat) out.push({ id, label: nodeLabel(n, locale), cat: n.cat });
    }
    out.sort((a, b) => a.label.localeCompare(b.label));
    return out;
  }, [selected, filterCat, graph.edges, graph.nodes, locale]);

  // migaja: el camino recorrido (ids del historial → etiquetas localizadas)
  const breadcrumb = useMemo(
    () =>
      history.stack.map((id) => {
        const n = graph.nodes.find((x) => x.id === id);
        return { id, label: n ? nodeLabel(n, locale) : id };
      }),
    [history.stack, graph.nodes, locale],
  );

  // ── Derivados del CONTEXTO relacional (V3) ──
  // breadcrumb contextual: el camino activo con etiquetas localizadas. NO es
  // decoración: cada paso trunca el camino (controla el contexto del estudio).
  const pathCrumb = useMemo(
    () => activePath.map((id) => ({ id, label: labelOf(id) })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activePath, graph.nodes, locale],
  );
  // nodo ORIGEN del contexto: penúltimo paso del camino, si el último es el seleccionado
  const contextFromId =
    selected && activePath.length >= 2 && activePath[activePath.length - 1] === selected
      ? activePath[activePath.length - 2]
      : null;
  // ficha de la relación activa (origen → seleccionado): curaduría + tipo de arista
  const contextInfo = useMemo(() => {
    if (!selected || !contextFromId) return null;
    return {
      fromId: contextFromId,
      fromLabel: labelOf(contextFromId),
      kind: edgeKind(contextFromId, selected),
      curated: getEdgeData(contextFromId, selected) as OrientedEdgeData | null,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, contextFromId, graph.nodes, locale]);
  // href del estudio CONTEXTUAL (relación origen→seleccionado + camino completo)
  const connStudyHref =
    selected && contextFromId
      ? `/estudio?connFrom=${encodeURIComponent(contextFromId)}&connTo=${encodeURIComponent(selected)}&connPath=${encodeURIComponent(activePath.join("|"))}`
      : null;

  // ── Ficha del panel de CONEXIÓN (clic en arista / "ver conexión") ──
  // camino que acompaña al estudio de esta conexión (cola del camino activo si encaja)
  const edgePathIds = useMemo(() => {
    if (!edgeView) return [] as string[];
    const p = activePath;
    const n = p.length;
    if (n >= 2 && p[n - 1] === edgeView.to && p[n - 2] === edgeView.from) return p;
    if (n >= 1 && p[n - 1] === edgeView.from) return [...p, edgeView.to];
    return [edgeView.from, edgeView.to];
  }, [edgeView, activePath]);
  const edgeInfo = useMemo(() => {
    if (!edgeView) return null;
    return {
      fromId: edgeView.from,
      toId: edgeView.to,
      fromLabel: labelOf(edgeView.from),
      toLabel: labelOf(edgeView.to),
      kind: edgeKind(edgeView.from, edgeView.to),
      curated: getEdgeData(edgeView.from, edgeView.to) as OrientedEdgeData | null,
      studyHref: `/estudio?connFrom=${encodeURIComponent(edgeView.from)}&connTo=${encodeURIComponent(edgeView.to)}&connPath=${encodeURIComponent(edgePathIds.join("|"))}`,
      canTravel: !travel && isNeighborEdge(edgeView.from, edgeView.to),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edgeView, edgePathIds, travel, graph.nodes, graph.edges, locale]);

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
          <div className="flex h-full flex-col items-center justify-center gap-5">
            <span className="hebrew animate-pulse text-6xl text-[#e8c87a]" style={{ textShadow: "0 0 44px rgba(232,200,122,0.6), 0 0 16px rgba(232,200,122,0.45)" }}>חַשְׁמַל</span>
            <p className="font-cinzel text-xs uppercase tracking-[0.32em] text-gold/40">{tri("Despertando la mente…", "در حال بیدار شدن…", "Awakening the mind…")}</p>
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 6, CFG.radiusIdle], fov: 55 }}
          gl={{ antialias: true }}
          style={{ position: "absolute", inset: 0 }}
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
            filterCat={filterCat}
            travel={travel}
            travelRequest={travelRequest}
            gilgulRoot={gilgulRoot}
            gilgulMode={gilgulMode}
            onEra={onEra}
            onFlewTo={() => setFlyToId(null)}
            onSelect={handleSelect}
            onHover={(id) => { if (!travel) setHovered(id); }}
            onEdgeHint={setEdgeHint}
            onGilgulHint={setGilgulHint}
            onDouble={handleDouble}
            onPickEdge={openEdgePanel}
            onTravelSpline={startTravel}
            onTravelArrived={arriveTravel}
            onTravelConsumed={consumeTravelRequest}
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
              {nodeLabel(hovNode, locale)}
            </span>
          </div>
          <p className="mt-0.5 ps-[18px] text-[10px] uppercase tracking-wide text-muted/60">
            {catLabel(hovNode.cat === "torah" ? "tanakh" : hovNode.cat, locale)}
          </p>
        </div>
      )}

      {/* Buscador global (motor de búsqueda visual) */}
      <div className="pointer-events-none absolute inset-x-0 top-16 z-20 flex justify-center px-4">
        <div className="pointer-events-auto w-[min(360px,86vw)]">
          <div className="relative">
            <input
              ref={searchInputRef}
              type="search"
              name="q"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
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
                aria-label={tri("limpiar", "پاک کردن", "clear")}
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
                          {`${nodeLabel(s, locale)} + ${isFa ? "گیلگول" : "Gilgul"}`}
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
                      <span className="truncate text-sm text-[#e8e4d8]">{nodeLabel(s, locale)}</span>
                      <span className="ms-auto shrink-0 text-[10px] uppercase tracking-wide text-muted/40">
                        {s.kind === "cat" ? (isFa ? "کهکشان" : locale === "en" ? "galaxy" : "galaxia") : catLabel(disc, locale)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* (La leyenda de disciplinas vive ahora dentro de la Consola unificada, abajo) */}

      {/* Inscripción (la luz que crece) + controles */}
      <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 flex w-[min(440px,74vw)] -translate-x-1/2 flex-col items-center gap-0.5 text-center">
        <p className="font-cinzel text-xs italic tracking-wide text-gold/65 sm:text-sm">{T.mensaje}</p>
        <p className="hebrew text-[11px] leading-tight text-gold/35">
          {T.mensajeHe} <span className="text-muted/35">· {T.mensajeRef}</span>
        </p>
        <p className="mt-1.5 hidden font-cinzel text-[9px] uppercase tracking-[0.25em] text-gold/25 sm:block">{T.hint}</p>
      </div>

      {/* ── LA CONSOLA: el ÚNICO panel de control (reemplaza leyenda + tarjeta de
          nodo + panel de comparación + tarjeta Gilgul). Hoja inferior en móvil,
          panel anclado abajo-izquierda en escritorio. ── */}
      <Consola
        isFa={isFa}
        locale={locale}
        isMobile={isMobile}
        traveling={!!(travel || travelRequest)}
        cats={Object.entries(BRAIN_CATS).filter(([k]) => k !== "jashmal" && k !== "torah")}
        activeCat={activeCat}
        onToggleCat={toggleCat}
        onFocusSearch={() => searchInputRef.current?.focus()}
        selNode={selNode}
        selConnections={selConnections}
        filterCat={filterCat}
        onFilterCat={setFilterCat}
        destinations={destinations}
        onTravelTo={travelTo}
        onExpand={expandNode}
        expanding={expanding}
        studyConcept={selNode ? selNode.label.replace(/\s*\([^)]*\)\s*/g, " ").trim() : ""}
        studyUrl={selNode?.url ?? null}
        canBack={history.canBack}
        canForward={history.canForward}
        breadcrumb={breadcrumb}
        currentIndex={history.index}
        onBack={goBack}
        onForward={goForward}
        onJump={jumpTo}
        onExit={clearAll}
        pathCrumb={pathCrumb}
        contextInfo={contextInfo}
        connStudyHref={connStudyHref}
        onJumpPath={jumpToPathStep}
        onResetContext={resetContext}
        onOpenContextEdge={openContextEdge}
        edgeInfo={edgeInfo}
        onCloseEdge={() => setEdgeView(null)}
        onTravelEdge={travelFromEdge}
        compare={compare}
        compareShared={compareShared}
        labelOf={labelOf}
        onPickShared={pickNode}
        onRemoveCompare={(id) => setCompare((p) => p.filter((x) => x !== id))}
        gilgulInfo={gilgulInfo}
        gilgulMode={gilgulMode}
        onToggleGilgulMode={() => setGilgulMode((m) => (m === "tree" ? "journey" : "tree"))}
      />

      {/* Rótulo "viajar a → destino" que SIGUE AL CURSOR (antes flotaba lejos en
          el medio de la arista y se perdía al acercar el zoom). */}
      <EdgeTooltip hint={edgeHint} isFa={isFa} locale={locale} />

      {/* Tooltip del SENDERO DE GILGUL que SIGUE AL CURSOR (antes flotaba en el
          punto medio 3D del sendero y se perdía al acercar el zoom). Mismo patrón
          DOM que EdgeTooltip: position:fixed + pointermove + opacity por hint. */}
      <GilgulTooltip hint={gilgulHint} lang={isFa ? "fa" : locale === "en" ? "en" : "es"} />

      {/* ── Fase 2 — LÍNEA DE TIEMPO histórica (avanza con la chispa) ──
          Debajo de la galaxia, centrada. Marca la era que el linaje va
          alcanzando (Génesis → Éxodo → Jueces → … → Talmud). Solo en modo
          VIAJE (en árbol no hay una chispa que la haga avanzar). RTL para fa. */}
      {gilgulInfo && gilgulMode === "journey" && gilgulEras.length > 1 && (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-24 z-10 flex justify-center px-4 sm:bottom-6"
          dir={isFa ? "rtl" : "ltr"}
        >
          <div
            className="pointer-events-auto flex max-w-[min(680px,92vw)] items-center gap-1.5 overflow-x-auto rounded-full border bg-ink/85 px-4 py-2 backdrop-blur-md"
            style={{ borderColor: "rgba(255,214,107,0.28)", boxShadow: "0 0 22px rgba(255,214,107,0.1)" }}
          >
            {gilgulEras.map((e, i) => {
              const cur = eraOrder.get(currentEra ?? "") ?? -1;
              const reached = currentEra != null && (eraOrder.get(e.id) ?? 99) <= cur;
              const isNow = currentEra === e.id;
              const lbl = isFa ? e.labelFa : locale === "en" ? e.labelEn : e.label;
              return (
                <div key={e.id} className="flex shrink-0 items-center gap-1.5">
                  {i > 0 && (
                    <span
                      className="h-px w-4 transition-colors duration-700 sm:w-6"
                      style={{ background: reached ? "#ffd66b" : "rgba(255,214,107,0.18)" }}
                    />
                  )}
                  <span className="flex items-center gap-1.5">
                    <span
                      className="inline-block rounded-full transition-all duration-500"
                      style={{
                        width: isNow ? 9 : 6,
                        height: isNow ? 9 : 6,
                        background: reached ? "#ffd66b" : "rgba(255,214,107,0.25)",
                        boxShadow: isNow ? "0 0 10px #ffd66b, 0 0 4px #fff" : reached ? "0 0 6px rgba(255,214,107,0.6)" : "none",
                      }}
                    />
                    <span
                      className="whitespace-nowrap font-cinzel text-[10px] tracking-wide transition-colors duration-500"
                      style={{ color: isNow ? "#fff7e6" : reached ? "#ffe9a8" : "rgba(201,194,173,0.5)" }}
                    >
                      {lbl}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
