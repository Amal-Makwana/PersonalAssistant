import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import type { QueryResultRow } from 'pg';

const localEnvPath = resolve(process.cwd(), '.env.local');
if (existsSync(localEnvPath)) {
  dotenv.config({ path: localEnvPath });
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString && process.env.NODE_ENV !== 'test') {
  console.warn('DATABASE_URL is not set. API DB queries will fail until it is configured.');
}

const pool = new Pool({ connectionString });

export const query = <T extends QueryResultRow>(text: string, params?: unknown[]) => pool.query<T>(text, params);

export const closeDbPool = async () => pool.end();
