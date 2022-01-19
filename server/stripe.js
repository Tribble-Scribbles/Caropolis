const router = require('express').Router()
const stripe = require('stripe')('sk_test_51KJR7qK0FFw79ydDcUdrUKg8TBOh0rSXKjGm16MSd8thb1qeRNkjssQHsc6W4lyx49MB6LDrpnd9dwsSvJdh6sqq00bBw7qdvb')

// create a checkout session
// stripe/create-checkout-session
router.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'T-shirt',
        },
        unit_amount: 2000,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: 'http://localhost:8080/?success=true',
    cancel_url: 'http://localhost:8080?canceled=true',
  });

  res.redirect(303, session.url);
});

module.exports = router
