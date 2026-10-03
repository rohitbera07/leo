import express from 'express';
import cors from 'cors';
import health from './routes/health.js';
import examples from './routes/examples.js';
import { errorHandler } from './middleware/error.js';
export const app = express();
app.use(cors()); app.use(express.json()); app.use(health); app.use('/api/examples', examples); app.use(errorHandler);
