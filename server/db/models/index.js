'use strict'

const User = require('./user');
const Product = require('./product');
const Review = require ('./review');
const Order = require('./order');
const Orderitems = require('./orderitems');

Order.belongsTo(User)
User.hasMany(Order)
//getOrders
//

Orderitems.belongsTo(Order)
Order.belongsToMany(OrderItems)
//getOrderitems
Orderitems.belongsTo(Product)

Review.belongsTo(User)
User.belongsToMany(Review)
Review.belongsTo(Product)
Product.belongsToMany(Review)

module.exports = {User, Product, Review, Order, Orderitems}

//Student.belongsTo(Campus)
//Campus.hasMany(Student)
