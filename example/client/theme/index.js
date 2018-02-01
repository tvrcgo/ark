import {
  Icon,
  Row
} from 'antd'
import ExpandPanel from './ExpandPanel'
import Sider from './Sider'
import './index.less'

export default ({ app, children }) => {
  return (
    <div className='app'>
      <Row className='app-header'>
        <a href="#" className='app-logo'>LOGO</a>
        <ExpandPanel title={'Service'} width='100%' left={0}>
          to release ...
        </ExpandPanel>
        <ExpandPanel title={'Price'} width='100%' left={0}>
          not expensive.
        </ExpandPanel>
      </Row>
      <div className='app-sider'>
        <Sider />
      </div>
      <div className='app-body'>
        <h3>Title</h3>
        {children}
      </div>
    </div>
  )
}
