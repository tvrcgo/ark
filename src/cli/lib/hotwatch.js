const http = require('http')

module.exports = class HotWatch {

  constructor(options = {}) {
    let interval
    let lastSignal = null
    this.signal = null

    http.createServer((req, res) => {
      res.writeHead(200, {
        "Content-Type":"text/event-stream",
        "Cache-Control":"no-cache",
        "Connection":"keep-alive",
        "Access-Control-Allow-Origin": '*'
      })
      res.write(`retry: ${options.retry || 3000}\n`)

      interval = setInterval(() => {
        if (lastSignal != this.signal) {
          res.write(`data: ${this.signal}\n\n`)
          lastSignal = this.signal
        }
      }, 1000)

      req.connection.addListener("close", function () {
        clearInterval(interval)
      }, false)

    }).listen(32651)
    console.log('[HMR] Hotwatch start ...', '\n')
  }

  apply(compiler) {
    compiler.plugin('done', (stats) => {
      this.signal = `done#${stats.hash}`
    })
  }
}
