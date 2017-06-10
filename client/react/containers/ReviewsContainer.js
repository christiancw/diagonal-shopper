import Reviews from '../components/Reviews';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    allReviews: state.allReviews,
    selectedReview: state.selectedReview
  };
}

const ReviewsContainer = connect(
  mapStateToProps
)(Reviews);

export default ReviewsContainer;
