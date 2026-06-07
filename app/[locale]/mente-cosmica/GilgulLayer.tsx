"use client";

// ═══════════════════════════════════════════════════════════════════════════
// GilgulLayer — CAPA GILGUL (linaje de almas) sobre el Universo de Jashmal.
//
// ADITIVA: solo se monta cuando `active` es true (modo Gilgul invocado por
// búsqueda "<raíz> + gilgul"). Cuando no está activa, NO existe en la escena →
// cero costo, cero interferencia con el universo normal (incl. "Viaje de luz").
//
// Lo que dibuja (Fase 1, la spec):
//   1. SENDEROS DE GILGUL claramente distintos de las fibras de conocimiento:
//      tubos gruesos, glow, partículas FLUYENDO continuas. Color por certeza:
//      direct = dorado · traditional = ámbar · gematria = azul-plata.
//   2. CHISPA DEL ALMA: luz viva (flicker + cola) que EMERGE de la raíz y VIAJA
//      por los senderos en orden BFS; al llegar a cada vasija, esa enciende con
//      un PULSO (anillo que se expande).
//   3. HOVER en un sendero → tooltip: Tipo Gilgul · Fuente · Certeza (+ gematría).
//
// Las posiciones de los nodos las inyecta page.tsx (mismas que layoutNodes) →
// la chispa viaja por las coordenadas reales del universo.
// ═══════════════════════════════════════════════════════════════════════════

import { useMemo, useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  getGilgulModel,
  traverseGilgul,
  gilgulBranches,
  GILGUL_CONFIDENCE_COLOR,
  type GilgulLink,
} from "@/lib/gilgul";
import { BRAIN_SCALE, nodeLabel, type BNode } from "@/lib/brainData";
import type { GilgulHint } from "./GilgulTooltip";

type Vec3 = [number, number, number];
type Lang = "es" | "fa" | "en";
export type GilgulMode = "journey" | "tree";

// ── Textura de glow radial (propia, para no acoplar con page.tsx) ──────────
let _glow: THREE.Texture | null = null;
function glow(): THREE.Texture {
  if (_glow) return _glow;
  const s = 128;
  const cv = document.createElement("canvas");
  cv.width = cv.height = s;
  const ctx = cv.getContext("2d")!;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.22, "rgba(255,255,255,0.9)");
  g.addColorStop(0.5, "rgba(255,255,255,0.35)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace;
  _glow = t;
  return t;
}

// Curva de un sendero de gilgul: arco suave entre dos vasijas (combado hacia
// afuera del centro del universo → trayectoria "viva", no recta).
const CENTER = new THREE.Vector3(0, 0, 0);
function gilgulCurve(a: Vec3, b: Vec3): THREE.CatmullRomCurve3 {
  const va = new THREE.Vector3(...a);
  const vb = new THREE.Vector3(...b);
  const mid = va.clone().add(vb).multiplyScalar(0.5);
  const out = mid.clone().sub(CENTER);
  if (out.lengthSq() < 1e-4) out.set(0, 1, 0);
  out.normalize();
  const len = va.distanceTo(vb);
  const ctrl = mid.add(out.multiplyScalar(len * 0.18));
  return new THREE.CatmullRomCurve3([va, ctrl, vb]);
}

// ── Un SENDERO de gilgul: tubo glow + partículas fluyendo + área de hover ──
// El tubo es GRUESO y luminoso (vs. las fibras finas del conocimiento). Las
// partículas corren SIEMPRE de `from`→`to` (transmisión direccional del alma).
function GilgulPath({
  link,
  pa,
  pb,
  isHot,
  onHover,
  sparkPassed,
}: {
  link: GilgulLink;
  pa: Vec3;
  pb: Vec3;
  isHot: boolean;
  onHover: (h: boolean) => void;
  sparkPassed: boolean; // ¿la chispa ya pasó por aquí? → el sendero "queda encendido"
}) {
  const tex = useMemo(() => glow(), []);
  const curve = useMemo(() => gilgulCurve(pa, pb), [pa, pb]);
  const pts = useMemo(() => curve.getPoints(40), [curve]);
  const color = useMemo(() => new THREE.Color(GILGUL_CONFIDENCE_COLOR[link.confidence]), [link.confidence]);
  // dorado-blanco: el alma es luz, no solo color → mezclamos hacia el blanco
  const warm = useMemo(() => color.clone().lerp(new THREE.Color("#ffffff"), 0.35), [color]);

  // tubo visible (glow)
  const tubeGeo = useMemo(() => {
    const r = (link.confidence === "gematria" ? 0.018 : 0.022) * BRAIN_SCALE;
    return new THREE.TubeGeometry(curve, Math.max(8, pts.length - 1), r, 7, false);
  }, [curve, pts.length, link.confidence]);
  // tubo de impacto (invisible, grueso) para hover cómodo
  const hitGeo = useMemo(
    () => new THREE.TubeGeometry(curve, Math.max(8, pts.length - 1), 0.09 * BRAIN_SCALE, 6, false),
    [curve, pts.length],
  );
  useEffect(() => () => { tubeGeo.dispose(); hitGeo.dispose(); }, [tubeGeo, hitGeo]);

  const tubeMat = useRef<THREE.MeshBasicMaterial>(null);
  useFrame(({ clock }) => {
    if (!tubeMat.current) return;
    const t = clock.elapsedTime;
    // base sube cuando la chispa ya pasó (el linaje "iluminado") y al hover
    const lit = sparkPassed ? 0.5 : 0.18;
    const hover = isHot ? 0.3 : 0;
    tubeMat.current.opacity = Math.min(0.95, lit + hover + Math.sin(t * 2.5) * 0.06);
  });

  // ── Partículas fluyendo de from→to (energía viva continua) ──
  const PARTS = 10;
  const partRefs = useRef<(THREE.Sprite | null)[]>([]);
  const last = pts.length - 1;
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const speed = sparkPassed ? 0.55 : 0.3; // tras el paso de la chispa, fluye más vivo
    for (let i = 0; i < PARTS; i++) {
      const spr = partRefs.current[i];
      if (!spr) continue;
      const u = (t * speed + i / PARTS) % 1;
      const idx = Math.min(last, Math.max(0, Math.floor(u * last)));
      const p = pts[idx];
      spr.position.set(p.x, p.y, p.z);
      const baseS = (sparkPassed ? 0.05 : 0.034) * (0.7 + Math.sin((t + i) * 5) * 0.3);
      const s = baseS * BRAIN_SCALE;
      spr.scale.set(s, s, 1);
      const m = spr.material as THREE.SpriteMaterial;
      m.opacity = (sparkPassed ? 0.85 : 0.4) * Math.sin(u * Math.PI); // nace/muere en extremos
    }
  });

  return (
    <group>
      {/* tubo luminoso del sendero */}
      <mesh geometry={tubeGeo}>
        <meshBasicMaterial
          ref={tubeMat}
          color={warm}
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      {/* partículas fluyendo (energía del alma) */}
      {Array.from({ length: PARTS }).map((_, i) => (
        <sprite key={i} ref={(el) => { partRefs.current[i] = el; }}>
          <spriteMaterial map={tex} color={warm} transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
        </sprite>
      ))}
      {/* área de impacto (hover) */}
      <mesh
        geometry={hitGeo}
        onPointerOver={(e) => { e.stopPropagation(); onHover(true); document.body.style.cursor = "help"; }}
        onPointerOut={() => { onHover(false); document.body.style.cursor = "default"; }}
      >
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      {/* El tooltip de hover del sendero ya NO vive aquí (era un <Html> en el
          midpoint 3D que se perdía al acercar el zoom). Ahora es un tooltip DOM
          que sigue al cursor: GilgulTooltip, montado fuera del Canvas en page.tsx.
          GilgulLayer bubblea el sendero bajo el cursor vía onHint (ver abajo). */}
    </group>
  );
}

// ── La CHISPA DEL ALMA: luz viva que recorre UNA RAMA del linaje ───────────
// Recorre la concatenación de los splines de una rama (raíz→hoja). Al cruzar el
// final de un tramo, marca esa vasija como "encendida" (pulso), el sendero como
// "ya pasado" (queda iluminado) y reporta su `era` (para la línea de tiempo).
// Tiene cola de cometa + flicker. Acepta un `delay` para escalonar el arranque
// (Fase 2: chispas hermanas que se BIFURCAN — comparten prefijo, arrancan juntas
// y se separan donde el linaje diverge).
function SoulSpark({
  segments,
  onArriveNode,
  onPassLink,
  onEra,
  delay = 0,
  speed = 22,
}: {
  segments: { link: GilgulLink; pts: THREE.Vector3[] }[];
  onArriveNode: (id: string) => void;
  onPassLink: (key: string) => void;
  onEra?: (era: string) => void;
  delay?: number;            // s antes de empezar a moverse (coreografía multi-chispa)
  speed?: number;            // puntos/seg
}) {
  const tex = useMemo(() => glow(), []);
  const headRef = useRef<THREE.Sprite>(null);
  const TAIL = 9;
  const tailRefs = useRef<(THREE.Sprite | null)[]>([]);
  // posiciones acumuladas: aplanamos todos los tramos de la rama en una pista
  const track = useMemo(() => {
    const flat: { p: THREE.Vector3; linkKey: string; toId: string; era?: string; isLast: boolean }[] = [];
    for (const seg of segments) {
      const key = `${seg.link.from}→${seg.link.to}`;
      seg.pts.forEach((p, i) =>
        flat.push({ p, linkKey: key, toId: seg.link.to, era: seg.link.era, isLast: i === seg.pts.length - 1 }),
      );
    }
    return flat;
  }, [segments]);

  const idxRef = useRef(0);
  const waitRef = useRef(0);
  const firedLinks = useRef<Set<string>>(new Set());
  const firedNodes = useRef<Set<string>>(new Set());
  // reinicia el recorrido cuando cambian los segmentos (nueva raíz invocada)
  useEffect(() => {
    idxRef.current = 0;
    waitRef.current = 0;
    firedLinks.current = new Set();
    firedNodes.current = new Set();
  }, [segments]);

  useFrame((_, dt) => {
    if (!headRef.current || track.length < 2) return;
    // escalonado: espera su `delay` antes de moverse (las hermanas se bifurcan)
    if (waitRef.current < delay) {
      waitRef.current += dt;
      headRef.current.position.copy(track[0].p); // aguarda en la raíz
      return;
    }
    idxRef.current = Math.min(track.length - 1, idxRef.current + dt * speed);
    const i = Math.floor(idxRef.current);
    const node = track[i];
    headRef.current.position.copy(node.p);

    // flicker de luz viva
    const flick = 0.09 + Math.sin(performance.now() * 0.012) * 0.02 + Math.random() * 0.015;
    const s = flick * BRAIN_SCALE;
    headRef.current.scale.set(s, s, 1);

    // dispara pulso + era al llegar al final de un tramo
    if (node.isLast) {
      if (!firedLinks.current.has(node.linkKey)) {
        firedLinks.current.add(node.linkKey);
        onPassLink(node.linkKey);
        if (node.era && onEra) onEra(node.era);
      }
      if (!firedNodes.current.has(node.toId)) { firedNodes.current.add(node.toId); onArriveNode(node.toId); }
    }

    // cola de cometa: sprites rezagados sobre la pista
    for (let k = 0; k < TAIL; k++) {
      const spr = tailRefs.current[k];
      if (!spr) continue;
      const j = Math.max(0, Math.floor(idxRef.current) - (k + 1) * 2);
      const p = track[j].p;
      spr.position.copy(p);
      const ts = (0.06 - k * 0.005) * BRAIN_SCALE * (0.8 + Math.sin(performance.now() * 0.01 + k) * 0.2);
      spr.scale.set(Math.max(0.006, ts), Math.max(0.006, ts), 1);
      (spr.material as THREE.SpriteMaterial).opacity = Math.max(0, 0.6 - k * 0.06);
    }
  });

  return (
    <group>
      {/* cola */}
      {Array.from({ length: TAIL }).map((_, k) => (
        <sprite key={k} ref={(el) => { tailRefs.current[k] = el; }}>
          <spriteMaterial map={tex} color="#fff3d6" transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
        </sprite>
      ))}
      {/* cabeza: la chispa misma (blanco-dorado intenso) */}
      <sprite ref={headRef}>
        <spriteMaterial map={tex} color="#fffbe9" transparent opacity={0.95} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
      </sprite>
    </group>
  );
}

// ── Pulso de llegada: anillo de luz que se expande cuando la chispa llega ───
function ArrivalPulse({ pos, color }: { pos: Vec3; color: string }) {
  const tex = useMemo(() => glow(), []);
  const ref = useRef<THREE.Sprite>(null);
  const born = useRef<number>(performance.now());
  const col = useMemo(() => new THREE.Color(color).lerp(new THREE.Color("#ffffff"), 0.4), [color]);
  useFrame(() => {
    if (!ref.current) return;
    const age = (performance.now() - born.current) / 1000; // s
    const life = 1.4;
    const k = Math.min(1, age / life);
    const s = (0.12 + k * 0.9) * BRAIN_SCALE; // se expande
    ref.current.scale.set(s, s, 1);
    (ref.current.material as THREE.SpriteMaterial).opacity = (1 - k) * 0.7;
  });
  return (
    <sprite ref={ref} position={pos}>
      <spriteMaterial map={tex} color={col} transparent opacity={0.7} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
    </sprite>
  );
}

// ── La capa completa ────────────────────────────────────────────────────────
export default function GilgulLayer({
  active,
  rootId,
  positions,
  nodeMap,
  lang,
  controlsRef,
  mode = "journey",
  onEra,
  onHint,
}: {
  active: boolean;
  rootId: string | null;                          // raíz de alma invocada (ej. "Abel")
  positions: Record<string, Vec3>;                // posiciones de layoutNodes (mismas del universo)
  nodeMap: Map<string, BNode>;
  lang: Lang;
  controlsRef: React.RefObject<any>;              // OrbitControls → para enfocar la raíz
  mode?: GilgulMode;                              // "journey" = viaje lineal · "tree" = árbol completo
  onEra?: (era: string) => void;                  // Fase 2: la chispa reporta la era al llegar a una vasija
  onHint?: (hint: GilgulHint | null) => void;     // sendero bajo el cursor → tooltip DOM que lo sigue (fuera del Canvas)
}) {
  const isTree = mode === "tree";
  const model = useMemo(() => getGilgulModel(), []);
  // recorrido desde la raíz (orden BFS, multi-chispa incluido)
  const traversal = useMemo(
    () => (active && rootId ? traverseGilgul(rootId, model) : null),
    [active, rootId, model],
  );

  // links del recorrido que tienen AMBOS extremos posicionados
  const drawnLinks = useMemo(() => {
    if (!traversal) return [] as GilgulLink[];
    return traversal.order.filter((l) => positions[l.from] && positions[l.to]);
  }, [traversal, positions]);

  // ── Fase 2 (multi-chispa coreografiada): RAMAS raíz→hoja. Las que comparten
  //    prefijo arrancan juntas y se BIFURCAN físicamente donde el linaje diverge.
  //    Cada rama → una SoulSpark con su propio track + delay escalonado. ──
  const branchSparks = useMemo(() => {
    if (!active || !rootId) return [] as { key: string; delay: number; segments: { link: GilgulLink; pts: THREE.Vector3[] }[] }[];
    const branches = gilgulBranches(rootId, model);
    return branches
      .map((b, bi) => {
        const segs = b.links
          .filter((l) => positions[l.from] && positions[l.to])
          .map((l) => ({ link: l, pts: gilgulCurve(positions[l.from], positions[l.to]).getPoints(40) }));
        return { key: `b${bi}:${b.links[0]?.from ?? ""}→${b.links[b.links.length - 1]?.to ?? ""}`, delay: bi * 0.18, segments: segs };
      })
      .filter((b) => b.segments.length > 0);
  }, [active, rootId, model, positions]);

  // estado vivo del recorrido de la chispa
  const [passedLinks, setPassedLinks] = useState<Set<string>>(new Set());
  const [pulses, setPulses] = useState<{ id: string; pos: Vec3; color: string; key: number }[]>([]);
  const pulseKey = useRef(0);
  const [hotLink, setHotLink] = useState<string | null>(null);

  // al (re)invocar una raíz O cambiar de modo, reinicia lo "encendido"
  useEffect(() => {
    setPassedLinks(new Set());
    setPulses([]);
    setHotLink(null);
    onHint?.(null); // y oculta el tooltip de sendero (DOM que sigue al cursor)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rootId, active, mode]);

  // En modo ÁRBOL: enciende TODOS los senderos de una vez (organismo cósmico),
  // sin esperar a la chispa. (Marca todo como "ya pasado" → todos iluminados.)
  useEffect(() => {
    if (isTree && drawnLinks.length > 0) {
      setPassedLinks(new Set(drawnLinks.map((l) => `${l.from}→${l.to}`)));
    }
  }, [isTree, drawnLinks]);

  // ENFOQUE de la raíz: lleva la cámara al nodo raíz cuando se activa el modo.
  // (Atenuar los no-relacionados lo hace page.tsx vía intensidad; aquí solo
  //  encuadramos la raíz para "esta es el alma raíz".) En modo ÁRBOL retrocede
  //  un poco más para abarcar el organismo completo.
  const camera = useThree((s) => s.camera);
  const focusedFor = useRef<string | null>(null);
  const focusProg = useRef(0);
  useEffect(() => { focusedFor.current = null; focusProg.current = 0; }, [rootId, mode]);
  useFrame((_, dt) => {
    if (!active || !rootId) return;
    const c = controlsRef.current;
    const target = positions[rootId];
    if (!c || !target) return;
    if (focusedFor.current === `${rootId}:${mode}`) return; // ya enfocado para este modo
    focusProg.current = Math.min(1, focusProg.current + dt * 1.6);
    const tgt = new THREE.Vector3(...target);
    const k = Math.min(1, dt * 2.6);
    c.target.lerp(tgt, k);
    const dir = camera.position.clone().sub(tgt);
    const len = dir.length();
    if (len > 0.001) {
      const newLen = THREE.MathUtils.lerp(len, isTree ? 15 : 9, k); // árbol: vista más amplia
      camera.position.copy(tgt).add(dir.multiplyScalar(newLen / len));
    }
    c.update();
    if (focusProg.current >= 1) focusedFor.current = `${rootId}:${mode}`;
  });

  if (!active || !rootId || drawnLinks.length === 0) return null;

  const onPassLink = (key: string) =>
    setPassedLinks((prev) => (prev.has(key) ? prev : new Set(prev).add(key)));
  const onArriveNode = (id: string) => {
    // color del pulso = certeza del link que llegó a este nodo (si lo hallamos)
    const link = drawnLinks.find((l) => l.to === id);
    const color = link ? GILGUL_CONFIDENCE_COLOR[link.confidence] : "#ffd66b";
    const pos = positions[id];
    if (!pos) return;
    pulseKey.current += 1;
    const key = pulseKey.current;
    setPulses((prev) => [...prev, { id, pos, color, key }]);
    // limpia el pulso tras su vida (~1.4s)
    setTimeout(() => setPulses((prev) => prev.filter((p) => p.key !== key)), 1500);
  };

  const labelOf = (id: string) => {
    const n = nodeMap.get(id);
    if (!n) return id;
    return nodeLabel(n, lang);
  };

  return (
    <group>
      {/* SENDEROS de gilgul (distintos de las fibras de conocimiento) */}
      {drawnLinks.map((l) => {
        const key = `${l.from}→${l.to}`;
        return (
          <GilgulPath
            key={key}
            link={l}
            pa={positions[l.from]}
            pb={positions[l.to]}
            isHot={hotLink === key}
            onHover={(h) => {
              setHotLink(h ? key : null);
              // bubblea el sendero bajo el cursor → tooltip DOM (sigue al cursor, fuera del Canvas)
              onHint?.(h ? { link: l, fromLabel: labelOf(l.from), toLabel: labelOf(l.to) } : null);
            }}
            sparkPassed={passedLinks.has(key)}
          />
        );
      })}

      {/* CHISPAS del alma — Fase 2: una por RAMA, escalonadas (se bifurcan).
          Solo en modo VIAJE; en modo ÁRBOL el organismo ya está encendido. */}
      {!isTree && branchSparks.map((b) => (
        <SoulSpark
          key={b.key}
          segments={b.segments}
          delay={b.delay}
          onArriveNode={onArriveNode}
          onPassLink={onPassLink}
          onEra={onEra}
        />
      ))}

      {/* En modo ÁRBOL: un pulso suave perpetuo recorre cada vasija (latido del
          organismo), sin chispa viajera. */}
      {isTree && <TreePulse nodeIds={traversal!.reachable} positions={positions} />}

      {/* PULSOS de llegada en cada vasija (modo viaje) */}
      {pulses.map((p) => (
        <ArrivalPulse key={p.key} pos={p.pos} color={p.color} />
      ))}

      {/* RAÍZ encendida intensamente: anillo perpetuo suave alrededor de la raíz */}
      {positions[rootId] && <RootHalo pos={positions[rootId]} />}
    </group>
  );
}

// ── Modo ÁRBOL: latido suave que recorre todas las vasijas del organismo ────
// Sin chispa viajera; cada vasija "respira" con un desfase → el árbol completo
// se siente vivo a la vez. Solo se monta en mode="tree".
function TreePulse({ nodeIds, positions }: { nodeIds: Set<string>; positions: Record<string, Vec3> }) {
  const tex = useMemo(() => glow(), []);
  const ids = useMemo(() => [...nodeIds].filter((id) => positions[id]), [nodeIds, positions]);
  const refs = useRef<(THREE.Sprite | null)[]>([]);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    for (let i = 0; i < ids.length; i++) {
      const spr = refs.current[i];
      if (!spr) continue;
      const phase = (i / Math.max(1, ids.length)) * Math.PI * 2;
      const beat = 0.5 + Math.sin(t * 1.1 + phase) * 0.5; // 0..1 desfasado
      const s = (0.05 + beat * 0.06) * BRAIN_SCALE;
      spr.scale.set(s, s, 1);
      (spr.material as THREE.SpriteMaterial).opacity = 0.25 + beat * 0.5;
    }
  });
  return (
    <group>
      {ids.map((id, i) => (
        <sprite key={id} ref={(el) => { refs.current[i] = el; }} position={positions[id]}>
          <spriteMaterial map={tex} color="#ffe9a8" transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
        </sprite>
      ))}
    </group>
  );
}

// Halo perpetuo de la raíz del alma ("esta es el alma raíz").
function RootHalo({ pos }: { pos: Vec3 }) {
  const tex = useMemo(() => glow(), []);
  const ref = useRef<THREE.Sprite>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    const s = (0.45 + Math.sin(t * 1.3) * 0.06) * BRAIN_SCALE;
    ref.current.scale.set(s, s, 1);
    (ref.current.material as THREE.SpriteMaterial).opacity = 0.4 + Math.sin(t * 1.3) * 0.1;
  });
  return (
    <sprite ref={ref} position={pos}>
      <spriteMaterial map={tex} color="#ffe9a8" transparent opacity={0.45} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
    </sprite>
  );
}
