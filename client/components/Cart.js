import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, clearCart, removeFromCart } from '../store/cart';

const Cart = () => {
  const dispatch = useDispatch()
  const { cart, auth } = useSelector((state) => {
    return {
      cart: state.cart,
      auth: state.auth
    }
  })
  useEffect(() => {
    dispatch(fetchCart(auth))
  }, [])
  const itemsPrice = cart.reduce((accum, curr) => accum + curr.price, 0)
  const taxPrice = itemsPrice * 0.075;
  const shippingPrice = itemsPrice > 250000 ? 500 : 7500;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  return (
    <div id="cart-main">
      <h2>Cart Items</h2>
      <div>{cart.length === 0 && <div>Cart is Empty</div>}</div>
      {cart.length !== 0 && (
        <>
          <hr></hr>
          {cart.map(item => {
            return (
              <div key={item.id}>
                <h2>{item.model}</h2>
                <button onClick={() => dispatch(removeFromCart(item.id, auth))}>x</button>
              </div>
            )
          })}
          <div className="row">
            <div className="col-2">Items Price</div>
            <div className="col-1 text-right">${itemsPrice.toFixed(2)}</div>
          </div>
          <div className="row">
            <div className="col-2">Tax Price</div>
            <div className="col-1 text-right">${taxPrice.toFixed(2)}</div>
          </div>
          <div className="row">
            <div className="col-2">Shipping Price</div>
            <div className="col-1 text-right">${shippingPrice.toFixed(2)}</div>
          </div>
          <div className="row">
            <div className="col-2"><strong>Total Price</strong></div>
            <div className="col-1 text-right"><strong>${totalPrice.toFixed(2)}</strong></div>
          </div>
          <hr/>
          <div className="row">
            <button onClick={() => alert('Implement Checkout')}>
              Checkout
            </button>
            <button onClick={() => dispatch(clearCart(auth))}>
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart
