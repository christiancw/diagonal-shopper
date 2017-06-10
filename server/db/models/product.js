const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  department: {
    type: Sequelize.ENUM('Potions', 'Wands', 'Brooms'),
    allowNull: false
  },
  // categories: {
  //   type: Sequelize.ARRAY(Sequelize.TEXT)
  // }, because apparently array is not the way to go... let's use depts for simplicity then
  imageURL: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  availableInventory: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  }
}, {});
