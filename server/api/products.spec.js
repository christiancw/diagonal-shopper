const chai = require('chai');
const Promise = require('bluebird');
const expect = chai.expect;
// const Product = require('../db/product');
const models = require('../db/models');
const Product = models.Product;
const supertest = require('supertest-as-promised');
const app = require('../index');
const agent = supertest.agent(app);

describe('http requests', () => {
  before(() => {
    return Product.sync({force: true});
  });

  beforeEach(() => Product.truncate());

  describe('GET /', () => {
    it('responds with 200', (done) => {
      agent.get('/api/products').expect(200, done);
    });
  });

  describe('GET /api/products/:productId', () => {
    it('responds with 404 on product that does not exist', () => {
      return agent.get('/notarealproduct').expect(404);
    });
    it('responds with 200 on product that does exist', () => {
      return Product.create({
        name: 'wandyWand'
      }).then(() => {
        return agent.get('/1').expect(200);
      });
    });
  });

  describe('POST /', () => {
    it('responds with 201', () => {
      return agent
      .post('/:productId')
      .send({
        name: 'foo',
        category: 'bar'
      })
      .expect(201);
    });
    it('creates a product in the database', (done) => {
      agent
      .post('/productId')
      .send({
        name: 'foo',
        category: 'bar'
      })
      .then(() => {
        return Product.findOne({where:
          {
            name: 'foo'
          }
        });
      })
      .then((product) => {
        expect(product.name).to.equal('foo');
        done();
      })
      .catch(done);
    });
  });

  describe('PUT /:productId', () => {
    it('responds with 404 on product that does not exist', () => {
      return agent.put('/ohthisiscool').expect(404);
    });
    it('responds with 200 on product that does exist', () => {
      return Product.update({
        name: 'bestWand'
      }).then(() => {
        return agent.get('/1').expect(200);
      });
    });
  });

    describe('DELETE /:productId', () => {
      it('responds with 404 on product that does not exist', () => {
        return agent.get('/ohthisiscool').expect(404);
      });
      it('responds with 200 on product that does exist', () => {
        return Product.destroy({
          name: 'bestWand'
        }).then(() => {
          return agent.get('/1').expect(200);
        });
      });
  });

});
