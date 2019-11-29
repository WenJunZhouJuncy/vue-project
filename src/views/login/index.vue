<template>
    <div class="login">
        <div class="left_box">
            <img :src="imgUrl" />
            <p>俊逸星空</p>
        </div>
        <div class="right_box">
            <el-tabs v-model="activeName">
                <el-tab-pane label="登录" name="first">
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
                                      style="margin-right: 12px"
                            ></el-input>
                            <el-button v-if="submitDowncount" class="el-button-class" @click="postCode">发送验证码</el-button>
                            <el-button v-else class="el-button-class">{{times}}s</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="el-submit-class" @click="submitForm('loginForm')">登录</el-button>
                        </el-form-item>
                        <div class="forget_box">
                            <span>忘记密码?</span>
                        </div>
                    </el-form>
                </el-tab-pane>


                <el-tab-pane label="注册" name="second">
                    <el-form :model="registerForm" ref="registerForm">
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
                                :rules="[{ required: true, message: '请输入密码', trigger: 'blur' },
                                {pattern: /^[a-zA-Z0-9]{6,12}$/, message: '密码格式错误'}]"
                        >
                            <el-input type="password" placeholder="密码"
                                      @keyup.enter.native="regForm('registerForm')" v-model="registerForm.password1" show-password></el-input>
                        </el-form-item>
                        <el-form-item
                                prop="password2"
                                :rules="[{ required: true, message: '请重复输入密码', trigger: 'blur' },
                                {pattern: /^[a-zA-Z0-9]{6,12}$/ , message: '输入密码不一致'}]"
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
                                      style="margin-right: 12px"
                            ></el-input>
                            <el-button v-if="registerDowncount" class="el-button-class" @click="postCode">发送验证码</el-button>
                            <el-button v-else class="el-button-class">{{times}}s</el-button>
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
    import { getSms } from "@/api/login/login.js";
    import imgUrl from "@/assets/img/loginstar.png";
    export default {
        name: "index",
        data(){
            return{
                imgUrl:imgUrl,
                activeName:'first',
                submitDowncount:true,
                registerDowncount:true,
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
            }
        },
        methods:{
            //注册账号
            regForm(){

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
            postCode(){
                let reg = /[1-9]\d{7,10}@qq\.com/;
                // if (this.loginForm.message === ''){
                //     this.$message.error('邮箱不能为空！')
                //     return false;
                // }else if ( !reg.test(this.loginForm.message) ){
                //     this.$message.error('邮箱格式错误！')
                //     return false;
                // }
                let params  = {
                    username : this.loginForm.message,
                    module : 'login'
                }
                getSms(params)
                .then((response)=>{
                    console.log(response)
                }).catch((error)=>{
                    console.log(error)
                })
            },
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