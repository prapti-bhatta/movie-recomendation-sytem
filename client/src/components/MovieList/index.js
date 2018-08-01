import React, { Component } from 'react'
import MovieListItem from './components/MovieListItem'
import './style.css'

class MovieList extends Component {
  constructor () {
    super(...arguments)
    this.handleMovieClick = this.handleMovieClick.bind(this)
  }

  handleMovieClick (movie) {
    if (this.props.onMovieClick) this.props.onMovieClick(movie)
  }

  render () {
    return (
      <div className='MovieList'>
        {this.props.movies && this.props.movies.map((movie) => {
          return (
            <MovieListItem movie={movie} onClick={this.handleMovieClick} />
          )
        })}
      </div>
    )
  }
}

export default MovieList
