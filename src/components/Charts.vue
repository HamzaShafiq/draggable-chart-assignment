<template>
  <div>
    <div class="flex justify-end ">
      <button type="button" class="rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-white font-medium text-white hover:bg-green-600" @click="onAddChart">
        Add New Chart
      </button>
    </div>
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
        <component :is="item.type" v-bind="chartConfig(item)" />
        <button class="w-3 h-2 ml-auto mr-2" @click="removeItem(item.i)">
          <span class="w-3 h-2 ml-auto bg-red-500 text-white font-bold py-0.5 px-2.5 rounded-full ml-auto">x</span>
        </button>
      </GridItem>
    </GridLayout>
    <AddNewChartModal :onAddNewChart="addNewChart" :closeModal="onAddChartModalClose" />
  </div>

</template>

<script>
import {GridItem, GridLayout} from "vue-grid-layout";
import SparkChart from "./charts/SparkChart";
import Loader from "./shared/Loader";
import IndicatorChart from "./charts/IndicatorChart";
import DonutChart from "./charts/DonutChart";
import PieChart from "./charts/PieChart";
import BarChart from "./charts/BarChart";
import ColumnChart from "./charts/ColumnChart";
import charts from '../utils/requestData.json';
import AddNewChartModal from "./modals/AddNewChartModal";
import newCharts from '../utils/newCharts.json';


export default {
  components: {
    AddNewChartModal,
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
  data() {
    return {
      layout: [...charts],
      draggable: true,
      resizable: true,
      colNum: 12,
      index: 0,
      showAddChartModal: false,
    }
  },
  mounted() {
    this.index = this.layout.length;
  },
  methods: {
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
    onAddChart(){
      this.$modal.show('newChartModal');
    },
    onAddChartModalClose(){
      this.$modal.hide('newChartModal');
    },
    addNewChart(chartName) {
      const chart = newCharts.find(chart => chart.type === chartName);
      const newChart = {...chart, ...{i: this.index, x: (this.layout.length * 2) % (this.colNum || 12), y: this.layout.length + (this.colNum || 12)}}
      this.layout.push(newChart);
      this.index++;
      this.onAddChartModalClose();
    },
  },
}
</script>
