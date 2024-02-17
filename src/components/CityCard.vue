<script setup>
	defineProps({
		city: {
			type: Object,
			default: () => {},
		},
	});
</script>
<template>
	<div
		class="flex px-3 py-6 rounded-md shadow-md cursor-pointer shadow-slate-400 bg-sky-700 text-slate-300"
	>
		<div class="flex flex-col flex-1">
			<h2 class="text-3xl duration-300 hover:text-slate-400">
				{{ city.city }}
			</h2>
			<h3 class="text-xl duration-300 hover:text-slate-400">
				{{ city.state }}
			</h3>
		</div>

		<div class="flex flex-col gap-2">
			<p class="self-end text-3xl">
				{{ Math.round(city.weather.main.temp) }} °C
			</p>
			<div class="flex gap-2">
				<span class="text-xs">
					H: {{ Math.round(city.weather.main.temp_max) }} °C
				</span>
				<span class="text-xs">
					L: {{ Math.round(city.weather.main.temp_min) }} °C
				</span>
			</div>
		</div>
	</div>
</template>
