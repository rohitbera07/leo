import { Router } from 'express';
import { dbState } from '../config/db.js';
const router = Router();
router.get('/health', (_req, res) => res.json({ status: 'ok', database: dbState() === 1 ? 'connected' : 'not-connected' }));
export default router;
