import React, { Component } from 'react'
import { Switch, Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import Login from './scenes/Login'
import Register from './scenes/Register'
import Logout from './scenes/Logout'
import SiteIndex from './scenes/SiteIndex'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={SiteIndex} />
          <Route path='/login' exact component={Login} />
          <Route path='/register' exact component={Register} />
          <Route path='/logout' exact component={Logout} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App