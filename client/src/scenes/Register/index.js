import React, { Component } from 'react'
import PageTitle from '../../components/PageTitle'

class Register extends Component {
  handleRegisterClick (e) {
    e.preventDefault()
  }

  render () {
    return (
      <div>
        <PageTitle> Register </PageTitle>
        <form>
          <div>
            <label>
              Name
              <input name='firstName' placeholder='First' />
              <input name='lastName' placeholder='Last' />
            </label>
          </div>
          <div>
            <label>
              Email
              <input name='email' placeholder='johndoe@gmail.com' />
            </label>
          </div>
          <div>
            <button onClick={this.handleRegisterClick} type='submit'>Register</button>
          </div>
        </form>
      </div>
    )
  }
}

export default Register
