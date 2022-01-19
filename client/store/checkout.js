import axios from 'axios'
import history from '../history'

const CHECKOUT = 'CHECKOUT'

export const _checkout = response => {
  return {
    type: CHECKOUT,
    response
  }
}

export const stripeCheckout = (cart, auth) => {
  return async dispatch => {
    try {
      // const obj = {cart}
      const response = (await axios.post(`/stripe/create-checkout-session/${cart}`))
      console.log('response!', response)

      history.push('/')

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