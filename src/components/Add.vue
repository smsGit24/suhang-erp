<template>
  <div class="add">
    <Button type="primary" icon="plus" shape="circle" style="width: 100%" @click="() => setVisible(true)">添加</Button>
    <Modal
      width="640"
      v-model="visible"
      title="新增项目"
      :loading="loading"
      @on-ok="asyncOK">
      <Form class="add-form" ref="addForm" :model="addParams" :rules="ruleValidate" inline label-position="top">
        <FormItem class="one" label="产品名称" prop="name">
          <Input class="inner-form" v-model="addParams.name" placeholder="请输入产品名称" />
        </FormItem>
        <FormItem class="four" label="最小投资金额" prop="minAmount">
          <Input class="inner-form" v-model="addParams.minAmount" :number="true" placeholder="请输入最小投资金额"/>
        </FormItem>
        <FormItem class="four" label="最大投资金额" prop="maxAmount">
          <Input class="inner-form" v-model="addParams.maxAmount" :number="true" placeholder="请输入最大投资金额"/>
        </FormItem>
        <FormItem class="four" label="产品金额" prop="amount">
          <Input class="inner-form" v-model="addParams.amount" :number="true" placeholder="请输入产品金额"/>
        </FormItem>
        <FormItem class="four" label="产品利率（小数）" prop="rate">
          <Input class="inner-form" v-model="addParams.rate" :number="true" placeholder="请输入产品利率"/>
        </FormItem>
        <FormItem class="three" label="产品代码" prop="code">
          <Input class="inner-form" v-model="addParams.code" :number="true" placeholder="请输入产品代码"/>
        </FormItem>
        <FormItem class="three" label="产品期限（天）" prop="period">
          <Input class="inner-form" v-model="addParams.period" :number="true" placeholder="请输入产品期限"/>
        </FormItem>
        <FormItem class="three" label="还款来源" prop="repaymentSource">
          <Input class="inner-form" v-model="addParams.repaymentSource" placeholder="请输入还款来源" />
        </FormItem>
        <FormItem class="one" label="借款用途" prop="loanUse">
          <Input class="inner-form" v-model="addParams.loanUse" placeholder="请输入借款用途" />
        </FormItem>
        <FormItem class="one" label="项目风险图片" prop="riskPicture">
          <Input class="inner-form" v-model="addParams.riskPicture" placeholder="请输入项目风险图片" />
        </FormItem>
        <FormItem class="one" label="产品描述" prop="description">
          <Input class="inner-form" type="textarea" v-model="addParams.description" placeholder="请输入产品描述" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {Button, Modal, Form, FormItem, Input, InputNumber} from 'iview'
export default {
  components: { Button, Modal, Form, FormItem, Input, InputNumber },
  data () {
    return {
      visible: false,
      loading: true,
      addParams: {
        code: undefined,
        name: '',
        minAmount: undefined,
        maxAmount: undefined,
        amount: undefined,
        period: undefined,
        rate: undefined,
        description: '',
        loanUse: '',
        repaymentSource: '',
        riskPicture: ''
      },
      ruleValidate: {
        code: [
          { required: true, message: '请输入产品代码', trigger: 'blur', type: 'number' }
        ],
        name: [
          { required: true, message: '请输入产品名称', trigger: 'blur' }
        ],
        minAmount: [
          { required: true, message: '请输入最小投资金额', trigger: 'blur', type: 'number' }
        ],
        maxAmount: [
          { required: true, message: '请输入最大投资金额', trigger: 'blur', type: 'number' }
        ],
        amount: [
          { required: true, message: '请输入产品金额', trigger: 'blur', type: 'number' }
        ],
        period: [
          { required: true, message: '请输入产品期限', trigger: 'blur', type: 'number' }
        ],
        rate: [
          { required: true, message: '请输入产品利率', trigger: 'blur', type: 'number' }
        ],
        description: [
          { required: true, message: '请输入产品描述', trigger: 'blur' }
        ],
        loanUse: [
          { required: true, message: '请输入借款用途', trigger: 'blur' }
        ],
        repaymentSource: [
          { required: true, message: '请输入还款来源', trigger: 'blur' }
        ],
        riskPicture: [
          { required: true, message: '请输入项目风险图片', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      createProducts: state => state.products.createProducts
    })
  },
  methods: {
    setVisible (val) {
      this.visible = val
      this.loading = false
      this.addParams = {
        code: undefined,
        name: '',
        minAmount: undefined,
        maxAmount: undefined,
        amount: undefined,
        period: undefined,
        rate: undefined,
        description: '',
        loanUse: '',
        repaymentSource: '',
        riskPicture: ''
      }
    },
    handleReset (name) {
      this.$refs.addForm.resetFields()
    },
    asyncOK () {
      this.$refs.addForm.validate(async (valid) => {
        if (valid) {
          console.log(this.addParams)
          await this.$store.dispatch('products/createProducts', {...this.addParams})
          if (this.createProducts) {
            this.$emit('get')
            this.$message.success('新建产品成功!')
            this.setVisible(false)
          } else {
            this.$message.error('新建产品失败!')
          }
        } else this.loading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.add-form {
  .ivu-form-item {
    .inner-form {
      width: 100%;
    }
  }
  .one {
    width: 100%;
  }
  .two {
    width: calc(100% / 2 - 2px);
    margin-right: 0;
  }
  .three {
    width: calc(100% / 3 - 3px);
    margin-right: 0;
  }
  .four {
    width: calc(100% / 4 - 4px);
    margin-right: 0;
  }
  ::-webkit-input-placeholder {
    font-size: 12px;
  }
}
</style>
