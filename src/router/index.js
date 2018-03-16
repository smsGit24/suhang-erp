import Vue from 'vue'
import Router from 'vue-router'
const Signin = () => import('./Signin')
const Login = () => import('./Login')
const User = () => import('./User')
const Pm = () => import('./Pm')
const PmDetails = () => import('./PmDetails')
const Access = () => import('./Access')
const Dynamic = () => import('./Dynamic')
const NewDynamic = () => import('./NewDynamic')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
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
      path: '/user',
      name: 'User',
      component: User,
      meta: {
        menu: 1,
        type: 'person',
        title: '个人中心',
        breadcrumb: [
          {path: '/user', title: '个人中心'}
        ]
      }
    },
    {
      path: '/pm',
      name: 'Pm',
      component: Pm,
      meta: {
        menu: 2,
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
      path: '/access',
      name: 'Access',
      component: Access,
      meta: {
        menu: 3,
        type: 'ribbon-b',
        title: '权限管理',
        breadcrumb: [
          {path: '/access', title: '权限管理'}
        ]
      }
    },
    {
      path: '/dynamic',
      name: 'Dynamic',
      component: Dynamic,
      meta: {
        menu: 4,
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
    }
  ]
})
