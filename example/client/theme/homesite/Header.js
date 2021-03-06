
import {
  Row
} from 'antd'
import { Link } from 'react-router-dom'

export default ({ app }) => {
  return (
    <Row className={'site-header'}>
      <div className={'wrap'}>
        <div className={'site-logo'}>
          <Link to='/'>BRAND</Link>
        </div>
        <div className={'site-nav'}>
          <Link to='/user' replace className={'site-nav-item'}>Feature</Link>
          <Link to='/' replace className={'site-nav-item'}>Price</Link>
          <Link to='/user' replace className={'site-nav-item'}>Concat</Link>
        </div>
      </div>
    </Row>
  )
}
