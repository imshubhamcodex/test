import React, { Component } from 'react'
import routes from './routes'
import { Route, Link, Redirect, Switch } from 'react-router-dom'
import Navbar from './Navbar'
import NoMatch from './NoMatch'
import FlashmessagesList from './Components/flash/FlashMessagesList'

class App extends Component {
  render() {
    
    return (
      <div className="container">
        <Navbar />
        <FlashmessagesList />
        <Switch>
          {routes.map(({ path, exact, component: Component, ...rest }) => (
            <Route key={path} path={path} exact={exact} render={(props) => (
              <Component {...props} {...rest} />
            )} />
          ))}
          <Route render={(props) => <NoMatch {...props} /> } />
        </Switch>
      </div>
    )
  }
}



export default App
//export default connect(null, { logout }) (App);