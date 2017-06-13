import React from 'react';

export default function LeaveReview (props) {
  const handleRateChange = props.handleRateChange;
  const handleContentChange = props.handleContentChange;
  const handleSubmit = props.handleSubmit;
  const selectedProduct = props.selectedProductName;
  const stars = props.stars;
  const contentValue = props.contentValue;
  console.log('form props', props)

  return (
    <div>
    <fieldset>
    <legend>Leave a Review for {selectedProduct}</legend>
      <form onSubmit={handleSubmit}>
      <label>Rating of 1 to 5 Stars</label>
        <input
          type="number"
          name="quantity"
          min="1"
          max="5"
          onChange={handleRateChange}
          value={stars}
          />
        <label>Review</label>
        <input
          type="text"
          onChange={handleContentChange}
          value={contentValue}
          />
        <button
          type="submit">
          Submit
        </button>
      </form>
      </fieldset>
    </div>
  )
}
