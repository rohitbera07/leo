import { Router } from 'express';
import { Example } from '../models/example.js';
const router = Router();
router.get('/', async (_req, res) => res.json(await Example.find().lean()));
router.post('/', async (req, res) => res.status(201).json(await Example.create(req.body)));
export default router;
