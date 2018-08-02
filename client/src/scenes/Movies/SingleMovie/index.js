import React, { Component } from 'react'
import NavBar from '../../../components/NavBar'
import PageTitle from '../../../components/PageTitle'
import { getMovieInfo, othersAlsoLikeMovies } from '../../../service/movies'
import Reviews from '../../../components/Reviews'
import VerticalMovieList from '../../../components/VerticalMovieList'
import { getSingleMovieUrl } from '../../../service/urls'
import './style.css'

class SingleMovie extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      movieId: this.props.match.params.id,
      movie: {
        title: 'Loading...',
        release_date: 'Release Date',
        genre: 'Genre',
        description: `Loading...`
      },
      reviews: [],
      loading: false,
      loadingReviews: false,
      othersAlsoLiked: []
    }

    this.gotoMovie = this.gotoMovie.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.setState({ movieId: nextProps.match.params.id }, this.componentDidMount)
    }
  }

  componentDidMount () {
    this.setState({ loading: true, loadingReviews: true })
    getMovieInfo(this.state.movieId)
      .then(movie => this.setState({ movie, loading: false }))
      .catch(e => this.setState({ loading: false }))

    othersAlsoLikeMovies(this.state.movieId, 0, 5)
      .then(movies => this.setState({ othersAlsoLiked: movies }))
  }

  renderOthersAlsoLiked () {
    return (
      <div>
        <hr />
        <h5 className='text-center'> People Also Liked </h5>
        <VerticalMovieList
          movies={this.state.othersAlsoLiked}
          onMovieClick={this.gotoMovie}
        />
      </div>
    )
  }

  gotoMovie (movie) {
    this.props.history.push(getSingleMovieUrl(movie.id))
  }

  renderMovieData (movie) {
    return (
      <div>
        <PageTitle> {movie.title} </PageTitle>
        <div className='container'>
          <div className='row mt-2'>
            <div className='col-md-8'>
              <div>
                <img src={movie.preview}
                  className='MoviePreviewImage'
                />
              </div>
              <Reviews movieId={this.state.movieId} />
            </div>
            <div className='col-md-4'>
              <div>
                <small><strong>Released on:</strong> {movie.release_date}</small>
              </div>
              <div>
                <small><strong>Genre:</strong> {movie.genre_name}</small>
              </div>
              <p className='mt-2'>{movie.description}</p>

              {this.renderOthersAlsoLiked()}
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderNotFound () {
    return (
      <div>
        <PageTitle> Oops! </PageTitle>
        <div className='container'>
          <p> This movie does not exist! </p>
        </div>
      </div>
    )
  }

  render () {
    const { movie, loading } = this.state
    if (loading) return <div> Loading... </div>
    return (
      <div>
        <NavBar />
        {(movie.id === undefined && !loading)
          ? this.renderNotFound()
          : this.renderMovieData(movie)
        }
      </div>
    )
  }
}

export default SingleMovie
