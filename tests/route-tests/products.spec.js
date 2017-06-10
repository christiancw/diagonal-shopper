const chai = require('chai');
const Promise = require('bluebird');
const expect = chai.expect;
const db = require('../../server/db');
const app = require('../../server/index');
const Product = db.model('product');
// const agent = supertest.agent(app);
const request = require('supertest');

describe('Products Routes', () => {
  beforeEach(() => {
    return Product.sync({force: true});
  });

  describe('/api/products', () => {

    beforeEach(() => {
      return Product.create({
        name: 'wandyWand'
      });
    });

    it('returns an array with 200 when you GET all products', () => {
      return request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].name).to.be.equal('wandyWand');
        });
      });

      it('responds with 201 and a single product when you POST a product', () => {
        return request(app)
          .post('/api/products')
          .send({
          name: 'New McWand',
          department: 'wands'
        })
          .expect(201)
          .then(() => {
            return Product.findOne({
              where: {
                name: 'New McWand'
              }
            })
            .then((product) => {
              expect(product.name).to.equal('New McWand')
            })
          });
        });
      });

  describe('/api/products/:productId', () => {

      beforeEach(() => {
        return Product.create({
          name: 'bestWand'
        });
      });

      it('responds with 200 and a valid object on a GET request for one product', () => {
        return request(app)
          .get('/api/products/1')
          .expect(200)
          .then(res => {
            // console.log("RESBODY=>", res.body);
            expect(res.body.name).to.be.equal('bestWand');
          });
        });

      it('responds with 200 and modifies an instance on a PUT request', () => {
        return request(app)
          .put('/api/products/1')
          .send({
          name: 'New McWand',
          department: 'wands'
        })
          .expect(200)
          .then(() => {
            return Product.findOne({
              where: {
                name: 'New McWand'
              }
            })
            .then((product) => {
              expect(product.name).to.equal('New McWand')
            })
          });
        });
      });
    });
