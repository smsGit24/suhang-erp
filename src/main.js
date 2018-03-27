// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'

import store from './store'
import router from './router'
import axios from 'axios'

import Cookies from 'js-cookie'
import { Modal, Message, Notice, LoadingBar } from 'iview'

import './theme/index.less'

import App from './App'
Vue.prototype.$axios = axios
Vue.prototype.$Modal = Modal
Vue.prototype.$message = Message
Vue.prototype.$message.config({
  top: 10,
  duration: 2
})
Vue.prototype.$notice = Notice
Vue.prototype.$notice.config({
  top: 50,
  duration: 3
})

Vue.config.productionTip = false

Vue.use(Vuex)

router.beforeEach((to, from, next) => {
  LoadingBar.start()
  const token = Cookies.get('token')
  to.name === 'Login' || to.name === 'Signin' ? next() : token ? next() : location.href = '/login'
})

router.afterEach((to, from, next) => {
  LoadingBar.finish()
  window.scrollTo(0, 0)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
