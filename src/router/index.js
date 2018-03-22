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
const Records = () => import('./Records')

Vue.use(Router)

// 菜单列表顺序
const menuOrder = {
  pm: 1,
  records: 2,
  dynamic: 3,
  users: 4
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: { title: '登录', layout: 'blank' }
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin,
      meta: { title: '注册', layout: 'blank' }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { title: '登录', layout: 'blank' }
    },
    {
      path: '/userdetails',
      name: 'User',
      component: User,
      meta: {
        title: '用户详情',
        breadcrumb: [
          {path: '/userdetails', title: '用户详情'}
        ]
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
        ]
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
        ]
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
        ]
      }
    },
    {
      path: '/dynamic',
      name: 'Dynamic',
      component: Dynamic,
      meta: {
        menu: menuOrder.dynamic,
        type: 'social-designernews-outline',
        title: '新闻动态',
        breadcrumb: [
          {path: '/dynamic', title: '新闻动态'}
        ]
      }
    },
    {
      path: '/newdynamic',
      name: 'NewDynamic',
      component: NewDynamic,
      meta: {
        title: '添加新闻',
        breadcrumb: [
          {path: '/dynamic', title: '新闻动态'},
          {path: '/newdynamic', title: '添加新闻'}
        ]
      }
    },
    {
      path: '/records',
      name: 'Records',
      component: Records,
      meta: {
        menu: menuOrder.records,
        type: 'clipboard',
        title: '投资记录',
        breadcrumb: [
          {path: '/Records', title: '投资记录'}
        ]
      }
    }
  ]
})
