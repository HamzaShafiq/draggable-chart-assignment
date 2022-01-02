<template>
  <div
    class="relative pt-1 pb-2 sm:pt-6 sm:px-6 rounded-lg overflow-hidden box box3 flex"
  >
    <VueApexCharts type="area" height="150" :options="options" :series="series" />
  </div>
</template>
<script>
import VueApexCharts from 'vue-apexcharts';

export default {
  components: {
    VueApexCharts,
  },
  props: {
    heading: { type: String, required: true },
    subHeading: { type: String, required: true },
    series: { type: Array, required: true },
    categories: { type: Array, required: true },
  },
  computed: {
    options() {
      return {
        chart: {
          type: "area",
          sparkline: {
            enabled: true,
          },
          zoom: {
            enabled: false,
          },
        },
        fill: {
          opacity: 1,
        },
        dataLabels: {
          enabled: false,
        },
        colors: ["#008FFB"],
        title: {
          text: this.heading,
          offsetX: 30,
          style: {
            fontSize: "24px",
            cssClass: "apexcharts-yaxis-title",
          },
        },
        subtitle: {
          text: this.subHeading,
          offsetX: 30,
          style: {
            fontSize: "14px",
            cssClass: "apexcharts-yaxis-title",
          },
        },
        xaxis: {
          type: "datetime",
          categories: this.categories,
        },
      };
    },
  },
};
</script>
<style scoped>
.box {
  max-height: 444px;
}

.box .map {
  min-height: 404px;
  background-size: cover;
}
</style>
