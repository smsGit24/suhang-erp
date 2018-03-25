import moment from 'moment'
const status = {
  '1': '未审核',
  '2': '已审核',
  '3': '还款中',
  '4': '已发布'
}
const records = {
  state: {
    records: {},
    todayRecords: {},
    funds: {},
    repay: null
  },
  mutations: {
    setRecords (state, val) {
      state.records = val
    },
    setTodayRecords (state, val) {
      state.todayRecords = val
    },
    setFund (state, val) {
      state.funds = val
    },
    setRepay (state, val) {
      state.repay = val
    }
  },
  actions: {
    /**
     * @method getRecords 获取投资记录列表接口
     * @param {any} uid 否 int 用户id
     * @param {any} productId 否 int 产品id
     * @param {any} mobile 否 String 手机号
     * @param {any} name 否 String 产品名称
     * @param {any} status 否 int 产品状态
     * @param {any} startTime 否 date 开始日期
     * @param {any} endTime 否 date 结束日期
     * @param {any} start 是 int 开始页数
     * @param {any} limit 是 int 页大小
     * @returns [{
         "uid": 5, //用户id
         "amount": 100, //投资金额
         "period": 180, //产品期限
         "create_time": 1518860523000, //投资时间
         "product_id": 3, //产品id
         "mobile": "18500519083", //手机号
         "name": "test1", //产品名称
         "status": 3 //产品状态
       }]
     */
    async getRecords (ctx, params) {
      const res = await ctx.dispatch('get', {url: `/records`, params})
      const data = {
        count: res.count,
        list: (res.list || []).map(item => ({
          ...item,
          createOn: moment(item.create_time).format('YYYY-MM-DD HH:mm'),
          statusLable: status[item.status]
        }))
      }
      if (res) ctx.commit('records/setRecords', data)
      else ctx.commit('records/setRecords', false)
    },
    /**
     * @method getTodayRecords 获取今日还款记录
     * @param {any} start 是 int 开始页数
     * @param {any} limit 是 int 页大小
     * @returns {
        "count": 1,
        "list": [
          {
            "amount": 100, //投资金额
            "repayTime": "2018-03-24", //还款时间
            "profile": 6.88, //利息
            "mobile": "185****9083",
            "id": 1,
            "investTime": "2018-02-17 17:42:03", //投资时间
            "status": "已还款"
          }
        ]
      }
     */
    async getTodayRecords (ctx, params) {
      const res = await ctx.dispatch('get', {url: `/records/today`, params})
      const data = res && {
        count: res.count,
        list: res.list
      }
      if (res) ctx.commit('records/setTodayRecords', data)
      else ctx.commit('records/setTodayRecords', false)
    },
    /**
     * @method getFund 获取资金流水
     * @param {any} status 否 int 状态 0-处理中，1-处理完成，2-处理失败
     * @param {any} type 否 int 类型 0-充值，1-提现
     * @param {any} startTime 否 String 开始时间
     * @param {any} endTime 否 String 结束时间
     * @param {any} start 是 int 开始页数
     * @param {any} limit 是 int 页大小
     * @returns {
        "count": 1,
        "list": [
          {
            "amount": 100, //投资金额
            "repayTime": "2018-03-24", //还款时间
            "profile": 6.88, //利息
            "mobile": "185****9083",
            "id": 1,
            "investTime": "2018-02-17 17:42:03", //投资时间
            "status": "已还款"
          }
        ]
      }
     */
    async getFund (ctx, params) {
      const res = await ctx.dispatch('get', {url: `/records/fund`, params})
      const data = res && {
        count: res.count,
        list: res.list
      }
      if (res) ctx.commit('records/setFund', data)
      else ctx.commit('records/setFund', false)
    },
    /**
     * @method repay 还款
     * @param {any} status 否 int 状态 0-处理中，1-处理完成，2-处理失败
     */
    async repay (ctx, params) {
      const res = await ctx.dispatch('put', {url: `/records/repay`})
      if (res === 'success') ctx.commit('records/setRepay', true)
      else ctx.commit('records/setRepay', false)
    }
  }
}

export default records
