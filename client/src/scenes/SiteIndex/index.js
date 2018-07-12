import React, { Component } from 'react'
import NavBar from '../../components/NavBar'
import MovieList from '../../components/MovieList'
import { fetchPopularMovies } from '../../service/movies'
import SearchBar from '../../components/SearchBar'

class SiteIndex extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      movies: []
    }
  }

  componentDidMount () {
    fetchPopularMovies()
      .then((movies) => this.setState({ movies }))
  }

  render () {
    return (
      <div>
        <NavBar />
        <div className='container'>
          <SearchBar searchHandler={() => {}} />
          <div className='row'>
            <div className='col-md-9'>
              <MovieList movies={this.state.movies} />
            </div>
            <div className='col-md-3'>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SiteIndex
