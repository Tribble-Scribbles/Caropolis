const { INTEGER } = require('sequelize')
const Sequelize = require('sequelize')
const db = require('../db')
const { STRING, INTEGER } = Sequelize.DataTypes

const Car = db.define('cars', {
  year: {
    type: INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 1900,
      max: 2023
    }
  },
  make : {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  model: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: DECIMAL,
    allowNull: false,
  },
  imageUrl: {
    type: STRING,
    allowNull: false,
    validate: {
      isUrl: true
    }
  },
  color: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  origin: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  qty: {
    type: INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0
    },
    defaultValue: 1,
  }
})

module.exports = Car
