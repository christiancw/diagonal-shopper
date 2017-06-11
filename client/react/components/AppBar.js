import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../reducer/user';
import { Login, Signup, Logout } from './Auth';

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */

const buttonStyle = {
  backgroundColor: 'transparent',
  color:'white',
  width: "15%",
  height: '100%',
  margin: 12
};


const AppBarButtons = ({ user, handleClick }) => {
console.log(user, "asdfjasldkfjaskdf");

return (
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
        containerElement={<Link to="/" />} />

      {
        user && user.id
        ?
        (<FlatButton
          onClick={ handleClick }
          label="Logout"
          style={ buttonStyle }
          linkButton={ true }
          containerElement={<Link to="/" />}
        />)
        :
        (<div>
          <FlatButton
            label="Login"
            style={ buttonStyle }
            linkButton={ true }
            containerElement={<Link to="/login" />} />
          <FlatButton
            label="Signup"
            style={ buttonStyle }
            linkButton={ true }
            containerElement={<Link to="/signup" />} />
        </div>)
      }

      <FlatButton
        label="Cart"
        style={ buttonStyle }
        linkButton={ true }
        containerElement={<Link to="/cart" />} />

    </AppBar>
  </div>
  )
};

const mapStateToProps = ({ user }) => ({ user });
const mapDispatch = dispatch => ({
  handleClick () {
    dispatch(logout());
  }
});

export default connect(mapStateToProps, mapDispatch)(AppBarButtons);


