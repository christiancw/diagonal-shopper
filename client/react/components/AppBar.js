import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import { connect } from 'react-redux';

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */

const buttonStyle = {
  backgroundColor: 'transparent',
  color:'white',
  width: "20%",
  height: '100%',
  margin: 12
};


const AppBarButtons = () => (

  <div>
    <AppBar
      style={{ height:'50px' , margin: 0}}
      iconElementLeft={(
        <img src="http://i63.tinypic.com/mmvt4x.png" style={{ height: '100%' }} />)}
    >
      <FlatButton
        label="Harry Shopper"
        style={ buttonStyle }
        linkButton={ true }
        containerElement={<Link to='/' />}>
      </FlatButton>
      <FlatButton
        label="Login"
        style={ buttonStyle }
        linkButton={ true }
        containerElement={<Link to="/login" />}>
      </FlatButton>
      <FlatButton
        label="Signup"
        style={ buttonStyle }
        linkButton={ true }
        containerElement={<Link to="/signup" />}>
      </FlatButton>
      <FlatButton
        label="Cart"
        style={ buttonStyle }
        linkButton={ true }
        containerElement={<Link to="/cart" />}>
      </FlatButton>
    </AppBar>
  </div>
);

export default AppBarButtons;
