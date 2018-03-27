import moment from 'moment'
const user = {
  state: {
    imageUrl: null,
    createNewsResult: null,
    alterNewsResult: null,
    news: {},
    newsDetails: {}
  },
  mutations: {
    setImageUrl (state, val) {
      state.imageUrl = val
    },
    setCreateNewsResult (state, val) {
      state.createNewsResult = val
    },
    setAlterNewsResult (state, val) {
      state.alterNewsResult = val
    },
    setNews (state, val) {
      state.news = val
    },
    setNewsDetails (state, val) {
      state.newsDetails = val
    }
  },
  actions: {
    /**
     * @method getImageUrl 上传图片
     * @param {file} img 图片file
     */
    async getImageUrl (ctx, params) {
      const res = await ctx.dispatch('post', {url: '/news/image', params})
      if (res) ctx.commit('news/setImageUrl', res)
      else ctx.commit('news/setImageUrl', false)
    },
    /**
     * @method createNews 新增新闻
     * @param {any} image string 缩略图
     * @param {any} type int 0-公司动态，1-平台数据
     * @param {any} title string 标题
     * @param {any} content string 内容
     */
    async createNews (ctx, params) {
      const res = await ctx.dispatch('post', {url: '/news', params})
      if (res === 'success') ctx.commit('news/setCreateNewsResult', true)
      else ctx.commit('news/setCreateNewsResult', false)
    },
    /**
     * @method alterNews 编辑新闻
     * @param {any} id string 新闻id
     * @param {any} image string 缩略图
     * @param {any} type int 0-公司动态，1-平台数据
     * @param {any} title string 标题
     * @param {any} content string 内容
     */
    async alterNews (ctx, params) {
      const res = await ctx.dispatch('put', {url: '/news', params})
      if (res === 'success') ctx.commit('news/setAlterNewsResult', true)
      else ctx.commit('news/setAlterNewsResult', false)
    },
    /**
     * @method fetchNews 获取新闻列条
     * @param {any} start string 新闻id
     * @param {any} limit string 缩略图
     * @returns {
        "count": 1,
        "list": [
          {
            "id": 1,
            "image": "1.png",
            "title": "测试1",
            "content": "测试1",
            "type": 1,
            "createTime": 1521988092000,
            "updateTime": 1521992147000
          }
        ]
      }
     */
    async fetchNews (ctx, params) {
      const res = await ctx.dispatch('get', {url: '/news', params})
      const data = {
        count: res.count,
        list: res.list && res.list.map(item => ({
          ...item,
          createTime: moment(item.createTime).format('YYYY-MM-DD HH:mm'),
          updateTime: moment(item.updateTime).format('YYYY-MM-DD HH:mm')
        }))
      }
      if (res) ctx.commit('news/setNews', data)
      else ctx.commit('news/setNews', false)
    },
    /**
     * @method fetchNewsDetails 获取新闻详情
     * @param {any} id string 新闻id
     * @returns {
        "id": 1,
        "image": "1.png",
        "title": "测试1",
        "content": "测试1",
        "type": 1,
        "createTime": 1521988092000,
        "updateTime": 1521992147000
      }
     */
    async fetchNewsDetails (ctx, params) {
      const res = await ctx.dispatch('get', {url: `/news/${params.id}`})
      const data = res && {
        ...res,
        createTime: moment(res.createTime).format('YYYY-MM-DD HH:mm'),
        updateTime: moment(res.updateTime).format('YYYY-MM-DD HH:mm')
      }
      if (res) ctx.commit('news/setNewsDetails', data)
      else ctx.commit('news/setNewsDetails', false)
    }
  }
}

export default user
