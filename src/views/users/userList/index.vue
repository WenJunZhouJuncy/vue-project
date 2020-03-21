<template>
  <div class="userList">
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
        <el-button>添加用户</el-button>
      </div>
    </div>
    <div class="table_box">
      <myTable :propsTableData="propsTableData">
        <template v-slot:slotState="slotData">
          <el-switch
            v-model="switch_val"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
        <template v-slot:slotOperation="slotData">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(slotData.tableSlotData)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="confirmDel(slotData.tableSlotData)">删除</el-button>
        </template>
      </myTable>
    </div>
  </div>
</template>

<script>
import {requestUrl} from '@/api/commonUrl'
import myTable from "@/components/myTable";
export default {
  name: "userList",
  components:{
    myTable
  },
  data() {
    return {
      options_val: '',
      search_val: '',
      switch_val: false,
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
      propsTableData: {
        selection: true,  //多选框
        theader: [      //表格头部标题
          {
            title: '邮箱',
            prop: 'title'
          },{
            title: '姓名',
            prop: 'name'
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
        requestParmas:{   //请求参数
          url:requestUrl.getList,
          method: 'post',
          data:{
            pageNumber: 1,
            pageSize: 10
          }
        }
      }
    }
  },
  methods: {
    handleEdit(){

    },
    confirmDel(){

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
      /*display: flex;*/
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