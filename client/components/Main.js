import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout } from '../reducer/user';
import Products from './Products'
import NavBarContainer from '../containers/NavBarContainer';

// Component //

const Main = props => {

  const { children, handleClick, loggedIn } = props;

  return (
    <div>
      <h1>Harry Shopper</h1>
      { NavBarContainer }
      <div>
        <Products />
      </div>
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
