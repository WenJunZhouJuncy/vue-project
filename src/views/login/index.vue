<template>
    <div class="login">
        <div class="left_box">
            <img :src="imgUrl" />
            <p>俊逸星空</p>
        </div>
        <div class="right_box">
            <el-tabs v-model="activeName" @tab-click="tabClick">
                <el-tab-pane label="登录" name="login">
                    <el-form :model="loginForm" ref="loginForm">
                        <el-form-item
                                prop="message"
                                :rules="[{ required: true, message: '请输入邮箱', trigger: 'blur' },
                                {pattern: /[1-9]\d{7,10}@qq\.com/, message: '邮箱格式错误'}]"
                        >
                            <el-input v-model="loginForm.message"
                                      placeholder="请输入邮箱"
                                      @keyup.enter.native="submitForm('loginForm')"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                                prop="password"
                                :rules="[{ required: true, message: '请输入密码', trigger: 'blur' },
                                {pattern: /^[a-zA-Z0-9]{6,12}$/, message: '请输入6-12的数字或字母'}]"
                        >
                            <el-input type="password" placeholder="请输入密码"
                                      @keyup.enter.native="submitForm('loginForm')" v-model="loginForm.password" show-password></el-input>
                        </el-form-item>
                        <el-form-item
                                class="form-item-flex"
                                prop="code"
                                :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' },
                                {pattern: /^[a-zA-Z0-9]{6}$/, message: '验证码长度为6位'}]"
                        >
                            <el-input v-model="loginForm.code"
                                      class="el-input-class" placeholder="请输入验证码"
                                      @keyup.enter.native="submitForm('loginForm')"
                                      style="margin-right: 12px;width: 220px"
                            ></el-input>
                            <el-button v-if="submitDowncount" class="el-button-class" @click="postCode('login')">发送验证码</el-button>
                            <el-button v-else class="el-button-class" disabled>{{times === 0?'发送中':times + 's'}}</el-button>
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
                                {pattern: /[1-9]\d{7,10}@qq\.com/, message: '邮箱格式错误'}]"
                        >
                            <el-input v-model="registerForm.message"
                                      placeholder="邮箱"
                                      @keyup.enter.native="regForm('registerForm')"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                                prop="password1"
                        >
                            <el-input type="password" placeholder="密码"
                                      @keyup.enter.native="regForm('registerForm')" v-model="registerForm.password1" show-password></el-input>
                        </el-form-item>
                        <el-form-item
                                prop="password2"
                        >
                            <el-input type="password" placeholder="重复输入密码"
                                      @keyup.enter.native="regForm('registerForm')" v-model="registerForm.password2" show-password></el-input>
                        </el-form-item>
                        <el-form-item
                                class="form-item-flex"
                                prop="code"
                                :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' },
                                {pattern: /^[a-zA-Z0-9]{6}$/, message: '验证码长度为6位'}]"
                        >
                            <el-input v-model="registerForm.code"
                                      class="el-input-class" placeholder="验证码"
                                      @keyup.enter.native="regForm('registerForm')"
                                      style="margin-right: 12px;width: 220px"
                            ></el-input>
                            <el-button v-if="registerDowncount" class="el-button-class" @click="postCode('register')">发送验证码</el-button>
                            <el-button v-else class="el-button-class" disabled>{{times === 0?'发送中':times + 's'}}</el-button>
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
    import { getSms,getLogin,getRegister } from "@/api/login/login.js";
    import imgUrl from "@/assets/img/loginstar.png";
    export default {
        name: "index",
        data(){
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
                        { validator: validatePass1, trigger: 'blur' }
                    ],
                    password2: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                }
            }
        },
        methods:{
            //注册账号
            regForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = {
                            username: this.registerForm.message,
                            password: this.registerForm.password1,
                            code: this.registerForm.code,
                            module: 'register'
                        }
                        getRegister(params)
                            .then((response) =>{
                                this.activeName = 'login'
                                this.tabClick()
                            }).catch((error)=>{
                                console.log(error)
                        })
                    } else {
                        this.$message.error('请填写完整信息！');
                        return false
                    }
                });
            },
            // 登录
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(valid);
                    } else {
                        console.log('error submit!!');
                        return false
                    }
                });
            },
            // 发送验证码
            postCode(type){
                let that = type === 'login'? this.loginForm.message : this.registerForm.message;
                let reg = /[1-9]\d{7,10}@qq\.com/;
                if (that === ''){
                    this.$message.error('邮箱不能为空！');
                    return false;
                }else if ( !reg.test(that) ){
                    this.$message.error('邮箱格式错误！');
                    return false;
                }
                type === 'login'? this.submitDowncount = false : this.registerDowncount = false;
                // 发起请求
                let params  = {
                    username : this.activeName === 'login'?this.loginForm.message : this.registerForm.message,
                    module : this.activeName,
                }
                getSms(params).then((response)=>{
                    // console.log(response);
                    let data = response.data
                    this.$message({
                        message: data.message,
                        type: 'success'
                    });
                    this.getDownCount(this.activeName);     //倒计时
                }).catch((error)=>{
                    console.log(error)
                })
            },
            //登录注册切换
            tabClick(){
                // console.log(tab);
                // 重置
                this.timer?clearInterval(this.timer):null;
                this.$refs['loginForm'].resetFields();      //清空输入框
                this.$refs['registerForm'].resetFields();
                this.submitDowncount = true;      //登录验证码按钮状态
                this.registerDowncount = true;     //注册验证码按钮状态
                this.times = 0;                    //倒计时时间
            },
            //倒计时
            getDownCount(type){
                this.timer?clearInterval(this.timer):null;
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
    }
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
        p{
            line-height: 38px;
            font-size: 18px;
            color: #ff733c;
            text-align: center;
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