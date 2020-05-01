<template>
<!--  未封装-->
  <div class="messageTable">
    <el-table
      border
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      @selection-change="selectionChange"
      style="width: 100%">

      <el-table-column type="selection" width="55" align="center"></el-table-column>

      <el-table-column prop="title" label="标题" align="center" :show-overflow-tooltip="true"></el-table-column>

      <el-table-column
        prop="categoryId"
        label="类别"
        min-width="30"
        :formatter="matterType"
        align="center"></el-table-column>

      <el-table-column
        prop="createDate"
        label="日期"
        min-width="50"
        sortable
        :formatter="matterTime"
        align="center"></el-table-column>

      <el-table-column
        label="管理人"
        min-width="40"
        align="center">
        juncy
      </el-table-column>

      <el-table-column label="操作" width="145">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="confirmDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {timestampToTime} from '@/assets/js/utility'
export default {
  name: "messageTable",
  props: {
    tableData:{
      type: Array,
      default: null
    },
    typeOptions:{
      type: Array,
      default: null
    }
  },
  data() {
    return {
      selectionChangeVal: [],
    }
  },
  methods: {
    matterTime(row, column, cellValue, index){
      return timestampToTime(cellValue)
    },
    matterType(row, column, cellValue, index){
      let e = this.typeOptions.find(e => cellValue == e.id)
      return e.category_name
    },
    //编辑
    handleEdit(index,row){
      this.$router.push({path:'/messageManage/messageEdit',query:{type:'edit'}})
      sessionStorage.setItem('row',JSON.stringify(row))
    },
    // 删除
    confirmDel(index, row){
      console.log(row);
      this.$emit('deleteListMsg', row)
    },
    // 表格多选框发生改变时(进行批量删除操作)
    selectionChange (val){
      this.selectionChangeVal = val;
    },
  }
};
</script>

<style scoped>

</style>