<template>
  <div>
    <el-steps :active="stepActive" simple>
      <el-step title="1：填写会议信息" icon="el-icon-edit"></el-step>
      <el-step title="2：选择会议室" icon="el-icon-thumb"></el-step>
      <el-step title="3：等候审批" icon="el-icon-loading"></el-step>
    </el-steps>
    <div class="bookForm" v-if="stepActive==1">
      <el-form ref="form" :model="form" :rules="formRules" label-width="100px" size="small">
        <el-form-item label="日期：" prop="date">
          <el-date-picker type="date" v-model="form.date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="起止时间：" prop="time">
          <el-input v-model="form.time[0]" style="width: 100px;"></el-input> 至 
          <el-input v-model="form.time[1]" style="width: 100px;"></el-input>
        </el-form-item>
        <el-form-item label="参会人数：" prop="num">
          <el-input-number v-model="form.num" :min="2" :max="200"></el-input-number>
        </el-form-item>
        <el-form-item label="会议主题：" prop="meetingTheme">
          <el-input placeholder="请输入会议主题" v-model="form.meetingTheme" clearable style="width:95%"></el-input>
        </el-form-item>
        <el-form-item label="选择设备：">
          <el-checkbox-group v-model="equipment">
            <el-checkbox v-for="(item,index) in projectorList" :label="item.id" :key="item.id">
              {{item.projectorName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="选择建筑楼：" prop="building">
          <el-select v-model="form.building" clearable placeholder="请选择" size="small">
            <el-option v-for="item in buildingList" :label="item.buildingName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="query" type="primary" icon="el-icon-search">查询会议室</el-button>
        </el-form-item>
      </el-form>
      <img src="@/assets/images/writeCondition.png"></img>
    </div>
    <div class="bookForm" v-if="stepActive==2">
      <span class="bookTitle">选择会议室：</span>
      <el-select v-model="form.roomId" clearable placeholder="请选择" size="small" no-data-text="未匹配到符合条件的会议室！">
        <el-option v-for="item in roomList" :value="item.id" :label="item.roomName">
          {{item.roomName}} ({{ item.building | change(buildingList,'id','buildingName')}})
        </el-option>
      </el-select>
      <div class="bookButton">
        <el-button @click="back" icon="el-icon-back" size="small">返回上一步</el-button>
        <el-button @click="sure" type="primary" icon="el-icon-circle-check" size="small">预订会议室</el-button>
      </div>
      <img src="@/assets/images/selectRoom.png"></img>
    </div>
    <div class="bookSuccess" v-if="stepActive==3">
      <img src="@/assets/images/success.png"><br />
      预订成功，请等待管理员审批！
      <el-button @click="bookAgain" icon="el-icon-position" size="small" type="primary">再次预订</el-button>
    </div>
  </div>
</template>
<script>
  import {
    buildingList,
    projectorList,
    parseTime,
  } from '@/utils/index.js'
  import {
    selectByCondition,
    meetingBook
  } from '@/api/book/index.js'
  export default {
    data() {
      return {
        buildingList: buildingList,
        projectorList: projectorList,
        roomList: [], // 可选会议室列表
        stepActive: 1, // 当前步骤
        form: { // 预订表单
          date: parseTime(new Date(), '{y}-{m}-{d}'),
          time: [parseTime(new Date(), '{h}:{i}'), parseTime(new Date(), '{h}:{i}')],
          num: 2,
          meetingTheme: '',
          building: '',
          roomId: ''
        },
        equipment: [], // 设备选项
        pickerOptions:{
          disabledDate(time) {
            return time.getTime() > Date.now() + 518400000
          }
        },
        formRules: {
          date: [{
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }],
          time: [{
            type: 'array',
            required: true,
            message: '请选择起止时间',
            trigger: 'change'
          }],
          num: [{
            required: true,
            message: '请输入参会人数',
            trigger: 'change'
          }],
          meetingTheme: [{
            required: true,
            message: '请输入会议主题',
            trigger: 'change'
          }]
        }
      }
    },
    methods: {
      // 查询会议室
      query() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            let equipment = this.getRowByArr(this.equipment)
            let params = {
              ...equipment,
              num:this.form.num,
              building:this.form.building,
              date:this.form.date,
              startTime: this.form.time[0],
              endTime: this.form.time[1],
            }
            selectByCondition(params).then(res =>{
              this.roomList = res.data
              this.stepActive = 2
            })
            
          }
        });
      },
      // 预订会议室
      sure() {
        let params = {
          ...this.form,
          startTime: this.form.time[0],
          endTime: this.form.time[1],
        }
        meetingBook(params).then(res =>{
          this.stepActive = 3
        })
      },
      // 返回上一步
      back() {
        this.stepActive = 1
      },
      // 再次预订会议室
      bookAgain(){
        this.form = { 
          date: parseTime(new Date(), '{y}-{m}-{d}'),
          time: [parseTime(new Date(), '{h}:{i}'), parseTime(new Date(), '{h}:{i}')],
          num: 2,
          meetingTheme: '',
          building: '',
          roomId: ''
        }
        this.stepActive = 1
      },
      // 根据数组返回row
      getRowByArr(arr) {
        var obj = {}
        for (let i = 0; i < this.projectorList.length; i++) {
          obj[this.projectorList[i].field] = arr.includes(i + 1) ? 1 : 0
        }
        return obj
      },
    },
  }
</script>
<style lang="scss" scoped>
  .bookForm {
    margin-top: 20px;
  }

  .bookTitle {
    line-height: 32px;
    font-size: 14px;
    color: #606266;
    font-weight: 700;
  }

  .bookButton {
    margin: 30px 0 0 80px;
  }

  .bookSuccess {
    text-align: center;
    font-size: 16px;
    color: #909399;
    margin-top:50px;

    img {
      width: 150px;
      height: 150px;
    }
  }

  .bookForm{
    margin-left:33%;
    margin-right:30%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    padding:20px;
    background:#fff;
    padding-bottom:100px;

    img {
      margin-top:-80px;
      width: 200px;
      height: 150px;
      float:right;
    }
  }
</style>