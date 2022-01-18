import axios from 'axios'

const SET_CART = 'SET_CART'
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'

export const _setCart = cart => {
  return {
    type: SET_CART,
    cart
  }
}

export const _addItem = item => {
  return {
    type: ADD_ITEM,
    item
  }
}

export const _removeItem = item => {
  return {
    type: REMOVE_ITEM,
    item
  }
}

export const fetchCart = () => {
  return async dispatch => {
    try {
      let cart = localStorage.getItem("cart")
      cart = JSON.parse(cart)
      if(cart === null) {
        const x = []
        localStorage.setItem("cart", JSON.stringify(x))
      }
      dispatch(_setCart(cart))
    } catch (error) {
      next(error)
    }
  }
}

export const addToCart = item => {
  return async dispatch => {
    try {
      let cart = localStorage.getItem("cart")
      cart = JSON.parse(cart)
      if(cart === null) {
        const x = []
        localStorage.setItem("cart", JSON.stringify(x))
        cart = localStorage.getItem("cart")
        cart = JSON.parse(cart)
      }
      const cartCopy = [...cart]
      cartCopy.push(item)
      localStorage.setItem("cart", JSON.stringify(cartCopy))
      dispatch(_addItem(item))
    } catch (error) {
      next(error)
    }
  }
}

export const removeFromCart = id => {
  return async dispatch => {
    try {
      const carItem = (await axios.get(`/api/cars/${id}`)).data
      dispatch(_removeItem(carItem))
    } catch (error) {
      next(error)
    }
  }
}

export default function cartReducer (state = [], action) {
  switch(action.type) {
    case SET_CART:
      return action.cart
    case ADD_ITEM:
      return [...state, action.item]
    case REMOVE_ITEM:
      return state.filter(e => e !== action.item)
    default:
      return state
  }
}