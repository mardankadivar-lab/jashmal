"use client";

// ─────────────────────────────────────────────────────────────────────────
// /atlas — "El Atlas Bíblico vivo de Jashmal"
// La Tierra cósmica: cada lugar bíblico es un nodo luminoso sobre el globo.
// Hermano del Cerebro (misma estética: oscuro, dorado, Bloom, contemplativo).
// Clic en un lugar → panel con su historia, fuentes y personajes (ligan al
// motor de estudio). Rutas históricas (Abraham, Éxodo, Exilio) animadas.
// ─────────────────────────────────────────────────────────────────────────

import { useMemo, useRef, useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { useFrame } from "@react-three/fiber";
import { Html, OrbitControls, Line, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  PLACES,
  ROUTES,
  REGION_COLORS,
  GLOBE_R,
  latLngToVec3,
  placeById,
  type Place,
  type AtlasRoute,
} from "@/lib/atlasData";

const Canvas = dynamic(() => import("@react-three/fiber").then((m) => m.Canvas), { ssr: false });

// cámara mirando hacia el Cercano Oriente (la Tierra de Israel) al inicio
const CAMERA_POS = latLngToVec3(24, 42, GLOBE_R * 4.6);

// textura de resplandor (gradiente radial) — igual idea que en el Cerebro
function glowTexture(): THREE.Texture {
  const s = 128;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.25, "rgba(255,255,255,0.65)");
  g.addColorStop(0.55, "rgba(255,255,255,0.18)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  const t = new THREE.CanvasTexture(c);
  t.needsUpdate = true;
  return t;
}

// arco de gran círculo entre dos lat/lng, elevado sobre la superficie
function greatCircleArc(a: [number, number], b: [number, number], segs = 50): THREE.Vector3[] {
  const va = new THREE.Vector3(...latLngToVec3(a[0], a[1], 1));
  const vb = new THREE.Vector3(...latLngToVec3(b[0], b[1], 1));
  const ang = Math.max(1e-4, va.angleTo(vb));
  const sinAng = Math.sin(ang);
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= segs; i++) {
    const t = i / segs;
    const w1 = Math.sin((1 - t) * ang) / sinAng;
    const w2 = Math.sin(t * ang) / sinAng;
    const p = va.clone().multiplyScalar(w1).add(vb.clone().multiplyScalar(w2)).normalize();
    const lift = 1 + (0.05 + ang * 0.12) * Math.sin(Math.PI * t);
    pts.push(p.multiplyScalar(GLOBE_R * lift));
  }
  return pts;
}

// ── Atmósfera: halo de borde tipo amanecer (shader fresnel) ────────────────
const ATM_VERT = `
  varying vec3 vNormalV; varying vec3 vView; varying vec3 vNormalW;
  void main(){
    vNormalV = normalize(normalMatrix * normal);
    vNormalW = normalize(position);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }`;
const ATM_FRAG = `
  varying vec3 vNormalV; varying vec3 vView; varying vec3 vNormalW;
  uniform vec3 glowColor; uniform vec3 sunDir;
  void main(){
    float rim = pow(1.0 - max(dot(vView, vNormalV), 0.0), 2.4);
    float lit = smoothstep(-0.5, 0.7, dot(vNormalW, normalize(sunDir)));
    gl_FragColor = vec4(glowColor, rim * (0.42 + 0.58 * lit) * 1.15);
  }`;

// Costas reales del mundo (GeoJSON 50m comprimido) → líneas que brillan.
function useCoastline(): THREE.BufferGeometry | null {
  const [geo, setGeo] = useState<THREE.BufferGeometry | null>(null);
  useEffect(() => {
    let alive = true;
    fetch("/geo/coastline.json")
      .then((r) => r.json())
      .then((d: { lines: [number, number][][] }) => {
        if (!alive) return;
        const arr: number[] = [];
        const R = GLOBE_R * 1.004;
        for (const line of d.lines) {
          for (let i = 0; i < line.length - 1; i++) {
            const a = latLngToVec3(line[i][1], line[i][0], R);
            const b = latLngToVec3(line[i + 1][1], line[i + 1][0], R);
            arr.push(a[0], a[1], a[2], b[0], b[1], b[2]);
          }
        }
        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.Float32BufferAttribute(arr, 3));
        setGeo(g);
      })
      .catch(() => {});
    return () => { alive = false; };
  }, []);
  return geo;
}

// ── El globo: planeta oscuro + costas luminosas + atmósfera de amanecer ────
function Globe({ onBackground }: { onBackground: () => void }) {
  const coast = useCoastline();
  const atmUniforms = useMemo(() => ({
    glowColor: { value: new THREE.Color("#9ec6e8") },
    sunDir: { value: new THREE.Vector3(-0.35, 0.45, 0.55).normalize() },
  }), []);
  return (
    <group>
      {/* océano / planeta oscuro */}
      <mesh onClick={(e) => { e.stopPropagation(); onBackground(); }}>
        <sphereGeometry args={[GLOBE_R, 96, 64]} />
        <meshStandardMaterial color="#060b16" roughness={1} metalness={0} />
      </mesh>
      {/* costas reales que brillan */}
      {coast && (
        <lineSegments geometry={coast}>
          <lineBasicMaterial color="#86b0d6" transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
        </lineSegments>
      )}
      {/* atmósfera (halo de borde) */}
      <mesh scale={1.04}>
        <sphereGeometry args={[GLOBE_R, 64, 48]} />
        <shaderMaterial vertexShader={ATM_VERT} fragmentShader={ATM_FRAG} uniforms={atmUniforms} transparent blending={THREE.AdditiveBlending} side={THREE.FrontSide} depthWrite={false} />
      </mesh>
    </group>
  );
}

// ── Un lugar: sinapsis geográfica luminosa ─────────────────────────────────
function PlaceNode({
  place, pos, selected, dimmed, isFa, harvested, hits, onClick, onHover,
}: {
  place: Place;
  pos: [number, number, number];
  selected: boolean;
  dimmed: boolean;
  isFa: boolean;
  harvested: boolean; // cosechada al estudiar (no de la semilla) → brilla "nueva"
  hits: number;       // veces estudiada → crece el resplandor
  onClick: () => void;
  onHover: (h: boolean) => void;
}) {
  const tex = useMemo(glowTexture, []);
  const col = REGION_COLORS[place.region] ?? "#c9a43e";
  // Chispas finas: puntos pequeños y delicados (no bolas). El resplandor base
  // crece UN POCO con las veces que se ha estudiado, pero acotado: una localidad
  // muy estudiada brilla algo más y TODAS quedan pequeñas.
  const base = (place.importance === 3 ? 0.12 : place.importance === 2 ? 0.085 : 0.06)
    + Math.min(0.03, hits * 0.004);
  // área de toque invisible: cómoda aunque la chispa sea diminuta (no encoge el clic)
  const hit = Math.max(0.22, base * 3.4);
  const haloRef = useRef<THREE.Sprite>(null);
  const coreRef = useRef<THREE.Sprite>(null);
  const ringRef = useRef<THREE.Sprite>(null); // anillo dorado de "recién encendida"
  const [hover, setHover] = useState(false);
  const showLabel = place.importance === 3 || selected || hover;
  // escalona la altura de la etiqueta (los lugares de Tierra Santa están muy juntos)
  const labelDy = useMemo(() => {
    const h = [...place.id].reduce((a, c) => a + c.charCodeAt(0), 0);
    return -8 - (h % 34);
  }, [place.id]);

  useFrame(({ clock }) => {
    const pulse = 1 + Math.sin(clock.elapsedTime * 1.5 + pos[0] * 2) * 0.12;
    const k = selected ? 1.55 : dimmed ? 0.55 : 1;
    // halo = bloom suave alrededor · core = la chispa brillante puntual (el "glint")
    if (haloRef.current) haloRef.current.scale.setScalar(base * 1.5 * pulse * k);
    if (coreRef.current) coreRef.current.scale.setScalar(base * 0.55 * pulse * k);
    // anillo de "recién cosechada": fino y proporcional (respira lento y amplio)
    if (ringRef.current) {
      const slow = 1 + Math.sin(clock.elapsedTime * 0.9 + pos[1] * 2) * 0.28;
      ringRef.current.scale.setScalar(base * 1.9 * slow * k);
    }
  });

  return (
    <group position={pos}>
      {harvested && (
        <sprite ref={ringRef}>
          <spriteMaterial map={tex} color="#c9a43e" transparent opacity={dimmed ? 0.1 : 0.22} blending={THREE.AdditiveBlending} depthWrite={false} />
        </sprite>
      )}
      <sprite ref={haloRef}>
        <spriteMaterial map={tex} color={col} transparent opacity={dimmed ? 0.25 : 0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
      </sprite>
      <sprite ref={coreRef}>
        <spriteMaterial map={tex} color="#fff7e6" transparent opacity={dimmed ? 0.4 : 0.95} blending={THREE.AdditiveBlending} depthWrite={false} />
      </sprite>
      {/* área de clic (invisible) — se mantiene cómoda aunque la chispa sea diminuta */}
      <sprite
        scale={[hit, hit, 1]}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); onHover(true); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { setHover(false); onHover(false); document.body.style.cursor = "default"; }}
      >
        <spriteMaterial map={tex} transparent opacity={0} depthWrite={false} />
      </sprite>
      {showLabel && (
        <Html center zIndexRange={[20, 0]} style={{ pointerEvents: "none" }}>
          <div style={{
            transform: `translateY(${selected || hover ? -14 : labelDy}px)`, whiteSpace: "nowrap", userSelect: "none",
            fontFamily: "var(--font-cinzel, serif)", fontSize: place.importance === 3 ? "12px" : "10px",
            color: col, textShadow: `0 0 10px ${col}, 0 0 5px #000, 0 0 5px #000`, opacity: dimmed ? 0.4 : 1,
          }}>
            {place.es}
          </div>
        </Html>
      )}
    </group>
  );
}

// ── Ruta histórica: línea luminosa + cometa que viaja ─────────────────────
function RouteArc({ pts, color, opacity, comet }: { pts: THREE.Vector3[]; color: string; opacity: number; comet: boolean }) {
  const tex = useMemo(glowTexture, []);
  const cometRef = useRef<THREE.Sprite>(null);
  useFrame(({ clock }) => {
    if (!cometRef.current || pts.length < 2) return;
    const t = (clock.elapsedTime * 0.07) % 1;
    const f = t * (pts.length - 1);
    const i = Math.min(pts.length - 2, Math.floor(f));
    cometRef.current.position.lerpVectors(pts[i], pts[i + 1], f - i);
  });
  return (
    <>
      <Line points={pts} color={color} lineWidth={comet ? 2.2 : 1.2} transparent opacity={opacity} />
      {comet && (
        <sprite ref={cometRef} scale={[0.45, 0.45, 1]}>
          <spriteMaterial map={tex} color={color} transparent opacity={0.95} blending={THREE.AdditiveBlending} depthWrite={false} />
        </sprite>
      )}
    </>
  );
}

// ── Escena ────────────────────────────────────────────────────────────────
function AtlasScene({
  places, selected, activeRoute, isFa, onSelect, onBackground,
}: {
  places: Place[];
  selected: string | null;
  activeRoute: string | null;
  isFa: boolean;
  onSelect: (id: string) => void;
  onBackground: () => void;
}) {
  const positions = useMemo(() => {
    const m: Record<string, [number, number, number]> = {};
    for (const p of places) m[p.id] = latLngToVec3(p.lat, p.lng, GLOBE_R * 1.012);
    return m;
  }, [places]);

  // puntos de cada ruta (concatena arcos entre paradas consecutivas)
  const routePts = useMemo(() => {
    const m: Record<string, THREE.Vector3[]> = {};
    for (const r of ROUTES) {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i < r.stops.length - 1; i++) {
        const a = placeById(r.stops[i]); const b = placeById(r.stops[i + 1]);
        if (!a || !b) continue;
        const seg = greatCircleArc([a.lat, a.lng], [b.lat, b.lng]);
        pts.push(...(i === 0 ? seg : seg.slice(1)));
      }
      m[r.id] = pts;
    }
    return m;
  }, []);
  const glowTex = useMemo(glowTexture, []);

  const controlsRef = useRef<any>(null);
  const [autoRot, setAutoRot] = useState(true);
  const idle = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pause = () => { setAutoRot(false); if (idle.current) clearTimeout(idle.current); };
  const resume = () => { if (idle.current) clearTimeout(idle.current); idle.current = setTimeout(() => setAutoRot(true), 4000); };

  const anyRoute = activeRoute !== null;

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        makeDefault
        enableDamping
        dampingFactor={0.08}
        enablePan={false}
        rotateSpeed={0.42}
        zoomSpeed={0.8}
        minDistance={GLOBE_R * 1.5}
        maxDistance={GLOBE_R * 6}
        autoRotate={autoRot && !selected}
        autoRotateSpeed={0.16}
        onStart={pause}
        onEnd={resume}
      />
      <ambientLight intensity={0.1} />
      {/* luz fría tipo amanecer — da forma sutil al planeta */}
      <directionalLight position={[-5, 3, 5]} intensity={0.75} color="#cddcf0" />
      {/* leve resplandor dorado sobre la Tierra Santa */}
      <sprite position={latLngToVec3(31.5, 35, GLOBE_R * 1.02)} scale={[2.8, 2.8, 1]}>
        <spriteMaterial map={glowTex} color="#e6c269" transparent opacity={0.16} blending={THREE.AdditiveBlending} depthWrite={false} />
      </sprite>

      <Stars radius={120} depth={60} count={2600} factor={4} saturation={0} fade speed={0.4} />
      <Globe onBackground={onBackground} />

      {/* rutas */}
      {ROUTES.map((r) => (
        <RouteArc
          key={r.id}
          pts={routePts[r.id] ?? []}
          color={r.color}
          opacity={anyRoute ? (activeRoute === r.id ? 0.9 : 0.06) : 0.5}
          comet={anyRoute ? activeRoute === r.id : true}
        />
      ))}

      {/* lugares */}
      {places.map((p) => {
        const onRoute = activeRoute ? (ROUTES.find((r) => r.id === activeRoute)?.stops.includes(p.id) ?? false) : true;
        return (
          <PlaceNode
            key={p.id}
            place={p}
            pos={positions[p.id]}
            selected={selected === p.id}
            dimmed={(anyRoute && !onRoute) || (selected !== null && selected !== p.id)}
            isFa={isFa}
            harvested={p.source === "harvest"}
            hits={p.hits ?? 0}
            onClick={() => onSelect(p.id)}
            onHover={() => {}}
          />
        );
      })}
    </>
  );
}

// ── Página ──────────────────────────────────────────────────────────────────
export default function AtlasPage() {
  const locale = useLocale();
  const isFa = locale === "fa";
  const [selected, setSelected] = useState<string | null>(null);
  const [activeRoute, setActiveRoute] = useState<string | null>(null);
  const [searchQ, setSearchQ] = useState("");

  // El Atlas vivo lee sus localidades de /api/atlas (BD: semilla + cosechadas);
  // la semilla estática es el respaldo si la BD no está. Crece al estudiar lugares.
  const [places, setPlaces] = useState<Place[]>(PLACES);
  useEffect(() => {
    let alive = true;
    fetch("/api/atlas")
      .then((r) => r.json())
      .then((d) => {
        if (alive && d && Array.isArray(d.places) && d.places.length) {
          setPlaces(d.places as Place[]);
        }
      })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  const placeLookup = useMemo(() => {
    const m: Record<string, Place> = {};
    for (const p of places) m[p.id] = p;
    return m;
  }, [places]);
  const harvestedCount = useMemo(() => places.filter((p) => p.source === "harvest").length, [places]);
  const selPlace = selected ? placeLookup[selected] ?? null : null;

  const T = {
    title: "אַטְלַס",
    subtitle: isFa ? "اطلسِ زندهٔ کتاب مقدس" : "El Atlas Bíblico vivo de Jashmal",
    back: isFa ? "بازگشت به خانه" : "Volver al inicio",
    routes: isFa ? "سفرها" : "Viajes",
    study: isFa ? "مطالعهٔ این مکان ←" : "Estudiar este lugar →",
    figures: isFa ? "شخصیت‌ها" : "Personajes",
    refsT: isFa ? "referencias" : "Referencias",
    search: isFa ? "جستجوی مکان…" : "Busca un lugar…",
    hint: isFa ? "بکشید برای چرخش · اسکرول برای زوم · کلیک روی یک مکان" : "Arrastra para girar el planeta · rueda para acercar · clic en un lugar",
  };

  const suggestions = useMemo(() => {
    const q = searchQ.trim().toLowerCase();
    if (!q) return [] as Place[];
    return places.filter((p) => p.es.toLowerCase().includes(q) || p.he.includes(searchQ.trim())).slice(0, 6);
  }, [searchQ, places]);

  const studyHref = (concept: string) => `/estudio?concept=${encodeURIComponent(concept)}`;

  return (
    <div className="always-dark fixed inset-0 z-50 overflow-hidden" style={{ background: "#03040a" }} dir={isFa ? "rtl" : "ltr"}>
      <Suspense fallback={<div className="flex h-full items-center justify-center"><p className="animate-pulse font-cinzel text-gold/50">{isFa ? "در حال روشن شدن زمین…" : "Encendiendo la Tierra…"}</p></div>}>
        <Canvas camera={{ position: CAMERA_POS, fov: 45 }} gl={{ antialias: true }} style={{ position: "absolute", inset: 0 }}>
          <color attach="background" args={["#03040a"]} />
          <fogExp2 attach="fog" args={["#03040a", 0.012]} />
          <AtlasScene
            places={places}
            selected={selected}
            activeRoute={activeRoute}
            isFa={isFa}
            onSelect={(id) => { setSelected(id); }}
            onBackground={() => setSelected(null)}
          />
          <EffectComposer>
            <Bloom intensity={0.95} luminanceThreshold={0.2} luminanceSmoothing={0.7} mipmapBlur radius={0.7} />
          </EffectComposer>
        </Canvas>
      </Suspense>

      {/* Título + volver */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between p-4">
        <div>
          <p className="hebrew text-2xl text-gold" style={{ filter: "drop-shadow(0 0 10px #c9a43e55)" }}>{T.title}</p>
          <p className="font-cinzel text-xs uppercase tracking-[0.25em] text-gold/50">{T.subtitle}</p>
          <p className="mt-0.5 font-cinzel text-[9px] uppercase tracking-[0.2em] text-gold/35">
            {places.length} {isFa ? "مکان" : "lugares"}
            {harvestedCount > 0 && <span className="text-gold/55"> · +{harvestedCount} {isFa ? "تازه" : "cosechados"}</span>}
            <span className="text-gold/25"> · {isFa ? "با مطالعه رشد می‌کند" : "crece al estudiar"}</span>
          </p>
        </div>
        <Link href="/" className="pointer-events-auto rounded-full border border-gold/20 bg-ink/80 px-3 py-1.5 font-cinzel text-xs text-muted backdrop-blur-md transition-colors hover:text-gold">
          {isFa ? "→ " : "← "}{T.back}
        </Link>
      </div>

      {/* Buscador */}
      <div className="pointer-events-none absolute inset-x-0 top-16 z-20 flex justify-center px-4">
        <div className="pointer-events-auto w-[min(340px,86vw)]">
          <div className="relative">
            <input
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && suggestions[0]) { setSelected(suggestions[0].id); setSearchQ(""); } if (e.key === "Escape") setSearchQ(""); }}
              placeholder={T.search}
              dir={isFa ? "rtl" : "ltr"}
              style={{ fontFamily: "var(--font-cormorant, serif)" }}
              className="w-full rounded-full border border-gold/25 bg-ink/85 px-4 py-2 pe-9 text-base text-[#e8e4d8] outline-none backdrop-blur-md placeholder:text-muted/40 focus:border-gold/60"
            />
            <span className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-gold/50">⌕</span>
          </div>
          {suggestions.length > 0 && (
            <ul className="mt-1.5 overflow-hidden rounded-2xl border border-gold/15 bg-ink/90 backdrop-blur-md">
              {suggestions.map((p) => (
                <li key={p.id}>
                  <button onClick={() => { setSelected(p.id); setSearchQ(""); }} className="flex w-full items-center gap-2 px-4 py-2 text-start transition-colors hover:bg-gold/10">
                    <span className="inline-block h-2 w-2 shrink-0 rounded-full" style={{ background: REGION_COLORS[p.region], boxShadow: `0 0 6px ${REGION_COLORS[p.region]}` }} />
                    <span className="truncate text-sm text-[#e8e4d8]">{p.es}</span>
                    <span className="ms-auto shrink-0 hebrew text-sm text-muted/60">{p.he}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Leyenda de viajes (clic para resaltar la ruta) */}
      <div className="absolute bottom-4 start-4 z-10 rounded-xl border border-gold/15 bg-ink/85 p-3 backdrop-blur-md">
        <p className="mb-1.5 font-cinzel text-[10px] uppercase tracking-[0.2em] text-gold/45">{T.routes}</p>
        <div className="flex flex-col gap-0.5">
          {ROUTES.map((r) => {
            const on = activeRoute === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setActiveRoute((p) => (p === r.id ? null : r.id))}
                aria-pressed={on}
                className={`flex items-center gap-2 rounded-md px-2 py-1 text-start transition-colors ${on ? "bg-gold/15" : "hover:bg-gold/10"}`}
              >
                <span className="inline-block h-2.5 w-4 shrink-0 rounded-full" style={{ background: r.color, boxShadow: `0 0 8px ${r.color}` }} />
                <span className={`text-[13px] leading-tight ${on ? "font-medium text-parchment" : "text-muted/85"}`}>{r.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hint */}
      <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 hidden -translate-x-1/2 sm:block">
        <p className="font-cinzel text-[9px] uppercase tracking-[0.25em] text-gold/25">{T.hint}</p>
      </div>

      {/* Panel del lugar seleccionado */}
      {selPlace && (
        <div className="absolute bottom-4 end-4 z-20 max-h-[70vh] w-[min(320px,88vw)] overflow-y-auto rounded-2xl border border-gold/25 bg-ink/92 p-4 backdrop-blur-md">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-cinzel text-lg" style={{ color: REGION_COLORS[selPlace.region] ?? "#c9a43e" }}>{selPlace.es}</p>
              <p className="hebrew text-base text-muted">{selPlace.he}</p>
            </div>
            <button onClick={() => setSelected(null)} aria-label={isFa ? "بستن" : "cerrar"} className="-me-1 -mt-1 shrink-0 rounded-full px-2 py-0.5 text-lg leading-none text-muted/50 transition-colors hover:text-gold">×</button>
          </div>
          <p className="mt-1 text-[10px] uppercase tracking-wide text-muted/50">{selPlace.period}{selPlace.sefira ? ` · ${selPlace.sefira}` : ""}</p>
          <p className="mt-2 text-sm leading-snug text-parchment/90" style={{ fontFamily: "var(--font-cormorant, serif)" }}>{selPlace.desc}</p>

          {selPlace.figures.length > 0 && (
            <>
              <p className="mb-1 mt-3 font-cinzel text-[10px] uppercase tracking-wide text-gold/55">{T.figures}</p>
              <div className="flex flex-wrap gap-1.5">
                {selPlace.figures.map((f) => (
                  <a key={f} href={`/${locale}${studyHref(f)}`} className="rounded-full border border-gold/25 bg-gold/[0.06] px-2.5 py-0.5 text-[12px] text-parchment transition-colors hover:border-gold/60 hover:bg-gold/15">{f}</a>
                ))}
              </div>
            </>
          )}

          <p className="mb-1 mt-3 font-cinzel text-[10px] uppercase tracking-wide text-gold/55">{T.refsT}</p>
          <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[12px] text-muted/80">
            {selPlace.refs.map((r) => (<span key={r}>{r}</span>))}
          </div>

          {selPlace.warn && (
            <p className="mt-3 rounded-lg border border-amber-400/15 bg-amber-400/[0.05] px-2.5 py-1.5 text-[11px] italic leading-snug text-amber-200/70">⚠ {selPlace.warn}</p>
          )}

          <a href={`/${locale}${studyHref(selPlace.es)}`} className="mt-3 block rounded-full border border-gold/30 bg-gold/[0.07] px-4 py-2 text-center font-cinzel text-xs uppercase tracking-widest text-gold transition-all hover:border-gold/60 hover:bg-gold/15">{T.study}</a>
        </div>
      )}
    </div>
  );
}
