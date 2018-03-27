<template>
  <div class="dynamic">
    <Row :gutter="16" style="margin-bottom: 15px;">
      <iCol :span="24">
       <Button type="primary" icon="plus" shape="circle" @click="$router.push({name: 'NewDynamic'})">新建</Button>
      </iCol>
    </Row>
    <Row :gutter="16" class="container">
      <iCol :span="24">
        <ul>
          <li v-for="(news, index) in newsList.list" :key="index">
            <Card style="width: 100%; margin-bottom: 4px;">
              <div class="news-layout" style="width: 100%; display: flex;">
                <div class="wrap-img" style="width: 240px;">
                  <img :src="news.image" alt="" style="width: 100%;">
                </div>
                <div class="news-main" style="flex: 1;">
                  <a @click="$router.push({path: 'dynamicdetails', query: {id: news.id}})">{{news.title}}</a>
                </div>
                <div class="info" style="display: flex; color: #ccc;">
                  <div class="create-time" style="flex: 1;margin-right: 10px;">
                    <span>创建时间: </span>
                    <span>{{news.createTime}}</span>
                  </div>
                  <div class="update-time">
                    <span>最后更新时间: </span>
                    <span>{{news.updateTime}}</span>
                  </div>
                </div>
              </div>
            </Card>
          </li>
        </ul>
      </iCol>
    </Row>
    <Row :gutter="16">
      <iCol :span="24" style="text-align: center; padding: 15px 0;">
        <Page :total="newsList.count" show-elevator show-sizer show-total @on-change="pageChange" @on-page-size-change="sizeChange"></Page>
      </iCol>
    </Row>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {Row, Col, Button, Card, Page} from 'iview'
export default {
  components: {
    Row, iCol: Col, Button, Card, Page
  },
  data () {
    return {
      loading: true,
      start: 1,
      limit: 10
    }
  },
  computed: {
    ...mapState({
      newsList: state => state.news.news
    })
  },
  methods: {
    async fetchNews () {
      this.loading = true
      const {start, limit} = this
      await this.$store.dispatch('news/fetchNews', { start, limit })
      console.log(this.newsList)
      this.loading = false
    },
    async pageChange (start) {
      this.start = start
      await this.fetchNews()
    },
    async sizeChange (limit) {
      this.limit = limit
      await this.fetchNews()
    }
  },
  async mounted () {
    await this.fetchNews()
  }
}
</script>

<style lang="less" scoped>
.dynamic {
  flex: 1;
  padding: 15px;
}
</style>
