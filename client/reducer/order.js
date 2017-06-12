import axios from 'axios';
import {browserHistory} from 'react-router';

/*---------------------ACTIONS---------------------*/

const GET_ORDERS = 'GET_ORDERS';
const GET_CART = 'GET_CART';
const SELECT_ORDER = 'SELECT_ORDER';
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const CHECKOUT_ORDER = 'CHECKOUT_ORDER';

/*---------------------STATE---------------------*/

const ordersInitialState = ({
    allOrders: [],
    cart: [],
    // TO DO: selectedOrder: {}
});

/*---------------------ACTION CREATORS---------------------*/

export const getOrders = orders => ({
    type: GET_ORDERS,
    orders
});

export const getCart = order => ({
    type: GET_CART,
    order
});

export const add = order => ({
    type: ADD_ITEM,
    order
});

export const remove = order => ({
    type: REMOVE_ITEM,
    order
});

export const checkout = order => ({
    type: CHECKOUT_ORDER,
    order
});

// TO DO: export const select = order => ({type: SELECT_ORDER, order});


/*---------------------DISPATCHERS---------------------*/

export const createOrder = order => dispatch => {
    if (state.user.id === null) {
        //function to convert localstorage to orderitems
        axios.post('.api')
    }
    axios.put('/api/orders', order)
        .then(res => dispatch(checkout(res.data)));
        browserHistory.push('/');
};

// export const selectOrder = orderId => dispatch => {
//     axios.get(`/api/orders/${orderId}`)
//         .then(res => dispatch(select(res.data)));
//         browserHistory.push('/'); // should redirect to ORDER page
// };




/*---------------------REDUCERS---------------------*/

export default function (state = ordersInitialState, action) {
    switch (action.type) {
        case GET_ORDERS:
            return Object.assign({}, state, {
                allOrders: action.orders
            });
        case GET_CART: 
            return Object.assign({}, state, {
                cart: action.order
            });
        case CHECKOUT_ORDER:
            return Object.assign({}, state, {
                allOrders: action.order
            });
        case SELECT_ORDER:
            return Object.assign({}, state, {
                selectedOrder: action.order
            });
    
        default:
            return state;
    }
}