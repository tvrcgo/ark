import {
  Icon
} from 'antd'

import './index.less'

class ExpandPanel extends React.Component {

  state = {
    expand: false,
    left: 0
  }

  open(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    this.setState({
      expand: true,
      left: rect.left
    })
  }

  close() {
    this.setState({
      expand: false
    })
  }

  render() {
    const { title, children } = this.props;
    const { expand, left, right } = this.state;
    const styles = {
      display: expand ? 'block' : 'none',
      left: this.props.left !== undefined ? this.props.left : left,
      width: this.props.width || '300px'
    }
    return (
      <span
        onMouseOver={this.open.bind(this)}
        onMouseOut={this.close.bind(this)}
        className='item'
      >
        {title} <Icon type={ expand ? 'up' : 'down' } style={{ fontSize: 8 }} />
        <div
          className='item-expand'
          style={styles}
        >{children}</div>
      </span>
    )
  }
}

export default ExpandPanel
