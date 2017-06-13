const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('review', {
  rating: {
    type: Sequelize.TEXT, // may want to limit somehow 1-5
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false // may want to validate a minimum length
  }
});
