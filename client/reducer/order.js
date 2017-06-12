import axios from 'axios';
import {browserHistory} from 'react-router';

/*---------------------ACTIONS---------------------*/

const GET_ORDERS = 'GET_ORDERS';
const SELECT_ORDER = 'SELECT_ORDER';
const CREATE_ORDER = 'CREATE_ORDER';

/*---------------------STATE---------------------*/

const ordersInitialState = ({
    allOrders: [],
    selectedOrder: {}
});

/*---------------------ACTION CREATORS---------------------*/

export const getOrders = orders => ({
    type: GET_ORDERS,
    orders
});

export const create = order => ({
    type: CREATE_ORDER,
    order
});

export const select = order => ({type: SELECT_ORDER, order});


/*---------------------DISPATCHERS---------------------*/

export const createOrder = order => dispatch => {
    axios.post('/api/orders', order)
        .then(res => dispatch(create(res.data)));
        browserHistory.push('/');
};

export const selectOrder = orderId => dispatch => {
    axios.get(`/api/orders/${orderId}`)
        .then(res => dispatch(select(res.data)));
        browserHistory.push('/'); // should redirect to ORDER page
};
// export const me = () =>
//     dispatch =>
//     axios.get('/auth/me')
//     .then(res =>
//         dispatch(getUser(res.data || defaultUser)));


/*---------------------REDUCERS---------------------*/

export default function (state = ordersInitialState, action) {
    switch (action.type) {
        case GET_ORDERS:
            return Object.assign({}, state, {
                allOrders: action.orders
            });
        case CREATE_ORDER:
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

// export default function (state = ORDERSInitialState, action) {
//     console.log(state)
//     switch (action.type) {
//         case GET_ORDERS:
//             return Object.assign({}, state, { allORDERS: Object.assign() })
//             });
//         default:
//             return state;
//     }
// }