
const { resolve } = require('path')
const assets = require(resolve(__dirname, '../public/assets.json'))

module.exports = {
  * renderClient(vars = {}) {
    yield this.render('index.nj', Object.assign({
      assets,
    }, vars))
  }
}
