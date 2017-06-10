// const Promise = require('bluebird');
// const db = require('./db');
// const { User, Product, Review, Order, OrderItems } = require('')
import Promise from 'bluebird';
import db from './db';
import { User, Product, Review, Order, OrderItems } from './db/models';

const data = {
  product: [
    {name: 'Polyjuice potion', categories: ''}
  ],
  user: [
    {}
  ]
};


db.sync({force: true})
.then(function () {
  console.log("Dropped old data, now inserting data");
  return Promise.map(Object.keys(data), function (name) {
    return Promise.map(data[name], function (item) {
      return db.model(name).create(item);
    });
  });
})

.then(function() {
  return Promise.each(dayData.day, function (item) {
    return db.model('day')
    .create(item);
  });
})
.then(function () {
  console.log("Finished inserting data");
})
.catch(function (err) {
  console.error('There was totally a problem', err, err.stack);
})
.finally(function () {
  db.close() // uses promises but does not return a promise. https://github.com/sequelize/sequelize/pull/5776
  console.log('connection closed'); // the connection eventually closes, we just manually do so to end the process quickly
  return null; // silences bluebird warning about using non-returned promises inside of handlers.
});
