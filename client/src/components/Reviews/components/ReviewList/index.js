import React, { Component } from 'react'

class ReviewList extends Component {
  render () {
    const reviews = this.props.reviews || []

    if (reviews.length === 0) {
      return (<p> There are no reviews for this movie yet </p>)
    }

    return (
      <div className='card'>
        <ul className='list-group list-group-flush'>
          {reviews.map((review) => {
            return (
              <li className='list-group-item'>
                <div>
                  <small className='mr-1'>{review.user.first_name} {review.user.last_name}</small>
                  {!!review.rating && <small> <span className='mr-1'>|</span> {review.rating} Stars </small>}
                </div>
                <div>{review.comment}</div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default ReviewList
