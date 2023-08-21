<script setup>
import { onMounted, ref, computed  } from 'vue';
import Donut from './components/Donut.vue';
import Order from './components/Order.vue';
    
</script>

<template>
  <div id="app">
    <div class="navbar">
      <img src="/logo.png" alt="Donutello Logo">
      <a href="/">Home</a>
      <a href="/donut">Make a Donut</a>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
img {
  width: auto;
  height: 50px;
  margin: 1em;
}
</style>
