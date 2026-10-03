import Fastify from 'fastify';
import cors from '@fastify/cors';
import { createDb } from './plugins/db.js';
import health from './routes/health.js';
export function buildApp() {
  const app = Fastify({ logger: true });
  app.register(cors);
  const db = createDb();
  app.decorate('db', db);
  app.addHook('onClose', async () => db.end());
  app.register(health);
  app.get('/api/examples', async () => (await app.db.query('SELECT NOW() AS now')).rows);
  return app;
}
