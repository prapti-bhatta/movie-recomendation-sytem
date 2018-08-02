import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PageTitle from '../../../../components/PageTitle'
import { getAllGenre } from '../../../../service/genre'
import { createMovie, getMovieInfo, editMovie } from '../../../../service/movies'

class Add extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      errors: {},
      title: '',
      description: '',
      releaseDate: '',
      genre: '',
      preview: '',
      genreList: [],
      movieSaved: false,
      editId: this.props.match.params.id
    }

    this.handleFieldChanged = this.handleFieldChanged.bind(this)
    this.handleAddMovie = this.handleAddMovie.bind(this)
  }

  componentDidMount () {
    getAllGenre()
      .then(genreList => this.setState({ genreList }))
    if (this.state.editId) {
      getMovieInfo(this.state.editId)
        .then(movie => {
          this.setState({
            title: movie.title,
            description: movie.description,
            releaseDate: movie.release_date,
            genre: movie.genre,
            preview: movie.preview
          })
        })
    }
  }

  handleFieldChanged (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  renderGenreSelect () {
    return (
      <select className='form-control' name='genre' value={this.state.genre} onChange={this.handleFieldChanged}>
        <option> Select Genre </option>
        {this.state.genreList.map(genre => {
          return (<option value={genre.id}>{genre.name}</option>)
        })}
      </select>
    )
  }

  handleAddMovie (e) {
    e.preventDefault()
    let errors = {}

    if (!this.state.title) {
      errors.title = 'Please enter the title of the movie'
    }

    if (!this.state.description) {
      errors.description = 'Please enter a description for the movie'
    }

    if (!this.state.releaseDate) {
      errors.releaseDate = 'Please enter the release date of the movie'
    }

    if (!this.state.genre) {
      errors.genre = 'Please select the genre of the movie'
    }

    if (Object.keys(errors).length === 0) {
      const promise = (this.state.editId)
        ? editMovie(this.state.editId, this.state.title, this.state.releaseDate, this.state.genre, this.state.description)
        : createMovie(this.state.title, this.state.releaseDate, this.state.genre, this.state.description)

      promise
        .then(() => {
          this.setState({ movieSaved: true })
        }).catch(e => {
          this.setState({
            errors: e
          })
        })
    } else {
      this.setState({ errors })
    }
  }

  renderNavigation () {
    return (
      <div className='container'>
        <br />
        <ul className='nav'>
          <li className='nav-item'>
            <Link to='/admin/movies'> {'<<'} Movies </Link>
          </li>
        </ul>
      </div>
    )
  }

  render () {
    const { errors, movieSaved } = this.state
    if (movieSaved) {
      return (
        <div>
          {this.renderNavigation()}
          <PageTitle> Movie Saved Successfully </PageTitle>
        </div>
      )
    }
    return (
      <div>
        {this.renderNavigation()}
        <PageTitle> {this.state.editId? 'Edit' : 'Add'} Movie </PageTitle>
        <div className='container'>
          <form onSubmit={this.handleAddMovie}>
            {this.state.errors.global &&
            <div className='alert alert-danger' role='alert'>
              {this.state.errors.global}
            </div>
            }
            <div className='form-group'>
              <label> Title </label>
              <input
                type='text'
                name='title'
                className='form-control'
                value={this.state.title}
                onChange={this.handleFieldChanged}
              />
              <div>
                {(errors.title) ? <small>{errors.title}</small> : ''}
              </div>
            </div>

            <div className='form-group'>
              <label> Release Date </label>
              <input
                type='date'
                name='releaseDate'
                className='form-control'
                value={this.state.releaseDate}
                onChange={this.handleFieldChanged}
              />
              <div>
                {(errors.releaseDate) ? <small>{errors.releaseDate}</small> : ''}
              </div>
            </div>

            <div className='form-group'>
              <label> Genre </label>
              {this.renderGenreSelect()}
              <div>
                {(errors.genre) ? <small>{errors.genre}</small> : ''}
              </div>
            </div>

            <div className='form-group'>
              <label>
              Description:
              </label>
              <textarea
                name='description'
                className='form-control'
                value={this.state.description}
                onChange={this.handleFieldChanged}
              />
              <div>
                {(errors.description) ? <small>{errors.description}</small> : ''}
              </div>
            </div>
            
            <div className='form-group'>
              <label> Preview Url </label>
              <input
                type='text'
                name='preview'
                className='form-control'
                value={this.state.preview}
                onChange={this.handleFieldChanged}
              />
              <div>
                {(errors.preview) ? <small>{errors.preview}</small> : ''}
              </div>
            </div>

            <div>
              <button
                onClick={this.handleAddMovie}
                type='submit'
                className='btn btn-primary'
              >
              Save
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Add
