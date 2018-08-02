import React, { Component } from 'react'
import NavBar from '../../components/NavBar'
import MovieList from '../../components/MovieList'
import { fetchNewestMovies, searchMovies, recommendedMovies } from '../../service/movies'
import SearchBar from '../../components/SearchBar'
import { getSingleMovieUrl } from '../../service/urls'
import { isLoggedIn } from '../../service/session'

class SiteIndex extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      movies: [],
      recommendedMovies: [],
      loggedIn: isLoggedIn()
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.gotoMovie = this.gotoMovie.bind(this)
  }

  componentDidMount () {
    fetchNewestMovies()
      .then((movies) => this.setState({ movies }))

    if (this.state.loggedIn) {
      recommendedMovies()
        .then(movies => this.setState({ recommendedMovies: movies }))
    }
  }

  gotoMovie (movie) {
    this.props.history.push(getSingleMovieUrl(movie.id))
  }

  handleSearch (query) {
    if (!query) {
      fetchNewestMovies()
        .then((movies) => this.setState({ movies }))
    } else {
      searchMovies(query)
        .then((movies) => this.setState({ movies }))
    }
  }

  render () {
    const loggedIn = this.state.loggedIn
    return (
      <div>
        <NavBar />
        <div className='container'>
          <SearchBar searchHandler={this.handleSearch} />
          <div className='row mt-5'>
            <div className={loggedIn ? 'col-md-6' : 'col-md-12'}>
              <h3 className='text-left'>Newest Additions</h3>
              <MovieList
                movies={this.state.movies}
                onMovieClick={this.gotoMovie}
              />
            </div>
            {loggedIn && <div className='col-md-1' />}
            {loggedIn && <div className='col-md-5'>
              <h3 className='text-left'>Recommended For You</h3>
              <MovieList
                movies={this.state.recommendedMovies}
                onMovieClick={this.gotoMovie}
              />
            </div>}
          </div>
        </div>
      </div>
    )
  }
}

export default SiteIndex
