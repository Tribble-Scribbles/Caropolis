const router = require('express').Router()
const stripe = require('stripe')('sk_test_51KJR7qK0FFw79ydDcUdrUKg8TBOh0rSXKjGm16MSd8thb1qeRNkjssQHsc6W4lyx49MB6LDrpnd9dwsSvJdh6sqq00bBw7qdvb')

router.post('/create-checkout-session/:totalPrice', async (req, res, next) => {
  try {
    const totalPrice = req.params.totalPrice
    const session = await stripe.checkout.sessions.create({
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Cars Cart',
          },
          unit_amount: +totalPrice,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'caropolis.herokuapp.com/success',
      cancel_url: 'caropolis.herokuapp.com/canceled',
    });
    res.redirect(303, session.url);
  } catch (error) {
    next(error)
  }
});

module.exports = router
