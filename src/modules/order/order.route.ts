import express from 'express';
import { OrderController } from './order.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/', auth('admin', 'manager', 'user'), OrderController.createOrder);
router.get('/', auth('admin', 'manager', 'user'), OrderController.getOrders);
router.patch('/:id/status', auth('admin', 'manager'), OrderController.updateOrderStatus);

export const OrderRoutes = router;
