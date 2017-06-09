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
import { Products } from './react/components/Products';
import { Product } from './react/components/Product';
import { Cart } from './react/components/Cart';
import { me } from './reducer/user';
import axios from 'axios';
import { getProducts } from './reducer/products';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {darkBlack} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "#6A8EAE",
    primary2Color: "9BD1E5",
    primary3Color: "#BEBBBB",
    textColor: darkBlack
  }
  // ,
  // userAgent: req.headers['user-agent'],
});


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
    .then(res => {
      return res.data
    })
    .then(foundProducts => {
      store.dispatch(getProducts(foundProducts))
    })
    .catch(console.error)
}

// const localCartToDbOrder = () => {

//   axios.post('/api/orders', {
//     status: 'created'
//   })
//     .then(res => {
//       // res.data.userId = store.getState().user.id;
//       const user = store.getState().user.id;
//       user.addOrder(req.data);
//     })
//     .catch(console.error);
// };


ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={Main} onEnter={onHomeEnter}>
          <IndexRoute component={Login} />
          <Route path="login" component={Login} />
          <Route path="signup" component={Signup} />
          <Route onEnter={requireLogin}>
            {/* <Route path="home" component={UserHome} onEnter={localCartToDbOrder} /> */}
            <Route path="home" component={UserHome} />
          </Route>
          <Route path="products" component={Products} />
          <Route path="products/:productId" component={Product} />
          <Route path="cart" component={Cart} />
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app')
);
