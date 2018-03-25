<template>
  <div class="repayment">
    <Row :gutter="16">
      <iCol :span="24" style="padding-top: 10px; padding-bottom: 10px;">
        <Button type="primary" @click="repay">一键还款</Button>
      </iCol>
    </Row>
    <Table :loading="loading" :columns="columns" :data="todayRecords.list" no-data-text="暂时还款记录！"/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {Row, Col, Table, Button} from 'iview'
import opts from './columns'
export default {
  components: {Row, iCol: Col, Table, Button},
  data () {
    return {
      loading: true,
      columns: opts()
    }
  },
  computed: {
    ...mapState({
      todayRecords: state => state.records.todayRecords,
      repayResult: state => state.records.repay
    })
  },
  methods: {
    async repay () {
      await this.$store.dispatch('records/repay')
      if (this.repayResult) {
        this.$notice.success({
          title: '成功提醒',
          desc: '还款成功!'
        })
      } else {
        this.$notice.error({
          title: '还款失败'
        })
      }
    }
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
.repayment {
  flex: 1;
}
</style>
