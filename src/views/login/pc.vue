<template>
  <div class="login">
    <div class="top">
      <div class="top-logo"></div>
      <span class="top-title">校园会议室管理系统</span>
    </div>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="off"
      auto-complete="off" label-position="left">
      <h2 class="login-title">登录</h2>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input ref="username" v-model="loginForm.username" placeholder="用户名" name="username" type="text"
          tabindex="1" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="密码"
          name="password" tabindex="2" @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <div style="margin-top: -5px;">
        <span class="info" @click="goRegister">没有账号? <span class="info-register">注册</span></span>
      </div>
      <el-button :loading="loading" type="primary" class="login-button" @click.native.prevent="handleLogin">点击登录
      </el-button>
    </el-form>
  </div>
</template>

<script>
  import md5 from 'js-md5'
  export default {
    name: 'Login',
    data() {
      return {
        loginForm: {
          username: '',
          password: ''
        },
        loginRules: {
          username: [{
            required: true,
            trigger: 'change',
            message: '用户名不能为空！'
          }],
          password: [{
            required: true,
            trigger: 'change',
            message: '密码不能为空！'
          }]
        },
        loading: false,
        passwordType: 'password',
        redirect: undefined
      }
    },
    computed: {
      device() {
        return this.$store.state.app.device
      }
    },
    watch: {
      $route: {
        handler: function (route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    methods: {
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      goRegister() {
        this.$router.push('pcRegister')
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            let param = {
              username:this.loginForm.username,
              password:md5(this.loginForm.password)
            }
            this.$store.dispatch('user/login',param).then(() => {
              this.$router.push({
                path: this.redirect || '/pcBook'
              })
              this.loading = false
            }).catch(() => {
              this.loading = false
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .login {
    .el-input__inner {
      border: none !important;
      padding: 0 10px;
      height: 30px;
    }

    .el-input {
      display: inline-block;
      width: 85%;

      input {
        background: #fff;
        border: none;
        color: #8E8E8E;
        caret-color: #8E8E8E;

        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px white inset;
          -webkit-text-fill-color: #8E8E8E !important;
        }
      }
    }
  }
</style>
<style lang="scss" scoped>
  .login {
    background: url(../../assets/images/bg.png) no-repeat center;
    background-size: 100% 100%;
    min-height: 100%;
    width: 100%;
  }

  .top {
    position: absolute;
    top: 20px;
    left: 20px;

    .top-logo {
      background: url(../../assets/images/logo.png) no-repeat center;
      background-size: 100% 100%;
      height: 30px;
      width: 30px;
      display: inline-block;
    }

    .top-title {
      color: #515a6e;
      font-weight: 500;
      font-size: 18px;
      line-height: 30px;
      letter-spacing: 2px;
      vertical-align: top;
      margin-left: 10px;
    }
  }

  .login-form {
    position: absolute;
    top: 150px;
    left: 250px;
    width: 350px;

    .login-title {
      color: #4135DD;
      text-align: center;
      margin-bottom: 40px;
    }

    .el-form-item {
      border: 2px solid rgba(0, 0, 0, 0.1);
      border-radius: 30px;
      color: #000;
    }

    .svg-container {
      padding-left: 15px;
      color: #8E8E8E;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 3px;
      font-size: 16px;
      color: #8E8E8E;
      cursor: pointer;
      user-select: none;
    }

    .info {
      color: #606266;
      font-size: 14px;
      cursor:pointer;
    }

    .info-register{
      color:#4135DD;
    }

    .login-button {
      border-radius: 30px;
      border: none;
      outline: none;
      background-image: linear-gradient(to right, #4135DD, #597EFF);
      color: #fff;
      width: 100%;
      height: 40px;
      letter-spacing: 5px;
      margin-top: 30px;
    }

    .login-button:hover {
      background-image: linear-gradient(to right, #4135DD, #A3CEF0);
    }

    .login-button:active {
      transform: scale(0.95, 0.95)
    }
  }
</style>