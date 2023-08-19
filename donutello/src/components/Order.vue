<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

//get the route
const route = useRoute();

//define the variables
const colour = ref('');
const topping = ref('no');
const name = ref('');

//fetch the data from the API
onMounted(async () => {
    const id = route.params.id;
    console.log('Fetching donut with ID:', id);

    try {
        // delay the fetch request by 2 seconds
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const response = await fetch(`https://donutello-api-rc87.onrender.com/donut/${id}`);
        const data = await response.json();
        console.log('API Response:', data);
        colour.value = data.colour;
        topping.value = data.topping;
        name.value = data.name;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

</script>

<template>
    <div>
        <h1>Order {{ route.params.id }}</h1>
        <ul>
            <li>Colour: {{ colour }}</li>
            <li>Topping: {{ topping }}</li>
            <li>Name: {{ name }}</li>
        </ul>
    </div>
    <div>
        <div>
            <a href="/">Home</a>
        </div>
        <div>
            <a href="/donut">Make a Donut</a>
        </div> 
    </div>
</template>