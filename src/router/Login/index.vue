<template>
  <div class="login" @keydown.enter="handleSubmit">
    <div class="shadow" :class="showHello ? 'showHello' : ''">
      <p class="text1" :class="showHello ? 'showHelloText1' : ''">欢迎登录</p>
      <p class="text2" :class="showHello ? 'showHelloText2' : ''">苏商后台管理系统</p>
    </div>
    <div class="main">
      <div class="logo">
        <img src="./images/logo.png" alt="">
      </div>
      <div class="login-con">
        <Card :bordered="false" :dis-hover="true">
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
        <a class="signin" @click="$router.push({name: 'Signin'})">注册erp账号</a>
      </div>
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
      showHello: false,
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
            Cookies.set('id', name)
            Cookies.set('token', this.logInResult)
            this.$router.push({name: 'Pm'})
          } else this.$message.error('登录失败！')
        }
      })
    }
  },
  mounted () {
    setTimeout(() => (this.showHello = true), 500)
  }
}
</script>

<style lang="less" scoped>
.login{
  width: 100%;
  height: 100%;
  background-image: url('../../assets/loginbg.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
  .shadow {
    opacity: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    transition: opacity 1s;
    p {
      font-weight: 500;
      color: #fff;
      position: absolute;
    }
    .text1 {
      font-size: 2.5em;
      top: 30%;
      left: 80px;
      opacity: 0;
      transition: opacity 0.6s ease, left 1s ease;
    }
    .showHelloText1 {
      left: 18%;
      opacity: 1;
    }
    .text2 {
      font-size: 1.5em;
      top: 38%;
      left: 60px;
      opacity: 0;
      transition: opacity 0.6s ease, left 1s ease;
      transition-delay: 0.8s
    }
    .showHelloText2 {
      left: 22%;
      opacity: 1;
    }
  }
  .showHello {
    opacity: 1;
  }
  .main {
    position: absolute;
    background: #ffffff;
    height: 100%;
    right: 0;
    top: 0;
    width: 400px;
    padding: 50px 40px 0;
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
    .signin {
      position: absolute;
      bottom: 50px;
      right: 40px;
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
