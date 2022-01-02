<template>
  <div
    class="w-screen relative bg-white pt-1 sm:pt-6 sm:px-6 rounded-lg pb-10"
  >
    <VueApexCharts
      type="bar"
      height="350"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>
<script>

import VueApexCharts from "vue-apexcharts";

export default {
  components: {
    VueApexCharts,
  },
  props: {
    series: { type: Array, required: true },
    categories: { type: Array, required: true },
  },
  computed: {
    chartOptions() {
      return {
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: {
            show: false
          },
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        stroke: {
          width: 1,
          colors: ['#fff']
        },
        title: {
          text: 'Order Sales'
        },
        xaxis: {
          categories: this.categories,
          labels: {
            formatter: (val) => val + "K"
          }
        },
        tooltip: {
          y: {
            formatter: (val) => val + "K"
          }
        },
        fill: {
          opacity: 1
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
        },
      };
    },
  },
};
</script>
