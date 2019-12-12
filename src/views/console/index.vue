<template>
  <div class="console">
    控制台
    <el-button @click="setsess">存储</el-button>
    <el-button @click="getsess">获取</el-button>
    <el-button @click="remove">删除</el-button>
  </div>
</template>

<script>
export default {
  name: "console",
  data() {
    return {

    }
  },
  methods: {
    setsess(){
      window.localStorage.setItem('key','value')
    },
    getsess(){
      console.log(window.sessionStorage);
      this.$message({
        type:'success',
        message:localStorage.getItem('key')
      })
    },
    remove(){
      localStorage.removeItem('key')
    }
  }
}
</script>

<style lang="scss">

</style>