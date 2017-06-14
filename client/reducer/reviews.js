import axios from 'axios';
import {browserHistory} from 'react-router';

/*---------------------ACTIONS---------------------*/

const GET_REVIEWS = 'GET_REVIEWS';
const SELECT_REVIEW = 'SELECT_REVIEW';
const CREATE_REVIEW = 'CREATE_REVIEW';

/*---------------------STATE---------------------*/

const hardcodedReviews = [
  { id: 1, rating: 2, date: null, content: 'bla, bla bla'},
  {id: 2, rating: 3, date: null, content: 'bloop bloop'},
  {id: 3, rating: 4, date: null, content: 'agowibqiorbqoinbraweg'}
];

const reviewsInitialState = ({
    allReviews: [],
    selectedReview: {}
})

/*---------------------ACTION CREATORS---------------------*/

export const getReviews = reviews => ({
    type: GET_REVIEWS,
    reviews: reviews
});

export const create = review => ({
    type: CREATE_REVIEW,
    review
});

export const select = review => ({type: SELECT_REVIEW, review});


/*---------------------DISPATCHERS---------------------*/

export const loadReviews = function () {
  return function(dispatch) {
    axios.get('/api/reviews')
    .then(function (res) {
      return res.data;
    })
    .then(function (reviews) {
      const action = getReviews(reviews)
      dispatch(action);
    })
    .catch(function (err) {
      console.error(err);
    });
  };
};

export const createReview = review => {
    return (dispatch) => {
      axios.post('/api/reviews', {
        rating: review.stars,
        content: review.content,
        userId: review.userId,
        productId: review.productId
      })
          .then(res => dispatch(create(res.data)));
          browserHistory.push('/');
        };
      }

export const selectReview = reviewId => dispatch => {
    axios.get(`/api/reviews/${reviewId}`)
        .then(res => dispatch(select(res.data)));
        browserHistory.push('/'); // should redirect to review page
};


/*---------------------REDUCERS---------------------*/

export default function (state = reviewsInitialState, action) {
    switch (action.type) {
        case GET_REVIEWS:
            return Object.assign({}, state, {
                allReviews: action.reviews
            });
        case CREATE_REVIEW:
            return Object.assign({}, state, {
                allReviews: action.reviews
            });
        case SELECT_REVIEW:
            return Object.assign({}, state, {
                selectedReview: action.review
            });
        default:
            return state;
    }
}
