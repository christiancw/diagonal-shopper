import { connect } from 'react-redux';
import AuthForm from './AuthForm';
import { auth, logout } from '../../reducer/user';

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
  handleSubmit (evt, noRedirect) {
    evt.preventDefault();
    const formName = evt.target.name; // login or signup
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    dispatch(auth(email, password, formName, noRedirect));
  }
});

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
