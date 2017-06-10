import AppBar from '../components/AppBar';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    // categories: state.categories.list
  };
}

const NavbarContainer = connect(
  mapStateToProps
)(AppBar);

export default NavbarContainer;
