import React from 'react';

export default function LeaveReview (props) {
  const handleChange = props.handleChange;
  const handleSubmit = props.handleSubmit;
  const selectedProduct = props.selectedProduct;

  return (
    <div>
    <legend>Leave a Review for {selectedProduct.name}</legend>
    </div>
  )
}
