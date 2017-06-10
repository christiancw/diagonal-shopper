import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
// import muiThemeable from 'material-ui/styles/muiThemeable';
import { selectProduct } from '../../reducer/products';

// import Product from '/Product';

const Products = ({ products, setProduct }) => {
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
          <Link to={`/products/${product.id}`} onClick={() => setProduct(product)}>Go To Product Page</Link>
        </div>
      ))}
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
  };
  //.filter(p => p.categories.includes(selectedCategory
};

const mapDispatch = (dispatch) => {
  return {
    setProduct(product) {
      // browserHistory.push(`/products/${product.id}`)
      dispatch(selectProduct(product.id));
    }
  };
};

export default connect(mapState, mapDispatch)(Products);

Products.propTypes = {
  products: PropTypes.array
};
