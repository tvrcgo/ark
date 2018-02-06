const { resolve } = require('path')

exports.options = {
  desc: 'run test.'
}

exports.run = function* (argv, cmd) {
  const mocha = require.resolve('mocha/bin/_mocha')
  const args = [
    '--require',
    'intelli-espower-loader',
    '--require',
    'co-mocha',
  ].concat(argv._.slice(1))
  yield cmd.fork(mocha, args)
}
