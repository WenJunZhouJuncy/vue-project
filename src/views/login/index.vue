<template>
  <div class="login">
    <div class="left_box">
      <img :src="imgUrl" />
      <p>基于Vue的企业后台管理系统</p>
    </div>
    <div class="right_box">
      <el-tabs v-model="activeName" @tab-click="tabClick">
        <el-tab-pane label="登录" name="login">
          <el-form :model="loginForm" ref="loginForm">
            <el-form-item
              prop="message"
              :rules="[{ required: true, message: '请输入邮箱', trigger: 'blur' },
              {pattern: /[1-9]\d{7,10}@qq\.com/, message: '邮箱格式错误'}]">
              <el-input
                v-model="loginForm.message"
                placeholder="请输入邮箱"
                @keyup.enter.native="submitForm('loginForm')">
              </el-input>
            </el-form-item>
            <el-form-item
              prop="password"
              :rules="[{ required: true, message: '请输入密码', trigger: 'blur' },
              {pattern: /^[a-zA-Z0-9]{6,12}$/, message: '请输入6-12的数字或字母'}]">
              <el-input
                v-model="loginForm.password"
                type="password"
                placeholder="请输入密码"
                @keyup.enter.native="submitForm('loginForm')"
                show-password>
              </el-input>
            </el-form-item>
            <el-form-item
              class="form-item-flex"
              prop="code"
              :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' },
              {pattern: /^[a-zA-Z0-9]{6}$/, message: '验证码长度为6位'}]">
              <el-input v-model="loginForm.code"
                class="el-input-class" placeholder="请输入验证码"
                @keyup.enter.native="submitForm('loginForm')"
                style="margin-right: 12px;width: 220px">
              </el-input>
              <el-button v-if="submitDowncount" class="el-button-class" @click="postCode('login')">发送验证码</el-button>
              <el-button v-else class="el-button-class" disabled :loading="times === 0">{{times === 0?'发送中':times + 's'}}</el-button>
            </el-form-item>
            <el-form-item>
              <el-button class="el-submit-class" @click="submitForm('loginForm')">登录</el-button>
            </el-form-item>
            <div class="forget_box">
              <span>忘记密码?</span>
            </div>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="register">
          <el-form :model="registerForm" ref="registerForm" :rules="rules">
            <el-form-item
              prop="message"
              :rules="[{ required: true, message: '请输入邮箱', trigger: 'blur' },
                {pattern: /[1-9]\d{7,10}@qq\.com/, message: '邮箱格式错误'}]">
              <el-input
                v-model="registerForm.message"
                placeholder="邮箱"
                @keyup.enter.native="regForm('registerForm')">
              </el-input>
            </el-form-item>
            <el-form-item prop="password1">
              <el-input
                v-model="registerForm.password1"
                type="password" placeholder="密码"
                @keyup.enter.native="regForm('registerForm')"
                show-password>
              </el-input>
            </el-form-item>
            <el-form-item prop="password2">
              <el-input
                type="password"
                placeholder="重复输入密码"
                @keyup.enter.native="regForm('registerForm')" v-model="registerForm.password2" show-password></el-input>
            </el-form-item>
            <el-form-item
              class="form-item-flex"
              prop="code"
              :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' },
              {pattern: /^[a-zA-Z0-9]{6}$/, message: '验证码长度为6位'}]">
              <el-input
                v-model="registerForm.code"
                class="el-input-class" placeholder="验证码"
                @keyup.enter.native="regForm('registerForm')"
                style="margin-right: 12px;width: 220px">
              </el-input>
              <el-button v-if="registerDowncount" class="el-button-class" @click="postCode('register')">发送验证码</el-button>
              <el-button v-else class="el-button-class" disabled :loading="times === 0">{{times === 0?'发送中':times + 's'}}</el-button>
            </el-form-item>
            <el-form-item>
              <el-button class="el-submit-class" @click="regForm('registerForm')">注册</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
// 加密 base64 、{md5 、 sha1 特点:不可逆，加密后不可解密}
import sha1 from 'sha1';
import { getSms, getRegister } from "@/api/login/index.js";
import imgUrl from "@/assets/img/loginstar.png";
export default {
  name: "index",
  data() {
    const validatePass1 = (rule, value, callback) => {
      let reg = /^[a-zA-Z0-9]{6,12}$/;
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (!reg.test(value)) {
        callback(new Error('请输入6-12的数字或字母'));
      } else {
        if (this.registerForm.password2 !== ''){
          this.$refs.registerForm.validateField('password2');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.password1) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return{
      imgUrl:imgUrl,          //图片
      activeName:'login',     //tagger切换栏
      submitDowncount:true,      //登录验证码按钮状态
      registerDowncount:true,     //注册验证码按钮状态
      timer:null,                 //计时器
      times:0,                    //倒计时时间
      loginForm:{
        message:'',
        password:'',
        code:''
      },
      registerForm:{
        message:'',
        password1:'',
        password2:'',
        code:''
      },
      rules: {
        password1: [
          { validator: validatePass1, trigger: 'blur' }],
        password2: [
          { validator: validatePass2, trigger: 'blur' }],
      },
    };
},
  methods:{
    //注册账号注册账号注册账号注册账号注册账号注册账号注册账号注册账号注册账号注册账号注册账号注册账号注册账号注册账号注册账号注册账号
    regForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            username: this.registerForm.message,
            password: sha1(this.registerForm.password1),
            code: this.registerForm.code
          };
          getRegister(params)
            .then((data) =>{
              this.$message({
                type:"success",
                message:data.message
              });
              this.activeName = 'login';
              this.tabClick();
            })
            .catch((error)=>{
              console.log(error);
              this.$message.error(error.message);
            });
        } else {
          this.$message.error('请填写完整信息!');
          return false
        }
      });
    },
    // 登录账号登录账号登录账号登录账号登录账号登录账号登录账号登录账号登录账号登录账号登录账号登录账号登录账号登录账号登录账号登录账号
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            username: this.loginForm.message,
            password: this.loginForm.password,
            code: this.loginForm.code
          };
          this.$store.dispatch('login/ACTIONS_LOGIN',params)
            .then(data =>{
              this.$router.push({path:'/console'})
                this.$message({
                    message: data.message,
                    type: 'success'
                });
            })
            .catch(error =>{
              this.$message.error(error.message)
            });
        } else {
          this.$message.error('请填写完整信息!')
          return false
        }
      });
    },
    // 发送验证码发送验证码发送验证码发送验证码发送验证码发送验证码发送验证码发送验证码发送验证码发送验证码发送验证码发送验证码发送验证码
    postCode(type){
      let mail = type === 'login'? this.loginForm.message : this.registerForm.message;
      let reg = /[1-9]\d{7,10}@qq\.com/;
      if (mail === ''){
        this.$message.error('邮箱不能为空！');
        return false;
      }else if ( !reg.test(mail) ){
        this.$message.error('邮箱格式错误！');
        return false;
      }
      type === 'login'? this.submitDowncount = false : this.registerDowncount = false; //切换验证码按钮状态
      // 发起请求
      let params = {
        username: mail,
        module: this.activeName,
      };
      getSms(params)
        .then((data)=>{
          // console.log(response);
          this.$message({
            message: data.message,
            type: 'success'
          });
          this.getDownCount(this.activeName);     //请求成功倒计时
        })
        .catch((error)=>{
          type === 'login'? this.submitDowncount = true : this.registerDowncount = true; //切换验证码按钮状态
          console.log(error.message)
          this.$message.error(error.message)
          this.resetCodeBtn();
        });
    },
    //tag栏切换tag栏切换tag栏切换tag栏切换tag栏切换tag栏切换tag栏切换tag栏切换tag栏切换tag栏切换tag栏切换tag栏切换tag栏切换tag栏切换
    tabClick(){
      // console.log(tab);
      // 重置
      this.timer?clearInterval(this.timer):null;
      this.$refs['loginForm'].resetFields();      //清空输入框
      this.$refs['registerForm'].resetFields();
      this.times = 0;                             //倒计时时间重置
      this.resetCodeBtn();                //验证码按钮状态
    },
    resetCodeBtn(){
      this.submitDowncount = true;    //登录验证码按钮状态
      this.registerDowncount = true;     //注册验证码按钮状态
    },
    //倒计时倒计时倒计时倒计时倒计时倒计时倒计时倒计时倒计时倒计时倒计时倒计时倒计时倒计时倒计时倒计时倒计时倒计时倒计时倒计时倒计时倒计时
    getDownCount(type) {
      this.timer ? clearInterval(this.timer) : null;
      this.times = 60;
      this.timer = setInterval(() => {
        this.times -= 1;
        if (this.times === 0) {
          clearInterval(this.timer);
          this.timer = null;
          type === 'login'? this.submitDowncount = true : this.registerDowncount = true;
        }
      }, 1000);
    }
  }
};
</script>

<style lang="scss">
.login{
  min-width: 100vh;
  min-height: 100vh;
  background: url("../../assets/img/loginbg.jpg") no-repeat;
  background-size: cover;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .left_box{
    display: flex;
    flex-direction: column;
    align-items: center;
    p{
      line-height: 38px;
      font-size: 18px;
      color: #ff733c;
    }
  }
  .right_box{
    width: 400px;
    height: 410px;
    background: #fff;
    border-radius: 4px;
    .el-tabs__active-bar{
      display: none;
    }
    .el-tabs__nav{
      width: 100%;
      padding: 0 60px;
      box-sizing: border-box;
      text-align: center;
    }
    .el-tabs__item{
      height: 56px;
      line-height: 56px;
      font-size: 18px;
      color:#101010;
      width: 30%;
      padding: 0;
      text-align: center;
    }
    .el-tabs__item:last-child{
      margin-left: 80px;
    }
    .is-active{
      border-bottom: 2px #ff9237 solid;
    }
    .el-form{
      padding: 15px 40px;
      .form-item-flex{
        .el-form-item__content{
          display: flex;
        }
      }
      .el-button-class{
        width: 88px;
        padding: 10px 8px;
      }
      .el-submit-class{
        width: 100%;
        background: #ff733c;
        color: #fff;
        font-weight: 400;
        font-size: 16px;
      }
      .forget_box{
        text-align: right;
        span{
          font-size: 16px;
          color: #101010;
          cursor: pointer;
        }
        span:hover{
          color: #ff733c;
        }
      }
    }
  }
}
</style>