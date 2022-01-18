import React, { useState, useEffect } from 'react'


import Navbar from './components/Navbar'
import Routes from './Routes'




const App = () => {
  let [cart, setCart] = useState([])
  
  let localCart = localStorage.getItem('cart')
  
  const addItem = (item) => {
    const cartCopy = [...cart]
    cartCopy.push(item)
    setCart(cartCopy)

    const stringCart = JSON.stringify(cartCopy)
    localStorage.setItem("cart", stringCart)
  }
  const removeItem = (itemId) => {}

  useEffect(() => {
    localCart = JSON.parse(localCart)
    if(localCart) setCart(localCart)
  }, [])

  return (
    <div>
      <Navbar />
      <Routes  cartItems={cart} addItem={addItem} removeItem={removeItem}/>
    </div>
  )
}

export default App
