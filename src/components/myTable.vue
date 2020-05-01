<template>
<!--  已封装-->
  <div class="my_table">
    <el-table
      border
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      @selection-change="selectionChange"
      style="width: 100%">
<!--      多选框-->
      <el-table-column type="selection" v-if="propsTableData.selection" width="55" align="center"></el-table-column>

      <template v-for="item in propsTableData.theader">
<!--      表格内容-->
        <el-table-column :key="item.prop" v-if="!item.slot" :prop="item.prop" :label="item.title" align="center" :show-overflow-tooltip="true"></el-table-column>
<!--        插槽-->
        <el-table-column :key="item.prop" v-else :prop="item.prop" :label="item.title" align="center" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <slot :name="item.slot" :tableSlotData="scope.row"></slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
<!--    分页器-->
    <div :class="{myPageBoxFlex:userDelete,myPageBoxRigth:!userDelete,mgt30:true,}" >
      <el-button v-if="userDelete" @click="deleteListMsgAll">批量删除</el-button>
      <myPage :total="total" @currentChange="currentChange"></myPage>
    </div>
  </div>
</template>

<script>
import {apiLoadTableData, apiDeleteTableData} from '@/api/common'
import myPage from "@/components/myPage";
export default {
  name: "myTable",
  props: {
    propsTableData: {
      type: Object,
      default: null
    },
    userList: {
      type: Object,
      default: null
    },
    userDelete: {
      type: Object,
      default: null
    },
  },
  components: {
    myPage
  },
  data() {
    return {
      selectionChangeVal: [],
      total: 0,
      tableData: [

      ]
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    // 获取表格数据
    getTableData(){
      apiLoadTableData(this.userList)
        .then(res => {
          this.tableData = res.data.data;
          this.total = res.data.total
        }).catch(err => {
          this.$message({
            type: 'success',
            message: err.message
          })
        })
    },
    // 多选框改变时
    selectionChange(val) {
      this.selectionChangeVal = val
    },
    // 提示删除批量信息
    deleteListMsgAll() {
      if (this.selectionChangeVal.length > 0) {
        this.confirmMsg('删除所选数据后将无法恢复，确定要继续吗？')
          .then(() => {
            this.deleteAllList()
          })
          .catch(() => {
            this.$message({
              type:'info',
              message:'已取消删除'
            });
          });
      } else {
        this.$message({
          type: 'error',
          message: '请选择数据后再操作！'
        });
      }
    },
    // 批量删除
    deleteAllList() {
      let id = this.selectionChangeVal.map(e => e.id)
      this.userDelete.data.id = id
      apiDeleteTableData(this.userDelete).
        then(res => {
          this.$message({
            type: 'success',
            message: res.message
          })
          this.getTableData()
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err.message
          })
        })
    },
    // 分页器改变时
    currentChange(val) {
      let {data} = this.userList
      data.pageNumber = val
      this.$emit("update:userList",{...this.userList,data})
      // 发送请求
      this.getTableData()
    }
  }
}
</script>

<style lang="scss">
.my_table{
  .myPageBoxFlex{
    display: flex;
    justify-content: space-between;
  }
  .myPageBoxRigth{
    text-align: right;
  }
}

</style>