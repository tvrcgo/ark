import { Link } from 'react-router-dom'
import {
  Menu
} from 'antd'
const SubMenu = Menu.SubMenu

const menus = [
  {
    name: 'home',
    title: 'Home',
    path: '/'
  },
  {
    name: 'g_user',
    title: 'User',
    children: [
      {
        name: 'user',
        title: 'All',
        path: '/user'
      }
    ]
  }
]

const renderMenu = menus => {
  return menus && menus.length && menus.map(menu => {
    if (menu.children) {
      return (
        <SubMenu key={menu.name} title={menu.title}>
          {renderMenu(menu.children)}
        </SubMenu>
      )
    }
    return (
      <Menu.Item key={menu.name}>
        <Link to={menu.path} >{menu.title}</Link>
      </Menu.Item>
    )
  })
}

export default () => {
  const openMenu = menus
    .map(m => m.children ? m.children : m)
    .reduce((a, b) => [].concat(a, b))
    .find(m => m.path === location.hash.substr(1)) || { name: '' }
  const openGroup = menus
    .filter(m => m.children && m.children.some(sm => sm.path === location.hash.substr(1)))
    .map(m => m.name)
  return (
    <div className='app-sider' style={{ height: '100%' }}>
      <div className='app-sider-title'>Menu</div>
      <Menu
        mode={'inline'}
        theme={'light'}
        defaultSelectedKeys={[openMenu.name]}
        defaultOpenKeys={openGroup}
        className={'app-sider-tree'}
      >
        {renderMenu(menus)}
      </Menu>
    </div>
  )
}
