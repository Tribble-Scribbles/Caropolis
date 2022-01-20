import axios from 'axios'

const CHECKOUT = 'CHECKOUT'

export const _checkout = response => {
  return {
    type: CHECKOUT,
    response
  }
}

export const stripeCheckout = (totalPrice, auth) => {
  return async dispatch => {
    try {
      const response = (await axios.post(`/stripe/create-checkout-session/${totalPrice}`))
      dispatch(_checkout(response))
    } catch (error) {
      console.log(error)
    }
  }
}

export default function checkoutReducer (state={}, action) {
  switch(action.type) {
    case CHECKOUT:
      return action.response
    default:
      return state
  }
}
