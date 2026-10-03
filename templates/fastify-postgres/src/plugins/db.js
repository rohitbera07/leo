import pg from 'pg';
const { Pool } = pg;
export function createDb() { return new Pool({ connectionString: process.env.DATABASE_URL }); }
