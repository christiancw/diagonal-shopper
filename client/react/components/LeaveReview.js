import React from 'react';

export default function LeaveReview (props) {
  const handleRateChange = props.handleRateChange;
  const handleContentChange = props.handleContentChange;
  const handleSubmit = props.handleSubmit;
  const selectedProduct = props.selectedProduct;
  const stars = props.stars;
  const contentValue = props.contentValue;
  console.log('form props', props)

  return (
    <div>
    <fieldset>
    <legend>Leave a Review for {selectedProduct}</legend>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleRateChange}
          value={stars}
          />
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
