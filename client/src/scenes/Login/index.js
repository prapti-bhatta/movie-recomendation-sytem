import React, { Component } from 'react'
import { Redirect } from 'react-router'
import PageTitle from '../../components/PageTitle'
import { login } from '../../service/authentication'

class Login extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      username: '',
      password: '',
      errors: {},
      loginDone: false
    }

    this.handleLoginClick = this.handleLoginClick.bind(this)
    this.handleUsernameChanged = this.handleUsernameChanged.bind(this)
    this.handlePasswordChanged = this.handlePasswordChanged.bind(this)
  }

  handleLoginClick (e) {
    e.preventDefault()

    let errors = {}

    if (!this.state.username) {
      errors.username = 'Please Enter a username'
    }

    if (!this.state.password) {
      errors.password = 'Please enter a password'
    }

    if (Object.keys(errors).length === 0) {
      login(this.state.username, this.state.password)
        .then(() => {
          this.setState({ loginDone: true })
          window.location = '/home'
        })
    } else {
      this.setState({ errors })
    }
  }

  handleUsernameChanged (e) {
    this.setState({ username: e.target.value })
  }

  handlePasswordChanged (e) {
    this.setState({ password: e.target.value })
  }

  render () {
    if (this.state.loginDone) {
      return <Redirect to='/home' />
    }
    return (
      <div>
        <PageTitle> Login </PageTitle>
        <form className='container'>
          <div className='form-group'>
            <label> Username </label>
            <input
              type='text'
              name='username'
              className='form-control'
              onChange={this.handleUsernameChanged}
            />
            <div>
              {(this.state.errors.username) ? <small>{this.state.errors.username}</small> : ''}
            </div>
          </div>

          <div className='form-group'>
            <label>
              Password:
            </label>
            <input
              type='password'
              name='password'
              className='form-control'
              onChange={this.handlePasswordChanged}
            />
            <div>
              {(this.state.errors.password) ? <small>{this.state.errors.password}</small> : ''}
            </div>
          </div>
          <div>
            <button
              onClick={this.handleLoginClick}
              type='submit'
              className='btn btn-primary'
            >
              Login
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default Login
