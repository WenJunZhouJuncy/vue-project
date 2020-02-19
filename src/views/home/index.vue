<template>
  <div class="home">
    <el-container>
      <el-aside>
        <elAsides></elAsides>
      </el-aside>
      <el-container>
        <el-header class="pdlr30">
          <elHeaders></elHeaders>
        </el-header>
        <el-main class="pd30">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import elAside from '@/components/elAside';
import elHeader from '@/components/elHeader';
import elMain from '@/components/elMain';
export default {
  name: "index",
  mounted(){
    const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    setTimeout(() => {
      loading.close();
    }, 1000);
  },
  components:{
    elAside,
    elHeader,
    elMain
  },
  data(){
    return{
      loading: true
    }
  }
}
</script>

<style lang="scss">
.home{
  .el-aside{
    width: 250px !important;
    .el_asides{
      height: 100% !important;
    }
  }
  .el-header{
    min-width: 580px;
    height: 70px !important;
    border-bottom: 1px #DCDFE6 solid;
  }
  .el-main{
    min-width: 895px;
  }
}
</style>