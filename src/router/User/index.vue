<template>
  <div class="user"></div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },
  async mounted () {
    await this.$store.dispatch('user/getUserDetail', {
      id: 15801835043
    })
    console.log(this.user)
  }
}
</script>

<style lang="less" scoped>

</style>
