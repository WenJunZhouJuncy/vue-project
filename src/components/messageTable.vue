<template>
    <div class="messageTable">
        <el-table
            border
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%">

            <el-table-column
                    type="selection"
                    width="55"
                    align="center"></el-table-column>

            <el-table-column
                    prop="title"
                    label="标题"
                    align="center"
                    :show-overflow-tooltip="true"></el-table-column>

            <el-table-column
                    prop="type"
                    label="类别"
                    min-width="30"
                    align="center"></el-table-column>

            <el-table-column
                prop="date"
                label="日期"
                min-width="50"
                align="center"></el-table-column>

            <el-table-column
                prop="name"
                label="管理人"
                min-width="40"
                align="center"></el-table-column>

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
    // import {messageBox} from '@/assets/js/utility'
  export default {
    name: "messageTable",
    data() {
      return {
        tableData: [
          {
            title:'亿万用户提供高效稳定便捷的电子',
            type: 'aaa',
            date: '2016-05-03',
            name: 'aadad',
          },
          {
            title:'腾讯公司2002年推出，向用',
            type: 'bbb',
            date: '2016-05-02',
            name: 'tryrtt',
          },
          {
            title:'亿万用户提供高效稳定便捷的电子',
            type: 'ccc',
            date: '2016-05-04',
            name: 'rtgfj',
          },
          {
            title:'务以高速电信骨干网为强大',
            type: 'ddd',
            date: '2016-05-01',
            name: 'ftyjcv',
          },
          {
            title:'户使用的比较多的一个邮',
            type: 'eee',
            date: '2016-05-08',
            name: 'awdads',
          },
        ],
      }
    },
    methods:{
      handleEdit(index,row){
        // console.log(index, row);
        this.$emit('tableRedact',index,row)
      },
      confirmDel(index,row){
        console.log(index, row);
        this.confirmMsg('您确定要删除该条信息吗？', this.deleteItem)
      },
      deleteItem(){
        console.log("已经删除啦!");
      }
    }
  };
</script>

<style scoped>

</style>