<template>
  <div
    class="w-screen relative bg-white pt-1 sm:pt-6 sm:px-6 rounded-lg pb-10"
  >
    <VueApexCharts
      type="donut"
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
          type: "donut",
        },
        legend: {
          offsetY: -250,
          position: "bottom",
        },
        labels: this.labels,
        plotOptions: {
          pie: {
            startAngle: -90,
            endAngle: 90,
          },
        },

        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 500,
              },
            },
          },
        ],
      };
    },
  },
  props: {
    series: { type: Array, required: true },
    labels: { type: Array, required: false },
  },
};
</script>
