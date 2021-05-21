<template>
  <div class="approve">
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
      <el-form-item label="审批状态：">
        <el-select v-model="formInline.status" placeholder="请选择审批状态" clearable>
          <el-option v-for="item in statusList" :label="item.adminName" :value="item.id"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="query" class="query-button">查询</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="20">
      <el-col :sm="12" :md="8" :lg="6" v-for="item in approveList" style="margin-bottom: 40px;">
        <div class="approve-box" @click="goDetail(item)">
          <div class="box-header bg-blur"></div>
          <div class="box-main">
            <div class="box-title">{{item.building |change(buildingList,'id','buildingName')}}{{item.roomName}}
            </div>
            <div class="box-item"><i class="el-icon-user-solid box-icon"></i>{{item.bookPerson}}</div>
            <div class="box-item"><i class="el-icon-star-on box-icon"></i>{{item.meetingTheme}}</div>
            <div class="box-item"><i class="el-icon-s-help box-icon"></i>{{item.meetingDate}}
              {{item.startTime}}~{{item.endTime}}</div>
            <div class="box-status"
              :style="{color:item.approveResult==1? '#67C23A' : item.approveResult==2? '#F56C6C' : '#4135DD'}">
              {{item.approveResult | change(statusList,'id','adminName')}}</div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-pagination class="pagination" @size-change="sizeChange" @current-change="currentChange"
      :current-page="formInline.page" :page-size="formInline.pageSize" :page-sizes="[8, 16, 24, 32]" background
      layout="total, sizes, prev, pager, next, jumper" :total="total" style="margin-top:-30px">
    </el-pagination>
  </div>
</template>
<script>
  import {
    buildingList,
    statusList
  } from '@/utils/index.js'
  import {
    meetingList
  } from '@/api/manage/bookList.js'
  export default {
    data() {
      return {
        formInline: {// 查询条件
          page:1,
          pageSize:8
        }, 
        total: 0, // 总条数
        buildingList: buildingList,
        statusList: statusList,
        approveList: []
      }
    },
    created() {
      this.getApproveList()
    },
    methods: {
      // 获取审批列表
      getApproveList() {
        meetingList(this.formInline).then(res => {
          this.approveList = res.data.list
          this.total = res.data.count
        })
      },
      // 详情页
      goDetail(item) {
        this.$router.push({
          path: '/manage/approveDetail?id=' + item.id
        })
      },
      // 查询
      query() {
        this.formInline.page = 1
        this.formInline.pageSize = 8
        this.getApproveList()
      },
      // 每页条数改变
      sizeChange(val) {
        this.formInline.pageSize = val
        this.getApproveList()
      },
      // 当前页改变
      currentChange(val) {
        this.formInline.page = val
        this.getApproveList()
      },
    },
  }
</script>
<style lang="scss" scoped>
  .approve-box {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    height: 280px;

    .box-header {
      background: url(../../assets/images/meetingRoom.png) no-repeat center;
      background-size: 100% 100%;
      height: 180px;
    }

    .box-main {
      padding: 0px 15px 0 10px;
    }

    .box-title {
      font-size: 18px;
      font-weight: 600;
      color: #303133;
      letter-spacing: 2px;
      text-align: center;
      position: relative;
      top: -100px;
    }

    .box-item {
      color: #606266;
      line-height: 18px;
      font-size: 13px;
    }

    .box-icon {
      font-size: 16px;
      margin-right: 5px;
      color: #4135DD;
    }

    .box-status {
      float: right;
      font-size: 15px;
      cursor: pointer;
    }

    .bg-blur {
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      -webkit-filter: blur(2px);
      -moz-filter: blur(2px);
      -o-filter: blur(2px);
      -ms-filter: blur(2px);
      filter: blur(2px);
    }
  }
</style>