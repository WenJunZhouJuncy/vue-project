<template>
  <div class="messageList">
    <myDialog ref="dialog"></myDialog>
    <div class="top_box mgb30">
      <div class="type_box mgr30">
        <span class="mgr10">类型:</span>
        <el-select class="option" v-model="typeVal" filterable clearable placeholder="请选择">
          <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
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
                end-placeholder="结束日期">
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
        <el-button>搜索</el-button>
      </div>
      <div class="append_box">
        <el-button @click="appendMsg">新增</el-button>
      </div>
    </div>
    <div class="table_box mgb30">
      <mytable @tableRedact="tableRedact"></mytable>
    </div>
    <div class="foote_box">
      <el-button @click="confirmDelAll">批量删除</el-button>
      <mypage></mypage>
    </div>
  </div>
</template>

<script>
import mytable from '@/components/messageTable';
import mypage from '@/components/myPage';
import myDialog from "@/components/myDialog";
export default {
  name: "messageList",
  components:{
    mytable,
    mypage,
    myDialog
  },
  data() {
    return {
      typeVal:'',     //类型绑定值
      timeVal:'',     //时间
      keyVal:'',      //关键字绑定值
      searchVal:'',  //搜索内容
      typeOptions:[ //类型下来菜单
        {
          value: 1,
          label: '国际信息'
        },
        {
          value: 2,
          label: '国内信息'
        },
        {
          value: 3,
          label: '行业信息'
        },
      ],
      keyOptions:[  //关键字下拉菜单
        {
          value: 1,
          label: 'ID'
        },
        {
          value: 2,
          label: '标题'
        }
      ]
    }
  },
  methods: {
    //表格组件emit方法
    tableRedact(index,row){
      console.log(index,row);
    },
    // 新增弹窗
    appendMsg(){
      this.$refs.dialog.dialogShow();
    },
    // 提示批量删除
    confirmDelAll(){
      this.confirmMsg('您确定要删除所选信息吗？', this.deleteSelect)
    },
    deleteSelect(){
      console.log("已删除所选信息");
    }
  }
}
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