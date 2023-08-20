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
    const _id = route.params.id;
    console.log('Fetching donut with ID:', _id);

    try {
        // delay the fetch request by 2 seconds
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const response = await fetch(`https://donutello-api-rc87.onrender.com/donut/${_id}`);
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
        <h1>Order</h1>
        <div class="order">
            <div class="customer">
                <p>Customer name:</p>
                <p>{{ name }}</p>
            </div>
            <div class="colour">
                <p>Colour:</p>
                <p>{{ colour }}</p>
            </div>
            <div class="topping">
                <p>Topping:</p>
                <p>{{ topping }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.order {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
.customer {
    border: 1px solid black;
    padding: 10px;
}
.colour {
    border: 1px solid black;
    padding: 10px;
}
    
.topping {
    border: 1px solid black;
    padding: 10px;
}

</style>