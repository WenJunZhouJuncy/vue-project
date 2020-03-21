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
  </div>
</template>

<script>
  import {requestUrl} from '@/api/commonUrl'
export default {
  name: "myTable",
  props:{
    propsTableData:{
      type: Object,
      default: null
    }
  },
  data(){
    return{
      tableData: [
        {
          mail: '123',
          name: '张三',
          phone: '13132131',
          region: '广东',
          role: '管理员'
        }
      ]
    }
  },
  created() {
    console.log(requestUrl);
  },
  methods: {
    selectionChange() {

    }
  }
}
</script>

<style scoped>

</style>