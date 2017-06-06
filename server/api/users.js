const router = require('express').Router();
const User = require('../db').model('user');
const Order = require('../db').model('order')

module.exports = router;
//STILL NEED TO FIGURE OUT SOME SESSION AND AUTH STUFF

router.get('/',
  (req, res, next) => {
    User.findAll()
      .then(users => res.json(users))
      .catch(next)
  });

router.get('/:userId',
  (req, res, next) => {
    User.findById(req.params.userId)
      .then(user => res.json(user))
      .catch(next)
  });

router.post('/',
  (req, res, next) => {
    User.create(req.body)
      .then(user => res.status(201).json(user))
      .catch(next)
  });

router.put('/:userId',
  (req, res, next) => {
    User.update(req.body, {
      where: {
        id: req.params.userId
      }
    })
    .then(updatedUser => res.status(201).send)
    .catch(next)
})

router.delete('/:userId',
  (req, res, next) => {
    User.destroy({
      where: {
        id: req.params.userId
      }
    })
    .then(students => res.send(students))
    .catch(next)
})

router.get('/orders',
  //logged in req
  (req, res, next) => {
    //need user from req.session
    Order.findAll({
        where: {
          userId: '', //req.session.user.id,
          status: 'completed' //tbd
        }
      })
      .then(orderHistory => res.json(orderHistory))
  })


// router.get('/orders/:id')

