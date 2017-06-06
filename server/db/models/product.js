const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  department: {
    type: Sequelize.STRING
  },
  categories: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  },
  imageURL: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.INTEGER
  },
  availableInventory: {
    type: Sequelize.INTEGER
  },
  description: {
    type: Sequelize.TEXT
  }
}, {});
