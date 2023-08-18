<script setup>
import { onMounted, ref } from 'vue';

//define the variables
const colour = ref('');
const topping = ref('no');
const id = ref(null);

//fetch the data from the API
onMounted(async () => {
  try {
    const response = await fetch('https://donutello-api-rc87.onrender.com/donut');
    const data = await response.json();
    console.log('API Response:', data);
    colour.value = data.colour;
    topping.value = data.topping;
    id.value = data.id;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});




</script>

<template>
    <div>
        <h1>Order</h1>
        <p>Order your donut here!</p>
    </div>
</template>