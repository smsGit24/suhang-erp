<template>
  <div class="user">
    <div class="plane left">
      <div class="item">
        <div class="label">姓名</div>
        <div class="content">{{user.name}}</div>
      </div>
      <div class="item">
        <div class="label">用户id</div>
        <div class="content">{{user.id}}</div>
      </div>
      <div class="item">
        <div class="label">身份证号</div>
        <div class="content">{{user.identity_code}}</div>
      </div>
      <div class="item">
        <div class="label">手机号</div>
        <div class="content">{{user.mobile}}</div>
      </div>
      <div class="item">
        <div class="label">银行卡号</div>
        <div class="content">{{user.bankcard}}</div>
      </div>
    </div>
    <div class="plane right">
      <div class="item">
        <div class="label">注册时间</div>
        <div class="content">{{user.createTime}}</div>
      </div>
      <div class="item">
        <div class="label">总金额</div>
        <div class="content">{{user.total_amount}}</div>
      </div>
      <div class="item">
        <div class="label">总收益</div>
        <div class="content">{{user.total_profile}}</div>
      </div>
      <div class="item">
        <div class="label">剩余金额</div>
        <div class="content">{{user.remain_amount}}</div>
      </div>
      <div class="item">
        <div class="label">是否投资</div>
        <div class="content">{{user.investFlag}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState({
      user: state => state.user.user || {}
    })
  },
  async mounted () {
    await this.$store.dispatch('user/getUserDetail', {
      id: this.$route.query.id,
      start: 1,
      limit: 10
    })
    console.log(this.user)
  }
}
</script>

<style lang="less" scoped>
.user {
  display: flex;
  padding: 20px;
  .plane {
    flex: 1;
    .item {
      display: flex;
      padding-bottom: 15px;
      .label {
        width: 70px;
        text-align: right;
        color: rgba(0, 0, 0, 0.85);
        &::after{
          content: ":";
          margin: 0 8px 0 2px;
          position: relative;
          top: -0.5px;
        }
      }
      .content {
        flex: 1;
        padding: 0 15px;
      }
    }
  }
}
</style>
