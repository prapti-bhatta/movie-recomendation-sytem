import React, { Component } from 'react'
import PageTitle from '../../components/PageTitle'
import { register } from '../../service/authentication'

const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

class Register extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {},
      registerDone: false
    }

    this.handleRegisterClick = this.handleRegisterClick.bind(this)
    this.handleFieldChanged = this.handleFieldChanged.bind(this)
  }

  handleRegisterClick (e) {
    e.preventDefault()

    const errors = {}

    if (!this.state.firstName || !this.state.lastName) {
      errors.name = 'Please enter your name'
    }

    if (!this.state.email) {
      errors.email = 'Please enter your email'
    } else if (!EMAIL_REGEXP.test(this.state.email)) {
      errors.email = 'Please enter a valid email address'
    }

    if (!this.state.password) {
      errors.password = 'Please choose a password'
    } else if (this.state.password.length < 6) {
      errors.password = 'Your password should be atleast 6 characters long'
    } else if (this.state.password !== this.state.confirmPassword) {
      errors.password = 'The two passwords do not match'
    }

    if (Object.keys(errors).length === 0) {
      register(
        this.state.firstName,
        this.state.lastName,
        this.state.email,
        this.state.password
      ).then(() => {
        this.setState({ registerDone: true })
      }).catch((e) => {
        this.setState({
          errors: e
        })
      })
    } else {
      this.setState({ errors })
    }
  }

  handleFieldChanged (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render () {
    const { errors, registerDone } = this.state
    if (registerDone) {
      return (
        <div>
          <PageTitle> Registration Complete </PageTitle>
          <div className='container'>
            <p>
              Your account has been created successfully. Please <a href='/login'>login</a> using your new account.
            </p>
          </div>
        </div>
      )
    }
    return (
      <div>
        <PageTitle> Register </PageTitle>
        <form className='container'>
          {errors.global &&
          <div className='alert alert-danger' role='alert'>
            {errors.global}
          </div>
          }
          <div className='form-group'>
            <label>
              Name
            </label>
            <div className='row'>
              <div className='col'>
                <input name='firstName' className='form-control' placeholder='First Name' onChange={this.handleFieldChanged} />
              </div>
              <div className='col'>
                <input name='lastName' className='form-control' placeholder='Last Name' onChange={this.handleFieldChanged} />
              </div>
            </div>
            <div> <small> {errors.name} </small> </div>
          </div>
          <div className='form-group'>
            <label>
              Email
            </label>
            <input name='email' className='form-control' placeholder='johndoe@gmail.com' onChange={this.handleFieldChanged} />
            <div> <small> {errors.email} </small> </div>
          </div>
          <div className='form-group'>
            <label>
              Password
            </label>
            <div className='row'>
              <div className='col'>
                <input
                  className='form-control'
                  type='password'
                  name='password'
                  placeholder='Password'
                  onChange={this.handleFieldChanged}
                />
              </div>
              <div className='col'>
                <input
                  className='form-control'
                  type='password'
                  name='confirmPassword'
                  placeholder='Retype Password'
                  onChange={this.handleFieldChanged}
                />
              </div>
            </div>
            <div> <small> {errors.password} </small> </div>
          </div>
          <div>
            <button className='btn btn-primary' onClick={this.handleRegisterClick} type='submit'>Register</button>
          </div>
        </form>
      </div>
    )
  }
}

export default Register
