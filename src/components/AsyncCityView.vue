<script setup>
	import axios from 'axios';
	import { useRoute } from 'vue-router';

	const route = useRoute();
	const keyWeather = import.meta.env.VITE_API_KEY_WEATHER;
	const urlWeather = import.meta.env.VITE_API_URL_WEATHER;
	const getWeatherData = async () => {
		try {
			const weatherData = await axios.get(
				`${urlWeather}/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=${keyWeather}&units=metric`
			);

			const localOffset = new Date().getTimezoneOffset() * 60000;
			const utc = weatherData.data.current.dt * 1000 + localOffset;
			weatherData.data.currentTime =
				utc + 1000 * weatherData.data.timezone_offset;

			weatherData.data.hourly.forEach((hour) => {
				const utc = hour.dt * 1000 + localOffset;
				hour.currentTime =
					utc + 1000 * weatherData.data.timezone_offset;
			});

			return weatherData;
		} catch (error) {
			console.log(error);
		}
	};

	const weatherData = await getWeatherData();
	console.log(weatherData.data);
</script>

<template>
	<h1>AsyncCityView</h1>
</template>
