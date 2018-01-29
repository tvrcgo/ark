
import App from './lib/app'
import router from './plugin/router'
import theme from './plugin/theme'

const app = new App()

app.use(router)
app.use(theme)

export default app
