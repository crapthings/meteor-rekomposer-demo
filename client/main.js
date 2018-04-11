import Page1 from './page1'
import Page2 from './page2'
import Page3 from './page3'
import Page4 from './page4'

const Layout = ({ children }) => <div>
  <div><a href='/'>home</a></div>
  <div><a href='/page2'>page2</a></div>
  <div><a href='/page3'>page3</a></div>
  <div><a href='/page4'>page4</a></div>
  {children()}
</div>

FlowRouter.route('/', {
  action() {
    mount(Layout, {
      children: () => <Page1 />
    })
  }
})

FlowRouter.route('/page2', {
  action() {
    mount(Layout, {
      children: () => <Page2 />
    })
  }
})

FlowRouter.route('/page3', {
  action() {
    mount(Layout, {
      children: () => <Page3 />
    })
  }
})

FlowRouter.route('/page4', {
  action() {
    mount(Layout, {
      children: () => <Page4 />
    })
  }
})
