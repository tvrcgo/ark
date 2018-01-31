
export default fns => {

  return async next => {
    for (let fn of fns) {
      await fn(() => {})
    }
    await next()
  }

}
