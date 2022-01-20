const path = require('path');
const express = require('express');
const morgan = require('morgan');
const app = express();
const stripe = require('stripe')('sk_test_51KJR7qK0FFw79ydDcUdrUKg8TBOh0rSXKjGm16MSd8thb1qeRNkjssQHsc6W4lyx49MB6LDrpnd9dwsSvJdh6sqq00bBw7qdvb')
module.exports = app;
const cors = require('cors')
// logging middleware
app.use(morgan('dev'));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// auth and api routes
app.options('*', cors())
app.use("/auth", require("./auth"));
app.use("/api", require("./api"));
app.use('/stripe', require('./stripe'))

// app.post('/create-checkout-session', async (req, res, next) => {
//   try {
//     const { cart } = req.body
//     console.log('CART IN POST', cart)
//     const session = await stripe.checkout.sessions.create({
//       line_items: [{
//         price_data: {
//           currency: 'usd',
//           product_data: {
//             name: 'T-shirt',
//           },
//           unit_amount: 2000,
//         },
//         quantity: 1,
//       }],
//       mode: 'payment',
//       success_url: 'http://localhost:8080/?success=true',
//       cancel_url: 'http://localhost:8080?canceled=true',
//     });
//     console.log('SESSIONEY', session)
//     // res.status(201).redirect(session.url)
//     res.redirect(303, session.url);
//   } catch (error) {
//     next(error)
//   }
// });
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
);

// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

// sends index.html
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});
