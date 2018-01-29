
import { Link } from 'react-router-dom'
import './index.css'
import Hello from '$root/component/Hello'

export default (props) => {
  return (
    <div>
      home <Link to='/user'>user</Link>
      <Hello />
    </div>
  )
}
