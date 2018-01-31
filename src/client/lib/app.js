
class Application {

  constructor(config = {}) {
    Object.defineProperties(this, {
      $config: {
        value: config,
        enumerable: false,
        writable: true
      },
      $mw: {
        value: [],
        enumerable: false,
        writable: true
      }
    })
  }

  use(mw, immediate = false) {
    if (mw && typeof mw === 'function') {
      if (immediate) {
        mw.call(this, this)
      } else {
        this.$mw.push(mw)
      }
    }
  }

  async run(idx = 0) {
    if (idx < this.$mw.length) {
      try {
        await this.$mw[idx](this.run.bind(this, idx+1), this)
      } catch(err) {
        console.error(err)
      }
    }
  }

}

// Avoid application prototype members being modified by plugin.
(Object.freeze || Object)(Application.prototype)

export default Application
