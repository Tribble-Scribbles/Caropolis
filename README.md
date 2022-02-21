# Caropolis

An E-commerce web app that allows a user or guest to browse our listings, which feature information pulled from real listings, add cars to your cart, and "check-out" using Stripe API. We also utilized a user cart, guest cart, as well as an option to merge the guest cart into your user cart with the click of a button.

## Setup

to get up and running:
 - npm install
 - npm run seed (you may need to create a database, check console)
 - npm run start:dev
 - change lines 19 and 20 in server/stripe.js from "https://caropolis.herokuapp.com/success" & "https://caropolis.herokuapp.com/canceled" to:
 "http://localhost:8080/success" & "http://localhost:8080/canceled" respectively

### Heroku

deployed version of the app:
https://caropolis.herokuapp.com/



Now, you should be deployed!
