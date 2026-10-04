import express from 'express';
import { createOrder, getOrder, getOrdersBySeller } from '../controllers/orderController.js';

const router = express.Router();

router.post('/create', createOrder);
router.get('/seller/:sellerId', getOrdersBySeller);
router.get('/:id', getOrder);

export default router;
