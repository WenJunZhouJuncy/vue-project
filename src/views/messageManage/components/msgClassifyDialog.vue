<template>
  <div class="msgClassifyDialog">
    <el-dialog :title="dialogObj.dialogType" :visible.sync="dialogVisible" lock-scroll @closed="closed">
      <el-form :model="form" ref="ruleForm" label-width="115px" >
        <el-form-item
          label="一级分类名称:"
          prop="firstOrder"
          :rules="[{ required: true, message: '分类不能为空!'}]">
          <el-input
            v-model="form.firstOrder"
            ref="autofocus"
            :disabled="dialogObj.dialogType === '添加子级分类'"
            placeholder="请输入内容"
            @keyup.enter.native="dialogEnter(dialogObj.dialogType)" />
        </el-form-item>
        <el-form-item
          v-show="dialogObj.dialogType === '添加子级分类'"
          label="一级分类名称:"
          prop="firstOrder"
          :rules="[{ required: true, message: '分类不能为空!'}]">
          <el-input
            v-model="form.secondOrder"
            placeholder="请输入内容"
            @keyup.enter.native="dialogEnter(dialogObj.dialogType)" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogEnter(dialogObj.dialogType)" v-show="dialogObj.dialogType === '添加分类'">确 定</el-button>
        <el-button type="primary" @click="dialogEnter(dialogObj.dialogType)" v-show="dialogObj.dialogType === '编辑分类'">确 定</el-button>
        <el-button type="primary" @click="dialogEnter(dialogObj.dialogType)" v-show="dialogObj.dialogType === '添加子级分类'">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "msgClassifyDialog",
  props: {
    dialogObj: {
      type: Object,
      default: null,
    }
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        firstOrder: '',
        secondOrder: '',
      }
    };
  },
  methods:{
    // 显示弹窗
    dialogShow() {
      this.dialogVisible = true;
      this.form.firstOrder = this.dialogObj.dialogCategoryName
    },
    // 关闭弹窗回调
    closed() {
      this.form.firstOrder = '';
      this.form.secondOrder = '';
    },
    // 弹窗确定
    dialogEnter(classfiy){
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (classfiy === '添加分类' && this.form.firstOrder.trim()){
            this.$emit('addFirstClass',this.form.firstOrder)
          }else if(classfiy === '编辑分类' && this.form.firstOrder.trim()){
            this.$emit('alterFirstClass',this.form.firstOrder)
          }else if(classfiy === '添加子级分类' && this.form.secondOrder.trim()){
            this.$emit('addSecondClass',this.form.secondOrder)
          }else {
            this.$message({
              type:'error',
              message: '输入内容不能为空'
            })
            return ;
          }
          this.dialogVisible = false;
        } else {
          this.$message({
            type:'error',
            message: '请输入内容'
          })
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