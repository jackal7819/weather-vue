import { createRouter, createWebHistory } from 'vue-router';

import CityViewVue from '../views/CityView.vue';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/weather/:region/:city',
			name: 'cityView',
			component: CityViewVue,
		},
	],
});

export default router;
