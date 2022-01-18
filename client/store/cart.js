import axios from 'axios'

const SET_CART = 'SET_CART'
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'
const CLEAR_CART = 'CLEAR_CART'

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

export const _removeItem = id => {
  return {
    type: REMOVE_ITEM,
    id
  }
}

export const _clearCart = emptyCart => {
  return {
    type: CLEAR_CART,
    emptyCart
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
        dispatch(_setCart(x))
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
      console.log('ADDED TO CART?')
    } catch (error) {
      console.log('did not add to cart')
      next(error)
    }
  }
}

export const clearCart = () => {
  return async dispatch => {
    try {
      const arr = []
      localStorage.setItem("cart", JSON.stringify(arr))
      dispatch(_clearCart(arr))
    } catch (error) {
      
    }
  }
}

export const removeFromCart = id => {
  return async dispatch => {
    try {
      let cart = localStorage.getItem("cart")
      cart = JSON.parse(cart)
      cart = cart.filter(e => e.id !== id)
      localStorage.setItem("cart", JSON.stringify(cart))
      dispatch(_removeItem(id))
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
      return state.filter(e => e.id !== action.id)
    case CLEAR_CART:
      return action.emptyCart
    default:
      return state
  }
}