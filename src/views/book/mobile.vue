<template>
  <div class="mobileBook">
    <van-form colon :disabled="canBook">
      <van-field clickable name="calendar" :value="form.date" label="日期" placeholder="请选择日期"
        @click="showCalendar = true" required is-link @focus="noBomBox" />
      <van-calendar v-model="showCalendar" @confirm="selectDate" color="#132CF8" :min-date="minDate" :max-date="maxDate"
        :readonly="canBook" />

      <van-field clickable name="datetimePicker" :value="form.startTime" label="开始时间" placeholder="请选择开始时间"
        @click="showStartPicker = true" required is-link @focus="noBomBox" />
      <van-popup v-model="showStartPicker" position="bottom">
        <van-datetime-picker type="time" @confirm="selectStartTime" @cancel="showStartPicker = false" :min-hour="8"
          title="会议开始时间" :readonly="canBook" />
      </van-popup>

      <van-field clickable name="datetimePicker" :value="form.endTime" label="结束时间" placeholder="请选择结束时间"
        @click="showEndPicker = true" required is-link @focus="noBomBox" />
      <van-popup v-model="showEndPicker" position="bottom">
        <van-datetime-picker type="time" @confirm="selectEndTime" @cancel="showEndPicker = false" :min-hour="8"
          title="会议结束时间" :readonly="canBook" />
      </van-popup>

      <van-field name="stepper" label="参会人数" required>
        <template #input>
          <van-stepper v-model="form.num" min="2" max="100" integer input-width="40px" :disabled="canBook" />
        </template>
      </van-field>

      <van-field v-model="form.meetingTheme" name="会议主题" label="会议主题" placeholder="请输入会议主题" required autosize rows="1"
        type="textarea" clearable :disabled="canBook" />

      <van-field name="equipment" label="选择设备">
        <template #input>
          <van-tag :plain="!form.projector" type="primary" @click="form.projector =!form.projector?1:0" class="tag"
            size="large" :color="canBook?'#c8c9cc':'#132CF8'">
            投影仪</van-tag>
          <van-tag :plain="!form.display" type="primary" @click="form.display = !form.display?1:0" class="tag"
            size="large" :color="canBook?'#c8c9cc':'#132CF8'">显示屏
          </van-tag>
          <van-tag :plain="!form.blackboard" type="primary" @click="form.blackboard = !form.blackboard?1:0" class="tag"
            size="large" :color="canBook?'#c8c9cc':'#132CF8'">黑板
          </van-tag>
          <van-tag :plain="!form.whiteboard" type="primary" @click="form.whiteboard = !form.whiteboard?1:0" class="tag"
            size="large" :color="canBook?'#c8c9cc':'#132CF8'">白板
          </van-tag>
        </template>
      </van-field>
      <van-field clickable name="picker" :value="form.buildingName" label="建筑楼" placeholder="请选择建筑楼"
        @click="showBuildingPicker = true" is-link @focus="noBomBox" />
      <van-popup v-model="showBuildingPicker" position="bottom">
        <van-picker show-toolbar :columns="buildingList" value-key="buildingName" @confirm="selectBuilding"
          @cancel="showBuildingPicker = false" :readonly="canBook" />
      </van-popup>
      </van-field>

      <div style="margin: 20px;" @click="search" v-if="!canBook">
        <van-button round block color="linear-gradient(to right bottom, #132CF8, #23A4F7)" @click="search">
          查询会议室
        </van-button>
      </div>
    </van-form>

    <van-field clickable name="picker" :value="form.roomId" label="选择会议室" placeholder="请选择会议室"
      @click="showPicker = true" required is-link v-if="canBook" @focus="noBomBox" />
    <van-popup v-model="showPicker" position="bottom">
      <van-picker show-toolbar :columns="roomList" value-key="roomName" @confirm="selectRoom"
        @cancel="showPicker = false">
      </van-picker>
    </van-popup>
    </van-field>

    <div style="margin: 20px;" v-if="canBook">
      <van-button round block color="linear-gradient(to right bottom, #132CF8, #23A4F7)" @click="sure">
        预定
      </van-button>
      <van-button round block @click="reForm" style="margin-top:8px">
        重新填写选项
      </van-button>
    </div>

  </div>
</template>
<script>
  import {
    Form,
    Calendar,
    DatetimePicker,
    Field,
    Stepper,
    Tag,
    Icon,
    Picker,
    Toast
  } from 'vant';
  import {
    parseTime,
    getDate,
    buildingList,
    change
  } from '@/utils/index.js'
  import {
    selectByCondition,
    meetingBook
  } from '@/api/book/index.js'
  export default {
    data() {
      return {
        form: {
          date: parseTime(new Date(), '{y}-{m}-{d}'),
          startTime: parseTime(new Date(), '{h}:{i}'),
          endTime: parseTime(new Date(), '{h}:{i}'),
          num: 2,
          meetingTheme: '',
          projector: 0,
          display: 0,
          blackboard: 0,
          whiteboard: 0,
          roomId: '',
          buildingName: '',
        },
        showCalendar: false,
        minDate: new Date(),
        maxDate: new Date(new Date().setDate(new Date().getDate() + 6)),
        showStartPicker: false,
        showEndPicker: false,
        showPicker: false,
        showBuildingPicker: false,
        roomList: [],
        buildingList: buildingList,
        canBook: false,
      }
    },
    components: {
      Form,
      Calendar,
      DatetimePicker,
      Field,
      Stepper,
      Tag,
      Icon,
      Picker,
      Toast
    },
    created() {},
    computed: {},
    methods: {
      selectDate(date) {
        this.form.date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        this.showCalendar = false;
      },
      selectStartTime(time) {
        this.form.startTime = time
        this.showStartPicker = false;
      },
      selectEndTime(time) {
        this.form.endTime = time
        this.showEndPicker = false;
      },
      selectRoom(val) {
        this.form.roomId = val.roomName;
        this.showPicker = false;
      },
      selectBuilding(val, index) {
        this.form.buildingName = val.buildingName;
        this.showBuildingPicker = false;
      },
      reForm() {
        this.canBook = false
      },
      // 查询会议室
      search() {
        const toast = Toast.loading({
          forbidClick: true,
          message: '查询ing',
        });
        let params = {
          ...this.form,
          building: this.form.buildingName ? this.buildingList.find((ele) => {
            return ele.buildingName == this.form.buildingName
          }).id : ''
        }
        selectByCondition(params).then(res => {
          Toast.clear();
          this.canBook = true

          for(let i=0;i<res.data.length;i++){
            res.data[i].roomName = res.data[i].roomName + '(' + change(res.data[i].building,this.buildingList,'id','buildingName') + ')'
          }
          this.roomList = res.data
        })
      },
      // 预订会议室
      sure() {
        let params = {
          ...this.form,
          roomId: this.roomList.find((ele) => {
            return ele.roomName == this.form.roomId
          }).id
        }
        meetingBook(params).then(res => {
          Toast.success('预订成功,等待审批！');
          this.$router.push('/mobileRecord')
        })
      },
      // 点击时禁止弹出手机键盘
      noBomBox(Event) {
        document.activeElement.blur();
      }
    },
  }
</script>
<style lang="scss" scoped>
  .tag {
    margin-right: 10px !important;
    padding: 5px;
  }

  .search {
    margin: 10px 0 0 10px;
    cursor: pointer;
    display: flex;

    .search-text {
      font-size: 16px;
      line-height: 32px;
      color: #132CF8;
      margin-bottom: 10px;
    }
  }
</style>