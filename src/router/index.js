import Vue from 'vue'
import Router from 'vue-router'
const Signin = () => import('./Signin')
const Login = () => import('./Login')
const User = () => import('./User')
const Pm = () => import('./Pm')
const PmDetails = () => import('./PmDetails')
const Users = () => import('./Users')
const Dynamic = () => import('./Dynamic')
const NewDynamic = () => import('./NewDynamic')
const EditDynamic = () => import('./EditDynamic')
const DynamicDetails = () => import('./DynamicDetails')
const Records = () => import('./Records')
const Repayment = () => import('./Repayment')
const Fund = () => import('./Fund')
const App = () => import('./App')

Vue.use(Router)

// 菜单列表顺序
const menuOrder = {
  pm: 1,
  records: 2,
  repayment: 3,
  fund: 4,
  dynamic: 5,
  conf: 6,
  users: 7
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: {
        title: '登录',
        layout: 'blank',
        access: ['manager', 'user']
      }
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin,
      meta: {
        title: '注册',
        layout: 'blank',
        access: ['manager', 'user']
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: '登录',
        layout: 'blank',
        access: ['manager', 'user']
      }
    },
    {
      path: '/userdetails',
      name: 'User',
      component: User,
      meta: {
        title: '用户详情',
        breadcrumb: [
          {path: '/userdetails', title: '用户详情'}
        ],
        access: ['manager', 'user']
      }
    },
    {
      path: '/pm',
      name: 'Pm',
      component: Pm,
      meta: {
        menu: menuOrder.pm,
        type: 'ios-list-outline',
        title: '产品中心',
        breadcrumb: [
          {path: '/pm', title: '产品中心'}
        ],
        access: ['manager', 'user']
      }
    },
    {
      path: '/pmdetails',
      name: 'PmDetails',
      component: PmDetails,
      meta: {
        title: '产品详情',
        breadcrumb: [
          {path: '/pm', title: '产品中心'},
          {path: '/pmdetails', title: '产品详情'}
        ],
        access: ['manager', 'user']
      }
    },
    {
      path: '/users',
      name: 'Users',
      component: Users,
      meta: {
        menu: menuOrder.users,
        type: 'ribbon-b',
        title: '用户列表',
        breadcrumb: [
          {path: '/users', title: '用户列表'}
        ],
        access: ['manager']
      }
    },
    {
      path: '/dynamic',
      name: 'Dynamic',
      component: Dynamic,
      meta: {
        menu: menuOrder.dynamic,
        type: 'social-designernews-outline',
        title: '动态列表',
        breadcrumb: [
          {path: '/dynamic', title: '动态列表'}
        ],
        access: ['manager']
      }
    },
    {
      path: '/newdynamic',
      name: 'NewDynamic',
      component: NewDynamic,
      meta: {
        title: '添加文章',
        breadcrumb: [
          {path: '/dynamic', title: '动态列表'},
          {path: '/newdynamic', title: '添加文章'}
        ],
        access: ['manager']
      }
    },
    {
      path: '/editdynamic',
      name: 'EditDynamic',
      component: EditDynamic,
      meta: {
        title: '编辑文章',
        breadcrumb: [
          {path: '/dynamic', title: '动态列表'},
          {path: '/editdynamic', title: '编辑文章'}
        ],
        access: ['manager']
      }
    },
    {
      path: '/dynamicdetails',
      name: 'DynamicDetails',
      component: DynamicDetails,
      meta: {
        title: '文章详情',
        breadcrumb: [
          {path: '/dynamic', title: '动态列表'},
          {path: '/dynamicdetails', title: '文章详情'}
        ],
        access: ['manager']
      }
    },
    {
      path: '/records',
      name: 'Records',
      component: Records,
      meta: {
        menu: menuOrder.records,
        type: 'ios-recording-outline',
        title: '投资记录',
        breadcrumb: [
          {path: '/records', title: '投资记录'}
        ],
        access: ['manager', 'user']
      }
    },
    {
      path: '/repayment',
      name: 'Repayment',
      component: Repayment,
      meta: {
        menu: menuOrder.repayment,
        type: 'clipboard',
        title: '还款记录',
        breadcrumb: [
          {path: '/repayment', title: '还款记录'}
        ],
        access: ['manager', 'user']
      }
    },
    {
      path: '/fund',
      name: 'Fund',
      component: Fund,
      meta: {
        menu: menuOrder.fund,
        type: 'ios-book-outline',
        title: '资金流水',
        breadcrumb: [
          {path: '/fund', title: '资金流水'}
        ],
        access: ['manager', 'user']
      }
    },
    {
      path: '/conf',
      name: 'App',
      component: App,
      meta: {
        menu: menuOrder.conf,
        type: 'ios-gear-outline',
        title: 'App配置',
        breadcrumb: [
          {path: '/conf', title: 'App配置'}
        ],
        access: ['manager']
      }
    }
  ]
})
