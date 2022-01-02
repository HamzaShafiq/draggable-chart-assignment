<template>
  <div>
    <div id="app" class="flex-1 relative z-0 overflow-y-auto p-3 sm:p-6 h-screen">
      <h2 class="font-bold text-lg">Monitoring and Performance Stats</h2>
      <Dashboard />
    </div>
  </div>
</template>

<script>

import Dashboard from "./components/Dashboard";
export default {
  name: 'App',
  components: {
    Dashboard
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
