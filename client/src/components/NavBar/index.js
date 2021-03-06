import React, { Component } from 'react'
import { SITE_NAME } from '../../config'
import { isLoggedIn, getSessionUser, isSessionUserAnAdmin } from '../../service/session'
import './style.css'

class NavBar extends Component {
  loggedInMenu () {
    const user = getSessionUser()
    const isSuper = isSessionUserAnAdmin()

    return (
      <ul className='NavBar-nav'>
        {isSuper && <li>
          <a href='/admin/movies/'> Manage Movies </a>
        </li>}
        <li>
          <a href='javascript:void(0)'> {user.first_name} </a>
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
              <a href='/'> {SITE_NAME} </a>
            </div>
            <div className='offset-sm-2 col-sm-8'>
              { isLoggedIn() ? this.loggedInMenu() : this.loggedOutMenu()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NavBar
