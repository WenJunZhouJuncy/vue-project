<template>
  <div id="pie">
    <div id="pieChart" :style="{width: '100%', height: '400px'}"></div>
  </div>
</template>

<script>
export default {
  name: "pie",
  mounted() {
    this.mcharts();
  },
  methods: {
    mcharts() {
      let pieChart = this.echarts.init(document.getElementById("pieChart"));
      pieChart.setOption({
        title: {
          text: "分类信息占比",
          textStyle: {
            color: "#36a3f7",
            fontStyle: "italic"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          left: "center",
          bottom: "10",
          data: ["国际信息", "国内信息", "科技信息", "军事信息", "娱乐八卦", "体育热点", "互联网", "网络游戏"]
        },
        series: [
          {
            name: "信息占比",
            type: "pie",
            radius: [15, 120],
            center: ["50%", "42%"],
            data: [
              { value: 40, name: "国际信息" },
              { value: 35, name: "国内信息" },
              { value: 20, name: "科技信息" },
              { value: 10, name: "军事信息" },
              { value: 31, name: "娱乐八卦" },
              { value: 25, name: "体育热点" },
              { value: 16, name: "互联网" },
              { value: 32, name: "网络游戏" }
            ],
            animationEasing: "cubicInOut",
            animationDuration: 2600
          }
        ]
      });
    }
  }
};
</script>
<style>
</style>