import express from 'express';
import { startTracking, getTracking } from '../controllers/trackingController.js';

const router = express.Router();

router.post('/start', startTracking);
router.get('/:id', getTracking);

export default router;
