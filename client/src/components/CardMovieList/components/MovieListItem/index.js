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
      <div className='card CardMovieListItem' style={style} onClick={this.handleClick}>
        <img class='card-img-top' src={movie.preview} alt='Card image' />
        <div class='card-body'>
          <small className='CardMovieListItem-title'>{movie.title}</small>
        </div>
      </div>
    )
  }
}

export default MovieListItem
