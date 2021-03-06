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
    cart: {},
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

export const add = item => ({
    type: ADD_ITEM,
    item
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
    axios.put(`/api/orders/${id}`, order)
        .then(res => dispatch(checkout(res.data)));
        browserHistory.push('/');
};

export const addToOrder = product => dispatch => {
    axios.put('/api/orders/cart/boop', product)
        .then(res => dispatch(add(res.data)));
};

export const removeFromOrder = order => dispatch => {
    dispatch(remove(order.id))
    axios.delete(`/api/orders/${order.id}`)
        .then(() => console.log("did it"))
}

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
                cart: action.order
        });
        case ADD_ITEM: {
            if (action.item.quantity === 1) {
                return Object.assign({}, state, {
                    cart: Object.assign({}, state.cart, {orderitems: state.cart.orderitems.concat([action.item])})

                });
            } else {
                const keptItems = state.cart.orderitems.filter(item => item.id !== action.item.id) 
                return Object.assign({}, state, {
                cart: Object.assign({}, state.cart, {orderitems: keptItems.concat([action.item])}) 
            })}}

        case REMOVE_ITEM:
            return Object.assign({}, state, {
            cart: state.cart.orderitems.filter(item => item.id !== action.id)
        });
        case SELECT_ORDER:
            return Object.assign({}, state, {
                selectedOrder: action.order
            });
    
        default:
            return state;
    }
}