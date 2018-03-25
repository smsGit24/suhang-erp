<template>
  <div class="repayment">
    <div class="filter">
      <Filters>
        <div slot="filter-body">
          <DatePicker v-model="filters.times" type="datetimerange" format="yyyy-MM-dd HH:mm:ss" placement="bottom" placeholder="选择时间范围" style="width: 320px" @on-change="searchProducts"/>
        </div>
      </Filters>
    </div>
    <Table :loading="loading" :columns="columns" :data="funds.list" no-data-text="暂时还款记录！"/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import moment from 'moment'
import {Table, DatePicker} from 'iview'
import Filters from '@/components/Filters'
import opts from './columns'
export default {
  components: {Table, DatePicker, Filters},
  data () {
    return {
      filters: {
        rate: undefined,
        status: null,
        type: null,
        times: [],
        start: 1,
        limit: 10
      },
      loading: true,
      columns: opts({
        filterRemote: this.filterRemote
      })
    }
  },
  computed: {
    ...mapState({
      funds: state => state.records.funds
    })
  },
  methods: {
    async fetchFunds () {
      const {status, type, start, limit, times} = this.filters
      await this.$store.dispatch('records/getFund', {
        status,
        type,
        start,
        limit,
        startTime: times[0] ? moment(times[0]).format('YYYY-MM-DD HH:mm:ss') : times[0],
        endTime: times[1] ? moment(times[1]).format('YYYY-MM-DD HH:mm:ss') : times[1]
      })
      this.loading = false
    },
    async searchProducts (val) {
      this.filters.times = val
      await this.fetchFunds()
    },
    async filterRemote (val, type) {
      this.filters[type] = val
      await this.fetchFunds()
    }
  },
  async mounted () {
    await this.fetchFunds()
    console.log(this.funds)
  }
}
</script>

<style lang="less" scoped>
.repayment {
  flex: 1;
  padding: 15px;
  .filter {
    padding-bottom: 15px;
  }
}
</style>
