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

export const fetchCart = (auth) => {
  return async dispatch => {
    try {
      if(auth.id !== null) {
        let cart = localStorage.getItem(`cart-${auth.id}`)
        cart = JSON.parse(cart)

        if(cart === null) {
          localStorage.setItem(`cart-${auth.id}`, JSON.stringify([]))
          dispatch(_setCart([]))
          return
        }
        dispatch(_setCart(cart))
        return
      } else if(auth === {}) {
        let cart = localStorage.getItem("guestCart")
        cart = JSON.parse(cart)

        if(cart === null) {
          localStorage.setItem("guestCart", JSON.stringify([]))
          cart = localStorage.getItem("guestCart")
          cart = JSON.parse(cart)
        }
        dispatch(_setCart(cart))
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export const addToCart = (item, auth) => {
  return async dispatch => {
    try {
      if(auth.id !== null) {
        let cart = localStorage.getItem(`cart-${auth.id}`)
        cart = JSON.parse(cart)

        if(cart === null) {
          localStorage.setItem(`cart-${auth.id}`, JSON.stringify([]))
          dispatch(_setCart([]))
          cart = localStorage.getItem(`cart-${auth.id}`)
          cart = JSON.parse(cart)
        }
        const cartCopy = [...cart]
        cartCopy.push(item)
        localStorage.setItem(`cart-${auth.id}`, JSON.stringify(cartCopy))
        dispatch(_addItem(item))
        return
      } else if(auth === {}) {
        let cart = localStorage.getItem("guestCart")
        cart = JSON.parse(cart)
        if(cart === null) {
          localStorage.setItem("guestCart", JSON.stringify([]))
          cart = localStorage.getItem("guestCart")
          cart = JSON.parse(cart)
          dispatch(_setCart(cart))
        }
        dispatch(_addItem(item))
        const cartCopy = [...cart]
        cartCopy.push(item)
        localStorage.setItem("guestCart", JSON.stringify(cartCopy))
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export const clearCart = auth => {
  return async dispatch => {
    try {
      const empty = []
      if(auth.id !== null) {
        localStorage.setItem(`cart-${auth.id}`, JSON.stringify(empty))
      } else if(auth === {}) {
        localStorage.setItem("guestCart", JSON.stringify(empty))
      }
      dispatch(_clearCart(empty))
    } catch (error) {
      console.error(error)
    }
  }
}

export const removeFromCart = (id, auth) => {
  return async dispatch => {
    try {
      let cartString = "guestCart"
      if(auth.id !== null) {
        cartString = `cart-${auth.id}`
      } 
      let cart = localStorage.getItem(`${cartString}`)
      cart = JSON.parse(cart)
      cart = cart.filter(e => e.id !== id)
      localStorage.setItem(`${cartString}`, JSON.stringify(cart))
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