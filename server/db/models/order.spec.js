const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('orderitems', {
  quantity: {
    type: Sequelize.INTEGER
  }
}, {});
