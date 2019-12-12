<template>
    <div class="home">
        <el-container>
            <el-aside>
              <elAsides></elAsides>
            </el-aside>
            <el-container>
                <el-header>
                  <elHeaders></elHeaders>
                </el-header>
                <el-main>
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
    }
</script>

<style lang="scss">
.home{
  .el-aside{
    width: 250px !important;
  }
  .el-header{
    color: #333;
    height: 70px !important;
    padding: 0;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    padding: 0;
  }
}

</style>