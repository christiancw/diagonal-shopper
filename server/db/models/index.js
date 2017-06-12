'use strict'

const User = require('./user');
const Product = require('./product');
const Review = require ('./review');
const Order = require('./order');
const OrderItems = require('./orderitems');

Order.belongsTo(User) // order.getUser(), order.setUser()
User.hasMany(Order) // user.getOrders(), user.setOrders(), user.addOrder()
//getOrders
//

// OrderItems.belongsToMany(Order, {through: 'banana'})
// Order.belongsToMany(OrderItems)
// Product.belongsTo(OrderItems)
OrderItems.belongsTo(Product) // orderitem.setProduct
OrderItems.belongsTo(Order) // orderitem.setOrder
//
Review.belongsTo(User)
// User.belongsToMany(Review)
Review.belongsTo(Product)
// Product.belongsToMany(Review)

module.exports = {User, Product, Review, Order, OrderItems}

//Student.belongsTo(Campus)
//Campus.hasMany(Student)
