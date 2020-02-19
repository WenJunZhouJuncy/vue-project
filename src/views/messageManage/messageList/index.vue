<template>
  <div class="messageList">
    <msgListDialog ref="dialog" :typeOptions="typeOptions" :alterTableRow="alterTableRow" @addListMsg="addListMsg" @alterListMsg="alterListMsg"></msgListDialog>
    <div class="top_box mgb30">
      <div class="type_box mgr30">
        <span class="mgr10">类别:</span>
        <el-select class="option" v-model="typeVal" filterable clearable placeholder="请选择" @change="handlTypeChange">
          <el-option
            v-for="item in typeOptions"
            :key="item.id"
            :label="item.category_name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="time_box mgr30">
        <span class="mgr10">日期:</span>
        <el-date-picker
          v-model="timeVal"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="handlTimeChange">
        </el-date-picker>
      </div>
      <div class="keyword_box mgr30">
        <span class="mgr10">关键字:</span>
        <el-select class="option" v-model="keyVal" filterable clearable placeholder="请选择">
          <el-option
            v-for="item in keyOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="search_box mgr30">
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="searchVal">
        </el-input>
        <el-button @click="getTableMsg" :disabled="tableLoading">搜索</el-button>
      </div>
      <div class="append_box">
        <el-button @click="dialogShow">新增</el-button>
      </div>
    </div>
    <div class="table_box mgb30">
      <mytable ref="mytable" :tableData="tableData" :tableLoading="tableLoading" :typeOptions="typeOptions" @dialogShow="dialogShow" @deleteListMsg="deleteListMsg"></mytable>
    </div>
    <div class="foote_box">
      <el-button @click="deleteListMsgAll">批量删除</el-button>
      <mypage :total="total" @currentChange="currentChange"></mypage>
    </div>
  </div>
</template>

<script>
import mytable from '@/components/messageTable';
import mypage from '@/components/myPage';
import msgListDialog from "@/views/messageManage/components/msgListDialog";
import {apiGetListMsg, apiAddListMsg, apiEditInfo, apiDeleteInfo} from '@/api/messageList'
import {commonGetCategory} from '@/api/common'
export default {
  name: "messageList",
  components: {
    mytable,
    mypage,
    msgListDialog
  },
  data() {
    return {
      tableLoading: false,
      typeVal: '',     //类型绑定值
      timeVal: '',     //时间
      keyVal: '',      //关键字绑定值
      searchVal: '',  //搜索内容
      typeOptions: [],//类型下来菜单
      keyOptions: [   //关键字下拉菜单
        {
          value: 1,
          label: 'ID'
        },
        {
          value: 2,
          label: '标题'
        }
      ],
      tableData: [],
      alterTableIndex: '',  //编辑表格当前行的索引
      alterTableRow: {},  //编辑表格当前行数据
      currentIndex: 1,  //当前页码
      total: 0, //总页码数
      parmasData: {
        categoryId: '',
        startTime: '',
        endTime: '',
        title: '',
        id: '',
        pageSize: 10,
      }
    };
  },
  created() {
    this.getTableMsg();
    this.getClassify();
  },
  methods: {
    // 显示弹窗
    dialogShow(index, row){
      if (row) {
        this.alterTableIndex = index;
        this.alterTableRow = row;
      } else {
        this.alterTableIndex = '';
        this.alterTableRow = {};
      }
      this.$refs.dialog.dialogShow()
    },
    // 获取分类
    getClassify() {
      commonGetCategory()
      .then(res => {
        this.typeOptions = res.data.data;
      });
    },
    //获取表格信息
    getTableMsg(){
      // 搜索： 1 => id ; 2 => 标题
      if (this.keyVal === 1){
        this.parmasData.title = '';
        this.parmasData.id = this.searchVal;
      }else if(this.keyVal === 2){
        this.parmasData.id = '';
        this.parmasData.title = this.searchVal;
      }else {
        this.parmasData.id = '';
        this.parmasData.title = '';
      }
      this.tableLoading = true;
      let parmas = {
        ...this.parmasData,
        pageNumber: this.currentIndex,
      };
      apiGetListMsg(parmas)
      .then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total
        this.tableLoading = false;
      })
    },
    //添加信息
    async addListMsg(form) {
      try {
        const res = await apiAddListMsg(form)
        await this.getTableMsg();
        this.$message({
          type: 'success',
          message: res.message
        });
        this.$refs.dialog.closed();  //关闭新增弹窗后回调
      } catch (err) {
        this.$message({
          type: 'error',
          message: err.message
        });
      }
    },
    // 修改表格信息
    async alterListMsg(form){
      try {
        let parmas = {
          id: this.alterTableRow.id,
          categoryId: form.category,
          title: form.title,
          content: form.content,
        };
        const res = await apiEditInfo(parmas);
        await this.getTableMsg()
        this.$message({
          type: 'success',
          message: res.message
        })
        this.$refs.dialog.closed();
      } catch (err) {
        this.$message({
          type: 'error',
          message: '请不要输入特殊符号！'
        })
      }
    },
    // 提示删除单个信息
    deleteListMsg(row) {
      this.confirmMsg('您确定要删除该条信息吗？')
        .then(() => {
          let arr = [row.id]
          this.deleteListMsgItem(arr)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    // 执行删除操作
    deleteListMsgItem(arr) {
      apiDeleteInfo({id: arr})
        .then(res => {
          this.getTableMsg();
          this.$message({
            type: 'success',
            message: res.message
          });
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err.message
          });
        });
    },
    // 提示删除批量信息
    deleteListMsgAll() {
      let arr = [];
      let row = this.$refs.mytable.selectionChangeVal;
      if (row.length > 0) {
        row.forEach(e => {
          arr.push(e.id);
        });
      } else {
        this.$message({
          type: 'error',
          message: '请选择数据后再操作！'
        });
        return false;
      }
      this.confirmMsg('删除所选信息将无法恢复，确定要继续吗？')
        .then(() => {
          this.deleteListMsgItem(arr)
        })
        .catch(() => {
          this.$message({
            type:'info',
            message:'已取消删除'
          });
        });
    },
    // 类别选择器
    handlTypeChange(){
      this.parmasData.categoryId = this.typeVal;
    },
    // 时间筛选
    handlTimeChange(){
      // console.log(this.timeVal);
      if (this.timeVal){
        this.parmasData.startTime = this.timeVal[0].getFullYear() + '-' + this.checkTime(this.timeVal[0].getMonth() + 1) + '-' + this.checkTime(this.timeVal[0].getDate()) + ' ' +
          this.checkTime(this.timeVal[0].getHours()) + ':' +
          this.checkTime(this.timeVal[0].getMinutes()) + ':' +
          this.checkTime(this.timeVal[0].getSeconds())
        this.parmasData.endTime = this.timeVal[1].getFullYear() + '-' +
          this.checkTime(this.timeVal[1].getMonth() + 1) + '-' +
          this.checkTime(this.timeVal[1].getDate()) + ' ' +
          this.checkTime(this.timeVal[1].getHours()) + ':' +
          this.checkTime(this.timeVal[1].getMinutes()) + ':' +
          this.checkTime(this.timeVal[1].getSeconds())
      }else {
        this.parmasData.startTime = '';
        this.parmasData.endTime = '';
      }
    },
    // 分页器
    currentChange(Val){
      this.currentIndex = Val;
      this.getTableMsg()
    },
    checkTime(i){
      if(i<10){
        i = '0'+i
      }
      return i
    }
  }
};
</script>

<style lang="scss">
.messageList{
  .top_box{
    display: flex;
    .type_box,.time_box,.keyword_box{
      & > span{
        white-space: nowrap;
        font-size: 16px;
        color: #333;
      }
    }
    .type_box,.keyword_box,.time_box,.search_box{
      display: flex;
      align-items: center;
    }
    .type_box,.keyword_box{
      .el-select{
        max-width: 178px !important;
        min-width: 118px !important;
      }
    }
    .time_box{
      width: 30%;
    }
    .search_box{
      .el-input__inner,button{
        border-radius: 0px;
      }
      button{
        height: 40px;
        color: #fff;
        background: #409eff;
        border: none;
      }
    }
    .append_box{
      button{
        border-radius: 0px;
        height: 40px;
        color: #fff;
        background: #f56c6c;
        border: none;
      }
    }
  }
  .foote_box{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.el-select-dropdown__wrap{
  max-height: 160px !important;
}
.el-date-editor--daterange.el-input__inner{
  width: 100%;
}
</style>