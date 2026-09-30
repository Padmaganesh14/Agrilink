import express from 'express';
import { createPromotion } from '../controllers/promotionController.js';

const router = express.Router();

router.post('/create', createPromotion);
router.post('/broadcast', createPromotion);

export default router;
