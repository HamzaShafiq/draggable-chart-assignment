<template>
  <apexchart
    type="bar"
    height="350"
    :options="chartOptions"
    :series="series"
    @dataPointSelection="dataPointSelection"
  />
</template>
<script>
export default {
  methods: {
    // eslint-disable no-unused-vars
    dataPointSelection(event, chartContext, config) {
      this.selectSubcategory(config.dataPointIndex);
    },
  },
  props: {
    data: { type: Array, required: true },
    selectSubcategory: { type: Function, default: () => {} },
  },
  computed: {
    chartOptions() {
      return {
        chart: {
          type: "bar",
          redrawOnParentResize: true,
          height: 350,
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        grid: {
          show: false,
        },
        fill: {
          opacity: 1,
        },
        legend: {
          show: false,
        },
        plotOptions: {
          bar: {
            horizontal: true,
            distributed: true,
          },
        },
        dataLabels: {
          enabled: true,
          offsetX: 90,
          formatter: function (val, opt) {
            return opt.w.globals.labels[opt.dataPointIndex];
          },
        },
        yaxis: {
          labels: {
            show: false,
          },
        },
        xaxis: {
          categories: this.data.map((element) => {
            return element.name;
          }),
          hideOverlappingLabels: true,
        },
      };
    },
    series() {
      return [
        {
          name: "spent",
          data: this.data.map((element) => {
            return element.amount;
          }),
        },
      ];
    },
  },
};
</script>
