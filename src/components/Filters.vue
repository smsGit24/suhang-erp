<template>
  <div class="filter-component">
    <Button type="dashed" shape="circle" icon="ios-search" @click="() => showFilters = !showFilters">筛选</Button>
    <transition name="filters">
      <div v-if="showFilters" class="shadow">
        <slot name="filter-body"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import {Button} from 'iview'
export default {
  components: {
    Button
  },
  data () {
    return {
      showFilters: false
    }
  }
}
</script>

<style lang="less" scoped>
.filter-component {
  .shadow {
    display: inline-block;
    padding: 0 20px;
    border-radius: 10px;
  }
  .filters-enter-active {
    animation: filters-in .5s;
  }
  .filters-leave-active {
    animation: filters-in .5s reverse;
  }
  @keyframes filters-in {
    0% {
      transform: scaleX(0);
      transform-origin: 0 0;
    }
    100% {
      transform: scaleX(1);
      transform-origin: 0 0;
    }
  }
}
</style>

