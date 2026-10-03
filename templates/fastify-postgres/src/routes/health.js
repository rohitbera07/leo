export default async function health(fastify) { fastify.get('/health', async () => ({ status: 'ok' })); }
