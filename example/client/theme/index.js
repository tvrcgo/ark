import {
  Icon,
  Row
} from 'antd'
import { Link } from 'react-router-dom'
import ExpandPanel from './ExpandPanel'
import Sider from './Sider'
import './index.less'

export default ({ app, children }) => {
  return (
    <div className='app'>
      <Row className='app-header'>
        <Link to={'/'} className='app-logo'>{app.config.title}</Link>
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
        {children}
      </div>
    </div>
  )
}
