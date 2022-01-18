import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../store/cart';


const Cart = () => {
  const dispatch = useDispatch()
  const { cart } = useSelector((state) => {
    return {
      cart: state.cart
    }
  })
  useEffect(() => {
    dispatch(fetchCart())
  }, [])
  const itemsPrice = cart.reduce((accum, curr) => accum + curr.price * curr.qty, 0)
  const taxPrice = itemsPrice * 0.075;
  const shippingPrice = itemsPrice > 250000 ? 500 : 7500;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  console.log('CART', cart)
  
  return (
    <div id="cart-main">
      <h2>Cart Items</h2>
      <div>{cart.length === 0 && <div>Cart is Empty</div>}</div>
      {cart.length !== 0 && (
        <>
          <hr></hr>
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
          </div>
        </>
      )}
      SUPPPPPP
    </div>
  )
}

export default Cart
