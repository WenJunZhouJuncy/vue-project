<template>
  <div class="el_headers">
    <div class="head_left_box">
      <i class="el-icon-time mgr10" />
      <span>{{time}}</span>
    </div>
    <div class="head_right_box">
      <span class="mgr10">{{this.$store.state.login.username}}</span>
      <div class="img_box mgr10">

      </div>
      <el-tooltip effect="dark" content="退出登录" placement="bottom">
        <i class="el-icon-switch-button" />
      </el-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: "el_headers",
  created(){

  },
  data() {
    return {
      time:''
    }
  },
  methods: {

  }
}
</script>

<style lang="scss">
.el_headers{
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .head_left_box{
    .el-icon-time{
      font-size: 30px;
      color: #999;
      vertical-align: middle;
    }
    span{
      font-size: 18px;
      color: #333;
      vertical-align: middle;
    }
  }
  .head_right_box{
    display: flex;
    align-items: center;
    span{
      font-size: 16px;
      color: #999;
    }
    .img_box{
      width: 45px;
      height: 45px;
      background-color: #eee;
      border-radius: 50%;
      cursor: pointer;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .el-icon-switch-button{
      padding: 0 5px;
      font-size: 36px;
      color: #ff0000;
      cursor: pointer;
      border-left: 1px #eee solid;
    }
  }
}
</style>