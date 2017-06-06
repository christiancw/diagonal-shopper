const router = require('express').Router();
const Review = require('../db/models/review');
module.exports = router;

router.param('reviewId', function(req, res, next, id){
	Review.findById(id)
	.then(function(review){
		if (!review){
			const err = new Error('User not found.');
			err.status = 404;
			throw err;
		}
		req.review = review;
		next();
	})
	.catch(next);
});

router.get('/:reviewId', function(req, res, next){
	res.json(req.review);
});

router.post('/', function(req, res, next){
	Review.create(req.body)
	.then(review => res.status(201).json(review))
	.catch(next);
});

router.put('/:reviewId', function(req, res, next){
	req.review.update(req.body)
	.then(review => res.status(200).json(review))
	.catch(next);
});

router.delete('/:reviewId', function(req, res, next){
	req.review.destroy()
	.then(() => res.status(204).end())
	.catch(next);
});
