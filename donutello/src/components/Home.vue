<script setup>
import { onMounted, ref } from 'vue';

//get all the donuts from the API
const donuts = ref([]);

onMounted(async () => {
    try {
        // delay the fetch request by 2 seconds
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const response = await fetch('https://donutello-api-rc87.onrender.com/donut');
        const data = await response.json();
        console.log('API Response:', data);
        donuts.value = data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

</script>

<template>
  <div>
    <h1>Home</h1>
    <p>order donuts here</p>
    <a href="/donut">Make Your Own Donut</a>
    <div id="container"></div>
    <div class="donuts">
      <div v-for="donut in donuts" :key="donut.id">
        <router-link :to="{ name: 'order', params: { id: donut.id } }">
          <p>{{donut.colour}}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>