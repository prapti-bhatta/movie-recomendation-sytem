import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { searchMovies } from '../../../../service/movies'
import PageTitle from '../../../../components/PageTitle'

class Index extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      movies: [],
      search: ''
    }

    this.handleSearchQueryChange = this.handleSearchQueryChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount () {
    this.updateList()
  }

  handleSearch () {
    this.updateList()
  }

  handleSearchQueryChange (e) {
    this.setState({ search: e.target.value })
  }

  updateList () {
    searchMovies(this.state.search)
      .then(movies => this.setState({ movies }))
  }

  renderSearch () {
    return (
      <div className='row'>
        <div className='col-3'>
          <input
            className='form-control'
            placeholder='Search'
            value={this.state.search}
            onChange={this.handleSearchQueryChange}
          />
        </div>
        <div className='col-5'>
          <button className='btn btn-info' onClick={this.handleSearch}> Search </button>
        </div>
        <div className='col-4 text-right'>
          <Link to='/admin/movies/add' className='btn btn-primary'> Add Movie </Link>
        </div>
      </div>
    )
  }

  render () {
    return (
      <div>
        <PageTitle> Movies </PageTitle>
        <div className='container'>
          {this.renderSearch()}
          <br />
          <table className='table table-striped'>
            <thead>
              <tr>
                <th> Title </th>
                <th> Release Date </th>
                <th> Actions </th>
              </tr>
            </thead>
            <tbody>
              {this.state.movies.map(movie => {
                return (
                  <tr>
                    <td> {movie.title} </td>
                    <td> {movie.release_date} </td>
                    <td>
                      <Link
                        className='btn btn-sm btn-primary'
                        to={`/admin/movies/edit/${movie.id}`}
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Index
