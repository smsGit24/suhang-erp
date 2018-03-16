<template>
  <div class="pm">
    <Row :gutter="16" class="header">
      <iCol :span="24" style="padding-bottom: 15px;">
        <Row :gutter="10" style="padding-bottom: 10px;">
          <iCol :span="3">
            <Select v-model="filters.type" placeholder="请选择产品类型" clearable style="width:100%">
              <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </iCol>
          <iCol :span="3">
            <Input v-model="filters.code" placeholder="请输入产品代码" number style="width: 100%"/>
          </iCol>
          <iCol :span="3">
            <Select v-model="filters.status" placeholder="请选择产品状态" clearable style="width:100%">
              <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </iCol>
          <iCol :span="3">
            <Input v-model="filters.rate" placeholder="请输入产品利率" number style="width: 100%"/>
          </iCol>
          <iCol :span="3">
            <Input v-model="filters.period" placeholder="请输入产品期限" number style="width: 100%"/>
          </iCol>
          <iCol :span="6">
            <DatePicker v-model="filters.times" type="datetimerange" placement="bottom-end" placeholder="选择时间范围" style="width:100%"></DatePicker>
          </iCol>
          <iCol :span="3">
            <Button type="primary" shape="circle" icon="ios-search" @click="searchProducts" style="width: 100%;">查询</Button>
          </iCol>
        </Row>
        <Row :gutter="16">
          <iCol :span="24">
            <Add style="width: 100px; display: inline-block; margin-right: 10px;" @get="fetchProducts"/>
          </iCol>
        </Row>
      </iCol>
    </Row>
    <Row :gutter="16" class="container">
      <iCol :span="24">
        <Table :loading="loading" :columns="columns" :data="products" :height="scroll" no-data-text="暂时无产品！"/>
      </iCol>
    </Row>
    <Row :gutter="16">
      <iCol :span="24" style="text-align: center; padding: 15px 0;">
        <Page :total="40" show-elevator show-sizer show-total @on-change="pageChange" @on-page-size-change="sizeChange"></Page>
      </iCol>
    </Row>
    <router-view></router-view>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {Row, Col, Table, Button, Input, Select, Option, DatePicker, Page} from 'iview'
import Add from './components/add.vue'
import opts from './colums'
export default {
  components: {'iCol': Col, Row, Table, Button, Input, Add, Select, Option, DatePicker, Page},
  data () {
    return {
      typeList: [
        {value: 1, label: '默认产品'}
      ],
      statusList: [
        {value: 1, label: '未审核'},
        {value: 2, label: '已审核'},
        {value: 3, label: '还款中'},
        {value: 4, label: '已发布'}
      ],
      filters: {
        code: null,
        type: 1,
        status: undefined,
        times: [],
        period: null,
        rate: null
      },
      columns: opts({
        actionRender: this.actionRender
      }),
      loading: true,
      start: 1,
      limit: 10,
      scroll: document.body.offsetHeight - 240
    }
  },
  computed: {
    ...mapState({
      products: state => state.products.products,
      delProducts: state => state.products.delProducts
    })
  },
  methods: {
    actionRender (h, params) {
      return h('div', [
        h(Button, {
          props: { type: 'primary', size: 'small' },
          style: { marginRight: '5px' },
          on: { click: () => this.showDetails(params.row.id) }
        }, '详情'),
        h(Button, {
          props: { type: 'warning', size: 'small' },
          style: { marginRight: '5px', display: params.row.status === 1 ? 'inline-block' : 'none' },
          on: { click: () => this.auditProducts(params.row.id) }
        }, '审核'),
        h(Button, {
          props: { type: 'error', size: 'small' },
          on: { click: () => this.deleteProducts(params.row.id) }
        }, '删除')
      ])
    },
    async searchProducts () {
      await this.fetchProducts()
    },
    async fetchProducts () {
      const {filters, start, limit} = this
      const {code, type, status, period, rate, times} = filters
      await this.$store.dispatch('products/getProducts', {
        code, // int 产品代码
        type, // int 产品类型
        status, // int 产品状态
        period, // int 产品期限
        rate, // double 产品利率
        start,
        limit,
        beginTime: times[0], // date 开始时间
        endTime: times[1] // date 结束时间
      })
      this.loading = false
    },
    async pageChange (start) {
      this.start = start
      await this.fetchProducts()
    },
    async sizeChange (limit) {
      this.limit = limit
      await this.fetchProducts()
    },
    async showDetails (id) {
      this.$router.push({path: '/pmdetails', query: { id }})
    },
    async auditProducts (id) {
      await this.$store.dispatch('products/auditProducts', { id })
    },
    async deleteProducts (id) {
      this.$Modal.confirm({
        title: '删除',
        content: '删除后,数据不可恢复,请确认!',
        onOk: async () => {
          await this.$store.dispatch('products/delProducts', { id })
          if (this.delProducts) {
            await this.fetchProducts()
            this.$message.success('删除成功!')
          } else this.$message.error('删除失败!')
        }
      })
    }
  },
  async created () {
    await this.fetchProducts()
  }
}
</script>

<style lang="less" scoped>
.pm {
  display: flex;
  flex-direction: column;
  .container {
    flex: 1
  }
}
</style>
