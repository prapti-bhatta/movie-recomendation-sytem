import React, { Component } from 'react'
import { SITE_NAME } from '../../config'
import { isLoggedIn, getSession } from '../../service/session'
import './style.css'

class NavBar extends Component {
  loggedInMenu () {
    const user = getSession().user
    return (
      <ul className='NavBar-nav'>
        <li>
          <a href='javascript:void(0)'> {user.username} </a>
        </li>
        <li>
          <a href='/logout'> Logout </a>
        </li>
      </ul>
    )
  }

  loggedOutMenu () {
    return (
      <ul className='NavBar-nav'>
        <li>
          <a href='/login'> Login </a>
        </li>
        <li>
          <a href='/register'> Register </a>
        </li>
      </ul>
    )
  }

  render () {
    return (
      <div className='NavBar'>
        <div className='container'>
          <div className='row'>
            <div className='NavBar-brand col-sm-2'>
              {SITE_NAME}
            </div>
            <div className='offset-sm-6 col-sm-4'>
              { isLoggedIn() ? this.loggedInMenu() : this.loggedOutMenu()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NavBar
