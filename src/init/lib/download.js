const os = require('os')
const { resolve } = require('path')
const download = require('download-git-repo')
const ora = require('ora')
const nrd = require('nrd')
const fs = require('fs-extra')

exports.repo = function* (repository, dest, options = {}) {
  return new Promise((resolve, reject) => {
    const spin = ora(`Downloading ...`)
    spin.start()
    download(repository, dest, options, (err) => {
      if (err) {
        spin.fail(err.message)
        return reject(err)
      }
      spin.succeed(`Finished.`)
      console.log('\n', `Project Dir: ${dest}`, '\n')
      resolve()
    })
  })
}

exports.npm = function* (pkgName, dest) {
  const spin = ora(`Downloading ...`)
  spin.start()
  const tmpdir = os.tmpdir()
  nrd.download(pkgName, { dir: tmpdir }).then(() => {
    fs.copySync(tmpdir + '/package', dest)
    spin.succeed(`Finished.`)
    console.log('\n', `Project Dir: ${dest}`, '\n')
  })
}
