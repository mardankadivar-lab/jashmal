"use client";

// Panel del Sofer — revisar y aprobar las sinapsis/conexiones que el cerebro
// "aprendió" de los estudios (estado 'pending'). Protegido por ADMIN_TOKEN.

import { useState, useEffect, useCallback } from "react";

type PNode = { id: string; label: string; cat: string; level: number; url: string | null; source: string | null };
type PEdge = { id: string; source_id: string; target_id: string; source_label: string | null; target_label: string | null; origin: string | null };

export default function CerebroAdminPage() {
  const [token, setToken] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [nodes, setNodes] = useState<PNode[]>([]);
  const [edges, setEdges] = useState<PEdge[]>([]);

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
      setLoaded(true);
      localStorage.setItem("jashmal_admin_token", tok);
    } catch {
      setErr("No se pudo cargar.");
    }
    setLoading(false);
  }, []);

  async function act(kind: "node" | "edge", id: string, action: "approve" | "reject") {
    try {
      await fetch("/api/admin/brain", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-token": token },
        body: JSON.stringify({ kind, id, action }),
      });
      if (kind === "node") setNodes((p) => p.filter((n) => n.id !== id));
      else setEdges((p) => p.filter((e) => e.id !== id));
    } catch {
      /* ignore */
    }
  }

  const total = nodes.length + edges.length;

  return (
    <div className="min-h-screen bg-[#05050a] px-4 py-8 text-[#e8e4d8]" style={{ fontFamily: "var(--font-cormorant, serif)" }}>
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-1 font-cinzel text-2xl text-[#c9a43e]">Panel del Sofer · Cerebro</h1>
        <p className="mb-6 text-sm text-[#9a958a]">
          Aprueba o rechaza lo que el cerebro aprendió de los estudios. Lo aprobado se enciende en{" "}
          <a href="/cerebro" className="text-[#c9a43e] underline">el cerebro</a>.
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
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-[#9a958a]">{total} pendientes</span>
              <button onClick={() => load(token)} className="text-xs text-[#c9a43e] underline">
                recargar
              </button>
            </div>

            {total === 0 && (
              <p className="rounded-lg border border-[#c9a43e]/15 bg-black/30 p-6 text-center text-[#9a958a]">
                No hay nada pendiente. El cerebro está al día. 🧠
              </p>
            )}

            {nodes.length > 0 && (
              <section className="mb-6">
                <h2 className="mb-2 font-cinzel text-sm uppercase tracking-widest text-[#c9a43e]/60">
                  Sinapsis nuevas ({nodes.length})
                </h2>
                <ul className="space-y-2">
                  {nodes.map((n) => (
                    <li key={n.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/30 px-3 py-2">
                      <div className="min-w-0">
                        <span className="text-base text-[#e8e4d8]">{n.label}</span>
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
