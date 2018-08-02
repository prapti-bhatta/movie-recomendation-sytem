import React, { Component } from 'react'
import NavBar from '../../components/NavBar'
import MovieList from '../../components/MovieList'
import { fetchNewestMovies, searchMovies, recommendedMovies } from '../../service/movies'
import SearchBar from '../../components/SearchBar'
import { getSingleMovieUrl } from '../../service/urls'
import { isLoggedIn } from '../../service/session'
import CardMovieList from '../../components/CardMovieList'

class SiteIndex extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      movies: [],
      recommendedMovies: [],
      loggedIn: isLoggedIn(),
      query: ''
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.gotoMovie = this.gotoMovie.bind(this)
  }

  componentDidMount () {
    fetchNewestMovies(0, 6)
      .then((movies) => this.setState({ movies }))

    if (this.state.loggedIn) {
      recommendedMovies(0, 6)
        .then(movies => this.setState({ recommendedMovies: movies }))
    }
  }

  gotoMovie (movie) {
    this.props.history.push(getSingleMovieUrl(movie.id))
  }

  handleSearch (query) {
    this.setState({ query })
    if (!query) {
      fetchNewestMovies(0, 6)
        .then((movies) => this.setState({ movies }))
    } else {
      searchMovies(query, 0, 65535)
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
            <div className='col-md-12'>
              <h3 className='text-left mb-3'>
                {this.state.query ? 'Search Results' : 'Newest Additions'}
              </h3>
              <CardMovieList
                movies={this.state.movies}
                onMovieClick={this.gotoMovie}
              />
            </div>
            {loggedIn && <div className='col-md-12 mt-3'>
              <h3 className='text-left mb-3'>Recommended For You</h3>
              <CardMovieList
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
