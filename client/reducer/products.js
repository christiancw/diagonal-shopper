import axios from 'axios';
import {browserHistory} from 'react-router';

/*---------------------ACTIONS---------------------*/

const GET_PRODUCTS = 'GET_PRODUCTS';

/*---------------------STATE---------------------*/

const productsInitialState = ({
    products: [],
    selectedProduct: {}
})

/*---------------------ACTION CREATORS---------------------*/

export const getProducts = products => ({
    type: GET_PRODUCTS,
    products
});


/*---------------------DISPATCHERS---------------------*/

// export const me = () =>
//     dispatch =>
//     axios.get('/auth/me')
//     .then(res =>
//         dispatch(getUser(res.data || defaultUser)));


/*---------------------REDUCERS---------------------*/

export default function (state = productsInitialState, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return Object.assign({}, state, {
                products: action.products
            });
        default:
            return state;
    }
}