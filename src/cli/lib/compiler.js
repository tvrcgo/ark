
const webpack = require('webpack')
const chalk = require('chalk')
const ora = require('ora')

const handler = (err, stats) => {
  const json = stats.toJson()
  if (err || stats.hasErrors()) {
    return json.errors.map(e => {
      console.error(e)
    })
  }
  if (stats.hasWarnings()) {
    return json.warnings.map(warn => {
      console.warn(warn)
    })
  }
  console.log('\n', stats.toString({
    chunks: false,
    colors: true,
    modules: false
  }), '\n')
}

module.exports = (config) => {

  const spin = ora()

  config.plugins.push(new webpack.ProgressPlugin((percent, msg) => {
    const perc = chalk.green(`${(percent*100).toFixed(1)}%`)
    spin.text = `${perc} ${msg} ...`
  }))

  const compiler = webpack(config)

  compiler.plugin("compile", (params) => {
    spin.text = 'Building start.'
    spin.start()
  })

  compiler.plugin('done', (stats) => {
    spin.succeed('Building finished.')
    spin.stop()
  })

  return {
    run() {
      return compiler.run(handler)
    },

    watch(opts) {
      return compiler.watch(opts, handler)
    }
  }

}
