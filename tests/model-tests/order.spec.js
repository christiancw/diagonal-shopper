const { expect } = require('chai');
const db = require('../../server/db');
const Order = db.model('order');

describe('The `Order` model', () => {

  beforeEach(() => {
    return db.sync({ force: true });
  });

  let testOrder;
  beforeEach(() => {
    testOrder = Order.build({
      status: 'created'
    });
  });

  describe('attributes definition', () => {

    it('must have a status field', () => {
      testOrder.status = null;

      return testOrder.validate()
      .then(result => {
        expect(result).to.be.an.instanceOf(Error);
        expect(result.message).to.contain('status cannot be null');
      });
    });
  });

  describe('instanceMethods', () => {

    it('`placeOrder` changes the status to `processing`', () => {
      expect(testOrder.status).to.equal('created');
      testOrder.placeOrder();
      expect(testOrder.status).to.equal('processing');
    });

  });
});
