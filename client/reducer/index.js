import { combineReducers } from 'redux';
import user from './user';
import products from './products';
// import reviews from './reviews';

import orders from './order'

export default combineReducers({ user, products, orders });
