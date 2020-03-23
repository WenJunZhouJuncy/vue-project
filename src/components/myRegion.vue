<template>
  <div class="myRegion">
    <el-row :gutter="5" style="overflow: hidden">
      <el-col :span="6">
        <el-select v-model="region.province" placeholder="省" clearable @change="handlChange('city','province_code',region.province)">
          <el-option
            v-for="item in option.province"
            :key="item.PROVINCE_CODE"
            :label="item.PROVINCE_NAME"
            :value="item.PROVINCE_CODE">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select v-model="region.city" placeholder="市" clearable @change="handlChange('area','city_code',region.city)">
          <el-option
            v-for="item in option.city"
            :key="item.CITY_CODE"
            :label="item.CITY_NAME"
            :value="item.CITY_CODE">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select v-model="region.area" placeholder="区" clearable @change="handlChange('street','area_code',region.area)">
          <el-option
            v-for="item in option.area"
            :key="item.AREA_CODE"
            :label="item.AREA_NAME"
            :value="item.AREA_CODE">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select v-model="region.street" placeholder="街道" clearable>
          <el-option
            v-for="item in option.street"
            :key="item.STREET_CODE"
            :label="item.STREET_NAME"
            :value="item.STREET_CODE">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { apiLoadRegion } from '@/api/common'
export default {
  name: "myRegion",
  data() {
    return {
      option: {
        province: '',
        city: '',
        area: '',
        street: '',
      },
      region: {
        province: '',
        city: '',
        area: '',
        street: ''
      }

    }
  },
  created() {
    this.getprovince({type: "province"})
  },
  methods: {
    // 请求
    getprovince(parmas){
      apiLoadRegion(parmas).then((res) => {
        this.option[parmas.type] = res.data.data
      })
    },
    // 下拉菜单修改时
    handlChange(type,codeKey,code){
      let parmas = {type}
      parmas[codeKey] = code
      //重置区域
      this.resetRegion(type)
      // 发送请求
      this.getprovince(parmas)
    },
    //重置区域
    resetRegion(type){
      let arr = ['province','city','area','street']
      let index = arr.findIndex(e => e === type)
      let n_arr = arr.slice(index,arr.length)
      n_arr.forEach(e => {
        this.region[e] = ''
        this.option[e] = ''
      })
    }
  }
}
</script>

<style scoped>

</style>