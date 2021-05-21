<template>
  <div class="pcRecord">
    <el-tabs type="border-card" @tab-click="tabChange" v-model="activeTab">
      <el-tab-pane name="1">
        <span slot="label"><i class="el-icon-loading"></i> 未开始</span>
        <Record :recordList="recordList"></Record>
      </el-tab-pane>
      <el-tab-pane name="2">
        <span slot="label"><i class="el-icon-alarm-clock"></i> 正在进行</span>
        <Record :recordList="recordList"></Record>
      </el-tab-pane>
      <el-tab-pane name="0">
        <span slot="label"><i class="el-icon-error"></i> 已结束</span>
        <Record :recordList="recordList"></Record>
      </el-tab-pane>
      <el-pagination class="pagination" @size-change="sizeChange" @current-change="currentChange"
        :current-page="form.page" :page-size="form.pageSize" :page-sizes="[8, 16, 24, 32]" background
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-tabs>
  </div>
</template>
<script>
  import {
    buildingList
  } from '@/utils/index.js'
  import Record from '@/components/Record/index.vue'
  import {
    getRecordList
  } from '@/api/record/index.js'
  export default {
    components: {
      Record
    },
    data() {
      return {
        buildingList: buildingList,
        activeTab: '1', // 当前选中tab
        recordList: [], // 记录列表
        form: { // 页码
          page: 1,
          pageSize: 8
        },
        total: 0, // 总条数
      }
    },
    mounted() {
      this.getRecordList()
    },
    methods: {
      // 获取记录列表
      getRecordList() {
        let param = {
          statusId: this.activeTab,
          ...this.form
        }
        getRecordList(param).then(res =>{
          this.recordList = res.data.list
          this.total = res.data.count
          this.changeFormat()
        })
      },
      // 需将获取后的数据进行格式化
      changeFormat() {
        let str = ''
        for (let i = 0; i < this.total; i++) {
          str = ''
          this.recordList[i].location = this.buildingList.find((ele) => {
            return ele.id == this.recordList[i].building
          }).buildingName + this.recordList[i].roomLocation
          this.recordList[i].time = this.recordList[i].startTime + ' ~ ' + this.recordList[i].endTime
          str = (this.recordList[i].projector) ? '投影仪、' : ''
          str += (this.recordList[i].display) ? '显示屏、' : ''
          str += (this.recordList[i].whiteboard) ? '白板、' : ''
          str += (this.recordList[i].blackboard) ? '黑板、' : ''
          this.recordList[i].equipment = str
        }
      },
      // 选中tab改变
      tabChange() {
        this.form = {
          page: 1,
          pageSize: 8
        }
        this.getRecordList()
      },
      // 每页条数改变
      sizeChange(val) {
        this.form.pageSize = val
        this.getRecordList()
      },
      // 当前页改变
      currentChange(val) {
        this.form.page = val
        this.getRecordList()
      },
    },
  }
</script>
<style lang="scss" scoped>

</style>