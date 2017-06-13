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

  User.findOne({ where: { email }})
    .then(user => Order.create({ status }).then(createdOrder => createdOrder.setUser(user)))
    .then(userAssociatedOrder => {
      return transferLocalItemsToDb(userAssociatedOrder, localCart);
      // const identifiedOrderItems = Object.keys(localCart).map(itemKey => {
      //   const item = localCart[itemKey];
      //   return OrderItem.create({ quantity: item.quantity })
      //     .then(createdItem => createdItem.setOrder(userAssociatedOrder))
      //     .then(orderAssociatedItem => orderAssociatedItem.setProduct(item.selectedProduct.id));
      //   });

      // return Promise.all(identifiedOrderItems);
    })
    .then(() => res.sendStatus(201))
    .catch(next);
});


router.put('/cart', (req, res, next) => {
  const { status, email, localCart } = req.body;
  // Finds the user logging in, checks if they have any in-progress orders on DB
  // if so, adds unique orderitems and merges duplicate orderitem quantities to that order (adds)
  // if not, creates new order with new associated orderitems
  User.findOne({ where: { email }})
    .then(user => {
      return Order.findOrCreate({
        where: { userId: user.id, status },
        include: [{ model: OrderItem }]
      })
      .then(([order, created]) => { // chain .then like this so we have reference to 'user'
        if (created) {
          return order.setUser(user).then(userAssociatedOrder =>
            transferLocalItemsToDb(userAssociatedOrder, localCart));
        }
        const updatedItems = order.orderitems.filter(item => localCart[item.productId])
          .map(item => item.update({ quantity: item.quantity + localCart[item.productId].quantity }));

        const productsInDbOrder = order.orderitems.map(item => +item.productId);
        const localCartEntries = Object.keys(localCart).map(key => [key, localCart[key]]);
        const createdItems = localCartEntries // object.entries is is ES7 and that don't work..
          .filter(([productId, prodQuantObj]) => {
            console.log('filtering');
            return !productsInDbOrder.includes(+productId);
          })
          .map(([productId, prodQuantObj]) => {
            return createAndAssociateItem(prodQuantObj.quantity, order, productId);
          });

        return Promise.all([...updatedItems, ...createdItems]);
      });
    })
    .then(() => res.sendStatus(201))
    .catch(next);
});

// returns newly made order items
function transferLocalItemsToDb (userAssociatedOrder, localCart) {
  const identifiedOrderItems = Object.keys(localCart).map(itemKey => {
    const item = localCart[itemKey];
    return createAndAssociateItem(item.quantity, userAssociatedOrder, item.selectedProduct.id);
  });

  return Promise.all(identifiedOrderItems);
}

function createAndAssociateItem (quantity, order, productId) {
  return OrderItem.create({ quantity })
    .then(createdItem => createdItem.setOrder(order))
    .then(orderAssociatedItem => orderAssociatedItem.setProduct(productId));
}

// router.get('/cart',
//     (req, res, next) => {
//       console.log("WHAT IS THIS", req.session.passport)
//       Order.findOne({where: {
//         userId: req.session.passport.user,
//         status: "created"
//       },
//       include: [ {model: OrderItem} ]
//     })
//       .then(order => 
//       res.json(order))
//       .catch(next)
//     });
//when logging in your either creatin

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
