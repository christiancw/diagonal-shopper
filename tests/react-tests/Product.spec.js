import React from 'react';
import chai, {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
import {shallow} from 'enzyme';

import { Product } from '../../client/react/components/Product';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
describe('Product component', () => {
  const testProduct = {
    name: 'Nimbus 2000',
    department: 'Brooms',
    price: 300.00,
    imgURL: 'http://i.imgur.com/7sIG7sF.jpg',
    availableInventory: 5,
    description: 'An alright broom.'
  };

  let productComponent;
  beforeEach('Create component, passing in a test product', () => {
    productComponent = shallow(<Product selectedProduct={testProduct} />);
  });

  // this style of test no longer works for material ui..
  // it('displays the product name as a header', () => {
  //   expect(productComponent.find('h2')).to.have.html('<h2>Nimbus 2000</h2>');
  // });

  // it('notes the department the product belongs to', () => {
  //   expect(productComponent.find('h5')).to.have.html('<h5>in Brooms</h5>');
  // });

  // it('displays the product description as a p', () => {
  //   expect(productComponent.find('p')).to.have.html('<p>An alright broom.</p>');
  // });

  describe('receives a product from props and displays its fields', () => {
    let cardTitle;
    beforeEach('Create component, passing in a test product', () => {
      cardTitle = productComponent.find(CardMedia).props().overlay;
    });

    it('shows the title as a CardTitle', () => {
      expect(cardTitle.props.title).to.equal('Nimbus 2000');
    });

    it('notes the department the product belongs to', () => {
      expect(cardTitle.props.subtitle).to.equal('in Brooms');
    });

    it('displays the product description as CardText', () => {
      expect(productComponent.find(CardText).node.props.children).to.equal('An alright broom.');
    });
  });
});
