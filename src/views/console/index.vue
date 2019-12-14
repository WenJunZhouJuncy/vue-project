<template>
  <div class="console card pd30">
    暂无数据
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