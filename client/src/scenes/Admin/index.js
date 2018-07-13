import React, { Component } from 'react'
import { Switch, Route } from 'react-router'
import Movies from './Movies'
import NavBar from '../../components/NavBar'
import { isSessionUserAnAdmin } from '../../service/session'

class Admin extends Component {
  componentDidMount () {
    if (!isSessionUserAnAdmin()) {
      window.location = '/'
    }
  }

  render () {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route path='/admin/movies' component={Movies} />
        </Switch>
      </div>
    )
  }
}

export default Admin
