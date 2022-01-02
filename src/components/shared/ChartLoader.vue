<template>
  <div
    class="rounded-lg block w-screen"
  >
    <div class="flex-grow">
      <div class="divide-y divide-gray-200 px-4 divide-dotted">
        <div class="py-1 grid grid-cols-4 gap-y-8">
          <div class="col-span-5 w-full bg-gray-100 rounded-md h-4" />
          <div class="col-span-6 w-full bg-gray-100 rounded-md h-4" />
          <div class="col-span-4 w-full bg-gray-100 rounded-md h-4" />
          <div class="col-span-5 w-full bg-gray-100 rounded-md h-4" />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
name: "ChartLoader"
}
</script>
