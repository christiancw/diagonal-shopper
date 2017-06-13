const router = require('express').Router();
const User = require('../db').model('user');
const Order = require('../db').model('order');
const OrderItem = require('../db').model('orderitem');

module.exports = router;
//STILL NEED TO FIGURE OUT SOME SESSION AND AUTH STUFFF


router.param('userId', function(req, res, next, id){
	User.findById(id)
	.then(function(user){
		if (!user){
			const err = new Error('User not found.');
			err.status = 404;
			throw err;
		}
		req.user = user;
		next();
	})
	.catch(next);
});

router.get('/',
  (req, res, next) => {
    User.findAll()
      .then(users => res.json(users))
      .catch(next)
  });

router.get('/cart',
    (req, res, next) => {
      console.log("WHAT IS THIS", req.session.passport)
      Order.findOne({where: {
        userId: req.session.passport.user,
        status: "created"
      },
      include: [ {model: OrderItem} ]
    })
      .then(order => 
      res.json(order))
      .catch(next)
    });

router.get('/orders',
    (req, res, next) => {
      if (req.session.passport.user) {
      Order.findAll({where: {
        userId: req.session.passport.user,
      }}
      )
      .then(orders => res.json(orders))
      .catch(next)
      }
    });


router.get('/:userId',
  (req, res, next) => {
    res.json(req.user)
  });

router.post('/',
  (req, res, next) => {
    User.create(req.body)
      .then(user => res.status(201).json(user))
      .catch(next)
  });

router.put('/:userId',
  (req, res, next) => {
    req.user.update(req.body)
    .then(updatedUser => res.status(200).json(updatedUser))
    .catch(next)
})

router.delete('/:userId',
  (req, res, next) => {
    req.user.destroy()
    .then(() => res.status(204).end())
    .catch(next)
});



// router.get('/cart',
//   //logged in req
//   (req, res, next) => {
//     // const user = req.user || req.session.user;
//     Order.findAll({
//         where: {
//           // userId: user.id, //req.session.user.id,
//           status: 'completed' //tbd
//         }
//       })
//       .then(order => res.json(order))
//       .catchn(next)
//   })


// // router.get('/orders/:id')

