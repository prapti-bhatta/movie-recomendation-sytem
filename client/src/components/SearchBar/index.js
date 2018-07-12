import React, { Component } from 'react'
import './style.css'

class SearchBar extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      search: ''
    }
    this.searchTimer = null
    this.handleSearchChange = this.handleSearchChange.bind(this)
  }

  queueSearch () {
    if (!this.props.searchHandler) return
    if (this.searchTimer) clearTimeout(this.searchTimer)
    this.searchTimer = setTimeout(() => {
      this.props.searchHandler(this.state.search)
    }, this.props.waitTime || 500)
  }

  handleSearchChange (e) {
    this.queueSearch()
    this.setState({ search: e.target.value })
  }

  render () {
    return (
      <div className='SearchBar'>
        <input
          type='text'
          name='search'
          value={this.state.search}
          className='form-control'
          placeholder='Search...'
          onChange={this.handleSearchChange}
        />
      </div>
    )
  }
}

export default SearchBar
