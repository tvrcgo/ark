
const checkUpdate = (sigHash) => {
  if(module.hot.status() === "idle") {
    module.hot.check(true).then(function(updatedModules) {
      if(!updatedModules) {
        window.location.reload()
        return
      }
      console.log('[HMR] Apply module updates:')
      updatedModules.map(mod => {
        console.log(`[HMR] -> ${mod}`)
      })
    }).catch(function(err) {
      const status = module.hot.status()
      if(["abort", "fail"].indexOf(status) >= 0) {
        console.warn("[HMR] Cannot apply update.")
        console.warn(`[HMR] ${err.stack || err.message}`)
        window.location.reload()
      } else {
        console.warn(`[HMR] Update failed: ${err.stack || err.message}`)
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

  if (module.hot && window && window.EventSource) {
    const es = new EventSource('http://localhost:32651')
    es.onopen = function(e) {
      console.log('[HMR] Waiting for signal ...')
    }
    es.onmessage = function(e) {
      const msg = e.data
      if (/^done#\w+$/.test(msg)) {
        const hash = msg.substr(5)
        console.log(`[HMR] Signal -> hot-update #${hash}`)
        checkUpdate(hash)
      }
    }
  }
} catch (err) {
  console.error('[cli/hot]', err)
}
