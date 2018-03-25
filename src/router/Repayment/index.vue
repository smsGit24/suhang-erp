<template>
  <div class="repayment">
    <Table :loading="loading" :columns="columns" :data="todayRecords.list" no-data-text="暂时还款记录！"/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {Table} from 'iview'
import opts from './columns'
export default {
  components: {Table},
  data () {
    return {
      loading: true,
      columns: opts()
    }
  },
  computed: {
    ...mapState({
      todayRecords: state => state.records.todayRecords
    })
  },
  async mounted () {
    await this.$store.dispatch('records/getTodayRecords', {
      start: 1,
      limit: 10
    })
    this.loading = false
    console.log(this.todayRecords)
  }
}
</script>

<style lang="less" scoped>

</style>
