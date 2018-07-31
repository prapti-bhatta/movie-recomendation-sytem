import React, { Component } from 'react'
import { Switch, Route } from 'react-router'
import Index from './Index'
import SingleMovie from './SingleMovie'

class Movies extends Component {
  render () {
    return (
      <Switch>
        <Route path='/movies' exact component={Index} />
        <Route path='/movies/:id' exact component={SingleMovie} />
      </Switch>
    )
  }
}

export default Movies
