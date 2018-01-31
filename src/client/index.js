
import App from './lib/app'
import router from './mw/router'
import theme from './mw/theme'

const app = new App()

app.use(router, true)
app.use(theme, true)

export default app
