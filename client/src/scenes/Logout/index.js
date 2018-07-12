import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { logout } from '../../service/authentication'

class Logout extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      logoutDone: false
    }
  }

  componentDidMount () {
    logout()
      .then(() => {
        this.setState({ logoutDone: true })
        window.location = '/'
      })
  }

  render () {
    if (this.state.logoutDone) {
      return <Redirect to='/' />
    }
    return (
      <h3> Logging Out... </h3>
    )
  }
}

export default Logout
