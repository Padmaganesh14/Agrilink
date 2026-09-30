import express from 'express';
import { matchTransport } from '../controllers/transportController.js';

const router = express.Router();

router.post('/match', matchTransport);

export default router;
