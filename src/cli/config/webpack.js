const webpack = require('webpack')
const AssetsPlugin = require('assets-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extend = require('extend2')
const { join } = require('path')

// fix loaderUtils.parseQuery() warning. Remove GTD.
process.noDeprecation = true

module.exports = (argv) => {
  const cwd = process.cwd()
  const root = join(cwd, argv.baseDir || 'client')
  const dist = join(cwd, argv.distDir || 'server/app/public')
  const pkg = require(join(root, 'package.json'))
  const appConfig = require(join(root, 'config/config.build.js'))
  // base config
  const config = {
    entry: {
      app: join(root, 'app')
    },
    output: {
      filename: 'bundle/[name].js',
      path: dist,
      publicPath: appConfig.cdn || '/public/'
    },
    resolve: {
      extensions: [ '.ts', '.tsx', '.js', '.jsx', '.json' ],
      modules: [
        join(root, 'node_modules'),
        join(__dirname, '../node_modules')
      ],
      alias: extend(true, {
        '$root': root
      }, appConfig.alias)
    },
    resolveLoader: {
      modules: [
        join(root, 'node_modules'),
        join(__dirname, '../node_modules')
      ]
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                'env',
                'stage-0',
                'react'
              ],
              plugins: [
                ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": true }],
                'transform-decorators-legacy',
                'transform-runtime'
              ],
              filename: join(__dirname, '../package.json')
            }
          },
          exclude: [ /node_modules/ ]
        },
        {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader',
          exclude: [ /node_modules/ ],
          options: {
            useBabel: true,
            babelOptions: {
              babelrc: false,
              presets: [
                'env',
                "stage-0",
                "react"
              ],
              plugins: [
                'transform-decorators-legacy',
                'transform-runtime'
              ],
              filename: join(__dirname, '../package.json')
            },
            useCache: false,
            emitRequireType: false,
            target: "es6",
            moduleResolution: "node",
            jsx : "react",
            experimentalDecorators: true,
            strictNullChecks: true,
            allowSyntheticDefaultImports: true,
            noImplicitAny: false,
            removeComments: true,
            sourceMap: false,
            allowJs: true,
            typeRoots: [
              join(__dirname, '../node_modules/@types'),
              join(root, 'node_modules/@types'),
              join(root, 'typings')
            ]
          }
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:8]&camelCase",
              {
                loader: "postcss-loader",
                options: {
                  plugins: () => [
                    require('autoprefixer')
                  ]
                }
              }
            ]
          })
        },
        {
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              "css-loader",
              {
                loader: "less-loader",
                options: {
                  modifyVars: appConfig.theme || {}
                }
              }
            ]
          })
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          exclude: /node_modules/,
          loader: "url-loader",
          options: {
            limit: 2048,
            name: "image/[hash:12].[ext]"
          }
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin(extend(true, {

      }, appConfig.define)),
      new webpack.ProvidePlugin({
        "React": "react",
      }),
      new webpack.LoaderOptionsPlugin({
        test: /\.css$/,
        options: {
          context: root,
          postcss: [
            require('postcss-nested')
          ]
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: ({ resource }) => (
          resource &&
          /node_modules/.test(resource) &&
          /\.js$/.test(resource)
        )
      }),
      new AssetsPlugin({
        fullPath: true,
        path: dist,
        filename: 'assets.json',
      })
    ].concat(appConfig.plugins || [])
  }

  return config

}
