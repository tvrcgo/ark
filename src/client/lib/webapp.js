import React from 'react'
import { render } from 'react-dom'
import {
  HashRouter,
  Switch,
  Route
} from 'react-router-dom'
import App from './app'
import routes from '$root/router'
import extend from 'extend2'

class WebApplication extends App {
  constructor(ctx) {
    super(ctx)
    // app routes
    this.$routes = (
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
    // default pure layout
    this.$layout = (<div>{this.$routes}</div>)
    // load config.
    this.config = this.loadConfig()
  }

  loadConfig() {
    const base = require('$root/config/config.default')
    this.$config = extend(true, {}, base)
    return this.$config
  }

  // custom theme
  theme(ThemeComponent) {
    this.$layout = (
      <ThemeComponent app={this}>{this.$routes}</ThemeComponent>
    )
  }

  // render app
  start(selector = '#root') {
    this.run().then(() => {
      render(<HashRouter>{this.$layout}</HashRouter>, document.querySelector(selector))
    }).catch(err => {
      render(<div>repairing ...</div>, document.querySelector(selector))
      console.error('[ark] app.start() ->', err)
    })
  }

}

// Avoid prototype members being modified by plugin.
(Object.freeze || Object)(WebApplication.prototype)

export default WebApplication
