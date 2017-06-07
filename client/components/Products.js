import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Product from '/Product';

const Products = ({ products }) => {
  // should get products, selectedCategory??

  return (
    <div>
      {/* We can get category/search term from state?? */}
      <h3>Results for ***Category or search term?***</h3>
      {products.map(product => (
        // <Product key={product.id} product={product} />
        `${product.name}`
      ))}
    </div>
  );
};


// or we can filter it here and maintain a list of all products
// e.g. products: products.filter(p => p.category === selectedCategory)

// hardcoding selectedCategory until we set up a reducer for it
// products should be pre-filtered by category before it gets here?
const mapState = ({ products }) => ({
  products: products.products,
  selectedCategory: 'Brooms'
});

export default connect(mapState)(Products);

Products.propTypes = {
  products: PropTypes.array
};
