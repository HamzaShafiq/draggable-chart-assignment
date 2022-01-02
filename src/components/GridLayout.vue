<template>
  <div>
    <button @click="addItem">Add an item dynamically</button>
<!--    <input type="checkbox" v-model="draggable" /> Draggable-->
<!--    <input type="checkbox" v-model="resizable" /> Resizable-->
    <grid-layout :layout.sync="layout"
                 :col-num="colNum"
                 :row-height="30"
                 :is-draggable="draggable"
                 :is-resizable="resizable"
                 :vertical-compact="true"
                 :use-css-transforms="true"

    >
      <grid-item v-for="(item, index) in layout"
                 :key="index"
                 :static="item.static"
                 :x="item.x"
                 :y="item.y"
                 :w="item.w"
                 :h="item.h"
                 :i="item.i"
                 class=" border border-gray-300 relative bg-white pt-1 pb-2 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden box box3 flex"
      >
        <span class="text">{{item.i}}</span>
        <span class="remove" @click="removeItem(item.i)">x</span>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
import { GridLayout, GridItem } from "vue-grid-layout"
export default {
  components: {
    GridLayout,
    GridItem
  },
  data() {
    return {
      layout: [
        { x: 0, y: 0, w: 2, h: 2, i: "0" },
        { x: 2, y: 0, w: 2, h: 2, i: "1" },
        { x: 4, y: 0, w: 2, h: 2, i: "2" },
        { x: 6, y: 0, w: 2, h: 2, i: "3" },
        { x: 8, y: 0, w: 2, h: 2, i: "4" },
      ],
      draggable: true,
      resizable: true,
      colNum: 12,
      index: 0,
    }
  },
  mounted() {
    // this.$gridlayout.load();
    this.index = this.layout.length;
  },
  methods: {
    addItem: function () {
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
    removeItem: function (val) {
      const index = this.layout.map(item => item.i).indexOf(val);
      this.layout.splice(index, 1);
    },
  }
}
</script>

<style>
.remove {
  position: absolute;
  right: 2px;
  top: 0;
  cursor: pointer;
}
.vue-draggable-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  left: 0;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>") no-repeat;
  background-position: bottom right;
  padding: 0 8px 8px 0;
  background-repeat: no-repeat;
  background-origin: content-box;
  box-sizing: border-box;
  cursor: pointer;
}
</style>