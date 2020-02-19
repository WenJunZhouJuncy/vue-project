<template>
  <div class="console card pd30">
    <el-row :gutter="24">
      <el-col :span="8">
        <div class="wrap">
          <div class="grid-content bg-purple">
            <ICountUp :endVal="users" :duration="3000" />
            <div class="text">Users</div>
          </div>
          <i class="el-icon-s-custom"></i>
        </div>
      </el-col>

      <el-col :span="8">
        <div class="wrap">
          <div class="grid-content bg-purple">
            <ICountUp :endVal="message" :duration="3000"/>
            <div class="text">Messages</div>
          </div>
          <i class="el-icon-chat-dot-square"></i>
        </div>
      </el-col>

      <el-col :span="8">
        <div class="wrap">
          <div class="grid-content bg-purple">
            <ICountUp :endVal="classify" :duration="3000"/>
            <div class="text">Classify</div>
          </div>
          <i class="el-icon-s-order"></i>
        </div>
      </el-col>
    </el-row>
    <!-- Echarts -->
    <div class="linecharts mgb30">
      <linecharts />
    </div>
    <div class="pie mgb30">
      <pie />
    </div>
    <div class="bar">
      <bar />
    </div>
  </div>
</template>

<script>
import linecharts from "./components/Linecharts";
import pie from "./components/Pie";
import bar from "./components/Bar";
import ICountUp from "vue-count-to";
export default {
  name: "console",
  components:{
    ICountUp,
    linecharts,
    pie,
    bar
  },
  created(){
    console.log(this.$store.dispatch('ACTIONS_LOGIN'))
  },
  data() {
    return {
      users: 56,
      message: 30,
      classify: 8
    };
  },
  methods: {

  }
}
</script>

<style lang="scss">
.console{
  /* 计数器 */
  .iCountUp {
    width: 100%;
    height: 100%;
    background: rgb(240, 243, 244);
    box-shadow: none;
    font-size: 20px;
    margin: 0;
    color: #4d63bc;
    font-weight: 300;
  }

  /* element ui */
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }

  /* i 标签 */
  .el-col i {
    font-size: 60px;
  }
  .el-icon-s-custom {
    color: #40c9c6;
  }
  .el-icon-chat-dot-square {
    color: #36a3f7;
  }
  .el-icon-shopping-cart-2 {
    color: red;
  }
  .el-icon-wallet {
    color: #34bfa3;
  }

  /* 头部信息 */
  .wrap {
    background: #fff;
    display: flex;
    text-align: center;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
    font-size: 1.5rem;
    font-weight: bolder;
    height: 131px;
  }
  .iCountUp .text {
    font-size: 0.8rem;
    color: #36a3f7;
    text-shadow: 0 5px 10px red;
    white-space: nowrap;
    margin-top: 20px;
    font-weight: 700;
  }
  .bg-purple {
    width: 50%;
    margin-top: -30px;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  /* line */
  .linecharts,.pie,.bar {
    width: 100%;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
    background: #ffffff;
  }
}

</style>