<template>
  <div id="app">
    <!-- <router-view/> -->
    <component :is="layout"></component>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    default: _ => import('./layouts/default'),
    blank: _ => import('./layouts/blank')
  },
  computed: {
    layout () {
      return this.$route.matched.length ? (this.$route.meta.layout || 'default') : ''
    }
  },
  methods: {
    setBreadcrumb () {
      this.$store.dispatch('setBreadcrumb', this.$route.meta.breadcrumb)
    }
  },
  created () {
    this.setBreadcrumb()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'setBreadcrumb'
  }
}
</script>

<style lang="less">
html, body {
  height: 100%;
  #app {
    height: 100%;
  }
}
</style>
