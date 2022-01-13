//this is the access point for all things database related!

const db = require('./db')

const Car = require('./models/Car')
const User = require('./models/User')
const Order = require('./models/Order')

//associations could go here!
User.hasMany(Order)
Order.belongsTo(User)

Order.hasMany(Car)
Car.belongsTo(Order)

module.exports = {
  db,
  models: {
    User,
    Car,
    Order
  },
}
