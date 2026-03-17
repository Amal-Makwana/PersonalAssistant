import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { Pool } from 'pg';
import type { QueryResultRow } from 'pg';

const loadLocalEnv = () => {
  const localEnvPath = resolve(process.cwd(), '.env.local');
  if (!existsSync(localEnvPath)) {
    return;
  }

  const content = readFileSync(localEnvPath, 'utf-8');
  for (const rawLine of content.split('\n')) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) {
      continue;
    }

    const separatorIndex = line.indexOf('=');
    if (separatorIndex <= 0) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, '');

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
};

loadLocalEnv();

const connectionString = process.env.DATABASE_URL;

if (!connectionString && process.env.NODE_ENV !== 'test') {
  console.warn('DATABASE_URL is not set. API DB queries will fail until it is configured.');
}

const pool = new Pool({ connectionString });

export const query = <T extends QueryResultRow>(text: string, params?: unknown[]) => pool.query<T>(text, params);

export const closeDbPool = async () => pool.end();
