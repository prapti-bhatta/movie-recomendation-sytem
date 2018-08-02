import React, { Component } from 'react'

class AddReview extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      comment: '',
      rating: null
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCommentChange = this.handleCommentChange.bind(this)
    this.handleRatingChange = this.handleRatingChange.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    if (this.state.comment && this.props.onPostReview) {
      this.props.onPostReview(this.state.comment, this.state.rating && Number(this.state.rating))
    }
  }

  handleCommentChange (e) {
    this.setState({ comment: e.target.value })
  }

  handleRatingChange (e) {
    this.setState({ rating: e.target.value })
  }

  render () {
    return (
      <form className='row' onSubmit={this.handleSubmit}>
        <div className='col-12'>
          <textarea
            value={this.state.comment}
            onChange={this.handleCommentChange}
            className='form-control'
            placeholder='Leave a Review...'
          />
        </div>
        <div className='col-2 mt-2'>
          <select
            value={this.state.rating}
            onChange={this.handleRatingChange}
            className='form-control'
          >
            <option>Rating</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            <option value='6'>6</option>
            <option value='7'>7</option>
            <option value='8'>8</option>
            <option value='9'>9</option>
            <option value='10'>10</option>
          </select>
        </div>
        <div className='mt-2 col text-right'>
          <button className='btn btn-primary'> Post </button>
        </div>
      </form>
    )
  }
}

export default AddReview
