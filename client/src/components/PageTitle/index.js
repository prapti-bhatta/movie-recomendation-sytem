import React, { Component } from 'react'

class PageTitle extends Component {
  render () {
    return (
      <div>
        <h2> {this.props.children} </h2>
      </div>
    )
  }
}

export default PageTitle
