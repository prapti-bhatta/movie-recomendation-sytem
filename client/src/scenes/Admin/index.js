import React from 'react'
import { Switch, Route } from 'react-router'
import Movies from './Movies'
import NavBar from '../../components/NavBar';

function Admin () {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path='/admin/movies' component={Movies} />
      </Switch>
    </div>
  )
}

export default Admin
