<script setup>
	import { ref } from 'vue';
	import axios from 'axios';
	import { useRouter } from 'vue-router';

	const token = import.meta.env.VITE_API_KEY;
	const url = import.meta.env.VITE_API_URL;
	const searchQuery = ref('');
	const queryTimeout = ref(null);
	const mapboxSearchResults = ref(null);
	const searchError = ref(null);
	const router = useRouter();

	const previewCity = (searchResult) => {
		const [city, region] = searchResult.place_name.split(',');
		router.push({
			name: 'cityView',
			params: {
				region: region.replaceAll(' ', ''),
				city: city.replaceAll(' ', ''),
			},
			query: {
				lat: searchResult.geometry.coordinates[1],
				lng: searchResult.geometry.coordinates[0],
			},
		});
	};

	const getSearchResults = () => {
		clearTimeout(queryTimeout.value);
		queryTimeout.value = setTimeout(async () => {
			if (searchQuery.value !== '') {
				try {
					const result = await axios.get(
						`${url}/${searchQuery.value}.json?access_token=${token}&types=place`
					);
					mapboxSearchResults.value = result.data.features;
				} catch {
					searchError.value = true;
				}
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
					placeholder="Search for a city or a region..."
				/>
				<ul
					class="absolute w-full px-1 py-2 top-[66px] shadow-md shadow-sky-700 bg-slate-400 text-slate-900 rounded"
					v-if="mapboxSearchResults"
				>
					<p class="p-2 text-sky-700" v-if="searchError">
						Sorry, something went wrong. Please try again.
					</p>
					<p
						class="p-2 text-sky-700"
						v-if="!searchError && mapboxSearchResults.length === 0"
					>
						No results match your query, try a different term
					</p>
					<template v-else>
						<li
							class="p-2 duration-300 cursor-pointer hover:text-sky-700"
							v-for="searchResult in mapboxSearchResults"
							:key="searchResult.id"
							@click="() => previewCity(searchResult)"
						>
							{{ searchResult.place_name }}
						</li>
					</template>
				</ul>
			</div>
		</main>
	</main>
</template>
