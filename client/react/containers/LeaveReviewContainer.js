import React from 'react';
import LeaveReview from '../components/LeaveReview';
import { connect } from 'react-redux';
import { createReview } from '../../reducer/reviews';

const mapDispatchToProps = (dispatch) => {
  return {
    newReview: function(user, content, stars) {
      const action = createReview(user, content, stars);
      dispatch(action);
    }
  }
}

class LeaveReviewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentValue: '',
      stars: '',
      dirty: false
    }
    this.handleRateChange = this.handleRateChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectedProduct = this.props.selectedProduct;
    this.currentUser = this.props.currentUser;
    this.productId = this.props.params.productId;
  }

  handleRateChange (evt) {
    const value = evt.target.value;
    this.setState({
      stars: value,
      dirty: true
    });
  }

  handleContentChange (evt) {
    const inputValue = evt.target.value;
    this.setState({
      contentValue: inputValue,
      dirty: true
    });
  }

  handleSubmit (evt) {
    evt.preventDefault();
    console.log('propsonsubmit', this.props);
    const review = {
      userId: this.props.currentUser.id,
      productId: Number(this.props.params.productId),
      // productId: this.props.selectedProduct.id, HARDCODED FOR TESTING
      content: this.state.contentValue,
      stars: this.state.stars
    }
    this.props.newReview(review);
  }

  render(props) {
    return (
      <LeaveReview
        selectedProductName={this.props.selectedProduct.name}
        handleSubmit={this.handleSubmit}
        handleRateChange={this.handleRateChange}
        handleContentChange={this.handleContentChange}
        contentValue={this.contentValue}
        stars={this.stars}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedProduct: state.products.selectedProduct,
    currentUser: state.user
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeaveReviewContainer);
