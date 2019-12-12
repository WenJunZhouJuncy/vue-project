<template>
  <div class="console card pd30">
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
      this.Cookies.set('name','aaa')
    },
    getsess(){

    },
    remove(){

    }
  }
}
</script>

<style lang="scss">

</style>