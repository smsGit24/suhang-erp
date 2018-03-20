<template>
<div class="signin" @keydown.enter="handleSubmit">
    <div class="shadow" :class="showHello ? 'showHello' : ''">
      <p class="text1" :class="showHello ? 'showHelloText1' : ''">欢迎注册</p>
      <p class="text2" :class="showHello ? 'showHelloText2' : ''">苏商后台管理系统</p>
    </div>
    <div class="main">
      <div class="logo">
        <img src="./images/logo.png" alt="">
      </div>
      <div class="signin-con">
        <Card :bordered="false" :dis-hover="true">
          <p slot="title">
            <Icon type="log-in"></Icon>
            苏商-erp注册
          </p>
          <div class="form-con">
            <Form ref="signinForm" :model="form" :rules="rules">
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
                <Button @click="handleSubmit" type="primary" long>注册</Button>
              </FormItem>
            </Form>
          </div>
        </Card>
        <a class="login" @click="$router.push({name: 'Login'})">去登陆</a>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from 'md5'
import Cookies from 'js-cookie'
import {mapState} from 'vuex'
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
      signInResult: state => state.user.signInResult,
      logInResult: state => state.user.logInResult
    })
  },
  methods: {
    /**
     * @description 注册提交
     * @description 若成功 则 登录 并跳转到 项目页面
     * @description 若失败 提示失败
     * @method logIn 登录
     */
    handleSubmit () {
      this.$refs.signinForm.validate(async (valid) => {
        if (valid) {
          const {name, password} = this.form
          await this.$store.dispatch('user/signIn', {
            name, password: md5(password)
          })
          if (this.signInResult) {
            this.$message.success('注册成功！')
            await this.logIn()
            if (this.logInResult) {
              Cookies.set('id', name)
              Cookies.set('token', this.logInResult)
              this.$router.push({name: 'Pm'})
            }
          } else {
            this.$message.error('用户名已存在！')
          }
        }
      })
    },
    async logIn () {
      const {name, password} = this.form
      await this.$store.dispatch('user/logIn', {
        name,
        password: md5(password)
      })
    }
  },
  mounted () {
    setTimeout(() => (this.showHello = true), 500)
  }
}
</script>

<style lang="less" scoped>
.signin{
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
    .login {
      position: absolute;
      bottom: 50px;
      right: 40px;
    }
  }
}
</style>
<style lang="less">
.signin {
  .ivu-form-item-error-tip {
    font-size: 12px;
  }
}
</style>
