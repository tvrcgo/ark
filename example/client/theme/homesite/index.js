
import Header from './Header'
import Banner from './Banner'
import './index.less'

export default ({ app, children }) => {
  return (
    <div className={'site'}>
      <Header app={app} />
      <Banner />
      <div className={'site-content'}>
        <div className={'wrap'}>{children}</div>
      </div>
    </div>
  )
}
