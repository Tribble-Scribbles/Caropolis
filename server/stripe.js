const router = require('express').Router()
const stripe = require('stripe')('sk_test_51KJR7qK0FFw79ydDcUdrUKg8TBOh0rSXKjGm16MSd8thb1qeRNkjssQHsc6W4lyx49MB6LDrpnd9dwsSvJdh6sqq00bBw7qdvb')
// const cors = require('cors')
// create a checkout session
// stripe/create-checkout-session
// router.options('/create-checkout-session', cors())
// const corsOptions = {
//   origin: '/',
// }

router.post('/create-checkout-session/:totalPrice', async (req, res, next) => {
  try {
    // const { cart } = req.body
    console.log('REQ BODY IN POST', req.body)
    const totalPrice = req.params.totalPrice
    console.log('price', totalPrice)
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
      success_url: 'http://localhost:8080/?success=true',
      cancel_url: 'http://localhost:8080/?canceled=true',
    });
    // console.log('SESSIONEY IN STRIPE', session.url)
    res.redirect(session.url)
    // res.redirect(303, session.url);
    // res.send(session.url)
    // res.header("Access-Control-Allow-Origin", "*");
    
    // const paymentIntent = await stripe.paymentIntents.create({
      //   amount: 20000,
      //   currency: "usd",
      //   payment_method_types: ['card']
      // });
      // console.log('intent', paymentIntent)
      // res.send({
        //   clientSecret: paymentIntent.client_secret,
        // });
      // res.status(200).redirect('https://www.google.com')
  } catch (error) {
    next(error)
  }
});

module.exports = router
