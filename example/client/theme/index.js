
import './index.less'

export default ({ app, children }) => {
  return (
    <div className='app'>
      <div className='app-header'>header</div>
      <h3>hello app</h3>
      <div>{children}</div>
    </div>
  )
}
