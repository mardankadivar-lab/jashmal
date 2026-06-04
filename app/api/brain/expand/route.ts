import { NextResponse } from "next/server";
import { anthropic, buildExpandPrompt, EXPAND_MODEL } from "@/lib/anthropic";
import { dbConfigured } from "@/lib/db";
import { addNode, addEdge, existingNodeIds, edgeKey } from "@/lib/brainStore";
import { clientIp } from "@/lib/rateLimit";
import type { BNode } from "@/lib/brainData";

export const runtime = "nodejs";
export const maxDuration = 60;

const ALLOWED_CATS = new Set([
  "tanakh", "mishnah", "talmud", "midrash", "halakhah",
  "kabbalah", "chasidut", "philosophy", "science", "jashmal",
]);

// Limitador ligero por IP (protege el costo de las llamadas a Claude).
const hits = new Map<string, number[]>();
function expandAllowed(ip: string): boolean {
  const now = Date.now();
  const win = 10 * 60 * 1000; // 10 min
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < win);
  if (arr.length >= 25) return false;
  arr.push(now);
  hits.set(ip, arr);
  return true;
}

function titleCase(s: string): string {
  const t = s.trim();
  return t ? t[0].toUpperCase() + t.slice(1) : t;
}

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ ok: false, reason: "no_api_key" }, { status: 500 });
  }
  if (!expandAllowed(clientIp(req))) {
    return NextResponse.json({ ok: false, reason: "rate_limited" }, { status: 429 });
  }

  let body: { nodeId?: string; label?: string; cat?: string; level?: number; locale?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid_body" }, { status: 400 });
  }

  const nodeId = (body.nodeId ?? "").toString().trim();
  const label = (body.label ?? nodeId).toString().trim();
  const cat = ALLOWED_CATS.has(body.cat ?? "") ? (body.cat as string) : "kabbalah";
  const locale = ["es", "fa", "en"].includes(body.locale ?? "") ? (body.locale as string) : "es";
  if (!nodeId || nodeId.length > 120) {
    return NextResponse.json({ ok: false, reason: "invalid_node" }, { status: 400 });
  }

  // ── Invocar al Sofer del dominio ──
  let related: Array<{ label: string; cat: string; level: number; relation?: string }> = [];
  try {
    const msg = await anthropic.messages.create({
      model: EXPAND_MODEL,
      max_tokens: 1300,
      system: buildExpandPrompt(cat, locale),
      messages: [{ role: "user", content: `Tema: ${label} (categoría: ${cat}). Devuelve sus conexiones reales.` }],
    });
    const text = msg.content
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("");
    const jsonStr = text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1);
    const parsed = JSON.parse(jsonStr) as { related?: typeof related };
    related = Array.isArray(parsed.related) ? parsed.related : [];
  } catch {
    return NextResponse.json({ ok: false, reason: "sofer_failed" });
  }

  if (related.length === 0) {
    return NextResponse.json({ ok: true, nodes: [], edges: [] });
  }

  // ── Persistir como 'pending' y devolver los nuevos al cliente ──
  const newNodes: BNode[] = [];
  const newEdges: [string, string][] = [];
  const seenEdge = new Set<string>();

  if (dbConfigured()) {
    const existing = await existingNodeIds();
    const canonical = (lab: string) => existing.get(lab.toLowerCase()) ?? titleCase(lab);
    // asegurar que el sujeto exista (pendiente si es nuevo)
    await addNode(
      { id: nodeId, label, labelFa: label, cat, level: (body.level as BNode["level"]) ?? 3 },
      "pending",
      "expand",
    );

    for (const r of related.slice(0, 10)) {
      const rawLabel = (r.label ?? "").toString().trim();
      if (!rawLabel || rawLabel.length > 80) continue;
      const rCat = ALLOWED_CATS.has(r.cat) ? r.cat : "kabbalah";
      const rLevel = ([2, 3, 4].includes(r.level) ? r.level : 3) as BNode["level"];
      const id = canonical(rawLabel);
      if (id === nodeId) continue;
      const node: BNode = { id, label: rawLabel, labelFa: rawLabel, cat: rCat, level: rLevel };
      await addNode(node, "pending", "expand");
      await addEdge(nodeId, id, "pending", "expand");
      newNodes.push(node);
      const k = edgeKey(nodeId, id);
      if (!seenEdge.has(k)) { seenEdge.add(k); newEdges.push([nodeId, id]); }
    }
  } else {
    // sin BD: devolver de todos modos para que el cliente lo muestre en sesión
    for (const r of related.slice(0, 10)) {
      const rawLabel = (r.label ?? "").toString().trim();
      if (!rawLabel) continue;
      const rCat = ALLOWED_CATS.has(r.cat) ? r.cat : "kabbalah";
      const rLevel = ([2, 3, 4].includes(r.level) ? r.level : 3) as BNode["level"];
      const id = titleCase(rawLabel);
      if (id === nodeId) continue;
      newNodes.push({ id, label: rawLabel, labelFa: rawLabel, cat: rCat, level: rLevel });
      newEdges.push([nodeId, id]);
    }
  }

  return NextResponse.json({ ok: true, nodes: newNodes, edges: newEdges });
}
