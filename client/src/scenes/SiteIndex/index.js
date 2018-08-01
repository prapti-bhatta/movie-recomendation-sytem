import React, { Component } from 'react'
import NavBar from '../../components/NavBar'
import MovieList from '../../components/MovieList'
import { fetchPopularMovies, searchMovies } from '../../service/movies'
import SearchBar from '../../components/SearchBar'
import { getSingleMovieUrl } from '../../service/urls'

class SiteIndex extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      movies: []
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.gotoMovie = this.gotoMovie.bind(this)
  }

  componentDidMount () {
    fetchPopularMovies()
      .then((movies) => this.setState({ movies }))
  }

  gotoMovie (movie) {
    this.props.history.push(getSingleMovieUrl(movie.id))
  }

  handleSearch (query) {
    searchMovies(query)
      .then((movies) => this.setState({ movies }))
  }

  render () {
    return (
      <div>
        <NavBar />
        <div className='container'>
          <SearchBar searchHandler={this.handleSearch} />
          <div className='row'>
            <div className='col-md-9'>
              <MovieList
                movies={this.state.movies}
                onMovieClick={this.gotoMovie}
              />
            </div>
            <div className='col-md-3' />
          </div>
        </div>
      </div>
    )
  }
}

export default SiteIndex
