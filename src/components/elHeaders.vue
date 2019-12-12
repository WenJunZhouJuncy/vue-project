<template>
  <div class="el_headers">
    <i class="el-icon-s-operation" />
    <div class="head_left_box">
      <el-dropdown>
        <span class="el-dropdown-link pdr20">
          <img />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-tooltip class="item" effect="dark" content="退出登录" placement="bottom">
        <i class="el-icon-switch-button" />
      </el-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: "el_headers",
  data() {
    return {

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
  .el-icon-s-operation{
    font-size: 30px;
    color: #999;
  }
  .head_left_box{
    display: flex;
    align-items: center;
    img{
      width: 45px;
      height: 45px;
      background-color: #eee;
      border-radius: 50%;
      cursor: pointer;
    }
    .el-icon-switch-button{
      font-size: 40px;
      color: #ff0000;
      cursor: pointer;
    }
  }
}
</style>