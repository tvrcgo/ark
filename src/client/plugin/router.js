import React from 'react'
import { render } from 'react-dom'
import {
  HashRouter,
  Switch,
  Route
} from 'react-router-dom'
import routes from '$root/router'

export default (app) => {

  // app routes
  app.$routes = (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact
          component={require(`$root/page/${route.page}`).default}
        />
      ))}
    </Switch>
  )

  // render app
  app.run = (selector = '#root') => {
    render(<HashRouter>{app.$layout}</HashRouter>, document.querySelector(selector))
  }

}
