<template>
  <div class="pm-details">
    <div class="item">
      <span class="itemLabel">产品ID: </span>
      <span class="itemValue">{{ productDetails.id }}</span>
    </div>
    <div class="item">
      <span class="itemLabel">产品代码: </span>
      <span class="itemValue">{{ productDetails.code }}</span>
    </div>
    <div class="item small">
      <span class="itemLabel">产品名称: </span>
      <span class="itemValue">{{ productDetails.name }}</span>
    </div>
    <div class="item">
      <span class="itemLabel">产品状态: </span>
      <span class="itemValue">《{{ productDetails.status }}》</span>
    </div>
    <div class="item small">
      <span class="itemLabel">最小投资金额: </span>
      <span class="itemValue">{{ productDetails.minAmount }}</span>
    </div>
    <div class="item">
      <span class="itemLabel">最大投资金额: </span>
      <span class="itemValue">{{ productDetails.maxAmount }}</span>
    </div>
    <div class="item">
      <span class="itemLabel">产品金额: </span>
      <span class="itemValue">{{ productDetails.amount }}</span>
    </div>
    <div class="item">
      <span class="itemLabel">已投资金额: </span>
      <span class="itemValue">{{ productDetails.investAmount }}</span>
    </div>
    <div class="item">
      <span class="itemLabel">产品期权: </span>
      <span class="itemValue">{{ productDetails.period }}</span>
    </div>
    <div class="item">
      <span class="itemLabel">产品利率: </span>
      <span class="itemValue">{{ productDetails.rate }}</span>
    </div>
    <div class="item">
      <span class="itemLabel">产品描述: </span>
      <span class="itemValue">{{ productDetails.description }}</span>
    </div>
    <div class="item">
      <span class="itemLabel">借款用途: </span>
      <span class="itemValue">{{ productDetails.loanUse }}</span>
    </div>
    <div class="item">
      <span class="itemLabel">还款来源: </span>
      <span class="itemValue">{{ productDetails.repaymentSource }}</span>
    </div>
    <div class="item">
      <span class="itemLabel">项目风险: </span>
      <span class="itemValue">{{ productDetails.riskPicture }}</span>
    </div>
    <div class="item">
      <span class="itemLabel">开始时间: </span>
      <span class="itemValue">{{ productDetails.beginTime }}</span>
    </div>
    <div class="item">
      <span class="itemLabel">结束时间: </span>
      <span class="itemValue">{{ productDetails.endTime }}</span>
    </div>
    <div class="item">
      <span class="itemLabel">起息时间: </span>
      <span class="itemValue">{{ productDetails.profileTime }}</span>
    </div>
    <div class="item">
      <span class="itemLabel">创建时间: </span>
      <span class="itemValue">{{ productDetails.createTime }}</span>
    </div>
    <div class="item">
      <span class="itemLabel">更新时间: </span>
      <span class="itemValue">{{ productDetails.updateTime }}</span>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState({
      productDetails: state => state.products.productDetails || {}
    })
  },
  async mounted () {
    await this.fetchDetails()
  },
  methods: {
    async fetchDetails () {
      const {id} = this.$route.query
      await this.$store.dispatch('products/productDetails', { id })
    }
  }
}
</script>

<style lang="less" scoped>
.pm-details {
  padding: 20px;
  .item {
    display: inline-block;
    width: calc(100% / 2 - 2px);
    margin-bottom: 20px;
    .itemLabel {
      display: inline-block;
      text-align: right;
      width: 20%;
      margin-right: 20px;
    }
  }
}
</style>
