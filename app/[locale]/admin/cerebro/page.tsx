"use client";

// Panel del Sofer — revisar y aprobar las sinapsis/conexiones que el cerebro
// "aprendió" de los estudios (estado 'pending'). Protegido por ADMIN_TOKEN.
// Filtro de duplicados + selección múltiple para curar la cosecha.

import { useState, useEffect, useCallback, useMemo } from "react";

type PNode = { id: string; label: string; cat: string; level: number; url: string | null; source: string | null; dup?: boolean };
type PEdge = { id: string; source_id: string; target_id: string; source_label: string | null; target_label: string | null; origin: string | null };

export default function CerebroAdminPage() {
  const [token, setToken] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [nodes, setNodes] = useState<PNode[]>([]);
  const [edges, setEdges] = useState<PEdge[]>([]);
  const [busy, setBusy] = useState(false);
  const [hideDups, setHideDups] = useState(true);
  const [sel, setSel] = useState<Set<string>>(new Set());

  useEffect(() => {
    const t = localStorage.getItem("jashmal_admin_token");
    if (t) setToken(t);
  }, []);

  const load = useCallback(async (tok: string) => {
    if (!tok) return;
    setLoading(true);
    setErr("");
    try {
      const res = await fetch(`/api/admin/brain?token=${encodeURIComponent(tok)}`);
      if (res.status === 401) {
        setErr("Token incorrecto.");
        setLoading(false);
        return;
      }
      const data = await res.json();
      setNodes(data.nodes ?? []);
      setEdges(data.edges ?? []);
      setSel(new Set());
      setLoaded(true);
      localStorage.setItem("jashmal_admin_token", tok);
    } catch {
      setErr("No se pudo cargar.");
    }
    setLoading(false);
  }, []);

  // nodos visibles (oculta los duplicados si el toggle está activo)
  const visNodes = useMemo(() => (hideDups ? nodes.filter((n) => !n.dup) : nodes), [nodes, hideDups]);
  const dupCount = useMemo(() => nodes.filter((n) => n.dup).length, [nodes]);
  const allVisSelected = visNodes.length > 0 && visNodes.every((n) => sel.has(n.id));

  function toggleSel(id: string) {
    setSel((p) => {
      const s = new Set(p);
      if (s.has(id)) s.delete(id);
      else s.add(id);
      return s;
    });
  }
  function selectAllVisible() {
    setSel(allVisSelected ? new Set() : new Set(visNodes.map((n) => n.id)));
  }

  async function post(body: object) {
    return fetch("/api/admin/brain", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-token": token },
      body: JSON.stringify(body),
    });
  }

  async function act(kind: "node" | "edge", id: string, action: "approve" | "reject") {
    try {
      await post({ kind, id, action });
      if (kind === "node") setNodes((p) => p.filter((n) => n.id !== id));
      else setEdges((p) => p.filter((e) => e.id !== id));
      setSel((p) => {
        const s = new Set(p);
        s.delete(id);
        return s;
      });
    } catch {
      /* ignore */
    }
  }

  // aprobar / rechazar SOLO lo seleccionado
  async function actSelected(action: "approve" | "reject") {
    const ids = [...sel];
    if (!ids.length) return;
    setBusy(true);
    try {
      await post({ action, ids });
      await load(token);
    } catch {
      /* ignore */
    }
    setBusy(false);
  }

  // aprobar / rechazar TODO lo pendiente
  async function actAll(action: "approve" | "reject") {
    const msg =
      action === "approve"
        ? `¿Aprobar TODO lo pendiente? (${nodes.length} sinapsis + ${edges.length} conexiones)`
        : `¿Rechazar TODO lo pendiente (${nodes.length + edges.length})?`;
    if (!confirm(msg)) return;
    setBusy(true);
    try {
      await post({ action, all: true });
      setNodes([]);
      setEdges([]);
      setSel(new Set());
      await load(token);
    } catch {
      /* ignore */
    }
    setBusy(false);
  }

  const total = nodes.length + edges.length;

  return (
    <div className="min-h-screen bg-[#05050a] px-4 py-8 text-[#e8e4d8]" style={{ fontFamily: "var(--font-cormorant, serif)" }}>
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-1 font-cinzel text-2xl text-[#c9a43e]">Panel del Sofer · Cerebro</h1>
        <p className="mb-6 text-sm text-[#9a958a]">
          Aprueba o rechaza lo que el cerebro aprendió de los estudios. Lo aprobado se enciende en{" "}
          <a href="/universo" className="text-[#c9a43e] underline">el cerebro</a>.
        </p>

        {!loaded ? (
          <div className="flex gap-2">
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && load(token)}
              placeholder="Token de administrador"
              className="flex-1 rounded-lg border border-[#c9a43e]/30 bg-black/40 px-3 py-2 text-sm outline-none focus:border-[#c9a43e]/70"
            />
            <button
              onClick={() => load(token)}
              disabled={loading}
              className="rounded-lg border border-[#c9a43e]/40 bg-[#c9a43e]/10 px-4 py-2 font-cinzel text-sm text-[#c9a43e] hover:bg-[#c9a43e]/20"
            >
              {loading ? "..." : "Entrar"}
            </button>
          </div>
        ) : (
          <>
            {/* estado + filtro de duplicados */}
            <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <span className="text-[#9a958a]">
                {busy ? "procesando…" : `${total} pendientes`}
                {dupCount > 0 ? <span className="text-amber-300/70"> · {dupCount} duplicados</span> : null}
              </span>
              <label className="flex cursor-pointer select-none items-center gap-1.5 text-xs text-[#9a958a]">
                <input type="checkbox" checked={hideDups} onChange={(e) => setHideDups(e.target.checked)} className="accent-[#c9a43e]" />
                ocultar duplicados
              </label>
              <button onClick={() => load(token)} className="ms-auto text-xs text-[#c9a43e] underline">
                recargar
              </button>
            </div>

            {/* acciones: selección múltiple + masivas */}
            {total > 0 && (
              <div className="mb-4 flex flex-wrap items-center gap-2">
                {visNodes.length > 0 && (
                  <button onClick={selectAllVisible} className="rounded-md border border-[#c9a43e]/30 px-2.5 py-1 text-xs text-[#c9a43e] hover:bg-[#c9a43e]/10">
                    {allVisSelected ? "deseleccionar" : "seleccionar visibles"}
                  </button>
                )}
                <button
                  onClick={() => actSelected("approve")}
                  disabled={busy || sel.size === 0}
                  className="rounded-md border border-emerald-500/50 bg-emerald-500/10 px-3 py-1.5 font-cinzel text-xs text-emerald-300 hover:bg-emerald-500/20 disabled:opacity-40"
                >
                  ✓ Aprobar seleccionados ({sel.size})
                </button>
                <button
                  onClick={() => actSelected("reject")}
                  disabled={busy || sel.size === 0}
                  className="rounded-md border border-rose-500/40 px-3 py-1.5 font-cinzel text-xs text-rose-300 hover:bg-rose-500/15 disabled:opacity-40"
                >
                  ✗ Rechazar seleccionados
                </button>
                <span className="mx-1 text-[#9a958a]/30">|</span>
                <button onClick={() => actAll("approve")} disabled={busy} className="rounded-md border border-emerald-500/30 px-2.5 py-1 text-xs text-emerald-300/80 hover:bg-emerald-500/10 disabled:opacity-40">
                  Aprobar todo
                </button>
                <button onClick={() => actAll("reject")} disabled={busy} className="rounded-md border border-rose-500/30 px-2.5 py-1 text-xs text-rose-300/80 hover:bg-rose-500/10 disabled:opacity-40">
                  Rechazar todo
                </button>
              </div>
            )}

            {total === 0 && (
              <p className="rounded-lg border border-[#c9a43e]/15 bg-black/30 p-6 text-center text-[#9a958a]">
                No hay nada pendiente. El cerebro está al día. 🧠
              </p>
            )}

            {visNodes.length > 0 && (
              <section className="mb-6">
                <h2 className="mb-2 font-cinzel text-sm uppercase tracking-widest text-[#c9a43e]/60">
                  Sinapsis nuevas ({visNodes.length})
                </h2>
                <ul className="space-y-2">
                  {visNodes.map((n) => (
                    <li
                      key={n.id}
                      className={`flex items-center gap-2.5 rounded-lg border px-3 py-2 ${sel.has(n.id) ? "border-[#c9a43e]/50 bg-[#c9a43e]/[0.06]" : "border-white/10 bg-black/30"}`}
                    >
                      <input
                        type="checkbox"
                        checked={sel.has(n.id)}
                        onChange={() => toggleSel(n.id)}
                        className="size-4 shrink-0 cursor-pointer accent-[#c9a43e]"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="text-base text-[#e8e4d8]">{n.label}</span>
                        {n.dup && <span className="ml-2 rounded bg-amber-500/15 px-1.5 py-0.5 text-[10px] text-amber-300/80">duplicado</span>}
                        <span className="ml-2 text-xs text-[#9a958a]">· {n.cat} · nivel {n.level}{n.source ? ` · ${n.source}` : ""}</span>
                      </div>
                      <div className="flex shrink-0 gap-1.5">
                        <button onClick={() => act("node", n.id, "approve")} className="rounded-md border border-emerald-500/40 px-2 py-1 text-xs text-emerald-300 hover:bg-emerald-500/15" title="Aprobar">✓</button>
                        <button onClick={() => act("node", n.id, "reject")} className="rounded-md border border-rose-500/40 px-2 py-1 text-xs text-rose-300 hover:bg-rose-500/15" title="Rechazar">✗</button>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {edges.length > 0 && (
              <section>
                <h2 className="mb-2 font-cinzel text-sm uppercase tracking-widest text-[#c9a43e]/60">
                  Conexiones nuevas ({edges.length})
                </h2>
                <ul className="space-y-2">
                  {edges.map((e) => (
                    <li key={e.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/30 px-3 py-2">
                      <span className="min-w-0 text-sm text-[#e8e4d8]">
                        {e.source_label ?? e.source_id} <span className="text-[#c9a43e]">↔</span> {e.target_label ?? e.target_id}
                      </span>
                      <div className="flex shrink-0 gap-1.5">
                        <button onClick={() => act("edge", e.id, "approve")} className="rounded-md border border-emerald-500/40 px-2 py-1 text-xs text-emerald-300 hover:bg-emerald-500/15" title="Aprobar">✓</button>
                        <button onClick={() => act("edge", e.id, "reject")} className="rounded-md border border-rose-500/40 px-2 py-1 text-xs text-rose-300 hover:bg-rose-500/15" title="Rechazar">✗</button>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
