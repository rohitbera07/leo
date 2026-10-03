import { app } from './app.js';
import { checkDb } from './config/db.js';
const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => console.log(`API listening on http://localhost:${port}`));
checkDb().catch((err) => console.warn('PostgreSQL unavailable; /health remains available:', err.message));
