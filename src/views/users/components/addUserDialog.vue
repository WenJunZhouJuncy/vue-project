<template>
  <div class="myDialog">
    <el-dialog title="新增" :visible.sync="dialogVisible" lock-scroll @closed="closed">
      <el-form :model="form" ref="ruleForm" label-width="95px">
        <el-form-item
          prop="username"
          label="邮箱："
          :rules="[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ]">
          <el-input v-model="form.username" clearable placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item
          prop="truename"
          label="真实姓名："
          :rules="[{ required: true, message: '姓名不能为空', trigger: 'blur' }]">
          <el-input v-model="form.truename" clearable placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item
          prop="password"
          label="密码："
          :rules="[{ required: true, message: '密码不能为空', trigger: 'blur' }]">
          <el-input v-model="form.password" clearable placeholder="请输入密码" />
        </el-form-item>
        <el-form-item
          prop="phone"
          label="手机号："
          :rules="[{ required: true, message: '手机不能为空', trigger: 'blur' }]">
          <el-input v-model.number="form.phone" clearable placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="地区：">
          <myRegion ref="resetRegion" @EmitRegion="EmitRegion"></myRegion>
        </el-form-item>
        <el-form-item label="是否启用：">
          <template>
            <el-radio v-model="form.status" label="1">禁用</el-radio>
            <el-radio v-model="form.status" label="2">启用</el-radio>
          </template>
        </el-form-item>
        <el-form-item
          prop="role"
          label="角色："
          :rules="[{ type: 'array', required: true, message: '请至少选择一个角色', trigger: 'change' }]">
          <template>
            <el-checkbox-group v-model="form.role">
              <el-checkbox v-for="item in roleList" :key="item.role" :label="item.role">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </template>
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
import { apiGetRole, apiUserAdd } from '@/api/userList'
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
    },
  },
  data() {
    return {
      dialogVisible: false,
      roleList:null,
      form: {
        username: '',
        truename: '',
        password: '',
        phone: '',
        region: {},
        status: '1',
        role: []
      }
    };
  },
  created(){
    // 获取角色
    apiGetRole().then(res => {
      this.roleList = res.data
    })
  },
  methods: {
    // 显示弹窗
    dialogShow() {
      this.dialogVisible = true
    },
    // 关闭弹窗
    closed() {
      this.dialogVisible = false
    },
    // 子传父地区值
    EmitRegion(regionData){
      this.form.region = JSON.stringify(Object.assign({},regionData))
    },
    // 确认按钮
    dialogEnter() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          let role = this.form.role.join()
          let requestData = {...this.form,role}
          // 添加用户
          apiUserAdd(requestData)
            .then(res => {
              this.$message({
                type: 'success',
                message: res.message
              })
              // 重置表单
              this.$refs['ruleForm'].resetFields()
              // 关闭弹窗
              this.closed()
              // 重置地区
              this.$refs.resetRegion.resetAllRegion()
              // 刷新表格数据
              this.$emit('getTableData')
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          this.$message({
            type: 'error',
            message: '请填写完整信息!!'
          });
          return false;
        }
      });
    },
    resetUser(){

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