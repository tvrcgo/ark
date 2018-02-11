
import {
  Row
} from 'antd'
import { Link } from 'react-router-dom'

export default ({ app }) => {

  return (
    <Row className={'site-header'}>
      <div className={'wrap'}>
        <div className={'site-logo'}>
          <a>BRAND</a>
        </div>
        <div className={'site-nav'}>
          <Link to='/' className={'site-nav-item'}>Feature</Link>
          <Link to='/user' className={'site-nav-item'}>Price</Link>
          <Link to='/' className={'site-nav-item'}>Concat</Link>
        </div>
      </div>
    </Row>
  )
}
