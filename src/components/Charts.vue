<template>
  <GridLayout
    :layout.sync="layout"
    :col-num="colNum"
    :row-height="50"
    :is-draggable="draggable"
    :is-resizable="resizable"
    :responsive="true"
    :vertical-compact="true"
    :use-css-transforms="true"
  >
    <GridItem
      v-for="(item, index) in layout"
      :key="index"
      :static="item.static"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :i="item.i"
      class="border border-gray-300 relative bg-white pt-1 pb-2 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden box box3 flex"
    >
<!--      <span class="remove" @click="removeItem(item.i)">x</span>-->
      <ChartLoader v-if="isLoading" class="bg-white" />
      <component :is="item.type" v-bind="chartConfig(item)" v-else />
    </GridItem>
  </GridLayout>
</template>

<script>
import {GridItem, GridLayout} from "vue-grid-layout";
import SparkChart from "./charts/SparkChart";
import ChartLoader from "./shared/ChartLoader";
import {formattedAmount, groupBy, isObjectEmpty} from "../utils/utility_methods";
import IndicatorChart from "./charts/IndicatorChart";

export default {
  components: {
    GridLayout,
    GridItem,
    SparkChart,
    ChartLoader,
    IndicatorChart
  },
  props: {
    analytics: {
      type: Object,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    }
  },
  watch: {
    analytics: {
      handler(newVal, oldVal){
        if(isObjectEmpty(oldVal) && !isObjectEmpty(newVal)){
          this.intializeCharts();
        }
      }
    }
  },
  data() {
    return {
      layout: [
        {
          x: 0,
          y: 0,
          w: 4,
          h: 4,
          i: "0",
          type: "SparkChart",
          id: "requests_amount",
          chart: {
            series: [],
            categories: [],
            heading: "",
            subHeading: ""
          }
        },
        {
          x: 4,
          y: 0,
          w: 4,
          h: 4,
          i: "1",
          type: "SparkChart",
          id: "requests_amount1",
          chart: {
            series: [],
            categories: [],
            heading: "",
            subHeading: ""
          }
        },
        {
          x: 8,
          y: 0,
          w: 4,
          h: 4,
          i: "2",
          type: "IndicatorChart",
          id: "order_stats",
          chart: {
            averageTime: [],
            heading: "",
          }
        }
      ],
      draggable: true,
      resizable: true,
      colNum: 12,
      index: 0,
    }
  },
  mounted() {
    this.index = this.layout.length;
  },
  computed: {
    requestsAmountTotal(){
      if (!this.analytics.requests) return 0;
      let total = this.analytics.requests.map((item) => parseFloat(item.amount)).reduce((prev, next) => prev + next);
      return total;
    }
  },
  methods: {
    addItem() {
      // Add a new item. It must have a unique key!
      this.layout.push({
        x: (this.layout.length * 2) % (this.colNum || 12),
        y: this.layout.length + (this.colNum || 12), // puts it at the bottom
        w: 2,
        h: 2,
        i: this.index,
      });
      // Increment the counter to ensure key is always unique.
      this.index++;
    },
    removeItem(val) {
      const index = this.layout.map(item => item.i).indexOf(val);
      this.layout.splice(index, 1);
    },
    chartConfig(item){
      let config = {};
      const {heading, subHeading, series, categories, averageTime} = item.chart;

      switch (item.type) {
        case 'SparkChart':
          config = {heading, subHeading, series, categories};
          break;
        case 'IndicatorChart':
          config = {heading, averageTime};
          break;
      }
      return config;
    },
    intializeCharts(){
      const {requests, order} = this.analytics;
      const {avgDays, avgHours, avgPastDays, avgPastHours} = order;

      this.layout.forEach(layout => {
        if(layout.id === "requests_amount"){
          layout.chart.series = [{ name: 'Count',  data: Object.values(groupBy(requests, "createdAt")).map(value => value.length)}];
          layout.chart.categories = Object.keys(groupBy(requests, "createdAt"));
          layout.chart.heading = formattedAmount(this.requestsAmountTotal);
          layout.chart.subHeading = "Amount";
        } else if (layout.id === "requests_amount1"){
          layout.chart.series = [{ name: 'Count',  data: Object.values(groupBy(requests, "createdAt")).map(value => value.length)}];
          layout.chart.categories = Object.keys(groupBy(requests, "createdAt"));
          layout.chart.heading = formattedAmount(this.requestsAmountTotal / 1000);
          layout.chart.subHeading = "Amount";
        } else if (layout.id === "order_stats"){
          layout.chart.averageTime = {avgDays, avgHours, avgPastDays, avgPastHours}
          layout.chart.heading = 'Order conversion';
        }
      });
    }
  },
}
</script>

<style scoped>

</style>