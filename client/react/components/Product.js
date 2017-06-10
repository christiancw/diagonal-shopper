import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import localStore from 'store';


const Product = ({ selectedProduct }) => {
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
      <h3> selectedProduct.name </h3>
      <button onClick={() => addToCart()}>Add To Cart</button>

    </div>
  );
};


const mapState = state => {
  return {
    selectedProduct: state.products.selectedProduct
  };
};

const mapDispatch = dispatch => {
  return {

  };
};

export default connect(mapState, mapDispatch)(Product);
