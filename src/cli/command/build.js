const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const LiveReloadPlugin = require('webpack-livereload-plugin')
const compiler = require('../lib/compiler')
const base = require('../config/spa')

module.exports = function* (argv, cmd) {

  const config = base(argv)

  if (argv.env === 'dev') {
    // bundle file name
    config.output.filename = 'bundle/[name].js'
    // plugins
    config.plugins.push(
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'development'
      }),
      new ExtractTextPlugin(`style/[name].css`),
      new LiveReloadPlugin({
        appendScriptTag: true
      })
    )
    // compile
    compiler(config).watch({
      poll: true
    })
  }

  if (argv.env === 'prod') {
    // bundle file name
    config.output.filename = 'bundle/[name].[hash:8].js'
    // plugins
    config.plugins.push(
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'production'
      }),
      new ExtractTextPlugin(`style/[name].[hash:8].css`),
      new webpack.optimize.UglifyJsPlugin({
        parallel: true,
        minimize: true,
        compress: {
          warnings: false,
        },
        output: {
          comments: false,
        },
      })
    )
    // compile
    compiler(config).run()
  }

}
