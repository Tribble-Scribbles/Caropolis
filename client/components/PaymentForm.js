import React from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const PaymentForm = () => {
  const elements = useElements()
  const stripe = useStripe()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if(!stripe || !elements) {
      return;
    }
    // const {clientSecret} = await fetch('localhost:8080/create-payment-intent', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //     body: JSON.stringify({
    //       paymentMethodType: 'card',
    //       currency: 'usd'
    //     }),
    // }).then(r => r.json())
    // const {paymentIntent} = stripe.confirmCardPayment(
    //   clientSecret, {
    //     payment_method: {
    //       card: elements.getElement(CardElement)
    //     }
    //   }
    // )
    // const cardElement = elements.getElement(CardElement)
    // console.log('card', cardElement)
    // console.log('paymentIntent id:', paymentIntent.id, 'status', paymentIntent.status)
  }
  return (
    <form action="/stripe/create-checkout-session" method="POST">
      <label htmlFor="card-element">Card</label>
      <CardElement id="card-element"/>

      <button>Pay</button>
    </form>
  )
}

export default PaymentForm
