
const checkUpdate = () => {
  if(module.hot.status() === "idle") {
    module.hot.check(true).then(function(updatedModules) {
      if(!updatedModules) {
        window.location.reload()
        return
      }
      require("webpack/hot/log-apply-result")(updatedModules, updatedModules)
    }).catch(function(err) {
      const status = module.hot.status()
      if(["abort", "fail"].indexOf(status) >= 0) {
        console.warn("[HMR] Cannot apply update.")
        console.warn("[HMR] " + err.stack || err.message)
      } else {
        console.warn("[HMR] Update failed: " + err.stack || err.message)
      }
    })
  }
}

try {
  require('$root/app')

  if (module.hot) {
    module.hot.accept('$root/app', () => {
      require('$root/app')
    })
  }

  if (window && window.EventSource) {
    const es = new EventSource('http://localhost:32651')
    es.onopen = function(e) {
      console.log('[HMR] waiting for signal ...')
    }
    es.onmessage = function(e) {
      const [evt, hash] = e.data.split('#')
      switch (evt) {
        case 'done':
          console.log(`[HMR] signal -> ${e.data}`)
          checkUpdate()
          break
        default:
          break
      }
    }
  }
} catch (err) {
  console.error('[cli/hot]', err)
}
