import express from 'express';
const router = express.Router();

import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
} from '../controllers/orderController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

// @desc    Create new order / Get all orders (admin)
// @route   POST /api/orders / GET /api/orders
// @access  Private / Private/Admin
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);

// ✅ Move this up so it doesn’t get caught by `/:id`
router.get('/myOrders', protect, getMyOrders);

// @desc    Get PayPal Client ID
// @route   GET /api/orders/paypal/clientId
// @access  Public
router.get('/paypal/clientId', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
router.route('/:id').get(protect, getOrderById);

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
router.route('/:id/pay').put(protect, updateOrderToPaid);

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router;
