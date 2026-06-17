import { neon } from '@neondatabase/serverless';
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';

// Load DATABASE_URL from .env.local manually (no dotenv dependency assumed)
const envPath = '/Users/mardan/workspace/jashmal/.env.local';
const envText = fs.readFileSync(envPath, 'utf8');
let dbUrl = null;
for (const rawLine of envText.split('\n')) {
  const line = rawLine.trim();
  if (line.startsWith('DATABASE_URL=')) {
    dbUrl = line.slice('DATABASE_URL='.length).trim();
    // strip optional surrounding quotes
    if ((dbUrl.startsWith('"') && dbUrl.endsWith('"')) || (dbUrl.startsWith("'") && dbUrl.endsWith("'"))) {
      dbUrl = dbUrl.slice(1, -1);
    }
    break;
  }
}

if (!dbUrl) {
  console.error('ERROR: DATABASE_URL no encontrado en .env.local');
  process.exit(2);
}

const day = process.argv[2];
const outDir = `/Users/mardan/Desktop/Claude Jashmal/Backups/${day}`;
fs.mkdirSync(outDir, { recursive: true });

const sql = neon(dbUrl);

function bytes(n) { return n; }

(async () => {
  let tables;
  try {
    const rows = await sql`
      SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
      ORDER BY table_name`;
    tables = rows.map(r => r.table_name);
  } catch (e) {
    console.error('ERROR: no se pudo conectar/enumerar tablas: ' + e.message);
    process.exit(3);
  }

  const summary = { fecha: day, tablas: {}, errores: {}, total_filas: 0, total_bytes: 0 };

  for (const t of tables) {
    try {
      // identifier can't be parameterized; t comes from information_schema (safe), quote it
      const rows = await sql.query(`SELECT * FROM "${t}"`);
      const data = Array.isArray(rows) ? rows : (rows.rows || []);
      const json = JSON.stringify(data, null, 2);
      const file = path.join(outDir, `${t}.json`);
      fs.writeFileSync(file, json);
      const size = Buffer.byteLength(json);
      summary.tablas[t] = { filas: data.length, bytes: size };
      summary.total_filas += data.length;
      summary.total_bytes += size;
    } catch (e) {
      summary.errores[t] = e.message;
      console.error(`AVISO: tabla "${t}" falló: ${e.message}`);
    }
  }

  fs.writeFileSync(path.join(outDir, '_resumen.json'), JSON.stringify(summary, null, 2));
  console.log(JSON.stringify(summary));
})();
