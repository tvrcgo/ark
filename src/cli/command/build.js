const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const LiveReloadPlugin = require('webpack-livereload-plugin')
const { resolve } = require('path')
const compiler = require('../lib/compiler')
const HotWatch = require('../lib/hotwatch')
const base = require('../config/webpack')

exports.options = {
  desc: 'build web app.'
}

exports.run = function* (argv, cmd) {
  const config = base(argv)

  if (argv.env === 'dev') {
    config.devtool = 'eval'
    // bundle file name
    config.output.filename = 'bundle/[name].js'
    // hot
    if (argv.hot) {
      // HMR
      config.entry.app = [
        resolve(__dirname, '../lib/hot')
      ]
      config.plugins.push(
        new HotWatch(),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
      )
      // use css-hot-loader
      config.module.rules
        .filter(rule => rule.test.test('.css'))
        .map(rule => {
          rule.use = ['css-hot-loader'].concat(rule.use)
        })
    } else {
      // Live reload
      config.plugins.push(
        new LiveReloadPlugin({
          appendScriptTag: true
        })
      )
    }
    // plugins
    config.plugins.push(
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'development'
      }),
      new ExtractTextPlugin(`style/[name].css`)
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
