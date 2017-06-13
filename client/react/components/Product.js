import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import localStore from 'store';
import { addToOrder } from '../../reducer/order';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { getReviews, loadReviews } from '../../reducer/reviews';
import { selectProduct } from '../../reducer/products';
import ReviewsContainer from '../containers/ReviewsContainer';
import Snackbar from 'material-ui/Snackbar';

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
    const selectedProduct = this.props.selectedProduct;
      if (!this.props.user) {
          const storeKey = String(selectedProduct.id);
          const retrieved = localStore.get(storeKey);
          if (!retrieved) {
            localStore.set(storeKey, {quantity: 1, selectedProduct});
            //localStore.set(storeKey, {quantity, this.props.selectedProduct});
          } else {
            const newQuantity = retrieved.quantity + 1;
            // const newQuantity = retrieved.quantity + quantity;
            localStore.set(storeKey, {quantity: newQuantity, selectedProduct});
            // console.alert(`You already have ${retrieved.quantity} of this item in your cart. Edit your cart if you didn't mean to add ${quantity} more!`);
          }
      } 
  else {
    this.props.addToOrderFunc(selectedProduct);
  }
}
  removeFromCart() {
    const selectedProduct = this.props.selectedProduct;
    if (!this.props.user) {
        const storeKey = String(selectedProduct.id);
        const retrieved = localStore.get(storeKey);
        if (retrieved && retrieved.quantity > 1) {
          const newQuantity = retrieved.quantity - 1;
          localStore.set(storeKey, {quantity: newQuantity, selectedProduct});
        }
        if (retrieved.quantity === 1) {
          localStore.removeItem(storeKey);
        }
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
            <FlatButton label="Add To Cart" onClick={() => {this.addToCart(); this.handleClick();}} />
            <FlatButton label="Remove From Cart" onClick={() => {this.removeFromCart();}} />
            <FlatButton label="Reviews" onClick={() => this.handleReviewClick()} />
          </CardActions>
      </Card>
      <div>
      {this.state.showReviews ?
        <ReviewsContainer /> :
        null
      }
      </div>
      <Snackbar
          open={this.state.open}
          message="Item added to cart"
          autoHideDuration={4000}
        />
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
  return {
    selectedProduct: state.products.selectedProduct,
    user: state.user.id
  };
};


const mapDispatch = (dispatch) => {
  return {
    addToOrderFunc(product) {
      console.log("PLZPLZPLZ", product)
      dispatch(addToOrder(product))
    }
  };
};

export default connect(mapState, mapDispatch)(Product);
