import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Products from './Products'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from './AppBar.js';
import Cart from './Cart';
import Reviews from './Reviews'; //just for development to see fetched reviews
import ReviewsContainer from '../containers/ReviewsContainer';
import NavbarContainer from '../containers/NavbarContainer';

// Component //

export const Main = props => {
  const { children } = props;

  return (

    <div>
      <AppBar />
      <hr />
      { children }
      <Products />
    </div>

  );
};

Main.propTypes = {
  children: PropTypes.object,
};
