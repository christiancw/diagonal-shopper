const { expect } = require('chai');
const db = require('../db');
const User = db.model('user');

describe('User model', () => {

  beforeEach(() => {
    return db.sync({ force: true });
  });

  it('has all the right fields', function(){
    return User.create({
      name: '',
      email: '',
      isAdmin: false,
      address: '',
      salt: '',
      googleId: ''
    })
    .then(function (savedProduct) {
      expect(savedProduct.name).to.equal('');
      expect(savedProduct.email).to.equal('');
      expect(savedProduct.isAdmin).to.equal(false);
      expect(savedProduct.address).to.equal('');
      expect(savedProduct.salt).to.equal('');
      expect(savedProduct.googleId).to.equal('');
    });
  });

  describe('instanceMethods', () => {

    describe('correctPassword', () => {

      let cody;

      beforeEach(() => {
        return User.create({
          name: 'peter',
          email: 'cody@puppybook.com',
          password: 'bones'
        })
          .then(user => {
            cody = user;
          });
      });

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true);
      });

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false);
      });

    }); // end describe('correctPassword')

  }); // end describe('instanceMethods')

}); // end describe('User model')
