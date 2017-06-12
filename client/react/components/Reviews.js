import React from 'react';

export default class Reviews extends React.Component {
  componentDidMount(){
    this.props.onLoadReviews()
  }
  render () {
    const reviews = this.props.allReviews;
    const selectedProduct = this.props.selectedProduct;
    console.log('reviews', this);
    return (
      <div>
        <h2>Product Reviews:</h2>
          {reviews && reviews.map(review => {
            return (
              <ul className="list-unstyled" key={review.id}>
                <li>{review.content}</li>
              </ul>
            );
          }
          )}
      </div>)
    }}
