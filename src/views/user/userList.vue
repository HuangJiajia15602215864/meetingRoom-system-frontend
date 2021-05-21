<template>
  <div class="userList">
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small" label-width="85px">
      <el-form-item label="用户名：">
        <el-input v-model="formInline.username" placeholder="请填写用户名" clearable></el-input>
      </el-form-item>
      <el-form-item label="用户角色：">
        <el-select v-model="formInline.role" placeholder="请选择用户角色" clearable>
          <el-option label="管理员" value="1"></el-option>
          <el-option label="普通用户" value="0"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="query" class="query-button">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="listLoading" :data="tableData" :cell-style="{padding:'2px'}"
      :header-cell-style="{background:'#f8f8f9',color:'#333','font-weight': '600'}">
      <el-table-column v-for="item in columns" :prop="item.prop" :label="item.label" align="center"></el-table-column>
      <el-table-column prop="role" label="用户角色" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.role == 1 ? 'warning' : 'primary'">{{scope.row.role == 1 ? '管理员' : '普通用户'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-refresh" @click="updateRole(scope.row)">
            {{scope.row.role == 1 ? '移除管理员' : '设为管理员'}}</el-button>
          <el-button type="text" icon="el-icon-delete" @click="remove(scope.row)" class="delete">删除</el-button>
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
    userList,
    userDelete,
    userUpdate
  } from '@/api/user/index'
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
        columns: [ // 列
          {
            label: '用户ID',
            prop: 'id',
          },
          {
            label: '用户名',
            prop: 'username',
          },
          {
            label: '创建时间',
            prop: 'created_at',
          },
          {
            label: '更新时间',
            prop: 'updated_at',
          }
        ]
      }
    },
    created() {
      this.getUserList()
    },
    methods: {
      // 获取用户列表
      getUserList() {
        this.listLoading = true
        userList(this.formInline).then(res => {
          this.tableData = res.data.list
          this.total = res.data.count
          this.listLoading = false
        })
      },
      // 更新用户名
      updateRole(row) {
        this.$confirm(`确定将${row.username}更新为 【${row.role==1 ? '普通用户' : '管理员'}】 ？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          iconClass: 'el-icon-warning colorRed'
        }).then(() => {
          userUpdate({
            id: row.id,
            role:row.role==1 ? 0 : 1
          }).then(res => {
            this.$message({
              type: 'success',
              message: '更新成功!'
            });
            this.getUserList()
          })
        }).catch(err => {});
      },
      // 更新用户名
      remove(row) {
        this.$confirm(`确定删除 【${row.username}】用户？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          iconClass: 'el-icon-warning colorRed'
        }).then(() => {
          userDelete({
            id: row.id
          }).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            if(this.tableData.length == 1 && this.total != 1){
              this.formInline.page --
            }
            this.getUserList()
          })
        }).catch(err => {});
      },
      // 查询
      query() {
        this.formInline.page = 1
        this.formInline.pageSize = 10
        this.getUserList()
      },
      // 每页条数改变
      sizeChange(val) {
        this.formInline.pageSize = val
        this.getUserList()
      },
      // 当前页改变
      currentChange(val) {
        this.formInline.page = val
        this.getUserList()
      },
    }
  }
</script>
<style lang="scss" scoped>

</style>