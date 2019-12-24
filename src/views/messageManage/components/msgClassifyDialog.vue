<template>
    <div class="msgClassifyDialog">
        <el-dialog title="添加分类" :visible.sync="dialogVisible" lock-scroll>
            <el-form :model="form">
                <el-form-item label="第一级分类:" label-width="86px">
                    <el-input v-model="form.firstOrder" @keyup.enter.native="dialogEnter"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogEnter">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    name: "msgClassifyDialog",
    data(){
      return{
        dialogVisible:true,
        form:{
          firstOrder:'',
        }
      }
    },
    methods:{
      dialogShow(){
        this.dialogVisible = true;
      },
      dialogEnter(){
        this.$emit('addendClassify',this.form.firstOrder);
        this.form.firstOrder = '';
        this.dialogVisible = false;
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
        &:nth-child(2){
            margin-left: 26px;
        }
    }
}
}
</style>