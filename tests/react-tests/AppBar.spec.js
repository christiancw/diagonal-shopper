import React from 'react';
import chai, { expect, assert } from 'chai';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
import { shallow, mount, shallowWithContext, render } from 'enzyme';

import AppBar from '../../client/react/components/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

describe('AppBar component', () => {
  it('renders AppBar and overwrite styles', () => {
    const style = { backgroundColor: 'red' };
    const wrapper = shallow(
      <AppBar />
    );
    it('has a title', () => {
      expect(wrapper.props.title).to.equal('Title');
    });

    assert.strictEqual(
      wrapper.get(0).props.style.backgroundColor,
      style.backgroundColor,
      'should have backgroundColor to red');
  });
});

  // let sandbox;
  // var jsdom = require('jsdom').jsdom;
  // var exposedProperties = ['window', 'navigator', 'document'];

  // global.document = jsdom('');
  // global.window = document.defaultView;
  // Object.keys(document.defaultView).forEach((property) => {
  //   if (typeof global[property] === 'undefined'){
  //     exposedProperties.push(property);
  //     global[property] = document.defaultView[property];
  //   }
  // });

  // global.navigator = {
  //   userAgent: 'node.js'
  // };

  // let documentRef = document;

  // beforeEach(() => {
  //   sandbox = sinon.sandbox.create();
  // });

  // afterEach(() => {
  //   sandbox.restore();
  // });

  // it('should render a div for buttons', () => {
  //   {
  //     const props = {
  //     }
  //   }
