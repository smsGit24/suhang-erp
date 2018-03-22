<template>
  <div class="pm">
    <Row :gutter="16" class="header">
      <iCol :span="24" style="padding: 15px 20px;">
        <Add style="display: inline-block; margin-right: 10px;" @get="fetchProducts"/>
        <Button type="dashed" shape="circle" :loading="false" icon="ios-search" @click="() => showFilters = !showFilters">筛选</Button>
        <transition name="filters">
          <div v-if="showFilters" class="shadow">
            <Input v-model="filters.code" placeholder="请输入产品代码" style="width: 120px" @on-keypress="searchProducts"/>
            <Input v-model="filters.rate" placeholder="请输入产品利率" style="width: 120px" @on-keypress="searchProducts"/>
            <Input v-model="filters.period" placeholder="请输入产品期限" style="width: 120px" @on-keypress="searchProducts"/>
            <DatePicker v-model="filters.times" type="datetimerange" format="yyyy-MM-dd" placement="bottom-end" placeholder="选择时间范围" style="width: 320px" @on-change="fetchProducts"/>
          </div>
        </transition>
      </iCol>
    </Row>
    <Row :gutter="16" class="container" style="padding: 0 15px;">
      <iCol :span="24">
        <Table :loading="loading" :columns="columns" :data="products.list" no-data-text="暂时无产品！"/>
      </iCol>
    </Row>
    <Row :gutter="16">
      <iCol :span="24" style="text-align: center; padding: 15px 0;">
        <Page :total="products.count" show-elevator show-sizer show-total @on-change="pageChange" @on-page-size-change="sizeChange"></Page>
      </iCol>
    </Row>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {Row, Col, Table, Button, Input, Select, Option, DatePicker, Page} from 'iview'
import Add from '@/components/Add.vue'
import opts from './colums'
export default {
  components: {'iCol': Col, Row, Table, Button, Input, Add, Select, Option, DatePicker, Page},
  data () {
    return {
      showFilters: false,
      filters: {
        code: null,
        type: 1,
        status: undefined,
        times: [],
        period: null,
        rate: null
      },
      columns: opts({
        actionRender: this.actionRender,
        filterRemote: this.filterRemote
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
    async searchProducts (ev) {
      console.log(ev)
      if (ev.key === 'Enter') await this.fetchProducts()
    },
    async fetchProducts () {
      const {filters, start, limit} = this
      const {code, type, status, period, rate, times} = filters
      const res = {
        code: code ? isNaN(Number(code)) ? null : Number(code) : null, // int 产品代码
        type: type ? isNaN(Number(type)) ? null : Number(type) : null, // int 产品类型
        status: status ? isNaN(Number(status)) ? null : Number(status) : null, // int 产品状态
        period: period ? isNaN(Number(period)) ? null : Number(period) : null, // int 产品期限
        rate, // double 产品利率
        start,
        limit,
        beginTime: times[0], // date 开始时间
        endTime: times[1] // date 结束时间
      }
      console.log(res)
      await this.$store.dispatch('products/getProducts', res)
      this.loading = false
    },
    async filterRemote (val, type) {
      this.filters[type] = val
      await this.fetchProducts()
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
      await this.fetchProducts()
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
