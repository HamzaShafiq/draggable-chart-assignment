<template>
  <apexchart
    type="bar"
    height="350"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>
<script>
export default {
  props: {
    mapData: { type: Array, required: true },
  },
  computed: {
    chartOptions() {
      return {
        chart: {
          type: "bar",
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            columnWidth: "45%",
            distributed: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        xaxis: {
          categories: this.mapData.map((element) => {
            return element.name;
          }),
          labels: {
            style: {
              fontSize: "12px",
            },
          },
        },
      };
    },
    series() {
      return [
        {
          name: "spent",
          data: this.mapData.map((element) => {
            return element.amount;
          }),
        },
      ];
    },
  },
};
</script>
