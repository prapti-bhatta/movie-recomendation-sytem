import React from 'react'
import { Switch, Route } from 'react-router'
import Add from './Add'
import Index from './Index'

function Movies () {
  return (
    <div>
      <Switch>
        <Route path='/admin/movies/edit/:id' exact component={Add} />
        <Route path='/admin/movies' exact component={Index} />
        <Route path='/admin/movies/add' exact component={Add} />
      </Switch>
    </div>
  )
}

export default Movies
