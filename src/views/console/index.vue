<template>
  <div class="console card pd30">
    控制台
    {{this.$store.state}}
    <el-button @click="set">存储</el-button>
  </div>
</template>

<script>
export default {
  name: "console",
  created(){
    console.log(this.$store.dispatch('ACTIONS_LOGIN'))
  },
  data() {
    return {

    }
  },
  methods: {
    set(){

    },
  }
}
</script>

<style lang="scss">

</style>