<template>
  <div class="el_headers">
    <i class="el-icon-s-operation pdl30" />
    <div class="user_menu">

    </div>
  </div>
</template>

<script>
export default {
  name: "el_headers",
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="scss">
.el_headers{
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-icon-s-operation{
    font-size: 30px;
    color: #999;
  }
  .user_menu{
    width: 60px;
    height: 60px;
    background-color: #666;
    border-radius: 50%
  }
}
</style>