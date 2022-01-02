<template>
  <div
    class="relative bg-white pt-1 pb-2 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden box box3 flex max-h-96"
  >
    <div :class="columnChartClass">
      <BarChart :data="data" :selectSubcategory="selectSubcategory" />
    </div>

    <div class="section" v-if="showCategory">
      <ColumnChart :mapData="data[categoryindex].category" />
    </div>
    <Description v-if="description" :description="description" />
  </div>
</template>
<script>
import BarChart from "@/components/Analytics/charts/bar.vue";
import ColumnChart from "@/components/Analytics/charts/column.vue";
import Description from "@/components/Analytics/charts/description.vue";

export default {
  components: { BarChart, ColumnChart, Description },
  props: {
    data: { type: Array, required: true },
    description: { type: String, required: false },
  },
  computed: {
    columnChartClass() {
      return this.showCategory ? "w-1/2" : "w-full";
    },
  },
  data() {
    return {
      showCategory: false,
      categoryindex: null,
    };
  },
  methods: {
    selectSubcategory(index) {
      if (index != null) {
        this.showCategory = index != this.categoryindex;
        let updatedIndex = this.showCategory ? index : null;
        this.categoryindex = updatedIndex;
      }
    },
  },
};
</script>
