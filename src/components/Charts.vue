<template>
  <div>
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
        <component :is="item.type" v-bind="chartConfig(item)" />
      </GridItem>
    </GridLayout>
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
  data() {
    return {
      layout: [...charts],
      draggable: true,
      resizable: true,
      colNum: 12,
      index: 0,
    }
  },
  mounted() {
    this.index = this.layout.length;
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
  },
}
</script>
