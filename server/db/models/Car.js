const Sequelize = require('sequelize')
const db = require('../db')
const { STRING, INTEGER, DECIMAL } = Sequelize.DataTypes

const Car = db.define('cars', {
  vin: {
    type: STRING,
    allowNull: false,
  },
  trim: {
    type: STRING,
    allowNull: false,
  },
  bodyType: {
    type: STRING,
    allowNull: false,
  },
  mileage: {
    type: STRING,
    allowNull: false,
  },
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
  city: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  qty: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 1,
  },

})

module.exports = Car
