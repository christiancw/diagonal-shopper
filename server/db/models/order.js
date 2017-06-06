const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('order', {
  status: {
    type: Sequelize.ENUM('created', 'processing', 'cancelled', 'completed')
  },
  totalPrice: {
    // may need to calculate
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  dateSubmitted: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  instanceMethods: {
    placeOrder () {
    }
  }
});
