<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  import store from '@/store'
  import {
    getToken
  } from '@/utils/auth'
  export default {
    name: 'App',
    computed: {
      device() {
        // 判断是否为移动端
        let device = navigator.userAgent.match(
          /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        )
        store.dispatch('app/toggleDevice', device ? 'mobile' : 'desktop') // 将device存储在store中
        return device
      },
    },
    mounted() {
      if (!getToken()) { // 未登录
        if (this.device) { // 移动端
          this.$router.push('/mobileLogin');
        } else { // PC端
          this.$router.push('/pcLogin');
        }
      }
    }
  }
</script>