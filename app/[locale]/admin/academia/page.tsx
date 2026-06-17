"use client";

// ─────────────────────────────────────────────────────────────────────────
// app/[locale]/admin/academia/page.tsx
// Panel de administración de tareas semanales y expositivos de la Academia.
// Modelo: app/[locale]/admin/comunidad/page.tsx
// Sin auth adicional — usa ADMIN_TOKEN igual que el panel de comunidad.
// ─────────────────────────────────────────────────────────────────────────

import { useState } from "react";

type TareaRow = {
  id: string;
  user_id: string;
  email: string;
  name: string | null;
  semana: number;
  lesson_slug: string;
  texto: string;
  palabras: number;
  status: string;
  sofer_notas: string | null;
  created: string;
};

type ExpositivoRow = {
  id: string;
  user_id: string;
  email: string;
  name: string | null;
  numero: number;
  nivel: string;
  titulo: string;
  texto: string;
  palabras: number;
  status: string;
  sofer_notas: string | null;
  mardan_notas: string | null;
  created: string;
};

const TAREA_STATUSES = ["entregada", "revisada", "aprobada"];
const EXPOSITIVO_STATUSES = ["entregado", "sofer_revision", "aprobado", "destacado", "rechazado"];

function statusColor(s: string): string {
  switch (s) {
    case "aprobada":
    case "aprobado":
    case "destacado":
      return "text-emerald-300/90";
    case "revisada":
    case "sofer_revision":
      return "text-amber-300/90";
    case "rechazado":
      return "text-red-400/80";
    default:
      return "text-gold/70";
  }
}

export default function AdminAcademiaPage() {
  const [token, setToken] = useState("");
  const [tareas, setTareas] = useState<TareaRow[] | null>(null);
  const [expositivos, setExpositivos] = useState<ExpositivoRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);
  const [tab, setTab] = useState<"tareas" | "expositivos">("tareas");

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/academia?token=${encodeURIComponent(token)}`);
      if (res.status === 401) {
        setError("Token incorrecto.");
        return;
      }
      const d = await res.json();
      if (!d.configured) {
        setError("Base de datos no configurada (solo funciona en producción).");
        setTareas([]);
        setExpositivos([]);
        return;
      }
      setTareas(d.tareas ?? []);
      setExpositivos(d.expositivos ?? []);
    } catch {
      setError("Error al cargar.");
    } finally {
      setLoading(false);
    }
  }

  async function updateTarea(id: string, status: string, notas: string) {
    setFlash(null);
    const res = await fetch("/api/admin/academia", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-token": token },
      body: JSON.stringify({ action: "update_tarea", id, status, notas }),
    });
    const d = await res.json();
    if (!res.ok || d.error) {
      setFlash("Error al actualizar.");
      return;
    }
    setTareas((prev) =>
      prev
        ? prev.map((t) => (t.id === id ? { ...t, status, sofer_notas: notas || null } : t))
        : prev,
    );
    setFlash("Tarea actualizada.");
  }

  async function updateExpositivo(
    id: string,
    status: string,
    notas: string,
    tipo: "sofer" | "mardan",
  ) {
    setFlash(null);
    const res = await fetch("/api/admin/academia", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-token": token },
      body: JSON.stringify({ action: "update_expositivo", id, status, notas, tipo }),
    });
    const d = await res.json();
    if (!res.ok || d.error) {
      setFlash("Error al actualizar.");
      return;
    }
    setExpositivos((prev) =>
      prev
        ? prev.map((e) =>
            e.id === id
              ? {
                  ...e,
                  status,
                  sofer_notas: tipo === "sofer" ? notas || null : e.sofer_notas,
                  mardan_notas: tipo === "mardan" ? notas || null : e.mardan_notas,
                }
              : e,
          )
        : prev,
    );
    setFlash("Expositivo actualizado.");
  }

  return (
    <main className="dark min-h-screen bg-ink px-5 py-8 text-parchment">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-cinzel text-2xl text-gold">Academia · Tareas y Expositivos</h1>
        <p className="mt-1 text-sm text-muted">
          Revisión y feedback del Sofer para las tareas semanales y expositivos de los estudiantes.
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

        {tareas !== null && (
          <>
            {/* Pestañas */}
            <div className="mt-6 flex gap-1 border-b border-gold/15">
              {(["tareas", "expositivos"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-4 py-2 font-cinzel text-xs uppercase tracking-widest transition-colors ${
                    tab === t
                      ? "border-b-2 border-gold text-gold"
                      : "text-muted/60 hover:text-parchment/70"
                  }`}
                >
                  {t === "tareas"
                    ? `Tareas semanales (${tareas?.length ?? 0})`
                    : `Expositivos (${expositivos?.length ?? 0})`}
                </button>
              ))}
            </div>

            {/* TAREAS */}
            {tab === "tareas" && (
              <div className="mt-4">
                {tareas.length === 0 ? (
                  <p className="text-sm text-muted">No hay tareas entregadas todavía.</p>
                ) : (
                  <ul className="space-y-4">
                    {tareas.map((row) => (
                      <TareaCard key={row.id} row={row} onUpdate={updateTarea} />
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* EXPOSITIVOS */}
            {tab === "expositivos" && (
              <div className="mt-4">
                {(expositivos?.length ?? 0) === 0 ? (
                  <p className="text-sm text-muted">No hay expositivos entregados todavía.</p>
                ) : (
                  <ul className="space-y-4">
                    {expositivos?.map((row) => (
                      <ExpositivoCard key={row.id} row={row} onUpdate={updateExpositivo} />
                    ))}
                  </ul>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}

// ── TareaCard ─────────────────────────────────────────────────────────────

function TareaCard({
  row,
  onUpdate,
}: {
  row: TareaRow;
  onUpdate: (id: string, status: string, notas: string) => Promise<void>;
}) {
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState(row.status);
  const [notas, setNotas] = useState(row.sofer_notas ?? "");
  const [busy, setBusy] = useState(false);

  const author = (row.name && row.name.trim()) || row.email.split("@")[0];

  async function save() {
    setBusy(true);
    await onUpdate(row.id, status, notas);
    setBusy(false);
  }

  return (
    <li className="rounded-xl border border-gold/15 bg-white/[0.02] p-4">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
        <span className="text-parchment/90">{author}</span>
        <span className="text-muted/60">{row.email}</span>
        <span className="font-cinzel uppercase tracking-widest text-gold/60">
          Sem. {row.semana}
        </span>
        <span className="text-muted/50">{row.lesson_slug}</span>
        <span className={`ms-auto font-cinzel text-[11px] uppercase tracking-widest ${statusColor(row.status)}`}>
          {row.status}
        </span>
        <span className="text-muted/50">{new Date(row.created).toLocaleDateString()}</span>
      </div>

      <div className="mt-2 flex items-center justify-between gap-2">
        <span className="text-xs text-muted/60">{row.palabras} palabras</span>
        <button
          onClick={() => setExpanded((x) => !x)}
          className="text-xs text-gold/60 hover:text-gold"
        >
          {expanded ? "Ocultar texto ▲" : "Ver texto ▼"}
        </button>
      </div>

      {expanded && (
        <p className="mt-3 whitespace-pre-wrap rounded-lg border border-gold/10 bg-ink/40 px-4 py-3 text-sm leading-relaxed text-parchment/85">
          {row.texto}
        </p>
      )}

      {/* Panel de revisión */}
      <div className="mt-4 space-y-2.5">
        <div className="flex flex-wrap gap-2">
          {TAREA_STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`rounded-full border px-3 py-1 font-cinzel text-[10px] uppercase tracking-widest transition-colors ${
                status === s
                  ? "border-gold bg-gold/15 text-gold"
                  : "border-gold/25 text-muted/70 hover:border-gold/50 hover:text-parchment/70"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div>
          <label className="mb-1 block text-[11px] uppercase tracking-widest text-gold/50">
            Notas del Sofer
          </label>
          <textarea
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            rows={3}
            placeholder="Feedback breve para el estudiante…"
            className="w-full resize-none rounded-md border border-gold/25 bg-white/[0.04] px-3 py-1.5 text-sm text-parchment focus:border-gold/60 focus:outline-none"
          />
        </div>
        <button
          onClick={save}
          disabled={busy}
          className="rounded-full border border-gold bg-gold/10 px-6 py-2 font-cinzel text-xs font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20 disabled:opacity-40"
        >
          {busy ? "Guardando…" : "Guardar"}
        </button>
      </div>
    </li>
  );
}

// ── ExpositivoCard ────────────────────────────────────────────────────────

function ExpositivoCard({
  row,
  onUpdate,
}: {
  row: ExpositivoRow;
  onUpdate: (id: string, status: string, notas: string, tipo: "sofer" | "mardan") => Promise<void>;
}) {
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState(row.status);
  const [soferNotas, setSoferNotas] = useState(row.sofer_notas ?? "");
  const [mardanNotas, setMardanNotas] = useState(row.mardan_notas ?? "");
  const [busy, setBusy] = useState(false);

  const author = (row.name && row.name.trim()) || row.email.split("@")[0];

  async function save(tipo: "sofer" | "mardan") {
    setBusy(true);
    await onUpdate(row.id, status, tipo === "sofer" ? soferNotas : mardanNotas, tipo);
    setBusy(false);
  }

  return (
    <li className="rounded-xl border border-gold/15 bg-white/[0.02] p-4">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
        <span className="text-parchment/90">{author}</span>
        <span className="text-muted/60">{row.email}</span>
        <span className="font-cinzel uppercase tracking-widest text-gold/60">
          EX-{row.numero} · {row.nivel}
        </span>
        <span className={`ms-auto font-cinzel text-[11px] uppercase tracking-widest ${statusColor(row.status)}`}>
          {row.status}
        </span>
        <span className="text-muted/50">{new Date(row.created).toLocaleDateString()}</span>
      </div>

      <p className="mt-2 font-cinzel text-sm text-parchment/90">{row.titulo}</p>

      <div className="mt-1 flex items-center justify-between gap-2">
        <span className="text-xs text-muted/60">{row.palabras} palabras</span>
        <button
          onClick={() => setExpanded((x) => !x)}
          className="text-xs text-gold/60 hover:text-gold"
        >
          {expanded ? "Ocultar texto ▲" : "Ver texto ▼"}
        </button>
      </div>

      {expanded && (
        <p className="mt-3 whitespace-pre-wrap rounded-lg border border-gold/10 bg-ink/40 px-4 py-3 text-sm leading-relaxed text-parchment/85">
          {row.texto}
        </p>
      )}

      {/* Panel de revisión */}
      <div className="mt-4 space-y-2.5">
        <div className="flex flex-wrap gap-2">
          {EXPOSITIVO_STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`rounded-full border px-3 py-1 font-cinzel text-[10px] uppercase tracking-widest transition-colors ${
                status === s
                  ? "border-gold bg-gold/15 text-gold"
                  : "border-gold/25 text-muted/70 hover:border-gold/50 hover:text-parchment/70"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div>
          <label className="mb-1 block text-[11px] uppercase tracking-widest text-gold/50">
            Notas del Sofer
          </label>
          <textarea
            value={soferNotas}
            onChange={(e) => setSoferNotas(e.target.value)}
            rows={3}
            placeholder="Feedback del Sofer…"
            className="w-full resize-none rounded-md border border-gold/25 bg-white/[0.04] px-3 py-1.5 text-sm text-parchment focus:border-gold/60 focus:outline-none"
          />
          <button
            onClick={() => save("sofer")}
            disabled={busy}
            className="mt-2 rounded-full border border-gold bg-gold/10 px-6 py-2 font-cinzel text-xs font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20 disabled:opacity-40"
          >
            {busy ? "Guardando…" : "Guardar (Sofer)"}
          </button>
        </div>

        <div>
          <label className="mb-1 block text-[11px] uppercase tracking-widest text-gold/50">
            Nota de Mardan
          </label>
          <textarea
            value={mardanNotas}
            onChange={(e) => setMardanNotas(e.target.value)}
            rows={2}
            placeholder="Nota personal de Mardan…"
            className="w-full resize-none rounded-md border border-gold/25 bg-white/[0.04] px-3 py-1.5 text-sm text-parchment focus:border-gold/60 focus:outline-none"
          />
          <button
            onClick={() => save("mardan")}
            disabled={busy}
            className="mt-2 rounded-full border border-gold/50 bg-gold/[0.06] px-6 py-2 font-cinzel text-xs uppercase tracking-widest text-gold transition-all hover:bg-gold/10 disabled:opacity-40"
          >
            {busy ? "Guardando…" : "Guardar nota (Mardan)"}
          </button>
        </div>
      </div>
    </li>
  );
}
