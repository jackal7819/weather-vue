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

			return weatherData.data;
		} catch (error) {
			console.log(error);
		}
	};

	const weatherData = await getWeatherData();
</script>

<template>
	<div class="flex flex-col items-center flex-1">
		<div
			v-if="route.query.preview"
			class="w-full p-4 text-center text-slate-200 bg-sky-700"
		>
			<p>
				You are currently previewing this city, click the "+" icon to
				track it.
			</p>
		</div>
		<div
			class="flex flex-col items-center justify-center gap-10 py-8 lg:flex-row text-slate-400"
		>
			<h1 class="text-3xl">
				{{ route.params.city }}
			</h1>
			<p>
				{{
					new Date(weatherData.currentTime).toLocaleDateString(
						'en-UA',
						{
							weekday: 'short',
							day: '2-digit',
							month: 'long',
						}
					)
				}}
				|
				{{
					new Date(weatherData.currentTime).toLocaleTimeString(
						'uk-UA',
						{
							timeStyle: 'short',
						}
					)
				}}
			</p>
			<p class="text-6xl">
				{{ Math.round(weatherData.current.temp) }} °C
			</p>
			<p>
				Feels like {{ Math.round(weatherData.current.feels_like) }} °C
			</p>
			<p>{{ weatherData.current.weather[0].main }}</p>
			<img
				class="-mt-6 w-36 h-36"
				:src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
				alt="weather icon"
			/>
		</div>
		<hr class="w-full bg-slate-400 opacity-20" />
		<div class="w-5/6 py-8 mx-auto max-w-screen-2xl">
			<h2 class="mb-4 text-xl">Hourly Weather</h2>
			<div class="flex gap-10 overflow-x-scroll">
				<div
					v-for="hourData in weatherData.hourly?.slice(1, 25)"
					:key="hourData.dt"
					class="flex flex-col items-center gap-4 pb-5"
				>
					<p class="text-lg whitespace-nowrap">
						{{
							new Date(hourData.currentTime).toLocaleTimeString(
								'uk-UA',
								{
									hour: 'numeric',
								}
							)
						}}
					</p>
					<img
						class="object-cover w-12 h-12"
						:src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
						alt="weather icon"
					/>
					<p class="text-lg whitespace-nowrap">
						{{ Math.round(hourData.temp) }} °C
					</p>
				</div>
			</div>
		</div>
		<hr class="w-full bg-slate-400 opacity-20" />
		<div class="w-5/6 py-8 mx-auto max-w-screen-2xl">
			<h2 class="mb-4 text-xl">Weekly Weather</h2>
			<div
				v-for="day in weatherData.daily?.slice(0, 7)"
				:key="day.dt"
				class="flex items-center gap-4 pb-5"
			>
				<p class="flex-1 text-lg">
					{{
						new Date(day.dt * 1000).toLocaleDateString('en-UA', {
							weekday: 'long',
						})
					}}
				</p>
				<img
					class="object-cover w-12 h-12"
					:src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
					alt="weather icon"
				/>
				<div class="flex justify-end flex-1 gap-2 text-lg">
					<p>H: {{ Math.round(day.temp.max) }} °C</p>
					<p>L: {{ Math.round(day.temp.min) }} °C</p>
				</div>
			</div>
		</div>
	</div>
</template>
