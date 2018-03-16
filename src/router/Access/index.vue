<template>
  <div class="access">
    <Card v-for="(item, index) in userList" :key="index" :class="{last: (index + 1) % 4 === 0}">
      <p slot="title">{{item.userName}}</p>
      <div class="access-item">
        <div class="access-name">管理员权限</div>
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
    .access-item {
      display: flex;
      .access-name {
        flex: 1;
      }
    }
  }
  .ivu-card.last {
    margin-right: 0;
  }
}
</style>
