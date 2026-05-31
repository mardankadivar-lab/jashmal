"use client";

import { useState } from "react";

interface AdminReflection {
  id: number;
  study_ref: string;
  locale: string;
  body: string;
  created_at: string;
  status: string;
  reports: number;
}

// Panel de moderación del Beit Midrash. Pide el token de administrador.
export default function AdminPage() {
  const [token, setToken] = useState("");
  const [items, setItems] = useState<AdminReflection[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/reflections?token=${encodeURIComponent(token)}`);
      if (res.status === 401) {
        setError("Token incorrecto.");
        setItems(null);
        return;
      }
      const data = await res.json();
      setItems(data.reflections ?? []);
    } catch {
      setError("Error al cargar.");
    } finally {
      setLoading(false);
    }
  }

  async function act(id: number, action: "delete" | "restore") {
    await fetch("/api/admin/reflections", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-token": token },
      body: JSON.stringify({ action, id }),
    });
    load();
  }

  return (
    <main className="dark min-h-screen bg-ink px-5 py-8 text-parchment">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-cinzel text-2xl text-gold">Beit Midrash · Moderación</h1>

        <div className="mt-4 flex gap-2">
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
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

        {items && (
          <>
            <p className="mt-6 text-sm text-muted">{items.length} reflexiones</p>
            <ul className="mt-3 space-y-3">
              {items.map((r) => (
                <li
                  key={r.id}
                  className="rounded-md border border-gold/15 bg-white/[0.02] p-3"
                  style={{ opacity: r.status === "visible" ? 1 : 0.5 }}
                >
                  <p className="whitespace-pre-wrap text-sm text-parchment/90">{r.body}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted">
                    <span>#{r.id}</span>
                    <span>{r.study_ref}</span>
                    <span>{r.locale}</span>
                    <span>{new Date(r.created_at).toLocaleString()}</span>
                    <span>estado: {r.status}</span>
                    {r.reports > 0 && (
                      <span className="text-red-400/80">reportes: {r.reports}</span>
                    )}
                    <span className="ms-auto flex gap-2">
                      {r.status !== "visible" && (
                        <button
                          onClick={() => act(r.id, "restore")}
                          className="rounded border border-gold/30 px-2 py-0.5 text-gold hover:bg-gold/10"
                        >
                          Restaurar
                        </button>
                      )}
                      <button
                        onClick={() => act(r.id, "delete")}
                        className="rounded border border-red-500/40 px-2 py-0.5 text-red-400/90 hover:bg-red-500/10"
                      >
                        Borrar
                      </button>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </main>
  );
}
