import { combineReducers } from 'redux';
import user from './user';
import products from './products';
import reviews from './reviews';

export default combineReducers({ user, products, reviews });
