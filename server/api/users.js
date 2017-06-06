const router = require('express').Router();
const User = require('../db').model('user');
const Order = require('../db').model('order')

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

