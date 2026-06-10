// Migración + siembra del cerebro en Neon Postgres.
// Uso: npx tsx scripts/brain-migrate.ts
// Carga DATABASE_URL desde .env.local y crea/siembra las tablas (idempotente).
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ensureBrainTables, seedBrain, getBrainGraph } from "../lib/nodes/brainStore";

// cargar .env.local en process.env (sin pisar lo ya definido)
try {
  const envText = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
  for (const line of envText.split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && process.env[m[1]] === undefined) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
} catch {
  console.warn("No se pudo leer .env.local");
}

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("✗ DATABASE_URL no está definida. Aborto.");
    process.exit(1);
  }
  console.log("→ Creando tablas (si no existen)...");
  const ok = await ensureBrainTables();
  if (!ok) {
    console.error("✗ No hay conexión a la BD.");
    process.exit(1);
  }
  console.log("✓ Tablas listas.");

  console.log("→ Sembrando desde brainData...");
  const { nodes, edges } = await seedBrain();
  console.log(`✓ Semilla aplicada (intentados: ${nodes} nodos, ${edges} aristas; duplicados ignorados).`);

  const graph = await getBrainGraph();
  console.log(`✓ El cerebro ahora tiene ${graph?.nodes.length ?? 0} sinapsis y ${graph?.edges.length ?? 0} conexiones aprobadas.`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error("✗ Error:", e);
    process.exit(1);
  });
