<template>
  <div class="el_asides">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router>
      <el-scrollbar style="height:100%">
        <template v-for="(item,index) in routes">
          <el-menu-item :index="item.path" :key="item.id" v-if="!item.children">
            <i :class="item.icon"></i>
            <span slot="title">{{item.meta.name}}</span>
          </el-menu-item>

          <el-submenu :index="index.toString()" :key="item.id" v-else>
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.meta.name}}</span>
            </template>
            <template v-for="t in item.children">
              <el-menu-item :index="t.path" :key="t.id">{{t.meta.name}}</el-menu-item>
            </template>
          </el-submenu>
        </template>
      </el-scrollbar>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "el_asides",
  created(){
    this.routes = this.$router.options.routes[0].children;
    console.log(this.routes);
    
  },
  data() {
    return {
      routes:null,
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath,'open');
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath,'close');
    },
  }
}
</script>

<style lang="scss">
.el_asides{
  height: 100vh;
  .el-menu{
    height: 100%;
    border: none;
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
    .is-active,.is-opened .is-active{
      background-color: #558ff2 !important;
    }
    .el-submenu .el-menu-item {
      padding-left: 50px !important;
    }
  }
}
</style>