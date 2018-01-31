

export default app => {

  // default pure layout
  app.$layout = (<div>{app.$routes}</div>)

  // custom theme
  app.theme = ThemeComponent => {
    app.$layout = (
      <ThemeComponent app={app}>{app.$routes}</ThemeComponent>
    )
  }
}
