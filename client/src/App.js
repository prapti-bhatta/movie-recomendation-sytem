import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import Login from './scenes/Login'
import Register from './scenes/Register'
import Logout from './scenes/Logout'
import SiteIndex from './scenes/SiteIndex'
import Admin from './scenes/Admin'
import Movies from './scenes/Movies'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={SiteIndex} />
          <Route path='/home' exact render={() => <Redirect to='/' />} />

          {/* Authentication Routes */}
          <Route path='/login' exact component={Login} />
          <Route path='/register' exact component={Register} />
          <Route path='/logout' exact component={Logout} />

          {/* Parent Routes */}
          <Route path='/admin' component={Admin} />
          <Route path='/movies' component={Movies} />

        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
