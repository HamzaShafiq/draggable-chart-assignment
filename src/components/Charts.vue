<template>
  <div>
    <Loader :show="isLoading" :fullPage="true" />
    <GridLayout
      :layout.sync="layout"
      :col-num="colNum"
      :row-height="50"
      :is-draggable="draggable"
      :is-resizable="resizable"
      :responsive="true"
      :vertical-compact="true"
      :use-css-transforms="true"
      v-if="!isLoading"
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
        <component :is="item.type" v-bind="chartConfig(item)" />
      </GridItem>
    </GridLayout>
  </div>

</template>

<script>
import {GridItem, GridLayout} from "vue-grid-layout";
import SparkChart from "./charts/SparkChart";
import Loader from "./shared/Loader";
import {formattedAmount, groupBy, isObjectEmpty} from "../utils/utility_methods";
import IndicatorChart from "./charts/IndicatorChart";
import DonutChart from "./charts/DonutChart";
import PieChart from "./charts/PieChart";
import {barChartData, columnChartData} from "../utils/requestData";
import BarChart from "./charts/BarChart";
import ColumnChart from "./charts/ColumnChart";

export default {
  components: {
    GridLayout,
    GridItem,
    SparkChart,
    Loader,
    IndicatorChart,
    DonutChart,
    PieChart,
    BarChart,
    ColumnChart
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
        },
        {
          x: 0,
          y: 0,
          w: 6,
          h: 7,
          i: "3",
          type: "DonutChart",
          id: "order_status",
          chart: {
            labels: [],
            series: [],
          }
        },
        {
          x: 6,
          y: 0,
          w: 6,
          h: 7,
          i: "4",
          type: "PieChart",
          id: "order_statuses",
          chart: {
            labels: [],
            series: [],
          }
        },
        {
          x: 0,
          y: 0,
          w: 6,
          h: 7,
          i: "5",
          type: "BarChart",
          id: "order_year",
          chart: {
            categories: [],
            series: [],
          }
        },
        {
          x: 6,
          y: 0,
          w: 6,
          h: 7,
          i: "6",
          type: "ColumnChart",
          id: "product_stats",
          chart: {
            categories: [],
            series: [],
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
    },
    orderStatusesData() {
      const { orders, requests } = this.analytics;
      const approved = requests.filter(request => request.status === "A").length - orders;
      const pending = requests.filter(request => request.status === "P").length;

      return {
        labels: ["Pending Requests", "Approved Requests", "Ordered"],
        series: [pending, approved, orders],
      }
    },
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
      const {heading, subHeading, series, categories, averageTime, labels} = item.chart;

      switch (item.type) {
        case 'SparkChart':
          config = {heading, subHeading, series, categories};
          break;
        case 'IndicatorChart':
          config = {heading, averageTime};
          break;
        case 'DonutChart':
          config = {labels, series};
          break;
        case 'PieChart':
          config = {labels, series};
          break;
        case 'BarChart':
          config = {categories, series};
          break;
        case 'ColumnChart':
          config = {categories, series};
          break;
      }
      return config;
    },
    intializeCharts(){
      const {requests, order} = this.analytics;
      const {avgDays, avgHours, avgPastDays, avgPastHours} = order;

      this.layout.forEach(layout => {
        if (layout.id === "requests_amount") {
          layout.chart.series = [{
            name: 'Count',
            data: Object.values(groupBy(requests, "createdAt")).map(value => value.length)
          }];
          layout.chart.categories = Object.keys(groupBy(requests, "createdAt"));
          layout.chart.heading = formattedAmount(this.requestsAmountTotal);
          layout.chart.subHeading = "Amount";
        } else if (layout.id === "requests_amount1") {
          layout.chart.series = [{
            name: 'Count',
            data: Object.values(groupBy(requests, "createdAt")).map(value => value.length)
          }];
          layout.chart.categories = Object.keys(groupBy(requests, "createdAt"));
          layout.chart.heading = formattedAmount(this.requestsAmountTotal / 1000);
          layout.chart.subHeading = "Amount";
        } else if (layout.id === "order_stats") {
          layout.chart.averageTime = {avgDays, avgHours, avgPastDays, avgPastHours}
          layout.chart.heading = 'Order conversion';
        } else if (["order_status", "order_statuses"].includes(layout.id)) {
          const donutPieChartData = this.orderStatusesData;
          layout.chart.labels = donutPieChartData.labels;
          layout.chart.series = donutPieChartData.series;
        } else if (layout.id === "order_year") {
          layout.chart.categories = barChartData.categories;
          layout.chart.series = barChartData.series;
        } else if (layout.id === "product_stats") {
          layout.chart.categories = columnChartData.categories;
          layout.chart.series = columnChartData.series;
        }
      });
    }
  },
}
</script>

<style scoped>

</style>