import Navbar from './components/navbar';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    categories: state.categories.list
  };
}

const NavBarContainer = connect(
  mapStateToProps
)(Navbar);

export default NavBarContainer;
