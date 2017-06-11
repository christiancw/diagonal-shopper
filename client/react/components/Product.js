import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import localStore from 'store';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

// this export is FOR UNIT TESTING. DO NOT import this into react-router index
export const Product = ({ selectedProduct }) => {
  function addToCart(quantity) {
    const storeKey = String(selectedProduct.id);
    const retrieved = localStore.get(storeKey);
    if (!retrieved) {
      localStore.set(storeKey, {quantity, selectedProduct});
    } else {
      const newQuantity = retrieved.quantity + quantity;
      localStore.set(storeKey, {quantity: newQuantity, selectedProduct});
      // console.alert(`You already have ${retrieved.quantity} of this item in your cart. Edit your cart if you didn't mean to add ${quantity} more!`);
    }
  }

  return (
    <div>
      <Card>
          <CardMedia
            overlay={<CardTitle title={selectedProduct.name} subtitle={`in ${selectedProduct.department}`} />}>
              <img src={selectedProduct.imageURL} />
          </CardMedia>
          <CardText>
            {selectedProduct.description}
          </CardText>
          <CardActions>
            <FlatButton label="Add To Cart" onClick={() => addToCart()} />
            <FlatButton label="Reviews" />
          </CardActions>
      </Card>
    </div>
  )
};
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

export default connect(mapState)(Product);
