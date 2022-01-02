<template>
  <div class="px-4 py-5 sm:p-6 bg-white rounded-lg">
    <dt
      class="text-base font-normal text-gray-900 flex justify-between items-baseline"
    >
      {{ heading }}
    </dt>
    <dd class="mt-7 flex justify-between items-baseline md:block lg:flex">
      <div class="flex items-baseline text-5xl font-semibold text-indigo-600">
        {{ averageTime.avgDays }}
        <span class="ml-2 font-sm text-xl">Days</span>
        <span
          v-if="averageTime.avgPastDays"
          class="ml-2 font-medium text-2xl text-gray-500"
        >
          from {{ averageTime.avgPastDays }}
        </span>
      </div>
    </dd>
    <div
      :class="[
        'inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0',
        {
          'text-teal-700':
            !averageTime.avgPastDays ||
            averageTime.avgDays < averageTime.avgPastDays,
        },
        {
          'text-red-500':
            averageTime.avgPastDays &&
            averageTime.avgDays > averageTime.avgPastDays,
        },
      ]"
    >
      <div
        v-if="averageTime.avgPastDays"
        :class="[
          averageTime.avgDays > averageTime.avgPastDays
            ? 'bg-red-100 text-red-800'
            : 'bg-green-100 text-green-800',
          'inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0 mr-1',
        ]"
      >

        <span class="sr-only">
          {{
            averageTime.avgDays > averageTime.avgPastDays
              ? "Decreased"
              : "Increased"
          }}
          by
        </span>
        {{ averagePercentage }}%
      </div>
      {{ averageTime.avgHours }} hours
      <span v-if="averageTime.avgPastHours" class="ml-1">
        from {{ averageTime.avgPastHours }} hours</span
      >
    </div>
  </div>
</template>
<script>
export default {
  props: {
    heading: { type: String, required: true },
    averageTime: { type: Object, required: true },
  },
  computed: {
    averagePercentage() {
      return (
        1 -
        this.averageTime.avgDays / this.averageTime.avgPastDays
      ).toFixed(2);
    },
  },
};
</script>

