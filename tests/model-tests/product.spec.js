const { expect } = require('chai');
const db = require('../../server/db');
const Product = db.model('product');

describe('Product model', () => {

  beforeEach(() => {
    return db.sync({ force: true });
  });

  it('has all the right fields', function(){
    return Product.create({
      name: '',
      department: 'Potions',
      // categories: [],
      imageURL: '',
      price: 50.00,
      availableInventory: 10,
      description: ''
    })
    .then(function (savedProduct) {
      expect(savedProduct.name).to.equal('');
      expect(savedProduct.department).to.equal('Potions');
      // expect(savedProduct.categories.length).to.equal(0);
      expect(savedProduct.imageURL).to.equal('');
      expect(+savedProduct.price).to.equal(50);
      expect(savedProduct.availableInventory).to.equal(10);
      expect(savedProduct.description).to.equal('');
    });
  });

  // describe('instanceMethods', () => {
  //
  //   describe('correctPassword', () => {
  //
  //     let cody;
  //
  //     beforeEach(() => {
  //       return Product.create({
  //         email: 'cody@puppybook.com',
  //         password: 'bones'
  //       })
  //         .then(product => {
  //           cody = product;
  //         });
  //     });
  //
  //     it('returns true if the password is correct', () => {
  //       expect(cody.correctPassword('bones')).to.be.equal(true);
  //     });
  //
  //     it('returns false if the password is incorrect', () => {
  //       expect(cody.correctPassword('bonez')).to.be.equal(false);
  //     });
  //
  //   }); // end describe('correctPassword')
  //
  // }); // end describe('instanceMethods')

}); // end describe('Product model')
