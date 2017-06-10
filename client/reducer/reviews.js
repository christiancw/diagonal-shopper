import axios from 'axios';
import {browserHistory} from 'react-router';

/*---------------------ACTIONS---------------------*/

const GET_REVIEWS = 'GET_REVIEWS';
const SELECT_REVIEW = 'SELECT_REVIEW';
const CREATE_REVIEW = 'CREATE_REVIEW';

/*---------------------STATE---------------------*/

const reviewsInitialState = ({
    allReviews: [],
    selectedReview: {}
})

/*---------------------ACTION CREATORS---------------------*/

export const getReviews = reviews => ({
    type: GET_REVIEWS,
    reviews
});

export const create = review => ({
    type: CREATE_REVIEW,
    review
});

export const select = review => ({type: SELECT_REVIEW, review});


/*---------------------DISPATCHERS---------------------*/

export const createReview = review => dispatch => {
    axios.post('/api/reviews', review)
        .then(res => dispatch(create(res.data)));
        browserHistory.push('/');
};

export const selectReview = reviewId => dispatch => {
    axios.get(`/api/reviews/${reviewId}`)
        .then(res => dispatch(select(res.data)));
        browserHistory.push('/'); // should redirect to review page
};
// export const me = () =>
//     dispatch =>
//     axios.get('/auth/me')
//     .then(res =>
//         dispatch(getUser(res.data || defaultUser)));


/*---------------------REDUCERS---------------------*/

export default function (state = reviewsInitialState, action) {
    switch (action.type) {
        case GET_REVIEWS:
            return Object.assign({}, state, {
                allReviews: action.reviews
            });
        case CREATE_REVIEW:
            return Object.assign({}, state, {
                allReviews: action.review
            });
        case SELECT_REVIEW:
            return Object.assign({}, state, {
                selectedReview: action.review
            });
        default:
            return state;
    }
}
