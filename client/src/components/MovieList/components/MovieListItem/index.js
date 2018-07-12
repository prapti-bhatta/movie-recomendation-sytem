import React, { Component } from 'react'
import './style.css'

class MovieListItem extends Component {
  render () {
    const movie = this.props.movie
    return (
      <div className='MovieListItem'>
        <div className='row'>
          <div className='col-md-3'>
            <img className='MovieListItem-thumbnail' src={movie.preview} />
          </div>
          <div className='col-md-9'>
            <h4>{movie.title}</h4>
            <p>{movie.description.substring(0, 220)}...</p>
          </div>
        </div>
      </div>
    )
  }
}

export default MovieListItem
