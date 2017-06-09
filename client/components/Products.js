import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { selectProduct } from '../reducer/products';
import localStore from 'store';
// import Product from '/Product';

const Products = ({ products, selectedProduct, setProduct }) => {
  // should get products, selectedCategory??
  console.log('ALL LOADED PRODUCTS', products);

  function addToCart() {
    const storeKey = String(selectedProduct.id);
    const retrieved = localStore.get(storeKey);
    if (!retrieved) {
      localStore.set(storeKey, {quantity: 1, selectedProduct});
    } else {
      const newQuantity = retrieved.quantity + 1;
      localStore.set(storeKey, {quantity: newQuantity, selectedProduct});
    }
  }

  return (
    <div>
      {/* We can get category/search term from state?? */}
      <h3>Results for ***Category or search term?***</h3>
      {products && products.map(product => (
        // <Product key={product.id} product={product} />
        <div className="col-xs-4" key={product.id}>
          {/* <Link className="thumbnail" to={`/products/${product.id}`} /> */}
          <img src={product.imageURL} />
          <h4>{product.name}</h4>
          <button onClick={() => setProduct(product)}>Go To Product Page</button>
        </div>
      ))}

      <button onClick={() => addToCart()}>Add Selected to Cart</button>
    </div>
  );
};


// or we can filter it here and maintain a list of all products
// e.g. products: products.filter(p => p.category === selectedCategory)

// hardcoding selectedCategory until we set up a reducer for it
// products should be pre-filtered by category before it gets here?
const mapState = (state) => {
  return {
    products: state.products.allProducts,
    selectedProduct: state.products.selectedProduct
  };
  //.filter(p => p.categories.includes(selectedCategory
};

const mapDispatch = (dispatch) => {
  return {
    setProduct(product) {
      dispatch(selectProduct(product.id));
    }
  };
};

export default connect(mapState, mapDispatch)(Products);

Products.propTypes = {
  products: PropTypes.array
};
