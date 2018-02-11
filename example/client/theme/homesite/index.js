
import Header from './Header'
import Banner from './Banner'
import Content from './Content'
import './index.less'

export default ({ app, children }) => {
  return (
    <div className={'site'}>
      <Header app={app} />
      <Banner />
      <Content />
    </div>
  )
}
