<template>
  <div class="login">
    <div class="top">
      <div class="top-img"></div>
    </div>
    <div class="title">校园会议室预订</div>
    <div class="middle">
      <div class="tab">
        <div class="tab-item" :class="{active:this.switch==1}" @click="tabSwitch(1)">用户登录</div>
        <div class="tab-item" :class="{active:this.switch==2}" @click="tabSwitch(2)">用户注册</div>
      </div>
      <div class="form">
        <el-link type="warning" icon="el-icon-warning" v-if="this.switch==2">一经注册，用户名不可修改！</el-link>
        <div class="form-item">
          <img src="../../assets/images/username.png" />
          <input type="text" name="username" v-model="username" autocomplete="new-username" placeholder="请输入用户名">
        </div>
        <div class="form-item">
          <img src="../../assets/images/password.png" />
          <input :type="passwordType" name="password" v-model="password" autocomplete="new-password"
            placeholder="请输入密码">
          <span class="show-pwd" @click="showPwd(1)">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </div>
        <div class="form-item" v-if="this.switch==2">
          <img src="../../assets/images/password.png" />
          <input :type="surePasswordType" name="surePassword" v-model="surePassword" autocomplete="new-password"
            placeholder="请再次输入密码">
          <span class="show-pwd" @click="showPwd(2)">
            <svg-icon :icon-class="surePasswordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </div>
      </div>
      <div class="button" @click="handleLogin">{{this.switch==1?'登录':'注册'}}</div>
    </div>
  </div>
</template>

<script>
  import {
    Notify
  } from 'vant'
  import md5 from 'js-md5'
  import {register} from '@/api/user/index'
  export default {
    name: 'login',
    components: {
      Notify
    },
    data() {
      return {
        switch: 1,
        username: '',
        password: '',
        surePassword: '',
        redirect: undefined,
        passwordType: 'password',
        surePasswordType: 'password',
        flag: false,
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
      tabSwitch(val) {
        this.switch = val
        this.reset()
      },
      reset() {
        this.username = ''
        this.password = ''
        this.surePassword = ''
      },
      showPwd(val) {
        if (val == 1) {
          this.passwordType = !this.passwordType ? 'password' : ''
        } else {
          this.surePasswordType = !this.surePasswordType ? 'password' : ''
        }
      },
      validate() {
        if (!this.username) {
          Notify({
            type: 'danger',
            message: '用户名不能为空！'
          });
          return
        }
        if (!this.password) {
          Notify({
            type: 'danger',
            message: '密码不能为空！'
          });
          return
        }
        if (!this.surePassword && this.switch == 2) {
          Notify({
            type: 'danger',
            message: '确认密码不能为空！'
          });
          return
        }
        if (this.password != this.surePassword && this.switch == 2) {
          Notify({
            type: 'danger',
            message: '两次密码输入不一致！'
          });
          return
        }
        this.flag = true
      },
      handleLogin() {
        this.validate()
        if (!this.flag) {
          return
        } else {
          if (this.switch == 1) { // 登录
            let params = {
              username: this.username,
              password: md5(this.password)
            }
            this.$store.dispatch('user/login', params).then(() => {
              this.$router.push({
                path: 'mobileBook'
              })
            })
          } else { // 注册
            let params = {
              username: this.username,
              password: md5(this.password)
            }
            register(params).then((res) => {
              this.$message.success('注册成功！');
              this.switch = 1
            }).catch(() => {
            })          
          }
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .top {
    background-image: linear-gradient(to right bottom, #132CF8, #23A4F7);
    height: 5rem;
    width: 100%;
    display: flex;

    .top-img {
      background: url(../../assets/images/illustration.png) no-repeat center;
      background-size: 100% 100%;
      height: 5rem;
      width: 5rem;
      margin: auto;
    }
  }

  .title {
    text-align: center;
    font-size: 20px;
    background: linear-gradient(to right, #132CF8, #23A4F7);
    color: transparent;
    -webkit-background-clip: text;
    font-weight: 600;
    margin-top: 1rem;
  }

  .middle {
    padding: 0.8rem 1.35rem;

    .tab {
      display: flex;
      justify-content: space-around;
      font-size: 15px;
      color: #ccc;
      font-weight: 600;
      width: 84%;
      margin: 0 auto;
    }

    .tab-item {
      padding: 0 25px 5px;
      border-bottom: 1px solid #ccc;
    }

    .active {
      border-bottom: 2px solid #132CF8;
      color: #132CF8;
    }

    .button {
      background-image: linear-gradient(to right, #132CF8, #23A4F7);
      width: 100%;
      height: 1rem;
      color: #fff;
      border-radius: 30px;
      text-align: center;
      vertical-align: middle;
      line-height: 1rem;
      font-size: 15px;
    }
  }

  .form {
    margin-top: 10px;
    padding: 5px 0 1rem;

    .form-item {
      border-bottom: 1px solid #ddd;
      padding: 10px 0 0;

      img {
        height: 0.4rem;
        width: 0.4rem;
        margin-right: 0.5rem;
        margin-top: 0.1rem;
      }

      input {
        display: inline-block;
        height: 0.8rem;
        border: none;
        outline: none;
        font-size: 14px;
      }

      input::-webkit-input-placeholder {
        color: #ccc;
      }

      .show-pwd {
        position: relative;
        right: -30px;
        top: 3px;
        font-size: 16px;
        color: #889aa4;
        cursor: pointer;
        user-select: none;
      }
    }
  }
</style>