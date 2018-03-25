import moment from 'moment'
const types = {
  '1': '默认产品'
}
const status = {
  '1': '未审核',
  '2': '已审核',
  '3': '还款中',
  '4': '已发布'
}
const products = {
  state: {
    createProducts: null,
    products: {},
    delProducts: null,
    productDetails: null,
    auditProducts: null
  },
  mutations: {
    setCreateProducts (state, val) {
      state.createProducts = val
    },
    setProducts (state, val) {
      state.products = val
    },
    setDelProducts (state, val) {
      state.delProducts = val
    },
    setProductDetails (state, val) {
      state.productDetails = val
    },
    setAuditProducts (state, val) {
      state.auditProducts = val
    }
  },
  actions: {
    /**
     * @method createProducts 新增产品接口
     * @param {any} code 是 int 产品代码
     * @param {any} name 是 string 产品名称
     * @param {any} minAmount 是 int 最小投资金额
     * @param {any} maxAmount 是 int 最大投资金额
     * @param {any} amount 是 int 产品金额
     * @param {any} period 是 int 产品期限，单位：天
     * @param {any} rate 是 double 产品利率,如9.8
     * @param {any} description 是 String 产品描述
     * @param {any} loanUse 是 String 借款用途
     * @param {any} repaymentSource 是 String 还款来源
     * @param {any} riskPicture 是 String 项目风险图片，如1.png,2.png.逗号分隔
     * @returns success //添加成功 addProductFail //添加失败
     */
    async createProducts (ctx, params) {
      const res = await ctx.dispatch('post', {url: '/products', params})
      if (res === 'success') ctx.commit('products/setCreateProducts', true)
      else if (res === 'addProductFail') ctx.commit('products/setCreateProducts', false)
    },
    /**
     * @method getProducts 产品列表接口
     * @param {any} code 是 int 产品代码
     * @param {any} type 否 int 产品类型
     * @param {any} status 否 int 产品状态
     * @param {any} period 否 int 产品期限
     * @param {any} rate 否 double 产品利率
     * @param {any} beginTime 否 date 开始时间
     * @param {any} endTime 否 date 结束时间
     * @param {any} start 是 int 开始页数
     * @param {any} limit 是 int 页大小
     * @returns []
     */
    async getProducts (ctx, params) {
      const res = await ctx.dispatch('get', {url: '/products', params})
      const data = {
        count: res.count,
        list: (res.list || []).map(item => ({
          ...item,
          beginTime: item.beginTime ? moment(item.beginTime).format('YYYY-MM-DD HH:mm') : '',
          endTime: item.endTime ? moment(item.endTime).format('YYYY-MM-DD HH:mm') : '',
          createTime: item.createTime ? moment(item.createTime).format('YYYY-MM-DD HH:mm') : '',
          profileTime: item.profileTime ? moment(item.profileTime).format('YYYY-MM-DD HH:mm') : '',
          updateTime: item.updateTime ? moment(item.updateTime).format('YYYY-MM-DD HH:mm') : '',
          typeLable: types[item.type],
          statusLable: status[item.status]
        }))
      }
      ctx.commit('products/setProducts', data)
    },
    /**
     * @method delProducts 删除产品接口
     * @param {any} id 是 int 产品id
     * @returns success 删除成功
     */
    async delProducts (ctx, params) {
      const res = await ctx.dispatch('del', {url: `/products/${params.id}`})
      if (res === 'success') ctx.commit('products/setDelProducts', true)
      else ctx.commit('products/setDelProducts', false)
    },
    /**
     * @method productDetails 产品详情接口
     * @param {any} id 是 int 产品id
     * @returns {
         "id": 6, //产品ID
         "code": 123456, //产品代码
         "name": "插入产品", //产品名称
         "type": 1, //产品类型（暂时无用）
         "status": 1, //产品状态（1-未审核，2-已审核，3-还款中，4-已还款）
         "minAmount": 500, // 最小投资金额
         "maxAmount": 10000, //最大投资金额
         "amount": 500000, //产品金额
         "investAmount": 0, //已投资金额
         "period": 180, //产品期权
         "rate": 0.098, //产品利率
         "description": "测试", //产品描述
         "loanUid": 0, //暂时无用
         "loanCompany": 0, //暂时无用
         "loanUse": "梭哈", //借款用途
         "repaymentSource": "跳楼", //还款来源
         "riskPicture": "1.png", //项目风险
         "beginTime": 1520654734000, //开始时间
         "endTime": null, //结束时间
         "profileTime": null, //起息时间
         "createTime": 1520654734000, //创建时间
         "updateTime": 1520654734000 //更新时间
       }
     */
    async productDetails (ctx, params) {
      const res = await ctx.dispatch('get', {url: `/products/${params.id}`})
      const data = {
        ...res,
        beginTime: res.beginTime ? moment(res.beginTime).format('YYYY-MM-DD HH:mm') : '',
        endTime: res.endTime ? moment(res.endTime).format('YYYY-MM-DD HH:mm') : '',
        createTime: res.createTime ? moment(res.createTime).format('YYYY-MM-DD HH:mm') : '',
        profileTime: res.profileTime ? moment(res.profileTime).format('YYYY-MM-DD HH:mm') : '',
        updateTime: res.updateTime ? moment(res.updateTime).format('YYYY-MM-DD HH:mm') : '',
        typeLable: types[res.type],
        statusLable: status[res.status]
      }
      if (res) ctx.commit('products/setProductDetails', data)
    },
    /**
     * @method auditProducts 审核产品接口
     * @param {any} id 是 int 产品id
     * @returns success //审核通过
     */
    async auditProducts (ctx, params) {
      console.log(params)
      const res = await ctx.dispatch('put', {url: `/products/audit/${params.id}`})
      if (res === 'success') ctx.commit('products/setAuditProducts', true)
      else ctx.commit('products/setAuditProducts', false)
    }
  }
}

export default products
