<template>
  <div class="record">
    <template v-if="!recordList.length">
      <div class="record-empty">
        <img src="@/assets/images/no-data.png">
        <div>预订记录为空!</div>
      </div>
    </template>
    <template v-else>
      <el-row :gutter="40">
        <el-col :md="12" :lg="8" :xl="6" v-for="i in recordList">
          <div class="record-box">
            <div class="record-top">{{i.meetingTheme}}</div>
            <div class="record-form">
              <div class="record-item" v-for="item in recordDetail">
                <div class="record-title"><i :class="item.icon" class="record-icon"></i>{{item.title}}：</div>
                <el-tag v-if="item.value=='approveResult'" type="danger" size="small" style="margin-top: 5px;">
                  {{i[item.value] | change(statusList,'id','statusName')}}</el-tag>
                <div class="record-value" v-else>{{i[item.value]}}</div>
              </div>
            </div>
            <div class="record-img">
              <img src="@/assets/images/1.png">
            </div>
          </div>
        </el-col>
    </el-row>
  </template>
  </div>
</template>
<script>
  import {
    statusList
  } from '@/utils/index.js'
  export default {
    props: {
      recordList: {
        type: Array,
        required: true
      },
    },
    data() {
      return {
        statusList: statusList,
        recordDetail: [{
          title: '会议日期',
          icon: 'el-icon-date',
          value: 'meetingDate'
        }, {
          title: '会议时间',
          icon: 'el-icon-time',
          value: 'time'
        }, {
          title: '会议地点',
          icon: 'el-icon-location-outline',
          value: 'location'
        }, {
          title: '参会人数',
          icon: 'el-icon-help',
          value: 'meetingNum'
        }, {
          title: '设备',
          icon: 'el-icon-data-analysis',
          value: 'equipment'
        }, {
          title: '审批状态',
          icon: 'el-icon-setting',
          value: 'approveResult'
        }, {
          title: '驳回原因',
          icon: 'el-icon-document-delete',
          value: 'rejectReason'
        }],
      }
    },
    mounted() {

    },
    methods: {

    },
  }
</script>
<style lang="scss" scoped>
  .record-empty{
    text-align: center;
    font-size: 14px;
    color:#909399;
    margin-top: 20px;
  }

  .record-box {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    height: 350px;
  }

  .record-top {
    height: 50px;
    background: rgba(65, 53, 221, 0.85);
    color: #fff;
    font-size: 16px;
    line-height: 50px;
    text-align: center;
    border-radius: 2px 2px 0 0;
  }

  .record-form {
    padding-left: 10px;
    padding-top: 10px;

    .record-item {     
      line-height: 36px;
      display: flex;
    }

    .record-title {
      font-size: 15px;
      font-weight: 600;
      color: #17233d;
      width: 95px;
    }

    .record-icon {
      margin-right: 5px;
    }

    .record-value {
      font-size: 14px;
      color: #606266;
      z-index: 1000;
    }
  }

  .record-img {
    width: 170px;
    height: 170px;
    float: right;
    margin-top: -100px;

    img {
      height: 100%;
      width: 100%;
      opacity: 0.8;
    }
  }
</style>