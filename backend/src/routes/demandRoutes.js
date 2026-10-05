import express from 'express';
import { createDemand, getAllDemands, fulfillDemand } from '../controllers/demandController.js';

const router = express.Router();

router.post('/', createDemand);
router.get('/', getAllDemands);
router.put('/:id/fulfill', fulfillDemand);

export default router;
