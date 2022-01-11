//this is the access point for all things database related!

const db = require('./db')

const Car = require('./models/Car')
const User = require('./models/User')

//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Car
  },
}
