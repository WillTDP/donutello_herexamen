<script setup>
import { onMounted, ref } from 'vue';
import { defineProps } from 'vue';

const props = defineProps(['donuts']);

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
    //map the colour hex from the donut.colour output to a colour hex
    const ColourHex = (colour) => {
        switch (colour) {
            case '0xd52417':
                return '#d52417';
            case '0x54A232':
                return '#54A232';
            case '0x6fa8dc':
                return '#6fa8dc';
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
    //map the colour hex from the donut.topping output to a colour hex
    const ToppingHex = (topping) => {
        switch (topping) {
            case '0xd52417':
                return '#d52417';
            case '0x54A232':
                return '#54A232';
            case '0x6fa8dc':
                return '#6fa8dc';
            case 'no':
                return 'no';
        }
    };


let hoveredDonut = null;
const handleMouseOver = (donutId, donutTopping) => { //donutTopping is the hex value of the donut topping
  hoveredDonut = donutId; 
  const card = document.getElementById(`card-${donutId}`); //get the card element by id to change the background colour
  if (card) {
    card.style.backgroundColor = ToppingHex(donutTopping); //change the background colour of the card to the donut topping
  }
};

const handleMouseLeave = (donutId, donutColour) => { //donutColour is the hex value of the donut colour
  hoveredDonut = null;  //reset the hoveredDonut variable
  const card = document.getElementById(`card-${donutId}`); //get the card element
  if (card) {
    card.style.backgroundColor = ColourHex(donutColour); //change the background colour of the card to the donut colour
  }
};
</script>

<template>
  <div>
    <img src="public/logo.png" alt="Donutello Logo" class="logo">
    <div class="txt">
        <p>Donutello is the place to imagine your own donuts! Choose the colour of your glazing and toppings!.</p>
        <a href="/donut">Make Your Own Donut</a>
    </div>
    <div class="inspiration">
        <h2>View other peoples donuts</h2>
        <div class="donuts">
        <div v-for="donut in donuts" :key="donut.id">
            <router-link :to="{ name: 'order', params: { id: donut._id } }" class="card-container">
            <!--display donut colour id-->
            <div
                :id="`card-${donut._id}`" 
                :class="['card']"
                :style="{ backgroundColor: hoveredDonut === donut._id ? ToppingHex(donut.topping) : ColourHex(donut.colour) }"
                @mouseover="handleMouseOver(donut._id, donut.topping)"
                @mouseleave="handleMouseLeave(donut._id, donut.colour)"
            > <!--change the background colour of the card to the donut colour-->                    
                    <div class="card--display">
                        <p>{{ colourName(donut.colour) }} with</p>
                    </div>
                    <!--display coloured donut topping or no topping-->
                    <div class="card--hover">
                        <p v-if="donut.topping !== 'no'">{{ toppingName(donut.topping) }} topping</p>
                        <p v-else>no topping</p>
                    </div>
                    <div class="card--border"></div>
                </div>
            </router-link>
            <!--remove donut-->
            <button @click="removeDonut(donut._id)">Remove</button>
        </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
.logo {
    width: auto;
    height: 150px;
    margin: 1em;
}
.txt {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 1em;
    padding-bottom: 2em;
    text-decoration: none;
}
.txt p {
    margin: 1em;
    margin-bottom: 0.5em;
    text-decoration: none;
    width: 50%;
    text-align: left;
}
.txt a {
    margin: 1em;
    margin-bottom: 0.5em;
    text-decoration: none;
    color: #eee;
    background-color: rgb(201, 70, 231);
    border-radius: 15px;
    padding: 1em;
    
}
.txt a:hover {
    background-color: rgb(185, 14, 40);
}
.inspiration {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin: 1em;
    padding-bottom: 2em;
    text-decoration: none;
    background-color: rgb(14, 185, 185);
    border-radius: 15px;
}

.inspiration h2 {
    margin: 1em;
    margin-bottom: 0.5em;
    text-decoration: none;
    color: #eee;
}
.donuts {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    text-decoration: none;
}
.card-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 1em;
    text-decoration: none;
}
.card {
    position: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 50px;
    height: 25px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    transition: all 0.3s ease-in-out;
    border-radius: 5%;
}
.card--display {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    transition: all 0.3s ease-in-out;
    color: #fff;
}
.card--hover {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: #fff;
}
.card:hover .card--display{
    display: none;
}
.card:hover .card--hover {
    display: flex;
}

</style>