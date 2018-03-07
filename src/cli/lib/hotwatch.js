const http = require('http')

let signal = '', lastSignal = signal

function HotWatch(options = {}) {

  http.createServer((req, res) => {
    res.writeHead(200, {
      "Content-Type":"text/event-stream",
      "Cache-Control":"no-cache",
      "Connection":"keep-alive",
      "Access-Control-Allow-Origin": '*'
    })
    res.write("retry: 2000\n")

    interval = setInterval(() => {
      if (lastSignal != signal) {
        res.write(`data: ${signal}\n\n`)
        lastSignal = signal
      }
    }, options.poll || 1000)

    req.connection.addListener("close", function () {
      clearInterval(interval)
    }, false)

  }).listen(options.port || 32651)
  console.log('[HMR] Hotwatch start ...', '\n')
}

HotWatch.prototype.apply = function(compiler) {
  // done
  compiler.plugin('done', (stats) => {
    signal = `done#${stats.hash}`
  })
}

module.exports = HotWatch
