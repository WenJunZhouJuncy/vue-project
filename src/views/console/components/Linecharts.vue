<template>
  <div id="linecharts">
    <div id="myChart" :style="{width: '100%', height: '400px'}"></div>
  </div>
</template>

<script>
export default {
  name: "linecharts",
  mounted() {
    this.mcharts();
  },
  data() {
    return {
      style: {
        width: '100%',
        height: '400px',
      }
    }
  },
  methods: {
    mcharts() {
      let myChart = this.echarts.init(document.getElementById("myChart"));
      myChart.setOption({
        title: {
          text: "营业收入/支出",
          textStyle: {
            color: "#36a3f7",
            fontStyle: "italic"
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              background: "#6a7985"
            }
          }
        },
        legend: {
          data: ["收入", "支出"],
          textStyle: {
            fontStyle: "italic",
            fontWeight: "fontWeight",
            fontsize: "16px"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          nameTextStyle: {
            color: "#36a3f7"
          },
          data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "收入",
            type: "line",
            stack: "收入",
            itemStyle: {
              color: "#f4516c"
            },
            lineStyle: {
              color: "#f4516c"
            },
            data: [36452, 34535, 43156, 38425, 41234, 38642, 46523]
          },
          {
            name: "支出",
            type: "line",
            stack: "支出",
            itemStyle: {
              color: "#55a8fd"
            },
            lineStyle: {
              color: "#55a8fd"
            },
            data: [25426, 22643, 28123, 26542, 23665, 24534, 28353]
          }
        ]
      });
    }
  }
};
</script>
<style>
</style>