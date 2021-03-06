const { resolve } = require('path')

exports.options = {
  desc: 'run coverage test.'
}

exports.run = function* (argv, cmd) {
  const nyc = require.resolve('nyc/bin/nyc.js')
  const cli = resolve(__dirname, '../bin/cli.js')
  const args = [
    '--temp-directory', './node_modules/.nyc_output',
    '--report-dir', 'cov',
    cli,
    'test'
  ].concat(argv._)
  const opt = {
    env: {
      NODE_ENV: 'test',
      FORCE_COLOR: true
    }
  }
  yield cmd.fork(nyc, args, opt)
}
