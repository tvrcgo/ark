import Sider from './Sider'
import Header from './Header'
import Body from './Body'
import './index.less'

export default ({ app, children }) => {
  return (
    <div className='app'>
      <Header app={app}/>
      <Sider />
      <Body app={app}>{children}</Body>
    </div>
  )
}
