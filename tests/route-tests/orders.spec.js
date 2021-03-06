const { expect } = require('chai');
const request = require('supertest');
const db = require('../../server/db');
const app = require('../../server/index');
const Order = db.model('order');

describe('Order routes', () => {

  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('/api/orders/', () => {

    beforeEach(() => {
      return Order.create({
        status: 'created'
      })
      .then(() => {
        return Order.create({
          status: 'processing'
        });
      });
    });

    it('GET /api/orders', () => {
      return request(app)
        .get('/api/orders')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].status).to.equal('created');
          expect(res.body[1].status).to.equal('processing');
        });
    });

    it('GET /api/orders/:id', () => {
      return request(app)
        .get('/api/orders/2')
        .expect(200)
        .then(res => {
          const retrievedOrder = res.body;
          expect(retrievedOrder).to.be.an('object');
          expect(retrievedOrder.status).to.equal('processing');
        });
    });

    it('POST /api/orders', () => {
      return request(app)
        .post('/api/orders')
        .send({
          status: 'created',
          totalPrice: 100,
          dateSubmitted: Date.now()
        })
        .expect(201)
        .then(() => {
          return Order.findOne({
            where: { totalPrice: 100 }
          });
        })
        .then(foundOrder => {
          expect(foundOrder.totalPrice).to.equal(100);
        });
    });

  });

});
