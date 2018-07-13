import React from 'react'
import { Switch, Route } from 'react-router'
import Add from './Add'

function Movies () {
  return (
    <div>
      <Switch>
        <Route path='/admin/movies/add' exact component={Add} />
      </Switch>
    </div>
  )
}

export default Movies
