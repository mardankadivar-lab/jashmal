// ─────────────────────────────────────────────────────────────────────────
// export-obsidian.mts — Exporta la Mente Cósmica al vault de Obsidian.
//
// Cada nodo (BNODES) → una nota .md con wikilinks [[...]] por cada arista
// (BEDGES). Las conexiones curadas (EDGE_DATA) incluyen su rótulo, explicación
// y fuentes. Obsidian dibuja el grafo solo a partir de los wikilinks.
//
// Uso:  node scripts/export-obsidian.mts
// Idempotente: regenera la carpeta "Mente Cósmica" del vault en cada corrida
// (las notas propias del usuario fuera de esa carpeta no se tocan).
// ─────────────────────────────────────────────────────────────────────────
import { mkdirSync, writeFileSync, rmSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { BNODES, BEDGES, BRAIN_CATS, type BNode } from "../lib/nodes/brainData.ts";
import { getEdgeData, directionalLabelFor } from "../lib/relations/edgeData.ts";

const VAULT = "/Users/mardan/workspace/estudios-jashmal/Obsidian Notes/Jashmal Studies";
const OUT = join(VAULT, "Mente Cósmica");

// Nombre de archivo seguro para Obsidian (sin / \ : * ? " < > | # ^ [ ]).
function fileName(id: string): string {
  return id.replace(/[/\\:*?"<>|#^\[\]]+/g, "·").replace(/\s+/g, " ").trim();
}

// Tag seguro (sin espacios ni acentos raros; conserva guiones).
function tagOf(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9֐-׿]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const yamlStr = (s: string) => JSON.stringify(s); // escapado YAML seguro

// ── Vecinos de cada nodo ──────────────────────────────────────────────────
const neighbors = new Map<string, Set<string>>();
for (const [a, b] of BEDGES) {
  if (!neighbors.has(a)) neighbors.set(a, new Set());
  if (!neighbors.has(b)) neighbors.set(b, new Set());
  neighbors.get(a)!.add(b);
  neighbors.get(b)!.add(a);
}

const byId = new Map<string, BNode>(BNODES.map((n) => [n.id, n]));

// ── Regenerar carpeta de salida ───────────────────────────────────────────
if (existsSync(OUT)) rmSync(OUT, { recursive: true });
mkdirSync(OUT, { recursive: true });

let written = 0;
const curatedKeys = new Set<string>();

for (const n of BNODES) {
  const cat = BRAIN_CATS[n.cat];
  const catLabel = cat?.label ?? n.cat;
  const dir = join(OUT, fileName(catLabel));
  mkdirSync(dir, { recursive: true });

  const aliases = [n.label, n.labelEn, n.labelFa].filter(
    (a): a is string => !!a && a !== n.id,
  );
  const fm: string[] = ["---"];
  if (aliases.length) fm.push(`aliases: [${aliases.map(yamlStr).join(", ")}]`);
  fm.push(`categoria: ${yamlStr(catLabel)}`);
  fm.push(`nivel: ${n.level}`);
  if (n.url) fm.push(`url: ${yamlStr(`https://jashmal.org${n.url}`)}`);
  fm.push(`tags: [${tagOf(n.cat)}, nivel-${n.level}]`);
  fm.push("---", "");

  const body: string[] = [`# ${n.label}`, ""];
  const sub: string[] = [];
  if (n.labelEn) sub.push(n.labelEn);
  if (n.labelFa) sub.push(n.labelFa);
  if (sub.length) body.push(`*${sub.join(" · ")}*`, "");
  body.push(`**Categoría:** ${catLabel} · **Nivel:** ${n.level}`, "");
  if (n.url) body.push(`🔗 [Ver en jashmal.org](https://jashmal.org${n.url})`, "");

  const vs = [...(neighbors.get(n.id) ?? [])].sort((a, b) =>
    a.localeCompare(b, "es"),
  );
  if (vs.length) {
    body.push(`## Conexiones (${vs.length})`, "");
    for (const v of vs) {
      const other = byId.get(v);
      const link =
        fileName(v) === (other?.label ?? v)
          ? `[[${fileName(v)}]]`
          : `[[${fileName(v)}|${other?.label ?? v}]]`;
      const ed = getEdgeData(n.id, v);
      if (ed) {
        curatedKeys.add(ed.key);
        const label = directionalLabelFor(ed);
        const review = ed.data.needs_review ? " ⚠️ *(curaduría preliminar)*" : "";
        body.push(`### ${link}`, "");
        body.push(`**${label}**${review}`, "");
        if (ed.data.short_explanation) body.push(ed.data.short_explanation, "");
        if (ed.data.source_refs?.length) {
          body.push(
            ...ed.data.source_refs.map(
              (s) => `- 📖 ${s.text}${s.ref ? ` — *${s.ref}*` : ""}: ${s.reason}`,
            ),
            "",
          );
        }
      } else {
        body.push(`- ${link}`);
      }
    }
    body.push("");
  }

  writeFileSync(join(dir, `${fileName(n.id)}.md`), fm.join("\n") + body.join("\n"));
  written++;
}

// ── Nota índice ───────────────────────────────────────────────────────────
const counts = new Map<string, number>();
for (const n of BNODES) counts.set(n.cat, (counts.get(n.cat) ?? 0) + 1);
const index: string[] = [
  "---",
  "tags: [indice]",
  "---",
  "",
  "# Mente Cósmica — Índice",
  "",
  `Exportado del grafo de [jashmal.org](https://jashmal.org): **${written} nodos** y **${BEDGES.length} conexiones** (${curatedKeys.size} con curaduría del Sofer).`,
  "",
  "| Categoría | Nodos |",
  "|---|---|",
  ...[...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([c, k]) => `| ${BRAIN_CATS[c]?.label ?? c} | ${k} |`),
  "",
  "Abre la **Graph view** (Ctrl/Cmd+G) para ver el cerebro completo.",
  "",
];
writeFileSync(join(OUT, "_Índice.md"), index.join("\n"));

// ── Colores del grafo de Obsidian = paleta de la Mente Cósmica ────────────
const graphCfgPath = join(VAULT, ".obsidian", "graph.json");
try {
  const cfg = existsSync(graphCfgPath)
    ? JSON.parse(readFileSync(graphCfgPath, "utf8"))
    : {};
  cfg.colorGroups = Object.entries(BRAIN_CATS).map(([key, c]) => ({
    query: `tag:#${tagOf(key)}`,
    color: { a: 1, rgb: parseInt(c.c.slice(1), 16) },
  }));
  writeFileSync(graphCfgPath, JSON.stringify(cfg, null, 2));
  console.log("✓ Colores del grafo de Obsidian sincronizados con la paleta.");
} catch (e) {
  console.warn("No se pudo actualizar graph.json:", e);
}

console.log(`✓ ${written} notas escritas en "${OUT}"`);
console.log(`✓ ${BEDGES.length} conexiones (${curatedKeys.size} curadas con fuentes)`);
