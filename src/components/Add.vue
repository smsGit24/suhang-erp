<template>
  <div class="add">
    <Button type="primary" style="width: 100%" @click="() => setVisible(true)">{{title}}</Button>
    <Modal
      v-model="visible"
      :title="title"
      width="800"
      :loading="loading"
      @on-ok="asyncOK">
      <slot name="content"></slot>
    </Modal>
  </div>
</template>

<script>
import {Button, Modal, Form, FormItem, Input, InputNumber} from 'iview'
export default {
  components: {
    iInput: Input,
    Button,
    Modal,
    Form,
    FormItem,
    InputNumber
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      visible: false,
      loading: true,
      addParams: {
        amount: 1,
        rate: 1
      },
      ruleValidate: {
        amount: [
          { required: true, message: '请输入借款金额', trigger: 'blur', type: 'number' }
        ]
      }
    }
  },
  methods: {
    setVisible (val) {
      this.visible = val
    },
    handleReset (name) {
      this.$refs.addForm.resetFields()
    },
    asyncOK () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
          this.loading = false
          this.setVisible(false)
        } else {
          this.$Message.error('Fail!')
        }
      })
    }
  },
  created () {
    console.log(this)
    console.log(this.$children)
  }
}
</script>

<style lang="less" scoped>

</style>
