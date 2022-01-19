const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();
const stripe = require('stripe')('sk_test_51KJR7qK0FFw79ydDcUdrUKg8TBOh0rSXKjGm16MSd8thb1qeRNkjssQHsc6W4lyx49MB6LDrpnd9dwsSvJdh6sqq00bBw7qdvb')
module.exports = app;

// logging middleware
app.use(morgan("dev"));

// body parsing middleware
app.use(express.json());

// auth and api routes
app.use("/auth", require("./auth"));
app.use("/api", require("./api"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "public/index.html"))
);

app.post('/create-checkout-session', async (req, res) => {
  console.log('REQ', req)
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: 500000,
        quantity: 1
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:8080/?success=true',
    cancel_url: 'http://localhost:8080?canceled=true',
  });

  res.redirect(303, session.url);
});
// static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")));

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

// sends index.html
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public/index.html"));
});

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});
