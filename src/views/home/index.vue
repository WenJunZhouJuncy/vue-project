<template>
  <div class="home">
    <el-container>
      <el-aside>
        <elAside></elAside>
      </el-aside>
        <el-container>
          <el-header>
            <elHeader></elHeader>
          </el-header>
          <el-main>
            <elMain></elMain>
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
  .elHeader{
    height: 80px;
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 80px;
  }
  
  .elMain {
    background-color: #E9EEF3;
    color: #333;
  }
}
  
</style>