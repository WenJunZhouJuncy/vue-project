<template>
  <div class="elMain">
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    <div style="margin: 15px 0;"></div>
    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
      <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  name: "elMain",
  data() {
    return {
      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: ['上海', '北京', '广州', '深圳'],
      isIndeterminate: true
    };
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.cities : [];
      this.isIndeterminate = false;
      console.log(val,this.checkedCities);
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      console.log(value,this.checkedCities);
    }
  }
}
</script>

<style lang="scss">

</style>