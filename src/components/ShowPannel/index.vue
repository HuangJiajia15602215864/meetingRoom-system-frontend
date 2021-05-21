<template>
  <div class="show-pannel">
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="panel-box">
          <div class="panel-box-left">
            <div class="panel-box-img">
              <img src="@/assets/images/pannel-one.png" />
            </div>
          </div>
          <div class="panel-box-right">
            <div class="panel-box-item">
              <div class="panel-box-title">建筑楼总数</div>
              <div class="panel-box-value">{{data.buildingNum}}</div>
            </div>
            <div class="panel-box-item">
              <div class="panel-box-title">会议室总数</div>
              <div class="panel-box-value">{{data.roomNum}}</div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="panel-box">
          <div class="panel-box-left">
            <div class="panel-box-img pannel-two">
              <img src="@/assets/images/pannel-two.png" />
            </div>
          </div>
          <div class="panel-box-right">
            <div class="panel-box-item">
              <div class="panel-box-title">通过会议室</div>
              <div class="panel-box-value">{{data.meetingResultArr[1].value}}</div>
            </div>
            <div class="panel-box-item">
              <div class="panel-box-title">驳回会议室</div>
              <div class="panel-box-value">{{data.meetingResultArr[2].value}}</div>
            </div>
            <div class="panel-box-item">
              <div class="panel-box-title">未审批会议室</div>
              <div class="panel-box-value">{{data.meetingResultArr[0].value}}</div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="40" class="panel-group panel-bottom">
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="panel-box">
          <div class="panel-box-left">
            <div class="panel-box-img pannel-three">
              <img src="@/assets/images/pannel-three.png" />
            </div>
          </div>
          <div class="panel-box-right">
            <div class="panel-box-item">
              <div class="panel-box-title">今日会议数</div>
              <div class="panel-box-value">{{data.meetingDateArr[0].value}}</div>
            </div>
            <div class="panel-box-item">
              <div class="panel-box-title">明日会议数</div>
              <div class="panel-box-value">{{data.meetingDateArr[1].value}}</div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="panel-box">
          <div class="panel-box-left">
            <div class="panel-box-img pannel-four">
              <img src="@/assets/images/pannel-four.png" />
            </div>
          </div>
          <div class="panel-box-right hot">
            <img src="@/assets/images/first.png" />
            <div class="panel-box-value hot first">{{data.firstRoom}}</div><br>
            <img src="@/assets/images/second.png" />
            <div class="panel-box-value hot second">{{data.secondRoom}}</div><br>
            <img src="@/assets/images/third.png" />
            <div class="panel-box-value hot third">{{data.thirdRoom}}</div><br>
          </div>
        </div>
      </el-col>
    </el-row>
    <div style="position: relative;top:-250px;">
      <el-row :gutter="40"> 
        <el-col :xs="24" :sm="24" :lg="10" :offset="12">
          <div style="background:#fff">
            <pie-chart :chartData="meetingRoomNum" seriesName="建筑楼中会议室数量" height="250px"></pie-chart>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import PieChart from '@/components/Charts/PieChart.vue'
  import {
    roomNumInBuilding,
  } from '@/api/manage/statistics.js'
  export default {
    components: {
      PieChart,
    },
    data() {
      return {
        meetingRoomNum: [],
      }
    },
    props: {
      data: {
        type: Object,
        required: true
      }
    },
    created() {
      this.roomNumInBuilding()
    },
    methods: { // 获取各建筑楼会议室数量
      roomNumInBuilding() {
        roomNumInBuilding().then(res => {
          this.meetingRoomNum = res.data
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .show-pannel {
    margin-bottom: 20px;

    .panel-box {
      height: 120px;
      background: #fff;
      padding: 22px 20px;
      display: flex;

      .panel-box-left {
        width: 45%;
      }

      .panel-box-img {
        background: rgba(65, 53, 221, 0.08);
        border-radius: 50%;
        width: 80px;
        height: 80px;
        display: flex;
      }

      img {
        margin: auto;
        height: 50%;
        width: 50%;
      }

      .panel-box-right {
        margin: auto 0;
      }

      .panel-box-item {
        display: flex;
        line-height: 24px;
      }

      .panel-box-title {
        font-size: 14px;
        color: #606266;
        width: 100px;
      }

      .panel-box-value {
        font-size: 22px;
        font-weight: 600;
        color: #303133;
      }

      .hot {
        font-size: 16px;
        font-weight: 600;
        line-height: 24px;
        display: inline-block;

        img {
          width: 22px;
          height: 22px;
          margin-right: 5px;
        }
      }

      .first {
        color: #FD0002;
      }

      .second {
        color: #5191FF;
      }

      .third {
        color: #FFAF00;
      }

      .pannel-two {
        background: rgba(231, 166, 97, 0.1);
      }

      .pannel-three {
        background: rgba(252, 70, 107, 0.08);
      }

      .pannel-four {
        background: rgba(84, 222, 205, 0.1);
      }
    }

    .panel-bottom {
      display: block;
      margin-top: 10px;
    }
  }
</style>