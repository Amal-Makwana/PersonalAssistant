import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Pool } from 'pg';
import type { PoolClient, QueryResultRow } from 'pg';

const parseEnvFile = (filePath: string) => {
  const content = readFileSync(filePath, 'utf-8');
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

const loadLocalEnv = () => {
  const moduleDir = dirname(fileURLToPath(import.meta.url));
  const apiRootFromModule = resolve(moduleDir, '..');

  const candidatePaths = [
    resolve(process.cwd(), '.env.local'),
    resolve(process.cwd(), 'apps/api/.env.local'),
    resolve(apiRootFromModule, '.env.local')
  ];

  for (const localEnvPath of candidatePaths) {
    if (existsSync(localEnvPath)) {
      parseEnvFile(localEnvPath);
      break;
    }
  }
};

loadLocalEnv();

const connectionString = process.env.DATABASE_URL;

if (!connectionString && process.env.NODE_ENV !== 'test') {
  console.warn('DATABASE_URL is not set. Add it to reminder-app/apps/api/.env.local to enable DB-backed /events.');
}

const pool = new Pool({ connectionString });

export const query = <T extends QueryResultRow>(text: string, params?: unknown[]) => pool.query<T>(text, params);

export const closeDbPool = async () => pool.end();

export const withDbClient = async <T>(handler: (client: PoolClient) => Promise<T>) => {
  const client = await pool.connect();
  try {
    return await handler(client);
  } finally {
    client.release();
  }
};
