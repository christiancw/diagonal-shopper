const { expect } = require('chai');
const db = require('../../server/db');
const Review = db.model('review');
const Sequelize = require('sequelize');

describe('Review model', () => {

  beforeEach(() => {
    return db.sync({ force: true });
  });

  it('has all the right fields', function(){
    return Review.create({
    rating: 5,
    // date: Sequelize.NOW,
    content: "Wow! What a product!"
  })
    .then(review => {
      expect(review.rating).to.equal(5);
      // expect(review.date).to.equal(Sequelize.NOW);
      expect(review.content).to.equal('Wow! What a product!');
    });
  });
});
