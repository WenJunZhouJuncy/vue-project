<template>
    <div class="myDialog">
        <el-dialog title="新增" :visible.sync="dialogVisible" lock-scroll>
            <el-form :model="form" label-width="50px">
                <el-form-item label="类型:">
                    <el-select v-model="form.type" placeholder="请选择活动区域">
                        <el-option v-for="(item,index) in optionList" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标题:">
                    <el-input v-model="form.title" clearable placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item label="概况:">
                    <el-input
                            type="textarea"
                            placeholder="请输入概况"
                            v-model="form.situation"
                            :rows="5"
                    >
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="danger" @click="dialogEnter">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
  name: "myDialog",
  data(){
    return{
      dialogVisible:true,
      optionList: [
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
        }
      ],
      form: {
        type: '',
        title:'',
        situation:''
      },
    }
  },
  methods:{
    dialogShow(){
      this.dialogVisible = true;
    },
    dialogEnter(){
      this.dialogVisible = false;
    }
  }
}
</script>

<style lang="scss">
.myDialog{
  .el-dialog{
    width: 28%;
  }
  .el-dialog__body{
    padding: 30px 40px 0px;
  }
  .el-dialog__footer{
    padding: 10px 0 32px 0;
    text-align: center;
    button{
      width: 98px;
      &:nth-child(2){
        margin-left: 26px;
      }
    }
  }
}
</style>