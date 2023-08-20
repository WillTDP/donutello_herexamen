<script setup>
import { onMounted, ref, computed  } from 'vue';
import Donut from './components/Donut.vue';
import Order from './components/Order.vue';
    
</script>

<template>
  <div id="app">
    <div class="navbar">
      <p>Donutello</p>
      <a href="/">Home</a>
      <a href="/donut">Make a Donut</a>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>

</style>
