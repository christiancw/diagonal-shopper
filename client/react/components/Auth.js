import { connect } from 'react-redux';
import AuthForm from './AuthForm';
import { auth, logout } from '../../reducer/user';
import AppBar from './AppBar';
import localStore from 'store';
import axios from 'axios';

const localCartToDb = (email, method) => {
  const localCart = {};
  localStore.each((productQuantityPair, productID) => {
    localCart[productID] = productQuantityPair;
  });
  // localCart = { '1': [3, productObj], }

  // does not interact with state (yet?)
  // post all order items
  // post an order, associate all items
  // associate user
  console.log('form name method', method);
  if (method === 'signup') {
    return axios.post('/api/orders/cart', { status: 'created', email, localCart })
      .then(console.log.bind(console))
      .catch(console.error);
  }
};

const mapLogin = ({ user }) => ({
  user,
  name: 'login',
  displayName: 'Login',
  error: user.error
});

const mapSignup = ({ user }) => ({
  name: 'signup',
  displayName: 'Sign Up',
  error: user.error
});

const mapDispatch = dispatch => ({
  handleSubmit (evt) {
    evt.preventDefault();
    const formName = evt.target.name; // login or signup
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    localCartToDb(email, formName)
    .then(() => dispatch(auth(email, password, formName)));
  }
});


export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
