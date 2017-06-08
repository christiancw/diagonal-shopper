const {
  expect
} = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const User = db.model('user');
// const supertest=require('supertest-as-promised')

describe('User routes', () => {

  beforeEach(() => {
    return db.sync({
      force: true
    });
  });

  describe('/api/users/', () => {

    const codysEmail = 'cody@puppybook.com';

    beforeEach(() => {
      return User.create({
        name: 'wut',
        email: codysEmail
      });
    });

    it('GET /api/users with correct response', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].email).to.be.equal(codysEmail);
          expect(res.body[0].name).to.be.equal('wut');
        });
    });

    it('POST to /api/users with correct response', () => {
      return request(app)
        .post('/api/users')
        .send({
          name: 'Joe Schmoe',
          email: 'schmore@gmail.com',
          password: 'womp',
          isAdmin: false,
          address: '123 hanover lane',
          googleId: 'myId'
        })
        .expect(201)
        .then(() => {
          return User.findOne({
            where: {
              name: 'Joe Schmoe'
            }
          })
        })
        .then((user) => {
          expect(user.name).to.equal('Joe Schmoe');

        })

    });

    it('PUT to /api/users/:userId with the correct response', () => {
      return User.findOne({
          where: {
            name: 'wut'
          }
        })
        .then(function (res) {
          var user = res;
          return request(app)
            .put('/api/users/' + user.id)
            .send({
              name: 'hotdog'
            })
            .expect(200)
            .expect(res => {
              expect(res.body.name).to.equal('hotdog')
            })
        })
    });

    it('DELETE to /api/users/:userId with the correct response', () => {
      return request(app)
        .delete('/api/users/1')
        .expect(204)
        .then(res =>{
          expect(res.body).to.deep.equal({})
        })
    })

  }); // end describe('/api/users')

}); // end describe('User routes')
