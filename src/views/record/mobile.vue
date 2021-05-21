<template>
  <div class="record">
    <div class="tab">
      <div class="tab-title">预订列表</div>
      <div class="tab-row">
        <div class="tab-item" :class="{active:this.switch==1}" @click="tabSwitch(1)">未开始</div>
        <div class="tab-item" :class="{active:this.switch==2}" @click="tabSwitch(2)">正在进行</div>
        <div class="tab-item" :class="{active:this.switch==3}" @click="tabSwitch(0)">已结束</div>
      </div>
    </div>
    <div class="list">
      <van-loading size="48px" vertical v-show="loading">加载中...</van-loading>
      <div class="no-data" v-if="!this.recordList.length">
        <img src="@/assets/images/no-data.png" />
        <div>暂无数据</div>
      </div>
      <van-list v-else v-model="listLoading" @load="listLoad" :finished="listFinished" finished-text="没有更多了">
        <div class="list-item" v-for="(item,index) in recordList" @click="goDetail(item)">
          <div class="meeting-img">
            <img src="@/assets/images/approve-loading.png" v-if="item.approveResult==0" />
            <img src="@/assets/images/approve-success.png" v-if="item.approveResult==1" />
            <img src="@/assets/images/approve-fail.png" v-if="item.approveResult==2" />
          </div>
          <div class="meeting-content">
            <div class="meeting-theme">{{item.meetingTheme}}</div>
            <div class="room-name">{{item.roomName}}</div>
            <van-tag plain type="success" v-if="item.projector" style="margin-right: 10px;">投影仪</van-tag>
            <van-tag plain type="success" v-if="item.display" style="margin-right: 10px;">显示屏</van-tag>
            <van-tag plain type="success" v-if="item.blackboard" style="margin-right: 10px;">黑板</van-tag>
            <van-tag plain type="success" v-if="item.whiteboard" style="margin-right: 10px;">白板</van-tag>
            <div class="room-time">{{item.meetingDate}} {{item.startTime}} ~ {{item.endTime}}</div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
  import {
    Tag
  } from 'vant';
  import {
    getRecordList
  } from '@/api/record/index.js'
  export default {
    data() {
      return {
        switch: 1,
        recordList: [],
        loading: false,
        listLoading:false,// 瀑布流滚动加载
        listFinished:false,
        form: {
          page: 1,
          pageSize: 5
        },
        total:0,
      }
    },
    components: {
      Tag
    },
    created() {
      this.getRecordList()
    },
    methods: {
      // 切换
      tabSwitch(val) {
        this.switch = val
        this.form = {
          page: 1,
          pageSize: 5
        }
        this.recordList = []
        this.getRecordList()
      },
      // 获取列表
      getRecordList() {
        this.loading = true
        this.listLoading = true
        this.listFinished = false

        let param = {
          statusId: this.switch,
          ...this.form
        }
        getRecordList(param).then(res => {
          this.recordList = this.recordList.concat(res.data.list)
          this.total = res.data.count
          this.loading = false
          this.listLoading = false
          if(this.recordList.length >= this.total){
            this.listFinished = true
          }
        })
      },
      // 下拉加载
      listLoad(){
        this.form.page ++
        this.getRecordList()
      },
      // 详细
      goDetail(item) {
        this.$router.push({
          name:'mobileDetail',
          params: {
            item:item
          }
        })
      },

    },
  }
</script>
<style lang="scss" scoped>
  .tab {
    height: 4rem;
    width: 100%;
    background-image: linear-gradient(to right bottom, #132CF8, #23A4F7);
    color: #fff;
    z-index: 100;
    position: absolute;
    top: 0;

    .tab-title {
      font-size: 16px;
      line-height: 46px;
      text-align: center;
    }

    .tab-row {
      display: flex;
      justify-content: space-between;
      margin-top: 1.95rem;
      padding: 0 20px;
      font-size: 16px;
    }

    .tab-item {
      padding: 5px;
    }

    .active {
      border-bottom: 4px solid #fff;
    }
  }

  .list {
    position: absolute;
    top: 4rem;
    width: 100%;

    .list-item {
      margin: 10px 3% 0;
      background: #fff;
      border-radius: 5px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      height: 110px;
      width: 94%;
      display: flex;
      padding: 10px;
      box-sizing: border-box;
    }

    .meeting-img {
      height: 100px;
      width: 100px;
      border-radius: 50%;
      margin-right: 10px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .meeting-theme {
      font-size: 16px;
      font-weight: 600;
      line-height: 28px;
    }

    .room-name {
      font-size: 14px;
      line-height: 24px;
      margin-bottom: 5px;
    }

    .room-time {
      font-size: 12px;
      line-height: 24px;
      color: #bbb;
    }
  }

  .no-data {
    text-align: center;
    margin-top: 50px;
    color: #bbb;
    font-size: 16px;
  }
</style>