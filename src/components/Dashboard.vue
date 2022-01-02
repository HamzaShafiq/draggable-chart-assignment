<template>
  <div
    class="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-20 py-6"
  >
<!--    <button @click="addItem">Add an item dynamically</button>
    <input type="checkbox" v-model="draggable" /> Draggable
    <input type="checkbox" v-model="resizable" /> Resizable-->
    <Charts :analytics="analytics" :isLoading="!isDataFetched" />
  </div>
</template>

<script>
import Charts from "./Charts";
import requestData from "../utils/requestData";
import {isObjectEmpty} from "../utils/utility_methods";

export default {
  components: {
    Charts,
  },
  data(){
    return {
      loading: false,
      analytics: {}
    }
  },
  computed: {
    isDataFetched(){
      return !this.loading && !isObjectEmpty(this.analytics);
    }
  },
  mounted(){
    this.loading = true;
    setTimeout(() => {
      this.fetchAnalytics();
    }, 1000);
  },
  methods: {
    fetchAnalytics(){
      this.analytics = requestData;
      this.loading = false;
    }
  }
}
</script>
