<template>
  <div class="dynamic">
    <Row :gutter="16">
      <iCol :span="24">
       <Button type="primary" icon="plus" shape="circle" @click="$router.push({name: 'NewDynamic'})">新建</Button>
      </iCol>
    </Row>
  </div>
</template>

<script>
import {Row, Col, Button} from 'iview'
export default {
  components: {
    Row, iCol: Col, Button
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.dynamic {
  padding: 15px;
}
</style>
