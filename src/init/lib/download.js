const os = require('os')
const { resolve } = require('path')
const download = require('download-git-repo')
const ora = require('ora')

exports.repo = function* (repository, dest, options = {}) {
  return new Promise((resolve, reject) => {
    const spin = ora(`Downloading ...`)
    spin.start()
    download(repository, dest, options, (err) => {
      if (err) {
        spin.fail(err.message)
        return reject(err)
      }
      spin.succeed('Download finished.')
      resolve()
    })
  })
}
