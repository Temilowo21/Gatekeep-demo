// backend/controllers/paymentController.js
import Stripe from 'stripe';
import asyncHandler from '../middleware/asyncHandler.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = asyncHandler(async (req, res) => {
  const { orderItems } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }

  const line_items = orderItems.map((item) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
      },
      unit_amount: Math.round(item.price * 100), // cents
    },
    quantity: item.qty,
  }));


  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items,
    success_url: `${process.env.CLIENT_URL}/order-success`,
    cancel_url: `${process.env.CLIENT_URL}/order/${req.params.id || 'fail'}`,
  });

  res.json({ url: session.url });
});

export { createCheckoutSession };
