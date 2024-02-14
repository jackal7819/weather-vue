<script setup>
	import { ref } from 'vue';
	import axios from 'axios';

	const token = import.meta.env.VITE_API_KEY;
	const url = import.meta.env.VITE_API_URL;
	const searchQuery = ref('');
	const queryTimeout = ref(null);
	const mapboxSearchResults = ref(null);

	const getSearchResults = () => {
		clearTimeout(queryTimeout.value);
		queryTimeout.value = setTimeout(async () => {
			if (searchQuery.value !== '') {
				const result = await axios.get(
					`${url}/${searchQuery.value}.json?access_token=${token}&types=place`
				);
				mapboxSearchResults.value = result.data.features;
				return;
			}
			mapboxSearchResults.value = null;
		}, 300);
	};
</script>

<template>
	<main>
		<main class="w-5/6 mx-auto max-w-screen-2xl">
			<div class="relative pt-4 mb-8">
				<input
					type="text"
					v-model="searchQuery"
					@input="getSearchResults"
					class="w-full p-2 bg-transparent border-b-2 border-slate-400 focus:border-sky-700 focus:outline-none"
					placeholder="Search for a city..."
				/>
				<ul
					class="absolute w-full px-1 py-2 top-[66px] shadow-md shadow-sky-700 bg-slate-400 text-slate-900 rounded"
					v-if="mapboxSearchResults"
				>
					<li
						class="p-2 duration-300 cursor-pointer hover:text-sky-700"
						v-for="searchResult in mapboxSearchResults"
						:key="searchResult.id"
					>
						{{ searchResult.place_name }}
					</li>
				</ul>
			</div>
		</main>
	</main>
</template>
