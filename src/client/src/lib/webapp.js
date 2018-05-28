import React from 'react'
import { render } from 'react-dom'
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import App from './app'
import routes from '$root/router'
import * as extend from 'extend2'

class WebApplication extends App {
  constructor(ctx) {
    super(ctx)
    // app routes
    this.router(routes)
    // default pure layout
    this.$layout = (<div>{this.$routes}</div>)
    // load config.
    this.loadConfig()
  }

  loadConfig() {
    const base = require('$root/config/config.default')
    const postfix = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
    const env = require(`$root/config/config.${postfix}`)
    this.$config = extend(true, {}, base, env)
    this.config = this.$config
  }

  // set routes
  router(routes) {
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
  }

  // custom theme
  theme(ThemeComponent) {
    this.$layout = (
      <ThemeComponent app={this}>{this.$routes}</ThemeComponent>
    )
  }

  // render app
  async start(selector = '#root') {
    try {
      await this.run()
      render(<Router>{this.$layout}</Router>, document.querySelector(selector))
    } catch (err) {
      console.error('app.start() ->', err)
    }
  }

}

// Avoid prototype members being modified by plugin.
(Object.freeze || Object)(WebApplication.prototype)

export default WebApplication
