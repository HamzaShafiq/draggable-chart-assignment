<template>
  <Modal
    :name="'newChartModal'"
  >
    <template #header>
      <h3 class="text-2xl text-gray-500">
        Add New Chart
      </h3>
    </template>
    <template #body>
      <div class="mt-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 my-2 capitalize">
              Chart
            </label>
            <div>
              <select
                name="chartName"
                v-model="chartName"
                class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              >
                <option value="">Please select chart</option>
                <option v-for="(option, index) in chartOptions" :key="index" :value="option">{{ option }}</option>
              </select>
            </div>
          </div>
        </div>
    </template>
    <template #footer>
      <button
        type="button"
        :disabled="!chartName"
        @click="() => onAddNewChart(chartName)"
        :class="['w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-600 sm:col-start-2 sm:text-sm', {'btn-disabled': !chartName}]"
      >
        Add
      </button>
      <button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-500 text-base font-medium text-white hover:bg-gray-600 sm:mt-0 sm:col-start-1 sm:text-sm" @click="closeModal">
        Cancel
      </button>
    </template>
  </Modal>
</template>

<script>
import Modal from "../shared/Modal";
import newCharts from '../../utils/newCharts.json';

export default {
  components: {
    Modal
  },
  props: {
    closeModal: {
      type: Function,
      required: true,
    },
    onAddNewChart: {
      type: Function,
      required: true,
    }
  },
  data(){
    return {
      chartName: "",
    }
  },
  computed: {
    chartOptions(){
      return newCharts.map(chart => chart.type);
    }
  }
}
</script>

<style scoped>

.btn-disabled {
  @apply opacity-50 cursor-not-allowed bg-gray-500 hover:bg-gray-500 text-white;
}

</style>