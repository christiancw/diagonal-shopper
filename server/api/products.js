const express = require('express');
const router = express.Router();
const models = require('../db/models');
const Product = models.Product;
const Review = models.Review;
// const Product = require('../db/').model('product');
module.exports = router;


router.param('productId', function (req, res, next, id) {
  Product.findById(id)
  .then(product => {
    if (!product) {
      const err = Error('Product not found');
      err.status = 404;
      throw err;
    }
    req.product = product;
    next();
  })
  .catch(next);
});

router.get('/', function(req, res, next) {
  console.log(models);
  Product.findAll()
  .then(function(foundProducts){
    res.json(foundProducts);
  });
});

router.get('/:productId', function(req, res, next) {
  res.json(req.product);
});

router.put('/:productId', function(req, res, next) {
  req.product.update(req.body)
  .then(function(updatedProduct) {
    res.status(200).json(updatedProduct);
  })
  .catch(next);
});

router.post('/', function(req, res, next) {
  Product.create(req.body)
  .then(function(createdProduct) {
    res.status(201).json(createdProduct);
  })
  .catch(next);
});

router.delete('/:productId', function(req, res, next) {
  req.product.destroy()
  .then(
    res.sendStatus(204)
  )
  .catch(next);
});

router.get('/:productId/reviews', function(req, res, next) {
  Review.findAll({
    where: {
      productId: req.product.id
    }
  })
  .then(function(foundReviews) {
    res.json(foundReviews);
  })
  .catch(next);
});
//
// curl -d '{"name":"adigjowg"}' -H "Content-Type: application/json" -X POST http://localhost:8080/api/products
