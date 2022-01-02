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
          zoom: {
            enabled: true
          },
          toolbar: {
            show: false
          },
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10
          },
        },
        xaxis: {
          type: 'datetime',
          categories: this.categories
        },
        legend: {
          position: 'right',
          offsetY: 40
        },
        fill: {
          opacity: 1
        }
      }
    },
  },
};
</script>
