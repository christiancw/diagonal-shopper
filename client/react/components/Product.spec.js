import React from 'react';
import chai, {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
import {shallow} from 'enzyme';

import { Product } from './Product.js';

describe('Product component', () => {
  const testProduct = {name: 'Nimbus 2000', department: 'Brooms', price: 300.00, availableInventory: 5, description: 'An alright broom.'}

  let productComponent;
  beforeEach('Create component, passing in a test product', () => {
    productComponent = shallow(<Product selectedProduct={testProduct} />);
  });

  it('displays the product name as a header', () => {
    expect(productComponent.find('h2')).to.have.html('<h2>Nimbus 2000</h2>');
  });

});
