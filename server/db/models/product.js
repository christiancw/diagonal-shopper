const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    // allowNull: false
  },
  department: {
    type: Sequelize.STRING
  },
  categories: {
    type: Sequelize.ENUM('Wands', 'Potions', 'Brooms'),
    // allowNull: false
  },
  imageURL: {
    type: Sequelize.STRING
    // defaultValue: -insert placeholder image url later-
  },
  price: {
    type: Sequelize.INTEGER
    // allowNull: false
  },
  availableInventory: {
    type: Sequelize.INTEGER
    // allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  }
}, {});
