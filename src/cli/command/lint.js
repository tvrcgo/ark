const { resolve } = require('path')

exports.options = {
  desc: 'eslint'
}

exports.run = function* (argv, cmd) {
  const eslint = require.resolve('eslint/bin/eslint.js')
  const args = [
    '--config',
    resolve(__dirname, '../config/eslint.json')
  ].concat(argv._.slice(1))
  yield cmd.fork(eslint, args)
}
