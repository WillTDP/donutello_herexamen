<script setup>
import { onMounted, ref, computed  } from 'vue';
import Donut from './components/Donut.vue';
import Order from './components/Order.vue';
    
</script>

<template>
  <div id="app">
    <div class="navbar">
      <img src="/logo.png" alt="Donutello Logo">
      <a class="home" href="/">Home</a>
      <a class="donut" href="/donut">Make a Donut</a>
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
a {
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  color: white;
  text-decoration: none;
  border-radius: 15px;
}
a.home {
  background-color: #d44036;
}
a.donut {
  background-color: #4CAF50;
}
a:hover {
  background-color: #aa0707;
}
</style>
