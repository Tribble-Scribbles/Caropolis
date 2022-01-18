const Sequelize = require('sequelize')
const db = require('../db')
const { STRING, INTEGER } = Sequelize.DataTypes

const Order = db.define('orders', {})

module.exports = Order;
