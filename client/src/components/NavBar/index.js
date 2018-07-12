import React, { Component } from 'react'
import { SITE_NAME } from '../../config'
import './style.css'

class NavBar extends Component {
  render () {
    return (
      <div className='NavBar'>
        <div className='container'>
          <div className='row'>
            <div className='NavBar-brand col-sm-2'>
              {SITE_NAME}
            </div>
            <div className='offset-sm-6 col-sm-4'>
              <ul className='NavBar-nav'>
                <li>
                  <a href='/login'> Login </a>
                </li>
                <li>
                  <a href='/register'> Register </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NavBar
