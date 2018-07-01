import React, { Component } from 'react'
import { Switch, Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import Login from './scenes/Login'
import Register from './scenes/Register'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
