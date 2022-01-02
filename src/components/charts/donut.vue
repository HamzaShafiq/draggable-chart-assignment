<template>
  <Loader v-if="loading" />
  <div
    v-else
    class="relative bg-white pt-1 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden max-h-96"
  >
    <apexchart
      type="donut"
      :height="600"
      :options="chartOptions"
      :series="stats"
    />
    <Description class="mt-10" v-if="description" :description="description" />
  </div>
</template>
<script>
import Loader from "@/components/shared/SkeletonLoaders/Chart.vue";
import Description from "@/components/Analytics/charts/description.vue";
export default {
  computed: {
    chartOptions() {
      return {
        chart: {
          type: "donut",
        },
        legend: {
          offsetY: -220,
          position: "bottom",
        },
        labels: ["Pending Requests", "Approved Requests", "Ordered"],
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
  components: { Loader, Description },
  props: {
    loading: { type: Boolean, default: false },
    stats: { type: Array, required: true },
    description: { type: String, required: false },
  },
};
</script>
