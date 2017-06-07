'use strict'

const User = require('./user');
const Product = require('./product');
const Review = require ('./review');
const Order = require('./order');
const OrderItems = require('./orderitems');

Order.belongsTo(User)
User.hasMany(Order)
//getOrders
//

// OrderItems.belongsToMany(Order, {through: 'banana'})
// Order.belongsToMany(OrderItems)
// Product.belongsTo(OrderItems)
OrderItems.belongsTo(Product)
OrderItems.belongsTo(Order)
//
Review.belongsTo(User)
// User.belongsToMany(Review)
Review.belongsTo(Product)
// Product.belongsToMany(Review)

module.exports = {User, Product, Review, Order, OrderItems}

//Student.belongsTo(Campus)
//Campus.hasMany(Student)
