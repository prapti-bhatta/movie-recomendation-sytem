import React, { Component } from 'react'
import './style.css'

class MovieListItem extends Component {
  constructor () {
    super(...arguments)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    if (this.props.onClick) this.props.onClick(this.props.movie)
  }

  render () {
    const style = (this.props.onClick) ? { cursor: 'pointer' } : {}
    const movie = this.props.movie
    return (
      <div className='VMovieListItem' style={style} onClick={this.handleClick}>
        <div>
          <img className='VMovieListItem-thumbnail' src={movie.preview} />
        </div>
        <div className='mt-2'>
          <h6>{movie.title}</h6>
        </div>
      </div>
    )
  }
}

export default MovieListItem
