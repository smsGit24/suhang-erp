// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'

import store from './store'
import router from './router'

import Cookies from 'js-cookie'
import { Modal, Message, LoadingBar } from 'iview'
import './theme/index.less'

import App from './App'

Vue.prototype.$Modal = Modal
Vue.prototype.$message = Message
Vue.prototype.$message.config({
  top: 10,
  duration: 2
})

Vue.config.productionTip = false

Vue.use(Vuex)

router.beforeEach((to, from, next) => {
  LoadingBar.start()
  const token = Cookies.get('token')
  to.name === 'Login' ? next() : token ? next() : location.href = 'http://hyu4286290001.my3w.com/login'
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
