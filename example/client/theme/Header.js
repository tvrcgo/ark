import {
  Row
} from 'antd'
import { Link } from 'react-router-dom'
import ExpandPanel from './ExpandPanel'

export default ({ app }) => {
  return (
    <Row className='app-header'>
      <Link to={'/'} className='app-logo'>{app.config.title}</Link>
      <ExpandPanel title={'Service'} width='100%' left={0}>
        to release ...
      </ExpandPanel>
      <ExpandPanel title={'Price'} width='100%' left={0}>
        not expensive.
      </ExpandPanel>
    </Row>
  )
}
