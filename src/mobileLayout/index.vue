<template>
  <div class="mobileLayout">
    <van-nav-bar title="会议室预订" v-if="!haveBack"/>
    <van-nav-bar title="会议室预订" left-text="返回" left-arrow @click-left="back" v-else/>
    <div :class="['main',{'minHeight':!haveBack}]">
      <keep-alive>
        <router-view :key="key" v-if="$route.meta.keepAlive" />
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"/>
    </div>
    <van-tabbar v-model="active" z-index='100' active-color="#132CF8" route v-if="!haveBack">
      <van-tabbar-item to="/mobileBook" icon="add-o">预定</van-tabbar-item>
      <van-tabbar-item to="/mobileRecord" icon="todo-list-o">预定记录</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
  import {
    Tabbar,
    TabbarItem
  } from 'Vant'
  export default {
    data() {
      return {
        active: 0,
      }
    },
    components: {
      Tabbar,
      TabbarItem
    },
    created() {

    },
    computed: {
      key() {
        return this.$route.path
      },
      haveBack(){
        return this.$route.path=='/mobileRecord/detail' ? true : false
      }
    },
    methods: {
      // 返回
      back() {
        this.$router.go(-1)
      }
    },
  }

</script>
<style lang="scss">
  .van-nav-bar__text {
    color: #132CF8 !important;
  }

  .van-hairline--top-bottom{
    position: fixed!important;
  }

</style>
<style lang="scss" scoped>
.main{
  background: #f7f8fa;
  width: 100%;
}

.minHeight{
  min-height: calc(100vh - 96px);
}
</style>
