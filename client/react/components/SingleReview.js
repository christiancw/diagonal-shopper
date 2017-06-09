import React from 'react';

export default function Reviews (props) {

  const reviews = props.reviews;
  const users = props.users;
  const selectedProduct = props.selectedProduct;

  return (
    <table className='table'>
    <caption>Reviews for {selectedProduct}</caption>
      <thead>
        <tr>
          <th>User</th>
          <th>Rating</th>
          <th>Review</th>
        </tr>
      </thead>
      <tbody>
        {
          reviews && reviews.map(review => (
            <tr key={review.id}>
              <td>{ review.userName }</td>
              <td>{ review.rating }</td>
              <td>{ review.content }</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}
