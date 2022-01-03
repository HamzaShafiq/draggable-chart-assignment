<template>
  <modal :name="name">
    <div
        class="flex justify-center sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
          <div
            :class="[
              'inline-block align-bottom rounded-lg px-4 pt-5 pb-4 text-left transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 w-full',
              ...sizeClasses,
            ]"
          >
            <div class="mt-2 sm:mt-3">
              <h3
                class="text-lg leading-6 font-medium text-gray-900 text-center"
              >
                <slot name="header" />
              </h3>
              <div class="mt-2 text-sm text-gray-500">
                <slot name="body" />
              </div>
            </div>
            <div class="mt-10 grid-flow-row-dense grid sm:grid-cols-2 gap-3">
              <slot name="footer" />
            </div>
          </div>
      </div>
  </modal>
</template>

<script>

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    sizeClasses: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
};
</script>
