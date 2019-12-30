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
  .el-container{
    height: 100vh !important;
  }
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