import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import localStore from 'store';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { getReviews, loadReviews } from '../../reducer/reviews';
import { selectProduct } from '../../reducer/products';
import ReviewsContainer from '../containers/ReviewsContainer';

// this export is FOR UNIT TESTING. DO NOT import this into react-router index
export class Product extends React.Component {
  // console.log('PROPS  IN PRoduct', showReviews);
  constructor(){
    super()
    this.state = {
      showReviews: false,
      open: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.handleReviewClick = this.handleReviewClick.bind(this);
  }

   addToCart() {
    const storeKey = String(selectedProduct.id);
    const retrieved = localStore.get(storeKey);
    if (!retrieved) {
      localStore.set(storeKey, {quantity: 1, selectedProduct});
      //localStore.set(storeKey, {quantity, selectedProduct});
    } else {
      const newQuantity = retrieved.quantity + 1;
      // const newQuantity = retrieved.quantity + quantity;
      localStore.set(storeKey, {quantity: newQuantity, selectedProduct});
      // console.alert(`You already have ${retrieved.quantity} of this item in your cart. Edit your cart if you didn't mean to add ${quantity} more!`);
    }
  }

  handleClick () {
    this.setState({ open: true });
  }

  handleReviewClick () {
    this.setState({ showReviews: !this.state.showReviews });
  }
// let visibleReviews = false;
//
//   function toggleRevs() {
//     // visibleReview !visibleReviews});
//     console.log(visibleReviews)
//   }
render (props) {
  const selectedProduct = this.props.selectedProduct;
  return (
    <div>
      <Card>
          <CardMedia
            overlay={<CardTitle title={ selectedProduct.name } subtitle={ `in ${selectedProduct.department}` } />}>
              <img src={ selectedProduct.imageURL } />
          </CardMedia>
          <CardText>
            { selectedProduct.description }
          </CardText>
          <CardActions>
            <FlatButton label="Add To Cart" onClick={() => this.addToCart()} />
            <FlatButton label="Reviews" onClick={() => this.handleReviewClick()} />
          </CardActions>
      </Card>
      <div>
      {this.state.showReviews ?
        <ReviewsContainer /> :
        null
      }
      </div>
    </div>
  )}
}
  /*return (
    <div>
      <h2>{selectedProduct.name}</h2>
      <h5>{`in ${selectedProduct.department}`}</h5>
      <img src={selectedProduct.imageURL} />
      <p>{selectedProduct.description}</p>
      <button onClick={() => addToCart()}>Add To Cart</button>

    </div>
  );
};*/

const mapState = state => {
  console.log(state);
  return {
    selectedProduct: state.products.selectedProduct
  };
};

const mapDispatch = function (dispatch) {
  return {
    setProduct (product) {
      dispatch(selectProduct(product.id));
    }
  }
}

export default connect(mapState, mapDispatch)(Product);
