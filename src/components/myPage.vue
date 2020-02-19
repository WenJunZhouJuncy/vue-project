<template>
  <div class="myPage">
    <el-pagination
      v-if="total"
      background
      layout="total, prev, pager, next,jumper"
      :total="total"
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "myPage",
  props: {
    total: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleCurrentChange(Val){
      this.$emit('currentChange', Val)
    }
  }
};
</script>

<style scoped>

</style>