<template>
  <div
    class="w-screen relative bg-white pt-1 sm:pt-6 sm:px-6 rounded-lg"
  >
    <VueApexCharts
      type="pie"
      :height="600"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>
<script>
import VueApexCharts from 'vue-apexcharts';

export default {
  components: {
    VueApexCharts,
  },
  computed: {
    chartOptions() {
      return {
        chart: {
          width: 500,
          type: 'pie',
        },
        labels: this.labels,
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }],
      }
    },
  },
  props: {
    series: { type: Array, required: true },
    labels: { type: Array, required: false },
  },
};
</script>
