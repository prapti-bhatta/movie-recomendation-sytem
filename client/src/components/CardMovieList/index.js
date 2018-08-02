import React, { Component } from 'react'
import MovieListItem from './components/MovieListItem'
import './style.css'

class CardMovieList extends Component {
  constructor () {
    super(...arguments)
    this.handleMovieClick = this.handleMovieClick.bind(this)
  }

  handleMovieClick (movie) {
    if (this.props.onMovieClick) this.props.onMovieClick(movie)
  }

  render () {
    return (
      <div className='CardMovieList'>
        <div className='row'>
          {this.props.movies && this.props.movies.map((movie) => {
            return (
              <div className='col-md-2'>
                <MovieListItem movie={movie} onClick={this.handleMovieClick} />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default CardMovieList
