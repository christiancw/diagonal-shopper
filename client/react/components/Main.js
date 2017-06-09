import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout } from '../../reducer/user';
import Products from './Products'
import Cart from './Cart';
import NavbarContainer from '../containers/NavbarContainer';

// Component //

export const Main = props => {
  console.log("TRYING TO RENDER MAIN")

  const { children, handleClick, loggedIn } = props;

  return (
    <div>
      <h1>Harry Shopper</h1>
      <NavbarContainer />
        <Products />
        <Cart />
      { children }
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired
};

// Container //

const mapState = ({ user }) => ({
  loggedIn: !!user.id
});

const mapDispatch = dispatch => ({
  handleClick () {
    dispatch(logout());
  }
});

export default connect(mapState, mapDispatch)(Main);
