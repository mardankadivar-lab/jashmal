"use client";

import { useState } from "react";

type ReviewRow = {
  id: string;
  text: string;
  connects_to: string | null;
  score: number;
  sofer_verdict: string | null;
  sofer_notes: string | null;
  created: string;
  user_id: string;
  name: string | null;
  email: string;
};
type NodeOpt = { id: string; label: string; cat: string };
type StarRow = { id: string; label: string; author: string | null; connectsTo: string };

// Título por defecto para la estrella: la primera frase (o ~56 caracteres) del jidush.
function defaultTitle(text: string): string {
  const firstLine = text.split("\n")[0].trim();
  const firstSentence = firstLine.split(/(?<=[.!?:])\s/)[0];
  const base = firstSentence.length > 8 ? firstSentence : firstLine;
  return base.length > 56 ? base.slice(0, 56).trim() + "…" : base;
}

function errMsg(code?: string): string {
  switch (code) {
    case "target_not_found":
      return "Ese concepto no existe en el universo. Elige uno de la lista.";
    case "missing_title":
      return "Ponle un título a la estrella.";
    case "missing_target":
      return "Indica a qué concepto se conecta.";
    case "already_resolved":
      return "Esta revelación ya fue resuelta.";
    default:
      return "No se pudo completar. Intenta de nuevo.";
  }
}

// ── Panel de aprobación de jidushim (Puerta 2 de Mardan) ───────────────────
export default function AdminComunidadPage() {
  const [token, setToken] = useState("");
  const [queue, setQueue] = useState<ReviewRow[] | null>(null);
  const [nodes, setNodes] = useState<NodeOpt[]>([]);
  const [stars, setStars] = useState<StarRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/community?token=${encodeURIComponent(token)}`);
      if (res.status === 401) {
        setError("Token incorrecto.");
        setQueue(null);
        return;
      }
      const d = await res.json();
      if (!d.configured) {
        setError("La base de datos no está configurada (esto solo funciona en producción).");
        setQueue([]);
        return;
      }
      setQueue(d.queue ?? []);
      setNodes(d.nodes ?? []);
      setStars(d.stars ?? []);
    } catch {
      setError("Error al cargar.");
    } finally {
      setLoading(false);
    }
  }

  async function resolve(id: string, payload: Record<string, unknown>): Promise<boolean> {
    setFlash(null);
    try {
      const res = await fetch("/api/admin/community", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-token": token },
        body: JSON.stringify({ id, ...payload }),
      });
      const d = await res.json();
      if (!res.ok || d.error) {
        setFlash("⚠ " + errMsg(d.error));
        return false;
      }
      setQueue((q) => (q ? q.filter((x) => x.id !== id) : q));
      setFlash(
        payload.action === "approve"
          ? `✦ Estrella encendida en la galaxia Comunidad — ${d.author}`
          : "Revelación archivada.",
      );
      return true;
    } catch {
      setFlash("⚠ Error de red.");
      return false;
    }
  }

  async function removeStar(nodeId: string, label: string) {
    if (!confirm(`¿Retirar la estrella "${label}"?\n\nSe apaga del universo (es reversible) y se revierten la estrella y la luz del estudiante.`)) {
      return;
    }
    setFlash(null);
    const subId = nodeId.replace(/^c-/, "");
    try {
      const res = await fetch("/api/admin/community", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-token": token },
        body: JSON.stringify({ action: "remove", id: subId }),
      });
      const d = await res.json();
      if (!res.ok || d.error) {
        setFlash("⚠ " + errMsg(d.error));
        return;
      }
      setStars((s) => s.filter((x) => x.id !== nodeId));
      setFlash("Estrella retirada y archivada.");
    } catch {
      setFlash("⚠ Error de red.");
    }
  }

  return (
    <main className="dark min-h-screen bg-ink px-5 py-8 text-parchment">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-cinzel text-2xl text-gold">Comunidad · Puerta 2</h1>
        <p className="mt-1 text-sm text-muted">
          Los jidushim que pasaron el Sofer y esperan tu visto final. Al aprobar, la estrella del
          estudiante se enciende en la galaxia Comunidad con su nombre.
        </p>

        <div className="mt-4 flex gap-2">
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && token && load()}
            placeholder="Token de administrador"
            className="flex-1 rounded-md border border-gold/30 bg-white/[0.04] px-3 py-2 text-sm"
          />
          <button
            onClick={load}
            disabled={loading || !token}
            className="rounded-md border border-gold/50 px-4 py-2 text-sm text-gold hover:bg-gold/10 disabled:opacity-40"
          >
            {loading ? "Cargando…" : "Cargar"}
          </button>
        </div>
        {error && <p className="mt-3 text-sm text-red-400/80">{error}</p>}
        {flash && <p className="mt-3 text-sm text-gold/90">{flash}</p>}

        {queue && (
          <>
            <p className="mt-6 text-sm text-muted">
              {queue.length === 0 ? "No hay jidushim esperando." : `${queue.length} esperando tu aprobación`}
            </p>
            <ul className="mt-3 space-y-5">
              {queue.map((row) => (
                <QueueItem key={row.id} row={row} nodes={nodes} onResolve={resolve} />
              ))}
            </ul>
          </>
        )}

        {stars.length > 0 && (
          <div className="mt-10 border-t border-gold/10 pt-6">
            <p className="font-cinzel text-sm uppercase tracking-widest text-gold/70">
              Estrellas encendidas · {stars.length}
            </p>
            <p className="mt-1 text-xs text-muted/60">
              Las que ya brillan en la galaxia Comunidad. Retirar una la apaga del universo (reversible).
            </p>
            <ul className="mt-3 space-y-2">
              {stars.map((s) => (
                <li
                  key={s.id}
                  className="flex items-center gap-3 rounded-lg border border-gold/12 bg-white/[0.02] px-3 py-2 text-sm"
                >
                  <span className="text-rose-200/80">✦</span>
                  <span className="min-w-0">
                    <span className="block truncate text-parchment/90">{s.label}</span>
                    <span className="block truncate text-[11px] text-muted/60">
                      {s.author ?? "—"}
                      {s.connectsTo ? ` · ↔ ${s.connectsTo}` : ""}
                    </span>
                  </span>
                  <button
                    onClick={() => removeStar(s.id, s.label)}
                    className="ms-auto shrink-0 rounded-full border border-red-500/40 px-3 py-1 text-xs text-red-400/90 transition-colors hover:bg-red-500/10"
                  >
                    Retirar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* lista de conceptos del universo para el autocompletar */}
        <datalist id="brain-nodes">
          {nodes.map((n) => (
            <option key={n.id} value={n.id}>
              {n.label}
            </option>
          ))}
        </datalist>
      </div>
    </main>
  );
}

function QueueItem({
  row,
  nodes,
  onResolve,
}: {
  row: ReviewRow;
  nodes: NodeOpt[];
  onResolve: (id: string, payload: Record<string, unknown>) => Promise<boolean>;
}) {
  const [title, setTitle] = useState(defaultTitle(row.text));
  const [target, setTarget] = useState(row.connects_to ?? "");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  const targetKnown = nodes.some((n) => n.id === target.trim());
  const author = (row.name && row.name.trim()) || row.email.split("@")[0];

  async function approve() {
    if (busy) return;
    setBusy(true);
    const ok = await onResolve(row.id, { action: "approve", title: title.trim(), targetId: target.trim(), note: note.trim() });
    if (!ok) setBusy(false);
  }
  async function reject() {
    if (busy) return;
    setBusy(true);
    const ok = await onResolve(row.id, { action: "reject", note: note.trim() });
    if (!ok) setBusy(false);
  }

  return (
    <li className="rounded-xl border border-gold/15 bg-white/[0.02] p-4">
      {/* autor + fecha */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
        <span className="text-parchment/90">{author}</span>
        <span className="text-muted/60">{row.email}</span>
        <span className="ms-auto">{new Date(row.created).toLocaleString()}</span>
      </div>

      {/* el jidush */}
      <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-parchment/90">{row.text}</p>

      {/* veredicto del Sofer */}
      <div className="mt-3 rounded-lg border border-gold/10 bg-gold/[0.03] p-3 text-xs leading-relaxed">
        <div className="mb-1 flex items-center gap-2">
          <span className="font-cinzel uppercase tracking-widest text-gold/70">Sofer</span>
          <span className="rounded-full border border-gold/30 px-2 py-0.5 text-gold/80">
            {row.sofer_verdict ?? "—"}
          </span>
          <span className="text-muted/70">
            {row.score} {row.score === 1 ? "conexión" : "conexiones"}
          </span>
        </div>
        {row.sofer_notes && <p className="text-parchment/75">{row.sofer_notes}</p>}
      </div>

      {/* formulario de aprobación */}
      <div className="mt-4 space-y-2.5">
        <div>
          <label className="mb-1 block text-[11px] uppercase tracking-widest text-gold/50">
            Título de la estrella
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={busy}
            className="w-full rounded-md border border-gold/25 bg-white/[0.04] px-3 py-1.5 text-sm text-parchment focus:border-gold/60 focus:outline-none disabled:opacity-50"
          />
        </div>
        <div>
          <label className="mb-1 block text-[11px] uppercase tracking-widest text-gold/50">
            ¿A qué concepto se conecta?{" "}
            {target.trim() && (targetKnown ? (
              <span className="text-emerald-300/70">✓ existe</span>
            ) : (
              <span className="text-amber-300/70">— no está en el universo</span>
            ))}
          </label>
          <input
            list="brain-nodes"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            disabled={busy}
            placeholder="ej. Biná, Mashíaj, Najash…"
            className="w-full rounded-md border border-gold/25 bg-white/[0.04] px-3 py-1.5 text-sm text-parchment focus:border-gold/60 focus:outline-none disabled:opacity-50"
          />
        </div>
        <div>
          <label className="mb-1 block text-[11px] uppercase tracking-widest text-gold/50">
            Nota (opcional)
          </label>
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            disabled={busy}
            placeholder="para tu registro"
            className="w-full rounded-md border border-gold/25 bg-white/[0.04] px-3 py-1.5 text-sm text-parchment focus:border-gold/60 focus:outline-none disabled:opacity-50"
          />
        </div>
        <div className="flex gap-2 pt-1">
          <button
            onClick={approve}
            disabled={busy || !title.trim() || !targetKnown}
            className="flex-1 rounded-full border border-gold bg-gold/10 px-4 py-2 font-cinzel text-xs font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20 disabled:opacity-40"
            title={!targetKnown ? "Elige un concepto que exista en el universo" : "Encender la estrella"}
          >
            {busy ? "…" : "Aprobar · encender ✦"}
          </button>
          <button
            onClick={reject}
            disabled={busy}
            className="rounded-full border border-red-500/40 px-4 py-2 font-cinzel text-xs uppercase tracking-widest text-red-400/90 transition-all hover:bg-red-500/10 disabled:opacity-40"
          >
            Rechazar
          </button>
        </div>
      </div>
    </li>
  );
}
