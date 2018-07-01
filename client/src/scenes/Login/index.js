import React, { Component } from 'react'
import PageTitle from '../../components/PageTitle'

class Login extends Component {
  onLoginClick (e) {
    e.preventDefault()
  }

  render () {
    return (
      <div>
        <PageTitle> Login </PageTitle>
        <form>
          <div>
            <label>
              Username:
              <input type='text' name='username' />
            </label>
          </div>

          <div>
            <label>
              Password:
              <input type='password' name='password' />
            </label>
          </div>

          <div>
            <button onClick={this.onLoginClick} type='submit'>Login</button>
          </div>
        </form>
      </div>
    )
  }
}

export default Login
