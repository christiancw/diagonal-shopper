import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../reducer/user';
import { Login, Signup, Logout } from './Auth';
import IconButton from 'material-ui/IconButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */

const buttonStyle = {
  backgroundColor: 'transparent',
  color:'white',
  width: "15%",
  height: '70%',
  margin: 12
};


const AppBarButtons = ({ user, handleClick }) => {
console.log(user, "asdfjasldkfjaskdf");

return (
  <div>
    <AppBar
      style={{ height:'60px' , margin: 0}}
      iconElementLeft={(
        <img src="http://i63.tinypic.com/mmvt4x.png" style={{ height: '100%' }} />)}
    >
      <FlatButton
        label="Harry Shopper"
        labelPosition="before"
        style={ buttonStyle }
        linkButton={ true }
        containerElement={<Link to="/" />} />

      {
        user && user.id
        ?
        (<div>
          <FlatButton
            onClick={ handleClick }
            label="Logout"
            style={ buttonStyle }
            linkButton={ true }
            containerElement={<Link to="/" />} />
          <FlatButton
            label="Cart"
            style={ buttonStyle }
            linkButton={ true }
            containerElement={<Link to="/cart" />} />
          <DropDownMenu>
            <MenuItem primaryText="Order History" />
            <MenuItem primaryText="Settings" />
          </DropDownMenu>
        </div>)
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
          <FlatButton
            label="Cart"
            style={ buttonStyle }
            linkButton={ true }
            containerElement={<Link to="/cart" />} />
        </div>)
      }

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


