<script setup>
	import axios from 'axios';
	import { ref } from 'vue';
	import { useRouter } from 'vue-router';
	import CityCard from './CityCard.vue';

	const keyWeather = import.meta.env.VITE_API_KEY_WEATHER;
	const urlWeather = import.meta.env.VITE_API_URL_WEATHER;
	const router = useRouter();
	const savedCities = ref([]);
	const getCities = async () => {
		if (localStorage.getItem('savedCities')) {
			savedCities.value = JSON.parse(localStorage.getItem('savedCities'));

			const requests = [];
			savedCities.value.forEach((city) => {
				requests.push(
					axios.get(
						`${urlWeather}/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=${keyWeather}&units=metric`
					)
				);
			});

			const weatherData = await Promise.all(requests);

			await new Promise((resolve) => setTimeout(resolve, 1000));

			weatherData.forEach((data, index) => {
				savedCities.value[index].weather = data.data;
			});
		}
	};
	await getCities();

	const goToCityView = (city) => {
		router.push({
			name: 'cityView',
			params: { state: city.state, city: city.city },
			query: {
				id: city.id,
				lat: city.coords.lat,
				lng: city.coords.lng,
			},
		});
	};
</script>

<template>
	<div v-for="city in savedCities" :key="city.id">
		<CityCard :city="city" @click="goToCityView(city)" />
	</div>
	<p v-if="savedCities.length === 0">
		No locations added. To start tracking a location, search in the field
		above.
	</p>
</template>
