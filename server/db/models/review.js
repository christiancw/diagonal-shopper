const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('review', {
  rating: {
    type: Sequelize.INTEGER, // may want to limit somehow 1-5
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    // allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false // may want to validate a minimum length
  }
});
