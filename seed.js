const Promise = require('bluebird');
const db = require('./server/db');
// const { User, Product, Review, Order, OrderItems } = require('./db/models');

const data = {
  product: [
    {name: 'Polyjuice Potion', department: 'Potions', price: 50.50, availableInventory: 5, description: 'Use this potion to look like somebody else for a few hours!'},
    {name: 'Felix Felicis', department: 'Potions', price: 100, availableInventory: 1, description: 'Grants you unusually good luck.'},
    {name: 'Firebolt', department: 'Brooms', price: 2000.50, availableInventory: 10, description: 'A world class broom for playing Quidditch, at least back in 1993.'},
    {name: 'Nimbus 2000', department: 'Brooms', price: 300.00, availableInventory: 5, description: 'An alright broom.'},
    {name: 'Holly Wand', department: 'Wands', price: 500.00, availableInventory: 5, description: `11" long, a wand made from holly wood with a phoenix feather core.`},
    {name: 'Yew Wand', department: 'Wands', price: 600.00, availableInventory: 5, description: `13 1/2" long, a wand made from yew wood with a phoenix feather core.`}
  ],
  user: [
    {name: 'Test', email: 'test@test.test', password: 'test', address: '5 Hanover Square, New York, NY 10004'},
    {name: 'Harry Potter', email: 'harry@potter.com', password: 'snapesucks', address: '4 Privet Drive, Little Whinging, England'},
    {name: 'Tom Riddle', email: 'tom@riddle.com', password: 'voldemort', address: 'Wool\'s orphanage, England'}
  ]
};


db.sync({force: true})
.then(function () {
  console.log('Dropped old data, now inserting data');
  return Promise.map(Object.keys(data), function (modelName) {
    return Promise.map(data[modelName], function (item) {
      return db.model(modelName).create(item);
    });
  });
})
.then(function () {
  console.log('Finished inserting data');
})
.catch(function (err) {
  console.error('There was totally a problem', err, err.stack);
})
.finally(function () {
  db.close() // uses promises but does not return a promise. https://github.com/sequelize/sequelize/pull/5776
  console.log('connection closed'); // the connection eventually closes, we just manually do so to end the process quickly
  return null; // silences bluebird warning about using non-returned promises inside of handlers.
});
