<template>
  <div class="messageEdit">
    <h3 class="pdb30">
      {{type}}
    </h3>
    <el-form :model="form" ref="ruleForm" label-width="55px">
      <el-form-item
        prop="category"
        label="类别:"
        :rules="[{ required: true, message: '类别不能为空', trigger: 'change' }]">
        <el-select v-model="form.category" placeholder="请选择活动区域" clearable>
          <el-option
            v-for="item in typeOptions"
            :key="item.id"
            :label="item.category_name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        prop="title"
        label="标题:"
        :rules="[{ required: true, message: '标题不能为空', trigger: 'blur' }]">
        <el-input style="width: 450px" v-model="form.title" clearable placeholder="请输入标题" />
      </el-form-item>
      <el-form-item
        label="时间:"
      >
        <el-date-picker
          v-model="time"
          type="date"
          disabled
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item
        prop="content"
        label="概况:"
        :rules="[{ required: true, message: '概况不能为空', trigger: 'blur' }]">
        <quillEditor :content="form.content" @onEditorChange="onEditorChange"></quillEditor>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$router.go(-1)">返 回</el-button>
      <el-button type="danger" @click="onCommit">确 定</el-button>
    </div>
  </div>
</template>

<script>
import quillEditor from '@/components/quillEditor'
import {getTime} from '@/assets/js/utility'
import {apiAddListMsg, apiEditInfo } from '@/api/messageList'
export default {
  name: "index",
  components: {
    quillEditor
  },
  data(){
    return{
      type:'',
      typeOptions: null,
      id:'',
      time:'',
      form: {
        category: '',
        title:'',
        content:''
      }
    }
  },
  created(){
    this.type = this.$route.query.type
    this.getInit()
  },
  methods:{
    getInit(){
      this.typeOptions = JSON.parse(sessionStorage.getItem('typeOptions'))
      this.time = getTime()
      if (this.type === 'edit'){
        let row = JSON.parse(sessionStorage.getItem('row'))
        this.id = row.id
        this.form.title = row.title
        this.form.content = row.content
        this.form.category = row.categoryId;
      };
    },
    // 富文本内容
    onEditorChange(content){
      this.form.content = content;
    },
    // 提交
    onCommit(){
      this.$refs['ruleForm'].validate((valid) => {
        if (valid){
          this.type === 'add'?  this.addListMsg() : this.alterListMsg()
        }else {
          this.$message({
            type: 'error',
            message: '请填写完整信息!!'
          });
          return false;
        }
      });
    },
    //添加信息
    async addListMsg() {
      console.log('添加');
      try {
        const res = await apiAddListMsg(this.form)
        this.$message({
          type: 'success',
          message: res.message
        });
        this.$router.go(-1)
      } catch (err) {
        this.$message({
          type: 'error',
          message: err.message
        });
      }
    },
    // 修改表格信息
    async alterListMsg(){
      console.log('修改');
      try {
        let parmas = {
          id: this.id,
          categoryId: this.form.category,
          ...this.form,
        };
        const res = await apiEditInfo(parmas);
        this.$message({
          type: 'success',
          message: res.message
        })
        this.$router.go(-1)
      } catch (err) {
        this.$message({
          type: 'error',
          message: '请不要输入特殊符号！'
        })
      }
    },
  }
};
</script>

<style lang="scss">
.messageEdit{
  .dialog-footer{
    margin-top: 80px;
    text-align: center;
  }
}
</style>