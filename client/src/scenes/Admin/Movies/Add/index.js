import React, { Component } from 'react'
import PageTitle from '../../../../components/PageTitle'
import { getAllGenre } from '../../../../service/genre'
import { createMovie } from '../../../../service/movies'

class Add extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      errors: {},
      title: '',
      description: '',
      releaseDate: '',
      genre: '',
      genreList: [],
      movieSaved: false
    }

    this.handleFieldChanged = this.handleFieldChanged.bind(this)
    this.handleAddMovie = this.handleAddMovie.bind(this)
  }

  componentDidMount () {
    getAllGenre()
      .then(genreList => this.setState({ genreList }))
  }

  handleFieldChanged (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  renderGenreSelect () {
    return (
      <select className='form-control' name='genre' onChange={this.handleFieldChanged}>
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
      createMovie(this.state.title, this.state.releaseDate, this.state.genre, this.state.description)
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

  render () {
    const { errors, movieSaved } = this.state
    if (movieSaved) {
      return (
        <PageTitle> New Movie Saved Successfully </PageTitle>
      )
    }
    return (
      <div>
        <PageTitle> Add Movie </PageTitle>
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
                onChange={this.handleFieldChanged}
              />
              <div>
                {(errors.description) ? <small>{errors.description}</small> : ''}
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
