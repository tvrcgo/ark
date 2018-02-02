import React from 'react'
import PT from 'prop-types'
import {
  Icon
} from 'antd'

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
        className='app-header-item'
      >
        {title} <Icon type={ expand ? 'up' : 'down' } style={{ fontSize: 8 }} />
        <div
          className='app-header-item-expand'
          style={styles}
        >{children}</div>
      </span>
    )
  }
}

ExpandPanel.propTypes = {
  title: PT.string,
  left: PT.number,
  width: PT.string,
  children: PT.any
}

export default ExpandPanel
