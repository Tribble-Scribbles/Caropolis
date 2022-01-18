const router = require('express').Router()
const { models: { Car, Order, User }} = require('../db')

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.send(orders);
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    //needs to receive userId, and the cart which is an array
    const id = req.body.userId;
    const cart = req.body.cart;
    const order = await Order.create({})
    const user = await User.findByPk(id)

    user.addOrder(order)

    cart.forEach( async (car) => {
      const foundCar = await Car.findByPk(car.id)
      foundCar.setOrder(order)
    })

    res.status(201).send(order);
  } catch (error) {
    next(error)
  }
})

module.exports = router;
