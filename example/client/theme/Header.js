import {
  Row
} from 'antd'
import { Link } from 'react-router-dom'
import ExpandPanel from './ExpandPanel'

export default ({ app }) => {
  return (
    <Row className='app-header'>
      <div className='app-logo'>{app.config.title}</div>
      <ExpandPanel title={'Service'} width='100%' left={0}>
        to release ...
      </ExpandPanel>
      <ExpandPanel title={'Price'} width='100%' left={0}>
        not expensive.
      </ExpandPanel>
    </Row>
  )
}
