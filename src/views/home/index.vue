<template>
<<<<<<< HEAD
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
=======
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
import elAsides from '@/components/elAsides';
import elHeaders from '@/components/elHeaders';
    export default {
        name: "index",
        components:{
            elAsides,
            elHeaders
        }
>>>>>>> feature-vueProject-V1.0.0-20191126
    }
  }
</script>

<style lang="scss">
.home{
<<<<<<< HEAD
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
  
=======
  .el-aside{
    width: 250px !important;
  }
  .el-header{
    min-width: 580px;
    height: 70px !important;
    border-bottom: 1px #DCDFE6 solid;
  }
  .el-main{
    min-width: 810px;
  }
}

>>>>>>> feature-vueProject-V1.0.0-20191126
</style>