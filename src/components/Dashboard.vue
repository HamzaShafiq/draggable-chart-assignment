<template>
  <div
    class="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-20 py-6"
  >
<!--    <button @click="addItem">Add an item dynamically</button>
    <input type="checkbox" v-model="draggable" /> Draggable
    <input type="checkbox" v-model="resizable" /> Resizable-->
    <Charts />
  </div>
</template>

<script>
import Charts from "./Charts";

export default {
  components: {
    Charts,
  }
}
</script>
