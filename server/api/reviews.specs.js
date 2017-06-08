const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Order = db.model('order');

describe('Review routes', () => {

  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('/api/reviews/', () => {

    beforeEach(() => {
      return Review.create({
        rating: 5,
        content: "This broom is a MUST HAVE!"
      });
    });

    it('POST to /api/reviews with the correct response', () => {
      return request(app)
      .send({
        rating: 1,
        content: "This broom broke after the first use!! >:("
      })
      .expect(201)
      .then(() => {
        return Review.findOne({
          where: {
            content: "This broom broke after the first use!! >:("
          }
        });
      })
      .then((review) => {
        expect(review.content).to.equal("This broom broke after the first use!! >:(");
      });
    });

    it('PUT to /api/reviews/:reviewId with the correct response', () => {
      return Review.findOne({
        where: {
          content: "This broom is a MUST HAVE!"
        }
      })
      .then(function (res) {
        var review = res;
        return request(app)
          .put('/api/reviews/' + review.id)
          .send({
            rating: 4
          })
          .expect(200)
          .expect(res => {
            expect(res.body.name).to.equal(4)
          });
      });
    });
  });
});
