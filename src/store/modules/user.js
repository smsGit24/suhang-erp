import moment from 'moment'
const user = {
  state: {
    signInResult: null,
    logInResult: null,
    userList: null,
    user: null
  },
  mutations: {
    setSignIn (state, val) {
      state.signInResult = val
    },
    setLogIn (state, val) {
      state.logInResult = val
    },
    setUsers (state, val) {
      state.userList = val
    },
    setUserDetail (state, val) {
      state.user = val
    }
  },
  actions: {
    /**
     * @method signIn 注册接口
     * @param {any} name 用户名
     * @param {any} password 密码
     * @returns success=成功 nameIsExist=用户名已存在
     */
    async signIn (ctx, params) {
      const res = await ctx.dispatch('post', {url: '/manageUser', params})
      if (res === 'success') ctx.commit('user/setSignIn', true)
      else if (res === 'nameIsExist') ctx.commit('user/setSignIn', false)
    },
    /**
     * @method logIn 登录接口
     * @param {any} name 用户名
     * @param {any} password 密码
     * @return 4a6de814-a16f-400f-85b5-342398489383=token loginFail=登录失败
     */
    async logIn (ctx, params) {
      const res = await ctx.dispatch('post', {url: '/manageUser/login', params})
      if (res === 'loginFail') ctx.commit('user/setLogIn', false)
      else ctx.commit('user/setLogIn', res)
    },
    /**
     * @method getUsers 获取用户列表
     * @param {any} start 开始页数
     * @param {any} limit 页大小
     * @return []
     */
    async getUsers (ctx, params) {
      const res = await ctx.dispatch('get', {url: '/users', params})
      const data = (res || []).map(item => ({
        ...item,
        createOn: moment(item.create_time).format('YYYY-MM-DD HH:mm')
      }))
      if (res) ctx.commit('user/setUsers', data)
    },
    /**
     * @method getUserDetail 获取用户详情接口
     * @param {any} id 用户id
     * @return []
     */
    async getUserDetail (ctx, params) {
      const res = await ctx.dispatch('get', {url: '/users', params})
      if (res) ctx.commit('user/setUserDetail', res)
    }
  }
}

export default user
