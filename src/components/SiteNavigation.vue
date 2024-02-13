<script setup>
	import { RouterLink } from 'vue-router';
</script>

<template>
	<header class="sticky top-0 shadow-lg bg-slate-900 shadow-slate-400">
		<nav
			class="container flex flex-col items-center gap-4 py-4 mx-auto sm:flex-row w-[90vw]"
		>
			<RouterLink :to="{ name: 'home' }">
				<div class="flex items-center flex-1 gap-3">
					<i class="text-2xl fa-solid fa-sun"></i>
					<h1 class="text-2xl">The Local Weather</h1>
				</div>
			</RouterLink>

			<div class="flex justify-end flex-1 gap-3">
				<i
					class="text-2xl duration-300 cursor-pointer fa-solid fa-circle-info hover:text-sky-400"
				></i>
				<i
					class="text-2xl duration-300 cursor-pointer fa-solid fa-plus hover:text-sky-400"
				></i>
			</div>
		</nav>
	</header>
</template>
