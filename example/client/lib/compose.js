
export default fns => {
  return async next => {
    for (const fn of fns) {
      await fn(() => {})
    }
    await next()
  }
}
