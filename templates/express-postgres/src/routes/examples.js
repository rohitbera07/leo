import { Router } from 'express';
import { pool } from '../config/db.js';
const router = Router();
router.get('/', async (_req, res) => res.json((await pool.query('SELECT NOW() AS now')).rows));
export default router;
