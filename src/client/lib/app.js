
class Application {

  constructor(config = {}) {
    Object.defineProperties(this, {
      $config: {
        value: config,
        enumerable: false,
        writable: true
      },
      $plugin: {
        value: [],
        enumerable: false,
        writable: true
      }
    })
  }

  use(plugin) {
    if (plugin && typeof plugin === 'function') {
      this.$plugin.push(plugin)
      plugin.call(this, this)
    }
  }

}

// Avoid application prototype members being modified by plugin.
(Object.freeze || Object)(Application.prototype)

export default Application
