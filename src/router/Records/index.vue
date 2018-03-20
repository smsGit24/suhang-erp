<template>
  <div class="pm">
    <Row :gutter="16" class="header">
      <iCol :span="24" style="padding: 15px 20px;">
        <Button type="dashed" shape="circle" :loading="false" icon="ios-search" @click="() => showFilters = !showFilters">筛选</Button>
        <transition name="filters">
          <div v-if="showFilters" class="shadow">
            <Input v-model="filters.id" placeholder="请输入用户ID" style="width: 120px" @on-keypress="searchRecords"/>
            <Input v-model="filters.name" placeholder="请输入产品名称" style="width: 120px" @on-keypress="searchRecords"/>
            <Input v-model="filters.productId" placeholder="请输入产品ID" style="width: 120px" @on-keypress="searchRecords"/>
            <Input v-model="filters.mobile" placeholder="请输入手机号" style="width: 120px" @on-keypress="searchRecords"/>
            <Input v-model="filters.period" placeholder="请输入产品期限" style="width: 120px" @on-keypress="searchRecords"/>
            <DatePicker v-model="filters.times" type="datetimerange" format="yyyy-MM-dd" placement="bottom-end" placeholder="选择时间范围" style="width: 320px" @on-change="fetchRecords"/>
          </div>
        </transition>
      </iCol>
    </Row>
    <Row :gutter="16" class="container">
      <iCol :span="24">
        <Table :loading="loading" :columns="columns" :data="records.list" no-data-text="暂时无产品！"/>
      </iCol>
    </Row>
    <Row :gutter="16">
      <iCol :span="24" style="text-align: center; padding: 15px 0;">
        <Page :total="records.count" show-elevator show-sizer show-total @on-change="pageChange" @on-page-size-change="sizeChange"></Page>
      </iCol>
    </Row>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import {mapState} from 'vuex'
import {Row, Col, Table, Button, Input, Select, Option, DatePicker, Page} from 'iview'
import opts from './colums'
export default {
  components: {'iCol': Col, Row, Table, Button, Input, Select, Option, DatePicker, Page},
  data () {
    return {
      showFilters: false,
      filters: {
        id: null,
        productId: null,
        mobile: null,
        name: null,
        status: undefined,
        times: [],
        period: null,
        rate: null
      },
      columns: opts({
        filterRemote: this.filterRemote
      }),
      loading: true,
      start: 1,
      limit: 10,
    }
  },
  computed: {
    ...mapState({
      records: state => state.products.records,
    })
  },
  methods: {
    async searchRecords (ev) {
      if (ev.key === 'Enter') await this.fetchRecords()
    },
    async fetchRecords () {
      const {filters, start, limit} = this
      const {id, productId, mobile, name, status, times} = filters
      const res = {
        uid: id ? isNaN(Number(id)) ? null : Number(id) : null, // 否 int 用户id
        productId: productId ? isNaN(Number(productId)) ? null : Number(productId) : null, // 否 int 产品id
        mobile, // 否 String 手机号
        name, // 否 String 产品名称
        status: status ? isNaN(Number(status)) ? null : Number(status) : null, // 否 int 产品状态
        startTime: times[0], // 否 date 开始日期
        endTime: times[1], // 否 date 结束日期
        start, // 是 int 开始页数
        limit, // 是 int 页大小
      }
      console.log(res)
      await this.$store.dispatch('products/getRecords', res)
      console.log(this.records)
      this.loading = false
    },
    async filterRemote (val, type) {
      this.filters[type] = val
      await this.fetchRecords()
    },
    async pageChange (start) {
      this.start = start
      await this.fetchRecords()
    },
    async sizeChange (limit) {
      this.limit = limit
      await this.fetchRecords()
    }
  },
  async created () {
    await this.fetchRecords()
  }
}
</script>

<style lang="less" scoped>
.pm {
  // display: flex;
  // flex-direction: column;
  position: relative;
  // .container {
  //   flex: 1
  // }
  .shadow {
    display: inline-block;
    padding: 0 20px;
    border-radius: 10px;
  }
  .filters-enter-active {
    animation: filters-in .5s;
  }
  .filters-leave-active {
    animation: filters-in .5s reverse;
  }
  @keyframes filters-in {
    0% {
      transform: scaleX(0);
      transform-origin: 0 0;
    }
    100% {
      transform: scaleX(1);
      transform-origin: 0 0;
    }
  }
}
</style>
