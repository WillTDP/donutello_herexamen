import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import './style.css'
import App from './App.vue'
import Donut from './components/Donut.vue'
import Order from './components/Order.vue'
import Home from './components/Home.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/Donut', component: Donut },
    { path: '/order/:id', name: 'order', component: Order },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);
app.use(router);
app.mount('#app');