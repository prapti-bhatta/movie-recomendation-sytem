import React, { Component } from 'react'
import MovieListItem from './components/MovieListItem'
import './style.css'

class MovieList extends Component {
  render () {
    return (
      <div className='MovieList'>
        {this.props.movies && this.props.movies.map((movie) => {
          return (
            <MovieListItem movie={movie} />
          )
        })}
      </div>
    )
  }
}

export default MovieList
