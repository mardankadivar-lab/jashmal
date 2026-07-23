import { neon } from '@neondatabase/serverless';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Read DATABASE_URL from .env.local
const envPath = '/Users/mardan/workspace/jashmal/.env.local';
const envText = readFileSync(envPath, 'utf8');
let dbUrl = null;
for (const line of envText.split('\n')) {
  const m = line.match(/^\s*DATABASE_URL\s*=\s*(.*)\s*$/);
  if (m) {
    dbUrl = m[1].trim().replace(/^["']|["']$/g, '');
    break;
  }
}
if (!dbUrl) {
  console.error('ERROR: DATABASE_URL no encontrada en .env.local');
  process.exit(2);
}

const OUT_DIR = '/Users/mardan/Desktop/Claude Jashmal/Backups/2026-07-21';
const sql = neon(dbUrl);

function jsonReplacer(_k, v) {
  return typeof v === 'bigint' ? v.toString() : v;
}

async function main() {
  // 1. Enumerate all tables in public schema
  let tables;
  try {
    const rows = await sql`
      SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
      ORDER BY table_name`;
    tables = rows.map(r => r.table_name);
  } catch (e) {
    console.error('ERROR: fallo la conexion o el listado de tablas: ' + e.message);
    process.exit(3);
  }

  const summary = { fecha: '2026-07-21', tablas: {}, errores: {}, total_filas: 0 };
  let totalBytes = 0;

  for (const t of tables) {
    try {
      // Quote identifier safely
      const rows = await sql.query(`SELECT * FROM "${t.replace(/"/g, '""')}"`);
      const json = JSON.stringify(rows, jsonReplacer, 2);
      const file = join(OUT_DIR, `${t}.json`);
      writeFileSync(file, json);
      const bytes = Buffer.byteLength(json);
      totalBytes += bytes;
      summary.tablas[t] = rows.length;
      summary.total_filas += rows.length;
      console.log(`OK  ${t}: ${rows.length} filas (${bytes} bytes)`);
    } catch (e) {
      summary.errores[t] = e.message;
      console.error(`FALLO ${t}: ${e.message}`);
    }
  }

  summary.tamano_total_bytes = totalBytes;
  summary.tamano_total_legible = (totalBytes / 1024).toFixed(1) + ' KB';
  writeFileSync(join(OUT_DIR, '_resumen.json'), JSON.stringify(summary, null, 2));
  console.log('---RESUMEN---');
  console.log(JSON.stringify(summary, null, 2));
}

main().catch(e => { console.error('ERROR fatal: ' + e.message); process.exit(1); });
