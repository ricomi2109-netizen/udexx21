import fs from 'node:fs';
import path from 'node:path';
import initSqlJs, { type Database } from 'sql.js';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const dataDirectory = path.resolve(process.env.AURORA_DATA_DIR ?? path.join(process.cwd(), 'data'));
const databasePath = path.resolve(process.env.DATABASE_PATH ?? path.join(dataDirectory, 'aurora.sqlite'));
let database: Database;

export interface ProgressSnapshot {
  ids: string[];
  completedAt: Record<string, string>;
}

export async function initializeDatabase() {
  fs.mkdirSync(path.dirname(databasePath), { recursive: true });
  const SQL = await initSqlJs({
    locateFile: (file) => path.join(path.dirname(require.resolve('sql.js')), file),
  });
  database = fs.existsSync(databasePath) ? new SQL.Database(fs.readFileSync(databasePath)) : new SQL.Database();
  database.run(`
    CREATE TABLE IF NOT EXISTS task_progress (
      wallet_address TEXT NOT NULL,
      task_id TEXT NOT NULL,
      completed_at TEXT NOT NULL,
      PRIMARY KEY (wallet_address, task_id)
    );
  `);
  persist();
}

function persist() {
  fs.writeFileSync(databasePath, Buffer.from(database.export()));
}

export function getProgress(walletAddress: string): ProgressSnapshot {
  const result = database.exec(`
    SELECT task_id, completed_at
    FROM task_progress
    WHERE wallet_address = '${walletAddress}'
    ORDER BY completed_at DESC
  `);
  const rows = result[0]?.values ?? [];
  const ids = rows.map((row) => String(row[0]));
  const completedAt = Object.fromEntries(rows.map((row) => [String(row[0]), String(row[1])]));
  return { ids, completedAt };
}

export function completeTask(walletAddress: string, taskId: string) {
  database.run(
    'INSERT OR IGNORE INTO task_progress (wallet_address, task_id, completed_at) VALUES (?, ?, ?)',
    [walletAddress, taskId, new Date().toISOString()],
  );
  persist();
  return getProgress(walletAddress);
}

export function resetProgress(walletAddress: string) {
  database.run('DELETE FROM task_progress WHERE wallet_address = ?', [walletAddress]);
  persist();
}
