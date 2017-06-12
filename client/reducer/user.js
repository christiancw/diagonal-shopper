import axios from 'axios';
import { browserHistory } from 'react-router';
import localStore from 'store';

const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

const defaultUser = {};

const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data || defaultUser)));

export const auth = (email, password, method) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password })
      .then(res => {
        dispatch(getUser(res.data));
        browserHistory.push('/home');
      })
      .catch(error =>
        dispatch(getUser({ error })))
      .then(() => {
        return localCartToDb(email, method);
      })
      .catch(err => console.log(err));

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(res => {
        dispatch(removeUser());
        browserHistory.push('/login');
      })
      .catch(err => console.log(err));

export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
}


//     Helper functions     //

function localCartToDb (email, method) {
  const localCart = {};
  localStore.each((productQuantityPair, productID) => {
    localCart[productID] = productQuantityPair;
  });

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
}
