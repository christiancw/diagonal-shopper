import axios from 'axios';
import {browserHistory} from 'react-router';

/*---------------------ACTIONS---------------------*/

const GET_PRODUCTS = 'GET_PRODUCTS';
const SELECT_PRODUCT = 'SELECT_PRODUCT';
const CREATE_PRODUCT = 'CREATE_PRODUCT';

/*---------------------STATE---------------------*/

const productsInitialState = ({
    allProducts: [],
    selectedProduct: {}
})

/*---------------------ACTION CREATORS---------------------*/

export const getProducts = products => ({
    type: GET_PRODUCTS,
    products
});

export const create = product => ({
    type: CREATE_PRODUCT,
    product
});

export const select = product => ({type: SELECT_PRODUCT, product});


/*---------------------DISPATCHERS---------------------*/

export const createProduct = product => dispatch => {
    axios.post('/api/products', product)
        .then(res => dispatch(create(res.data)));
        browserHistory.push('/');
};

export const selectProduct = productId => dispatch => {
    axios.get(`/api/products/${productId}`)
        .then(res => dispatch(select(res.data)));
        browserHistory.push('/'); // should redirect to product page
};
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
                allProducts: action.products
            });
        case CREATE_PRODUCT:
            return Object.assign({}, state, {
                allProducts: action.product
            });
        case SELECT_PRODUCT:
            return Object.assign({}, state, {
                selectedProduct: action.product
            });
        default:
            return state;
    }
}

// export default function (state = productsInitialState, action) {
//     console.log(state)
//     switch (action.type) {
//         case GET_PRODUCTS:
//             return Object.assign({}, state, { allProducts: Object.assign() })
//             });
//         default:
//             return state;
//     }
// }
