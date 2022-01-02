<template>
  <div>
    <Loading
      :active.sync="display"
      :is-full-page="fullPage"
      :color="`#14b8a6`"
    />
  </div>

</template>
<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  data() {
    return {
      display: this.show,
    };
  },
  watch: {
    show: {
      handler(newVal, oldVal) {
        if (newVal != oldVal) {
          this.display = newVal;
        }
      },
    },
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    fullPage: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: 200,
    },
    height: {
      type: Number,
      default: 200,
    },
  },
  components: {
    Loading,
  },
};
</script>
