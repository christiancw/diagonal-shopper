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
    console.log('CONTAINER PROPS', props)
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
      productId: this.props.selectedProduct.id,
      content: this.state.contentValue,
      stars: this.state.stars
    }
    console.log('REVIEWOBJECT', review);
    this.props.newReview(review);
  }

  render(props) {
    console.log('formcontainer state', props);
    return (
      <LeaveReview
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
  console.log('state-->', state);
  return {
    selectedProduct: state.products.selectedProduct,
    currentUser: state.user
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeaveReviewContainer);
