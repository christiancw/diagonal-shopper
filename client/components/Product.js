import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const Product = ({ products }) => {
  const product = products.selectedProduct;
  return (
    <div>
      <h3> product.name </h3>a
    </div>
  )
}

const mapState
