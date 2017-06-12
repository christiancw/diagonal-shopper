import Reviews from '../components/Reviews';
import { connect } from 'react-redux';
import { getReviews, loadReviews } from '../../reducer/reviews';

const hardcodedReviews = [
  { id: 1, rating: 2, date: null, content: 'bla, bla bla'},
  {id: 2, rating: 3, date: null, content: 'bloop bloop'},
  {id: 3, rating: 4, date: null, content: 'agowibqiorbqoinbraweg'}
];

const mapStateToProps = (state) => {
  return {
    allReviews: state.reviews.allReviews,
    selectedReview: state.reviews.selectedReview
    // selectedProduct: state.products.selectedProduct
  };
}

const mapDispatchToProps = function (dispatch) {
  return {
    onLoadReviews: function () {
      // const action = getReviews(hardcodedReviews)
      const action = loadReviews();
      dispatch(action);
    }
  };
};

const ReviewsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Reviews);

export default ReviewsContainer;
