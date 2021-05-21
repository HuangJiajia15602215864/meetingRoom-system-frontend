<template>
  <div class="detail">
    <div class="status">
      <img v-if="status==0" src="../../assets/images/approve-loading.png">
      <img v-if="status==1" src="../../assets/images/approve-success.png">
      <img v-if="status==2" src="../../assets/images/approve-fail.png">
      <div class="status-text">{{status==0?'等待审批ing':status==1?'审批通过':'审批不通过'}}</div>
       <div class="status-text" v-if="status==2">{{rejectReason}}</div>
    </div>
    <van-cell-group style="width:100%">
      <van-cell v-for="item in recordDetail" :title="item.title" :value="item.value" :icon="item.icon" />
    </van-cell-group>
  </div>
</template>
<script>
  import {
    Cell,
    CellGroup,
    Icon
  } from 'vant';
    import {
    buildingList
  } from '@/utils/index.js'
  export default {
    data() {
      return {
        buildingList:buildingList,
        status: null,
        rejectReason:'',
        recordDetail: [{
          title: '会议主题',
          icon: 'star-o',
          value: ''
        }, {
          title: '会议室名称',
          icon: 'like-o',
          value: ''
        }, {
          title: '会议室地点',
          icon: 'location-o',
          value: ''
        }, {
          title: '会议日期',
          icon: 'calendar-o',
          value: ''
        }, {
          title: '会议时间',
          icon: 'clock-o',
          value: ''
        }, {
          title: '参会人数',
          icon: 'friends-o',
          value: ''
        }, {
          title: '会议室设备',
          icon: 'setting-o',
          value: ''
        }]
      }
    },
    components: {
      Cell,
      CellGroup,
      Icon
    },
    created() {
      this.changeFormat(this.$route.params.item)
    },
    methods: {
      // 需将获取后的数据进行格式化
      changeFormat(detail) {
        console.log(detail)
        this.recordDetail[0].value = detail.meetingTheme
        this.recordDetail[1].value = detail.roomName
        this.recordDetail[2].value = this.buildingList.find((ele) => {
          return ele.id == detail.building
        }).buildingName + detail.roomLocation
        this.recordDetail[3].value = detail.meetingTheme
        this.recordDetail[4].value = detail.startTime + ' ~ ' + detail.endTime
        this.recordDetail[5].value = detail.meetingNum

        let str = ''
        str = (detail.projector) ? '投影仪、' : ''
        str += (detail.display) ? '显示屏、' : ''
        str += (detail.whiteboard) ? '白板、' : ''
        str += (detail.blackboard) ? '黑板、' : ''
        this.recordDetail[6].value = str

        this.status = detail.approveResult
        this.rejectReason = detail.rejectReason
      }
    },
  }
</script>
<style lang="scss" scoped>
  .status {
    text-align: center;
    background: #fff;
    color: #969799;
    font-size: 14px;

    img {
      width: 5rem;
      height: 5rem;
    }

    .status-text {
      position: relative;
      top: -0.5rem;
    }
  }
</style>