import { app } from './app.js';
import { connectDb } from './config/db.js';
const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => console.log(`API listening on http://localhost:${port}`));
connectDb().catch((err) => console.warn('MongoDB unavailable; /health remains available:', err.message));
