<template>
  <div class="userList">
    <addUserDialog ref="dialog" @getTableData="$refs.myTable.getTableData()"></addUserDialog>
    <div class="header_box mgb30">
      <div class="header_left">
        <span class="mgr10">关键字:</span>
        <el-select class="mgr30" v-model="options_val" style="width: 120px" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input class="mgr10" v-model="search_val" style="width: 220px" placeholder="请输入内容"></el-input>
        <el-button>搜索</el-button>
      </div>
      <div class="header_rigth">
        <el-button @click="$refs.dialog.dialogShow()">添加用户</el-button>
      </div>
    </div>
    <div class="table_box">
      <myTable ref="myTable" :propsTableData="propsTableData" :userList.sync="userList" :userDelete="userDelete">
        <template v-slot:slotState="slotData">
          <el-switch
            v-model="slotData.tableSlotData.status"
            active-value="2"
            inactive-value="1"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :disabled="switchStatus"
            @change="handleSwitch(slotData.tableSlotData)">
          </el-switch>
        </template>
        <template v-slot:slotOperation="slotData">
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="primary"-->
<!--            @click="handleEdit(slotData.tableSlotData)">编 辑</el-button>-->
          <el-button
            size="mini"
            type="danger"
            @click="confirmDel(slotData.tableSlotData)">删 除</el-button>
        </template>
      </myTable>
    </div>
  </div>
</template>

<script>
import { requestUrl } from '@/api/commonUrl'
import { apiDeleteTableData } from '@/api/common'
import { apiUserActives } from '@/api/userList'
import myTable from "@/components/myTable"
import addUserDialog from "@/views/users/components/addUserDialog"
export default {
  name: "userList",
  components:{
    myTable,
    addUserDialog
  },
  data() {
    return {
      options_val: '',
      search_val: '',
      switch_val: false,
      switchStatus: false,
      options: [
        {
          value: 'phone',
          label: '手机号'
        },
        {
          value: 'name',
          label: '姓名'
        }
      ],
      // 表格封装组件
      propsTableData: {
        selection: true,  //多选框
        theader: [      //表格头部标题
          {
            title: '邮箱',
            prop: 'username'
          },{
            title: '姓名',
            prop: 'truename'
          },{
            title: '手机号',
            prop: 'phone'
          },{
            title: '地区',
            prop: 'region'
          },{
            title: '角色',
            prop: 'role'
          },{
            title: '禁启用状态',
            prop: 'state',
            slot: 'slotState'
          },{
            title: '操作',
            prop: 'operation',
            slot: 'slotOperation'
          }
        ],
      },
      //请求获取用户
      userList: {
        url: requestUrl.getUserList,
        method: 'post',
        data: {
          username: "",
          truename: "",
          phone: "",
          pageNumber: 1,
          pageSize: 10
        }
      },
      //请求删除用户
      userDelete: {
        url: requestUrl.userDelete,
        method: 'post',
        data: {
          id: []
        }
      }
    }
  },
  methods: {
    // 编辑用户
    handleEdit(val) {
      this.$refs.dialog.dialogShow()
      console.log(val);
    },
    // 提示删除用户
    confirmDel(val) {
      this.confirmMsg('删除该用户后将无法恢复，确定要继续吗？')
        .then(() => {
          let parmas = {
            url: requestUrl.userDelete,
            data: {
              id: [val.id]
            }
          }
          this.deleteUser(parmas)
        })
        .catch(() => {
          this.$message({
            type:'info',
            message:'已取消删除'
          });
        });
    },
    // 删除用户
    deleteUser(parmas){
      apiDeleteTableData(parmas)
        .then(res => {
          this.$message({
            type: 'success',
            message: res.message
          })
          this.$refs.myTable.getTableData()
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err.message
          })
        })
    },
    // 用户禁启用
    handleSwitch(val) {
      // 禁用switch
      this.switchStatus = true
      let parmas = {
        id: val.id,
        status: val.status
      }
      apiUserActives(parmas)
        .then(res => {
          this.$message({
            type: "success",
            message: res.message
          })
          // 启用switch
          this.switchStatus = false
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err.message
          })
          // 启用switch
          this.switchStatus = false
        })
    }
  }
}
</script>

<style lang="scss">
.userList{
  .header_box{
    display: flex;
    justify-content: space-between;
    .header_left{
      font-size: 16px;
      color: #333;
      button{
        color: #fff;
        background: #409eff;
      }
    }
    .header_rigth{
      button{
        color: #fff;
        background: #f56c6c;
      }
    }
  }
}
</style>