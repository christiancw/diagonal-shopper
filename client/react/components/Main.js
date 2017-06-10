import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout } from '../../reducer/user';
import Products from './Products'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from './AppBar.js';
import Cart from './Cart';
import NavbarContainer from '../containers/NavbarContainer';

// Component //

export const Main = props => {
  console.log("TRYING TO RENDER MAIN")

  const { children, handleClick, loggedIn } = props;

  return (

    <div>
    {/*<MuiThemeProvider>*/}
      <AppBar />
    {/*</MuiThemeProvider>*/}
        {/*{ loggedIn ?
            <nav>
              <Link to="/home">Home</Link>
              <a href="#" onClick={handleClick}>Logout</a>
            </nav> :
            <nav>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </nav>
        <div>
        </div>
        }*/}
        <hr />


      { children }
      <Products />
      {/* <Cart /> */} 

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
