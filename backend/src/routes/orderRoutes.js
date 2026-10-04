import express from 'express';
import { createOrder, getOrder, getOrdersBySeller, getOrdersByBuyer } from '../controllers/orderController.js';

const router = express.Router();

router.post('/create', createOrder);
router.get('/seller/:sellerId', getOrdersBySeller);
router.get('/buyer/:buyerName', getOrdersByBuyer);
router.get('/:id', getOrder);

export default router;
