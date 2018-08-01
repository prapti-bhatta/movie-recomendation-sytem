import React, { Component } from 'react'
import AddReview from './components/AddReview'
import ReviewList from './components/ReviewList'
import { isLoggedIn, getSessionUser } from '../../service/session'
import { getMovieReviews, postMovieReview, getMovieReviewByUser } from '../../service/movies'

class Reviews extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      movieId: this.props.movieId,
      loading: false,
      reviews: [],
      userReview: null,
      loggedIn: isLoggedIn(),
      user: getSessionUser()
    }

    this.handlePostReview = this.handlePostReview.bind(this)
  }

  componentDidMount () {
    if (!this.state.loggedIn) return
    this.setState({ loading: true })
    getMovieReviewByUser(this.state.movieId, this.state.user.id)
      .then((userReview) => this.setState({ userReview }))
      .then(() => getMovieReviews(this.state.movieId))
      .then(reviews => this.setState({ reviews, loading: false }))
      .catch(e => this.setState({ loading: false }))
  }

  handlePostReview (comment, rating) {
    postMovieReview(this.state.movieId, comment, rating)
      .then(userReview => this.setState({ userReview }))
  }

  render () {
    const { loading, userReview } = this.state
    if (loading) return <div> Loading... </div>
    return (
      <div>
        {!userReview && <div className='mt-3'>
          <AddReview onPostReview={this.handlePostReview} />
        </div>}
        {userReview &&
        <div className='mt-5'>
          <h5> Your Review </h5>
          {!!userReview.rating && <div> <small>{userReview.rating} Stars</small> </div>}
          <p> {userReview.comment} </p>
        </div>}
        <div className='mt-5 mb-5'>
          <h5> Reviews </h5>
          <ReviewList reviews={this.state.reviews} />
        </div>
      </div>
    )
  }
}

export default Reviews
