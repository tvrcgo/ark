
const { resolve } = require('path')

module.exports = {
  * renderApp(vars = {}) {
    const assets = require(resolve(__dirname, '../public/assets.json'))
    yield this.render('index.nj', Object.assign({
      assets,
    }, vars))
  }
}
