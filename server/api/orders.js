const router = require('express').Router();
const Order = require('../db').model('order');
const OrderItem = require('../db').model('orderitem');
const User = require('../db').model('user');
const HttpError = require('./utils/HttpError');
module.exports = router;

// Should be able to get a order by ID

router.param('orderId', (req, res, next, id) => {
  Order.findById(id)
  .then(foundOrder => {
    if (!foundOrder) throw new HttpError(404);
    req.order = foundOrder;
    next();
  })
  .catch(next);
});

router.get('/', (req, res, next) => {
  Order.findAll()
    .then(orders => res.json(orders))
    .catch(next);
});

router.post('/', (req, res, next) => {
  const { status, totalPrice, dateSubmitted } = req.body;

  Order.create({
    status,
    totalPrice: totalPrice || null,
    dateSubmitted: dateSubmitted || null
  })
  .then(createdOrder => res.status(201).json(createdOrder))
  .catch(next);
});

router.post('/cart', (req, res, next) => {
  const { status, email, localCart } = req.body;

  User.findOrCreate({ where: { email }})
    .then(user => Order.create({ status, userId: user.id }))
    .then(createdOrder => {
      const identifiedOrderItems = Object.keys(localCart).map(itemKey => {
        return {
          quantity: localCart[itemKey].quantity,
          productId: localCart[itemKey].product.id,
          orderId: createdOrder.id
        };
      });

      return OrderItem.bulkCreate(identifiedOrderItems);
    })
    .then(bulkCreated => res.status(201).json(bulkCreated))
    .catch(next);
});

router.get('/:orderId', (req, res, next) => {
  res.json(req.order);
});

router.put('/:orderId', (req, res, next) => {
  const { status, totalPrice, quantity } = req.body;

  req.order.update({
    status,
    totalPrice,
    quantity
  })
  .then(updatedOrder => res.status(200).json(updatedOrder))
  .catch(next);
});

router.delete('/:orderId', (req, res, next) => {
  req.order.destroy()
  .then(() => res.sendStatus(204))
  .catch(next);
});
