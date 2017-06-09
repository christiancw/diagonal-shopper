import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import store from './store';
// import { Login, Signup, UserHome } from './react/components';
import { Main } from './react/components/Main';
import { Login, Signup } from './react/components/Auth';
import { UserHome } from './react/components/UserHome';
import { me } from './reducer/user';
import axios from 'axios'
import { getProducts } from './reducer/products'

const whoAmI = store.dispatch(me());

const requireLogin = (nextRouterState, replace, next) =>
  whoAmI
    .then(() => {
      const { user } = store.getState();
      if (!user.id) replace('/login');
      next();
    })
    .catch(err => console.log(err));


const onHomeEnter = () => {
  axios.get('/api/products')
    .then(function(res) {
      return res.data
    })
    .then(foundProducts => {
      store.dispatch(getProducts(foundProducts))
    })
    .catch(console.error)
}


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main} onEnter={onHomeEnter}>
        <IndexRoute component={Login} />
        <Route path="login" component={Login} />
        <Route path="signup" component={Signup} />
        <Route onEnter={requireLogin}>
          <Route path="home" component={UserHome} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
