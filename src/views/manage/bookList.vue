<template>
    <div class="roomList">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small" label-width="85px">
            <el-form-item label="会议日期：">
                <el-date-picker v-model="formInline.date" type="date" placeholder="请选择日期" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="建筑楼：">
                <el-select v-model="formInline.building" placeholder="请选择建筑楼" clearable>
                    <el-option v-for="item in buildingList" :label="item.buildingName" :value="item.id"></el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search" @click="query" class="query-button">查询</el-button>
            </el-form-item>
        </el-form>

        <el-table v-loading="listLoading" :data="tableData" :cell-style="{padding:'2px'}"
            :header-cell-style="{background:'#f8f8f9',color:'#333','font-weight': '600'}">
            <el-table-column v-for="item in columns" :prop="item.prop" :label="item.label">
            </el-table-column>
            <el-table-column label="会议时间">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    {{scope.row.startTime + '~' + scope.row.endTime}}
                </template>
            </el-table-column>
            <el-table-column label="审批人" prop="approvePerson"></el-table-column>
            <el-table-column label="审批状态">
                <template slot-scope="scope">
                    <el-tag :type="!scope.row.approveResult?'info':scope.row.approveResult==1?'success':'danger'">
                        {{!scope.row.approveResult?'未审批':scope.row.approveResult==1?'通过':'驳回'}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="其他信息">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <i class="el-icon-location"></i>位置：
                        {{scope.row.building |change(buildingList,'id','buildingName')}}{{scope.row.roomLocation}}<br />
                        <i class="el-icon-data-analysis"></i>设备：
                        <el-tag v-if="scope.row.projector" size="small" class="tag">投影仪</el-tag>
                        <el-tag type="success" v-if="scope.row.display" size="small" class="tag">显示屏</el-tag>
                        <el-tag type="warning" v-if="scope.row.blackboard" size="small" class="tag">黑板</el-tag>
                        <el-tag type="danger" v-if="scope.row.whiteboard" size="small" class="tag">白板</el-tag>
                        <div v-if="scope.row.approveResult==2">
                            <i class="el-icon-tickets"></i>驳回原因：
                            {{scope.row.rejectReason}}
                        </div>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">鼠标悬停查看</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="pagination" @size-change="sizeChange" @current-change="currentChange"
            :current-page="formInline.page" :page-size="formInline.pageSize" :page-sizes="[10, 15, 20, 25]" background
            layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
    </div>
</template>
<script>
    import {
        buildingList,
        projectorList
    } from '@/utils/index.js'
    import {
        meetingList
    } from '@/api/manage/bookList.js'
    export default {
        data() {
            return {
                formInline: { // 查询关键字段
                    page: 1,
                    pageSize: 10
                },
                listLoading: false, // 表格是否加载
                tableData: [], // 表格数据
                total: 0, // 总条数
                buildingList: buildingList,
                projectorList: projectorList,
                columns: [ // 列
                    {
                        label: '预订人',
                        prop: 'bookPerson',
                    },
                    {
                        label: '会议室名称',
                        prop: 'roomName',
                    },
                    {
                        label: '会议主题',
                        prop: 'meetingTheme',
                    },
                    {
                        label: '参会人数',
                        prop: 'meetingNum',
                    },
                    {
                        label: '会议日期',
                        prop: 'meetingDate',
                    },
                ]
            }
        },
        created() {
            this.getBookList()
        },
        methods: {
            // 获取预约列表
            getBookList() {
                this.listLoading = true
                meetingList(this.formInline).then(res => {
                    this.tableData = res.data.list
                    this.total = res.data.count
                    this.listLoading = false
                })
            },
            // 查询
            query() {
                this.formInline.page = 1
                this.formInline.pageSize = 10
                this.getBookList()
            },
            // 每页条数改变
            sizeChange(val) {
                this.formInline.pageSize = val
                this.getBookList()
            },
            // 当前页改变
            currentChange(val) {
                this.formInline.page = val
                this.getBookList()
            },
        }
    }
</script>
<style lang="scss" scoped>

</style>