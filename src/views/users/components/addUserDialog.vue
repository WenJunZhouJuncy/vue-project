<template>
  <div class="myDialog">
    <el-dialog title="新增" :visible.sync="dialogVisible" lock-scroll @closed="closed">
      <el-form :model="form" ref="ruleForm" label-width="85px">
        <el-form-item
          prop="userName"
          label="用户名:"
          :rules="[{ required: true, message: '类别不能为空', trigger: 'change' }]">
          <el-input v-model="form.userName" clearable placeholder="请输入用户名" />
<!--          <el-select v-model="form.category" placeholder="请选择活动区域" clearable>-->
<!--            <el-option-->
<!--              v-for="item in typeOptions"-->
<!--              :key="item.id"-->
<!--              :label="item.category_name"-->
<!--              :value="item.id">-->
<!--            </el-option>-->
<!--          </el-select>-->
        </el-form-item>
        <el-form-item
          prop="name"
          label="姓名:"
          :rules="[{ required: true, message: '姓名不能为空', trigger: 'blur' }]">
          <el-input v-model="form.name" clearable placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item
          prop="phone"
          label="手机号:"
          :rules="[{ required: true, message: '手机不能为空', trigger: 'blur' }]">
          <el-input v-model="form.phone" clearable placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item
          prop="region"
          label="地区:"
          :rules="[{ required: true, message: '概况不能为空', trigger: 'blur' }]">
          <myRegion></myRegion>
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
import myRegion from '@/components/myRegion'
export default {
  name: "myDialog",
  components:{
    myRegion
  },
  props: {
    //分类
    typeOptions: {
      type: Array,
      default: null
    },
    //编辑当前行数据
    alterTableRow: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      dialogVisible: true,
      form: {
        userName: '',
        name:'',
        phone:'',
        region:{},

      }
    };
  },
  watch: {
    'alterTableRow'(newVal){
      this.form.category = newVal.categoryId;
      this.form.title = newVal.title;
      this.form.content = newVal.content;
    }
  },
  methods: {
    // 显示弹窗
    dialogShow() {
      this.dialogVisible = true;
    },
    // 关闭弹窗
    closed() {
      this.dialogVisible = false;
      if (!this.alterTableRow) {
        this.form = {
          category: '',
          title: '',
          content: ''
        };
      }
    },
    // 确认按钮
    dialogEnter() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.alterTableRow.id ? this.$emit('alterListMsg',this.form) : this.$emit('addListMsg',this.form);
        } else {
          this.$message({
            type: 'error',
            message: '请填写完整信息!!'
          });
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.myDialog {
  .el-message-box{
    margin-top: 10vh !important;
  }
  .el-dialog {
    width: 45%;
  }
  .el-dialog__body{
    padding: 30px 40px 0px;
  }
  .el-dialog__footer {
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