
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
          <a className={'site-nav-item'}>Feature</a>
          <a className={'site-nav-item'}>Price</a>
          <a className={'site-nav-item'}>Contact</a>
        </div>
      </div>
    </Row>
  )
}
