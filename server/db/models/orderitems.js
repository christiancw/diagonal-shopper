const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('orderitem', {
  quantity: {
    type: Sequelize.INTEGER
  },
  price: {
    type: Sequelize.DECIMAL
  }
}, {});
