<template>
  <div class="dynamic-details">
    <h1 class="header">{{details.title}}</h1>
    <div class="btn-wrap">
      <Button type="text" icon="ios-gear-outline" @click="$router.push({path: 'editdynamic', query: {id: $route.query.id}})">编辑文章</Button>
    </div>
    <div class="info">
      <div class="info-item create-time">
        <span>创建时间: </span>
        <span>{{details.createTime}}</span>
      </div>
      <div class="info-item update-time">
        <span>最后更新时间: </span>
        <span>{{details.updateTime}}</span>
      </div>
    </div>
    <div class="content" v-html="details.content"></div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {Affix, Button} from 'iview'
export default {
  components: {
    Affix, Button
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      details: state => state.news.newsDetails
    })
  },
  async mounted () {
    await this.$store.dispatch('news/fetchNewsDetails', {
      id: this.$route.query.id
    })
    console.log(this.details)
  }
}
</script>

<style lang="less" scoped>
.dynamic-details {
  flex: 1;
  padding: 15px;
  .header {
    text-align: center;
    font-size: 20px;
    margin-bottom: 12px;
  }
  .btn-wrap {
    width: 640px;
    margin: 0 auto;
  }
  .info {
    display: flex;
    color: #cccccc;
    font-size: 12px;
    .info-item {
      flex: 1;
      margin-bottom: 12px;
    }
    .create-time {
      text-align: right;
      margin-right: 20px;
    }
    .update-time {
      text-align: left;
    }
  }
}
</style>
<style lang="less">
.dynamic-details {
  .content {
    // padding: 20px;
    width: 640px;
    margin: 0 auto;
    p {
      img {
        width: 100%;
      }
    }
  }
}
</style>

