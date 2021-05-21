<template>
    <div class="roomList">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small" label-width="70px">
            <el-button type="success" icon="el-icon-plus" @click="add" size="small" style="float:right">新增</el-button>
            <el-form-item label="名称：">
                <el-input v-model="formInline.roomName" placeholder="请填写名称" clearable></el-input>
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
            <el-table-column label="位置">
                <template slot-scope="scope">
                    <i class="el-icon-location"></i>
                    {{scope.row.building |change(buildingList,'id','buildingName')}}{{scope.row.roomLocation}}
                </template>
            </el-table-column>
            <el-table-column prop="projector" label="设备">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.projector" size="small" class="tag">投影仪</el-tag>
                    <el-tag type="success" v-if="scope.row.display" size="small" class="tag">显示屏</el-tag>
                    <el-tag type="warning" v-if="scope.row.blackboard" size="small" class="tag">黑板</el-tag>
                    <el-tag type="danger" v-if="scope.row.whiteboard" size="small" class="tag">白板</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-edit" @click="edit(scope.row)">编辑</el-button>
                    <el-button type="text" icon="el-icon-delete" @click="remove(scope.row)" class="delete">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="pagination" @size-change="sizeChange" @current-change="currentChange"
            :current-page="formInline.page" :page-size="formInline.pageSize" :page-sizes="[10, 15, 20, 25]" background
            layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>

        <el-dialog :title="dialogType==1? '新增会议室' : '编辑会议室'" :visible.sync="dialogVisible" width="500px">
            <div class="dialog-img">
                <img src="@/assets/images/add.png" v-if="dialogType==1">
                <img src="@/assets/images/edit.png" v-if="dialogType==2">
            </div>
            <el-form :model="form" ref="form" :rules="formRules" size="small" label-position="right"
                label-width="110px">
                <el-form-item label="会议室名称：" prop="roomName">
                    <el-input v-model="form.roomName" style="width:300px" clearable></el-input>
                </el-form-item>
                <el-form-item label="建筑楼：" prop="building">
                    <el-select v-model="form.building" style="width:300px">
                        <el-option v-for="item in buildingList" :label="item.buildingName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="会议室编号：" prop="roomLocation">
                    <el-input v-model="form.roomLocation" style="width:300px" clearable></el-input>
                </el-form-item>
                <el-form-item label="容纳人数：" prop="roomNum">
                    <el-input v-model="form.roomNum" style="width:300px" clearable></el-input>
                </el-form-item>
                <el-form-item label="设备：" prop="equipment">
                    <el-checkbox-group v-model="equipment">
                        <el-checkbox v-for="(item,index) in projectorList" :label="item.id" :key="item.id">
                            {{item.projectorName}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="sure" size="small">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {
        buildingList,
        projectorList
    } from '@/utils/index.js'
    import {
        roomList,
        roomAdd,
        roomUpdate,
        roomDelete
    } from '@/api/manage/config.js'
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
                dialogVisible: false, // 弹出框是否可见
                dialogType: 1, // 弹出框类型 1:新增；2：编辑
                form: {}, // 弹出框表单
                equipment: [],
                formRules: {
                    roomName: [{
                        required: true,
                        message: '请输入会议室名称',
                        trigger: 'change'
                    }],
                    building: [{
                        required: true,
                        message: '请选择建筑楼',
                        trigger: 'change'
                    }],
                    roomLocation: [{
                        required: true,
                        message: '请输入会议室编号',
                        trigger: 'change'
                    }],
                    roomNum: [{
                        required: true,
                        message: '请输入会议室容纳人数',
                        trigger: 'change'
                    }]
                },
                columns: [ // 列
                    {
                        label: '会议室名称',
                        prop: 'roomName',
                    },
                    {
                        label: '容纳人数',
                        prop: 'roomNum',
                    }
                ]
            }
        },
        created() {
            this.getRoomList()
        },
        methods: {
            // 获取会议室列表
            getRoomList() {
                this.listLoading = true
                roomList(this.formInline).then(res => {
                    this.tableData = res.data.list
                    this.total = res.data.count
                    this.listLoading = false
                })
            },
            // 新增
            add() {
                this.dialogVisible = true
                this.dialogType = 1
                this.equipment = []
                if (this.$refs['form']) {
                    this.$refs['form'].resetFields()
                }
            },
            // 更新
            edit(row) {
                this.dialogVisible = true
                this.dialogType = 2
                if (this.$refs['form']) {
                    this.$refs['form'].resetFields()
                }
                this.form = Object.assign({}, row)
                this.equipment = this.getArrByRow(row)
            },
            // 确定
            sure() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        let params = Object.assign({}, this.form, this.getRowByArr(this.equipment))
                        let request = this.dialogType == 1 ? roomAdd : roomUpdate
                        request(params).then(res => {
                            this.$message({
                                type: 'success',
                                message: '成功!'
                            });
                            this.getRoomList()
                            this.dialogVisible = false
                        })
                    }
                })
            },
            // 根据row返回数组
            getArrByRow(row) {
                var arr = []
                for (let i = 0; i < this.projectorList.length; i++) {
                    if (row[this.projectorList[i].field]) {
                        arr.push(i + 1)
                    }
                }
                return arr
            },
            // 根据数组返回row
            getRowByArr(arr) {
                var obj = {}
                for (let i = 0; i < this.projectorList.length; i++) {
                    obj[this.projectorList[i].field] = arr.includes(i + 1) ? 1 : 0
                }
                return obj
            },
            // 删除
            remove(row) {
                this.$confirm(`确定删除 【${row.roomName}】会议室？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    iconClass: 'el-icon-warning colorRed'
                }).then(() => {
                    roomDelete({
                        id: row.id
                    }).then(res => {
                        this.$message({
                            type: 'success',
                            message: '成功!'
                        });
                        if (this.tableData.length == 1 && this.total != 1) {
                            this.formInline.page--
                        }
                        this.getRoomList()
                    })
                }).catch(err => {});
            },
            // 查询
            query() {
                this.formInline.page = 1
                this.formInline.pageSize = 10
                this.getRoomList()
            },
            // 每页条数改变
            sizeChange(val) {
                this.formInline.pageSize = val
                this.getRoomList()
            },
            // 当前页改变
            currentChange(val) {
                this.formInline.page = val
                this.getRoomList()
            },
        }
    }
</script>
<style lang="scss" scoped>

</style>