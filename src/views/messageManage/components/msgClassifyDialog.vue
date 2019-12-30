<template>
  <div class="msgClassifyDialog">
    <el-dialog :title="dialogObj.dialogType" :visible.sync="dialogVisible" lock-scroll>
      <el-form :model="form" ref="ruleForm" label-width="96px" >
        <el-form-item
          label="第一级分类:"
          prop="firstOrder"
          :rules="[
            { required: true, message: '分类不能为空!'},
        ]">
          <el-input v-model="form.firstOrder" placeholder="请输入内容" @keyup.enter.native="dialogEnter"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogEnter('添加分类')" v-show="dialogObj.dialogType === '添加分类'">确 定</el-button>
        <el-button type="primary" @click="dialogEnter('编辑分类')" v-show="dialogObj.dialogType === '编辑分类'">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "msgClassifyDialog",
  props:{
    dialogObj:{
      type: Object,
      default: null,
    }
  },
  data(){
    return{
      dialogVisible: false,
      form: {
        firstOrder:'',
      }
    }
  },
  watch:{
    'dialogObj.dialogCategoryName'(newVal,oldVal){
      this.form.firstOrder = newVal
    }
  },
  methods:{
    dialogShow(){
      this.dialogVisible = true;
    },
    dialogEnter(classfiy){
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          classfiy === '添加分类'? this.$emit('addFirstClass',this.form.firstOrder): this.$emit('redFirstClass',this.form.firstOrder)
          this.form.firstOrder = '';
        }
      });
    }
  }
};
</script>

<style lang="scss">
.msgClassifyDialog{
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
      &:nth-child(1){
        margin-right: 13px;
      }
    }
  }
}
</style>