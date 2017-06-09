import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */

const buttonStyle = {
  backgroundColor: 'transparent',
  color:'white',
  width: "20%",
  height: '100%'
};
const AppBarExampleIcon = () => (

  <AppBar
    title="Harry Shopper"
    iconElementLeft={(<img src="http://i63.tinypic.com/mmvt4x.png" style={{height: '100%'}}></img>)}
    titleStyle={{height: '100%'}}
  style={{height:'50px'}}
  >
    <FlatButton label="Login" style={buttonStyle} />
    <FlatButton label="Signup" style={buttonStyle} />
    <FlatButton label="Cart" style={buttonStyle} />
  </AppBar>
);

export default AppBarExampleIcon;
