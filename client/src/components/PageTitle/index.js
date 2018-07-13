import React, { Component } from 'react'
import './style.css'

class PageTitle extends Component {
  render () {
    return (
      <div className='container'>
        <h2 className='PageTitle'> {this.props.children} </h2>
      </div>
    )
  }
}

export default PageTitle
