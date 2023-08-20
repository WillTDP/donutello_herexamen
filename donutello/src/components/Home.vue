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
    const removeDonut = (_id) => {
        console.log('Removing donut with ID:', _id);
        fetch(`https://donutello-api-rc87.onrender.com/donut/${_id}`, {
            method: 'DELETE'
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('API Response:', data); // Log the API response data
                // Remove the donut from the donuts array
                donuts.value = donuts.value.filter((donut) => donut._id !== _id); // Filter out the donut with the matching ID
            })
            .catch((error) => {
                console.error('Error removing donut:', error);
            });
    };

    //map the colour hex from the donut.colour output to a colour name
    const colourName = (colour) => {
        switch (colour) {
            case '0xd52417':
                return 'red';
            case '0x54A232':
                return 'green';
            case '0x6fa8dc':
                return 'blue';
            case 'no':
                return 'no';
        }
    };

    //map the colour hex from the donut.topping output to a colour name
    const toppingName = (topping) => {
        switch (topping) {
            case '0xd52417':
                return 'red';
            case '0x54A232':
                return 'green';
            case '0x6fa8dc':
                return 'blue';
            case 'no':
                return 'no';
        }
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
            <router-link :to="{ name: 'order', params: { id: donut._id } }">
                <!--display donut colour id-->
                <div>
                    <p>{{ colourName(donut.colour) }} with</p>
                    <!--display coloured donut topping or no topping-->
                    <p v-if="donut.topping !== 'no'">{{ toppingName(donut.topping) }} topping</p>
                    <p v-else>no topping</p>
                </div>
            </router-link>
            <!--remove donut-->
            <button @click="removeDonut(donut._id)">Remove</button>
        </div>
    </div>
  </div>
</template>