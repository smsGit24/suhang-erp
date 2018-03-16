<template>
  <div class="login" @keydown.enter="handleSubmit">
    <div class="logo">
      <img src="./images/logo.png" alt="">
    </div>
    <div class="login-con">
      <Card :bordered="false">
        <p slot="title">
          <Icon type="log-in"></Icon>
          苏商-erp登录
        </p>
        <div class="form-con">
          <Form ref="loginForm" :model="form" :rules="rules">
            <FormItem prop="name">
              <i-Input v-model="form.name" placeholder="请输入用户名">
                <span slot="prepend">
                  <Icon :size="16" type="person"></Icon>
                </span>
              </i-Input>
            </FormItem>
            <FormItem prop="password">
              <i-Input type="password" v-model="form.password" placeholder="请输入密码">
                <span slot="prepend">
                  <Icon :size="14" type="locked"></Icon>
                </span>
              </i-Input>
            </FormItem>
            <FormItem>
              <Button @click="handleSubmit" type="primary" long>登录</Button>
            </FormItem>
          </Form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import md5 from 'md5'
import {mapState} from 'vuex'
import Cookies from 'js-cookie'
import {Card, Icon, Form, FormItem, Input, Button} from 'iview'
export default {
  components: {
    Card,
    Icon,
    Form,
    FormItem,
    Button,
    'i-Input': Input
  },
  data () {
    return {
      form: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      logInResult: state => state.user.logInResult
    })
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          const {name, password} = this.form
          await this.$store.dispatch('user/logIn', {
            name, password: md5(password)
          })
          if (this.logInResult) {
            this.$message.success('登录成功！')
            Cookies.set('userName', name)
            Cookies.set('token', this.logInResult)
            this.$router.push({name: 'Pm'})
          } else this.$message.error('登录失败！')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login{
  width: 100%;
  height: 100%;
  // background-image: url('https://file.iviewui.com/iview-admin/login_bg.jpg');
  background: #fff;
  background-size: cover;
  background-position: center;
  position: relative;
  .logo {
    text-align: center;
    padding: 24px 0;
    img {
      width: 100px;
    }
  }
  &-con{
    // position: absolute;
    // right: 160px;
    // top: 50%;
    // transform: translateY(-60%);
    width: 300px;
    margin: 0 auto;
    &-header{
      font-size: 16px;
      font-weight: 300;
      text-align: center;
      padding: 30px 0;
    }
    .form-con{
      padding: 10px 0 0;
    }
    .login-tip{
      font-size: 10px;
      text-align: center;
      color: #c3c3c3;
    }
    .ivu-card {
      box-shadow: #999 3px 3px 10px;
    }
  }
}
</style>
<style lang="less">
.login {
  .ivu-form-item-error-tip {
    font-size: 12px;
  }
}
</style>
