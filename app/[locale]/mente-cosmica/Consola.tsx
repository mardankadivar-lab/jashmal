"use client";

// ═══════════════════════════════════════════════════════════════════════════
// Consola — EL ÚNICO panel de control del Universo (carga cognitiva mínima).
// Reemplaza la leyenda (abajo-izq) + la tarjeta de nodo (abajo-der) + el panel
// de comparación + la tarjeta de Gilgul, todo en UN componente responsive:
//   · Escritorio → panel anclado abajo-izquierda.
//   · Móvil      → HOJA INFERIOR (bottom sheet) con asa, deslizable, en la zona
//                  del pulgar; targets ≥44px.
// Vistas (según el estado): Gilgul ▸ Comparación ▸ Nodo ▸ Reposo (leyenda).
// La Consola NO tiene lógica de datos: recibe todo ya calculado por page.tsx y
// solo dibuja + emite intenciones (callbacks). Modular y trilingüe (es/fa/en).
// ═══════════════════════════════════════════════════════════════════════════

import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { BRAIN_CATS, catLabel, nodeLabel, type BNode } from "@/lib/brainData";
import { directionalLabelFor, type OrientedEdgeData } from "@/lib/edgeData";

type Cat = { c: string; label: string; labelFa?: string; labelEn?: string };

// Ficha de la relación activa (nodo origen → nodo en foco) — contexto V3.
export type ContextInfo = {
  fromId: string;
  fromLabel: string;
  kind: "solid" | "interp";
  curated: OrientedEdgeData | null;
};

// Ficha del panel de CONEXIÓN (clic en una arista / "ver conexión").
export type EdgeInfo = {
  fromId: string;
  toId: string;
  fromLabel: string;
  toLabel: string;
  kind: "solid" | "interp";
  curated: OrientedEdgeData | null;
  studyHref: string;
  canTravel: boolean;
};

// Tipos de relación conocidos → etiqueta humana trilingüe (fallback: el slug).
const REL_TYPE_LABELS: Record<string, { es: string; fa: string; en: string }> = {
  sefirotic_attribute: { es: "correspondencia sefirótica", fa: "تناظر سفیروتی", en: "sefirotic correspondence" },
  mystical_identity: { es: "identidad mística", fa: "این‌همانیِ عرفانی", en: "mystical identity" },
  textual_source: { es: "fuente textual", fa: "منبع متنی", en: "textual source" },
  family: { es: "vínculo familiar", fa: "پیوند خانوادگی", en: "family bond" },
};
function relTypeLabel(t: string, isFa: boolean, locale: string): string {
  const k = REL_TYPE_LABELS[t];
  if (k) return isFa ? k.fa : locale === "en" ? k.en : k.es;
  return t.replace(/_/g, " ");
}

export type ConsolaProps = {
  isFa: boolean;
  locale: string;
  isMobile: boolean;
  traveling: boolean; // hay un viaje de cámara en curso (o pedido) → apartar la Consola

  // ── leyenda / galaxias (reposo) ──
  cats: [string, Cat][];
  activeCat: string | null;
  onToggleCat: (key: string) => void;
  onFocusSearch: () => void;

  // ── nodo seleccionado ──
  selNode: BNode | null;
  selConnections: { total: number; byCat: Record<string, number>; solid: number; interp: number } | null;
  filterCat: string | null;
  onFilterCat: (cat: string | null) => void;
  destinations: { id: string; label: string; cat: string }[];
  onTravelTo: (id: string) => void;
  onExpand: () => void;
  expanding: boolean;
  studyConcept: string;
  studyUrl: string | null;

  // ── historial / migaja ──
  canBack: boolean;
  canForward: boolean;
  breadcrumb: { id: string; label: string }[];
  currentIndex: number;
  onBack: () => void;
  onForward: () => void;
  onJump: (index: number) => void;

  // ── contexto relacional (V3): camino activo + relación con el nodo origen ──
  pathCrumb: { id: string; label: string }[]; // breadcrumb contextual (controla el contexto)
  contextInfo: ContextInfo | null;            // relación origen→foco (curaduría si existe)
  connStudyHref: string | null;               // href del estudio contextual
  onJumpPath: (i: number) => void;            // truncar el camino y volver a ese paso
  onResetContext: () => void;                 // olvidar el camino (el nodo queda en general)
  onOpenContextEdge: () => void;              // abrir el panel de la conexión origen→foco

  // ── panel de CONEXIÓN (clic en arista / "ver conexión") ──
  edgeInfo: EdgeInfo | null;
  onCloseEdge: () => void;
  onTravelEdge: () => void;

  // ── salir ──
  onExit: () => void;

  // ── comparación ──
  compare: string[];
  compareShared: string[];
  labelOf: (id: string) => string;
  onPickShared: (id: string) => void;
  onRemoveCompare: (id: string) => void;

  // ── gilgul ──
  gilgulInfo: { label: string; vessels: number; source: string; provisional: boolean } | null;
  gilgulMode: "journey" | "tree";
  onToggleGilgulMode: () => void;
};

const PEEK = 78; // altura visible (px) de la hoja cuando está colapsada

export default function Consola(props: ConsolaProps) {
  const {
    isFa,
    locale,
    isMobile,
    traveling,
    cats,
    activeCat,
    onToggleCat,
    onFocusSearch,
    selNode,
    selConnections,
    filterCat,
    onFilterCat,
    destinations,
    onTravelTo,
    onExpand,
    expanding,
    studyConcept,
    studyUrl,
    canBack,
    canForward,
    breadcrumb,
    currentIndex,
    onBack,
    onForward,
    onJump,
    pathCrumb,
    contextInfo,
    connStudyHref,
    onJumpPath,
    onResetContext,
    onOpenContextEdge,
    edgeInfo,
    onCloseEdge,
    onTravelEdge,
    onExit,
    compare,
    compareShared,
    labelOf,
    onPickShared,
    onRemoveCompare,
    gilgulInfo,
    gilgulMode,
    onToggleGilgulMode,
  } = props;

  const dir = isFa ? "rtl" : "ltr";
  const tri = (es: string, fa: string, en: string) => (isFa ? fa : locale === "en" ? en : es);

  // qué vista toca (prioridad: gilgul ▸ comparación ▸ conexión ▸ nodo ▸ reposo)
  const view: "gilgul" | "compare" | "edge" | "node" | "idle" = gilgulInfo
    ? "gilgul"
    : compare.length > 0
      ? "compare"
      : edgeInfo
        ? "edge"
        : selNode
          ? "node"
          : "idle";
  const focusActive = view !== "idle";

  // ── hoja inferior (móvil): abrir/cerrar + arrastre del asa ──
  const [open, setOpen] = useState(false);
  // "tucked" = la Consola se APARTA durante un viaje (y al llegar) para no tapar
  // la grabación del vuelo. Solo el usuario la vuelve a subir (asa en móvil /
  // pastilla en escritorio); no se auto-sube al enfocar el nodo de destino.
  const [tucked, setTucked] = useState(false);
  const wasTraveling = useRef(false);
  // al ARRANCAR un viaje: baja la hoja y entra en modo "apartada"
  useEffect(() => {
    if (traveling && !wasTraveling.current) {
      setOpen(false);
      setTucked(true);
    }
    wasTraveling.current = traveling;
  }, [traveling]);
  // al enfocar algo nuevo (nodo / comparación / gilgul) la hoja sube sola — SALVO
  // mientras viaja o está "apartada" (recién llegado): ahí manda el usuario.
  useEffect(() => {
    if (tucked || traveling) return;
    if (focusActive) setOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tucked, traveling, focusActive, selNode?.id, compare.length, gilgulInfo?.label, edgeInfo?.fromId, edgeInfo?.toId]);
  // el usuario la sube a mano (asa en móvil · pastilla en escritorio)
  const raise = () => { setTucked(false); setOpen(true); };
  const dragStartY = useRef<number | null>(null);
  const onHandleDown = (e: React.PointerEvent) => {
    dragStartY.current = e.clientY;
  };
  const onHandleUp = (e: React.PointerEvent) => {
    const start = dragStartY.current;
    dragStartY.current = null;
    if (start == null) return;
    const dy = e.clientY - start;
    if (Math.abs(dy) < 8) {
      setOpen((o) => { const next = !o; if (next) setTucked(false); return next; }); // toque = alternar (subir = des-apartar)
      return;
    }
    const willOpen = dy < 0; // arrastrar arriba abre, abajo cierra
    if (willOpen) setTucked(false);
    setOpen(willOpen);
  };

  const iconBtn = `flex shrink-0 items-center justify-center rounded-full text-muted/60 transition-colors hover:text-gold ${
    isMobile ? "h-11 w-11 text-xl" : "h-7 w-7 text-base"
  }`;
  const studyBtn =
    "flex-1 rounded-full border border-gold/30 bg-gold/[0.07] px-3 py-2 text-center font-cinzel text-xs uppercase tracking-widest text-gold transition-all hover:border-gold/60 hover:bg-gold/15";
  const chipPad = isMobile ? "py-1.5" : "py-1";
  const rowPad = isMobile ? "py-2.5" : "py-1";

  const catColor = selNode ? BRAIN_CATS[selNode.cat]?.c ?? "#c9a43e" : "#c9a43e";
  const discLabel = selNode ? catLabel(selNode.cat === "torah" ? "tanakh" : selNode.cat, locale) : "";

  // ── línea de "peek" (lo que se ve con la hoja colapsada) ──
  const peekLine = (() => {
    if (view === "gilgul")
      return (
        <span className="flex items-center gap-2 text-sm" style={{ color: "#ffe9a8" }}>
          <span style={{ color: "#ffd66b" }}>✦</span>
          {tri("Linaje", "تبار", "Lineage")}: {gilgulInfo!.label}
        </span>
      );
    if (view === "compare")
      return (
        <span className="text-sm text-cyan-200/90">
          {tri("Comparando", "مقایسه", "Comparing")} ({compare.length})
        </span>
      );
    if (view === "edge" && edgeInfo)
      return (
        <span className="flex items-center gap-1.5 text-sm text-parchment/90">
          <span className="text-gold/70">⟡</span>
          <span className="truncate">
            {edgeInfo.fromLabel} {isFa ? "←" : "→"} {edgeInfo.toLabel}
          </span>
        </span>
      );
    if (view === "node")
      return (
        <span className="flex items-center gap-2 text-sm">
          <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: catColor, boxShadow: `0 0 8px ${catColor}` }} />
          <span className="truncate font-cinzel" style={{ color: catColor }}>
            {nodeLabel(selNode!, locale)}
          </span>
        </span>
      );
    return (
      <span className="font-cinzel text-[11px] uppercase tracking-[0.2em] text-gold/55">
        {tri("Dominios del saber", "دامنه‌های دانش", "Domains of knowledge")}
      </span>
    );
  })();

  // ════════════════ VISTAS ════════════════

  const IdleView = (
    <div className="py-1">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="font-cinzel text-[10px] uppercase tracking-[0.2em] text-gold/45">
          {tri("Dominios del saber", "دامنه‌های دانش", "Domains of knowledge")}
        </p>
        <button
          onClick={onFocusSearch}
          className={`flex items-center gap-1 rounded-full border border-gold/25 px-2.5 ${chipPad} text-[11px] text-gold/80 transition-colors hover:bg-gold/10`}
        >
          <span>⌕</span>
          {tri("Buscar", "جستجو", "Search")}
        </button>
      </div>
      <div className="grid grid-cols-2 gap-x-1.5 gap-y-0.5">
        {cats.map(([key, v]) => {
          const on = activeCat === key;
          return (
            <button
              key={key}
              onClick={() => onToggleCat(key)}
              aria-pressed={on}
              className={`flex items-center gap-2 rounded-md px-2 ${rowPad} text-start transition-colors ${on ? "bg-gold/15" : "hover:bg-gold/10"}`}
            >
              <span className="inline-block h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: v.c, boxShadow: `0 0 8px ${v.c}` }} />
              <span className={`text-[13px] leading-tight ${on ? "font-medium text-parchment" : "text-muted/85"}`}>{nodeLabel(v, locale)}</span>
            </button>
          );
        })}
      </div>
      {activeCat && (
        <p className="mt-2 text-[11px] italic leading-snug text-muted/60">
          {tri("Toca un punto encendido para entrar en él.", "برای ورود، روی یک نقطهٔ روشن بزن.", "Tap a lit point to enter it.")}
        </p>
      )}
    </div>
  );

  const byCatSorted = selConnections ? Object.entries(selConnections.byCat).sort((a, b) => b[1] - a[1]) : [];
  const filterColor = filterCat ? BRAIN_CATS[filterCat]?.c ?? "#c9a43e" : "#c9a43e";

  const NodeView = selNode && (
    <div className="py-0.5">
      {/* encabezado: ← volver · nombre · → adelante · × salir */}
      <div className="flex items-start gap-1.5">
        {canBack && (
          <button onClick={onBack} aria-label={tri("Volver", "بازگشت", "Back")} className={iconBtn}>
            {isFa ? "→" : "←"}
          </button>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: catColor, boxShadow: `0 0 8px ${catColor}` }} />
            <p className="truncate font-cinzel text-base" style={{ color: catColor }}>
              {nodeLabel(selNode, locale)}
            </p>
          </div>
          <p className="mt-0.5 ps-[18px] text-[10px] uppercase tracking-wide text-muted/50">{discLabel}</p>
          {/* subtítulo contextual (V3): de dónde viene el estudiante */}
          {contextInfo && (
            <p className="mt-0.5 ps-[18px] text-[10px] italic text-gold/60">
              {tri("Conectado desde", "پیوسته از", "Connected from")} {contextInfo.fromLabel}
            </p>
          )}
        </div>
        {canForward && (
          <button onClick={onForward} aria-label={tri("Adelante", "جلو", "Forward")} className={iconBtn}>
            {isFa ? "←" : "→"}
          </button>
        )}
        <button onClick={onExit} aria-label={tri("Salir", "خروج", "Exit")} className={`${iconBtn} text-lg`}>
          ×
        </button>
      </div>

      {selNode.author && <p className="mt-1 ps-[18px] text-[11px] italic text-rose-200/80">✦ {tri("por", "از", "by")} {selNode.author}</p>}

      {/* ── CONTEXTO RELACIONAL (V3): breadcrumb que CONTROLA el contexto ── */}
      {contextInfo && pathCrumb.length > 1 ? (
        <div className="mt-2.5 rounded-lg border border-gold/20 bg-gold/[0.05] p-2.5">
          <p className="mb-1 font-cinzel text-[9px] uppercase tracking-[0.18em] text-gold/55">
            {tri("Estás estudiando la ruta", "در حال مطالعهٔ این مسیر", "You are studying the route")}
          </p>
          {/* cada paso TRUNCA el camino hasta él (no es decoración) */}
          <div className="flex flex-wrap items-center gap-x-0.5 gap-y-1 text-[12px]">
            {pathCrumb.map((b, i) => (
              <span key={b.id + ":" + i} className="flex items-center gap-0.5">
                {i > 0 && <span className="px-0.5 text-gold/45">{isFa ? "←" : "→"}</span>}
                <button
                  onClick={() => onJumpPath(i)}
                  className={`max-w-[118px] truncate rounded px-1 transition-colors ${
                    i === pathCrumb.length - 1
                      ? "font-medium text-gold"
                      : "text-parchment/70 hover:text-gold"
                  }`}
                >
                  {b.label}
                </button>
              </span>
            ))}
          </div>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            <button
              onClick={() => onJumpPath(pathCrumb.length - 2)}
              className={`rounded-full border border-gold/25 px-2.5 ${chipPad} text-[10px] text-gold/85 transition-colors hover:bg-gold/10`}
            >
              {isFa ? "→" : "←"} {tri("Volver a", "بازگشت به", "Back to")} {contextInfo.fromLabel}
            </button>
            <button
              onClick={onResetContext}
              className={`rounded-full border border-gold/15 px-2.5 ${chipPad} text-[10px] text-muted/70 transition-colors hover:text-gold`}
              title={tri(
                "Olvidar el camino: el nodo se queda abierto en modo general",
                "فراموش‌کردن مسیر: گره در حالت کلی باز می‌ماند",
                "Forget the path: the node stays open in general mode",
              )}
            >
              ⟲ {tri("Reiniciar contexto", "بازنشانی زمینه", "Reset context")}
            </button>
          </div>
        </div>
      ) : (
        /* migaja del historial: el camino recorrido (reconocer, no recordar) */
        breadcrumb.length > 1 && (
          <div className="mt-2 flex flex-wrap items-center gap-x-0.5 gap-y-1 text-[11px]">
            {breadcrumb.map((b, i) => (
              <span key={b.id + ":" + i} className="flex items-center gap-0.5">
                {i > 0 && <span className="px-0.5 text-muted/35">{isFa ? "‹" : "›"}</span>}
                <button
                  onClick={() => onJump(i)}
                  className={`max-w-[118px] truncate rounded px-1 transition-colors ${i === currentIndex ? "font-medium text-gold" : "text-muted/55 hover:text-parchment"}`}
                >
                  {b.label}
                </button>
              </span>
            ))}
          </div>
        )
      )}

      {/* ── "¿Por qué {origen} está conectado con {foco}?" — la relación ── */}
      {contextInfo && selNode && (
        <div className="mt-2.5 rounded-lg border border-gold/15 bg-white/[0.02] p-2.5">
          <div className="flex items-start justify-between gap-2">
            <p className="text-[11px] font-medium leading-snug text-parchment/90">
              {tri(
                `¿Por qué ${contextInfo.fromLabel} está conectado con ${nodeLabel(selNode, locale)}?`,
                `چرا ${contextInfo.fromLabel} با ${nodeLabel(selNode, locale)} پیوند دارد؟`,
                `Why is ${contextInfo.fromLabel} connected to ${nodeLabel(selNode, locale)}?`,
              )}
            </p>
            <button
              onClick={onOpenContextEdge}
              className="shrink-0 rounded-full border border-gold/25 px-2 py-0.5 text-[10px] text-gold/80 transition-colors hover:bg-gold/10"
              title={tri("Abrir la ficha de esta conexión", "بازکردن برگهٔ این پیوند", "Open this connection's card")}
            >
              ⟡ {tri("Ver", "دیدن", "View")}
            </button>
          </div>
          {contextInfo.curated ? (
            <>
              <p className="mt-1.5 text-[11px] italic leading-snug text-gold/85">
                «{directionalLabelFor(contextInfo.curated)}»
              </p>
              <p className="mt-1 text-[11px] leading-snug text-parchment/75">
                {contextInfo.curated.data.short_explanation}
              </p>
              {contextInfo.curated.data.source_refs.length > 0 && (
                <p className="mt-1.5 text-[10px] leading-snug text-muted/75">
                  <span className="font-cinzel uppercase tracking-wide text-gold/45">
                    {tri("Fuentes", "منابع", "Sources")}:
                  </span>{" "}
                  {contextInfo.curated.data.source_refs
                    .map((r) => (r.ref ? `${r.text} (${r.ref})` : r.text))
                    .join(" · ")}
                </p>
              )}
              {contextInfo.curated.data.keywords.length > 0 && (
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {contextInfo.curated.data.keywords.slice(0, 6).map((k) => (
                    <span key={k} className="rounded-full bg-gold/[0.08] px-1.5 py-0.5 text-[9px] text-gold/70">
                      {k}
                    </span>
                  ))}
                </div>
              )}
              {contextInfo.curated.data.needs_review && (
                <p className="mt-1.5 text-[9px] italic text-amber-200/70">
                  {tri(
                    "Curaduría preliminar — en revisión del Sofer.",
                    "تنظیم مقدماتی — در بازبینی سوفر.",
                    "Preliminary curation — under Sofer review.",
                  )}
                </p>
              )}
            </>
          ) : (
            /* HONESTIDAD (espec V3): sin curaduría NO se inventan fuentes */
            <p className="mt-1.5 text-[11px] italic leading-snug text-muted/65">
              {tri(
                "Esta conexión todavía necesita desarrollo. El Sofer la está curando — las fuentes llegarán pronto.",
                "این پیوند هنوز به پرورش نیاز دارد. سوفر در حال تنظیم آن است — منابع به‌زودی می‌رسند.",
                "This connection still needs development. The Sofer is curating it — sources are coming soon.",
              )}
            </p>
          )}
        </div>
      )}

      {/* conexiones + CHIPS-FILTRO por disciplina */}
      {selConnections && selConnections.total > 0 && (
        <div className="mt-2.5 border-t border-gold/10 pt-2.5">
          <p className="mb-1 text-[11px] text-parchment/80">
            <span className="font-cinzel text-sm text-gold">{selConnections.total}</span>{" "}
            {isFa ? "اتصال" : locale === "en" ? (selConnections.total === 1 ? "connection" : "connections") : selConnections.total === 1 ? "conexión" : "conexiones"}
          </p>
          {(selConnections.solid > 0 || selConnections.interp > 0) && (
            <p
              className="mb-2 text-[10px] text-muted/70"
              title={tri("Clásicas = fuente directa · Interpretativas = lectura", "کلاسیک = منبع مستقیم · تفسیری = خوانش", "Classic = direct source · Interpretive = reading")}
            >
              <span className="text-gold/90">{selConnections.solid}</span> {tri("clásicas", "کلاسیک", "classic")}
              <span className="text-muted/40"> · </span>
              <span className="text-parchment/55">{selConnections.interp}</span> {tri("interpretativas", "تفسیری", "interpretive")}
            </p>
          )}
          <p className="mb-1.5 text-[10px] uppercase tracking-wide text-gold/40">
            {tri("Filtra una disciplina y viaja", "یک دامنه را فیلتر کن و سفر کن", "Filter a domain & travel")}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {byCatSorted.map(([cat, n]) => {
              const on = filterCat === cat;
              const cc = BRAIN_CATS[cat]?.c ?? "#c9a43e";
              return (
                <button
                  key={cat}
                  onClick={() => onFilterCat(on ? null : cat)}
                  aria-pressed={on}
                  className={`flex items-center gap-1.5 rounded-full border px-2.5 ${chipPad} text-[11px] transition-colors`}
                  style={{
                    borderColor: on ? cc : "rgba(201,164,62,0.22)",
                    background: on ? `${cc}22` : "transparent",
                    color: on ? "#fff7e6" : "#b2ac9f",
                  }}
                >
                  <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: cc }} />
                  {catLabel(cat, locale)} <span className="opacity-70">{n}</span>
                </button>
              );
            })}
          </div>

          {/* destinos del filtro: elegir dirección y VIAJAR a esa galaxia */}
          {filterCat && (
            <div className="mt-2.5 rounded-lg border border-gold/15 bg-gold/[0.04] p-2">
              <p className="mb-1.5 text-[10px] text-parchment/70">
                {tri("Viajar a", "سفر به", "Travel to")} <span style={{ color: filterColor }}>{catLabel(filterCat, locale)}</span>:
              </p>
              {destinations.length === 0 ? (
                <p className="text-[11px] italic text-muted/50">—</p>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {destinations.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => onTravelTo(d.id)}
                      className={`rounded-full border border-gold/30 bg-gold/10 px-2.5 ${chipPad} text-[11px] text-gold transition-colors hover:bg-gold/20`}
                    >
                      {isFa ? "←" : "→"} {d.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* acciones: con CONTEXTO el estudio de la RELACIÓN es el principal (espec
          V3); el general queda como opción secundaria EXPLÍCITA. Sin contexto,
          todo sigue como siempre (un solo botón Estudiar). */}
      {contextInfo && connStudyHref ? (
        <>
          <Link
            href={connStudyHref}
            className="mt-3 block w-full rounded-full border border-gold/60 bg-gold/15 px-3 py-2.5 text-center font-cinzel text-xs uppercase tracking-widest text-gold transition-all hover:border-gold hover:bg-gold/25"
            style={{ boxShadow: "0 0 14px rgba(201,164,62,0.18)" }}
          >
            {tri(
              `Estudiar ${nodeLabel(selNode, locale)} en relación con ${contextInfo.fromLabel}`,
              `مطالعهٔ ${nodeLabel(selNode, locale)} در پیوند با ${contextInfo.fromLabel}`,
              `Study ${nodeLabel(selNode, locale)} in relation to ${contextInfo.fromLabel}`,
            )}{" "}
            {isFa ? "←" : "→"}
          </Link>
          <div className="mt-2 flex gap-2">
            <button
              onClick={onExpand}
              disabled={expanding}
              className="flex-1 rounded-full border border-cyan-300/30 bg-cyan-300/[0.06] px-3 py-2 text-center font-cinzel text-xs uppercase tracking-widest text-cyan-200/90 transition-all hover:border-cyan-300/60 hover:bg-cyan-300/15 disabled:opacity-50"
              title={tri("El Sofer investiga este tema y abre sus conexiones", "سوفر این موضوع را می‌کاود", "The Sofer researches this topic")}
            >
              {expanding ? tri("Investigando…", "در حال پژوهش…", "Researching…") : tri("✦ Expandir", "✦ گسترش", "✦ Expand")}
            </button>
            {studyUrl ? (
              <a
                href={"https://jashmal.org" + studyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-full border border-gold/20 px-3 py-2 text-center font-cinzel text-[11px] uppercase tracking-widest text-muted/80 transition-all hover:border-gold/50 hover:text-gold"
              >
                {tri("Estudiar en general", "مطالعهٔ کلی", "Study in general")}
              </a>
            ) : (
              <Link
                href={`/estudio?concept=${encodeURIComponent(studyConcept)}`}
                className="flex-1 rounded-full border border-gold/20 px-3 py-2 text-center font-cinzel text-[11px] uppercase tracking-widest text-muted/80 transition-all hover:border-gold/50 hover:text-gold"
              >
                {tri("Estudiar en general", "مطالعهٔ کلی", "Study in general")}
              </Link>
            )}
          </div>
        </>
      ) : (
        <div className="mt-3 flex gap-2">
          <button
            onClick={onExpand}
            disabled={expanding}
            className="flex-1 rounded-full border border-cyan-300/30 bg-cyan-300/[0.06] px-3 py-2 text-center font-cinzel text-xs uppercase tracking-widest text-cyan-200/90 transition-all hover:border-cyan-300/60 hover:bg-cyan-300/15 disabled:opacity-50"
            title={tri("El Sofer investiga este tema y abre sus conexiones", "سوفر این موضوع را می‌کاود", "The Sofer researches this topic")}
          >
            {expanding ? tri("Investigando…", "در حال پژوهش…", "Researching…") : tri("✦ Expandir", "✦ گسترش", "✦ Expand")}
          </button>
          {studyUrl ? (
            <a href={"https://jashmal.org" + studyUrl} target="_blank" rel="noopener noreferrer" className={studyBtn}>
              {tri("Estudiar →", "مطالعه ←", "Study →")}
            </a>
          ) : (
            <Link href={`/estudio?concept=${encodeURIComponent(studyConcept)}`} className={studyBtn}>
              {tri("Estudiar →", "مطالعه ←", "Study →")}
            </Link>
          )}
        </div>
      )}
    </div>
  );

  const CompareView = (
    <div className="py-0.5">
      <div className="flex items-center justify-between">
        <p className="font-cinzel text-sm uppercase tracking-wide text-cyan-200/90">{tri("Comparando", "مقایسه", "Comparing")}</p>
        <button onClick={onExit} className="text-[10px] uppercase tracking-wide text-muted/60 transition-colors hover:text-gold">
          {tri("limpiar", "پاک کردن", "clear")}
        </button>
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {compare.map((id) => (
          <span key={id} className="inline-flex items-center gap-1 rounded-full border border-gold/25 bg-gold/[0.06] px-2 py-0.5 text-[11px] text-parchment">
            {labelOf(id)}
            <button onClick={() => onRemoveCompare(id)} className="text-muted/60 transition-colors hover:text-rose-300" aria-label={tri("quitar", "حذف", "remove")}>
              ×
            </button>
          </span>
        ))}
      </div>
      {compare.length < 2 ? (
        <p className="mt-3 text-[11px] italic leading-snug text-muted/60">
          {tri("Cmd/Ctrl + clic en otro tema para comparar", "با Cmd/Ctrl روی موضوع دیگری کلیک کن تا مقایسه شود", "Cmd/Ctrl + click another topic to compare")}
        </p>
      ) : (
        <>
          <p className="mb-1 mt-3 font-cinzel text-[10px] uppercase tracking-wide text-gold/60">{tri("Comparten", "مشترک", "Shared")}</p>
          {compareShared.length === 0 ? (
            <p className="text-[11px] italic leading-snug text-muted/50">
              {tri("Sin coincidencia directa (toca ✦ Expandir para descubrir)", "اشتراک مستقیمی نیست (✦ گسترش بزن)", "No direct overlap (tap ✦ Expand to discover)")}
            </p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {compareShared.map((id) => (
                <button key={id} onClick={() => onPickShared(id)} className="rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 text-[11px] text-gold transition-colors hover:bg-gold/20">
                  {labelOf(id)}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );

  const GilgulView = gilgulInfo && (
    <div className="py-0.5">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-cinzel text-[10px] uppercase tracking-[0.2em]" style={{ color: "#ffd66b" }}>
            {tri("✦ Linaje del alma", "✦ تبارِ روح", "✦ Soul lineage")}
          </p>
          <p className="mt-0.5 font-cinzel text-base" style={{ color: "#ffe9a8" }}>
            {gilgulInfo.label}
          </p>
        </div>
        <button onClick={onExit} aria-label={tri("cerrar", "بستن", "close")} className={`${iconBtn} text-lg`}>
          ×
        </button>
      </div>

      <p className="mt-2 text-[12px] italic leading-snug text-parchment/80">
        {tri(
          "Mira la chispa del alma emerger de la raíz y viajar de vasija en vasija a través de las generaciones.",
          "جرقهٔ روح را تماشا کن که از ریشه برمی‌خیزد و نسل به نسل سفر می‌کند.",
          "Watch the soul-spark rise from the root and travel from vessel to vessel through the generations.",
        )}
      </p>

      <div className="mt-3 border-t border-gold/10 pt-2.5 text-[11px] text-muted/85">
        <p>
          <span className="font-cinzel" style={{ color: "#ffd66b" }}>{gilgulInfo.vessels}</span>{" "}
          {isFa ? "ظرفِ روح" : locale === "en" ? (gilgulInfo.vessels === 1 ? "vessel" : "vessels") : gilgulInfo.vessels === 1 ? "vasija" : "vasijas"}
        </p>
        <p className="mt-0.5">
          <span className="opacity-60">{tri("Fuente: ", "منبع: ", "Source: ")}</span>
          {gilgulInfo.source}
        </p>
      </div>

      <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1 border-t border-gold/10 pt-2.5">
        {(
          [
            ["#ffd66b", tri("directo", "تصریح‌شده", "direct")],
            ["#f0b85a", tri("tradición", "سنتی", "tradition")],
            ["#9fd0ff", tri("gematría", "گِماتریا", "gematria")],
          ] as const
        ).map(([col, lbl]) => (
          <span key={lbl} className="flex items-center gap-1.5 text-[10px] text-muted/80">
            <span className="inline-block h-2 w-4 rounded-full" style={{ background: col, boxShadow: `0 0 7px ${col}` }} />
            {lbl}
          </span>
        ))}
      </div>

      <button
        onClick={onToggleGilgulMode}
        className="mt-3 w-full rounded-md border px-3 py-2 font-cinzel text-[11px] uppercase tracking-[0.14em] transition-colors"
        style={{
          borderColor: gilgulMode === "tree" ? "rgba(255,214,107,0.6)" : "rgba(255,214,107,0.3)",
          background: gilgulMode === "tree" ? "rgba(255,214,107,0.14)" : "rgba(255,214,107,0.05)",
          color: "#ffe9a8",
        }}
      >
        {gilgulMode === "tree"
          ? tri("↩ Volver al viaje", "↩ بازگشت به سفر", "↩ Back to the journey")
          : tri("✸ Mostrar árbol de almas completo", "✸ نمایش کاملِ درختِ ارواح", "✸ Show full soul-tree")}
      </button>

      {gilgulInfo.provisional && (
        <p className="mt-2.5 rounded-md border border-amber-300/20 bg-amber-300/[0.06] px-2 py-1.5 text-[10px] italic leading-snug text-amber-200/80">
          {tri(
            "Cadena de muestra (provisional) — se reemplazará por el dataset verificado del Sofer.",
            "زنجیرهٔ نمونه (موقت) — به‌زودی با مجموعهٔ تأییدشدهٔ سوفر جایگزین می‌شود.",
            "Sample chain (provisional) — to be replaced by the Sofer's verified dataset.",
          )}
        </p>
      )}
    </div>
  );

  // ── Vista de CONEXIÓN (V3): la sinapsis tiene contenido propio ──
  // Clic en una arista (o "Ver" en el panel del nodo) abre esta ficha: tipo,
  // lectura direccional, explicación, fuentes, estudiar la relación, viajar.
  const EdgeView = edgeInfo && (
    <div className="py-0.5">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-cinzel text-[10px] uppercase tracking-[0.2em] text-gold/55">
            ⟡ {tri("Conexión", "پیوند", "Connection")}
            <span className="ms-2 normal-case tracking-normal text-muted/55">
              {edgeInfo.kind === "solid"
                ? tri("clásica", "کلاسیک", "classic")
                : tri("interpretativa", "تفسیری", "interpretive")}
            </span>
          </p>
          <p className="mt-1 truncate font-cinzel text-base text-parchment">
            {edgeInfo.fromLabel} <span className="text-gold">{isFa ? "←" : "→"}</span> {edgeInfo.toLabel}
          </p>
          {edgeInfo.curated && (
            <p className="mt-0.5 text-[10px] uppercase tracking-wide text-muted/55">
              {relTypeLabel(edgeInfo.curated.data.relationship_type, isFa, locale)}
            </p>
          )}
        </div>
        <button onClick={onCloseEdge} aria-label={tri("cerrar", "بستن", "close")} className={`${iconBtn} text-lg`}>
          ×
        </button>
      </div>

      {edgeInfo.curated ? (
        <div className="mt-2.5 border-t border-gold/10 pt-2.5">
          <p className="text-[12px] italic leading-snug text-gold/85">
            «{directionalLabelFor(edgeInfo.curated)}»
          </p>
          <p className="mt-1.5 text-[12px] leading-snug text-parchment/85">
            {edgeInfo.curated.data.short_explanation}
          </p>
          {edgeInfo.curated.data.source_refs.length > 0 && (
            <div className="mt-2.5">
              <p className="mb-1 font-cinzel text-[9px] uppercase tracking-[0.18em] text-gold/50">
                {tri("Fuentes", "منابع", "Sources")}
              </p>
              <ul className="space-y-1.5">
                {edgeInfo.curated.data.source_refs.map((r, i) => (
                  <li key={i} className="text-[11px] leading-snug">
                    <span className="text-gold/90">{r.text}</span>
                    {r.ref && <span className="text-parchment/70"> · {r.ref}</span>}
                    <span className="block text-muted/65">{r.reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {edgeInfo.curated.data.keywords.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {edgeInfo.curated.data.keywords.slice(0, 8).map((k) => (
                <span key={k} className="rounded-full bg-gold/[0.08] px-1.5 py-0.5 text-[9px] text-gold/70">
                  {k}
                </span>
              ))}
            </div>
          )}
          {edgeInfo.curated.data.needs_review && (
            <p className="mt-2 rounded-md border border-amber-300/20 bg-amber-300/[0.06] px-2 py-1.5 text-[10px] italic leading-snug text-amber-200/80">
              {tri(
                "Curaduría preliminar — en revisión del Sofer.",
                "تنظیم مقدماتی — در بازبینی سوفر.",
                "Preliminary curation — under Sofer review.",
              )}
            </p>
          )}
        </div>
      ) : (
        /* HONESTIDAD (espec V3): sin curaduría se dice — nunca se finge */
        <div className="mt-2.5 border-t border-gold/10 pt-2.5">
          <p className="text-[12px] italic leading-snug text-muted/70">
            {tri(
              "Esta conexión todavía necesita desarrollo. No hay una fuente específica conectada todavía; el Sofer la está curando.",
              "این پیوند هنوز به پرورش نیاز دارد. هنوز منبع مشخصی به آن متصل نیست؛ سوفر در حال تنظیم آن است.",
              "This connection still needs development. No specific source is attached yet; the Sofer is curating it.",
            )}
          </p>
          <p className="mt-1.5 text-[10px] leading-snug text-muted/50">
            {tri(
              "Puedes abrir un estudio exploratorio de la relación: irá claramente marcado como exploratorio y sin fuentes inventadas.",
              "می‌توانی مطالعه‌ای اکتشافی از این پیوند بگشایی: به‌روشنی «اکتشافی» نشان‌گذاری می‌شود و منبعی جعل نخواهد شد.",
              "You can open an exploratory study of the relation: it will be clearly marked as exploratory, with no invented sources.",
            )}
          </p>
        </div>
      )}

      <Link
        href={edgeInfo.studyHref}
        className="mt-3 block w-full rounded-full border border-gold/60 bg-gold/15 px-3 py-2.5 text-center font-cinzel text-xs uppercase tracking-widest text-gold transition-all hover:border-gold hover:bg-gold/25"
        style={{ boxShadow: "0 0 14px rgba(201,164,62,0.18)" }}
      >
        {edgeInfo.curated
          ? tri("Estudiar esta conexión", "مطالعهٔ این پیوند", "Study this connection")
          : tri("Estudio exploratorio de la conexión", "مطالعهٔ اکتشافی پیوند", "Exploratory study of the connection")}{" "}
        {isFa ? "←" : "→"}
      </Link>
      {edgeInfo.canTravel && (
        <button
          onClick={onTravelEdge}
          className="mt-2 w-full rounded-full border border-gold/25 px-3 py-2 text-center font-cinzel text-[11px] uppercase tracking-widest text-muted/85 transition-all hover:border-gold/60 hover:text-gold"
        >
          {tri("Viajar a", "سفر به", "Travel to")} {edgeInfo.toLabel} {isFa ? "←" : "→"}
        </button>
      )}
    </div>
  );

  const Body = (
    <>
      {view === "gilgul"
        ? GilgulView
        : view === "compare"
          ? CompareView
          : view === "edge"
            ? EdgeView
            : view === "node"
              ? NodeView
              : IdleView}
    </>
  );

  // ── escritorio: panel anclado abajo-izquierda ──
  if (!isMobile) {
    // durante/después de un viaje la Consola se repliega a una PASTILLA (control
    // claro) abajo-izquierda; el usuario la abre al ir a elegir el próximo nodo.
    if (tucked) {
      return (
        <button
          dir={dir}
          onClick={raise}
          aria-label={tri("Abrir la consola", "باز کردن کنسول", "Open console")}
          className="fixed bottom-4 start-4 z-30 flex max-w-[min(344px,92vw)] items-center gap-2 rounded-full border border-gold/25 bg-ink/88 px-4 py-2.5 shadow-[0_8px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-colors hover:border-gold/50"
          style={view === "gilgul" ? { borderColor: "rgba(255,214,107,0.4)" } : undefined}
        >
          <span className="shrink-0 text-gold/55">▴</span>
          {peekLine}
        </button>
      );
    }
    return (
      <div
        dir={dir}
        className="fixed bottom-4 start-4 z-30 max-h-[82vh] w-[min(344px,92vw)] overflow-y-auto rounded-2xl border border-gold/25 bg-ink/88 p-3.5 shadow-[0_8px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl"
        style={focusActive && view === "gilgul" ? { borderColor: "rgba(255,214,107,0.4)", boxShadow: "0 0 26px rgba(255,214,107,0.12)" } : undefined}
      >
        {Body}
      </div>
    );
  }

  // ── móvil: hoja inferior (bottom sheet) con asa ──
  return (
    <div
      dir={dir}
      className="fixed inset-x-0 bottom-0 z-40"
      style={{
        transform: open ? "translateY(0)" : `translateY(calc(100% - ${PEEK}px))`,
        transition: "transform 320ms cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <div
        className="mx-auto flex max-h-[82vh] w-full max-w-[680px] flex-col rounded-t-2xl border border-b-0 border-gold/25 bg-ink/95 shadow-[0_-8px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl"
        style={view === "gilgul" ? { borderColor: "rgba(255,214,107,0.4)" } : undefined}
      >
        {/* asa: tocar = abrir/cerrar · arrastrar arriba/abajo = subir/bajar */}
        <button
          type="button"
          onPointerDown={onHandleDown}
          onPointerUp={onHandleUp}
          aria-label={open ? tri("Bajar el panel", "بستن پنل", "Collapse panel") : tri("Subir el panel", "باز کردن پنل", "Expand panel")}
          aria-expanded={open}
          className="flex w-full touch-none flex-col items-center gap-1 px-4 pt-2"
          style={{ minHeight: PEEK }}
        >
          <span className="mb-1 h-1.5 w-12 rounded-full bg-gold/40" />
          <span className="flex w-full items-center justify-center gap-2 pb-1 text-center">{peekLine}</span>
        </button>
        <div
          className="overflow-y-auto px-4 pb-[max(16px,env(safe-area-inset-bottom))]"
          style={{ overscrollBehavior: "contain" }}
        >
          {Body}
        </div>
      </div>
    </div>
  );
}
