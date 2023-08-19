<script setup>
import { onMounted, ref } from 'vue';

//define the variables
const donuts = ref([]);

//fetch the data from the API
onMounted(async () => {
    try {
        // delay the fetch request by 2 seconds
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const response = await fetch('https://donutello-api-rc87.onrender.com/donut');
        const data = await response.json();
        console.log('API Response:', data);
        // Verify the structure of the data
        console.log('Type of data:', typeof data);
        donuts.value = data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

    //remove a selected donut from the API
    const removeDonut = (id) => {
        console.log('Removing donut with ID:', id);
        fetch(`https://donutello-api-rc87.onrender.com/donut/${id}`, {
            method: 'DELETE'
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('API Response:', data); // Log the API response data
                // Remove the donut from the donuts array
                donuts.value = donuts.value.filter((donut) => donut.id !== id); // Filter out the donut with the matching ID
            })
            .catch((error) => {
                console.error('Error removing donut:', error);
            });
    };

</script>

<template>
  <div>
    <h1>Home</h1>
    <p>order donuts here</p>
    <a href="/donut">Make Your Own Donut</a>
    <div class="donuts">
        <p>View other peoples donuts</p>
        <div v-for="donut in donuts" :key="donut.id">
            <router-link :to="{ name: 'order', params: { id: donut.id } }">
                <!--display donut colour id-->
                <p>{{donut.colour}}</p>
            </router-link>
            <!--remove donut-->
            <button @click="removeDonut(donut.id)">Remove</button>
        </div>
    </div>
  </div>
</template>