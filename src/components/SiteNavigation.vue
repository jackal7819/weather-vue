<script setup>
	import { ref } from 'vue';
	import { RouterLink } from 'vue-router';
	import BaseModal from './BaseModal.vue';

	const modalActive = ref(null);
	const toggleModal = () => {
		modalActive.value = !modalActive.value;
	};
</script>

<template>
	<header class="sticky top-0 shadow-md shadow-slate-400">
		<nav
			class="flex flex-col items-center w-5/6 gap-4 py-4 mx-auto max-w-screen-2xl sm:flex-row"
		>
			<RouterLink :to="{ name: 'home' }">
				<div class="flex items-center flex-1 gap-3">
					<i class="text-2xl fa-solid fa-sun"></i>
					<h1 class="text-2xl">The Local Weather</h1>
				</div>
			</RouterLink>

			<div class="flex justify-end flex-1 gap-3">
				<i
					@click="toggleModal"
					class="text-2xl duration-300 cursor-pointer fa-solid fa-circle-info hover:text-sky-700"
				></i>
				<i
					class="text-2xl duration-300 cursor-pointer fa-solid fa-plus hover:text-sky-700"
				></i>
			</div>

			<BaseModal :modalActive="modalActive" @toggle-modal="toggleModal">
				<div class="text-slate-900">
					<h1 class="mb-1 text-3xl">About</h1>
					<h3 class="mb-4">
						The Local Weather allows you to track the current and
						future weather of cities of your choosing
					</h3>
					<h2 class="mb-1 text-2xl">How does this work?</h2>
					<ol class="mb-4 list-decimal list-inside">
						<li>
							Search for a city by entering the name into the
							search bar.
						</li>
						<li>
							Select a city within the results, this will take you
							to the current weather for your selection.
						</li>
						<li>
							Track the city by clicking on the "+" icon in the
							top right. This will save the city to view at a
							later time on the home page.
						</li>
					</ol>
					<h2 class="mb-1 text-2xl">Removing a city</h2>
					<h3>
						If you no longer wish to track a city, simply select the
						city within the home page. At the bottom of the page,
						there will be an option to delete the city.
					</h3>
				</div>
			</BaseModal>
		</nav>
	</header>
</template>
