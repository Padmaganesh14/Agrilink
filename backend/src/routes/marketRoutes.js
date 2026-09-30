import express from 'express';
import { analyzeMarket } from '../controllers/marketController.js';

const router = express.Router();

router.post('/analyze', analyzeMarket);

export default router;
