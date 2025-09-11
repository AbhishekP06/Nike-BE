const express = require('express');
const authMiddleware = require('./authMiddleware');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const FRONTEND_URL = process.env.FRONTEND_URL;

router.post('/create-checkout-session', authMiddleware, async (req, res) => {
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
                unit_amount: Math.round(Number(it.price) * 100), 
            },
            quantity: Number(it.quantity) || 1,
        }));

        const shipping_amount_rupees = shipping?.amount ? Number(shipping.amount) : 0;
        const shipping_amount_smallest = Math.round(shipping_amount_rupees * 100); 

        if (shipping_amount_smallest > 0) {
            line_items.push({
                price_data: {
                    currency,
                    product_data: { name: "Delivery & Handling" },
                    unit_amount: shipping_amount_smallest,
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

        return res.status(201).json({ id: session.id, url: session.url });
    } catch (e) {
        console.error(e);
        return res.status(400).send(e?.message || "Unable to create checkout session");
    }
});

router.get("/session/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const session = await stripe.checkout.sessions.retrieve(id, {
            expand: ["line_items", "payment_intent"],
        });
        return res.json({ session });
    } catch (e) {
        console.error(e);
        return res.status(400).send(e?.message || "Unable to retrieve session");
    }
});

module.exports = router;