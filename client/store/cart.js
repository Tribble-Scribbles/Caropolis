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
      if(auth.id) {
        let cart = localStorage.getItem(`cart-${auth.id}`)
        cart = JSON.parse(cart)

        if(cart === null) {
          localStorage.setItem(`cart-${auth.id}`, JSON.stringify([]))
          dispatch(_setCart([]))
          return
        }
        dispatch(_setCart(cart))
        return
      } else {
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
      if(auth.id) {
        let cart = localStorage.getItem(`cart-${auth.id}`)
        cart = JSON.parse(cart)

        if(cart === null) {
          localStorage.setItem(`cart-${auth.id}`, JSON.stringify([]))
          dispatch(_setCart([]))
          cart = localStorage.getItem(`cart-${auth.id}`)
          cart = JSON.parse(cart)
        }
        const cartCopy = [...cart]
        for(let i = 0; i < cartCopy.length; i++) {
          if(cartCopy[i].id === item.id) return
        }
        cartCopy.push(item)
        localStorage.setItem(`cart-${auth.id}`, JSON.stringify(cartCopy))
        dispatch(_addItem(item))
        return
      } else {
        let cart = localStorage.getItem("guestCart")
        cart = JSON.parse(cart)
        if(cart === null) {
          localStorage.setItem("guestCart", JSON.stringify([]))
          cart = localStorage.getItem("guestCart")
          cart = JSON.parse(cart)
          dispatch(_setCart(cart))
        }
        const cartCopy = [...cart]
        for(let i = 0; i < cartCopy.length; i++) {
          if(cartCopy[i].id === item.id) return
        }
        cartCopy.push(item)
        localStorage.setItem("guestCart", JSON.stringify(cartCopy))
        dispatch(_addItem(item))
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
      if(auth.id) {
        localStorage.setItem(`cart-${auth.id}`, JSON.stringify(empty))
      } else {
        localStorage.setItem("guestCart", JSON.stringify(empty))
      }
      dispatch(_clearCart(empty))
    } catch (error) {
      console.error(error)
    }
  }
}

export const mergeCart = auth => {
  return async dispatch => {
    try {
      let cart = localStorage.getItem(`cart-${auth.id}`)
      cart = JSON.parse(cart)

      if(cart === null) {
        localStorage.setItem(`cart-${auth.id}`, JSON.stringify([]))
        cart = localStorage.getItem(`cart-${auth.id}`)
        cart = JSON.parse(cart)
      }

      let guestCart = localStorage.getItem("guestCart")
      guestCart = JSON.parse(guestCart)

      const newCart = [...cart, ...guestCart]

      localStorage.setItem(`cart-${auth.id}`, JSON.stringify(newCart))
      localStorage.setItem('guestCart', JSON.stringify([]))
      dispatch(_setCart(newCart))
    } catch (error) {
      console.error(error)
    }
  }
}

export const removeFromCart = (id, auth) => {
  return async dispatch => {
    try {
      let cartString = "guestCart"
      if(auth.id) {
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
