<template>
  <div class="access">
    <Card v-for="(item, index) in userList" :key="index" :class="{last: (index + 1) % 4 === 0}">
      <p slot="title">id: {{item.id}}</p>
      <a slot="extra" @click.prevent="$router.push({path: '/userdetails', query: {id: item.id}})">
        <Icon type="ios-loop-strong"></Icon>
        查看详情
      </a>
      <div class="item">
        <div class="item-name">手机号: </div>
        <div class="item-value">{{item.mobile}}</div>
      </div>
      <div class="item">
        <div class="item-name">注册时间: </div>
        <div class="item-value">{{item.createOn}}</div>
      </div>
      <div class="item">
        <div class="item-name">总金额: </div>
        <div class="item-value">{{item.total_amount}}</div>
      </div>
      <div class="item">
        <div class="item-name">管理员权限</div>
        <i-Switch v-model="item.access" @on-change="changeAccess" :true-value="1" :false-value="0">
          <span slot="open">开</span>
          <span slot="close">关</span>
        </i-Switch>
      </div>
    </Card>
  </div>
</template>

<script>
import { Card, Switch, Button } from 'iview'
import { mapState } from 'vuex'
export default {
  components: {
    Card,
    Button,
    'i-Switch': Switch
  },
  data () {
    return {
      form: {
        switch: false
      }
    }
  },
  computed: {
    ...mapState({
      userList: state => state.user.userList
    })
  },
  methods: {
    changeAccess (val) {
      console.log(this.userList)
    }
  },
  async mounted () {
    await this.$store.dispatch('user/getUsers', {
      start: 1,
      limit: 10
    })
    console.log(this.userList)
  }
}
</script>

<style lang="less" scoped>
.access {
  .ivu-card {
    display: inline-block;
    height: 300px;
    width: calc((100% - 30px) / 4);
    margin: 0 10px 10px 0;
    .item {
      display: flex;
      margin-bottom: 10px;
      .item-name {
        flex: 1;
      }
    }
  }
  .ivu-card.last {
    margin-right: 0;
  }
}
</style>
