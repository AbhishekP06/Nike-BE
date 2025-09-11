const express = require('express');
const router = express.Router();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', async (req, res) => {
    try {
        const { items = [], currency = "inr", shipping } = req.body;
    
        const line_items = items.map((it) => ({
          price_data: {
            currency,
            product_data: {
              name: it.name,
              images: it.image ? [it.image] : [],
              metadata: { id: String(it.id || it._id || "") },
            },
            unit_amount: Math.round(Number(it.price) * 100), // to smallest unit
          },
          quantity: Number(it.quantity) || 1,
        }));
    
        const shipping_amount = shipping?.amount ? Math.round(Number(shipping.amount)) : 0;
        if (shipping_amount > 0) {
          line_items.push({
            price_data: {
              currency,
              product_data: { name: "Delivery & Handling" },
              unit_amount: shipping_amount,
            },
            quantity: 1,
          });
        }
    
        const session = await stripe.checkout.sessions.create({
          mode: "payment",
          payment_method_types: ["card"],
          line_items,
          success_url: `${FRONTEND_URL}/order-summary?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${FRONTEND_URL}/cart`,
          metadata: {
            source: "nike-fe",
          },
        });
    
        // Prefer returning URL for immediate redirect
        return res.status(201).json({ id: session.id, url: session.url });
      } catch (e) {
        console.error(e);
        return res.status(400).send(e?.message || "Unable to create checkout session");
      }
    });

module.exports = router;